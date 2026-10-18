import React from 'react';
import { Github, Globe, FileSpreadsheet, Shield, ExternalLink } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-ink-900 text-pearl-100 py-16 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand story */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-electric-500 text-white flex items-center justify-center font-bold text-xs">
                FR
              </div>
              <span className="font-bold text-lg text-white">FutureReady India</span>
            </div>
            <p className="text-xs text-ink-400 leading-relaxed">
              An open-source research and technology initiative examining how AI is transforming entry-level employment and skill requirements for Indian graduates.
            </p>
            <div className="text-[11px] text-mint-300 font-medium">
              Ground Evidence: ILO 2024 & WEF 2025 Reports
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs text-ink-400">
              <li>
                <button onClick={() => setActivePage('research')} className="hover:text-white transition-colors">
                  Research Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('explorer')} className="hover:text-white transition-colors">
                  Occupation Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('assessment')} className="hover:text-white transition-colors">
                  Graduate Skills Assessment
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('pathway')} className="hover:text-white transition-colors">
                  Career Pathway Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Open Science */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Open Science</h4>
            <ul className="space-y-2 text-xs text-ink-400">
              <li>
                <button onClick={() => setActivePage('hub')} className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>Executive Report</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('hub')} className="hover:text-white transition-colors">
                  Policy Brief (PDF)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('hub')} className="hover:text-white transition-colors">
                  Open Datasets (.csv)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('hub')} className="hover:text-white transition-colors">
                  Methodology Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Licensing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Initiative</h4>
            <p className="text-xs text-ink-400 leading-relaxed">
              Built as a flagship public-interest research project. All datasets and analytical tools are published under open science principles.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-ink-400">
              <a href="#github" className="hover:text-white transition-colors flex items-center space-x-1">
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-400">
          <div>
            &copy; {new Date().getFullYear()} FutureReady India Research Initiative. Open Source & Educational.
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            <span>Researching the Future of Entry-Level Work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
