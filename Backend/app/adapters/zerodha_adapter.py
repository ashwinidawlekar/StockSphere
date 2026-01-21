"""Zerodha Kite Connect adapter"""
from typing import List, Dict, Optional
import httpx
from app.adapters.base import BrokerInterface
from app.schemas.trade import TradeRequest
from app.config import settings


class ZerodhaAdapter(BrokerInterface):
    """Zerodha Kite Connect API adapter"""
    
    def __init__(self, api_key: str, api_secret: str, access_token: str):
        self.api_key = api_key
        self.api_secret = api_secret
        self.access_token = access_token
        self.base_url = settings.ZERODHA_API_BASE_URL
        self.kite_url = f"{self.base_url}/connect"
    
    async def _make_request(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None,
        data: Optional[Dict] = None
    ) -> Dict:
        """Make HTTP request to Kite API"""
        url = f"{self.kite_url}{endpoint}"
        headers = {
            "X-Kite-Version": "3",
            "Authorization": f"token {self.api_key}:{self.access_token}"
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
    # not working as of now facing issues with the websocket connection
    async def get_instruments(self, exchange: Optional[str] = None) -> List[Dict]:
        """Fetch instruments from Zerodha"""
        try:
            # Mock implementation 
            if exchange:
                endpoint = f"/instruments/{exchange}"
            else:
                endpoint = "/instruments"
            
            # For now, return mock data
            
            
            # Mock response
            return [
                {
                    "instrument_token": 123456,
                    "exchange_token": "NSE",
                    "tradingsymbol": "RELIANCE",
                    "name": "RELIANCE",
                    "last_price": 2500.50,
                    "exchange": "NSE"
                }
            ]
        except Exception as e:
            print(f"Error fetching instruments from Zerodha: {e}")
            return []
    
    async def get_ltp(self, symbol: str, exchange: str) -> Optional[float]:
        """Get LTP from Zerodha"""
        try:
            # Mock implementation 
            instrument_token = f"{exchange}:{symbol}"
            
            
            # Mock response
            return 2500.50
        except Exception as e:
            print(f"Error fetching LTP from Zerodha: {e}")
            return None
    
    def normalize_symbol(self, symbol: str, exchange: str) -> str:
        """Normalize symbol for Zerodha (usually uppercase)"""
        return symbol.upper()
    
    async def place_order(self, order_request: TradeRequest) -> Dict:
        """Place order with Zerodha"""
        try:
            # Map our order types to Zerodha order types
            variety_map = {
                "REGULAR": "regular",
                "BO": "bo",
                "CO": "co"
            }
            
            product_map = {
                "INTRADAY": "MIS",
                "DELIVERY": "CNC",
                "NORMAL": "NRML",
                "MTF": "MTF"
            }
            
            order_type_map = {
                "LIMIT": "LIMIT",
                "MARKET": "MARKET",
                "STOP_LOSS": "SL",
                "SL_MARKET": "SL-M"
            }
            
            order_data = {
                "exchange": order_request.exchange,
                "tradingsymbol": self.normalize_symbol(order_request.symbol, order_request.exchange),
                "transaction_type": order_request.side,
                "quantity": order_request.quantity,
                "price": order_request.price if order_request.price_type == "LIMIT" else None,
                "product": product_map.get(order_request.product, "MIS"),
                "order_type": order_type_map.get(order_request.price_type, "MARKET"),
                "validity": order_request.time_in_force or "DAY",
                "variety": variety_map.get(order_request.order_type, "regular"),
            }
            
            if order_request.trigger_price:
                order_data["trigger_price"] = order_request.trigger_price
            
            if order_request.disclosed_quantity:
                order_data["disclosed_quantity"] = order_request.disclosed_quantity
            
            
            # Mock response
            return {
                "order_id": f"ZERODHA_{order_request.symbol}_{order_request.quantity}",
                "status": "COMPLETED",
                "message": "Order placed successfully"
            }
        except Exception as e:
            return {
                "order_id": None,
                "status": "FAILED",
                "error": str(e)
            }
