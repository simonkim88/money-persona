from fastapi import APIRouter
from app.api.v1.endpoints import users, quiz, chat

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(quiz.router, prefix="/quiz", tags=["quiz"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
