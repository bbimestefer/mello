from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

# Create a comment
@comment_routes.route('/new', methods=["POST"])
@login_required
def create_comment():
    """
    Creates a comment
    """
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment()
        form.populate_obj(new_comment)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400


# Get comment by id
@comment_routes.route('/<int:id>')
@login_required
def single_comment(id):
    """
    Query for a comment by id and returns that comment in a dictionary
    """
    print(id)
    comment = Comment.query.get(id)

    if not comment:
        return {
            'error': 'comment not found'
        }, 404

    return comment.to_dict()



# Update comment
@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_comment(id):
    """
    Updates a comment based on id
    """
    form = CommentForm()

    current_comment = Comment.query.get(id)

    if not current_comment:
        return {"errors": "Comment not found"}, 404

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_comment)
        db.session.add(current_comment)
        db.session.commit()
        return current_comment.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400

# Delete a comment
@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    """
    Deletes a comment
    """
    current_comment = Comment.query.get(id)
    if not current_comment:
        return {"errors": "Comment not found"}, 404

    db.session.delete(current_comment)
    db.session.commit()

    return { "message": "Comment deleted" }, 200
