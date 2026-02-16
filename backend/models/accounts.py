from db import db
from models.deposits import DepositModel
from models.transfers import TransferModel
from models.withdrawals import WithdrawalModel

class AccountModel(db.Model):
    __tablename__ = "accounts"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    balance = db.Column(db.Float(precision=2), default=0, unique=False, nullable=False)
    sent_transfers = db.relationship("TransferModel", foreign_keys=[TransferModel.submitter_id], back_populates="submitter", lazy="dynamic", cascade="all, delete")
    received_transfers = db.relationship("TransferModel", foreign_keys=[TransferModel.recipient_id], back_populates="recipient", lazy="dynamic", cascade="all, delete")
    deposits = db.relationship("DepositModel", foreign_keys=[DepositModel.account_id], back_populates="account", lazy="dynamic", cascade="all, delete")
    withdrawals = db.relationship("WithdrawalModel", foreign_keys=[WithdrawalModel.account_id], back_populates="account", lazy="dynamic", cascade="all, delete")
