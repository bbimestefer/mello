from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length

class ListForm(FlaskForm):
    board_id = IntegerField('board_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    watched = BooleanField('watched', default=False)
