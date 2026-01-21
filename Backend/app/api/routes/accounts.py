"""Account API routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.user import User
from app.schemas.account import AccountCreate, AccountResponse, AccountUpdate
from app.services.account_service import AccountService

router = APIRouter(prefix="/accounts", tags=["accounts"])


@router.post("/validate")
async def validate_account(
    account_data: AccountCreate,
    current_user: User = Depends(get_current_user)
):
    """Validate broker credentials without saving"""
    result = await AccountService.validate_account_credentials(account_data)
    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("error", "Validation failed")
        )
    
    return {
        "valid": True,
        "message": "Credentials validated successfully!",
        "broker": account_data.broker_name
    }


from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks

@router.post("", response_model=AccountResponse, status_code=status.HTTP_201_CREATED)
async def create_account(
    account_data: AccountCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new trading account"""
    try:
        account = await AccountService.create_account(db, account_data, current_user)
        # Trigger background login validation
        background_tasks.add_task(AccountService.perform_background_login, account.account_id)
        return account
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("", response_model=List[AccountResponse])
async def get_accounts(
    enabled_only: bool = False,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all trading accounts for current user"""
    accounts = await AccountService.get_user_accounts(
        db, 
        user_id=current_user.user_id, 
        enabled_only=enabled_only
    )
    return accounts


@router.get("/{account_id}", response_model=AccountResponse)
async def get_account(
    account_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get specific account by ID (must own it)"""
    account = await AccountService.get_account(db, account_id)
    if not account or account.owner_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Account with id {account_id} not found"
        )
    return account


@router.put("/{account_id}", response_model=AccountResponse)
async def update_account(
    account_id: int,
    account_data: AccountUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update an account (must own it)"""
    # Verify ownership
    existing = await AccountService.get_account(db, account_id)
    if not existing or existing.owner_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Account with id {account_id} not found"
        )
    
    account = await AccountService.update_account(db, account_id, account_data)
    return account


@router.delete("/{account_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_account(
    account_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete an account (must own it)"""
    # Verify ownership
    existing = await AccountService.get_account(db, account_id)
    if not existing or existing.owner_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Account with id {account_id} not found"
        )
    
    success = await AccountService.delete_account(db, account_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Account with id {account_id} not found"
        )
