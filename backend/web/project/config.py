import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres:secret@localhost:5432/postgres")
    SQLALCHEMY_TRACK_MODIFICATIONS = False