import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LayoutDashboard, User as UserIcon, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function UnauthorizedPage() {
  const { user, isAuthenticated, isAdmin } = useAuth();

  let targetPath = '/login';
  let targetLabel = 'Go to Login';
  let TargetIcon = LogIn;

  if (isAuthenticated) {
    if (isAdmin) {
      targetPath = '/admin';
      targetLabel = 'Go to Admin Dashboard';
      TargetIcon = LayoutDashboard;
    } else {
      targetPath = '/user';
      targetLabel = 'Go to User Panel';
      TargetIcon = UserIcon;
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 w-fit mx-auto">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">403</h1>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">Access Restricted</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            You do not have permission to access this area. Administrative routes and APIs are strictly restricted to Admin accounts.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={targetPath}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition"
          >
            <TargetIcon className="w-4 h-4" />
            <span>{targetLabel}</span>
          </Link>
          <Link
            to="/changelog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Public Changelog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
