import os
import pytest
from flask_migrate import upgrade
from app import create_app
from db import db

@pytest.fixture
def app():
    test_app = create_app("testing")

    db_url = os.getenv["DATABASE_URL"]
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url

    with test_app.app_context():
        upgrade()
        yield test_app
        db.session.remove()

@pytest.fixture
def client(app):
    return app.test_client()
