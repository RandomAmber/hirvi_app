from sqlalchemy.orm import Session
from sqlalchemy import desc
from sqlalchemy import join, select
from sqlalchemy.sql import text

from sql_app import database, models, schemas

db = database.SessionLocal()

con = database.engine.connect()

#sql = text('SELECT * from USERS LEFT JOIN GAME_ROUNDS ON USERS.ID = GAME_ROUNDS.USER_ID;') 
#result = con.execute(sql) 

#result = db.query(models.GameRound, models.User).join(models.User, models.User.id == models.GameRound.user_id).filter(models.User.id == models.GameRound.user_id)
result =  db.query(models.User.name, models.GameRound.score)\
        .join(models.GameRound, models.User.id==models.GameRound.user_id)\
        .filter(models.GameRound.game_id == 1).order_by(desc(models.GameRound.score)).limit(3).all()

db.close()

print(result)
for r in result:
    print(r._asdict())