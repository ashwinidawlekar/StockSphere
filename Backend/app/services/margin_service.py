"""
Margin service for fetching margin data from multiple brokers
"""
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any
from app.models.account import Account, BrokerName
from app.services.account_service import AccountService
from app.adapters.zerodha_margin_adapter import ZerodhaMarginAdapter
from app.adapters.fivepaisa_margin_adapter import FivePaisaMarginAdapter

logger = logging.getLogger(__name__)


class MarginService:
    """Service for fetching margin data from multiple broker accounts"""
    
    @staticmethod
    async def get_margins_for_user(db: AsyncSession, user_id: int) -> List[Dict[str, Any]]:
        """
        Fetch margin data for all enabled accounts belonging to a user
        
        Args:
            db: Database session
            user_id: User ID
            
        Returns:
            List of margin data dictionaries
        """
        try:
            # Get all enabled accounts for the user
            accounts = await AccountService.get_user_accounts(db, user_id, enabled_only=True)
            
            if not accounts:
                logger.info(f"No enabled accounts found for user {user_id}")
                return []
            
            logger.info(f"Fetching margins for {len(accounts)} accounts for user {user_id}")
            
            margins = []
            for account in accounts:
                margin_data = await MarginService.get_margin_for_account(db, account)
                if margin_data:
                    margins.append(margin_data)
            
            logger.info(f"Successfully fetched margins for {len(margins)} accounts")
            return margins
            
        except Exception as e:
            logger.error(f"Error fetching margins for user {user_id}: {e}", exc_info=True)
            return []
    
    @staticmethod
    async def get_margin_for_account(db: AsyncSession, account: Account) -> Dict[str, Any]:
        """
        Fetch margin data for a single account
        
        Args:
            db: Database session
            account: Account model
            
        Returns:
            Margin data dictionary or None if failed
        """
        try:
            # Skip token validation - adapters will use existing tokens
            # If token is invalid, the adapter will return None
            
            # Fetch margin based on broker
            if account.broker_name == BrokerName.ZERODHA.value:
                return await MarginService._fetch_zerodha_margin(account)
            elif account.broker_name == BrokerName.FIVEPAISA.value:
                return await MarginService._fetch_fivepaisa_margin(account)
            else:
                logger.error(f"Unsupported broker: {account.broker_name}")
                return None
                
        except Exception as e:
            logger.error(f"Error fetching margin for account {account.account_id}: {e}", exc_info=True)
            return None
    
    @staticmethod
    async def _fetch_zerodha_margin(account: Account) -> Dict[str, Any]:
        """
        Fetch margin data from Zerodha
        
        Args:
            account: Account model
            
        Returns:
            Margin data dictionary
        """
        adapter = ZerodhaMarginAdapter()
        return await adapter.get_margins(account)
    
    @staticmethod
    async def _fetch_fivepaisa_margin(account: Account) -> Dict[str, Any]:
        """
        Fetch margin data from 5paisa
        
        Args:
            account: Account model
            
        Returns:
            Margin data dictionary
        """
        adapter = FivePaisaMarginAdapter()
        return await adapter.get_margins(account)
