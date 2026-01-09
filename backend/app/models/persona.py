from sqlalchemy import Column, String, Text, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base

class Persona(Base):
    __tablename__ = "personas"

    code = Column(String, primary_key=True) # e.g. "D-F-S-R"
    name = Column(String, nullable=False)
    group = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    img_url = Column(String, nullable=True) # Pixar-style 3D Character URL
    
    strengths = Column(JSON, nullable=True)
    weaknesses = Column(JSON, nullable=True)
    financial_tips = Column(Text, nullable=True)

    users = relationship("User", back_populates="persona")
