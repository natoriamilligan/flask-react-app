import os
from passlib.hash import pbkdf2_sha256
import pytest
from flask_migrate import upgrade
from app import create_app
from models import AccountModel
from db import db

@pytest.fixture()
def app():
    test_app = create_app("testing")

    db_url = os.getenv("DATABASE_URL")
    test_app.config["SQLALCHEMY_DATABASE_URI"] = db_url

    with test_app.app_context():
        upgrade()
        yield test_app
        db.session.remove()

@pytest.fixture(autouse=True)
def session(app):
    db.session.begin()
    yield
    db.session.rollback()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture()
def test_user(app):
    with app.app_context():
        existingUser = AccountModel.query.filter_by(username="test_user").first()
        if existingUser:
            existingUser.password = pbkdf2_sha256.hash("bunnyB45!!!")
            db.session.commit()
            return {
                "username": existingUser.username,
                "password": "bunnyB45!!!"
            }
        
        test_user = AccountModel(
            first_name="Test",
            last_name="User",
            username="test_user",
            password=pbkdf2_sha256.hash("bunnyB45!!!")
        )
    
        db.session.add(test_user)
        db.session.commit()
        return {
            "username": test_user.username,
            "password": "bunnyB45!!!"
        }

@pytest.fixture()
def test_recipient_user(app):
    with app.app_context():
        existingRecipientUser = AccountModel.query.filter_by(username="test_recipient_user").first()
        if  existingRecipientUser:
            existingRecipientUser.password = pbkdf2_sha256.hash("bunnyB46!!!")
            db.session.commit()
            return {
                "username": existingRecipientUser.username,
                "password": "bunnyB46!!!"
            }
        
        recipient_user = AccountModel(
            first_name="Test",
            last_name="Recipient",
            username="test_recipient_user",
            password=pbkdf2_sha256.hash("bunnyB46!!!")
        )
    
        db.session.add(recipient_user)
        db.session.commit()
        return {
            "username": recipient_user.username,
            "password": "bunnyB46!!!"
        }

@pytest.fixture()
def me(client, test_user):
    client.post("/login", json={
        "username": test_user["username"],
        "password": "bunnyB45!!!"
    })
    return client.get("/me").get_json()
