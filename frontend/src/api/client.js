import embeddedData from './embeddedData.json';

/**
 * Robust API Client with automatic offline/static fallback.
 * Allows the website to run as a pure static deployment (e.g. GitHub Pages)
 * while seamlessly taking advantage of the live FastAPI backend when available.
 */

// Helper to make API calls with graceful fallback
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    // API server unreachable or offline; fallback will be triggered
    return null;
  }
}

export async function getOccupations(sector = null) {
  const url = sector && sector !== 'All' 
    ? `/api/occupations?sector=${encodeURIComponent(sector)}`
    : '/api/occupations';
  
  const live = await safeFetch(url);
  if (live && Array.isArray(live)) return live;

  // Static fallback
  if (!sector || sector === 'All') {
    return embeddedData.summary;
  }
  return embeddedData.summary.filter(
    o => o.sector.toLowerCase() === sector.toLowerCase()
  );
}

export async function getOccupationDetail(id) {
  const live = await safeFetch(`/api/occupations/${id}`);
  if (live && live.occupation) return live;

  // Static fallback
  return embeddedData.details[id] || embeddedData.details[String(id)] || null;
}

export async function getResearchStatistics() {
  const live = await safeFetch('/api/research/statistics');
  if (live && live.total_jobs_analyzed) return live;

  // Static fallback
  return embeddedData.statistics;
}

export async function getSkillGapMatrix() {
  const live = await safeFetch('/api/research/skill-gap-matrix');
  if (live && live.priority_gaps) return live;

  // Static fallback
  return embeddedData.skill_gap_matrix;
}

export async function getAssessmentQuestions() {
  const live = await safeFetch('/api/assessment/questions');
  if (live && Array.isArray(live) && live.length > 0) return live;

  // Static fallback
  return embeddedData.assessment_questions;
}

export async function submitAssessment(submission) {
  const live = await safeFetch('/api/recommendations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission)
  });
  if (live && live.profile) return live;

  // Static fallback calculation
  const answers = submission.answers || {};
  const q1 = answers['q1'] || 40;
  const q2 = answers['q2'] || 40;
  const q3 = answers['q3'] || 50;
  const q4 = answers['q4'] || 45;
  const q5 = answers['q5'] || 30;
  const q6 = answers['q6'] || 60;

  const readiness = Math.round((q1 + q2 + q3 + q4 + q5 + q6) / 6);

  const skillScores = [
    { skill: "Analytical Thinking", score: q4, target: "85+", category: "Cognitive", status: q4 >= 75 ? "Strong" : "Developing" },
    { skill: "Business Communication", score: q3, target: "80+", category: "Human", status: q3 >= 75 ? "Strong" : "Developing" },
    { skill: "Python Scripting", score: q5, target: "70+", category: "Technical", status: q5 >= 70 ? "Strong" : (q5 < 50 ? "Priority" : "Developing") },
    { skill: "SQL & Querying", score: q1, target: "80+", category: "Technical", status: q1 < 60 ? "Priority" : "Developing" },
    { skill: "AI Tool Verification", score: q2, target: "85+", category: "AI Readiness", status: q2 < 60 ? "Priority" : "Developing" },
    { skill: "De-escalation & Empathy", score: q6, target: "80+", category: "Human", status: q6 >= 75 ? "Strong" : "Developing" }
  ];

  const strengths = skillScores.filter(s => s.status === "Strong").map(s => s.skill);
  const growthAreas = skillScores.filter(s => s.status === "Priority").map(s => s.skill);

  return {
    profile: {
      overall_readiness_score: readiness,
      strengths: strengths.length ? strengths : ["Analytical Thinking", "Business Communication"],
      growth_areas: growthAreas.length ? growthAreas : ["SQL & Querying", "AI Tool Verification"],
      skill_scores: skillScores
    },
    top_matches: [
      {
        rank: 1,
        occupation_id: 11,
        occupation: "Junior Data Analyst",
        sector: "Data",
        match_percentage: 84,
        why_fit: [
          "Strong analytical problem-solving foundation",
          "High alignment with data-driven decision trends"
        ],
        missing_priority_skills: ["SQL & Database Querying", "Power BI Data Visualization"]
      },
      {
        rank: 2,
        occupation_id: 6,
        occupation: "Business Analyst",
        sector: "Business",
        match_percentage: 79,
        why_fit: [
          "High human judgment and structured communication capability",
          "Low exposure to automated displacement"
        ],
        missing_priority_skills: ["Requirement Traceability", "Stakeholder Negotiation"]
      },
      {
        rank: 3,
        occupation_id: 3,
        occupation: "Frontend Developer",
        sector: "Technology",
        match_percentage: 72,
        why_fit: [
          "High growth potential in user experience workflows",
          "Synergy with AI coding copilot tools"
        ],
        missing_priority_skills: ["Modern React Architecture", "API Integration"]
      }
    ],
    roadmap: [
      {
        week_range: "Weeks 1-3",
        title: "Relational Querying & SQL Fundamentals",
        hours_per_week: "8-10 hrs/week",
        topics: ["SELECT, WHERE, JOINs (INNER, LEFT)", "GROUP BY & Aggregate metrics", "Window functions & Subqueries"],
        mini_project: "Query a 50,000 row e-commerce database to extract monthly revenue insights.",
        completed: false
      },
      {
        week_range: "Weeks 4-6",
        title: "Data Cleaning & Exploratory Analysis in Python",
        hours_per_week: "8-10 hrs/week",
        topics: ["Pandas DataFrame manipulation", "Handling missing data & outliers", "Data visualization with Seaborn"],
        mini_project: "Clean and analyze a real-world messy survey dataset.",
        completed: false
      },
      {
        week_range: "Weeks 7-9",
        title: "Business Intelligence & Executive Dashboards",
        hours_per_week: "6-8 hrs/week",
        topics: ["Data modeling & relationships", "DAX measures", "Interactive dashboard visual hierarchy"],
        mini_project: "Build an executive KPI report answering real-world business inquiries.",
        completed: false
      },
      {
        week_range: "Weeks 10-12",
        title: "AI-Augmented Workflows & Storytelling",
        hours_per_week: "6-8 hrs/week",
        topics: ["Prompt engineering for data pipelines", "Auditing LLM hallucinations & code verification", "Executive presentation & slide deck design"],
        mini_project: "Build an automated data pipeline co-created with LLM assistance.",
        completed: false
      }
    ]
  };
}

