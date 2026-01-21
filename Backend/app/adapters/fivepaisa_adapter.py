"""5paisa API adapter"""
from typing import List, Dict, Optional
import httpx
from app.adapters.base import BrokerInterface
from app.schemas.trade import TradeRequest
from app.config import settings


class FivePaisaAdapter(BrokerInterface):
    """5paisa API adapter"""
    
    def __init__(self, api_key: str, api_secret: str, access_token: str):
        self.api_key = api_key
        self.api_secret = api_secret
        self.access_token = access_token
        self.base_url = settings.FIVEPAISA_API_BASE_URL
    
    async def _make_request(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None,
        data: Optional[Dict] = None
    ) -> Dict:
        """Make HTTP request to 5paisa API"""
        url = f"{self.base_url}{endpoint}"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.access_token}",
            "X-API-KEY": self.api_key
        }
        
        async with httpx.AsyncClient() as client:
            if method == "GET":
                response = await client.get(url, headers=headers, params=params)
            elif method == "POST":
                response = await client.post(url, headers=headers, json=data)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            response.raise_for_status()
            return response.json()
    
    async def get_instruments(self, exchange: Optional[str] = None) -> List[Dict]:
        """Fetch instruments from 5paisa"""
        try:
            # Mock implementation &&
            # Mock response
            return [
                {
                    "ScripCode": 12345,
                    "Name": "RELIANCE",
                    "Symbol": "RELIANCE",
                    "Exchange": "NSE",
                    "LastTradedPrice": 2500.50
                }
            ]
        except Exception as e:
            print(f"Error fetching instruments from 5paisa: {e}")
            return []
    
    async def get_ltp(self, symbol: str, exchange: str) -> Optional[float]:
        """Get LTP from 5paisa"""
        try:
            # Mock implementation &&
            
            # Mock response
            return 2500.50
        except Exception as e:
            print(f"Error fetching LTP from 5paisa: {e}")
            return None
    
    def normalize_symbol(self, symbol: str, exchange: str) -> str:
        """Normalize symbol for 5paisa"""
        return symbol.upper()
    
    async def place_order(self, order_request: TradeRequest) -> Dict:
        """Place order with 5paisa"""
        try:
            # Map our order types to 5paisa order types
            order_type_map = {
                "LIMIT": "L",
                "MARKET": "MKT",
                "STOP_LOSS": "SL",
                "SL_MARKET": "SL-M"
            }
            
            product_type_map = {
                "INTRADAY": "I",
                "DELIVERY": "D",
                "NORMAL": "C",
                "MTF": "M"
            }
            
            order_data = {
                "Exchange": order_request.exchange,
                "ExchangeType": "C",  
                "ScripCode": 0,  # Need to resolve from symbol
                "Price": order_request.price if order_request.price_type == "LIMIT" else 0,
                "OrderType": order_type_map.get(order_request.price_type, "MKT"),
                "Qty": order_request.quantity,
                "DisQty": order_request.disclosed_quantity or 0,
                "StopLossPrice": order_request.trigger_price or 0,
                "IsIntraday": order_request.product == "INTRADAY",
                "ProductType": product_type_map.get(order_request.product, "I"),
                "IsStopLossOrder": order_request.price_type in ["STOP_LOSS", "SL_MARKET"],
            }
            
            # Mock implementation &&
            
            # Mock response
            return {
                "order_id": f"FIVEPAISA_{order_request.symbol}_{order_request.quantity}",
                "status": "COMPLETED",
                "message": "Order placed successfully"
            }
        except Exception as e:
            return {
                "order_id": None,
                "status": "FAILED",
                "error": str(e)
            }
