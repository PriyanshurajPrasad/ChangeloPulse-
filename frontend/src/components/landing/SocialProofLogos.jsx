import React from 'react';
import { Hexagon, Triangle, CircleDot, Shield, Command } from 'lucide-react';

const LOGOS = [
  { name: 'NOVA', icon: Hexagon },
  { name: 'ACME CORP', icon: Triangle },
  { name: 'LUMEN AI', icon: CircleDot },
  { name: 'ORBIT LABS', icon: Shield },
  { name: 'VERTEX', icon: Command }
];

export default function SocialProofLogos() {
  return (
    <section className="py-10 border-y border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Built for teams shipping fast at scale
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-75">
          {LOGOS.map((brand, idx) => {
            const Icon = brand.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-default font-extrabold tracking-wider text-sm sm:text-base"
              >
                <Icon className="w-5 h-5 text-indigo-500/80" />
                <span>{brand.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
