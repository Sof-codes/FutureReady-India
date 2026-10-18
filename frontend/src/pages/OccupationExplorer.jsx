import React, { useState, useEffect } from 'react';
import { Search, Filter, Compass, Zap, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { getOccupations, getOccupationDetail } from '../api/client';

export default function OccupationExplorer({ setActivePage }) {
  const [occupations, setOccupations] = useState([]);
  const [selectedOccId, setSelectedOccId] = useState(31); // Default to Junior Data Analyst (ID 31)
  const [activeDetail, setActiveDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOccupations();
  }, [selectedSector]);

  useEffect(() => {
    if (selectedOccId) {
      fetchOccupationDetail(selectedOccId);
    }
  }, [selectedOccId]);

  const fetchOccupations = async () => {
    try {
      const data = await getOccupations(selectedSector);
      if (data && data.length > 0) {
        setOccupations(data);
        if (!data.find(o => o.occupation_id === selectedOccId)) {
          setSelectedOccId(data[0].occupation_id);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOccupationDetail = async (id) => {
    try {
      setLoading(true);
      const data = await getOccupationDetail(id);
      if (data) {
        setActiveDetail(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOccupations = occupations.filter(o =>
    o.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sectors = ['All', 'Technology', 'Business', 'Finance', 'Marketing', 'HR', 'Customer Operations', 'Data', 'Design'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pearl-200 text-ink-900 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-electric-500" />
          <span>Magazine-Style Occupation Deep Dives</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight">
          Occupation Explorer
        </h1>
        <p className="text-base text-ink-600 max-w-2xl">
          Select any entry-level role to inspect its granular task replaceability timeline, required core skills, and emerging AI-enabled capabilities.
        </p>
      </div>

      {/* Main Grid: Sidebar Role Selector + Magazine Article Main View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Role Picker */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-6">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search occupation..."
              className="w-full bg-pearl-100 border border-black/10 rounded-full pl-10 pr-4 py-2 text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-electric-500"
            />
          </div>

          {/* Sector filter */}
          <div className="flex flex-wrap gap-1.5">
            {sectors.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSector(s)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  selectedSector === s
                    ? 'bg-ink-900 text-white'
                    : 'bg-pearl-100 text-ink-600 hover:bg-pearl-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Role List */}
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredOccupations.map(occ => (
              <button
                key={occ.occupation_id}
                onClick={() => setSelectedOccId(occ.occupation_id)}
                className={`w-full text-left p-3 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedOccId === occ.occupation_id
                    ? 'bg-electric-500 text-white shadow-sm'
                    : 'bg-pearl-50 hover:bg-pearl-200 text-ink-900 border border-black/5'
                }`}
              >
                <div>
                  <div>{occ.occupation}</div>
                  <div className={`text-[10px] ${selectedOccId === occ.occupation_id ? 'text-white/80' : 'text-ink-400'}`}>
                    {occ.sector}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedOccId === occ.occupation_id
                    ? 'bg-white/20 text-white'
                    : 'bg-pearl-200 text-ink-800'
                }`}>
                  {occ.average_ai_exposure}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Right Article View */}
        <div className="lg:col-span-8">
          {loading || !activeDetail ? (
            <div className="bg-white p-12 rounded-3xl border border-black/5 text-center text-ink-400 text-sm">
              Loading occupation analysis...
            </div>
          ) : (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-black/5 shadow-sm space-y-10">
              
              {/* Article Header */}
              <div className="border-b border-black/10 pb-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-electric-600 bg-lavender-200 px-3.5 py-1 rounded-full">
                    {activeDetail.sector} Sector
                  </span>
                  
                  {/* AI Exposure Badge */}
                  <div className={`px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 ${
                    activeDetail.average_ai_exposure >= 0.70
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-mint-300/40 text-emerald-900 border border-mint-400'
                  }`}>
                    <Zap className="w-3.5 h-3.5" />
                    <span>AI Exposure: {activeDetail.ai_exposure_level} ({activeDetail.average_ai_exposure})</span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-900">
                  {activeDetail.occupation}
                </h2>

                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium">
                  {activeDetail.average_ai_exposure >= 0.70
                    ? "This role exhibits high task replaceability in routine execution. Successful entry-level candidates must pivot toward AI tool verification, system architecture, and strategic stakeholder consultation."
                    : "This role contains significant human-anchored tasks (negotiation, judgment, empathy). AI acts as an accelerator rather than a direct replacement."}
                </p>
              </div>

              {/* Task Replaceability Timeline */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-ink-900">Task-Level AI Exposure Breakdown</h3>
                  <p className="text-xs text-ink-400 mt-1">Comparing AI Replaceability ($R_t$) against Human Judgment ($J_t$).</p>
                </div>

                <div className="space-y-4">
                  {activeDetail.tasks.map(task => (
                    <div key={task.task_id} className="bg-pearl-50 p-4 rounded-2xl border border-black/5 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="font-semibold text-xs text-ink-900">{task.task_name}</div>
                        <div className="text-[11px] font-bold text-electric-600 bg-white px-2.5 py-0.5 rounded-full border border-black/5 shadow-xs">
                          Exposure Score: {task.ai_exposure_score}
                        </div>
                      </div>

                      {/* Bar Indicators */}
                      <div className="grid grid-cols-2 gap-4 text-[10px] pt-1">
                        <div>
                          <div className="flex justify-between text-ink-400 mb-0.5">
                            <span>AI Replaceability</span>
                            <span className="font-bold text-ink-800">{task.ai_replaceability}/4.0</span>
                          </div>
                          <div className="w-full bg-pearl-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-electric-500 h-full rounded-full" style={{ width: `${(task.ai_replaceability/4)*100}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-ink-400 mb-0.5">
                            <span>Human Judgment</span>
                            <span className="font-bold text-ink-800">{task.human_judgement}/4.0</span>
                          </div>
                          <div className="w-full bg-pearl-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-mint-400 h-full rounded-full" style={{ width: `${(task.human_judgement/4)*100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required & Emerging Skills */}
              <div className="space-y-4 border-t border-black/10 pt-8">
                <h3 className="text-lg font-bold text-ink-900">Required Skills & Employer Signals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeDetail.skills.map(s => (
                    <div key={s.skill_id} className="bg-pearl-100 p-3.5 rounded-2xl border border-black/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-ink-900">{s.skill_name}</div>
                        <div className="text-[10px] text-ink-400">{s.category} • {s.future_trend} Trend</div>
                      </div>
                      <span className="font-extrabold text-electric-600 bg-white px-2.5 py-1 rounded-full text-[11px] shadow-xs">
                        {s.employer_demand_frequency}% Demand
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment CTA */}
              <div className="bg-lavender-200/50 p-6 rounded-3xl border border-electric-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-ink-900">Interested in this career path?</div>
                  <div className="text-xs text-ink-600">Take the assessment to evaluate your skill match against {activeDetail.occupation}.</div>
                </div>
                <button
                  onClick={() => setActivePage('assessment')}
                  className="bg-electric-500 hover:bg-electric-600 text-white font-bold text-xs px-5 py-3 rounded-full transition-colors whitespace-nowrap"
                >
                  Evaluate My Match →
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
