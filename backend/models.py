from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class TaskSchema(BaseModel):
    task_id: int
    task_name: str
    ai_replaceability: float
    human_judgement: float
    social_interaction: float
    creativity: float
    technical_complexity: float
    ai_exposure_score: float

class SkillSchema(BaseModel):
    skill_id: str
    skill_name: str
    category: str
    importance: str
    future_trend: str
    employer_demand_frequency: int

class OccupationDetailSchema(BaseModel):
    occupation_id: int
    occupation: str
    sector: str
    ai_exposure_level: str
    average_ai_exposure: float
    tasks: List[TaskSchema]
    skills: List[SkillSchema]
    human_judgement_avg: float
    social_interaction_avg: float

class AssessmentSubmission(BaseModel):
    degree: str = Field(..., max_length=100)
    graduation_year: int = Field(..., ge=1970, le=2100)
    field_of_study: str = Field(..., max_length=150)
    preferred_sector: Optional[str] = Field(None, max_length=100)
    answers: Dict[str, int] = Field(..., max_length=50)

class SkillScore(BaseModel):
    skill: str
    score: int
    target: str
    category: str
    status: str  # Priority, Developing, Strong

class FutureReadyProfile(BaseModel):
    overall_readiness_score: int
    strengths: List[str]
    growth_areas: List[str]
    skill_scores: List[SkillScore]

class CareerPathMatch(BaseModel):
    rank: int
    occupation_id: int
    occupation: str
    sector: str
    match_percentage: int
    why_fit: List[str]
    missing_priority_skills: List[str]

class RoadmapWeek(BaseModel):
    week_range: str
    title: str
    hours_per_week: str
    topics: List[str]
    mini_project: str
    completed: bool = False

class RecommendationsResponse(BaseModel):
    profile: FutureReadyProfile
    top_matches: List[CareerPathMatch]
    roadmap: List[RoadmapWeek]

class ChatbotRequest(BaseModel):
    message: str = Field(..., max_length=1000)
    assessment_context: Optional[Dict[str, Any]] = None
    active_occupation: Optional[str] = Field(None, max_length=100)

class ChatbotResponse(BaseModel):
    answer: str
    suggested_questions: List[str]
    citations: List[str]
