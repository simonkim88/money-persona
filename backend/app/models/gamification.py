from sqlalchemy import Column, Integer, JSON, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
import uuid

class Gamification(Base):
    __tablename__ = "gamification"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # JSON list of badge IDs e.g. ["first_step", "saver_king"]
    badges_earned = Column(JSON, default=list)
    
    # JSON dict of mission status e.g. {"mission_1": "completed", "mission_2": "in_progress"}
    missions_completed = Column(JSON, default=dict)
    
    current_streak = Column(Integer, default=0)
    last_login = Column(DateTime(timezone=True), default=func.now())
    
    user = relationship("User", back_populates="gamification")
