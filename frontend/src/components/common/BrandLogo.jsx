import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Official ChangelogPulse Brand Logo Icon (Gear + Electric Purple Pulse Emblem matching Image 2)
 */
export function BrandLogoIcon({ className = 'w-9 h-9' }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src="/assets/changelogpulse-icon.svg"
        alt="ChangelogPulse Logo"
        className="w-full h-full object-contain transition transform group-hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/assets/changelogpulse-logo.svg';
        }}
      />
    </div>
  );
}

/**
 * Reusable Official ChangelogPulse Brand Logo Component
 *
 * Props:
 * - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 * - showName: boolean (default: true)
 * - nameSuffix: string | ReactNode (optional)
 * - link: boolean | string (default: true -> routes role-appropriately)
 * - className: string
 * - imgClassName: string
 */
export default function BrandLogo({
  size = 'md',
  showName = true,
  nameSuffix = null,
  link = true,
  className = '',
  imgClassName = ''
}) {
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated;
  const user = auth?.user;

  // Sizing definitions
  const sizeMap = {
    xs: { img: 'w-6 h-6', text: 'text-xs' },
    sm: { img: 'w-8 h-8', text: 'text-sm' },
    md: { img: 'w-9 h-9', text: 'text-base' },
    lg: { img: 'w-11 h-11', text: 'text-xl' },
    xl: { img: 'w-14 h-14', text: 'text-2xl' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Determine target link path based on auth state if link === true
  let targetPath = '/';
  if (typeof link === 'string') {
    targetPath = link;
  } else if (link === true) {
    if (isAuthenticated && user?.role === 'admin') {
      targetPath = '/admin/dashboard';
    } else if (isAuthenticated) {
      targetPath = '/user/dashboard';
    } else {
      targetPath = '/';
    }
  }

  const logoContent = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <BrandLogoIcon className={`${currentSize.img} ${imgClassName}`} />
      {showName && (
        <span className={`font-extrabold tracking-tight text-slate-900 dark:text-slate-100 ${currentSize.text}`}>
          Changelog<span className="text-purple-600 dark:text-purple-400">Pulse</span>
          {nameSuffix && <span className="ml-1 text-slate-500 dark:text-slate-400 font-normal">{nameSuffix}</span>}
        </span>
      )}
    </div>
  );

  if (link) {
    return (
      <Link to={targetPath} className="inline-flex items-center">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
