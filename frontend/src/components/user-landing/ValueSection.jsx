import React from 'react';
import { ShieldCheck, Eye, RefreshCw, MessageSquare } from 'lucide-react';

export default function ValueSection() {
  const values = [
    {
      title: 'Complete Visibility',
      desc: 'No more guessing what changed in new software builds. Every release includes detailed notes and category breakdown.',
      icon: Eye
    },
    {
      title: 'Direct Feedback Loop',
      desc: 'Voice your opinion directly on release notes and see official team responses in your personal workspace.',
      icon: MessageSquare
    },
    {
      title: 'Real-Time Synchronization',
      desc: 'Whenever an administrator publishes a new update, your workspace updates automatically via WebSockets.',
      icon: RefreshCw
    },
    {
      title: 'Developer Security & RBAC',
      desc: 'All user data and interactions are protected by enterprise JWT authentication and role-based access control.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 border border-slate-800">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Product Core Values
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Built for Product Transparency
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Connecting product teams and software users through structured, real-time communication.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-white">{v.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
