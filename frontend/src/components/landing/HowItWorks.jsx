import React from 'react';
import { PenTool, Send, Share2, Sparkles } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Create & Draft',
    desc: 'Write release notes, select category tags, upload cover imagery, and assign version numbers.',
    icon: PenTool
  },
  {
    num: '02',
    title: 'Publish Instantly',
    desc: 'Transition updates from Draft to Published state with automatic timestamps.',
    icon: Send
  },
  {
    num: '03',
    title: 'Share & Embed',
    desc: 'Customers discover updates via your public changelog feed and embeddable notification widget.',
    icon: Share2
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple Workflow</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          How ChangelogPulse Works
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          Ship updates in 3 fast, automated steps.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-4 hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl font-extrabold text-indigo-600/30 dark:text-indigo-400/30 font-mono">
                  {step.num}
                </span>
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{step.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
