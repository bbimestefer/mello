from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    card_id = IntegerField('card_id', validators=[DataRequired()])
    description = StringField('description', validators=[Length(max=200)])
