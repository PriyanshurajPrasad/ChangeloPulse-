import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function UserCTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-indigo-500/20 text-center space-y-6">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-3 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STAY INFORMED</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Never Miss What Changed
        </h2>
        <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
          Explore the latest releases, understand what's new across versions, and share your feedback directly with the team.
        </p>
      </div>

      <div className="pt-2 relative z-10 flex justify-center">
        <Link
          to="/user/changelog"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-indigo-700 bg-white hover:bg-indigo-50 shadow-xl shadow-black/20 transition active:scale-[0.98]"
        >
          <span>Explore Latest Updates</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
