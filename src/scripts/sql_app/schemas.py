from typing import Union

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    password: str
    name: str


#class UserCreate(UserBase):
#    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class GameBase(BaseModel):
    name: str

class Game(GameBase):
    id: int

    class Config:
        orm_mode = True

class GameRoundBase(BaseModel):
    score: int
    user_id: int
    game_id: int

class GameRound(GameRoundBase):
    id: int

    class Config:
        orm_mode = True
