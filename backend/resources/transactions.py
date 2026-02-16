from flask.views import MethodView
from flask_smorest import Blueprint

from models import AccountModel
from schemas import TransactionSchema, DepositSchema, WithdrawalSchema, TransferSchema

blp = Blueprint("transactions", __name__, description="Operation on transactions")

@blp.route("/account/<int:account_id>/transactions")
class TransactionList(MethodView):
    @blp.response(200, TransactionSchema(many=True))
    def get(self, account_id):
        account = AccountModel.query.get(account_id)

        if not account:
            return {"message": "Account not found."}, 404

        deposits = account.deposits.all()
        withdrawals = account.withdrawals.all()
        sent_transfers = account.sent_transfers.all()
        received_transfers = account.received_transfers.all()

        deposit_data = DepositSchema(many=True).dump(deposits)
        withdrawal_data = WithdrawalSchema(many=True).dump(withdrawals)
        sent_transfer_data = TransferSchema(many=True).dump(sent_transfers)
        received_transfer_data = TransferSchema(many=True).dump(received_transfers)

        for d in deposit_data:
            d["type"] = "Deposit"
        for w in withdrawal_data:
            w["type"] = "Withdrawal"
        for s in sent_transfer_data:
            s["type"] = "Sent Transfer"
        for r in received_transfer_data:
            r["type"] = "Received Transfer"

        transfer_data = sent_transfer_data + received_transfer_data

        transactions = deposit_data + withdrawal_data + transfer_data
        transactions.sort(key=lambda x: x["timestamp"], reverse=True)

        return transactions
