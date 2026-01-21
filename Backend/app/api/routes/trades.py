"""Trade API routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.trade import TradeRequest, TradeResponse
from app.services.trade_orchestrator import TradeOrchestrator
from app.models.trade import Trade
from app.schemas.trade import TradeExecutionResponse

router = APIRouter(prefix="/trades", tags=["trades"])


@router.post("", response_model=TradeResponse, status_code=status.HTTP_201_CREATED)
async def place_trade(
    trade_request: TradeRequest,
    db: Session = Depends(get_db)
):
    """
    Place a trade order
    
    This will execute the trade simultaneously across ALL enabled accounts.
    Execution is parallel - failure in one account does not stop others.
    """
    try:
        trade = await TradeOrchestrator.execute_trade(db, trade_request)
        
        # Convert to response format
        executions = [
            TradeExecutionResponse(
                account_id=exec.account.account_id,
                broker_name=exec.broker_name,
                broker_order_id=exec.broker_order_id,
                status=exec.status,
                executed_price=exec.executed_price,
                executed_quantity=exec.executed_quantity,
                error_reason=exec.error_reason
            )
            for exec in trade.executions
        ]
        
        return TradeResponse(
            trade_id=trade.trade_id,
            symbol=trade.symbol,
            exchange=trade.exchange,
            side=trade.side,
            quantity=trade.quantity,
            order_type=trade.order_type,
            product=trade.product,
            price_type=trade.price_type,
            price=trade.price,
            trigger_price=trade.trigger_price,
            created_at=trade.created_at,
            executions=executions
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error executing trade: {str(e)}"
        )


@router.get("/{trade_id}", response_model=TradeResponse)
async def get_trade(
    trade_id: str,
    db: Session = Depends(get_db)
):
    """Get trade details by trade_id"""
    trade = db.query(Trade).filter(Trade.trade_id == trade_id).first()
    
    if not trade:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Trade with trade_id '{trade_id}' not found"
        )
    
    executions = [
        TradeExecutionResponse(
            account_id=exec.account.account_id,
            broker_name=exec.broker_name,
            broker_order_id=exec.broker_order_id,
            status=exec.status,
            executed_price=exec.executed_price,
            executed_quantity=exec.executed_quantity,
            error_reason=exec.error_reason
        )
        for exec in trade.executions
    ]
    
    return TradeResponse(
        trade_id=trade.trade_id,
        symbol=trade.symbol,
        exchange=trade.exchange,
        side=trade.side,
        quantity=trade.quantity,
        order_type=trade.order_type,
        product=trade.product,
        price_type=trade.price_type,
        price=trade.price,
        trigger_price=trade.trigger_price,
        created_at=trade.created_at,
        executions=executions
    )
