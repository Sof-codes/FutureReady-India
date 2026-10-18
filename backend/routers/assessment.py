from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/api/assessment", tags=["Skills Assessment"])

ASSESSMENT_QUESTIONS = [
    {
        "id": "q1",
        "category": "Technical",
        "skill": "Data Analysis & SQL",
        "question": "You receive a raw dataset containing 20,000 customer records with missing values and duplicate emails. What would you feel comfortable doing?",
        "options": [
            {"label": "I wouldn't know where to begin.", "score": 20},
            {"label": "I could filter and remove basic duplicates in Excel.", "score": 40},
            {"label": "I could write SQL scripts to clean, deduplicate, and aggregate the dataset.", "score": 75},
            {"label": "I could analyze the dataset, write SQL queries, and present actionable business recommendations.", "score": 90},
            {"label": "I could construct an automated Python/SQL pipeline with data validation checks.", "score": 100}
        ]
    },
    {
        "id": "q2",
        "category": "AI Readiness",
        "skill": "AI Tool Prompting & Verification",
        "question": "When using AI coding or writing tools (e.g. ChatGPT, GitHub Copilot) for a project, what is your standard approach?",
        "options": [
            {"label": "I rarely use AI tools for my work.", "score": 20},
            {"label": "I copy and paste AI responses directly into my work without checking.", "score": 40},
            {"label": "I use structured prompts and review the output for obvious errors.", "score": 70},
            {"label": "I systematically test AI-generated code, verify facts, and refactor for performance.", "score": 90},
            {"label": "I design complex prompt chains, build custom AI workflows, and audit security vulnerabilities.", "score": 100}
        ]
    },
    {
        "id": "q3",
        "category": "Human",
        "skill": "Business Communication & Storytelling",
        "question": "You discover a key operational bottleneck that costs the team 10 hours a week. How do you communicate this to leadership?",
        "options": [
            {"label": "I would mention it casually to a peer.", "score": 20},
            {"label": "I would send a quick summary email listing the raw issues.", "score": 50},
            {"label": "I would create a clear visual presentation highlighting the issue and cost impact.", "score": 75},
            {"label": "I would present the findings with visual data evidence, proposed solutions, and ROI estimates.", "score": 95}
        ]
    },
    {
        "id": "q4",
        "category": "Cognitive",
        "skill": "Analytical Thinking & Problem Decomposition",
        "question": "When tasked with building a complex system or feature without clear documentation, how do you proceed?",
        "options": [
            {"label": "I wait for step-by-step instructions from a supervisor.", "score": 20},
            {"label": "I search online for pre-made templates and copy them.", "score": 45},
            {"label": "I break the problem down into smaller sub-tasks and solve them incrementally.", "score": 80},
            {"label": "I interview stakeholders, decompose requirements, evaluate trade-offs, and design a modular plan.", "score": 98}
        ]
    },
    {
        "id": "q5",
        "category": "Technical",
        "skill": "Python & Automation",
        "question": "How proficient are you in using Python for task automation or analytical scripts?",
        "options": [
            {"label": "No experience with Python.", "score": 10},
            {"label": "I know basic syntax (variables, loops, print statements).", "score": 40},
            {"label": "I can write scripts using Pandas, NumPy, or REST APIs.", "score": 75},
            {"label": "I can build complete web backends, data pipelines, and automated test suites.", "score": 95}
        ]
    },
    {
        "id": "q6",
        "category": "Human",
        "skill": "Empathy & Conflict Resolution",
        "question": "An unhappy client escalates a major issue caused by a teammate's oversight. How do you handle the conversation?",
        "options": [
            {"label": "Blame the teammate directly to protect my reputation.", "score": 10},
            {"label": "Transfer the call immediately to a manager.", "score": 40},
            {"label": "Listen actively, apologize for the friction, and commit to a clear resolution timeline.", "score": 80},
            {"label": "De-escalate with active empathy, take ownership on behalf of the team, resolve the root cause, and follow up.", "score": 100}
        ]
    }
]

@router.get("/questions")
def get_assessment_questions():
    """Retrieve scenario-based assessment questions."""
    return ASSESSMENT_QUESTIONS
