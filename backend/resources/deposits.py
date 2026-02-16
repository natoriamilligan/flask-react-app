from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required

from db import db
from models import AccountModel, DepositModel
from schemas import DepositSchema

blp = Blueprint("deposits", __name__, description="Operation on deposits")

@blp.route("/account/<int:account_id>/deposit")
class AccountDeposit(MethodView):
    @blp.response(200, DepositSchema(many=True))
    def get(self, account_id):
        account = AccountModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404

        return account.deposits.all()

    @jwt_required()
    @blp.arguments(DepositSchema)
    def post(self, deposit_data, account_id):

        account = AccountModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404

        account.balance = account.balance + deposit_data["amount"]
        deposit = DepositModel(account_id=account_id, **deposit_data)

        try:
            db.session.add(deposit)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occured adding the deposit to the database")

        return {"message": "Deposit was successfully posted."}, 201

@blp.route("/deposit/<int:deposit_id>")
class Deposit(MethodView):
    @blp.response(200, DepositSchema)
    def get(self, deposit_id):
        deposit = DepositModel.query.get(deposit_id)

        if not deposit:
            return {"message": "Deposit not found."}, 404

        return deposit
