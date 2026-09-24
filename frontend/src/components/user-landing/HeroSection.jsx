import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Zap, MessageSquare } from 'lucide-react';
import { BrandLogoIcon } from '../common/BrandLogo';

export default function HeroSection({ user, latestUpdate }) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-indigo-50/70 via-slate-50 to-white dark:bg-indigo-dark text-slate-900 dark:text-slate-100 py-20 sm:py-28 lg:py-36 px-6 sm:px-12 border-b border-slate-200/80 dark:border-indigo-950/60 transition-colors duration-300 text-center">
      {/* Background Arch Ambient Glow matching Indigo Project Theme */}
      <div className="absolute inset-0 glow-indigo-arch-light dark:glow-indigo-arch pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Arch Outline overlay in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[420px] border border-indigo-400/20 dark:border-indigo-500/15 rounded-t-full pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        {/* Official Logo Emblem in Hero Section */}
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-3 bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-purple-800/40 rounded-full blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition duration-300">
            <img
              src="/assets/changelogpulse-icon.svg"
              alt="ChangelogPulse Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/changelogpulse-logo.svg';
              }}
            />
          </div>
        </div>

        {/* Professional Project Heading in Serif Display (Project Theme) */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-normal text-slate-900 dark:text-slate-100 tracking-tight leading-[1.08] text-center">
            Building The System That Powers{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 dark:from-indigo-400 dark:via-purple-300 dark:to-violet-400 bg-clip-text text-transparent">
              Product Intelligence.
            </span>
          </h1>
          
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300/90 text-center font-normal leading-relaxed max-w-2xl mx-auto pt-2">
            Product communication still depends on scattered release notes, lost feedback, and manual announcements. We build real-time release intelligence that unifies rollouts, changelogs, and user feedback – so teams spend time building, not mechanics.
          </p>
        </div>

        {/* Centered Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/user/changelog"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/25 hover:shadow-purple-500/35 transition active:scale-[0.98]"
          >
            <span>Explore Latest Releases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/user/updates"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800/90 border border-slate-200 dark:border-indigo-900/60 shadow-sm transition active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>View Changelog Feed</span>
          </Link>
        </div>

        {/* Minimal Bottom Status Line */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-indigo-950/60 flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Real-Time Sync</span>
          </div>
          <span className="text-indigo-400 dark:text-indigo-900">•</span>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Direct Feedback Loop</span>
          </div>
          {latestUpdate && (
            <>
              <span className="text-indigo-400 dark:text-indigo-900">•</span>
              <span className="text-purple-600 dark:text-purple-400/90 font-mono">Latest: {latestUpdate.version || 'v2.3.3'}</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

