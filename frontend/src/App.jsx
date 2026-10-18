import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AskFutureReadyModal from './components/AskFutureReadyModal';

import Home from './pages/Home';
import ResearchDashboard from './pages/ResearchDashboard';
import OccupationExplorer from './pages/OccupationExplorer';
import Assessment from './pages/Assessment';
import PathwayEngine from './pages/PathwayEngine';
import ResearchHub from './pages/ResearchHub';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'research':
        return <ResearchDashboard />;
      case 'explorer':
        return <OccupationExplorer setActivePage={setActivePage} />;
      case 'assessment':
        return <Assessment setActivePage={setActivePage} setAssessmentResults={setAssessmentResults} />;
      case 'pathway':
        return <PathwayEngine assessmentResults={assessmentResults} setActivePage={setActivePage} onOpenChat={() => setIsChatOpen(true)} />;
      case 'hub':
        return <ResearchHub />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-pearl-100 text-ink-900 font-sans selection:bg-electric-500 selection:text-white">
      
      {/* Sticky Top Navbar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenChat={() => setIsChatOpen(true)} 
      />

      {/* Main Page Body */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Persistent Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center space-x-2 bg-ink-900 hover:bg-electric-500 text-white text-xs font-bold px-4 py-3.5 rounded-full shadow-2xl transition-all transform hover:scale-105 border border-white/20 group"
        >
          <span className="w-2 h-2 rounded-full bg-electric-500 group-hover:bg-white animate-pulse"></span>
          <span className="tracking-wide">✦ Ask FutureReady</span>
        </button>
      </div>

      {/* Grounded Persistent Chatbot Modal Drawer */}
      <AskFutureReadyModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        userContext={assessmentResults}
      />

      {/* Editorial Footer */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}
