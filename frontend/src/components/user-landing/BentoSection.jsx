import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Bot, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

export default function BentoSection({ latestUpdate }) {
  const { toggleChatbot } = useChatbot();

  return (
    <section className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Integrated Platform Experience
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Everything About Product Evolution, In One Place
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
        {/* Large Bento Card: Release Spotlight */}
        <div className="lg:col-span-8 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6 border border-slate-800">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-indigo-500/30 border border-indigo-400/30 text-indigo-200">
                Latest Release Spotlight
              </span>
              {latestUpdate?.version && (
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-white/10 text-white border border-white/20">
                  {latestUpdate.version}
                </span>
              )}
            </div>

            <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
              {latestUpdate?.title || 'Continuous Product Improvement'}
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {latestUpdate?.description || 'Stay up to date with new features, enhancements, and security patches published directly by the product engineering team.'}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Published {latestUpdate?.publishedAt ? new Date(latestUpdate.publishedAt).toLocaleDateString() : 'Recently'}
            </span>
            <Link
              to="/user/changelog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 transition"
            >
              <span>Explore Changelog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Medium Bento Card: Feedback Loop */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              Direct Feedback Loop
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Rate updates, submit detailed comments, and receive direct answers from product administrators.
            </p>
          </div>

          <Link
            to="/user/feedback"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
          >
            <span>My Submitted Feedback</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Medium Bento Card: Product Assistant */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              Interactive Product Assistant
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Need help understanding a release or navigating features? Ask the embedded AI assistant anytime.
            </p>
          </div>

          <button
            onClick={toggleChatbot}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800 text-left"
          >
            <span>Open Assistant Panel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Large Bento Card 2: Transparent Security & Version Tracking */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Release Trail</span>
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Structured Version History & Categories
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Filter release notes by category: Feature, Improvement, Bug Fix, Announcement, or Release.
              </p>
            </div>

            <Link
              to="/user/updates"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition shrink-0"
            >
              <span>Browse Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
