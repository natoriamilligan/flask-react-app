import pytest

def test_post_withdrawal(client, me):
    account_id = me["account_id"]

    client.post(f"/account/{account_id}/deposit",json={
        "amount": "100"
    })

    response = client.post(f"/account/{account_id}/withdrawal", json={
        "amount": "50"
    })

    assert response.status_code == 201