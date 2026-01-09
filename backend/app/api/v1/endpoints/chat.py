from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.services.rag_service import rag_service

router = APIRouter()

class ChatRequest(BaseModel):
    user_id: str
    message: str
    session_id: str = "default"

@router.post("/message")
async def chat_with_mentor(request: ChatRequest):
    # 1. Valid user check
    # 2. Save User message to ChatLog
    
    response_text = await rag_service.get_response(request.message, request.session_id)
    
    # 3. Save Bot response to ChatLog
    
    return {"reply": response_text}
