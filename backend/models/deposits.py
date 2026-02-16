from datetime import datetime, timezone
from db import db

class DepositModel(db.Model):
    __tablename__ = "deposits"

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float(precision=2), unique=False, nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey("accounts.id"), nullable=False)
    account = db.relationship("AccountModel", back_populates="deposits")
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
