"""FastAPI application entry point"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import accounts  # , marketwatch, trades
from app.api.endpoints import auth  # Auth endpoints
from app.core.database import engine, Base

# Note: Database tables are created via alembic migrations


from contextlib import asynccontextmanager
import asyncio
from app.services.account_service import AccountService

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize broker sessions for all enabled accounts
    # We do this in background to not block server startup
    asyncio.create_task(AccountService.initialize_all_sessions())
    yield
    # Shutdown logic if needed

app = FastAPI(
    title="StockSphere Trading Backend",
    description="Multi-account trading backend with Zerodha and 5paisa support",
    version="1.0.0",
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)  # Auth: /api/v1/auth/*
app.include_router(accounts.router, prefix=settings.API_V1_PREFIX)  # Accounts: /api/v1/accounts/*
# app.include_router(marketwatch.router, prefix=settings.API_V1_PREFIX)  # Commented out - has import errors
# app.include_router(trades.router, prefix=settings.API_V1_PREFIX)  # Commented out - has import errors






@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "StockSphere Trading Backend API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}
