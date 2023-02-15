from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), nullable=False)
    watched = db.Column(db.Boolean, default=False) #should this be just in frontend?
    card_order = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # - Many to One: List has one Board through board_id
    board = db.relationship('Board', back_populates='lists')

    # - One to Many: List will have many cards through list_id
    cards = db.relationship('Card', back_populates='list', cascade='all, delete-orphan')


    def to_dict(self):
        """
        Returns a dict representing List
        {
            id,
            name,
            board_id,
            watched,
            card_order,
            created_at,
            updated_at,
            cards
        }
        """
        return {
            'id': self.id,
            'name': self.name,
            'board_id': self.board_id,
            'watched': self.watched,
            'card_order': self.card_order,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'cards': [card.to_dict() for card in self.cards]
        }
