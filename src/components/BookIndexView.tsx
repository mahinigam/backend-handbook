import React, { useState } from 'react';
import { ALL_VOLUMES } from '../data/volumes';
import { Volume, VolumeChapter, ChapterSection } from '../types';
import { 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Layers, 
  Search, 
  Sparkles,
  ArrowRight,
  FileText
} from 'lucide-react';

interface BookIndexViewProps {
  onSelectChapter: (volumeId: string, chapter: VolumeChapter) => void;
  completedSections: Set<string>;
  onToggleCompleteSection: (sectionId: string) => void;
  onSelectTab: (tab: string) => void;
}

export const BookIndexView: React.FC<BookIndexViewProps> = ({
  onSelectChapter,
  completedSections,
  onToggleCompleteSection,
  onSelectTab
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedVolFilter, setSelectedVolFilter] = useState<string>('all');

  // Calculate stats
  const totalChapters = ALL_VOLUMES.reduce((acc, v) => acc + v.chapters.length, 0);
  const totalSections = ALL_VOLUMES.reduce(
    (acc, v) => acc + v.chapters.reduce((cAcc, ch) => cAcc + ch.sections.length, 0),
    0
  );
  const completedCount = completedSections.size;
  const progressPercent = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  const filteredVolumes = ALL_VOLUMES.filter((vol) => {
    if (selectedVolFilter !== 'all' && vol.id !== selectedVolFilter) return false;
    if (!filterQuery) return true;
    const query = filterQuery.toLowerCase();
    const titleMatch = vol.title.toLowerCase().includes(query) || vol.description.toLowerCase().includes(query);
    const chapterMatch = vol.chapters.some(
      (ch) =>
        ch.title.toLowerCase().includes(query) ||
        ch.subtitle.toLowerCase().includes(query) ||
        ch.sections.some((sec) => sec.title.toLowerCase().includes(query))
    );
    return titleMatch || chapterMatch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Book Title & Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <BookOpen className="w-72 h-72 text-amber-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Staff Backend Engineering Handbook
            </span>
            <span className="text-xs font-mono text-slate-400">First Edition • 2026 Edition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Master Table of Contents & Book Index
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            A comprehensive curriculum detailing lower-level runtime internals, distributed system consensus, database storage engines, production fault tolerance, and senior staff engineer interview mastery.
          </p>

          {/* Reading Progress Indicator */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1">Total Volumes</div>
              <div className="text-lg font-bold text-amber-400">6 Core Volumes</div>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1">Total Chapters</div>
              <div className="text-lg font-bold text-indigo-400">{totalChapters} Chapters</div>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1">Detailed Sections</div>
              <div className="text-lg font-bold text-emerald-400">{totalSections} Deep Sections</div>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1">Reading Progress</div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">{progressPercent}% Completed</span>
                <span className="text-slate-400">{completedCount}/{totalSections}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-amber-400 h-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search index by topic, chapter, or keyword..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/50 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Volume Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedVolFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedVolFilter === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Volumes
          </button>
          {ALL_VOLUMES.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVolFilter(v.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedVolFilter === v.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Vol {v.volumeNumber}
            </button>
          ))}
          <button
            onClick={() => setSelectedVolFilter('extras')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedVolFilter === 'extras'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Vols 7-9 (Extras)
          </button>
        </div>
      </div>

      {/* Book Volume Listing */}
      <div className="space-y-8">
        {filteredVolumes.map((vol) => (
          <div 
            key={vol.id} 
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden"
          >
            {/* Volume Header Spine */}
            <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                    Volume {vol.volumeNumber}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{vol.chapters.length} Chapters</span>
                </div>
                <h2 className="text-xl font-bold text-white">{vol.title}</h2>
                <p className="text-xs text-slate-400 mt-1">{vol.description}</p>
              </div>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vol.chapters.map((ch) => (
                <div 
                  key={ch.id}
                  className="bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 rounded-xl p-4 transition flex flex-col justify-between space-y-3 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                        Chapter {ch.chapterNumber}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> ~15 min read
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {ch.subtitle}
                    </p>

                    {/* Section Index Bullets */}
                    <div className="mt-3 space-y-1 pt-2 border-t border-slate-900">
                      {ch.sections.map((sec) => {
                        const isCompleted = completedSections.has(sec.id);
                        return (
                          <div 
                            key={sec.id}
                            className="flex items-center justify-between text-xs text-slate-300 hover:text-amber-200 py-1"
                          >
                            <span className="line-clamp-1 flex items-center gap-1.5">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{sec.title}</span>
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleCompleteSection(sec.id);
                              }}
                              className="text-slate-500 hover:text-emerald-400 ml-2 shrink-0"
                              title={isCompleted ? "Mark as unread" : "Mark as read"}
                            >
                              <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400 fill-emerald-400/20' : ''}`} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Read Chapter Button */}
                  <button
                    onClick={() => onSelectChapter(vol.id, ch)}
                    className="w-full flex items-center justify-between bg-slate-900 hover:bg-amber-500/20 text-slate-200 hover:text-amber-200 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-800 hover:border-amber-500/30 transition group-hover:border-amber-500/30"
                  >
                    <span>Read Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Extras Volumes (7, 8, 9) */}
      {(selectedVolFilter === 'all' || selectedVolFilter === 'extras') && !filterQuery && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden mt-8">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white">Bonus Volumes (7-9)</h2>
            <p className="text-xs text-slate-400 mt-1">Production projects, interview questions, and a structured learning roadmap.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-slate-950 border border-slate-800/80 hover:border-emerald-500/40 rounded-xl p-5 transition flex flex-col justify-between space-y-3 group cursor-pointer" onClick={() => onSelectTab('projects')}>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono mb-2 block">
                  Volume 7
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                  Production Projects
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  20 advanced backend engineering projects. From a distributed task queue to a globally replicated KV store. Includes architecture diagrams and production APIs.
                </p>
              </div>
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-4">
                Explore Projects <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 hover:border-indigo-500/40 rounded-xl p-5 transition flex flex-col justify-between space-y-3 group cursor-pointer" onClick={() => onSelectTab('interviews')}>
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono mb-2 block">
                  Volume 8
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                  Top Company Interviews
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  170 high-quality technical interview questions asked at Google, Stripe, Uber, Netflix, and OpenAI. Features first-principles answers and AI mock grading.
                </p>
              </div>
              <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1 mt-4">
                Practice Interviews <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 hover:border-purple-500/40 rounded-xl p-5 transition flex flex-col justify-between space-y-3 group cursor-pointer" onClick={() => onSelectTab('roadmap')}>
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider font-mono mb-2 block">
                  Volume 9
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                  8-Month Mastery Roadmap
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  A structured 32-week roadmap guiding you through the handbook. Contains daily study milestones, recommended papers, and project timelines.
                </p>
              </div>
              <div className="text-xs text-purple-400 font-semibold flex items-center gap-1 mt-4">
                View Roadmap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
