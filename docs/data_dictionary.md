# Data Dictionary — FutureReady India

## 1. `occupation_tasks.csv`
- `occupation_id` (Integer): Unique primary key for the entry-level occupation.
- `occupation` (String): Role title (e.g., "Junior Data Analyst").
- `sector` (String): Industry sector (Technology, Business, Finance, Marketing, HR, Customer Operations, Data, Design/Creative).
- `task_id` (Integer): Unique primary key for the task.
- `task_name` (String): Specific operational task description.
- `ai_replaceability` (Float, 0.0 - 4.0): Capacity of SOTA AI to automate the task.
- `human_judgement` (Float, 0.0 - 4.0): Need for contextual human decision making.
- `social_interaction` (Float, 0.0 - 4.0): Need for interpersonal empathy and negotiation.
- `creativity` (Float, 0.0 - 4.0): Need for novel aesthetic or strategic synthesis.
- `technical_complexity` (Float, 0.0 - 4.0): Domain knowledge required.
- `ai_exposure_score` (Float, 0.0 - 1.0): Calculated composite AI Task Exposure Score.

## 2. `occupation_skills.csv`
- `occupation_id` (Integer): Mapped occupation ID.
- `skill_id` (String): Unique identifier for the skill (e.g., "S02").
- `skill_name` (String): Skill label (e.g., "SQL").
- `category` (String): Category (Technical, Cognitive, Human, AI Readiness).
- `importance` (String): Importance rating (High, Medium, Low).
- `future_trend` (String): Trend indicator (Growing, Stable, Declining).
- `employer_demand_frequency` (Integer, 0 - 100): Normalized demand percentage in employer postings.

## 3. `graduate_survey.csv`
- `response_id` (String): Unique survey respondent identifier.
- `degree` (String): Degree qualification (BCA, B.Tech, B.Com, BBA, B.Sc, BA).
- `graduation_year` (Integer): Graduation year.
- `field_of_study` (String): Field of specialization.
- `employment_status` (String): Current status.
- `python_score` to `problem_solving_score` (Integer, 1 - 5): Self-assessed proficiency.
- `chatgpt_usage_freq` (String): Frequency of AI usage.
- `career_confidence_score` (Integer, 0 - 100): Confidence in entering the workforce.
