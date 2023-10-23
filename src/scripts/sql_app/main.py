from typing import Union

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from mail import send_registration_email, send_restore_email
from pydantic import BaseModel


from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import event

from . import crud, models, schemas
from .database import SessionLocal, engine

from .schemas import UserBase


app = FastAPI()

#models.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:*"
    "http://127.0.0.1:8000",
    "http://127.0.0.1:51888",
    "http://127.0.0.1:51900",
    "*",
    "http://localhost:3000/registration"

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/send_email")
def read_root(user: UserBase):
    send_registration_email(user.email, user.password, user.name)
    return {"status": "OK"}

@app.post("/send_restore_email")
def restore(user: UserBase):
    print(user.email, user.password, user.name)
    send_restore_email(user.email, user.password, user.name)
    return {"status": "OK"}


@app.post("/users/")
def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    crud.create_user(db=db, user=user)
    return {"status": 200}


@app.get("/users/")
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{email}")
def read_user(email: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/games/")
def read_games(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    games = crud.get_games(db, skip=skip, limit=limit)
    return games

@app.get("/game_rounds/")
def read_game_rounds(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    game_rounds = crud.get_game_rounds(db, skip=skip, limit=limit)
    return game_rounds

@app.get("/game_rounds/{user_id}")
def read_game_rounds_user(user_id: int, db: Session = Depends(get_db)):
    game_rounds = crud.get_game_rounds_user(db, user_id=user_id)
    return game_rounds

@app.post("/game_rounds/")
def create_game_round(game_round: schemas.GameRoundBase, db: Session = Depends(get_db)):
    crud.create_game_round(db=db, game_round=game_round)
    return {"status": 200}