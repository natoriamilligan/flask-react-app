import pytest

def test_login_success(client, test_user):
    response = client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })
    assert response.status_code == 200
    cookies = response.headers.getlist("Set-Cookie")
    assert any("access_token" in c for c in cookies)
    assert any("refresh_token" in c for c in cookies)

def test_login_failure(client):
    response = client.post("/login", json={
        "username": "wrongUsername",
        "password": "wrongPassword"
    })
    assert response.status_code == 401

def test_refresh_success(client, test_user):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    response = client.post("/refresh")

    assert response.status_code == 200

def test_account_ID(client, test_user):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    response = client.get("/me")

    assert response.status_code == 200

def test_logout(client, test_user):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    response = client.post("/logout")

    assert response.status_code == 200

def test_account(client, test_user, me):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    account_id = me["account_id"]
    response = client.get(f"/account/{account_id}")

    assert response.status_code == 200

def test_update_account(client, test_user, me):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    account_id = me["account_id"]
    response = client.put(f"/account/{account_id}", json={
        "password": "bunnyB46!!!"
    })

    assert response.status_code == 200

def test_no_entry_update_account(client, test_user, me):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    account_id = me["account_id"]
    response = client.put(f"/account/{account_id}", json={
        "password": ""
    })

    assert response.status_code == 400

def test_delete(client, test_user, ME):
    client.post("/login", json={
        "username": test_user.username,
        "password": "bunnyB45!!!"
    })

    account_id = me["account_id"]
    response = client.delete(f"/account/{account_id}")

    assert response.status_code == 200
