import React from 'react';
import { Sparkles, Brain, Cpu, Briefcase, Zap, ArrowRight } from 'lucide-react';

export default function HeroVisualization() {
  return (
    <div className="relative w-full max-w-xl mx-auto h-80 sm:h-96 rounded-3xl glass-card border border-black/10 p-6 flex flex-col justify-between overflow-hidden shadow-xl">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-electric-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-mint-300/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header pill */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pearl-200 text-ink-900 text-xs font-semibold border border-black/5">
          <Sparkles className="w-3.5 h-3.5 text-electric-500 animate-pulse" />
          <span>Interactive Task Transformation Map</span>
        </div>
        <div className="text-[11px] font-semibold text-ink-400">
          Live Analytical Model
        </div>
      </div>

      {/* Nodes grid layout */}
      <div className="relative z-10 grid grid-cols-5 gap-2 items-center my-auto">
        
        {/* Node 1: Skills */}
        <div className="flex flex-col items-center group">
          <div className="w-12 h-12 rounded-2xl bg-white border border-black/10 flex items-center justify-center text-electric-500 shadow-sm group-hover:scale-110 transition-transform animate-node">
            <Brain className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-ink-900 mt-2">Skills</span>
          <span className="text-[9px] text-ink-400">SQL, AI, Logic</span>
        </div>

        {/* Connecting line */}
        <div className="h-[2px] bg-gradient-to-r from-electric-500 to-ink-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/80 animate-pulse"></div>
        </div>

        {/* Node 2: Tasks */}
        <div className="flex flex-col items-center group">
          <div className="w-12 h-12 rounded-2xl bg-white border border-black/10 flex items-center justify-center text-ink-900 shadow-sm group-hover:scale-110 transition-transform animate-node-delayed">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-ink-900 mt-2">Tasks</span>
          <span className="text-[9px] text-ink-400">Clean, Code, Audit</span>
        </div>

        {/* Connecting line */}
        <div className="h-[2px] bg-gradient-to-r from-ink-400 to-mint-400 relative"></div>

        {/* Node 3: AI Augmentation */}
        <div className="flex flex-col items-center group">
          <div className="w-12 h-12 rounded-2xl bg-mint-300 border border-mint-400 flex items-center justify-center text-ink-900 shadow-sm group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-ink-900 mt-2">AI Shift</span>
          <span className="text-[9px] text-ink-400">+142% Productivity</span>
        </div>

      </div>

      {/* Footer data banner */}
      <div className="bg-white/80 rounded-2xl p-3 border border-black/5 flex items-center justify-between text-xs">
        <div>
          <div className="font-bold text-ink-900">40 Occupations Mapped</div>
          <div className="text-[10px] text-ink-400">Task Replaceability vs. Human Anchor Metrics</div>
        </div>
        <div className="flex items-center space-x-1 text-electric-600 font-semibold text-xs">
          <span>Explore Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

    </div>
  );
}
