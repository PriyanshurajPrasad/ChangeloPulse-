import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LogIn, UserPlus, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/common/ThemeToggle';
import BrandLogo from '../../components/common/BrandLogo';

export default function PortalGateway() {
  const { isAuthenticated, user, loading } = useAuth();

  // If already logged in, automatically redirect to appropriate portal dashboard
  if (!loading && isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/user/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <header className="h-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 lg:px-12 flex items-center justify-between">
        <BrandLogo size="md" link="/" />

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Experience */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 max-w-3xl mx-auto w-full text-center space-y-10">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <Shield className="w-3.5 h-3.5" />
            <span>Product Updates Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            Welcome to <span className="text-indigo-600 dark:text-indigo-400">ChangelogPulse</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Sign in or create an account to access product updates.
          </p>
        </div>

        {/* User Authentication Actions Card */}
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
          <Link
            to="/user/login"
            className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition flex items-center justify-center gap-2.5"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </Link>

          <Link
            to="/user/register"
            className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.99] transition flex items-center justify-center gap-2.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-800/60">
        <p>© {new Date().getFullYear()} ChangelogPulse System. All rights reserved.</p>
      </footer>
    </div>
  );
}
