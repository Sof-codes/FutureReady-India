from fastapi import APIRouter
from backend.database import db

router = APIRouter(prefix="/api/research", tags=["Research Statistics"])

@router.get("/statistics")
def get_research_statistics():
    """Returns high-level research summary metrics."""
    occupations = db.get_occupations_summary()
    total_jobs = len(occupations)
    sectors = list(set([o['sector'] for o in occupations]))
    
    total_tasks = len(db.tasks_df) if not db.tasks_df.empty else 0
    total_skills = len(db.skills_df['skill_name'].unique()) if not db.skills_df.empty else 0
    survey_count = len(db.survey_df) if not db.survey_df.empty else 0

    # Sector exposure summary
    sector_exposure = []
    if not db.tasks_df.empty:
        grouped = db.tasks_df.groupby('sector')['ai_exposure_score'].mean().reset_index()
        for _, row in grouped.iterrows():
            sector_exposure.append({
                "sector": row['sector'],
                "ai_exposure_score": round(float(row['ai_exposure_score']), 2)
            })

    return {
        "total_jobs_analyzed": total_jobs,
        "total_sectors": len(sectors),
        "total_tasks_analyzed": total_tasks,
        "unique_skills_mapped": total_skills,
        "graduate_survey_responses": survey_count,
        "sectors": sectors,
        "sector_exposure": sector_exposure
    }

@router.get("/skill-gap-matrix")
def get_skill_gap_matrix():
    """Returns the 3-way skill gap breakdown (Employer Demand vs. Graduate Skills vs. Future Signals)."""
    return {
        "priority_gaps": [
            {
                "skill": "SQL & Database Querying",
                "employer_demand": 88,
                "graduate_proficiency": 34,
                "future_importance": 92,
                "category": "Technical",
                "verdict": "Critical Priority Gap"
            },
            {
                "skill": "AI-Assisted Workflow & Verification",
                "employer_demand": 75,
                "graduate_proficiency": 42,
                "future_importance": 95,
                "category": "AI Readiness",
                "verdict": "Emerging Priority Gap"
            },
            {
                "skill": "Data Storytelling & Executive Pitching",
                "employer_demand": 82,
                "graduate_proficiency": 48,
                "future_importance": 89,
                "category": "Human",
                "verdict": "Priority Human Skill Gap"
            },
            {
                "skill": "System Architecture & Security Audit",
                "employer_demand": 68,
                "graduate_proficiency": 28,
                "future_importance": 85,
                "category": "Cognitive",
                "verdict": "Technical Specialization Gap"
            }
        ],
        "growing_skills": [
            {"name": "AI Tool Prompting & Verification", "growth_percent": 142},
            {"name": "Data Analysis & SQL", "growth_percent": 88},
            {"name": "Critical Problem Decomposition", "growth_percent": 76},
            {"name": "Cross-Functional Negotiation", "growth_percent": 64},
            {"name": "System Architecture & Security", "growth_percent": 58}
        ],
        "declining_routine_skills": [
            {"name": "Manual Data Entry & Formatting", "decline_percent": -78},
            {"name": "Basic Scripted Customer Support", "decline_percent": -65},
            {"name": "Routine Test Script Execution", "decline_percent": -54},
            {"name": "Standard Document Copy Generation", "decline_percent": -48}
        ]
    }
