import React from 'react';
import { Star } from 'lucide-react';

const AVATARS = [
  {
    name: 'Sarah Jenkins',
    role: 'Head of Product',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'David Kim',
    role: 'Lead Architect',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Elena Rostova',
    role: 'Product Designer',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Marcus Vance',
    role: 'CTO @ Apex',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Aria Chen',
    role: 'Founder @ Nova',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
  }
];

export default function AvatarStack({ countText = '+2,000 product teams' }) {
  return (
    <div className="inline-flex items-center gap-4 p-2 pl-3 pr-4 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      {/* Overlapping Avatars */}
      <div className="flex -space-x-2.5 overflow-hidden">
        {AVATARS.map((person, idx) => (
          <div key={idx} className="relative group">
            <img
              src={person.img}
              alt={person.name}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover group-hover:scale-110 group-hover:z-10 transition-transform duration-200"
            />
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
              <div className="bg-slate-900 text-white text-[10px] font-semibold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap">
                <p className="font-bold">{person.name}</p>
                <p className="text-indigo-300 text-[9px]">{person.role}</p>
              </div>
              <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Social Proof Text */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-amber-400" />
          ))}
        </div>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Trusted by <span className="font-bold text-slate-900 dark:text-slate-100">{countText}</span>
        </p>
      </div>
    </div>
  );
}
