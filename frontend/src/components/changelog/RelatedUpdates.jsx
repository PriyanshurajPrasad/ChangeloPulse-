import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { updateService } from '../../services/updateService';
import CategoryBadge from '../common/CategoryBadge';

export default function RelatedUpdates({ currentId, category }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      try {
        const res = await updateService.getPublicChangelog({ limit: 4, category });
        if (res.success && res.data) {
          // Filter out current update
          const filtered = res.data.filter((u) => u._id !== currentId && u.slug !== currentId).slice(0, 3);
          setRelated(filtered);
        }
      } catch (err) {
        console.error('Failed to fetch related updates', err);
      } finally {
        setLoading(false);
      }
    };
    if (category) {
      fetchRelated();
    }
  }, [currentId, category]);

  if (loading || related.length === 0) return null;

  return (
    <section className="pt-10 border-t border-slate-200/80 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Related Product Updates
        </h3>
        <Link
          to="/user/changelog"
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((item) => (
          <Link
            key={item._id}
            to={`/user/changelog/${item.slug}`}
            className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-lg transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <CategoryBadge category={item.category} size="xs" />
                <span className="text-[11px] font-mono font-bold text-slate-400">{item.version}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-2">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Read Update</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
