import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';

export default function UserFooter() {
  return (
    <footer className="pt-8 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <BrandLogo size="sm" link="/user/dashboard" />

        <div className="flex items-center gap-6 font-semibold">
          <Link to="/user/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Dashboard
          </Link>
          <Link to="/user/updates" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Product Updates
          </Link>
          <Link to="/user/changelog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Changelog Feed
          </Link>
          <Link to="/user/feedback" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            My Feedback
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400">
        <p>© 2026 ChangelogPulse. All rights reserved.</p>
        <p>Product Updates & Community Feedback Platform</p>
      </div>
    </footer>
  );
}
