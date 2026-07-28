import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ALL_VOLUMES, getVolumeById, searchFullHandbook, type HandbookSearchResult } from './data/volumes';
import { Volume, VolumeChapter } from './types';
import { Navbar } from './components/Navbar';
import { ChapterReader } from './components/ChapterReader';
import { 
  BookOpen, 
  Search, 
} from 'lucide-react';

const BookIndexView = lazy(() => import('./components/BookIndexView').then((module) => ({ default: module.BookIndexView })));
const CodePlayground = lazy(() => import('./components/CodePlayground').then((module) => ({ default: module.CodePlayground })));
const ProjectsView = lazy(() => import('./components/ProjectsView').then((module) => ({ default: module.ProjectsView })));
const InterviewsView = lazy(() => import('./components/InterviewsView').then((module) => ({ default: module.InterviewsView })));
const RoadmapView = lazy(() => import('./components/RoadmapView').then((module) => ({ default: module.RoadmapView })));
const ProductionMatrixView = lazy(() => import('./components/ProductionMatrixView').then((module) => ({ default: module.ProductionMatrixView })));
const AITutorModal = lazy(() => import('./components/AITutorModal').then((module) => ({ default: module.AITutorModal })));

const LoadingPanel = () => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-slate-400">
    Loading section...
  </div>
);

export function App() {
  const [activeTab, setActiveTab] = useState<string>('handbook');
  const [selectedVolumeId, setSelectedVolumeId] = useState<string>(ALL_VOLUMES[0].id);
  const [selectedChapter, setSelectedChapter] = useState<VolumeChapter>(ALL_VOLUMES[0].chapters[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [sandboxCode, setSandboxCode] = useState<string>('');
  const [sandboxLang, setSandboxLang] = useState<string>('python');

  const [completedSections, setCompletedSections] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('staff_handbook_completed_sections');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const handleToggleCompleteSection = (sectionId: string) => {
    setCompletedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      try {
        localStorage.setItem('staff_handbook_completed_sections', JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error('Failed to save reading progress', err);
      }
      return next;
    });
  };

  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiModalPrompt, setAiModalPrompt] = useState<string>('');
  const [aiModalMode, setAiModalMode] = useState<
    'explain' | 'high_thinking' | 'system_design' | 'code_review' | 'mock_interview'
  >('high_thinking');

  const selectedVolume = getVolumeById(selectedVolumeId) || ALL_VOLUMES[0];

  const [searchResults, setSearchResults] = useState<HandbookSearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    let cancelled = false;

    if (!trimmedQuery) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    searchFullHandbook(trimmedQuery)
      .then((results) => {
        if (!cancelled) setSearchResults(results);
      })
      .catch((err) => {
        console.error('Failed to search handbook', err);
        if (!cancelled) setSearchResults([]);
      })
      .finally(() => {
        if (!cancelled) setSearchLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  const handleOpenAITutor = (
    prompt: string = '',
    mode: 'explain' | 'high_thinking' | 'system_design' | 'code_review' | 'mock_interview' = 'high_thinking'
  ) => {
    setAiModalPrompt(prompt);
    setAiModalMode(mode);
    setAiModalOpen(true);
  };

  const handleRunCodeInSandbox = (code: string, language: string) => {
    setSandboxCode(code);
    setSandboxLang(language);
    setActiveTab('playground');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAITutor={(mode) => handleOpenAITutor('', mode || 'high_thinking')}
      />

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Search Overlay Results */}
        {searchQuery.trim().length > 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search Results for "{searchQuery}" ({searchResults.length} matches)</span>
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-amber-400 hover:underline"
              >
                Clear Search
              </button>
            </div>

            {searchLoading ? (
              <p className="text-xs text-slate-400 py-4">Searching textbook chapters, projects, interviews, roadmap, and matrix...</p>
            ) : searchResults.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No matching sections found for "{searchQuery}". Try searching for terms like MVCC, Epoll, Kafka, Redis, or Idempotency.</p>
            ) : (
              <div className="space-y-3">
                {searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (res.type === 'chapter') {
                        setSelectedVolumeId(res.volume.id);
                        setSelectedChapter(res.chapter);
                        setActiveTab('handbook');
                      } else {
                        setActiveTab(res.tab);
                      }
                      setSearchQuery('');
                    }}
                    className="p-4 bg-slate-950 hover:bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition space-y-1"
                  >
                    <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      <span>{res.label}</span>
                      <span>•</span>
                      <span className="text-slate-400">{res.matchType}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{res.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2">{res.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Volume Selector Bar (For Handbook Tab) */}
            {activeTab === 'handbook' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Backend Handbook Core Volumes (1 - 6)</span>
                  </h2>
                  <span className="text-xs text-slate-400">Select a volume to inspect C-level internals & architecture</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {ALL_VOLUMES.map((vol) => (
                    <button
                      key={vol.id}
                      onClick={() => {
                        setSelectedVolumeId(vol.id);
                        if (vol.chapters.length > 0) setSelectedChapter(vol.chapters[0]);
                      }}
                      className={`p-3 rounded-xl text-left transition border flex flex-col justify-between ${
                        selectedVolumeId === vol.id
                          ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 font-bold shadow-md shadow-amber-500/10'
                          : 'bg-slate-950/50 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-amber-400 block mb-0.5">Vol {vol.volumeNumber}</span>
                        <span className="text-xs line-clamp-2 font-bold leading-tight">{vol.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 font-mono">{vol.chapters.length} Chapters</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Suspense fallback={<LoadingPanel />}>
              {/* View Switching */}
              {activeTab === 'index' && (
                <BookIndexView
                  onSelectChapter={(volId, chapter) => {
                    setSelectedVolumeId(volId);
                    setSelectedChapter(chapter);
                    setActiveTab('handbook');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  completedSections={completedSections}
                  onToggleCompleteSection={handleToggleCompleteSection}
                  onSelectTab={(tab) => {
                    setActiveTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {activeTab === 'handbook' && (
                <ChapterReader
                  volume={selectedVolume}
                  selectedChapter={selectedChapter}
                  onSelectChapter={setSelectedChapter}
                  onRunCodeInSandbox={handleRunCodeInSandbox}
                />
              )}

              {activeTab === 'projects' && (
                <ProjectsView onRunCodeInSandbox={handleRunCodeInSandbox} />
              )}

              {activeTab === 'interviews' && (
                <InterviewsView onOpenAITutor={handleOpenAITutor} />
              )}

              {activeTab === 'roadmap' && (
                <RoadmapView />
              )}

              {activeTab === 'matrix' && (
                <ProductionMatrixView />
              )}

              {activeTab === 'playground' && (
                <CodePlayground
                  initialCode={sandboxCode}
                  initialLanguage={sandboxLang}
                  onAskAITutor={handleOpenAITutor}
                />
              )}
            </Suspense>
          </>
        )}

      </main>

      {/* AI Staff Engineer Tutor Modal */}
      {aiModalOpen && (
        <Suspense fallback={null}>
          <AITutorModal
            isOpen={aiModalOpen}
            onClose={() => setAiModalOpen(false)}
            initialPrompt={aiModalPrompt}
            initialMode={aiModalMode}
            currentContext={selectedVolume}
          />
        </Suspense>
      )}

    </div>
  );
}

export default App;
