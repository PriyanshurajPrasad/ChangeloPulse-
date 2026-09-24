import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

export default function LandingFooter() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <BrandLogo size="md" link="/" />
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The modern product updates & changelog platform. Announce features, boost adoption, and engage customers seamlessly.
            </p>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Product
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/changelog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Public Feed
                </Link>
              </li>
              <li>
                <a href="#widget" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Widget Popover
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Capabilities
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Resources
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/changelog?category=feature" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/changelog?category=bug-fix" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Bug Fixes
                </Link>
              </li>
              <li>
                <Link to="/changelog?category=release" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Account & Legal
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/user/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  User Sign In
                </Link>
              </li>
              <li>
                <Link to="/user/register" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ChangelogPulse SaaS Platform. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for modern product teams</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
