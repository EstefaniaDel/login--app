from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import psycopg2
from psycopg2 import extras
from cryptography.fernet import Fernet

app = Flask(__name__)
key = Fernet.generate_key()
app.config.from_object('project.config.Config')
db = SQLAlchemy(app)
login_manager = LoginManager()


# Create a connection to the database
def get_connection():
    conn = psycopg2.connect(
        host="localhost", database="postgres", user="postgres", password="secret")
    return conn


@login_manager.user_loader
def load_user(id):
    return get_connection.query.get(int(id))


@app.route('/login', methods=['GET', 'POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = get_connection.query.filter_by(email=email).first()

    if user:
        if Fernet(key).decrypt(user.password) == password:
            login_user(user)
            return jsonify({'message': 'Logged in successfully'})
        else:
            return jsonify({'message': 'Invalid email or password'})


@app.route('/register', methods=['POST'])
def create_user():
    try:
        new_user = request.get_json()
        username = new_user['username']
        email = new_user['email']
        password = Fernet(key).encrypt(bytes(new_user['password'], 'utf-8'))

        conn = get_connection()
        cur = conn.cursor()

        cur.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                    (username, email, password))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'message': 'User created'}), 201
    except Exception as e:
        return jsonify({'message': 'Error creating user'}), 500


@app.route('/profile')
@login_required
def profile():
    return jsonify({'message': 'Profile page!'})


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})


@app.route('/users', methods=['GET'])
def get_users():
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=extras.RealDictCursor)
        cur.execute("SELECT * FROM users")
        users = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(users)
    except Exception as e:
        return jsonify({'message': 'Error fetching users'}), 500


@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=extras.RealDictCursor)
        cur.execute("SELECT * FROM users WHERE id = %s", (id,))
        user = cur.fetchone()

        if user is None:
            return jsonify({'message': 'User not found'}), 404

        return jsonify(user)
    except Exception as e:
        return jsonify({'message': 'Error fetching user'}), 500


@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=extras.RealDictCursor)
        cur.execute("DELETE FROM users WHERE id = %s RETURNING *", (id,))
        user = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if user is None:
            return jsonify({'message': 'User not found'}), 404

        return jsonify({'message': 'User deleted'})
    except Exception as e:
        return jsonify({'message': 'Error deleting user'}), 500


@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=extras.RealDictCursor)
        update_user = request.get_json()
        username = update_user['username']
        email = update_user['email']
        password = Fernet(key).encrypt(bytes(update_user['password'], 'utf-8'))

        cur.execute("UPDATE users SET username = %s, email = %s, password = %s WHERE id = %s RETURNING *",
                    (username, email, password, id))

        new_user = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if new_user is None:
            return jsonify({'message': 'User not found'}), 404

        return jsonify(new_user)
    except Exception as e:
        return jsonify({'message': 'Error updating user'}), 500


@app.route('/')
def index():
    return jsonify({'message': 'Test'})
