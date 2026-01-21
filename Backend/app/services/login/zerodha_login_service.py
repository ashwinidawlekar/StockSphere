import asyncio
import logging
from datetime import datetime, timedelta, time as dt_time
from typing import Dict, Any, Optional
import pytz

from app.models.account import Account
from app.services.login.base_login_service import BaseLoginService
from app.services.login.zerodha_browser_login import ZerodhaBrowserLogin
from app.core.encryption import encryption_service
from app.core.database import AsyncSessionLocal

logger = logging.getLogger(__name__)

# ZerodhaLoginService class is used to perform login using browser automation and also handles token validation and refreshing
class ZerodhaLoginService(BaseLoginService):
    """Automated login service for Zerodha using Kite Connect"""
    
    def __init__(self):
        self.browser_login = ZerodhaBrowserLogin()
    
    async def login(self, account: Account) -> Dict[str, Any]:
        """Perform login using browser automation"""
        return await self.browser_login.login(account)
    
    async def is_token_valid(self, account: Account) -> bool:
        """
        Check if the current access token is valid
        
        Zerodha tokens expire daily at 7:30 AM IST
        """
        if not account.access_token or not account.token_generated_at:
            logger.debug(f"Account {account.account_id}: No token or timestamp found")
            return False
        
        if self._is_token_expired(account.token_generated_at):
            logger.info(f"Account {account.account_id}: Token expired (past 7:30 AM IST)")
            return False
        
        logger.info(f"Account {account.account_id}: Token is valid (generated after 7:30 AM IST)")
        return True
    
    def _is_token_expired(self, token_generated_at: datetime) -> bool:
        """
        Check if token has expired based on 7:30 AM IST cutoff
        
        Per Zerodha documentation: Tokens expire at 7:30 AM IST daily
        
        Args:
            token_generated_at: UTC timestamp when token was generated
            
        Returns:
            True if token has expired, False otherwise
        """
        ist = pytz.timezone('Asia/Kolkata')
        utc = pytz.UTC
        
        if token_generated_at.tzinfo is None:
            token_generated_at = utc.localize(token_generated_at)
        
        token_time_ist = token_generated_at.astimezone(ist)
        current_time_ist = datetime.now(ist)
        
        today_730am_ist = ist.localize(
            datetime.combine(current_time_ist.date(), dt_time(7, 30, 0))
        )
        
        if current_time_ist >= today_730am_ist:
            cutoff_time = today_730am_ist
        else:
            cutoff_time = today_730am_ist - timedelta(days=1)
        
        is_expired = token_time_ist < cutoff_time
        
        logger.debug(
            f"Token check: generated at {token_time_ist.strftime('%Y-%m-%d %H:%M:%S %Z')}, "
            f"cutoff at {cutoff_time.strftime('%Y-%m-%d %H:%M:%S %Z')}, "
            f"expired: {is_expired}"
        )
        
        return is_expired
    
    async def ensure_valid_token(self, account: Account) -> bool:
        """
        Ensure the account has a valid access token
        """
        if not await self.is_token_valid(account):
            logger.info(f"Account {account.account_id}: Token invalid or expired, refreshing...")
            return await self._refresh_token(account)
        return True
    
    async def _refresh_token(self, account: Account) -> bool:
        """Refresh the access token"""
        result = await self.login(account)
        
        if result.get("success") and result.get("access_token"):
            # Update account with new token
            async with AsyncSessionLocal() as session:
                # Fetch the account 
                db_account = await session.get(Account, account.account_id)
                if db_account:
                    db_account.access_token = result["access_token"]
                    db_account.token_generated_at = result["token_generated_at"]
                    session.add(db_account)
                    await session.commit()
                    
                    account.access_token = result["access_token"]
                    account.token_generated_at = result["token_generated_at"]
                    
                    logger.info(f"Successfully refreshed token for account {account.account_id}")
                    return True
        
        logger.error(f"Failed to refresh token for account {account.account_id}: {result.get('error', 'Unknown error')}")
        return False