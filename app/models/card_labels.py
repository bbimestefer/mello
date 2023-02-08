from .db import add_prefix_for_prod, db, environment, SCHEMA
from sqlalchemy.sql import func

card_labels = db.Table(
    "card_labels",
    db.Model.metadata,
    db.Column("card_id", db.ForeignKey(
        add_prefix_for_prod("cards.id")), primary_key=True),
    db.Column("label_id", db.ForeignKey(
        add_prefix_for_prod("labels.id")), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

if environment == "production":
    card_labels.schema = SCHEMA
