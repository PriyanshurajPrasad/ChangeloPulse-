import React from 'react';

const PEOPLE = [
  { name: 'Sarah J.', role: 'PM @ Stripe', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
  { name: 'David K.', role: 'CTO @ Vercel', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { name: 'Elena R.', role: 'Design @ Notion', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { name: 'Marcus V.', role: 'Founding Eng', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  { name: 'Aria C.', role: 'Head of Growth', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
  { name: 'Lucas H.', role: 'Product Lead', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' }
];

export default function AvatarMarquee() {
  return (
    <section className="py-8 bg-slate-100/50 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Built for designers, developers, and product teams
        </p>
      </div>

      <div className="flex overflow-hidden group select-none">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] gap-6 whitespace-nowrap">
          {[...PEOPLE, ...PEOPLE, ...PEOPLE].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div className="text-left text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100">{item.name}</span>
                <span className="text-slate-400 ml-1.5 text-[11px]">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
