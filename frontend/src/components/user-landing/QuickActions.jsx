import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, MessageSquare, Bot, ArrowRight } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

export default function QuickActions() {
  const { toggleChatbot } = useChatbot();

  const actions = [
    {
      title: 'Explore Updates',
      desc: 'Discover the latest product improvements, features, and release rollouts.',
      icon: Compass,
      color: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      bgLight: 'bg-indigo-50 dark:bg-indigo-950/50',
      link: '/user/changelog'
    },
    {
      title: 'View Changelog',
      desc: 'Browse the complete structured release history and version archives.',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgLight: 'bg-purple-50 dark:bg-purple-950/50',
      link: '/user/updates'
    },
    {
      title: 'My Feedback',
      desc: 'Review feedback you have shared with the team and read official replies.',
      icon: MessageSquare,
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/50',
      link: '/user/feedback'
    },
    {
      title: 'Product Assistant',
      desc: 'Ask questions about product features, releases, and how to navigate.',
      icon: Bot,
      color: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/50',
      onClick: toggleChatbot
    }
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Quick Navigation Actions
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act, index) => {
          const Icon = act.icon;
          const CardContent = (
            <div className="group h-full p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer">
              <div className="space-y-3">
                <div className={`w-11 h-11 rounded-2xl ${act.bgLight} ${act.textColor} flex items-center justify-center group-hover:scale-110 transition duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-1.5 text-xs font-bold ${act.textColor} pt-2 border-t border-slate-100 dark:border-slate-800/80`}>
                <span>Open Section</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          );

          return act.link ? (
            <Link key={index} to={act.link}>
              {CardContent}
            </Link>
          ) : (
            <div key={index} onClick={act.onClick}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
