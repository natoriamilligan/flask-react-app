import pytest
from passlib.hash import pbkdf2_sha256
from models import AccountModel
from db import db

@pytest.fixture(scope="session")
def create_test_user(app):
    with app.app_context():
        test_user = AccountModel(
            firstname="Test",
            lastname="User",
            username="test_user",
            password=pbkdf2_sha256.hash("bunnyB45!!!")
        )
    
        db.session.add(AccountModel)
        db.sessison.commit()
        return test_user

@pytest.fixture(scope="session")
def me(client, test_user):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })
    return client.get("/me").get_json()