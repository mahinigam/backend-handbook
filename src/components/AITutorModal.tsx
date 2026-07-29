import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Key,
  Loader2,
  Trash2,
  Settings2
} from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  initialMode?: 'explain' | 'high_thinking' | 'system_design' | 'code_review' | 'mock_interview';
  currentContext?: any;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  initialMode = 'high_thinking',
  currentContext
}) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [apiKey, setApiKey] = useState<string>('');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [availableModels, setAvailableModels] = useState<{id: string, name: string}[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingModels, setFetchingModels] = useState<boolean>(false);

  useEffect(() => {
    if (initialPrompt && isOpen && hasApiKey) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt, isOpen, hasApiKey]);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setHasApiKey(true);
      fetchAvailableModels(savedKey);
    }
  }, []);

  const fetchAvailableModels = async (key: string) => {
    setFetchingModels(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      const data = await response.json();
      
      if (data.models) {
        // Filter for text generation models
        const textModels = data.models
          .filter((m: any) => 
            m.supportedGenerationMethods?.includes('generateContent') && 
            !m.name.includes('embedding') &&
            !m.name.includes('tts') &&
            !m.name.includes('image')
          )
          .map((m: any) => ({
            id: m.name.replace('models/', ''),
            name: m.displayName || m.name.replace('models/', '')
          }));
        
        setAvailableModels(textModels);
        
        // Try to recover previously selected model or default to the most modern flash model
        const savedModel = localStorage.getItem('gemini_selected_model');
        if (savedModel && textModels.find((m: any) => m.id === savedModel)) {
          setSelectedModel(savedModel);
        } else if (textModels.length > 0) {
          // Prefer flash models, particularly latest ones
          const preferred = textModels.find((m: any) => m.id.includes('flash-latest')) 
                         || textModels.find((m: any) => m.id.includes('3.6-flash'))
                         || textModels.find((m: any) => m.id.includes('flash'))
                         || textModels[0];
          setSelectedModel(preferred.id);
          localStorage.setItem('gemini_selected_model', preferred.id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch models", error);
      // Fallback
      setAvailableModels([{id: 'gemini-flash-latest', name: 'Gemini Flash Latest'}]);
      setSelectedModel('gemini-flash-latest');
    } finally {
      setFetchingModels(false);
    }
  };

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setHasApiKey(true);
      await fetchAvailableModels(apiKey.trim());
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    localStorage.setItem('gemini_selected_model', newModel);
    setMessages([]); // Reset conversation when changing models to avoid context issues
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_selected_model');
    setApiKey('');
    setHasApiKey(false);
    setMessages([]);
    setAvailableModels([]);
  };

  if (!isOpen) return null;

  if (!hasApiKey) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] w-full max-w-md rounded-2xl flex flex-col shadow-2xl p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-gold to-orange-600 text-white">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">Gemini API Key Required</h3>
          </div>
          
          <p className="text-sm text-slate-400 mb-6">
            To use the Staff AI Engineer feature, please provide your Gemini API key. 
            This key is stored <strong className="text-gold">only in your browser's local storage</strong> and sent securely to our Vercel Serverless API.
          </p>
          
          <form onSubmit={handleSaveApiKey} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-dark-base)] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-gold"
                required
              />
            </div>
            <button
              type="submit"
              disabled={fetchingModels}
              className="w-full py-3 bg-gold hover:bg-gold disabled:opacity-50 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              {fetchingModels ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Save Key & Fetch Models</span>}
            </button>
          </form>
          <div className="mt-4 text-center">
             <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Get a free API key from Google AI Studio</a>
          </div>
        </div>
      </div>
    );
  }

  const handleSendQuery = async () => {
    if (!prompt.trim() || loading || !selectedModel) return;

    const userMsg = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setPrompt('');
    setLoading(true);

    try {
      let contextString = "No specific handbook context provided.";
      if (currentContext) {
        const safeContext = JSON.parse(JSON.stringify(currentContext));
        contextString = JSON.stringify(safeContext, null, 2);
      }

      const res = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          prompt: userMsg,
          mode: selectedModel.includes('pro') ? 'high_thinking' : 'explain',
          context: contextString,
          history: messages
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || errData.details || `HTTP ${res.status}`);
      }

      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: data.answer || 'No response generated.'
        }
      ]);
      
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: `[Error calling Serverless API]: ${err?.message || 'Unknown Error'}\n\nTip: You might have hit a quota limit or the API is misconfigured.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] w-full max-w-4xl h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-4 bg-[var(--color-dark-base)] border-b border-[var(--color-dark-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-primary to-primary text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">AI Staff Engineer Assistant</h3>
              </div>
              <p className="text-xs text-slate-400">Context: {currentContext?.title || 'General Knowledge'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] px-2 py-1 rounded-lg">
              <Settings2 className="w-3.5 h-3.5 text-slate-400" />
              {fetchingModels ? (
                 <Loader2 className="w-3.5 h-3.5 text-gold animate-spin" />
              ) : (
                <select 
                  value={selectedModel}
                  onChange={handleModelChange}
                  className="bg-transparent text-xs text-gold font-bold focus:outline-none cursor-pointer max-w-[150px] truncate"
                >
                  {availableModels.map(m => (
                    <option key={m.id} value={m.id} className="bg-[var(--color-dark-surface)] text-white">{m.name}</option>
                  ))}
                </select>
              )}
            </div>

            <button
              onClick={handleClearApiKey}
              className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 border border-red-900/50 rounded-lg hover:bg-red-900/20 transition flex items-center gap-1.5"
              title="Remove API Key"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Key</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
          {messages.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <Sparkles className="w-12 h-12 text-gold/50 mx-auto" />
              <p className="text-slate-400 text-sm font-medium">
                Ask anything about {currentContext?.title || 'the handbook'}. The AI has full context of this volume!
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={() => setPrompt("Can you summarize the most important architectural tradeoff discussed in this volume?")}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                >
                  "Summarize key tradeoffs in this volume"
                </button>
                <button
                  onClick={() => setPrompt("Test me on a Staff-level question based on this volume's content.")}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                >
                  "Test my knowledge"
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
                    ? 'bg-primary text-white font-medium rounded-br-none'
                    : 'bg-[var(--color-dark-base)] border border-[var(--color-dark-border)] text-slate-200 rounded-bl-none font-sans text-[13px]'
                }`}
              >
                {m.role === 'user' ? (
                  m.text
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mb-4 mt-6" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-lg font-bold text-white mb-3 mt-5" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-base font-bold text-white mb-2 mt-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                      a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                      code: ({node, inline, className, children, ...props}: any) => 
                        inline ? (
                          <code className="bg-[var(--color-dark-surface)] px-1.5 py-0.5 rounded text-gold font-mono text-[11px]" {...props}>
                            {children}
                          </code>
                        ) : (
                          <div className="bg-[var(--color-dark-surface)] rounded-lg overflow-hidden mb-4 border border-[var(--color-dark-border)]">
                            <div className="bg-[var(--color-dark-base)] px-4 py-1.5 border-b border-[var(--color-dark-border)] flex items-center justify-between text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                              <span>Code</span>
                            </div>
                            <pre className="p-4 overflow-x-auto">
                              <code className="text-slate-300 font-mono text-xs leading-relaxed" {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        ),
                      table: ({node, ...props}) => (
                        <div className="overflow-x-auto mb-4 border border-[var(--color-dark-border)] rounded-lg shadow-sm shadow-black/20">
                          <table className="w-full text-left border-collapse min-w-[600px]" {...props} />
                        </div>
                      ),
                      thead: ({node, ...props}) => <thead className="bg-[var(--color-dark-base)]" {...props} />,
                      th: ({node, ...props}) => <th className="p-3 border-b border-[var(--color-dark-border)] font-bold text-white whitespace-nowrap text-xs uppercase tracking-wider" {...props} />,
                      td: ({node, ...props}) => <td className="p-3 border-b border-[var(--color-dark-border)]/50 text-slate-300 align-top leading-relaxed" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-primary pl-4 italic text-slate-400 mb-4 bg-primary/5 py-2 pr-4 rounded-r-lg" {...props} />,
                      hr: ({node, ...props}) => <hr className="border-[var(--color-dark-border)] my-6" {...props} />
                    }}
                  >
                    {m.text}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-primary text-xs font-mono bg-[var(--color-dark-base)] p-3 rounded-xl w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Staff AI Engineer is reasoning...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[var(--color-dark-base)] border-t border-[var(--color-dark-border)] flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask a deep technical question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            className="flex-1 px-4 py-2.5 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSendQuery}
            disabled={loading || !prompt.trim() || !selectedModel}
            className="px-5 py-2.5 bg-primary hover:bg-primary disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow flex items-center gap-1.5 transition"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>

      </div>
    </div>
  );
};
