from flask.views import MethodView
from flask_smorest import Blueprint

from models import TransferModel, DepositModel, WithdrawalModel
from schemas import TransactionSchema, AccountSchema, DepositSchema, WithdrawalSchema, TransferSchema

blp = Blueprint("transactions", __name__, description="Operation on transactions")

@blp.route("/transactions")
class TransactionList(MethodView):
    @blp.response(200, TransactionSchema(many=True))
    def get(self):
        deposits = DepositModel.query.all()
        withdrawals = WithdrawalModel.query.all()
        transfers = TransferModel.query.all()

        deposit_data = DepositSchema(many=True).dump(deposits)
        withdrawal_data = WithdrawalSchema(many=True).dump(withdrawals)
        transfer_data = TransferSchema(many=True).dump(transfers)

        for d in deposit_data:
            d["type"] = "Deposit"
        for w in withdrawal_data:
            w["type"] = "Withdrawal"
        for t in transfer_data:
            t["type"] = "Transfer"

        transactions = deposit_data + withdrawal_data + transfer_data
        transactions.sort(key=lambda x: x["timestamp"], reverse=True)

        return transactions