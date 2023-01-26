from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Card
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
