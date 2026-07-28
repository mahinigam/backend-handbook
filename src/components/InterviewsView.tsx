import React, { useState } from 'react';
import { volume8Interviews } from '../data/volume8_interviews';
import { CompanyInterviewQuestion } from '../types';
import { 
  HelpCircle, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  Code2, 
  Award 
} from 'lucide-react';

interface InterviewsViewProps {
  onOpenAITutor: (prompt: string, mode?: 'explain' | 'high_thinking' | 'mock_interview') => void;
}

export const InterviewsView: React.FC<InterviewsViewProps> = ({ onOpenAITutor }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string>(volume8Interviews[0]?.id || '');
  const [userPracticeAnswer, setUserPracticeAnswer] = useState<string>('');

  const companies = ['All', 'Google', 'Microsoft', 'Amazon', 'Stripe', 'Uber', 'Databricks', 'Atlassian', 'Netflix', 'Rubrik', 'OpenAI'];

  const filteredQuestions = selectedCompany === 'All'
    ? volume8Interviews
    : volume8Interviews.filter(q => q.company === selectedCompany);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 text-slate-100 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          <span>Volume 8: Staff & Senior Interview Preparation</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Top Company Technical Interview Bank</h1>
        <p className="text-xs text-indigo-200 mt-2 max-w-3xl leading-relaxed">
         {volume8Interviews.length} structured practice prompts inspired by senior and staff-level interview themes at Google, Microsoft, Amazon, Stripe, Uber, Databricks, Atlassian, Netflix, Rubrik, and OpenAI.
          Complete with first-principles answers, C-level internal architecture breakdowns, and interviewer evaluation criteria.
        </p>

        {/* Company Filter Tabs */}
        <div className="mt-4 pt-4 border-t border-indigo-900/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Filter by Company:</span>
          {companies.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCompany(c)}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                selectedCompany === c
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Question Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedQuestionId === q.id;

          return (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition shadow-lg"
            >
              {/* Question Header Row */}
              <div
                onClick={() => setExpandedQuestionId(isExpanded ? '' : q.id)}
                className="p-5 bg-slate-950/60 hover:bg-slate-950 cursor-pointer flex items-center justify-between gap-4 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 font-bold text-xs rounded-lg border border-indigo-500/30 flex items-center gap-1.5 shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{q.company}</span>
                  </span>

                  <div>
                    <h3 className="text-base font-bold text-white">{q.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{q.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    q.difficulty === 'Staff' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {q.difficulty}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {/* Expanded Question Details */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-800 space-y-6 text-slate-200 text-xs">
                  
                  {/* Problem Statement */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] mb-1">
                      Problem Statement
                    </h4>
                    <p className="text-sm text-white font-medium">{q.problemStatement}</p>
                  </div>

                  {/* First Principles Answer */}
                  <div>
                    <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>First-Principles Staff Answer</span>
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                      {q.firstPrinciplesAnswer}
                    </p>
                  </div>

                  {/* Internal Architecture Explanation */}
                  <div>
                    <h4 className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] mb-2">
                      Internal Architecture & Mechanics
                    </h4>
                    <pre className="bg-slate-950 text-indigo-200 p-4 rounded-xl border border-slate-800 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                      {q.internalArchitectureExplanation}
                    </pre>
                  </div>

                  {/* Code Snippet */}
                  {q.codeSnippet && (
                    <div>
                      <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-amber-400" />
                        <span>Reference Implementation Code</span>
                      </h4>
                      <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Interviewer Rating Criteria */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-purple-300 uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span>Interviewer Rating Criteria (What Top Companies Look For)</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block font-bold mb-1">Junior / L4 Pass</span>
                        <p className="text-slate-300 text-[11px]">{q.interviewerRatingCriteria.juniorPass}</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-amber-300 block font-bold mb-1">Senior / L5 Pass</span>
                        <p className="text-slate-300 text-[11px]">{q.interviewerRatingCriteria.seniorPass}</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-purple-300 block font-bold mb-1">Staff / L6+ Pass</span>
                        <p className="text-slate-300 text-[11px]">{q.interviewerRatingCriteria.staffPass}</p>
                      </div>
                    </div>
                  </div>

                  {/* Follow-Up Questions */}
                  {q.followUpQuestions && q.followUpQuestions.length > 0 && (
                    <div>
                      <h4 className="font-bold text-sky-300 uppercase tracking-wider text-[11px] mb-2">Common Follow-Up Questions</h4>
                      <ul className="space-y-1.5 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                        {q.followUpQuestions.map((fq, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-sky-400 font-bold shrink-0">→</span>
                            <span>{fq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* AI Practice Simulator */}
                  <div className="bg-gradient-to-r from-purple-950/40 via-slate-950 to-purple-950/40 p-4 rounded-xl border border-purple-900/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-purple-400" />
                        <h4 className="font-bold text-purple-200 text-xs uppercase tracking-wider">
                          Practice Mode: Grade My Answer with AI Staff Engineer
                        </h4>
                      </div>
                    </div>

                    <textarea
                      placeholder="Type your explanation or system design answer here to receive instant staff-level feedback from Gemini AI..."
                      value={userPracticeAnswer}
                      onChange={(e) => setUserPracticeAnswer(e.target.value)}
                      className="w-full h-24 p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />

                    <button
                      onClick={() => {
                        const prompt = `Grade my interview answer for ${q.company} Question: "${q.title}".\nProblem: ${q.problemStatement}\n\nMy Answer:\n${userPracticeAnswer}\n\nPlease evaluate according to Junior, Senior, and Staff rating criteria and provide constructive feedback.`;
                        onOpenAITutor(prompt, 'mock_interview');
                      }}
                      disabled={!userPracticeAnswer.trim()}
                      className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow transition"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Grade My Answer with High-Thinking AI</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
