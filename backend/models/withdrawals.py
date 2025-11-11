from db import db
from datetime import datetime, timezone

class WithdrawalModel(db.Model):
    __tablename__ = "withdrawals"

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float(precision=2), unique=False, nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey("accounts.id"), nullable=False)
    account = db.relationship("AccountModel", back_populates="withdrawals")
    timestamp = db.Column(db.Datetime, default=lambda: datetime.now(timezone.utc))