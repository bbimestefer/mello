from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    background = StringField('background', validators=[DataRequired(), Length(max=100)])
