import pytest

def test_post_deposit(client, me):
    account_id = me["account_id"]
    response = client.post(f"/account/{account_id}/deposit",json={
        "amount": "100"
    })

    assert response.status_code == 201