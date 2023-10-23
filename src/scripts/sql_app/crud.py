from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserBase):
    db_user = models.User(email=user.email, password=user.password, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_games(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Game).offset(skip).limit(limit).all()

def create_game(db: Session, game: schemas.GameBase):
    db_games = models.Game(name=game.name)
    db.add(db_games)
    db.commit()
    db.refresh(db_games)
    return db_games

def create_game_round(db: Session, game_round: schemas.GameRoundBase):
    db_game_rounds = models.GameRound(score=game_round.score, user_id=game_round.user_id, game_id=game_round.game_id)
    db.add(db_game_rounds)
    db.commit()
    db.refresh(db_game_rounds)
    return db_game_rounds

def get_game_rounds(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.GameRound).offset(skip).limit(limit).all()

def get_game_rounds_user(db: Session, user_id : int):
    return db.query(models.GameRound).filter(models.GameRound.user_id == user_id).all()


