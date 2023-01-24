from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100))
    watched = db.Column(db.Boolean, default=False) #should this be just in frontend?
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # - Many to One: Board has one User through list_id
    list = db.relationship('List', back_populates='cards')

    def to_dict(self):
        """
        Returns a dict representing Card
        {
            id,
            list_id,
            name,
            description,
            watched,
            created_at,
            updated_at
        }
        """
        return {
            'id': self.id,
            'list_id': self.list_id,
            'name': self.name,
            'description': self.description,
            'watched': self.watched,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
