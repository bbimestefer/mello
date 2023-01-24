from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    background = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # - Many to One: Board has one User through user_id
    user = db.relationship('User', back_populates='boards')

    # - One to Many: Board will have many lists through board_id
    lists = db.relationship('List', back_populates='board', cascade='all, delete-orphan')

    def to_dict(self):
        """
        Returns a dict representing Board
        {
            id,
            user_id,
            name,
            background,
            created_at,
            updated_at,
            lists
        }
        """
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'background': self.background,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'lists': [list.to_dict() for list in self.lists]
        }
