from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity

app = Flask(__name__)

app.config.from_object('project.config.Config')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True,  origins="http://localhost:3000")
app.config["JWT_SECRET_KEY"] = "SECRET_KEY"
app.config['JWT_TOKEN_LOCATION'] = ['headers']
jwt = JWTManager(app)

login_manager = LoginManager()
login_manager.init_app(app)

login_manager.login_view = 'login'


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

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    print(f"email: {email}, password: {password}")

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'message': 'Invalid email or password'}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password'}), 401
    access_token = create_access_token(identity=user.id)
    ret = {'access_token': access_token, 'id':  user.id,
           'email': user.email, 'username': user.username}
    return jsonify(ret), 200


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
            if data.get('username'):
                user.username = data['username']
            if data.get('email'):
                user.email = data['email']
            db.session.commit()
            return jsonify({'message': 'User updated'}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error updating user', e: e}), 500


@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User account deleted'}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error deleting user account'}), 500


@app.route('/protected', methods=['GET'])
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Testing...'}), 200
