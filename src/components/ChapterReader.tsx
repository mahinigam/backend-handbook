import React, { useState } from 'react';
import { Volume, ChapterSection, VolumeChapter } from '../types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  HelpCircle, 
  Layers, 
  Scale, 
  Server, 
  ShieldAlert, 
  Terminal, 
  BookOpen,
  Copy,
  Check,
  Zap,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ChapterReaderProps {
  volume: Volume;
  selectedChapter: VolumeChapter;
  onSelectChapter: (chapter: VolumeChapter) => void;
  onRunCodeInSandbox?: (code: string, language: string) => void;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({
  volume,
  selectedChapter,
  onSelectChapter,
  onRunCodeInSandbox
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    selectedChapter.sections[0]?.id || ''
  );
  const [activeSubTab, setActiveSubTab] = useState<
    'problem' | 'architecture' | 'production' | 'code' | 'tradeoffs' | 'interview'
  >('problem');

  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const activeSection: ChapterSection | undefined = selectedChapter.sections.find(
    s => s.id === activeSectionId
  ) || selectedChapter.sections[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-120px)]">
      
      {/* Chapter Sidebar / Table of Contents */}
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 h-fit">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Volume {volume.volumeNumber}
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-2 leading-tight">{volume.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{volume.description}</p>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Chapters</h3>
          <div className="space-y-1">
            {volume.chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch);
                  if (ch.sections.length > 0) setActiveSectionId(ch.sections[0].id);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-start gap-2 ${
                  selectedChapter.id === ch.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="font-bold shrink-0">{ch.chapterNumber}.</span>
                <span className="line-clamp-2">{ch.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sections in selected chapter */}
        {selectedChapter.sections.length > 0 && (
          <div className="border-t border-slate-800 pt-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Chapter Sections</h3>
            <div className="space-y-1">
              {selectedChapter.sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition line-clamp-1 ${
                    activeSectionId === sec.id
                      ? 'bg-indigo-600/30 text-indigo-300 font-medium border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  • {sec.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Chapter Content Area */}
      <div className="lg:col-span-9 space-y-6">
        
        {/* Chapter Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 text-slate-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Terminal className="w-48 h-48 text-indigo-400" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <span>Chapter {selectedChapter.chapterNumber}</span>
              <span>•</span>
              <span>{volume.title}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{selectedChapter.title}</h1>
            <p className="text-sm text-indigo-200 mt-2 font-medium">{selectedChapter.subtitle}</p>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed max-w-3xl">{selectedChapter.summary}</p>

            {/* Learning Objectives */}
            <div className="mt-4 pt-4 border-t border-indigo-900/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Learning Objectives</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedChapter.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs (Problem-First Framework) */}
        {activeSection && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            
            {/* Section Header */}
            <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Section Analysis
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeSection.title}</h3>
              </div>

              {/* Problem-First Workflow Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveSubTab('problem')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeSubTab === 'problem'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Problem & Evolution
                </button>
                <button
                  onClick={() => setActiveSubTab('architecture')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeSubTab === 'architecture'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Internal Architecture
                </button>
                <button
                  onClick={() => setActiveSubTab('production')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeSubTab === 'production'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Production Reality
                </button>
                <button
                  onClick={() => setActiveSubTab('code')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeSubTab === 'code'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Production Code
                </button>
                <button
                  onClick={() => setActiveSubTab('tradeoffs')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeSubTab === 'tradeoffs'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tradeoffs & Complexity
                </button>
                <button
                  onClick={() => setActiveSubTab('interview')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeSubTab === 'interview'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Interviews & Exercises
                </button>
              </div>
            </div>

            {/* Tab 1: Problem Statement & Historical Evolution */}
            {activeSubTab === 'problem' && (
              <div className="p-6 space-y-6 text-slate-200 text-sm">
                
                <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>1. Problem Statement</span>
                  </h4>
                  <p className="text-slate-200 leading-relaxed text-sm font-medium">
                    {activeSection.problemStatement}
                  </p>
                </div>

                <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>2. Why Previous Solutions Fail</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {activeSection.whyPreviousFailed}
                  </p>
                </div>

                {activeSection.historicalBackground && (
                  <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>3. Historical Background & Evolution</span>
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {activeSection.historicalBackground}
                    </p>
                  </div>
                )}

                <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>4. Core Architectural Idea</span>
                  </h4>
                  <p className="text-slate-200 leading-relaxed text-sm font-medium">
                    {activeSection.coreIdea}
                  </p>
                </div>

              </div>
            )}

            {/* Tab 2: Internal Architecture & Diagrams */}
            {activeSubTab === 'architecture' && (
              <div className="p-6 space-y-6 text-slate-200 text-sm">
                
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <span>C-Level Internal Implementation Mechanics</span>
                  </h4>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {activeSection.internalImplementation}
                  </div>
                </div>

                {activeSection.asciiDiagram && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                      ASCII Data Flow & Memory Layout Diagram
                    </h4>
                    <pre className="bg-slate-950 text-amber-300 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-normal">
                      {activeSection.asciiDiagram}
                    </pre>
                  </div>
                )}

                {activeSection.mermaidDiagram && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span>Mermaid Architecture Diagram</span>
                    </h4>
                    <pre className="bg-slate-950 text-emerald-300 border border-emerald-900/40 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed">
                      <code>{activeSection.mermaidDiagram}</code>
                    </pre>
                  </div>
                )}

                {activeSection.sequenceDiagram && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-sky-400" />
                      <span>Sequence Diagram</span>
                    </h4>
                    <pre className="bg-slate-950 text-sky-300 border border-sky-900/40 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed">
                      <code>{activeSection.sequenceDiagram}</code>
                    </pre>
                  </div>
                )}

                {activeSection.memoryLayout && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-400" />
                      <span>Memory Layout</span>
                    </h4>
                    <pre className="bg-slate-950 text-purple-300 border border-purple-900/40 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-normal">
                      {activeSection.memoryLayout}
                    </pre>
                  </div>
                )}

                {activeSection.databaseSchema && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-rose-400" />
                      <span>Database Schema</span>
                    </h4>
                    <pre className="bg-slate-950 text-rose-300 border border-rose-900/40 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-normal">
                      {activeSection.databaseSchema}
                    </pre>
                  </div>
                )}

              </div>
            )}

            {/* Tab 3: Production Reality Matrix (Google vs Uber vs Stripe vs Startups) */}
            {activeSubTab === 'production' && (
              <div className="p-6 space-y-6 text-slate-200 text-sm">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Production Reality Breakdown
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    How major tech platforms solve this exact technical challenge in production.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="font-bold text-xs text-blue-300">How Google Solves This</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{activeSection.productionReality.googleHow}</p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        <span className="font-bold text-xs text-slate-200">How Uber Solves This</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{activeSection.productionReality.uberHow}</p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span className="font-bold text-xs text-rose-300">How Netflix Solves This</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{activeSection.productionReality.netflixHow}</p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        <span className="font-bold text-xs text-indigo-300">How Stripe Solves This</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{activeSection.productionReality.stripeHow}</p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="font-bold text-xs text-amber-300">How Amazon Solves This</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{activeSection.productionReality.amazonHow}</p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-bold text-xs text-emerald-300">How Small Startups & Solo Devs Solve This</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{activeSection.productionReality.smallStartupHow}</p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Tab 4: Production Code */}
            {activeSubTab === 'code' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-xl border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 font-mono text-amber-300">
                    <Code2 className="w-4 h-4" />
                    <span>{activeSection.productionCode.filename}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(activeSection.productionCode.code)}
                      className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                    {onRunCodeInSandbox && (
                      <button
                        onClick={() => onRunCodeInSandbox(activeSection.productionCode.code, activeSection.productionCode.language)}
                        className="flex items-center gap-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2 py-1 rounded border border-amber-500/30"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run in Sandbox</span>
                      </button>
                    )}
                  </div>
                </div>

                <pre className="bg-slate-950 text-slate-200 border border-t-0 border-slate-800 rounded-b-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed">
                  <code>{activeSection.productionCode.code}</code>
                </pre>

                <p className="text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                  <strong className="text-slate-200">Code Walkthrough:</strong> {activeSection.productionCode.explanation}
                </p>
              </div>
            )}

            {/* Tab 5: Tradeoffs & Complexity */}
            {activeSubTab === 'tradeoffs' && (
              <div className="p-6 space-y-6 text-slate-200 text-sm">
                
                {/* Time & Space Complexity */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-indigo-400" />
                    <span>Complexity Analysis</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block font-semibold mb-1">Time Complexity</span>
                      <code className="text-amber-300 font-mono text-sm">{activeSection.complexityAnalysis.timeComplexity}</code>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block font-semibold mb-1">Space Complexity</span>
                      <code className="text-amber-300 font-mono text-sm">{activeSection.complexityAnalysis.spaceComplexity}</code>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mt-3">{activeSection.complexityAnalysis.explanation}</p>
                </div>

                {/* Tradeoffs List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Tradeoffs & Engineering Compromises</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeSection.tradeoffs.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Performance & Scaling */}
                {(activeSection.performanceImplications || activeSection.scalingConsiderations) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeSection.performanceImplications && (
                      <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-indigo-400" />
                          <span>Performance Implications</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{activeSection.performanceImplications}</p>
                      </div>
                    )}
                    {activeSection.scalingConsiderations && (
                      <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2 flex items-center gap-1.5">
                          <Server className="w-4 h-4 text-emerald-400" />
                          <span>Scaling Considerations</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{activeSection.scalingConsiderations}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Failure Modes */}
                {activeSection.failureModes.length > 0 && (
                  <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Failure Modes</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeSection.failureModes.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold shrink-0">⚠</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Anti-patterns & Mistakes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">Common Beginner Mistakes</h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {activeSection.commonMistakes.map((m, i) => (
                        <li key={i}>• {m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Production Anti-Patterns</h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {activeSection.antiPatterns.map((a, i) => (
                        <li key={i}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Best Practices */}
                {activeSection.bestPractices.length > 0 && (
                  <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Best Practices</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeSection.bestPractices.map((bp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            )}

            {/* Tab 6: Interviews & Practical Exercises */}
            {activeSubTab === 'interview' && (
              <div className="p-6 space-y-6 text-slate-200 text-sm">
                
                {/* Interview Expectations */}
                <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    <span>Typical Staff/Senior Interview Question</span>
                  </h4>
                  <p className="text-sm font-semibold text-white mb-3">
                    "{activeSection.interviewExpectations.typicalQuestion}"
                  </p>

                  <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Expected Key Points in Answer:</h5>
                  <ul className="space-y-1 text-xs text-slate-300 mb-3">
                    {activeSection.interviewExpectations.expectedAnswerKeyPoints.map((kp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>

                  {activeSection.interviewExpectations.followUpQuestions.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">Common Follow-Up Questions:</h5>
                      <ul className="space-y-1 text-xs text-slate-400 italic">
                        {activeSection.interviewExpectations.followUpQuestions.map((fq, i) => (
                          <li key={i}>→ {fq}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Practical Exercises */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Hands-on Exercises</h4>
                  <div className="space-y-3">
                    {activeSection.exercises.map((ex, i) => (
                      <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-xs font-bold text-white">{ex.title}</h5>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            ex.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                            ex.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-rose-500/20 text-rose-300'
                          }`}>
                            {ex.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mb-2">{ex.description}</p>
                        {ex.solutionHint && (
                          <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
                            <strong>Hint:</strong> {ex.solutionHint}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Further Reading */}
                {activeSection.furtherReading && activeSection.furtherReading.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span>Further Reading & References</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {activeSection.furtherReading.map((ref, i) => (
                        <div key={i} className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-start gap-3">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                            ref.type === 'Doc' ? 'bg-blue-500/20 text-blue-300' :
                            ref.type === 'Blog' ? 'bg-amber-500/20 text-amber-300' :
                            ref.type === 'Paper' ? 'bg-purple-500/20 text-purple-300' :
                            ref.type === 'Book' ? 'bg-emerald-500/20 text-emerald-300' :
                            ref.type === 'Talk' ? 'bg-rose-500/20 text-rose-300' :
                            'bg-indigo-500/20 text-indigo-300'
                          }`}>
                            {ref.type}
                          </span>
                          <div>
                            {ref.link ? (
                              <a href={ref.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white hover:text-amber-300 transition">
                                {ref.title} ↗
                              </a>
                            ) : (
                              <span className="text-xs font-bold text-white">{ref.title}</span>
                            )}
                            <p className="text-[11px] text-slate-400 mt-0.5">{ref.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* Book Page Turner / Chapter Navigation Footer */}
        {(() => {
          const currentIndex = volume.chapters.findIndex(c => c.id === selectedChapter.id);
          const prevChapter = currentIndex > 0 ? volume.chapters[currentIndex - 1] : null;
          const nextChapter = currentIndex < volume.chapters.length - 1 ? volume.chapters[currentIndex + 1] : null;

          return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevChapter ? (
                <button
                  onClick={() => {
                    onSelectChapter(prevChapter);
                    if (prevChapter.sections.length > 0) setActiveSectionId(prevChapter.sections[0].id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center gap-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-xl transition text-left group"
                >
                  <ChevronLeft className="w-5 h-5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono">Previous Chapter {prevChapter.chapterNumber}</span>
                    <span className="text-xs font-bold text-slate-200 line-clamp-1">{prevChapter.title}</span>
                  </div>
                </button>
              ) : <div />}

              <div className="text-xs font-mono text-slate-500 text-center">
                Chapter {selectedChapter.chapterNumber} of {volume.chapters.length} in Volume {volume.volumeNumber}
              </div>

              {nextChapter ? (
                <button
                  onClick={() => {
                    onSelectChapter(nextChapter);
                    if (nextChapter.sections.length > 0) setActiveSectionId(nextChapter.sections[0].id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center justify-end gap-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-xl transition text-right group"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono">Next Chapter {nextChapter.chapterNumber}</span>
                    <span className="text-xs font-bold text-slate-200 line-clamp-1">{nextChapter.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : <div />}
            </div>
          );
        })()}

      </div>

    </div>
  );
};
