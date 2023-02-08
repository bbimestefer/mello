from .db import db, environment, SCHEMA, add_prefix_for_prod
from .card_labels import card_labels

class Label(db.Model):
    __tablename__ = 'labels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String(100), nullable=False)

    #One to Many: Label has many cards through label_id
    cards = db.relationship('Card', secondary=card_labels, back_populates='label')

    def to_dict(self):
        """
        Returns a dict representing Card
        {
            id,
            color,
            cards
        }
        """
        return {
            'id': self.id,
            'color': self.color,
            'cards': [card.to_dict_no_label() for card in self.cards]
        }

    def to_dict_no_card(self):
        """
        Returns a dict representing Card
        {
            id,
            color
        }
        """
        return {
            'id': self.id,
            'color': self.color,
        }
