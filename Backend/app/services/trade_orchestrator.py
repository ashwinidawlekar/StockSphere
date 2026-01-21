"""
Trade orchestrator for executing trades across multiple accounts
"""
import asyncio
import uuid
import time
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any, Tuple
from app.models.account import Account, BrokerName
from app.models.trade import Trade, TradeExecution, OrderStatus
from app.services.account_service import AccountService
from app.adapters.zerodha_adapter import ZerodhaAdapter
from app.adapters.fivepaisa_adapter import FivePaisaAdapter
from app.schemas.trade import TradeRequest
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class TradeOrchestrator:
    """Orchestrator for executing trades across multiple accounts with minimal latency"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self._adapters_cache: Dict[int, Any] = {}
    
    async def _get_adapter(self, account: Account):
        """
        Get or create broker adapter for account (with auto-login support)
        
        Args:
            account: Account model
            
        Returns:
            Broker adapter instance
        """
        if account.account_id in self._adapters_cache:
            return self._adapters_cache[account.account_id]
        
        if account.broker_name == BrokerName.ZERODHA.value:
            adapter = ZerodhaAdapter(account=account, db=self.db)
        elif account.broker_name == BrokerName.FIVEPAISA.value:
            adapter = FivePaisaAdapter(account=account, db=self.db)
        else:
            raise ValueError(f"Unsupported broker: {account.broker_name}")
        
        self._adapters_cache[account.account_id] = adapter
        return adapter
    
    async def execute_trade(self, trade_request: TradeRequest, current_user) -> Trade:
        """
        Execute trade across all enabled accounts owned by the current user
        
        Args:
            trade_request: Trade request details
            current_user: Current authenticated user
            
        Returns:
            Trade model with execution results
        """
        start_time = time.time()
        
        # Create main trade record
        trade = Trade(
            owner_id=current_user.user_id,  
            symbol=trade_request.symbol,
            exchange=trade_request.exchange,
            side=trade_request.side,
            quantity=trade_request.quantity,
            order_type=trade_request.order_type,
            price=trade_request.price
        )
        
        self.db.add(trade)
        await self.db.commit()
        await self.db.refresh(trade)
        
        logger.info(f"Created trade {trade.trade_id} for {trade_request.symbol}")
        
        #  Get only the current user's enabled accounts
        accounts = await AccountService.get_user_accounts(self.db, current_user.user_id, enabled_only=True)
        
        if not accounts:
            logger.warning(f"No enabled accounts found for trade {trade.trade_id}")
            return trade
        
        # 1 Pre-initialize all adapters in parallel
        logger.debug(f"Pre-initializing {len(accounts)} adapters...")
        adapter_tasks = [self._get_adapter(account) for account in accounts]
        adapters = await asyncio.gather(*adapter_tasks, return_exceptions=True)
        
        # 2 Prepare all order requests in parallel
        logger.debug("Preparing order requests in parallel...")
        preparation_tasks = []
        for i, account in enumerate(accounts):
            if isinstance(adapters[i], Exception):
                logger.error(f"Failed to initialize adapter for account {account.account_id}: {adapters[i]}")
                continue
            preparation_tasks.append(
                self._prepare_order_request(adapters[i], account, trade_request)
            )
        
        prepared_orders = await asyncio.gather(*preparation_tasks, return_exceptions=True)
        
        # 3 Execute all orders simultaneously
        logger.info(f" Executing {len(prepared_orders)} orders simultaneously...")
        execution_tasks = []
        valid_accounts = []
        
        for i, prepared in enumerate(prepared_orders):
            if isinstance(prepared, Exception):
                logger.error(f"Failed to prepare order for account {accounts[i].account_id}: {prepared}")
                continue
            
            account = accounts[i]
            adapter = adapters[i]
            order_request = prepared
            
            execution_tasks.append(
                self._execute_single_order(trade, account, adapter, order_request)
            )
            valid_accounts.append(account)
        
        # Execute all orders in parallel and measure timing 
        execution_start = time.time()
        execution_results = await asyncio.gather(*execution_tasks, return_exceptions=True)
        execution_end = time.time()
        
        total_execution_time_ms = (execution_end - execution_start) * 1000
        logger.info(f" All orders executed in {total_execution_time_ms:.2f}ms")
        
        # Process results and create execution records
        for i, result in enumerate(execution_results):
            account = valid_accounts[i]
            
            if isinstance(result, Exception):
                
                execution = TradeExecution(
                    trade_id=trade.trade_id,
                    account_id=account.account_id,
                    broker=account.broker_name,
                    status=OrderStatus.FAILED,
                    error_reason=str(result)
                )
            else:
                
                execution = TradeExecution(
                    trade_id=trade.trade_id,
                    account_id=account.account_id,
                    broker=account.broker_name,
                    order_id=result.get("order_id"),
                    status=OrderStatus.SUCCESS if result.get("status") == "SUCCESS" else OrderStatus.FAILED,
                    executed_price=result.get("executed_price"),
                    executed_quantity=result.get("executed_quantity"),
                    error_reason=result.get("error")
                )
            
            self.db.add(execution)
        
        await self.db.commit()
        await self.db.refresh(trade)
        
        total_time = (time.time() - start_time) * 1000
        logger.info(f" Completed trade {trade.trade_id} in {total_time:.2f}ms total ({total_execution_time_ms:.2f}ms execution)")
        
        return trade
    
    async def _prepare_order_request(
        self,
        adapter: Any,
        account: Account,
        trade_request: TradeRequest
    ) -> Dict[str, Any]:
        """
        Prepare order request for a specific broker
        
        Args:
            adapter: Broker adapter
            account: Account model
            trade_request: Trade request
            
        Returns:
            Prepared order request dictionary
        """
        
        normalized = await adapter.normalize_symbol(trade_request.symbol, trade_request.exchange)
        
        
        if account.broker_name == BrokerName.ZERODHA.value:
            order_request = {
                "tradingsymbol": normalized.get("tradingsymbol", trade_request.symbol),
                "exchange": normalized.get("exchange", trade_request.exchange),
                "transaction_type": trade_request.side.value,  
                "quantity": trade_request.quantity,
                "order_type": trade_request.order_type.value,  # "MARKET", "LIMIT", "SL", "SL_M"
                "product": trade_request.product,  # "CNC", "MIS", "NRML"
                "variety": trade_request.variety,  # "regular", "amo", etc.
                "validity": trade_request.validity,  # "DAY", "IOC"
            }
            
            
            if trade_request.disclosed_quantity:
                order_request["disclosed_quantity"] = trade_request.disclosed_quantity
            
            if trade_request.tag:
                
                order_request["tag"] = trade_request.tag or f"T{trade_request.symbol[:6]}"
            
            # Add price for LIMIT and SL orders
            if trade_request.order_type.value in ["LIMIT", "SL"]:
                if trade_request.price:
                    order_request["price"] = trade_request.price
                else:
                    raise ValueError(f"Price is required for {trade_request.order_type.value} orders")
            
            
            if trade_request.order_type.value in ["SL", "SL_M"]:
                if trade_request.trigger_price:
                    order_request["trigger_price"] = trade_request.trigger_price
                elif trade_request.price:
                    
                    order_request["trigger_price"] = trade_request.price
                else:
                    raise ValueError(f"Trigger price is required for {trade_request.order_type.value} orders")
            
        elif account.broker_name == BrokerName.FIVEPAISA.value:
            order_request = {
                "symbol": normalized.get("symbol", trade_request.symbol),
                "exchange": normalized.get("exchange", trade_request.exchange),
                "transaction_type": trade_request.side.value,  
                "quantity": trade_request.quantity,
                "order_type": trade_request.order_type.value,  # "MARKET", "LIMIT", "SL", "SL_M"
                "scrip_code": trade_request.scrip_code or normalized.get("instrument_token"),  # Use provided scrip_code or lookup
                "is_intraday": trade_request.is_intraday,  # False for delivery, True for intraday
                "exchange_type": trade_request.exchange_type,  # "C", "D", "U"
                "order_validity": 0 if trade_request.validity == "DAY" else 1,  # 0 for DAY, 1 for IOC
            }
            
            
            if trade_request.disclosed_quantity:
                order_request["disclosed_quantity"] = trade_request.disclosed_quantity
            
            
            if trade_request.order_type.value == "LIMIT":
                if trade_request.price:
                    order_request["price"] = trade_request.price
                else:
                    raise ValueError("Price is required for LIMIT orders")
            
            
            if trade_request.order_type.value in ["SL", "SL_M"]:
                if trade_request.price:
                    order_request["price"] = trade_request.price
                if trade_request.trigger_price:
                    order_request["trigger_price"] = trade_request.trigger_price
                elif trade_request.price:
                    order_request["trigger_price"] = trade_request.price
                else:
                    raise ValueError(f"Price/trigger price is required for {trade_request.order_type.value} orders")
        else:
            raise ValueError(f"Unsupported broker: {account.broker_name}")
        
        return order_request
    
    async def _execute_single_order(
        self,
        trade: Trade,
        account: Account,
        adapter: Any,
        order_request: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Execute a single order and measure timing
        
        Args:
            trade: Trade model
            account: Account model
            adapter: Broker adapter
            order_request: Prepared order request
            
        Returns:
            Execution result dictionary
        """
        try:
            start_time = time.time()
            
            # Place order
            result = await adapter.place_order(order_request)
            
            execution_time_ms = (time.time() - start_time) * 1000
            logger.info(f" {account.broker_name} order executed in {execution_time_ms:.2f}ms")
            
            # If successful, try to get executed price [may need to query order status]
            if result.get("status") == "SUCCESS":
                # For now we will use requested price as executed price
                # In production, we will query the order status from broker to get the actual executed price okaaay?
                result["executed_price"] = trade.price
                result["executed_quantity"] = trade.quantity
                result["execution_time_ms"] = execution_time_ms
            
            return result
            
        except Exception as e:
            logger.error(f"Error executing order for account {account.account_id}: {e}")
            return {
                "order_id": None,
                "status": "FAILED",
                "broker": account.broker_name,
                "error": str(e)
            }
