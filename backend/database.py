import os
import pandas as pd
from typing import List, Dict, Any

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'processed')

class DataRepository:
    def __init__(self):
        self.tasks_df = None
        self.skills_df = None
        self.survey_df = None
        self.reload_data()

    def reload_data(self):
        tasks_path = os.path.join(DATA_DIR, 'occupation_tasks.csv')
        skills_path = os.path.join(DATA_DIR, 'occupation_skills.csv')
        survey_path = os.path.join(DATA_DIR, 'graduate_survey.csv')

        if os.path.exists(tasks_path):
            self.tasks_df = pd.read_csv(tasks_path)
        else:
            self.tasks_df = pd.DataFrame()

        if os.path.exists(skills_path):
            self.skills_df = pd.read_csv(skills_path)
        else:
            self.skills_df = pd.DataFrame()

        if os.path.exists(survey_path):
            self.survey_df = pd.read_csv(survey_path)
        else:
            self.survey_df = pd.DataFrame()

    def get_occupations_summary(self, sector_filter: str = None) -> List[Dict[str, Any]]:
        if self.tasks_df.empty:
            return []
        
        df = self.tasks_df.copy()
        if sector_filter and sector_filter.lower() != 'all':
            df = df[df['sector'].str.lower() == sector_filter.lower()]

        grouped = df.groupby(['occupation_id', 'occupation', 'sector']).agg({
            'ai_exposure_score': 'mean',
            'human_judgement': 'mean',
            'social_interaction': 'mean',
            'creativity': 'mean',
            'task_id': 'count'
        }).reset_index()

        result = []
        for _, row in grouped.iterrows():
            avg_exp = round(float(row['ai_exposure_score']), 2)
            if avg_exp >= 0.70:
                level = "High"
            elif avg_exp >= 0.40:
                level = "Medium"
            else:
                level = "Low"

            result.append({
                "occupation_id": int(row['occupation_id']),
                "occupation": str(row['occupation']),
                "sector": str(row['sector']),
                "ai_exposure_level": level,
                "average_ai_exposure": avg_exp,
                "task_count": int(row['task_id']),
                "human_judgement_avg": round(float(row['human_judgement']), 2),
                "social_interaction_avg": round(float(row['social_interaction']), 2),
                "creativity_avg": round(float(row['creativity']), 2)
            })

        return result

    def get_occupation_detail(self, occupation_id: int) -> Dict[str, Any]:
        occ_tasks = self.tasks_df[self.tasks_df['occupation_id'] == occupation_id]
        if occ_tasks.empty:
            return None

        occ_name = occ_tasks.iloc[0]['occupation']
        sector = occ_tasks.iloc[0]['sector']

        tasks = []
        for _, r in occ_tasks.iterrows():
            tasks.append({
                "task_id": int(r['task_id']),
                "task_name": str(r['task_name']),
                "ai_replaceability": float(r['ai_replaceability']),
                "human_judgement": float(r['human_judgement']),
                "social_interaction": float(r['social_interaction']),
                "creativity": float(r['creativity']),
                "technical_complexity": float(r['technical_complexity']),
                "ai_exposure_score": round(float(r['ai_exposure_score']), 2)
            })

        occ_skills = self.skills_df[self.skills_df['occupation_id'] == occupation_id]
        skills = []
        for _, s in occ_skills.iterrows():
            skills.append({
                "skill_id": str(s['skill_id']),
                "skill_name": str(s['skill_name']),
                "category": str(s['category']),
                "importance": str(s['importance']),
                "future_trend": str(s['future_trend']),
                "employer_demand_frequency": int(s['employer_demand_frequency'])
            })

        avg_exp = round(float(occ_tasks['ai_exposure_score'].mean()), 2)
        if avg_exp >= 0.70:
            level = "High"
        elif avg_exp >= 0.40:
            level = "Medium"
        else:
            level = "Low"

        return {
            "occupation_id": occupation_id,
            "occupation": occ_name,
            "sector": sector,
            "ai_exposure_level": level,
            "average_ai_exposure": avg_exp,
            "human_judgement_avg": round(float(occ_tasks['human_judgement'].mean()), 2),
            "social_interaction_avg": round(float(occ_tasks['social_interaction'].mean()), 2),
            "tasks": tasks,
            "skills": skills
        }

db = DataRepository()
