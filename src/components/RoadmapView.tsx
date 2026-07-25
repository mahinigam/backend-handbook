import React, { useState } from 'react';
import { volume9Roadmap } from '../data/volume9_roadmap';
import { MapPin, CheckCircle2, BookOpen, Award, Sparkles } from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('staff_handbook_roadmap_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleDay = (weekNum: number, dayNum: number) => {
    const key = `w${weekNum}_d${dayNum}`;
    setCompletedDays(prev => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('staff_handbook_roadmap_progress', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save roadmap progress', err);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-900/50 rounded-2xl p-6 text-slate-100 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
          <MapPin className="w-4 h-4 text-purple-400" />
          <span>Volume 9: 8-Month Backend Engineering Roadmap</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Week-by-Week Staff Backend Mastery Path</h1>
        <p className="text-xs text-purple-200 mt-2 max-w-3xl leading-relaxed">
          Structured week-by-week goals, daily study milestones, milestone projects, and recommended engineering papers, RFCs, and books.
        </p>
      </div>

      {/* Roadmap Weeks */}
      <div className="space-y-6">
        {volume9Roadmap.map((week) => (
          <div key={week.weekNumber} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                  Week {week.weekNumber} • {week.theme}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{week.title}</h2>
                <p className="text-xs text-slate-400">{week.volumeReference}</p>
              </div>

              <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-amber-300 font-medium">
                🏆 Milestone Project: {week.milestoneProject}
              </div>
            </div>

            {/* Daily Goals Checklist */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Daily Learning Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {week.dailyGoals.map((g) => {
                  const key = `w${week.weekNumber}_d${g.day}`;
                  const isDone = Boolean(completedDays[key]);

                  return (
                    <div
                      key={g.day}
                      onClick={() => toggleDay(week.weekNumber, g.day)}
                      className={`p-3 rounded-xl border cursor-pointer transition text-xs flex items-start gap-2.5 ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-emerald-500 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="font-bold block text-white">Day {g.day}: {g.title}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">{g.task}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Resources */}
            {week.recommendedResources.length > 0 && (
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                <span className="font-bold text-slate-400 block mb-1">Recommended Papers & Books:</span>
                <div className="flex flex-wrap gap-2">
                  {week.recommendedResources.map((res, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-900 text-purple-300 rounded-md border border-slate-800 font-medium text-[11px]">
                      [{res.type}] {res.title} ({res.authorOrSource})
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
