import React, { useState } from 'react';
import { volume7Projects } from '../data/volume7_projects';
import { ProductionProject } from '../types';
import { 
  Briefcase, 
  Database, 
  Server, 
  Layers, 
  CheckCircle2, 
  Code2, 
  AlertTriangle, 
  Activity,
  Copy,
  Check,
  Play
} from 'lucide-react';

interface ProjectsViewProps {
  onRunCodeInSandbox?: (code: string, language: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onRunCodeInSandbox }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(volume7Projects[0]?.id || '');
  const [copied, setCopied] = useState<boolean>(false);

  const activeProject: ProductionProject | undefined = volume7Projects.find(
    p => p.id === selectedProjectId
  ) || volume7Projects[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-120px)]">
      
      {/* Sidebar List of Projects */}
      <div className="lg:col-span-4 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-4 space-y-3 h-fit">
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-white">{volume7Projects.length} Production Systems</h2>
        </div>
        <p className="text-xs text-slate-400">
          Full system requirements, DB schemas, API specs, scaling strategies, and production code implementations.
        </p>

        <div className="space-y-2 border-t border-[var(--color-dark-border)] pt-3">
          {volume7Projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`w-full text-left p-3 rounded-xl transition text-xs border ${
                selectedProjectId === p.id
                  ? 'bg-primary/20 text-primary border-primary/40 font-semibold'
                  : 'bg-[var(--color-dark-base)]/40 text-slate-300 border-[var(--color-dark-border)] hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-primary">Project #{p.number}</span>
                <span className="text-[10px] text-slate-400 font-mono">{p.targetScale}</span>
              </div>
              <h3 className="font-bold text-slate-100 line-clamp-1">{p.title}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Project Details Area */}
      {activeProject && (
        <div className="lg:col-span-8 space-y-6">
          
          {/* Project Header */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-primary/50 rounded-2xl p-6 text-slate-100 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-2">
              <span>Project #{activeProject.number}</span>
              <span>•</span>
              <span>{activeProject.category}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">{activeProject.title}</h1>
            <p className="text-xs text-primary mt-2 leading-relaxed">{activeProject.description}</p>
            
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30 font-mono font-semibold">
                Target Scale: {activeProject.targetScale}
              </span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-slate-400 font-semibold">Tech Stack:</span>
                {activeProject.techStack.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded text-[11px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Functional & Non-Functional Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Functional Requirements</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeProject.requirements.functional.map((req, i) => (
                  <li key={i}>• {req}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-2 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-gold" />
                <span>Non-Functional Requirements</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeProject.requirements.nonFunctional.map((req, i) => (
                  <li key={i}>• {req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* System Architecture Diagram */}
          <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Server className="w-4 h-4 text-primary" />
              <span>System Architecture & Component Diagram</span>
            </h3>
            <pre className="bg-[var(--color-dark-base)] text-primary border border-[var(--color-dark-border)] rounded-xl p-4 font-mono text-xs overflow-x-auto">
              {activeProject.architectureDiagramAscii}
            </pre>
          </div>

          {/* Database Schema */}
          <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Database className="w-4 h-4 text-primary" />
              <span>Database Schema (PostgreSQL / DDL)</span>
            </h3>
            <pre className="bg-[var(--color-dark-base)] text-slate-200 border border-[var(--color-dark-border)] rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <code>{activeProject.databaseSchema}</code>
            </pre>
          </div>

          {/* Core Code Implementation */}
          <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-gold" />
                <span>Production Code Implementation</span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(activeProject.coreCodeImplementation.code)}
                  className="flex items-center gap-1 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                {onRunCodeInSandbox && (
                  <button
                    onClick={() => onRunCodeInSandbox(activeProject.coreCodeImplementation.code, activeProject.coreCodeImplementation.language)}
                    className="flex items-center gap-1 text-xs font-semibold text-gold bg-gold/20 hover:bg-gold/80 px-2.5 py-1 rounded border border-gold/50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Preview Code</span>
                  </button>
                )}
              </div>
            </div>

            <pre className="bg-[var(--color-dark-base)] text-slate-200 border border-[var(--color-dark-border)] rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed">
              <code>{activeProject.coreCodeImplementation.code}</code>
            </pre>
          </div>

          {/* Mermaid Architecture Diagram */}
          {activeProject.architectureDiagramMermaid && (
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-primary" />
                <span>Mermaid Architecture Diagram</span>
              </h3>
              <pre className="bg-[var(--color-dark-base)] text-primary border border-primary/40 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{activeProject.architectureDiagramMermaid}</code>
              </pre>
            </div>
          )}

          {/* API Design Endpoints */}
          {activeProject.apiDesign && activeProject.apiDesign.length > 0 && (
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-sky-400" />
                <span>API Endpoint Design</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead>
                    <tr className="border-b border-[var(--color-dark-border)] text-left">
                      <th className="py-2 px-3 text-slate-400 font-bold uppercase tracking-wider">Method</th>
                      <th className="py-2 px-3 text-slate-400 font-bold uppercase tracking-wider">Endpoint</th>
                      <th className="py-2 px-3 text-slate-400 font-bold uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeProject.apiDesign.map((api, i) => (
                      <tr key={i} className="border-b border-[var(--color-dark-border)]/50 hover:bg-[var(--color-dark-base)]/40 transition">
                        <td className="py-2 px-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            api.method === 'GET' ? 'bg-primary/20 text-primary' :
                            api.method === 'POST' ? 'bg-gold/20 text-gold' :
                            api.method === 'PUT' ? 'bg-blue-500/20 text-blue-300' :
                            api.method === 'DELETE' ? 'bg-rose-500/20 text-rose-300' :
                            'bg-slate-500/20 text-slate-300'
                          }`}>
                            {api.method}
                          </span>
                        </td>
                        <td className="py-2 px-3 font-mono text-gold">{api.endpoint}</td>
                        <td className="py-2 px-3 text-slate-400">{api.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Scaling Strategy */}
          {activeProject.scalingStrategy && (
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-primary" />
                <span>Scaling Strategy</span>
              </h3>
              <div className="bg-[var(--color-dark-base)] border border-[var(--color-dark-border)] rounded-xl p-4 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                {activeProject.scalingStrategy}
              </div>
            </div>
          )}

          {/* Failure Modes & Recovery + Monitoring & Alerting + Testing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeProject.failureModesAndRecovery && activeProject.failureModesAndRecovery.length > 0 && (
              <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Failure Modes & Recovery</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeProject.failureModesAndRecovery.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 shrink-0">⚠</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeProject.monitoringAndAlerting && activeProject.monitoringAndAlerting.length > 0 && (
              <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>Monitoring & Alerting</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeProject.monitoringAndAlerting.map((m, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-primary shrink-0">📊</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeProject.testingStrategy && (
              <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>Testing Strategy</span>
                </h3>
                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {activeProject.testingStrategy}
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
