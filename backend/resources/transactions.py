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
        withdrawls = WithdrawalModel.query.all()
        transfers = TransferModel.query.all()