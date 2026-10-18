import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["project"] == "FutureReady India"

def test_occupations_summary():
    response = client.get("/api/occupations")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert "occupation" in data[0]

def test_research_statistics():
    response = client.get("/api/research/statistics")
    assert response.status_code == 200
    data = response.json()
    assert data["total_jobs_analyzed"] >= 40
    assert data["total_sectors"] >= 8

def test_assessment_questions():
    response = client.get("/api/assessment/questions")
    assert response.status_code == 200
    questions = response.json()
    assert len(questions) >= 5

def test_recommendations_engine():
    payload = {
        "degree": "BCA",
        "graduation_year": 2024,
        "field_of_study": "Computer Science",
        "answers": {"q1": 75, "q2": 70, "q3": 80, "q4": 80, "q5": 75, "q6": 80}
    }
    response = client.post("/api/recommendations", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert "profile" in res
    assert "top_matches" in res
    assert "roadmap" in res
    assert res["profile"]["overall_readiness_score"] > 50

def test_chatbot_assistant():
    payload = {"message": "Why is SQL recommended for me?"}
    response = client.post("/api/chatbot", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert "sql" in res["answer"].lower()
    assert len(res["citations"]) > 0

def test_security_headers():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "SAMEORIGIN"
    assert "default-src" in response.headers.get("content-security-policy", "")

def test_safe_dataset_download_and_path_traversal_prevention():
    # Valid download
    response = client.get("/api/data/occupation_tasks.csv")
    assert response.status_code == 200
    assert "occupation_id" in response.text

    # Path traversal attempt should be rejected with 404
    bad_response = client.get("/api/data/../../backend/main.py")
    assert bad_response.status_code == 404

    # Disallowed file request should be rejected with 404
    bad_file = client.get("/api/data/secret.env")
    assert bad_file.status_code == 404

def test_input_validation_oversized_payload_rejection():
    # Message exceeding 1000 characters should be rejected with 422
    huge_message = "A" * 1500
    response = client.post("/api/chatbot", json={"message": huge_message})
    assert response.status_code == 422
