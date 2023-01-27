from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, List, Card
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)


# Create a list
@list_routes.route('/new', methods=["POST"])
@login_required
def create_list():
    """
    Creates a list
    """
    form = ListForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_list = List()
        form.populate_obj(new_list)
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400


# Update a list
@list_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_list(id):
    form = ListForm()

    current_list = List.query.get(id)

    if not current_list:
        return { "errors": "List not found" }, 404

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_list)
        db.session.add(current_list)
        db.session.commit()
        return current_list.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400


# Delete a list
@list_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_list(id):
    """
    Deletes a list
    """
    current_list = List.query.get(id)

    if not current_list:
        return { "errors": "List not found" }, 404

    db.session.delete(current_list)
    db.session.commit()

    return { "message": "List deleted" }, 200


#Query for cards in a list by list id
@list_routes.route('/<int:id>')
@login_required
def all_cards(id):
    """
    Query for all cards of a specific list id
    """
    cards = Card.query.filter(Card.list_id == id).all()

    return {
        "Cards": [card.to_dict() for card in cards]
    }
