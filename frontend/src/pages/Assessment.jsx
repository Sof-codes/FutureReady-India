import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, HelpCircle } from 'lucide-react';
import { getAssessmentQuestions, submitAssessment } from '../api/client';

export default function Assessment({ setActivePage, setAssessmentResults }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedDegree, setSelectedDegree] = useState('BCA');
  const [graduationYear, setGraduationYear] = useState(2025);
  const [fieldOfStudy, setFieldOfStudy] = useState('Computer Science');
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState('onboarding'); // 'onboarding' | 'questions'

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getAssessmentQuestions();
      if (data && data.length > 0) {
        setQuestions(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectOption = (questionId, score) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        degree: selectedDegree,
        graduation_year: Number(graduationYear),
        field_of_study: fieldOfStudy,
        answers: answers
      };

      const data = await submitAssessment(payload);
      if (data) {
        setAssessmentResults(data);
        setActivePage('pathway');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'onboarding') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pearl-200 text-ink-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-electric-500" />
            <span>Graduate Skills Assessment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            Let's understand how you work.
          </h1>
          <p className="text-sm text-ink-600">
            Before beginning the scenario-based questions, tell us briefly about your academic background.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
          
          {/* Degree */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink-900 uppercase tracking-wider">Degree Program</label>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full bg-pearl-100 border border-black/10 rounded-2xl px-4 py-3 text-xs text-ink-900 focus:outline-none focus:border-electric-500"
            >
              <option value="BCA">BCA (Bachelor of Computer Applications)</option>
              <option value="B.Tech">B.Tech / B.E. (Engineering)</option>
              <option value="B.Com">B.Com (Commerce & Accounting)</option>
              <option value="BBA">BBA (Business Administration)</option>
              <option value="B.Sc">B.Sc (Science & Data)</option>
              <option value="BA">BA (Arts, Humanities, Media)</option>
            </select>
          </div>

          {/* Graduation Year */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink-900 uppercase tracking-wider">Graduation Year</label>
            <select
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full bg-pearl-100 border border-black/10 rounded-2xl px-4 py-3 text-xs text-ink-900 focus:outline-none focus:border-electric-500"
            >
              <option value={2024}>2024 (Recent Graduate)</option>
              <option value={2025}>2025 (Final Year)</option>
              <option value={2026}>2026 (Pre-Final Year)</option>
            </select>
          </div>

          {/* Specialization */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink-900 uppercase tracking-wider">Field of Specialization</label>
            <input
              type="text"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              placeholder="e.g. Computer Science, Finance, Marketing..."
              className="w-full bg-pearl-100 border border-black/10 rounded-2xl px-4 py-3 text-xs text-ink-900 focus:outline-none focus:border-electric-500"
            />
          </div>

          <button
            onClick={() => setStep('questions')}
            className="w-full bg-ink-900 hover:bg-electric-500 text-white font-bold text-sm py-4 rounded-2xl transition-colors shadow-sm flex items-center justify-center space-x-2"
          >
            <span>Start Scenario Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / (questions.length || 1)) * 100);
  const isSelected = (score) => answers[currentQ?.id] === score;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 min-h-[70vh] flex flex-col justify-between">
      
      {/* Progress Bar Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-ink-400 font-medium">
          <span>Scenario {currentIdx + 1} of {questions.length}</span>
          <span>{progressPercent}% Completed</span>
        </div>
        
        {/* Editorial progress line */}
        <div className="w-full bg-pearl-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-electric-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {currentIdx === Math.floor(questions.length / 2) && (
          <div className="text-[11px] font-bold text-electric-600 pt-1 text-center animate-fade-in">
            You're halfway there! Keep going.
          </div>
        )}
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          <div className="space-y-3">
            <span className="text-xs font-bold text-electric-600 bg-lavender-200 px-3 py-1 rounded-full uppercase tracking-wider">
              {currentQ.category} • {currentQ.skill}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Option Cards */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const active = isSelected(opt.score);
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt.score)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start justify-between space-x-4 ${
                    active
                      ? 'bg-ink-900 text-white border-ink-900 shadow-md transform scale-[1.01]'
                      : 'bg-white text-ink-900 border-black/10 hover:border-electric-500/50 hover:bg-pearl-50 shadow-xs'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                    {opt.label}
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    active ? 'border-white bg-electric-500 text-white' : 'border-black/20'
                  }`}>
                    {active && <CheckCircle className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      )}

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-black/10">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-ink-600 hover:text-ink-900 disabled:opacity-30 transition-colors flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!answers[currentQ?.id] || submitting}
          className="bg-electric-500 hover:bg-electric-600 disabled:opacity-40 text-white font-bold text-xs px-7 py-3 rounded-full transition-colors shadow-sm flex items-center space-x-2"
        >
          <span>{currentIdx === questions.length - 1 ? (submitting ? 'Calculating Profile...' : 'Submit & View Results') : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
