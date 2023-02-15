from .db import db, environment, SCHEMA, add_prefix_for_prod
from .card_labels import card_labels
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # - Many to One: Comment has many cards through card_id
    card = db.relationship('Card', back_populates='comments')

    def to_dict(self):
        """
        Returns a dict representing a comment
        {
            id,
            card_id,
            description,
            created_at,
            updated_at
        }
        """
        return {
            'id': self.id,
            'card_id': self.card_id,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
