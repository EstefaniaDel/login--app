from flask import Flask, jsonify   
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
app.config.from_object('project.config.Config')
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        
@app.route('/')
def index():
    return jsonify({'message': 'Home page!'})