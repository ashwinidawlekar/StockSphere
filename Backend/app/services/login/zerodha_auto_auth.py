import time
import logging
from typing import Optional, Dict, Any
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import pyotp

logger = logging.getLogger(__name__)

class ZerodhaAutoAuth:
    """Handles automated login to Zerodha Kite and retrieves access token"""
    
    KITE_LOGIN_URL = "https://kite.zerodha.com/"
    KITE_API_URL = "https://kite.zerodha.com/connect/login"
    
    def __init__(self, user_id: str, password: str, totp_secret: str, api_key: str):
        self.user_id = user_id
        self.password = password
        self.totp_secret = totp_secret
        self.api_key = api_key
        self.driver = None
        
    def __enter__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(options=options)
        return self
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.driver:
            self.driver.quit()
            
    def get_totp(self) -> str:
        """Generate TOTP using the secret"""
        return pyotp.TOTP(self.totp_secret).now()
        
    def authenticate(self) -> Dict[str, Any]:
        """Perform the authentication flow and return access token"""
        if not self.driver:
            raise RuntimeError("WebDriver not initialized. Use as context manager.")
            
        try:
            # Step 1: Navigate to Kite login
            self.driver.get(self.KITE_LOGIN_URL)
            
            # Step 2: Enter user ID and password
            user_id_field = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//input[@type='text']"))
            )
            password_field = self.driver.find_element(By.XPATH, "//input[@type='password']")
            
            user_id_field.clear()
            user_id_field.send_keys(self.user_id)
            password_field.send_keys(self.password)
            self.driver.find_element(By.XPATH, "//button[@type='submit']").click()
            
            # Step 3: Enter TOTP
            totp_field = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//input[@label='Enter your user ID']/following-sibling::input"))
            )
            totp = self.get_totp()
            totp_field.send_keys(totp)
            self.driver.find_element(By.XPATH, "//button[@type='submit']").click()
            
            # Step 4: Wait for redirect and extract request token
            WebDriverWait(self.driver, 10).until(
                lambda d: "request_token" in d.current_url
            )
            
            # Extract request token from URL
            request_token = self.extract_request_token(self.driver.current_url)
            if not request_token:
                raise Exception("Failed to extract request token from URL")
                
            return {
                "success": True,
                "request_token": request_token,
                "error": None
            }
            
        except TimeoutException as e:
            error_msg = f"Timeout during login: {str(e)}"
            logger.error(error_msg)
            return {
                "success": False,
                "request_token": None,
                "error": error_msg
            }
        except Exception as e:
            error_msg = f"Login failed: {str(e)}"
            logger.error(error_msg)
            return {
                "success": False,
                "request_token": None,
                "error": error_msg
            }
    
    @staticmethod
    def extract_request_token(url: str) -> Optional[str]:
        """Extract request token from URL"""
        from urllib.parse import urlparse, parse_qs
        parsed = urlparse(url)
        params = parse_qs(parsed.query)
        return params.get('request_token', [None])[0]