import React, { useState, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode?: string;
  initialLanguage?: string;
  onAskAITutor?: (prompt: string, mode?: 'explain' | 'high_thinking' | 'code_review') => void;
}

const DEFAULT_PYTHON_SNIPPET = `# Production Python Descriptor & Validation Engine
import re
from typing import Any, Optional

class ValidatedString:
    def __init__(self, min_length: int = 3, regex_pattern: Optional[str] = None):
        self.min_length = min_length
        self.regex = re.compile(regex_pattern) if regex_pattern else None

    def __set_name__(self, owner, name):
        self.private_name = f"_{name}"

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__.get(self.private_name, None)

    def __set__(self, instance, value: Any):
        if not isinstance(value, str):
            raise TypeError(f"Expected str, got {type(value).__name__}")
        if len(value) < self.min_length:
            raise ValueError(f"Value must be at least {self.min_length} chars, got {len(value)}")
        if self.regex and not self.regex.match(value):
            raise ValueError("Failed regex validation check")
        instance.__dict__[self.private_name] = value

class UserProfile:
    username = ValidatedString(min_length=3, regex_pattern=r"^[a-zA-Z0-9_]+$")

    def __init__(self, username: str):
        self.username = username

# Execution Sandbox Test
try:
    user = UserProfile("staff_dev")
    print(f"✅ User Created Successfully: {user.username}")
    
    print("Testing Validation Failure Case...")
    user.username = "ab" # Too short!
except Exception as e:
    print(f"❌ Validation Error Caught: {e}")
`;

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  initialLanguage = 'python',
  onAskAITutor
}) => {
  const [code, setCode] = useState<string>(initialCode || DEFAULT_PYTHON_SNIPPET);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  
  const [pyodide, setPyodide] = useState<any>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(false);

  useEffect(() => {
    // Only load for Python
    if (initialLanguage.toLowerCase() !== 'python') return;
    
    if (!(window as any).loadPyodide && !isPyodideLoading) {
      setIsPyodideLoading(true);
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
      script.onload = async () => {
        try {
          const py = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
          });
          setPyodide(py);
        } catch (e) {
          console.error('Failed to load Pyodide', e);
        } finally {
          setIsPyodideLoading(false);
        }
      };
      document.body.appendChild(script);
    }
  }, [initialLanguage, isPyodideLoading]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');

    if (initialLanguage.toLowerCase() !== 'python') {
      setOutput('[Learning Sandbox]\nCurrently, only Python is supported for in-browser execution.\n');
      setIsRunning(false);
      return;
    }

    if (!pyodide) {
      setOutput('Pyodide is still loading... Please wait.');
      setIsRunning(false);
      return;
    }

    try {
      // Capture stdout and stderr
      pyodide.setStdout({ batched: (msg: string) => setOutput(prev => prev + msg + '\\n') });
      pyodide.setStderr({ batched: (msg: string) => setOutput(prev => prev + msg + '\\n') });
      
      await pyodide.runPythonAsync(code);
    } catch (e: any) {
      setOutput(prev => prev + '\\nError:\\n' + e.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Interactive Code Sandbox & Output
            {isPyodideLoading && <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>

          {onAskAITutor && (
            <button
              onClick={() => onAskAITutor(`Please perform a staff-level code review for this backend code:\n\n\`\`\`python\n${code}\n\`\`\``, 'code_review')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-200 bg-purple-900/50 hover:bg-purple-900/80 rounded-lg border border-purple-700/50 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>AI Code Review</span>
            </button>
          )}

          <button
            onClick={handleRunCode}
            disabled={isRunning || (initialLanguage.toLowerCase() === 'python' && !pyodide)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor Area */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Editor (Python / FastAPI snippets)</span>
            <span>UTF-8</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 p-4 bg-slate-950 text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
            spellCheck="false"
          />
        </div>

        {/* Output Console Area */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Console Output</span>
            <button
              onClick={() => setOutput('')}
              className="text-slate-500 hover:text-slate-300 transition"
            >
              Clear Output
            </button>
          </div>
          <pre className="w-full h-96 p-4 font-mono text-xs text-amber-300 overflow-y-auto leading-relaxed whitespace-pre-wrap">
            {output || '// Click "Run Code" to execute securely in your browser using Pyodide (WASM).'}
          </pre>
        </div>
      </div>
    </div>
  );
};
