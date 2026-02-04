from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required

from db import db
from models import TransferModel, AccountModel
from schemas import TransferSchema

blp = Blueprint("transfers", __name__, description="Operation on transfers")

@blp.route("/account/<int:account_id>/sent_transfers")
class AccountSentTransdfer(MethodView):
    @blp.response(200, TransferSchema(many=True))
    def get(self, account_id):
        account = TransferModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404
        
        return account.sent_transfers.all()
    
@blp.route("/account/<int:account_id>/received_transfers")
class AccountReceivedtransfer(MethodView):
    @blp.response(200, TransferSchema(many=True))
    def get(self, account_id):
        account = TransferModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404
        
        return account.received_transfers.all()
    
@blp.route("/transfer")
class AccountTransfer(MethodView):
    @jwt_required()
    @blp.arguments(TransferSchema)
    @blp.response(200, TransferSchema)
    def post(self, transfer_data):

        if transfer_data["submitter_id"] == transfer_data["recipient_id"]:
            return {"message": "Submitter cannot be the same as receiver."}, 400
        else:
            submitter = AccountModel.query.get(transfer_data["submitter_id"])
            recipient = AccountModel.query.get(transfer_data["recipient_id"])

            if not submitter:
                return {"message": "Submitter cannot be the same as receiver."}, 400

            if not recipient:
                return {"message": "Submitter cannot be the same as receiver."}, 400

            if submitter.balance - transfer_data["amount"] < 0:
                return {"message": "Not enough funds."}, 422
            else:
                submitter.balance = submitter.balance - transfer_data["amount"]
                recipient.balance = recipient.balance + transfer_data["amount"]

            transfer = TransferModel(**transfer_data)
            
            try:
                db.session.add(transfer)
                db.session.commit()
            except SQLAlchemyError:
                abort(500, message="An error occured adding the transaction to the database")

            return {"message": "Transfer successful!"}, 201

        
