from app.models import db, Card, environment, SCHEMA


def seed_cards():
    #list 1
    card1 = Card(
        list_id=1, name='Submit Resume')
    card2 = Card(
        list_id=1, name='Network')
    card3 = Card(
        list_id=1, name='Polish sites')
    card4 = Card(
        list_id=1, name='Submit application')

    #list2
    card5 = Card(
        list_id=2, name='Submit Resume')
    card6 = Card(
        list_id=2, name='Contact Employer')
    card7 = Card(
        list_id=2, name='Study code')
    card8 = Card(
        list_id=2, name='Talk with coach')

    #list3
    card9 = Card(
        list_id=3, name='Bring papers to work')
    card10 = Card(
        list_id=3, name='Talk with boss')
    card11 = Card(
        list_id=3, name='Go to meeting')
    card12 = Card(
        list_id=3, name='Pitch idea')

    #list4
    card13 = Card(
        list_id=4, name='Clean house')
    card14 = Card(
        list_id=4, name='Walk dog')
    card15 = Card(
        list_id=4, name='Take trash out')
    card16 = Card(
        list_id=4, name='Work on personal site')

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)
    db.session.add(card6)
    db.session.add(card7)
    db.session.add(card8)
    db.session.add(card9)
    db.session.add(card10)
    db.session.add(card11)
    db.session.add(card12)
    db.session.add(card13)
    db.session.add(card14)
    db.session.add(card15)
    db.session.add(card16)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the cards table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cards")

    db.session.commit()
