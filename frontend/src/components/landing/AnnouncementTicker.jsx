import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AnnouncementTicker() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white text-xs py-2 px-4 text-center font-medium shadow-inner relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md font-bold text-[10px] tracking-wider uppercase text-indigo-200">
          <Sparkles className="w-3 h-3 text-indigo-300" />
          New Release
        </span>
        <span className="hidden sm:inline">
          🚀 Introducing our embeddable Product Updates Widget for Web & Web Apps!
        </span>
        <span className="sm:hidden">
          🚀 New: Embeddable Product Update Widget!
        </span>
        <Link
          to="/changelog"
          className="inline-flex items-center gap-1 font-bold text-indigo-300 hover:text-white underline underline-offset-2 transition"
        >
          <span>Explore Updates</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
