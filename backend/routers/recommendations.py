from fastapi import APIRouter
from backend.models import AssessmentSubmission, RecommendationsResponse, FutureReadyProfile, SkillScore, CareerPathMatch, RoadmapWeek
from backend.database import db

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations Engine"])

@router.post("", response_model=RecommendationsResponse)
def generate_recommendations(submission: AssessmentSubmission):
    """Processes candidate assessment and produces a FutureReady Profile, Career Matches, and 12-Week Roadmap."""
    answers = submission.answers
    
    # Calculate scores per skill category
    q1 = answers.get("q1", 40)
    q2 = answers.get("q2", 40)
    q3 = answers.get("q3", 50)
    q4 = answers.get("q4", 45)
    q5 = answers.get("q5", 30)
    q6 = answers.get("q6", 60)

    sql_score = q1
    ai_readiness_score = q2
    comm_score = q3
    analytical_score = q4
    python_score = q5
    empathy_score = q6

    overall_readiness = int((sql_score + ai_readiness_score + comm_score + analytical_score + python_score + empathy_score) / 6)

    skill_scores = [
        SkillScore(skill="Analytical Thinking", score=analytical_score, target="85+", category="Cognitive", status="Strong" if analytical_score >= 75 else "Developing"),
        SkillScore(skill="Business Communication", score=comm_score, target="80+", category="Human", status="Strong" if comm_score >= 75 else "Developing"),
        SkillScore(skill="Python Scripting", score=python_score, target="70+", category="Technical", status="Strong" if python_score >= 70 else ("Priority" if python_score < 50 else "Developing")),
        SkillScore(skill="SQL & Querying", score=sql_score, target="80+", category="Technical", status="Priority" if sql_score < 60 else "Developing"),
        SkillScore(skill="AI Tool Verification", score=ai_readiness_score, target="85+", category="AI Readiness", status="Priority" if ai_readiness_score < 60 else "Developing"),
        SkillScore(skill="De-escalation & Empathy", score=empathy_score, target="80+", category="Human", status="Strong" if empathy_score >= 75 else "Developing")
    ]

    strengths = []
    growth_areas = []

    for s in skill_scores:
        if s.status == "Strong":
            strengths.append(s.skill)
        elif s.status == "Priority":
            growth_areas.append(s.skill)

    if not strengths:
        strengths = ["Analytical Thinking", "Business Communication"]
    if not growth_areas:
        growth_areas = ["SQL & Querying", "AI Tool Verification"]

    profile = FutureReadyProfile(
        overall_readiness_score=overall_readiness,
        strengths=strengths,
        growth_areas=growth_areas,
        skill_scores=skill_scores
    )

    # Compute matches for core occupations
    occupations_data = [
        {
            "id": 31,
            "name": "Junior Data Analyst",
            "sector": "Data",
            "base_match": 60,
            "req_sql": True,
            "why": ["Strong analytical problem-solving foundation", "High alignment with data-driven decision trends"],
            "missing": ["SQL & Database Querying", "Power BI Data Visualization"]
        },
        {
            "id": 6,
            "name": "Business Analyst",
            "sector": "Business",
            "base_match": 58,
            "req_sql": False,
            "why": ["Strong business communication capabilities", "Solid logical workflow modeling"],
            "missing": ["Requirement Gathering Documentation", "Advanced Excel Modeling"]
        },
        {
            "id": 1,
            "name": "Junior Developer",
            "sector": "Technology",
            "base_match": 55,
            "req_sql": True,
            "why": ["Demonstrated problem decomposition", "Understanding of software logic"],
            "missing": ["Git & CI/CD Pipelines", "System Architecture & Security Audit"]
        }
    ]

    top_matches = []
    rank = 1
    for occ in occupations_data:
        # Match calculation logic: base + (analytical*0.25) + (comm*0.15)
        calculated_match = int(occ["base_match"] + (analytical_score * 0.20) + (comm_score * 0.15))
        calculated_match = min(98, max(50, calculated_match))

        top_matches.append(CareerPathMatch(
            rank=rank,
            occupation_id=occ["id"],
            occupation=occ["name"],
            sector=occ["sector"],
            match_percentage=calculated_match,
            why_fit=occ["why"],
            missing_priority_skills=occ["missing"]
        ))
        rank += 1

    # 12-week roadmap
    roadmap = [
        RoadmapWeek(
            week_range="Weeks 01–03",
            title="SQL Fundamentals & Relational Querying",
            hours_per_week="4–6 hrs/wk",
            topics=["SELECT, WHERE, JOIN statements", "Group By & Aggregate functions", "Subqueries & Window Functions"],
            mini_project="Query a 50,000 row e-commerce database to extract monthly revenue insights.",
            completed=False
        ),
        RoadmapWeek(
            week_range="Weeks 04–06",
            title="Data Cleaning & Exploratory Analysis in Python",
            hours_per_week="5–7 hrs/wk",
            topics=["Pandas DataFrame manipulation", "Handling missing data & outliers", "Data visualization with Seaborn"],
            mini_project="Clean and analyze a real-world messy survey dataset.",
            completed=False
        ),
        RoadmapWeek(
            week_range="Weeks 07–08",
            title="Power BI / Dashboard Storytelling",
            hours_per_week="4–5 hrs/wk",
            topics=["Data modeling & relationships", "DAX measures", "Interactive dashboard visual hierarchy"],
            mini_project="Build an executive KPI dashboard for business operations.",
            completed=False
        ),
        RoadmapWeek(
            week_range="Weeks 09–10",
            title="AI-Assisted Workflow & Verification",
            hours_per_week="4–6 hrs/wk",
            topics=["Structured prompt engineering", "AI code review & security debugging", "Hallucination verification techniques"],
            mini_project="Build an automated data pipeline co-created with LLM assistance.",
            completed=False
        ),
        RoadmapWeek(
            week_range="Weeks 11–12",
            title="Capstone Portfolio & Executive Presentation",
            hours_per_week="6–8 hrs/wk",
            topics=["End-to-end analytical problem framing", "GitHub documentation", "Executive video presentation"],
            mini_project="Publish a GitHub repository and live project showcase.",
            completed=False
        )
    ]

    return RecommendationsResponse(
        profile=profile,
        top_matches=top_matches,
        roadmap=roadmap
    )
