import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Globe, 
  Cpu, 
  CheckCircle2, 
  ExternalLink,
  Loader2
} from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  initialMode?: 'explain' | 'high_thinking' | 'system_design' | 'code_review' | 'mock_interview';
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  initialMode = 'high_thinking'
}) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [mode, setMode] = useState<'explain' | 'high_thinking' | 'system_design' | 'code_review' | 'mock_interview' | 'search'>(
    initialMode === 'high_thinking' ? 'high_thinking' : initialMode
  );
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; sources?: any[] }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  const handleSendQuery = async () => {
    if (!prompt.trim() || loading) return;

    const userMsg = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setPrompt('');
    setLoading(true);

    try {
      if (mode === 'search') {
        const res = await fetch('/api/ai/search-grounding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userMsg }),
        });
        const data = await res.json();
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: data.answer || 'No answer generated.',
            sources: data.sources || []
          }
        ]);
      } else {
        const res = await fetch('/api/ai/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: userMsg,
            mode: mode === 'search' ? 'explain' : mode,
          }),
        });
        const data = await res.json();
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: data.answer || 'No response generated.'
          }
        ]);
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `[Error calling AI Tutor API]: ${err?.message || 'Server connection issue'}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">AI Staff Engineer Assistant</h3>
                <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  {mode === 'high_thinking' ? 'Gemini 3.1 Pro High Thinking' : mode === 'search' ? 'Google Search Grounding' : 'Gemini 3.6 Flash'}
                </span>
              </div>
              <p className="text-xs text-slate-400">Ask complex system design, code review, or CPython/Database internal queries.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggles */}
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setMode('high_thinking')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              mode === 'high_thinking'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>High Thinking Mode</span>
          </button>

          <button
            onClick={() => setMode('search')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              mode === 'search'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Search Grounding</span>
          </button>

          <button
            onClick={() => setMode('system_design')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              mode === 'system_design'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>System Design Solver</span>
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
          {messages.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <Bot className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm font-medium">
                Ask the Staff AI Engineer anything about Python, PostgreSQL, Kafka, Redis, or System Design.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={() => setPrompt("Explain how PostgreSQL MVCC handles row updates on 8KB heap pages.")}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                >
                  "Explain Postgres MVCC 8KB pages"
                </button>
                <button
                  onClick={() => setPrompt("How do I write a Sliding Window Rate Limiter using Redis Lua scripts?")}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                >
                  "Write Redis Lua Rate Limiter"
                </button>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-3xl p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-br-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none font-mono text-xs'
                }`}
              >
                {m.text}

                {/* Grounding Sources */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-blue-300 font-sans">
                    <span className="font-bold text-slate-400 block mb-1">Search Grounding Sources:</span>
                    <div className="space-y-1">
                      {m.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:underline text-blue-400"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{src.title || src.uri}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono bg-slate-950 p-3 rounded-xl w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span>Staff AI Engineer is reasoning with High Thinking...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI Staff Engineer..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            className="flex-1 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSendQuery}
            disabled={loading || !prompt.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>

      </div>
    </div>
  );
};
