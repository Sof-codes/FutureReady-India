import React, { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Compass, CheckCircle2, ChevronRight, ShieldCheck, Zap, Layers, BarChart2 } from 'lucide-react';
import HeroVisualization from '../components/HeroVisualization';

export default function Home({ setActivePage }) {
  const [activeTaskTab, setActiveTaskTab] = useState('dev');

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="pt-12 sm:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pearl-200 border border-black/5 text-ink-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-electric-500 animate-ping"></span>
              <span>Open-Source Research & Technology Initiative</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-ink-900 tracking-tight leading-[1.1]">
              The world of work is changing. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-900 via-electric-600 to-electric-500">
                Are your skills ready?
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-ink-600 max-w-2xl font-medium leading-relaxed">
              Explore how AI is reshaping entry-level work in India, identify which tasks and skills are changing, and discover what you should learn next.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setActivePage('assessment')}
                className="bg-ink-900 hover:bg-electric-500 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group"
              >
                <span>Check My Future Readiness</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActivePage('research')}
                className="bg-white hover:bg-pearl-200 text-ink-900 font-semibold text-sm px-6 py-3.5 rounded-full border border-black/10 transition-colors flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4 text-electric-600" />
                <span>Explore Research Data</span>
              </button>
            </div>

            {/* Evidence Badges */}
            <div className="pt-6 border-t border-black/5 flex flex-wrap items-center gap-6 text-xs text-ink-600 font-medium">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>WEF Future of Jobs 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ILO India Employment 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>40 Mapped Occupations</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroVisualization />
          </div>

        </div>
      </section>

      {/* STORY SECTION 1: AI ISN'T REPLACING JOBS — IT'S CHANGING TASKS */}
      <section className="bg-darksection text-white py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-mint-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Task-Level Analysis</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              AI isn't simply replacing jobs. <br />
              <span className="text-mint-300">It's changing the tasks inside them.</span>
            </h2>

            <p className="text-sm sm:text-base text-ink-200 leading-relaxed">
              Instead of broad claims about job loss, our study decomposes entry-level roles into specific operational tasks to measure where AI assists versus where human judgment becomes essential.
            </p>
          </div>

          {/* Interactive Role Task Demo */}
          <div className="max-w-4xl mx-auto bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 backdrop-blur-md">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="text-xs text-mint-300 font-semibold uppercase tracking-wider">Example Role Analysis</span>
                <h3 className="text-2xl font-bold text-white">Junior Software Developer</h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-mint-300/20 text-mint-300 border border-mint-300/30 text-xs font-bold">
                Medium AI Exposure (0.58)
              </div>
            </div>

            {/* Task Breakdown Bars */}
            <div className="space-y-4">
              
              {/* Task 1 */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-white">Writing boilerplate code & syntax</div>
                  <div className="text-xs text-ink-200">Routine execution • High AI Replaceability</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-electric-500 h-full w-[85%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-electric-300">AI Assistance ↑</span>
                </div>
              </div>

              {/* Task 2 */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-white">Writing unit test suites</div>
                  <div className="text-xs text-ink-200">Automated generation • High AI Replaceability</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-electric-500 h-full w-[80%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-electric-300">AI Assistance ↑</span>
                </div>
              </div>

              {/* Task 3 */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-white">System architecture & security audit</div>
                  <div className="text-xs text-ink-200">Strategic reasoning • High Human Judgment</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-mint-300 h-full w-[90%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-mint-300">Human Anchor ★</span>
                </div>
              </div>

              {/* Task 4 */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-white">Cross-functional team alignment</div>
                  <div className="text-xs text-ink-200">Interpersonal negotiation • Very High Social Requirement</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-mint-300 h-full w-[95%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-mint-300">Human Anchor ★</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* STORY SECTION 2: THE GRADUATE JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-ink-900">
            How FutureReady Guides Your Career Transition
          </h2>
          <p className="text-sm text-ink-600">
            From degree completion to an evidence-based 12-week learning roadmap.
          </p>
        </div>

        {/* 5-Step Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-xl bg-pearl-200 text-ink-900 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="font-bold text-sm text-ink-900">Your Degree</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Input your field of study (BCA, B.Tech, B.Com, BBA, B.Sc, BA).
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-xl bg-pearl-200 text-ink-900 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="font-bold text-sm text-ink-900">Skills Assessment</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Complete scenario-based questions measuring 8 skill dimensions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-xl bg-pearl-200 text-ink-900 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="font-bold text-sm text-ink-900">Gap Identification</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Compare your profile against real employer job posting signals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-xl bg-pearl-200 text-ink-900 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h4 className="font-bold text-sm text-ink-900">Career Match</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Receive top 3 matching roles with match percentages and fit rationales.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-electric-500/30 bg-lavender-200/40 p-6 rounded-3xl space-y-3">
            <div className="w-8 h-8 rounded-xl bg-electric-500 text-white flex items-center justify-center font-bold text-xs">
              05
            </div>
            <h4 className="font-bold text-sm text-ink-900">12-Week Roadmap</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Execute a checkable week-by-week upskilling pathway.
            </p>
          </div>

        </div>

      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-ink-900 to-ink-800 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to understand your future readiness?
            </h2>
            <p className="text-sm text-ink-300 leading-relaxed">
              Take the scenario-based skills assessment to generate your personalized FutureReady profile and 12-week learning roadmap.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setActivePage('assessment')}
                className="bg-electric-500 hover:bg-electric-600 text-white font-bold text-sm px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-electric-500/25 flex items-center space-x-2 group"
              >
                <span>Take Skills Assessment Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
