import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User as UserIcon,
  BookOpen,
  LogOut,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';
import WidgetPopover from '../widget/WidgetPopover';
import ChatbotWidget from '../chatbot/ChatbotWidget';

import BrandLogo from '../common/BrandLogo';

export default function UserLayout() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/user/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { label: 'Product Updates', path: '/user/updates', icon: BookOpen },
    { label: 'Changelog Feed', path: '/user/changelog', icon: ExternalLink },
    { label: 'My Feedback', path: '/user/feedback', icon: MessageSquare },
    { label: 'Profile', path: '/user/profile', icon: UserIcon }
  ];

  const isActive = (path) => {
    return location.pathname === path || (path !== '/user/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Premium Top Navigation Bar (Full Browser Width) */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <BrandLogo size="md" link="/user/dashboard" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      active
                        ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & User Menu */}
          <div className="flex items-center gap-3">
            <WidgetPopover />
            <ThemeToggle />

            {/* User Profile & Logout */}
            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/20"
                />
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 max-w-[120px] truncate">
                  {user?.name || 'User'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 px-4 py-3 bg-white dark:bg-slate-900 space-y-1.5 animate-fade-in">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Full-Width Content Container */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Floating Product Assistant Chatbot */}
      <ChatbotWidget />
    </div>
  );
}
