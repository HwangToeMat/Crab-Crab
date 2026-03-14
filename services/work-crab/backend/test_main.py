from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Work-Crab API!"}

def test_create_task():
    response = client.post(
        "/tasks",
        json={"user_id": 1, "title": "Test Task", "priority": "High", "estimated_time": 60}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Test Task"

def test_get_burnout_status():
    response = client.get("/burnout-status/1")
    assert response.status_code == 200
    assert "energy_level" in response.json()
    assert "status" in response.json()
