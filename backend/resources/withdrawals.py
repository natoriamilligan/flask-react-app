from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required

from db import db
from models import AccountModel, WithdrawalModel
from schemas import WithdrawalSchema

blp = Blueprint("withdrawals", __name__, description="Operation on withdrawals")

@blp.route("/account/<int:account_id>/withdrawal")
class AccountWithdrawal(MethodView):
    @blp.response(200, WithdrawalSchema(many=True))
    def get(self, account_id):
        account = AccountModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404

        return account.withdrawals.all()

    @jwt_required()
    @blp.arguments(WithdrawalSchema)
    def post(self, withdrawal_data, account_id):
        account = AccountModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404

        if account.balance - withdrawal_data["amount"] < 0:
            return {"message": "Not enough funds."}, 422

        account.balance = account.balance - withdrawal_data["amount"]

        withdrawal = WithdrawalModel(account_id=account_id, **withdrawal_data)

        try:
            db.session.add(withdrawal)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occured adding the withdrawal to the database")

        return {"message" : "Withdrawal successful!"}, 201

@blp.route("/withdrawal/<int:withdrawal_id>")
class Deposit(MethodView):
    @blp.response(200, WithdrawalSchema)
    def get(self, withdrawal_id):
        withdrawal = WithdrawalModel.query.get(withdrawal_id)

        if not withdrawal:
            return {"message": "Withdrawal not found."}, 404

        return withdrawal
