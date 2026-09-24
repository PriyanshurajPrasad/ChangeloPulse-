import React, { useState } from 'react';
import { Sparkles, Bell, LayoutDashboard, BarChart2, Settings, ArrowRight } from 'lucide-react';
import UpdateWidget from '../widget/UpdateWidget';
import WidgetPopover from '../widget/WidgetPopover';

export default function InteractiveWidgetDemo() {
  return (
    <section id="widget" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Bell className="w-3.5 h-3.5" />
          <span>Interactive Product Demo</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Meet your new "What's New" widget
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          Click the notification icon in the mockup top bar below to test the live embedded popover!
        </p>
      </div>

      {/* Interactive Mockup Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl space-y-6 max-w-4xl mx-auto">
        {/* Fake Application Header Bar */}
        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-white text-sm">Acme Cloud Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-indigo-400 font-semibold">
              ← Click Bell Icon to Open Widget
            </span>
            {/* Interactive Widget Popover */}
            <WidgetPopover />
          </div>
        </div>

        {/* Dashboard Content Mockup Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <LayoutDashboard className="w-5 h-5 text-indigo-400" />
            <h5 className="font-bold text-sm text-slate-200">Active Workspaces</h5>
            <p className="text-2xl font-extrabold text-white">128</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            <h5 className="font-bold text-sm text-slate-200">Feature Adoption</h5>
            <p className="text-2xl font-extrabold text-white">+84%</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <Settings className="w-5 h-5 text-purple-400" />
            <h5 className="font-bold text-sm text-slate-200">Widget Health</h5>
            <p className="text-2xl font-extrabold text-emerald-400">100% Online</p>
          </div>
        </div>
      </div>
    </section>
  );
}
