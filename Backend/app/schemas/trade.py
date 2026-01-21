"""
Trade schemas for request/response validation
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.models.trade import OrderSide, OrderType, OrderStatus


class TradeRequest(BaseModel):
    """Schema for trade request"""
    # Core parameters
    symbol: str = Field(..., min_length=1, description="Trading symbol (e.g., RELIANCE, INFY)")
    exchange: str = Field(..., min_length=1, description="Exchange (NSE, BSE, NFO, etc.)")
    side: OrderSide = Field(..., description="BUY or SELL")
    quantity: int = Field(..., gt=0, description="Quantity to trade")
    order_type: OrderType = Field(..., description="Order type: MARKET, LIMIT, SL, SL_M")
    
    # Price parameters
    price: Optional[float] = Field(None, gt=0, description="Price for LIMIT/SL orders")
    trigger_price: Optional[float] = Field(None, gt=0, description="Trigger price for SL/SL_M orders")
    
    # Zerodha-specific parameters
    product: str = Field(default="CNC", description="Product type: CNC (delivery), MIS (intraday), NRML (F&O)")
    variety: str = Field(default="regular", description="Order variety: regular, amo, bo, co, iceberg")
    validity: str = Field(default="DAY", description="Order validity: DAY, IOC")
    disclosed_quantity: Optional[int] = Field(None, gt=0, description="Quantity to disclose publicly")
    tag: Optional[str] = Field(None, max_length=8, description="Alphanumeric tag for order tracking")
    
    # 5paisa-specific parameters
    is_intraday: bool = Field(default=False, description="True for intraday, False for delivery (5paisa)")
    exchange_type: str = Field(default="C", description="Exchange segment: C (Cash), D (Derivatives), U (Currency) - for 5paisa")
    scrip_code: Optional[int] = Field(None, description="5paisa scrip code (e.g., RELIANCE=500325, TCS=532540)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "symbol": "RELIANCE",
                "exchange": "NSE",
                "side": "BUY",
                "quantity": 10,
                "order_type": "LIMIT",
                "price": 2500.0,
                "product": "CNC",
                "variety": "regular",
                "validity": "DAY"
            }
        }


class TradeExecutionDetail(BaseModel):
    """Schema for individual execution detail"""
    account_id: int
    broker: str
    order_id: Optional[str] = None
    status: OrderStatus
    executed_price: Optional[float] = None
    executed_quantity: Optional[int] = None
    error_reason: Optional[str] = None
    execution_time_ms: Optional[float] = None
    
    class Config:
        from_attributes = True


class TradeResponse(BaseModel):
    """Schema for trade response"""
    trade_id: int
    owner_id: Optional[int] = None  
    symbol: str
    exchange: str
    side: str
    quantity: int
    order_type: str
    price: Optional[float]
    created_at: datetime
    # Map 'executions' from model to 'details' in response
    details: List[TradeExecutionDetail] = Field(validation_alias="executions")
    total_execution_time_ms: Optional[float] = None  
        
    class Config:
        from_attributes = True
        populate_by_name = True  # Allow both 'details' and 'executions' as field names


class TradeListResponse(BaseModel):
    """Schema for list of trades"""
    trades: List[TradeResponse]
    total: int