export async function askChatbot(message, assessmentContext = null, activeOccupation = null) {
  const live = await safeFetch('/api/chatbot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      assessment_context: assessmentContext,
      active_occupation: activeOccupation
    })
  });
  if (live && live.answer) return live;

  // Static fallback response logic
  const query = (message || '').trim().toLowerCase();
  let answer = "";
  let citations = [];

  if (query.includes('sql')) {
    answer = "SQL (Structured Query Language) is identified as a critical priority skill gap because it appears in over 88% of entry-level employer job postings for Data, Business Analysis, and Software roles, yet fewer than 35% of Indian graduates demonstrate query proficiency. Mastering relational querying allows you to transition from manual spreadsheet formatting to automated analytical workflows.";
    citations = ["FutureReady Research Database (2026)", "WEF Future of Jobs Report 2025"];
  } else if (query.includes('exposure') || query.includes('ai exposure')) {
    answer = "AI Task Exposure measures the degree to which routine sub-tasks within a role can be automated by state-of-the-art AI, weighted against requirements for human judgment, social interaction, and strategic creativity. A High AI Exposure score does NOT mean a job will disappear; rather, it signifies that routine tasks are automating rapidly, shifting employer demand toward human judgment and AI tool verification skills.";
    citations = ["FutureReady Methodology Document", "ILO India Employment Report 2024"];
  } else if (query.includes('data analyst') || query.includes('match') || query.includes('recommended')) {
    answer = "Junior Data Analyst was recommended because your self-assessed analytical problem-solving and communication strengths directly align with core role requirements. While routine tasks like data cleaning and basic SQL have medium-high AI exposure (65-75%), high-level data storytelling and stakeholder consultation remain strongly human-anchored.";
    citations = ["FutureReady Occupation Explorer (2026)", "Candidate Assessment Profile"];
  } else if (query.includes('growing') || query.includes('wef') || query.includes('future')) {
    answer = "According to World Economic Forum (WEF) 2025 research and our Indian market dataset, the fastest-growing capabilities are:\n1. AI Tool Verification & Prompting (+142% demand growth)\n2. Data Analysis & Relational SQL (+88% demand growth)\n3. Critical Problem Decomposition (+76% demand growth)\n4. Cross-Functional Negotiation & Empathy (+64% demand growth)";
    citations = ["WEF Future of Jobs Report 2025", "FutureReady Research Report (2026)"];
  } else {
    answer = "Based on FutureReady India research across 40 occupations and 200+ graduate survey responses, entry-level work in India is shifting from execution-heavy routine tasks toward human evaluation, AI augmentation, and data storytelling. If you'd like specific advice on your career pathway or skill gaps, try asking one of the suggested questions below!";
    citations = ["FutureReady Evidence Knowledgebase"];
  }

  return {
    answer,
    suggested_questions: embeddedData.suggested_questions,
    citations
  };
}
