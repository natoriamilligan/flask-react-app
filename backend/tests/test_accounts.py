def test_login_success(client, test_user):
  response = client.post("/login"), json={
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
  response = client.post("/refresh")

  assert response.status_code == 200
  cookies = response.headers.getlist("Set-Cookie")
  assert any("access_token" in c for c in cookies)
  assert any("refresh_token" in c for c in cookies)
