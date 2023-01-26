from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Board, List
from app.forms import BoardForm


board_routes = Blueprint('boards', __name__)

# Gets all boards from current user
@board_routes.route('')
@login_required
def boards():
    """
    Query for all boards of a current user and returns them in a list of board dictionaries
    """
    boards = Board.query.filter(Board.user_id == current_user.id).all()
    return {'Boards': [board.to_dict() for board in boards]}

# Get board by id
@board_routes.route('/<int:id>')
@login_required
def board(id):
    """
    Query for a board by id and returns that board in a dictionary
    """
    board = Board.query.get(id)

    if not board:
        return {
            'error': 'Board not found'
        }, 404

    return board.to_dict()

# Create a board
@board_routes.route('/new', methods=["POST"])
@login_required
def create_board():
    """
    Creates a board
    """
    print("REQUEST", request.args)
    form = BoardForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_board = Board()
        form.populate_obj(new_board)
        db.session.add(new_board)
        db.session.commit()
        return new_board.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400

# Update board
@board_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_board(id):
    """
    Updates a board based on id
    """
    form = BoardForm()

    current_board = Board.query.get(id)

    if not current_board:
        return {"errors": "Board not found"}, 404

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_board)
        db.session.add(current_board)
        db.session.commit()
        return current_board.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400

# Delete a board
@board_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_board(id):
    """
    Deletes a board
    """
    current_board = Board.query.get(id)
    if not current_board:
        return {"errors": "Board not found"}, 404

    if int(current_user.id) != int(current_board.user_id):
        return { "errors": "Page not found"}, 404

    db.session.delete(current_board)
    db.session.commit()

    return { "message": "Board deleted" }, 200


# Get all lists
@board_routes.route('/<int:id>/lists')
@login_required
def all_lists(id):
    """
    Query for all lists of a specific board
    """

    lists = List.query.filter(List.board_id == id).all()

    return { "Lists": [list.to_dict() for list in lists] }, 200
