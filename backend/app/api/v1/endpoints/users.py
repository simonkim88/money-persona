from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User, OAuthProvider
from app.services.gamification_service import GamificationService

router = APIRouter()

@router.post("/login")
async def login(nickname: str, provider: str = "guest", db: Session = Depends(get_db)):
    # TODO: Real OAuth token verification here
    # For now, simplistic "get or create" by nickname
    # In real app, nickname is not unique identifier for login.
    
    # Check if guest exists or create new
    # implementation omitted for brevity, logic:
    # 1. search user by some ID
    # 2. if not found, create User + Gamification record
    
    return {"message": "Login successful (mock)", "user_id": "uuid-placeholder"}

@router.get("/dashboard/{user_id}")
async def get_dashboard(user_id: str, db: Session = Depends(get_db)):
    # Return user details, level, XP, badges, persona
    return {
        "nickname": "TestUser",
        "level": 5,
        "xp": 450,
        "persona": "Navigator",
        "badges": ["First Step", "Saver King"]
    }
