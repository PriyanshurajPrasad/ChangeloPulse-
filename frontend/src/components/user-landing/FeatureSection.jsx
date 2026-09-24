import React from 'react';
import { Zap, BookOpen, MessageSquare, Bot, Layers, UserCheck } from 'lucide-react';

export default function FeatureSection() {
  const features = [
    {
      num: '01',
      title: 'Real-Time Product Updates',
      desc: 'Stay informed instantly about new features, performance improvements, bug fixes, and critical announcements.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
    },
    {
      num: '02',
      title: 'Transparent Changelog',
      desc: 'Explore the complete evolution of the product through a structured, searchable, and taggable release history.',
      icon: BookOpen,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50'
    },
    {
      num: '03',
      title: 'Direct Community Feedback',
      desc: 'Share your thoughts about individual updates, rate releases, and receive official responses directly from the team.',
      icon: MessageSquare,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
    },
    {
      num: '04',
      title: 'Smart Product Assistant',
      desc: 'Get quick answers about product features, release notes, and navigation via the embedded AI assistant.',
      icon: Bot,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50'
    },
    {
      num: '05',
      title: 'Release Intelligence',
      desc: 'Understand what changed across versions with before/after breakdowns, technical highlights, and impact analysis.',
      icon: Layers,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50'
    },
    {
      num: '06',
      title: 'Personalized Workspace',
      desc: 'Keep track of submitted feedback, team replies, and favorite product updates that matter to your workflow.',
      icon: UserCheck,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Core Platform Capabilities
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Everything You Need to Stay Informed
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Designed for developers, product managers, and users who demand clarity across every software release.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-800 transition duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl ${feat.color} flex items-center justify-center font-bold`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-extrabold text-slate-300 dark:text-slate-700">
                  {feat.num}
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
