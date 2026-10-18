from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from backend.database import db

router = APIRouter(prefix="/api/occupations", tags=["Occupations"])

@router.get("")
def get_occupations(sector: Optional[str] = Query(None)):
    """Retrieve all occupations, optionally filtered by sector."""
    return db.get_occupations_summary(sector_filter=sector)

@router.get("/{occupation_id}")
def get_occupation_detail(occupation_id: int):
    """Retrieve detailed task breakdown and required skills for a specific occupation."""
    detail = db.get_occupation_detail(occupation_id)
    if not detail:
        raise HTTPException(status_code=404, detail="Occupation not found")
    return detail
