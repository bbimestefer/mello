from app.models import db, List, environment, SCHEMA


def seed_lists():
    list1 = List(
        board_id=1, name='Progress')
    list2 = List(
        board_id=2, name='Progress')
    list3 = List(
        board_id=3, name='Progress')
    list4 = List(
        board_id=4, name='Progress')

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the lists table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")

    db.session.commit()
