'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Conversation {
  id: string;
  title: string;
  summary: string | null;
  insights: string | null;
  tags: string | null;
  aiSource: string;
  notes: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({ total: 0, insights: 0, tags: new Set<string>() });

  const fetchConversations = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('q', search);

      const res = await fetch(`/api/conversations?${params}`);
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations);

        // Calculate stats
        const allInsights: Set<string> = new Set();
        const allTags: Set<string> = new Set();
        data.conversations.forEach((c: Conversation) => {
          if (c.insights) {
            try {
              JSON.parse(c.insights).forEach((i: string) => allInsights.add(i));
            } catch {}
          }
          if (c.tags) {
            try {
              JSON.parse(c.tags).forEach((t: string) => allTags.add(t));
            } catch {}
          }
        });
        setStats({ total: data.conversations.length, insights: allInsights.size, tags: allTags });
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const sourceIcon = (source: string) => {
    if (source === 'chatgpt') return '🤖';
    if (source === 'claude') return '🧠';
    return '💬';
  };

  const getInsights = (insights: string | null) => {
    if (!insights) return [];
    try { return JSON.parse(insights); } catch { return []; }
  };

  const getTags = (tags: string | null) => {
    if (!tags) return [];
    try { return JSON.parse(tags); } catch { return []; }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your AI Memory</h1>
          <p className="text-slate-500 mt-1">All your AI conversations, organized</p>
        </div>
        <Link
          href="/kai/import"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Import Conversation
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="text-3xl font-bold text-indigo-600">{stats.total}</div>
          <div className="text-sm text-slate-500 mt-1">Conversations</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="text-3xl font-bold text-indigo-600">{stats.insights}</div>
          <div className="text-sm text-slate-500 mt-1">Key Insights Extracted</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="text-3xl font-bold text-indigo-600">{stats.tags.size}</div>
          <div className="text-sm text-slate-500 mt-1">Topics Covered</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search conversations, insights, topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Conversations */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No conversations yet</h3>
          <p className="text-slate-500 mb-6">Import your first AI conversation to get started</p>
          <Link
            href="/kai/import"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Import your first conversation
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map(conv => {
            const insights = getInsights(conv.insights);
            const tags = getTags(conv.tags);

            return (
              <Link
                key={conv.id}
                href={`/kai/conversations/${conv.id}`}
                className="block bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{sourceIcon(conv.aiSource)}</span>
                      <h3 className="font-semibold text-slate-900 truncate">{conv.title}</h3>
                    </div>

                    {conv.summary && (
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{conv.summary}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      {(tags as string[]).slice(0, 4).map((tag: string, i: number) => (
                        <span key={i} className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                      {tags.length > 4 && (
                        <span className="text-xs text-slate-500">+{tags.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-sm text-slate-500">{formatDate(conv.createdAt)}</div>
                    {insights.length > 0 && (
                      <div className="text-xs text-indigo-600 mt-1">{insights.length} insights</div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
