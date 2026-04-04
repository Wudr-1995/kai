'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900">Kai</span>
        </div>
        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
          Sign In
        </Link>
      </header>

      {/* Demo Mode Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-6 py-2 flex items-center gap-2 text-sm text-amber-800">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            <strong>Demo Mode:</strong> Running with mock AI data. Add your <code className="px-1 py-0.5 bg-amber-100 rounded text-xs">OPENAI_API_KEY</code> to enable real AI analysis.
          </span>
          <Link href="https://platform.openai.com/api-keys" target="_blank" className="ml-auto underline hover:no-underline">
            Get API Key →
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          AI Memory for Knowledge Workers
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
          Your AI Conversations<br />
          <span className="text-indigo-600">Become Your Second Brain</span>
        </h1>

        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Every ChatGPT discussion, every Claude breakthrough, every AI insight — 
          automatically captured, organized, and searchable. So nothing valuable gets lost.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Get Early Access
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-xl font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re on the list! We&apos;ll be in touch.
          </div>
        )}

        <p className="text-sm text-slate-500 mt-4">Free during beta. No credit card required.</p>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-slate-200 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">
            Never lose an AI insight again
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">One-Click Import</h3>
              <p className="text-slate-600 leading-relaxed">
                Paste any AI conversation. We automatically extract key insights, topics, and code snippets.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Instant Search</h3>
              <p className="text-slate-600 leading-relaxed">
                Search across all your AI conversations. Find that code snippet you wrote 3 months ago.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">AI-Powered Insights</h3>
              <p className="text-slate-600 leading-relaxed">
                Every conversation is automatically analyzed. See key takeaways and related topics at a glance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to build your AI memory?
          </h2>
          <p className="text-slate-600 mb-8">
            Join knowledge workers who never lose valuable AI insights again.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Start for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <p>© 2026 Kai. Built with ❤️ for knowledge workers.</p>
      </footer>
    </div>
  );
}
