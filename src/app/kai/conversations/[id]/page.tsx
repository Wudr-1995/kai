'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Conversation {
  id: string;
  title: string;
  rawText: string;
  summary: string | null;
  insights: string | null;
  tags: string | null;
  aiSource: string;
  notes: string | null;
  createdAt: string;
}

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchConversation = useCallback(async () => {
    try {
      const res = await fetch(`/api/conversations/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setConversation(data.conversation);
        setNotes(data.conversation.notes || '');
      } else if (res.status === 404) {
        setError('Conversation not found');
      } else {
        setError('Failed to load');
      }
    } catch {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  const saveNotes = async () => {
    if (!conversation) return;
    setSavingNotes(true);
    try {
      await fetch(`/api/conversations/${conversation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
    } finally {
      setSavingNotes(false);
    }
  };

  const deleteConversation = async () => {
    if (!confirm('Delete this conversation? This cannot be undone.')) return;
    try {
      await fetch(`/api/conversations/${params.id}`, { method: 'DELETE' });
      router.push('/kai/dashboard');
    } catch {
      alert('Failed to delete');
    }
  };

  const getInsights = () => {
    if (!conversation?.insights) return [];
    try { return JSON.parse(conversation.insights); } catch { return []; }
  };

  const getTags = () => {
    if (!conversation?.tags) return [];
    try { return JSON.parse(conversation.tags); } catch { return []; }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const sourceIcon = (s: string) => s === 'chatgpt' ? '🤖' : s === 'claude' ? '🧠' : '💬';

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error || !conversation) return (
    <div className="text-center py-20">
      <p className="text-slate-600">{error || 'Not found'}</p>
      <Link href="/kai/dashboard" className="text-indigo-600 mt-2 inline-block">Back to dashboard</Link>
    </div>
  );

  const insights = getInsights();
  const tags = getTags();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back */}
      <Link href="/kai/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to dashboard
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{sourceIcon(conversation.aiSource)}</span>
            <h1 className="text-2xl font-bold text-slate-900">{conversation.title}</h1>
          </div>
          <p className="text-slate-500">{formatDate(conversation.createdAt)}</p>
        </div>
        <button onClick={deleteConversation} className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg">
          Delete
        </button>
      </div>

      {/* Summary */}
      {conversation.summary && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-indigo-700 mb-2">Summary</h2>
          <p className="text-slate-700 leading-relaxed">{conversation.summary}</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Insights */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Key Insights
          </h2>
          {insights.length > 0 ? (
            <ul className="space-y-3">
              {insights.map((insight: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700">{insight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm">No insights extracted yet</p>
          )}
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Topics</h2>
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No tags yet</p>
          )}
        </div>
      </div>

      {/* Full Conversation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Full Conversation</h2>
        <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono bg-slate-50 p-4 rounded-xl overflow-x-auto">
          {conversation.rawText}
        </pre>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Your Notes</h2>
          <button
            onClick={saveNotes}
            disabled={savingNotes}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-700 disabled:opacity-50"
          >
            {savingNotes ? 'Saving...' : 'Save notes'}
          </button>
        </div>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add your personal notes, thoughts, or follow-ups..."
          rows={5}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-700"
        />
      </div>
    </div>
  );
}
