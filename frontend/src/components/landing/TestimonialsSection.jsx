import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'Finally, our product updates feel like an integrated part of our product instead of another unread email newsletter.',
    name: 'Maya Chen',
    role: 'Product Designer @ Acme AI',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    quote: 'The embeddable "What\'s New" widget boosted our feature discovery by 40% within the first two weeks of launching.',
    name: 'Alex Rivera',
    role: 'Head of Growth @ Apex Labs',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    quote: 'ChangelogPulse saved our engineering team hours of manual work. We publish release notes in seconds directly from the dashboard.',
    name: 'Elena Rostova',
    role: 'VP Engineering @ Nova Cloud',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Loved by Product Creators
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          See what product managers and designers are saying.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition duration-300 relative"
          >
            <Quote className="w-8 h-8 text-indigo-500/20 absolute top-6 right-6" />

            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img
                src={item.img}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{item.name}</p>
                <p className="text-[11px] text-slate-400">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
