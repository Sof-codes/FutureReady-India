import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Filter, Layers, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { getOccupations, getResearchStatistics, getSkillGapMatrix } from '../api/client';

export default function ResearchDashboard() {
  const [sectorFilter, setSectorFilter] = useState('All');
  const [occupations, setOccupations] = useState([]);
  const [stats, setStats] = useState(null);
  const [matrix, setMatrix] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [sectorFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [occData, statsData, matrixData] = await Promise.all([
        getOccupations(sectorFilter),
        getResearchStatistics(),
        getSkillGapMatrix()
      ]);

      if (occData) setOccupations(occData);
      if (statsData) setStats(statsData);
      if (matrixData) setMatrix(matrixData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sectors = ['All', 'Technology', 'Business', 'Finance', 'Marketing', 'HR', 'Customer Operations', 'Data', 'Design'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pearl-200 text-ink-900 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-electric-500" />
          <span>Empirical Data Storytelling</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight">
          The labor market is moving.
        </h1>
        <p className="text-base text-ink-600 max-w-2xl">
          Explore evidence on AI Task Exposure, occupational replaceability indices, and changing skill demand across 40 entry-level roles in India.
        </p>
      </div>

      {/* Stats Cards Row */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-1">
            <div className="text-3xl font-extrabold text-ink-900">{stats.total_jobs_analyzed}</div>
            <div className="text-xs font-medium text-ink-400">Entry-Level Occupations Mapped</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-1">
            <div className="text-3xl font-extrabold text-electric-600">{stats.total_tasks_analyzed}</div>
            <div className="text-xs font-medium text-ink-400">Tasks Scored on 5 Dimensions</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-1">
            <div className="text-3xl font-extrabold text-ink-900">{stats.unique_skills_mapped}+</div>
            <div className="text-xs font-medium text-ink-400">Unique Skills Categorized</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-1">
            <div className="text-3xl font-extrabold text-emerald-600">{stats.graduate_survey_responses}</div>
            <div className="text-xs font-medium text-ink-400">Graduate Survey Responses</div>
          </div>
        </div>
      )}

      {/* Sector Filter Chips */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-ink-900 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-electric-500" />
          <span>Filter by Sector</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                sectorFilter === s
                  ? 'bg-ink-900 text-white shadow-sm'
                  : 'bg-white text-ink-600 hover:bg-pearl-200 border border-black/5'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN VISUAL: Horizontal Bar Chart of AI Exposure across occupations */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-ink-900">AI Exposure Score across Occupations</h3>
            <p className="text-xs text-ink-600 mt-1">
              Composite index based on task replaceability ($R_t$) vs. human judgment ($J_t$), social interaction ($S_t$), and creativity ($C_t$).
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-electric-500"></span>
              <span>High Exposure (≥ 0.70)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-lavender-300"></span>
              <span>Medium / Low (&lt; 0.70)</span>
            </div>
          </div>
        </div>

        {/* Recharts Component */}
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={occupations}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 120, bottom: 10 }}
            >
              <XAxis type="number" domain={[0, 1]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="occupation" type="category" width={110} tick={{ fontSize: 11 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-ink-900 text-white p-3.5 rounded-2xl shadow-xl border border-white/10 text-xs space-y-1 max-w-xs">
                        <div className="font-bold text-sm text-mint-300">{data.occupation}</div>
                        <div>Sector: {data.sector}</div>
                        <div>AI Exposure Score: <span className="font-bold">{data.average_ai_exposure}</span> ({data.ai_exposure_level})</div>
                        <div className="text-[10px] text-ink-400 pt-1">
                          Human Judgment Avg: {data.human_judgement_avg}/4.0 | Social Interaction Avg: {data.social_interaction_avg}/4.0
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="average_ai_exposure" radius={[0, 8, 8, 0]}>
                {occupations.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.average_ai_exposure >= 0.70 ? '#4F6FFF' : '#B8E8D4'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3-WAY SKILL GAP MATRIX */}
      {matrix && (
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-ink-900">Where are graduates falling behind?</h3>
            <p className="text-sm text-ink-600">
              3-way comparison of Employer Demand Frequency vs. Self-Assessed Graduate Proficiency vs. Future Signals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Priority Skill Gaps */}
            {matrix.priority_gaps.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-lavender-200 text-electric-700">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {item.verdict}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-ink-900">{item.skill}</h4>

                {/* Progress Comparison */}
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-ink-600 font-medium mb-1">
                      <span>Employer Demand Signal</span>
                      <span className="font-bold text-ink-900">{item.employer_demand}%</span>
                    </div>
                    <div className="w-full bg-pearl-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-electric-500 h-full rounded-full" style={{ width: `${item.employer_demand}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-ink-600 font-medium mb-1">
                      <span>Graduate Self-Assessed Proficiency</span>
                      <span className="font-bold text-amber-600">{item.graduate_proficiency}%</span>
                    </div>
                    <div className="w-full bg-pearl-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${item.graduate_proficiency}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
}
