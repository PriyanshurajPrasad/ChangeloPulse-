import React from 'react';

const FLOATING_PEOPLE = [
  {
    name: 'Alex Rivera',
    role: 'Product Lead',
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    pos: 'top-4 -left-6 sm:-left-12',
    anim: 'animate-float'
  },
  {
    name: 'Maya Chen',
    role: 'Lead Designer',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    pos: 'top-1/3 -right-6 sm:-right-12',
    anim: 'animate-float-slow'
  },
  {
    name: 'Liam Vance',
    role: 'Engineering Lead',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    pos: 'bottom-12 -left-4 sm:-left-10',
    anim: 'animate-float'
  },
  {
    name: 'Chloe Bennett',
    role: 'VP Growth',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    pos: 'bottom-6 -right-4 sm:-right-10',
    anim: 'animate-float-slow'
  }
];

export default function FloatingAvatars() {
  return (
    <>
      {FLOATING_PEOPLE.map((person, idx) => (
        <div
          key={idx}
          className={`absolute ${person.pos} ${person.anim} hidden md:block z-20 group`}
        >
          <div className="p-1 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center gap-2 pr-3">
            <img
              src={person.img}
              alt={person.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/30 group-hover:scale-105 transition"
            />
            <div className="text-left text-[11px] leading-tight">
              <p className="font-bold text-slate-900 dark:text-slate-100">{person.name}</p>
              <p className="text-slate-400 text-[10px]">{person.role}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
