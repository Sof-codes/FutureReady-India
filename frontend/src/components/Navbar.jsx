import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass, ClipboardCheck, MapPin, FileText } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenChat }) {
  return (
    <header className="sticky top-0 z-40 bg-pearl-100/90 backdrop-blur-md border-b border-black/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActivePage('home')} 
          className="flex items-center space-x-3 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-ink-900 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-electric-500 transition-colors">
            FR
          </div>
          <div>
            <div className="font-bold text-ink-900 tracking-tight text-lg leading-none group-hover:text-electric-500 transition-colors">
              FutureReady <span className="text-electric-500 font-extrabold">India</span>
            </div>
            <div className="text-[11px] text-ink-400 font-medium tracking-wide mt-0.5 uppercase">
              AI, Skills & Career Intelligence
            </div>
          </div>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-pearl-200/60 p-1.5 rounded-full border border-black/5">
          <button
            onClick={() => setActivePage('research')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activePage === 'research' 
                ? 'bg-white text-ink-900 shadow-sm' 
                : 'text-ink-600 hover:text-ink-900 hover:bg-white/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Research</span>
          </button>

          <button
            onClick={() => setActivePage('explorer')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activePage === 'explorer' 
                ? 'bg-white text-ink-900 shadow-sm' 
                : 'text-ink-600 hover:text-ink-900 hover:bg-white/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore Jobs</span>
          </button>

          <button
            onClick={() => setActivePage('assessment')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activePage === 'assessment' 
                ? 'bg-white text-ink-900 shadow-sm' 
                : 'text-ink-600 hover:text-ink-900 hover:bg-white/50'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Assessment</span>
          </button>

          <button
            onClick={() => setActivePage('pathway')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activePage === 'pathway' 
                ? 'bg-white text-ink-900 shadow-sm' 
                : 'text-ink-600 hover:text-ink-900 hover:bg-white/50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Career Pathways</span>
          </button>

          <button
            onClick={() => setActivePage('hub')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activePage === 'hub' 
                ? 'bg-white text-ink-900 shadow-sm' 
                : 'text-ink-600 hover:text-ink-900 hover:bg-white/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Research Hub</span>
          </button>
        </nav>

        {/* Right CTA Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenChat}
            className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-ink-800 bg-lavender-200 hover:bg-lavender-300 px-3.5 py-2 rounded-full transition-colors border border-electric-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-electric-600" />
            <span>Ask FutureReady</span>
          </button>

          <button
            onClick={() => setActivePage('assessment')}
            className="flex items-center space-x-1.5 bg-ink-900 hover:bg-electric-500 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-sm hover:shadow group"
          >
            <span>Take Assessment</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
}
