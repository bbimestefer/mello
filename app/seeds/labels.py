from app.models import db, Label, Card, environment, SCHEMA


def seed_labels():
    #Label 1
    label1 = Label(
        color='green')
    label2 = Label(
        color='red')
    label3 = Label(
        color='blue')
    label4 = Label(
        color='purple')
    label5 = Label(
        color='orange')
    label6 = Label(
        color='yellow')


    db.session.add(label1)
    db.session.add(label2)
    db.session.add(label3)
    db.session.add(label4)
    db.session.add(label5)
    db.session.add(label6)

    db.session.commit()

    card1 = Card.query.get(1)
    card2 = Card.query.get(2)
    card3 = Card.query.get(3)
    card4 = Card.query.get(4)

    label1.cards.append(card1)
    label2.cards.append(card2)
    label3.cards.append(card3)
    label4.cards.append(card4)
    
    db.session.add(label1)
    db.session.add(label2)
    db.session.add(label3)
    db.session.add(label4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the labels table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_labels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.labels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM labels")

    db.session.commit()
