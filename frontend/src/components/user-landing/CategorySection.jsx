import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Wrench, Megaphone, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CategorySection() {
  const categories = [
    {
      key: 'feature',
      title: 'Features',
      desc: 'New tools, capabilities, and workflows introduced to the platform.',
      icon: Sparkles,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
    },
    {
      key: 'improvement',
      title: 'Improvements',
      desc: 'Performance enhancements, UX refinements, and speed optimizations.',
      icon: Zap,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60'
    },
    {
      key: 'bug-fix',
      title: 'Bug Fixes',
      desc: 'Resolved issues, security patches, and browser resilience fixes.',
      icon: Wrench,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60'
    },
    {
      key: 'announcement',
      title: 'Announcements',
      desc: 'Product news, policy updates, and infrastructure milestones.',
      icon: Megaphone,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60'
    },
    {
      key: 'release',
      title: 'Major Releases',
      desc: 'Version milestones, major product launches, and architecture upgrades.',
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Release Categories
        </h2>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Explore Updates by Category
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.key}
              to={`/user/changelog?category=${cat.key}`}
              className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Filter Feed</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
