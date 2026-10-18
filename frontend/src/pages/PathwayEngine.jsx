import React, { useState } from 'react';
import { Award, CheckCircle2, ChevronRight, HelpCircle, MapPin, Sparkles, AlertCircle, ArrowRight, Shield } from 'lucide-react';

export default function PathwayEngine({ assessmentResults, setActivePage, onOpenChat }) {
  const [completedWeeks, setCompletedWeeks] = useState({});

  if (!assessmentResults) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-2xl font-bold text-ink-900">No Assessment Profile Found</h2>
        <p className="text-xs text-ink-600">Please complete the scenario-based assessment first to view your FutureReady Profile and career roadmap.</p>
        <button
          onClick={() => setActivePage('assessment')}
          className="bg-ink-900 hover:bg-electric-500 text-white font-bold text-xs px-6 py-3 rounded-full transition-colors"
        >
          Take Assessment Now →
        </button>
      </div>
    );
  }

  const { profile, top_matches, roadmap } = assessmentResults;

  const toggleWeek = (idx) => {
    setCompletedWeeks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-lavender-200 text-electric-700 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Personalized Intelligence Results</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight">
          Your FutureReady Profile
        </h1>
        <p className="text-base text-ink-600 max-w-2xl">
          Based on your scenario assessment, here is your AI-readiness profile, skill constellation breakdown, top career matches, and 12-week roadmap.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-black/5 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Big Score */}
        <div className="lg:col-span-4 text-center lg:border-r border-black/10 lg:pr-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-400">Future Readiness Index</span>
          <div className="text-6xl sm:text-7xl font-extrabold text-electric-500 tracking-tight">
            {profile.overall_readiness_score}
            <span className="text-2xl text-ink-400 font-normal">/100</span>
          </div>
          <div className="text-xs font-bold text-ink-800 bg-pearl-200 inline-block px-3 py-1 rounded-full">
            {profile.overall_readiness_score >= 70 ? 'Strong Readiness' : 'Developing Readiness'}
          </div>
        </div>

        {/* Right Strengths & Growth */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Your Core Strengths</span>
              </h4>
              <div className="space-y-1.5">
                {profile.strengths.map((s, idx) => (
                  <div key={idx} className="bg-emerald-50 text-emerald-900 text-xs font-semibold px-3 py-2 rounded-xl border border-emerald-200">
                    ✓ {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Areas */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Priority Growth Areas</span>
              </h4>
              <div className="space-y-1.5">
                {profile.growth_areas.map((g, idx) => (
                  <div key={idx} className="bg-amber-50 text-amber-900 text-xs font-semibold px-3 py-2 rounded-xl border border-amber-200">
                    ! {g}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* SKILL CONSTELLATION GRAPHIC */}
      <div className="bg-darksection text-white p-8 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Skill Constellation Analysis</h3>
            <p className="text-xs text-ink-300">Self-assessed capability scores across core categories.</p>
          </div>
          <button onClick={onOpenChat} className="text-xs font-semibold text-mint-300 hover:underline flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why these scores? Ask Assistant</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {profile.skill_scores.map((item, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-2">
              <div className="text-[10px] text-ink-400 font-semibold uppercase">{item.category}</div>
              <div className="text-2xl font-bold text-white">{item.score}</div>
              <div className="text-xs font-semibold text-mint-300">{item.skill}</div>
              <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block ${
                item.status === 'Strong' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CAREER MATCHES */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-ink-900">Your Strongest Pathways</h2>
          <p className="text-xs text-ink-600">Top entry-level roles aligned with your skill profile and interest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {top_matches.map((match) => (
            <div key={match.rank} className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-400 uppercase tracking-wider">0{match.rank} Pathway</span>
                  <span className="text-xs font-extrabold bg-lavender-200 text-electric-700 px-3 py-1 rounded-full">
                    {match.match_percentage}% Match
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-ink-900">{match.occupation}</h3>
                  <div className="text-xs text-ink-400">{match.sector} Sector</div>
                </div>

                {/* Why Fit */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-ink-900">Why you're a fit:</div>
                  {match.why_fit.map((why, i) => (
                    <div key={i} className="text-ink-600 flex items-start space-x-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{why}</span>
                    </div>
                  ))}
                </div>

                {/* Missing Gaps */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-ink-900">Main skill gap:</div>
                  {match.missing_priority_skills.map((gap, i) => (
                    <div key={i} className="text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-medium">
                      ! {gap}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActivePage('explorer')}
                className="w-full bg-pearl-100 hover:bg-pearl-200 text-ink-900 font-semibold text-xs py-2.5 rounded-xl border border-black/5 transition-colors flex items-center justify-center space-x-1"
              >
                <span>Explore Role Breakdown</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* 12-WEEK ROADMAP TIMELINE */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-black/5 shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Your 12-Week Learning Roadmap</h2>
          <p className="text-xs text-ink-600 mt-1">Check off milestones as you complete topics to track your workforce readiness.</p>
        </div>

        <div className="space-y-6">
          {roadmap.map((week, idx) => {
            const isDone = completedWeeks[idx];
            return (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border transition-all ${
                  isDone 
                    ? 'bg-emerald-50/60 border-emerald-300' 
                    : 'bg-pearl-50 border-black/5 hover:border-electric-500/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-electric-600 bg-white px-2.5 py-0.5 rounded-full border border-black/5 shadow-xs">
                        {week.week_range}
                      </span>
                      <span className="text-xs text-ink-400 font-medium">{week.hours_per_week}</span>
                    </div>

                    <h4 className="text-base font-bold text-ink-900">{week.title}</h4>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {week.topics.map((t, i) => (
                        <span key={i} className="text-[11px] bg-white text-ink-800 px-2.5 py-1 rounded-lg border border-black/5 font-medium">
                          • {t}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-ink-600 pt-2 font-medium">
                      <span className="font-bold text-ink-900">Mini Project: </span>
                      {week.mini_project}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleWeek(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-ink-900 border border-black/10 hover:bg-pearl-200'
                    }`}
                  >
                    {isDone ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
