from flask import Flask, jsonify, make_response, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS


app = Flask(__name__)

app.config.from_object('project.config.Config')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True,  origins="http://localhost:3000")


class User (db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password


@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'message': 'Invalid email or password'}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password'}), 401
    return jsonify({'message': 'Login successful'}), 200


@app.route('/register', methods=['POST'])
def create_user():
    try:

        data = request.get_json()
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=bcrypt.generate_password_hash(
                data['password']).decode('utf-8')
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created'}), 201
    except Exception as e:
        return jsonify({'message': 'Error creating user'}), 500


@app.route('/logout', methods=['GET'])
def logout_user():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200


@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        user_list = [{'id': user.id, 'username': user.username,
                      'email': user.email} for user in users]
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching users'}), 500


@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    try:
        user = User.query.get(id)
        if user:
            user_info = {'id': user.id,
                         'username': user.username, 'email': user.email}
            return jsonify(user_info), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error fetching user'}), 500


@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        user = User.query.get(id)
        if user:
            data = request.get_json()
            user.username = data['username']
            user.email = data['email']
            db.session.commit()
            return jsonify({'message': 'User updated'}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error updating user'}), 500


@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted'}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error deleting user'}), 500


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Testing...'}), 200
