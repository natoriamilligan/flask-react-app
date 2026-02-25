import pytest

def test_post_transfer(client, me, test_recipient_user, test_user):
    account_id = me["account_id"]

    client.post("/login", json={
        "username": test_recipient_user["username"],
        "password": test_recipient_user["password"]
    })

    recipient_id = client.get("/me").get_json()["account_id"]

    client.post("/login", json={
        "username": test_user["username"],
        "password": "bunnyB45!!!"
    })

    response = client.post("/transfer", json={
        "amount": "100",
        "submitter_id": account_id,
        "recipient_id": recipient_id
    })

    assert response.status_code == 201