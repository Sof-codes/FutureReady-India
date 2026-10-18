import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { askChatbot } from '../api/client';

export default function AskFutureReadyModal({ isOpen, onClose, userContext }) {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am your Ask FutureReady AI Assistant. Ask me about entry-level occupations, AI exposure scores, research evidence (ILO/WEF), or your assessment results.",
      citations: ["FutureReady Evidence Base (2026)", "ILO 2024 & WEF 2025 Reports"]
    }
  ]);
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "Why is SQL recommended as a priority skill gap?",
    "What does AI Task Exposure mean for entry-level work?",
    "Why was Junior Data Analyst recommended as my top match?",
    "What skills are growing fastest according to WEF 2025?"
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const data = await askChatbot(textToSend, userContext || null);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: data.answer,
          citations: data.citations || []
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "I am having trouble connecting to the research database right now. Please try asking again shortly.",
          citations: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-4 sm:p-6 bg-ink-900/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-black/10 flex flex-col h-[600px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-ink-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-electric-500 text-white flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm leading-none flex items-center space-x-1.5">
                <span>Ask FutureReady</span>
                <span className="text-[10px] bg-electric-500/30 text-electric-300 font-semibold px-2 py-0.5 rounded-full border border-electric-400/20">
                  Grounded AI
                </span>
              </div>
              <div className="text-[11px] text-ink-400 mt-0.5">
                Evidence-backed research & career guidance
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-pearl-100/50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-electric-500 text-white rounded-br-none shadow-sm'
                  : 'bg-white text-ink-900 rounded-bl-none border border-black/5 shadow-sm'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-black/5 flex flex-wrap gap-1">
                    {msg.citations.map((c, i) => (
                      <span key={i} className="text-[9px] font-semibold bg-lavender-200 text-electric-700 px-2 py-0.5 rounded-full">
                        Source: {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-3 text-xs text-ink-600 border border-black/5 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-electric-500 animate-ping"></div>
                <span>Analyzing research evidence...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        <div className="p-3 bg-white border-t border-black/5 flex overflow-x-auto space-x-2 scrollbar-none">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium text-ink-800 bg-pearl-200 hover:bg-lavender-200 hover:text-electric-700 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors flex-shrink-0 border border-black/5"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-3 bg-white border-t border-black/10 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about jobs, skills, AI exposure or assessment..."
            className="flex-1 bg-pearl-100 border border-black/10 rounded-full px-4 py-2.5 text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-electric-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-full bg-electric-500 hover:bg-electric-600 disabled:opacity-50 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
