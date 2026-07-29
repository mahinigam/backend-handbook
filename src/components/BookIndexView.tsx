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
    if (selectedVolFilter === 'extras') return false;
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-dark-surface)] via-primary/20 to-[var(--color-dark-base)] border border-gold/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <BookOpen className="w-72 h-72 text-gold" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Staff Backend Engineering Handbook
            </span>
            <span className="text-xs font-mono text-slate-400">First Edition • 2026 Edition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Backend Engineering Handbook
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            A comprehensive guide modeled after the engineering practices of Staff Engineers at top tech companies.
          </p>

          {/* Reading Progress Indicator */}
          <div className="pt-4 border-t border-[var(--color-dark-border)]/80 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-[var(--color-dark-base)]/60 p-3 rounded-xl border border-[var(--color-dark-border)]">
                <div className="text-slate-400 font-semibold mb-1">Total Volumes</div>
              <div className="text-lg font-bold text-gold">9 Volumes</div>
            </div>
            <div className="bg-[var(--color-dark-base)]/60 p-3 rounded-xl border border-[var(--color-dark-border)]">
              <div className="text-slate-400 font-semibold mb-1">Total Chapters</div>
              <div className="text-lg font-bold text-primary">{totalChapters} Chapters</div>
            </div>
            <div className="bg-[var(--color-dark-base)]/60 p-3 rounded-xl border border-[var(--color-dark-border)]">
              <div className="text-slate-400 font-semibold mb-1">Detailed Sections</div>
              <div className="text-lg font-bold text-primary">{totalSections} Deep Sections</div>
            </div>
            <div className="bg-[var(--color-dark-base)]/60 p-3 rounded-xl border border-[var(--color-dark-border)]">
              <div className="text-slate-400 font-semibold mb-1">Reading Progress</div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">{progressPercent}% Completed</span>
                <span className="text-slate-400">{completedCount}/{totalSections}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-gold h-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search index by topic, chapter, or keyword..."
            className="w-full bg-[var(--color-dark-base)] border border-[var(--color-dark-border)] focus:border-gold/50 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Volume Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedVolFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedVolFilter === 'all'
                ? 'bg-gold/20 text-gold border border-gold/30'
                : 'bg-[var(--color-dark-base)] text-slate-400 hover:text-white border border-[var(--color-dark-border)]'
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
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'bg-[var(--color-dark-base)] text-slate-400 hover:text-white border border-[var(--color-dark-border)]'
              }`}
            >
              Vol {v.volumeNumber}
            </button>
          ))}
          <button
            onClick={() => setSelectedVolFilter('extras')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedVolFilter === 'extras'
                ? 'bg-gold/20 text-gold border border-gold/30'
                : 'bg-[var(--color-dark-base)] text-slate-400 hover:text-white border border-[var(--color-dark-border)]'
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
            className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden"
          >
            {/* Volume Header Spine */}
            <div className="border-b border-[var(--color-dark-border)] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-extrabold text-gold uppercase tracking-widest bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20">
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
                  className="bg-[var(--color-dark-base)] border border-[var(--color-dark-border)]/80 hover:border-gold/40 rounded-xl p-4 transition flex flex-col justify-between space-y-3 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-wider font-mono">
                        Chapter {ch.chapterNumber}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> ~15 min read
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-gold transition">
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
                            className="flex items-center justify-between text-xs text-slate-300 hover:text-gold py-1"
                          >
                            <span className="line-clamp-1 flex items-center gap-1.5">
                              <span className="text-gold font-bold">•</span>
                              <span>{sec.title}</span>
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleCompleteSection(sec.id);
                              }}
                              className="text-slate-500 hover:text-primary ml-2 shrink-0"
                              title={isCompleted ? "Mark as unread" : "Mark as read"}
                            >
                              <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-primary fill-primary/20' : ''}`} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Read Chapter Button */}
                  <button
                    onClick={() => onSelectChapter(vol.id, ch)}
                    className="w-full flex items-center justify-between bg-[var(--color-dark-surface)] hover:bg-gold/20 text-slate-200 hover:text-gold px-3 py-2 rounded-lg text-xs font-semibold border border-[var(--color-dark-border)] hover:border-gold/30 transition group-hover:border-gold/30"
                  >
                    <span>Read Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Extras Volumes (7, 8, 9) */}
      {(selectedVolFilter === 'all' || selectedVolFilter === 'extras') && (
        <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden mt-8">
          <div className="border-b border-[var(--color-dark-border)] pb-4">
            <h2 className="text-xl font-bold text-white">Bonus Volumes (7-9)</h2>
            <p className="text-xs text-slate-400 mt-1">Production projects, interview questions, and a structured learning roadmap.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-[var(--color-dark-base)] border border-[var(--color-dark-border)]/80 hover:border-primary/40 rounded-xl p-5 transition flex flex-col justify-between space-y-3 group cursor-pointer" onClick={() => onSelectTab('projects')}>
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono mb-2 block">
                  Volume 7
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-primary transition">
                  Production Projects
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  20 advanced backend engineering projects. From a distributed task queue to a globally replicated KV store. Includes architecture diagrams and production APIs.
                </p>
              </div>
              <div className="text-xs text-primary font-semibold flex items-center gap-1 mt-4">
                Explore Projects <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-[var(--color-dark-base)] border border-[var(--color-dark-border)]/80 hover:border-primary/40 rounded-xl p-5 transition flex flex-col justify-between space-y-3 group cursor-pointer" onClick={() => onSelectTab('interviews')}>
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono mb-2 block">
                  Volume 8
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-primary transition">
                  Top Company Interviews
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  170 structured technical interview practice prompts inspired by senior and staff-level backend interview themes. Features first-principles answers and AI mock grading.
                </p>
              </div>
              <div className="text-xs text-primary font-semibold flex items-center gap-1 mt-4">
                Practice Interviews <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-[var(--color-dark-base)] border border-[var(--color-dark-border)]/80 hover:border-primary/40 rounded-xl p-5 transition flex flex-col justify-between space-y-3 group cursor-pointer" onClick={() => onSelectTab('roadmap')}>
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono mb-2 block">
                  Volume 9
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-primary transition">
                  8-Month Mastery Roadmap
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  A structured 32-week roadmap guiding you through the handbook. Contains daily study milestones, recommended papers, and project timelines.
                </p>
              </div>
              <div className="text-xs text-primary font-semibold flex items-center gap-1 mt-4">
                View Roadmap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
