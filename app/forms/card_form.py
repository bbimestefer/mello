from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length

class CardForm(FlaskForm):
    list_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    description = StringField('description', validators=[Length(max=100)])
    watched = BooleanField('watched', default=False)
