import React from 'react';
import { Code, Terminal, Cpu } from 'lucide-react';

export default function TechnicalDetailsCard({ details }) {
  if (!details || details.length === 0) return null;

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Technical Details</h3>
          <p className="text-xs text-slate-400">Architecture, security, and developer specifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-200">{item.title}</h4>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {item.tag}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
