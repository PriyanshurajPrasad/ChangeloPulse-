import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import AvatarStack from './AvatarStack';
import FloatingAvatars from './FloatingAvatars';
import HeroProductPreview from './HeroProductPreview';

export default function HeroSection() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold tracking-wide uppercase shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Product updates, beautifully presented</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight max-w-5xl mx-auto leading-[1.12]">
          Keep your customers in the loop.{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500">
            Every product update deserves to be seen.
          </span>
        </h1>

        {/* Supporting Subtext */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Publish beautiful changelogs, announce new features, and boost adoption with an embeddable widget — all from one clean, powerful platform.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/register"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-xl shadow-indigo-500/25 hover:scale-[1.02] transition duration-200"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/changelog"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm transition duration-200"
          >
            <span>Explore Changelog</span>
          </Link>
        </div>

        {/* Avatar Stack Social Proof */}
        <div className="pt-4 flex justify-center">
          <AvatarStack countText="modern product teams" />
        </div>

        {/* Hero Interactive Visualization with Floating Avatars */}
        <div className="relative pt-8 sm:pt-14 max-w-5xl mx-auto">
          <FloatingAvatars />
          <HeroProductPreview />
        </div>
      </div>

      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-subtle" />
    </section>
  );
}
