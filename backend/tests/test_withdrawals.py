import pytest

def test_post_withdrawal(client, test_user, me):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    account_id = me["account_id"]
    response = client.post("/account/{account_id}/withdrawal")

    assert response.status_code == 201