import os
from flask import Flask, jsonify
from flask_smorest import Api
from db import db
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import timedelta
from flask_migrate import Migrate
from dotenv import load_dotenv

from models import BlocklistModel
from resources.accounts import blp as AccountsBlueprint
from resources.deposits import blp as DepositsBlueprint
from resources.withdrawals import blp as WithdrawalsBlueprint
from resources.transfers import blp as TransfersBlueprint
from resources.transactions import blp as TransactionsBlueprint

def create_app():
    app = Flask(__name__)
    load_dotenv()
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Banking API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"

    db.init_app(app)
    migrate = Migrate(app, db)
    api = Api(app)

    app.config["JWT_SECRET_KEY"] = "79023088310581544527589837667420155225"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
    jwt = JWTManager(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        return BlocklistModel.query.filter(BlocklistModel.jti == jwt_payload["jti"]).first() is not None
    
    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {"description": "The token has been revoked.", "error": "token_revoked"}
            ),
            401,
        )

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (
            jsonify({"message": "The token has expired.", "error": "token_expired"}),
            401,
        )
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification failed.", "error": "invalid_token"}
            ),
            401,
        )
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (
            jsonify(
                {
                    "description": "Request does not contain an access token.",
                    "error": "authorization_required",
                }
            ),
            401,
        )
    
    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {
                    "description": "The token is not fresh.",
                    "error": "fresh_token_required",
                }
            ),
            401,
        )

    api.register_blueprint(AccountsBlueprint)
    api.register_blueprint(DepositsBlueprint)
    api.register_blueprint(WithdrawalsBlueprint)
    api.register_blueprint(TransfersBlueprint)
    api.register_blueprint(TransactionsBlueprint)

    return app


    
