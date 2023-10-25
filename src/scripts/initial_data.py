from sql_app import schemas, models, crud, database

TEST = True

def initialize_data():
    models.Base.metadata.drop_all(bind=database.engine)
    models.Base.metadata.create_all(bind=database.engine)
    db = database.SessionLocal()
    for user in INITIAL_DATA['users']:
        crud.create_user(db=db, user=user)
    for game in INITIAL_DATA['games']:
        crud.create_game(db=db, game=game)
    db.close()


INITIAL_DATA = {
      'users': [
          schemas.UserBase(email='strakovskaya.am@gmail.com', name='admin', password='12'),
          schemas.UserBase(email='randambery@gmail.com', name='admin2', password='12')
      ],
      'games': [
          schemas.GameBase(name='Numbers'),
          schemas.GameBase(name='Alchemy'),
          schemas.GameBase(name='Hangman'),
          schemas.GameBase(name='Numbers2'),
          schemas.GameBase(name='Affixes'),
      ],
      'game_rounds': [
          schemas.GameRoundBase(game_id=1, score=20, user_id=1),
          schemas.GameRoundBase(game_id=1, score=10, user_id=2),
          schemas.GameRoundBase(game_id=2, score=55, user_id=1),
          schemas.GameRoundBase(game_id=2, score=5, user_id=2),
      ]
}

if __name__=='__main__':
    initialize_data()

    if TEST:

        db = database.SessionLocal()
        for round in INITIAL_DATA['game_rounds']:
            crud.create_game_round(db=db, game_round=round)
        db.close()