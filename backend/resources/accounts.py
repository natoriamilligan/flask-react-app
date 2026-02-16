from flask import jsonify
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, get_jwt, set_access_cookies, set_refresh_cookies

from db import db
from models import AccountModel, BlocklistModel
from schemas import AccountSchema, UpdateAccountSchema, LoginSchema, BlocklistSchema

blp = Blueprint("accounts", __name__, description="Operation on accounts")

@blp.route("/account")
class AccountList(MethodView):
    @blp.response(200, AccountSchema(many=True))
    def get(self):
        return AccountModel.query.all()

@blp.route("/me")
class AccountID(MethodView):
    @jwt_required()
    def get(self):
        account_id = get_jwt_identity()

        if not account_id:
            return {"message": "Account not found."}, 404

        return {"account_id": account_id}

@blp.route("/create")
class CreateAccount(MethodView):
    @blp.arguments(AccountSchema)
    def post(self, account_data):
        if AccountModel.query.filter(AccountModel.username == account_data["username"]).first():
            abort(409, message="The username you entered is already taken.")

        account = AccountModel(
            first_name=account_data["first_name"],
            last_name=account_data["last_name"],
            username=account_data["username"],
            password=pbkdf2_sha256.hash(account_data["password"])
            )

        try:
            db.session.add(account)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occured while inserting the item into the database.")

        return {"message": "Account successfully created!"}, 201

@blp.route("/login")
class AccountLogin(MethodView):
    @blp.arguments(LoginSchema)
    def post(self, account_data):
        account = AccountModel.query.filter(AccountModel.username == account_data["username"]).first()

        if account and pbkdf2_sha256.verify(account_data["password"], account.password):
            access_token = create_access_token(identity=str(account.id), fresh=True)
            refresh_token = create_refresh_token(identity=str(account.id))

            response = jsonify({"message": "Login successful!"})

            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
        else:
            abort(401, message="Invalid credentials.")

        return response, 200

@blp.route("/logout")
class AccountLogout(MethodView):
    @jwt_required(optional=True)
    @blp.arguments(BlocklistSchema)
    def post(self):
        jti = get_jwt()["jti"]

        blocklist = BlocklistModel(jti=jti)

        try:
            db.session.add(blocklist)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occured while inserting the item into the database.")

        return {"message": "Successfully logged out."}, 200

@blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_account = get_jwt_identity()
        new_token = create_access_token(identity=current_account, fresh=False)

        response = jsonify({"message": "Refresh successful!"})

        set_access_cookies(response, new_token)

        return response, 200

@blp.route("/account/<int:account_id>")
class Account(MethodView):
    @blp.response(200, AccountSchema)
    def get(self, account_id):
        account = AccountModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404

        return account

    @jwt_required(fresh=True)
    @blp.arguments(UpdateAccountSchema)
    def put(self, account_data, account_id):
        account = AccountModel.query.get(account_id)

        if account:
            if all(account_data.values()):
                account.password = pbkdf2_sha256.hash(account_data["password"])
            else:
                return {"message" : "New password required."}, 400
        else:
            return {"message" : "Invalid account or password."}, 401

        try:
            db.session.add(account)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occured while inserting the item into the database.")

        return {"message": "Password change successful!"}, 200

    @jwt_required(fresh=True)
    def delete(self, account_id):
        account = AccountModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404

        try:
            db.session.delete(account)
            db.session.commit()

        except SQLAlchemyError:
            abort(500, message="An error occured while deleting the account")

        return {"message": "The account was successfully deleted."}, 200
