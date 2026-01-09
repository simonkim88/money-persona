from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
import uuid
from app.db.base import Base

class ChatSender(str, enum.Enum):
    USER = "user"
    AI_MENTOR = "ai_mentor"

class ChatLog(Base):
    __tablename__ = "chat_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    session_id = Column(String, nullable=True) # For grouping conversation sessions
    
    message = Column(Text, nullable=False)
    sender = Column(SAEnum(ChatSender), default=ChatSender.USER)
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="chat_logs")
