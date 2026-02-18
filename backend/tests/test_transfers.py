import pytest

def test_post_transfer(client, test_user, me):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    account_id = me["account_id"]
    response = client.post("/account/{account_id}/transfer")

    assert response.status_code == 201