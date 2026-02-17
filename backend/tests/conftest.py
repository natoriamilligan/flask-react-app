import pytest
from app import create_app
from db import db

BASE_URL = "http://localhost:5000"

@pytest.fixture
def app():
    test_app = create_app("testing")

    with test_app.app_contect():
        db.create_all()
        yield test_app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()
