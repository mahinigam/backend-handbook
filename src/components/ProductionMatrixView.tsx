import React from 'react';
import { productionMatrixData } from '../data/production_matrix';
import { BarChart3, Building2, Scale } from 'lucide-react';

export const ProductionMatrixView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-900/50 rounded-2xl p-6 text-slate-100 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
          <BarChart3 className="w-4 h-4 text-sky-400" />
          <span>Production Reality Comparison Engine</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">How Major Tech Platforms Solve Backend Problems</h1>
        <p className="text-xs text-sky-200 mt-2 max-w-3xl leading-relaxed">
          Direct side-by-side technical comparison of how Google, Uber, Netflix, Stripe, Amazon, and Startups solve idempotency, rate limiting, sharding, and event streaming.
        </p>
      </div>

      {/* Matrix Cards */}
      <div className="space-y-6">
        {productionMatrixData.map((item, idx) => (
          <div key={idx} className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-6 space-y-4 shadow-lg">
            
            <div className="border-b border-[var(--color-dark-border)] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                {item.category}
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{item.topic}</h2>
              <p className="text-xs text-slate-300 mt-1"><strong>Core Challenge:</strong> {item.problem}</p>
            </div>

            {/* Platform Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-[var(--color-dark-base)] p-3.5 rounded-xl border border-[var(--color-dark-border)]">
                <span className="text-blue-400 font-bold block mb-1">Google Approach</span>
                <p className="text-slate-300 leading-relaxed">{item.googleApproach}</p>
              </div>

              <div className="bg-[var(--color-dark-base)] p-3.5 rounded-xl border border-[var(--color-dark-border)]">
                <span className="text-slate-200 font-bold block mb-1">Uber Approach</span>
                <p className="text-slate-300 leading-relaxed">{item.uberApproach}</p>
              </div>

              <div className="bg-[var(--color-dark-base)] p-3.5 rounded-xl border border-[var(--color-dark-border)]">
                <span className="text-rose-400 font-bold block mb-1">Netflix Approach</span>
                <p className="text-slate-300 leading-relaxed">{item.netflixApproach}</p>
              </div>

              <div className="bg-[var(--color-dark-base)] p-3.5 rounded-xl border border-[var(--color-dark-border)]">
                <span className="text-primary font-bold block mb-1">Stripe Approach</span>
                <p className="text-slate-300 leading-relaxed">{item.stripeApproach}</p>
              </div>

              <div className="bg-[var(--color-dark-base)] p-3.5 rounded-xl border border-[var(--color-dark-border)]">
                <span className="text-primary font-bold block mb-1">Startup / Solo Dev Approach</span>
                <p className="text-slate-300 leading-relaxed">{item.startupApproach}</p>
              </div>

              <div className="bg-gold/10 p-3.5 rounded-xl border border-gold/20">
                <span className="text-gold font-bold block mb-1 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" /> Key Architectural Tradeoff
                </span>
                <p className="text-gold leading-relaxed">{item.keyTradeoff}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
