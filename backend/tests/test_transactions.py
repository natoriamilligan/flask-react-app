import pytest

def test_get_transactions(client, me):
    account_id = me["account_id"]
    response = client.get(f"/account/{account_id}/transactions")

    assert response.status_code == 200