from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Label, Card


label_routes = Blueprint('labels', __name__)

@label_routes.route('', methods=['GET'])
@login_required
def get_labels():
    """
    Gets all the labels
    """
    labels = Label.query.all()

    return { 'Labels': [label.to_dict() for label in labels]}


@label_routes.route('/<int:labelId>/label/<int:cardId>', methods=['POST'])
@login_required
def add_label(labelId, cardId):
    """
    Adds the label to the card
    """
    card = Card.query.get(cardId)
    label = Label.query.get(labelId)

    if not card:
        return { "message": "Card not found"}, 404

    if not label:
        return { "message": "Label not found"}, 404

    label.cards.append(card)

    db.session.add(label)
    db.session.commit()

    return { "message": "Label added" }, 200


@label_routes.route('/<int:labelId>/label/<int:cardId>', methods=['DELETE'])
@login_required
def delete_label(labelId, cardId):
    """
    Deletes the label from the card
    """

    label = Label.query.get(labelId)

    if len(label.cards):
        for i in range(len(label.cards)):
            if label.cards[i].id == cardId:
                label.cards.pop(i)

                db.session.add(label)
                db.session.commit()

                return { "message": "Deleted label from card"}
