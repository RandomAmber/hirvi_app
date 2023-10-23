from sql_app import crud, schemas, models 
from sql_app.database import SessionLocal, engine

def initialize_data():
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    for user in INITIAL_DATA['users']:
        crud.create_user(db=db, user=user)
    for game in INITIAL_DATA['games']:
        crud.create_game(db=db, game=game)
    db.close()


INITIAL_DATA = {
      'users': [
          schemas.UserBase(email='strakovskaya.am@gmail.com', name='admin', password='12')
      ],
      'games': [
          schemas.GameBase(name='Numbers'),
          schemas.GameBase(name='Alchemy'),
          schemas.GameBase(name='Hangman'),
          schemas.GameBase(name='Numbers2'),
          schemas.GameBase(name='Affixes'),
      ]
}

if __name__=='__main__':
    initialize_data()