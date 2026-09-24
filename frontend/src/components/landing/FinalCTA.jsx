import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-950 rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl overflow-hidden space-y-6">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Publishing Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to make every product update count?
          </h2>

          <p className="text-indigo-200 text-base sm:text-lg max-w-xl mx-auto font-normal">
            Give your customers a better, more engaging way to discover what's new in your product.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold text-indigo-950 bg-white hover:bg-slate-100 transition shadow-xl"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 text-indigo-950" />
            </Link>

            <Link
              to="/changelog"
              className="px-7 py-3.5 rounded-2xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition"
            >
              Explore Changelog Feed
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
