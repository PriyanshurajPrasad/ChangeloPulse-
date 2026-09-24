import React from 'react';
import { Layers, Zap, Bell, Search, ShieldCheck, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';

export default function FeaturesBentoGrid() {
  return (
    <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Everything you need to ship updates with confidence
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          Designed from the ground up for SaaS teams, product managers, and developers.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bento 1: Large Featured Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition duration-300">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              Beautiful Public Changelogs
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
              Showcase your product roadmap and historical release log with automated versioning, categories, tags, and rich Markdown content support.
            </p>
          </div>

          {/* Visual Sub-card Preview */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CategoryBadge category="feature" size="xs" />
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100">Dark Mode Released</span>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded">
              v2.1.0
            </span>
          </div>
        </div>

        {/* Bento 2: Instant Updates */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition duration-300">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Instant Publishing
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Transition updates seamlessly between Draft, Published, and Archived lifecycle states.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-xs font-semibold text-purple-900 dark:text-purple-200">
            <span>Status: Published</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        {/* Bento 3: Embeddable Widget */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition duration-300">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Embeddable Widget
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              A lightweight "What's New" popover notification bell widget for any website or app.
            </p>
          </div>
        </div>

        {/* Bento 4: Search & Filters */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition duration-300">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Search & Filters
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Index-backed MongoDB text search across titles, descriptions, and category tags.
            </p>
          </div>
        </div>

        {/* Bento 5: Admin Control */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition duration-300">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Admin Access Control
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Role-Based Access Control (RBAC) guaranteeing safe administrative permissions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
