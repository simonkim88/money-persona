import uuid
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.base import Base

class OAuthProvider(str, enum.Enum):
    KAKAO = "kakao"
    GOOGLE = "google"
    GUEST = "guest"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nickname = Column(String, nullable=True)
    grade = Column(String, nullable=True) # e.g. "Middle School 2"
    oauth_provider = Column(SAEnum(OAuthProvider), default=OAuthProvider.GUEST)
    persona_code = Column(String, ForeignKey("personas.code"), nullable=True)
    
    # Gamification basics
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    persona = relationship("Persona", back_populates="users")
    pillar_scores = relationship("PillarScore", back_populates="user", uselist=False)
    gamification = relationship("Gamification", back_populates="user", uselist=False)
    chat_logs = relationship("ChatLog", back_populates="user")


class PillarScore(Base):
    __tablename__ = "pillar_scores"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    command_score = Column(Integer, default=0)
    time_score = Column(Integer, default=0)
    play_score = Column(Integer, default=0)
    value_score = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="pillar_scores")
