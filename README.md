 # FutureReady India — AI, Skills & Entry-Level Employment

> **An open-source flagship research and technology initiative examining how Artificial Intelligence is transforming entry-level work and skill requirements for young workers in India.**

---

## 📌 Executive Overview

Indian graduates entering the workforce face a complex labor market transition:
**Degree → No experience → Changing job market → AI adoption → Unclear skills → Difficulty knowing what to learn next.**

Rather than making generic claims about job loss, **FutureReady India** decomposes 40 entry-level occupations across 8 key sectors in India into specific operational tasks. By scoring each task across five dimensions (AI Replaceability, Human Judgment, Social Interaction, Unstructured Creativity, and Technical Complexity), the initiative provides an empirical foundation for workforce readiness.

The platform combines **labor-market evidence** (WEF *Future of Jobs Report 2025* and ILO *India Employment Report 2024*) with a **data-driven career application** featuring interactive research dashboards, occupation task timelines, a 25-question scenario assessment, a transparent career match engine, a checkable 12-week learning roadmap, and a persistent, grounded AI assistant (**Ask FutureReady**).

---

## 🏛️ Key Features

1. **Editorial & Minimal Visual Identity**: Pearl warm off-white design language (`#F7F7F4`), high-contrast typography (Plus Jakarta Sans / Inter), electric blue accents (`#4F6FFF`), soft mint highlights (`#B8E8D4`), and dark contrast sections (`#111315`).
2. **Interactive Data Storytelling**: Viewport-animated horizontal AI Exposure charts, hover cards, and 3-way skill gap matrix (Employer Demand vs. Graduate Skills vs. Future Signals).
3. **Magazine-Style Occupation Explorer**: Detailed task timelines comparing AI Replaceability Potential against Human Judgment Requirements.
4. **Scenario-Based Assessment**: 1-question-per-screen scenario test UI with progress line (`━━━━━━━━━━━━━━○────`), large typography, and option selection feedback.
5. **Personal FutureReady Profile**: Overall readiness index (e.g. 71/100), core strengths vs. priority growth areas, skill constellation graphic, top 3 matching career paths, and an interactive 12-week checkable roadmap timeline.
6. **Persistent `✦ Ask FutureReady` Assistant**: Grounded AI modal drawer available across all views, retrieving evidence from research documents, occupation records, and user assessment profiles.
7. **Open Science & Research Hub**: Executive Research Report (15 sections), Policy Brief ("*Preparing India's Graduates for an AI-Enabled Labour Market*"), downloadable `.csv` datasets, and technical documentation.

---

## 🏗️ Repository Architecture

```text
FutureReady-India/
│
├── frontend/                     # React 18 + Vite + Tailwind CSS Platform
│   ├── src/
│   │   ├── components/          # Navbar, Footer, AskFutureReadyModal, HeroVisualization
│   │   ├── pages/               # Home, ResearchDashboard, OccupationExplorer, Assessment, PathwayEngine, ResearchHub
│   │   ├── App.jsx              # Application router & context state
│   │   └── index.css            # Editorial design system tokens & glassmorphism
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Python FastAPI Analytical & Grounded Assistant Engine
│   ├── routers/                 # occupations, research, assessment, recommendations, chatbot
│   ├── database.py              # CSV Data Repository layer
│   ├── models.py                # Pydantic data schemas
│   ├── main.py                  # FastAPI application entry point
│   └── tests/                   # Pytest automated test suite
│
├── data/
│   └── processed/
│       ├── occupation_tasks.csv  # 40 roles, ~200 task exposure scores
│       ├── occupation_skills.csv # Skills taxonomy & employer demand frequency
│       └── graduate_survey.csv   # 200+ respondent sample dataset
│
├── research/
│   ├── report.md                # 15-section academic research report
│   └── policy_brief.md          # 3-page Policy Brief for educators & policymakers
│
├── docs/
│   ├── methodology.md           # Task Exposure Score mathematical formula
│   └── data_dictionary.md       # Open dataset column specifications
│
└── README.md
```

---

## 🧮 AI Task Exposure Mathematical Model

For any operational task $t$, exposure is formulated as:
$$E_t = \frac{R_t}{4.0} \times \left(1.0 - 0.40 \times \frac{J_t + S_t + C_t}{12.0}\right)$$

Where:
- $R_t$: AI Replaceability (0.0 to 4.0)
- $J_t$: Human Judgment & Strategic Decision Requirement (0.0 to 4.0)
- $S_t$: Social Interaction & Empathy Requirement (0.0 to 4.0)
- $C_t$: Unstructured Creativity Requirement (0.0 to 4.0)

Career path matching uses a transparent weighted formulation:
$$\text{MatchScore} = 0.50 (\text{Skill Match}) + 0.20 (\text{Interest}) + 0.15 (\text{AI Readiness}) + 0.15 (\text{Future Alignment})$$

---

## 🚀 How to Run Locally

### 1. Start the Python Backend
```bash
# From repository root
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload --port 8000
```
Backend API interactive documentation will be live at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 2. Run Backend Test & Security Suite
```bash
python -m pytest backend/tests
```

### 3. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend Web Platform will be live at: [http://localhost:3000](http://localhost:3000)

Alternatively on Windows, double-click `Start-FutureReady.bat` to launch both servers and open the browser automatically.

---

## 🌐 Public Website Deployment Options

### Option A: 1-Click Free Hosting on GitHub Pages (Recommended)
This repository includes an automated GitHub Actions deployment workflow:
1. Push this repository to your GitHub account.
2. In your GitHub repository, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The site will automatically build and publish to:
   `https://<your-username>.github.io/<repository-name>/`
*(The site includes embedded offline data fallbacks so all dashboards, assessments, and AI guidance function immediately even without a dedicated backend server).* 

### Option B: Vercel / Netlify
1. Import the repository in [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Set Root Directory to `frontend`.
3. Framework Preset will auto-detect **Vite**. Click **Deploy**.

### Option C: Full-Stack on Render
1. Create a free account on [Render](https://render.com).
2. Click **New +** → **Blueprint** and connect this repository.
3. Render reads `render.yaml` and launches the backend which also serves the frontend build.

---

## 🔒 Security & Safe Public Viewing

- **Zero Secrets**: Contains NO API keys, passwords, or personal credentials.
- **Defensive Headers**: Equipped with `nosniff`, `SAMEORIGIN`, CSP, and strict referrer policies.
- **Path Traversal Protection**: Dataset downloads are validated against strict allowlists.
- **Continuous Auditing**: GitHub Actions and Dependabot continuously monitor dependencies.
- See [`SECURITY.md`](SECURITY.md) for complete security documentation.

---

## ⚠️ Methodological Limitations

1. **Regional & Sectoral Sample**: The 200+ graduate survey dataset represents an initial sample concentrated in tier-1 urban education hubs.
2. **AI Capability Recalibration**: State-of-the-art AI capabilities evolve rapidly; task exposure models require periodic recalibration.
3. **Exposure $\neq$ Job Loss**: High AI Exposure signifies that routine execution is automating, shifting job roles toward human evaluation, AI copilot auditing, and business storytelling.

---

## 📄 License & Open Science
Published under Open Science principles. Datasets and reports are available for academic, educational, and public-interest usage.

