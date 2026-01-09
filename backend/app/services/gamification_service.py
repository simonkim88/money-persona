import math
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.gamification import Gamification

class GamificationService:
    @staticmethod
    def calculate_level(xp: int) -> int:
        # Simple formula: Level = sqrt(XP / 100) + 1
        return int(math.sqrt(xp / 100)) + 1

    @staticmethod
    async def award_xp(user: User, amount: int, db: Session) -> User:
        user.xp += amount
        new_level = GamificationService.calculate_level(user.xp)
        if new_level > user.level:
            user.level = new_level
            # Logic to trigger "Level Up" event could go here
        
        db.add(user)
        # Commit should be handled by the caller or global dependency
        return user

    @staticmethod
    async def check_badges(user: User, gamification: Gamification, db: Session):
        # Example logic: Award "First Step" if XP > 0
        if "first_step" not in gamification.badges_earned and user.xp > 0:
            gamification.badges_earned = gamification.badges_earned + ["first_step"]
            db.add(gamification)
