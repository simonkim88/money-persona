from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from app.db.session import get_db
from app.models.user import User
from app.services.gamification_service import GamificationService

router = APIRouter()

class AnswerItem(BaseModel):
    question_id: int
    choice_index: int # 0 or 1

class SubmitQuizRequest(BaseModel):
    user_id: str
    answers: List[AnswerItem]

@router.get("/story")
async def get_story_questions():
    # Return list of 12 questions (Static or from DB)
    return [
        {
            "id": 1,
            "text": "You find a treasure chest...",
            "choices": [{"text": "Open it", "value": "D"}, {"text": "Check for traps", "value": "P"}]
        }
        # ... add rest
    ]

@router.post("/submit")
async def submit_quiz(request: SubmitQuizRequest, db: Session = Depends(get_db)):
    # 1. Calculate Persona from answers
    # 2. Save PillarScores
    # 3. Update User Persona
    # 4. Award XP (Gamification)
    
    # Mock result
    mock_persona = "D-F-S-R"
    
    # GamificationService.award_xp(user, 100, db)
    
    return {
        "persona_code": mock_persona,
        "xp_gained": 100
    }
