import pytest

def test_post_transfer(client, me):
    account_id = me["account_id"]
    response = client.post(f"/account/{account_id}/transfer", json={
        "amount": "100",
        "submitter_id": account_id,
        "recipient_id": "2"
    })

    assert response.status_code == 201