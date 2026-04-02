'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ImportPage() {
  const router = useRouter();
  const [rawText, setRawText] = useState('');
  const [aiSource, setAiSource] = useState('chatgpt');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, aiSource, title }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/kai/conversations/${data.conversation.id}`);
      } else {
        setError(data.error || 'Failed to import conversation');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const placeholder = `[You]
Hi, can you explain how React useEffect works?

[ChatGPT]
Sure! useEffect is a Hook that lets you perform side effects in function components...

[You]
What about cleanup functions?

[ChatGPT]
Great question! Cleanup functions run before the component unmounts...`;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Import Conversation</h1>
        <p className="text-slate-500 mt-1">Paste an AI conversation and we&apos;ll extract the key insights</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">AI Source</label>
          <div className="flex gap-3">
            {[
              { value: 'chatgpt', label: 'ChatGPT', icon: '🤖' },
              { value: 'claude', label: 'Claude', icon: '🧠' },
              { value: 'other', label: 'Other AI', icon: '💬' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAiSource(opt.value)}
                className={`flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                  aiSource === opt.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="mr-2">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Title <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., React useEffect Deep Dive"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Conversation Text</label>
          <textarea
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            placeholder={placeholder}
            rows={14}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm text-slate-700"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            AI will extract key insights, topics, and generate a summary
          </p>
          <button
            type="submit"
            disabled={loading || !rawText.trim()}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-lg shadow-indigo-200"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Analyzing...
              </span>
            ) : (
              'Import & Analyze'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
