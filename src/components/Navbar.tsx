import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Briefcase, 
  HelpCircle, 
  MapPin, 
  Cpu, 
  Search, 
  Bot, 
  Zap,
  Terminal,
  BarChart3,
  List
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAITutor: (mode?: 'explain' | 'high_thinking' | 'system_design' | 'code_review') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenAITutor
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('handbook')}>
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">Backend Engineering</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  Master v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Industry-Grade Textbook & Staff Engineer Handbook</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md mx-2 relative">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics (e.g., MVCC, Epoll, Kafka, Redis, Idempotency)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'handbook') setActiveTab('handbook');
                }}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAITutor('high_thinking')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-sm transition shadow-indigo-500/20"
              title="Ask Staff AI Engineer with High Thinking Reasoning"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden md:inline">AI Staff Tutor</span>
              <span className="px-1.5 py-0.2 bg-amber-400/30 text-amber-200 text-[10px] rounded uppercase font-bold">
                High Thinking
              </span>
            </button>
          </div>

        </div>

        {/* Secondary Navigation Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 scrollbar-none text-xs font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('index')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'index'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <List className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Book Index</span>
          </button>

          <button
            onClick={() => setActiveTab('handbook')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'handbook'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Volumes 1-6 (Textbook)</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>Production Projects (Vol 7)</span>
          </button>

          <button
            onClick={() => setActiveTab('interviews')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'interviews'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Top Company Interviews (Vol 8)</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'roadmap'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span>8-Month Roadmap (Vol 9)</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
            <span>Production Reality Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'playground'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Code Sandbox</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
