from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Card, Comment, Label
from app.forms import CardForm

card_routes = Blueprint('cards', __name__)

# Create a card
@card_routes.route('/new', methods=["POST"])
@login_required
def create_card():
    """
    Creates a card
    """
    form = CardForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_card = Card()
        form.populate_obj(new_card)
        db.session.add(new_card)
        db.session.commit()
        return new_card.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400


# Get card by id
@card_routes.route('/<int:id>')
@login_required
def single_card(id):
    """
    Query for a card by id and returns that card in a dictionary
    """
    card = Card.query.get(id)

    if not card:
        return {
            'error': 'Card not found'
        }, 404

    return card.to_dict()



# Update card
@card_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_card(id):
    """
    Updates a card based on id
    """
    form = CardForm()

    current_card = Card.query.get(id)

    if not current_card:
        return {"errors": "Card not found"}, 404

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_card)
        db.session.add(current_card)
        db.session.commit()
        return current_card.to_dict(), 201

    print('ERRORS', form.errors)
    if form.errors:
        return {
             "errors": form.errors
        }, 400

# Delete a card
@card_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_card(id):
    """
    Deletes a card
    """
    current_card = Card.query.get(id)
    if not current_card:
        return {"errors": "Card not found"}, 404

    # if int(current_user.id) != int(current_card.user_id):
    #     return { "errors": "Page not found"}, 404             # figure out new logic

    db.session.delete(current_card)
    db.session.commit()

    return { "message": "Card deleted" }, 200


# Get all comments by card id
@card_routes.route('/<int:id>/comments')
@login_required
def comments(id):
    """
    Query for a comment by card_id and returns the comments in a dictionary
    """
    comments = Comment.query.filter(Comment.card_id == id).all()

    if not comments:
        comments = []

    return {
        "Comments": [comment.to_dict() for comment in comments]
    }, 200


@card_routes.route('/<int:id>/label/<int:labelId>', methods=['POST'])
@login_required
def add_label(id, labelId):
    """
    Adds the label to the card
    """
    card = Card.query.get(id)
    label = Label.query.get(labelId)

    if not card:
        return { "message": "Card not found"}, 404

    if not label:
        return { "message": "Label not found"}, 404

    label.cards.append(card)

    db.session.add(label)
    db.session.commit()

    return { "message": "Label added" }, 200


@card_routes.route('/<int:id>/label/<int:labelId>', methods=['DELETE'])
@login_required
def delete_label(id, labelId):
    """
    Deletes the label from the card
    """

    label = Label.query.get(labelId)

    if len(label.cards):
        for i in range(len(label.cards)):
            if label.cards[i].id == id:
                label.cards.pop(i)

                db.session.add(label)
                db.session.commit()

                return { "message": "Deleted label from card"}
