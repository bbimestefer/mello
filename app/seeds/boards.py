from app.models import db, Board, environment, SCHEMA


def seed_boards():
    board1 = Board(
        user_id=1, name='Work', background='nightsky')
    board2 = Board(
        user_id=2, name='Work', background='coffee')
    board3 = Board(
        user_id=3, name='Job', background='mountains')
    board4 = Board(
        user_id=1, name='Personal', background='forest')

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the boards table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM boards")

    db.session.commit()
