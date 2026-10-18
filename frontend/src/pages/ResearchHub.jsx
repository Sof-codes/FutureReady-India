import React, { useState } from 'react';
import { FileText, Download, Github, BookOpen, ShieldCheck, Database, FileSpreadsheet, ExternalLink } from 'lucide-react';

export default function ResearchHub() {
  const [activeTab, setActiveTab] = useState('report'); // 'report' | 'brief' | 'datasets' | 'methodology'

  const downloadCSV = (filename) => {
    const link = document.createElement('a');
    // Supports relative static public file for GitHub Pages / static hosting or API fallback
    link.href = `./data/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pearl-200 text-ink-900 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5 text-electric-500" />
          <span>Open Science & Publication Library</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight">
          Research Hub
        </h1>
        <p className="text-base text-ink-600 max-w-2xl">
          Access the full 15-section Research Report, Policy Brief, technical methodology documentation, and downloadable raw `.csv` datasets.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-black/10 pb-4">
        <button
          onClick={() => setActiveTab('report')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'report' ? 'bg-ink-900 text-white shadow-sm' : 'bg-white text-ink-600 hover:bg-pearl-200'
          }`}
        >
          Executive Research Report
        </button>

        <button
          onClick={() => setActiveTab('brief')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'brief' ? 'bg-ink-900 text-white shadow-sm' : 'bg-white text-ink-600 hover:bg-pearl-200'
          }`}
        >
          Policy Brief (PDF Format)
        </button>

        <button
          onClick={() => setActiveTab('datasets')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'datasets' ? 'bg-ink-900 text-white shadow-sm' : 'bg-white text-ink-600 hover:bg-pearl-200'
          }`}
        >
          Open Datasets (.csv)
        </button>

        <button
          onClick={() => setActiveTab('methodology')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'methodology' ? 'bg-ink-900 text-white shadow-sm' : 'bg-white text-ink-600 hover:bg-pearl-200'
          }`}
        >
          Task Exposure Formula
        </button>
      </div>

      {/* TAB 1: EXECUTIVE RESEARCH REPORT */}
      {activeTab === 'report' && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-sm space-y-8 max-w-4xl font-sans">
          
          <div className="border-b border-black/10 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-600">Research Publication</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900">
              FutureReady India: AI, Skills & Entry-Level Employment
            </h2>
            <div className="text-xs text-ink-400">Published August 2026 • Open Access Research</div>
          </div>

          <div className="prose prose-sm text-ink-800 leading-relaxed space-y-6">
            <div>
              <h3 className="text-base font-bold text-ink-900 mb-1">1. Abstract</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                As Generative AI tools and automated workflows permeate the Indian corporate ecosystem, entry-level work is undergoing structural shifts. This study examines task-level AI exposure across 40 representative entry-level occupations in India, synthesizes labor-market signals from WEF Future of Jobs 2025 and ILO India Employment Report 2024, and analyzes primary survey responses from 200+ Indian university graduates.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-ink-900 mb-1">2. Core Findings & Task Replaceability</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Routine execution tasks (boilerplate coding, manual data entry, tier-1 FAQ support) exhibit high AI replaceability ($E_t \ge 0.70$). Conversely, human anchor tasks (system architecture, call de-escalation, data storytelling, conflict resolution) demonstrate high human judgment requirements and growing employer demand.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-ink-900 mb-1">3. The 3-Way Skill Gap Signal</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                SQL querying is required in 88% of technical/analytical employer job postings, yet mastered by only 34% of non-CS graduates. Similarly, AI tool verification skills (prompting, halluncination auditing) are in high demand (+142% growth) but rarely taught in static university curricula.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: POLICY BRIEF */}
      {activeTab === 'brief' && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-sm space-y-8 max-w-4xl">
          <div className="border-b border-black/10 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Policy Brief
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900">
              Preparing India's Graduates for an AI-Enabled Labour Market
            </h2>
            <div className="text-xs text-ink-400">Recommendations for Universities, Employers, and Policymakers</div>
          </div>

          <div className="space-y-6 text-xs text-ink-800 leading-relaxed">
            <div className="p-4 bg-pearl-50 rounded-2xl border border-black/5 space-y-1">
              <div className="font-bold text-sm text-ink-900">For Universities</div>
              <p className="text-ink-600">Shift evaluation criteria from syntax memorization to AI code debugging, output auditing, and security review. Mandate relational database querying across business and arts disciplines.</p>
            </div>

            <div className="p-4 bg-pearl-50 rounded-2xl border border-black/5 space-y-1">
              <div className="font-bold text-sm text-ink-900">For Employers</div>
              <p className="text-ink-600">Redesign entry-level hiring filters around scenario-based problem decomposition rather than rote aptitude tests. Provide structured onboarding guidelines for responsible AI copilot usage.</p>
            </div>

            <div className="p-4 bg-pearl-50 rounded-2xl border border-black/5 space-y-1">
              <div className="font-bold text-sm text-ink-900">For Students</div>
              <p className="text-ink-600">Treat AI tools as accelerators while building deep domain fundamentals to audit their outputs. Build proof-of-work project portfolios on GitHub.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OPEN DATASETS */}
      {activeTab === 'datasets' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-pearl-200 text-ink-900 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5 text-electric-500" />
              </div>
              <div>
                <h4 className="font-bold text-base text-ink-900">occupation_tasks.csv</h4>
                <p className="text-xs text-ink-400 mt-1">40 occupations, ~200 tasks scored on AI replaceability, human judgment, social interaction, and creativity.</p>
              </div>
              <div className="text-[11px] text-ink-400 font-medium">Size: 42 KB • 40 Roles</div>
            </div>
            <button
              onClick={() => downloadCSV('occupation_tasks.csv')}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-pearl-100 hover:bg-ink-900 hover:text-white text-xs font-semibold text-ink-900 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-pearl-200 text-ink-900 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5 text-electric-500" />
              </div>
              <div>
                <h4 className="font-bold text-base text-ink-900">occupation_skills.csv</h4>
                <p className="text-xs text-ink-400 mt-1">Skills taxonomy mapped to entry-level roles with employer demand frequency signals.</p>
              </div>
              <div className="text-[11px] text-ink-400 font-medium">Size: 28 KB • 60+ Skills</div>
            </div>
            <button
              onClick={() => downloadCSV('occupation_skills.csv')}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-pearl-100 hover:bg-ink-900 hover:text-white text-xs font-semibold text-ink-900 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-pearl-200 text-ink-900 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5 text-electric-500" />
              </div>
              <div>
                <h4 className="font-bold text-base text-ink-900">graduate_survey.csv</h4>
                <p className="text-xs text-ink-400 mt-1">200+ respondent Indian graduate survey dataset covering degrees, AI usage, and self-assessed skills.</p>
              </div>
              <div className="text-[11px] text-ink-400 font-medium">Size: 35 KB • 200+ Responses</div>
            </div>
            <button
              onClick={() => downloadCSV('graduate_survey.csv')}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-pearl-100 hover:bg-ink-900 hover:text-white text-xs font-semibold text-ink-900 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>

        </div>
      )}

      {/* TAB 4: METHODOLOGY */}
      {activeTab === 'methodology' && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-sm space-y-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900">Task Exposure Mathematical Formulation</h2>
          
          <div className="bg-pearl-100 p-6 rounded-2xl border border-black/5 text-xs text-ink-900 font-mono space-y-2">
            <div>E_t = (R_t / 4.0) * (1.0 - 0.40 * (J_t + S_t + C_t) / 12.0)</div>
            <div className="text-[11px] text-ink-600 font-sans pt-2">
              Where $R_t$ is AI Replaceability, $J_t$ is Human Judgment, $S_t$ is Social Interaction, and $C_t$ is Unstructured Creativity.
            </div>
          </div>

          <div className="text-xs text-ink-600 leading-relaxed space-y-2">
            <p><strong>High Exposure (E_t ≥ 0.70):</strong> Routine operational execution tasks suitable for automated AI workflow integration.</p>
            <p><strong>Low Exposure (E_t &lt; 0.40):</strong> Human-anchored tasks requiring strategic reasoning, empathy, or novel design.</p>
          </div>
        </div>
      )}

    </div>
  );
}
