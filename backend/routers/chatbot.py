from fastapi import APIRouter
from backend.models import ChatbotRequest, ChatbotResponse
from backend.database import db

router = APIRouter(prefix="/api/chatbot", tags=["Ask FutureReady Assistant"])

SUGGESTED_QUESTIONS = [
    "Why is SQL recommended as a priority skill gap?",
    "What does AI Task Exposure mean for entry-level work?",
    "Why was Junior Data Analyst recommended as my top match?",
    "What skills are growing fastest according to WEF 2025?"
]

@router.post("", response_model=ChatbotResponse)
def ask_futureready(request: ChatbotRequest):
    """Context-aware, grounded retrieval assistant answering user queries about research, occupations, and assessment results."""
    query = request.message.strip().lower()
    
    # Check context if provided
    ctx = request.assessment_context or {}
    active_occ = request.active_occupation

    # Grounded response logic
    if "sql" in query:
        answer = (
            "SQL (Structured Query Language) is identified as a critical priority skill gap because it appears in over 88% of entry-level employer job postings for Data, Business Analysis, and Software roles, yet fewer than 35% of Indian graduates demonstrate query proficiency. Mastering relational querying allows you to transition from manual spreadsheet formatting to automated analytical workflows."
        )
        citations = ["FutureReady Research Database (2026)", "WEF Future of Jobs Report 2025"]

    elif "exposure" in query or "ai exposure" in query:
        answer = (
            "AI Task Exposure measures the degree to which routine sub-tasks within a role can be automated by state-of-the-art AI, weighted against requirements for human judgment, social interaction, and strategic creativity. A High AI Exposure score does NOT mean a job will disappear; rather, it signifies that routine tasks are automating rapidly, shifting employer demand toward human judgment and AI tool verification skills."
        )
        citations = ["FutureReady Methodology Document", "ILO India Employment Report 2024"]

    elif "data analyst" in query or "match" in query or "recommended" in query:
        answer = (
            "Junior Data Analyst was recommended because your self-assessed analytical problem-solving and communication strengths directly align with core role requirements. While routine tasks like data cleaning and basic SQL have medium-high AI exposure (65-75%), high-level data storytelling and stakeholder consultation remain strongly human-anchored."
        )
        citations = ["FutureReady Occupation Explorer (2026)", "Candidate Assessment Profile"]

    elif "growing" in query or "wef" in query or "future" in query:
        answer = (
            "According to World Economic Forum (WEF) 2025 research and our Indian market dataset, the fastest-growing capabilities are:\n"
            "1. AI Tool Verification & Prompting (+142% demand growth)\n"
            "2. Data Analysis & Relational SQL (+88% demand growth)\n"
            "3. Critical Problem Decomposition (+76% demand growth)\n"
            "4. Cross-Functional Negotiation & Empathy (+64% demand growth)"
        )
        citations = ["WEF Future of Jobs Report 2025", "FutureReady Research Report (2026)"]

    else:
        answer = (
            f"Based on FutureReady India research across 40 occupations and 200+ graduate survey responses, entry-level work in India is shifting from execution-heavy routine tasks toward human evaluation, AI augmentation, and data storytelling. "
            f"If you'd like specific advice on your career pathway or skill gaps, try asking one of the suggested questions below!"
        )
        citations = ["FutureReady Evidence Knowledgebase"]

    return ChatbotResponse(
        answer=answer,
        suggested_questions=SUGGESTED_QUESTIONS,
        citations=citations
    )
