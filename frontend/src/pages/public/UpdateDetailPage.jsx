import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { updateService } from '../../services/updateService';
import { parseUpdateContent } from '../../utils/updateParser';
import { useSocket } from '../../context/SocketContext';
import UpdateNavigation from '../../components/changelog/UpdateNavigation';
import UpdateHeader from '../../components/changelog/UpdateHeader';
import QuickSummaryCard from '../../components/changelog/QuickSummaryCard';
import UpdateReasonSection from '../../components/changelog/UpdateReasonSection';
import WhatChangedSection from '../../components/changelog/WhatChangedSection';
import BeforeAfterCard from '../../components/changelog/BeforeAfterCard';
import TechnicalDetailsCard from '../../components/changelog/TechnicalDetailsCard';
import UserImpactCard from '../../components/changelog/UserImpactCard';
import ActionRequiredCard from '../../components/changelog/ActionRequiredCard';
import MarkdownRenderer from '../../components/changelog/MarkdownRenderer';
import FeedbackSection from '../../components/feedback/FeedbackSection';
import RelatedUpdates from '../../components/changelog/RelatedUpdates';
import EmptyState from '../../components/common/EmptyState';
import { DetailSkeleton } from '../../components/common/Skeleton';

export default function UpdateDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lastEvent } = useSocket();

  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateService.getUpdateById(slug);
      if (res.success && res.data) {
        setUpdate(res.data);
        document.title = `${res.data.title} | Product Updates`;
      }
    } catch (err) {
      console.error('Error loading update detail', err);
      setError(err.message || 'Product update not found or unpublished');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchDetail();
    }
  }, [slug]);

  // Real-time Socket Synchronization for active detail view
  useEffect(() => {
    if (
      lastEvent &&
      [
        'updateCreated',
        'updatePublished',
        'updateUpdated',
        'updateArchived',
        'updateDeleted'
      ].includes(lastEvent.type)
    ) {
      if (slug) {
        fetchDetail();
      }
    }
  }, [lastEvent, slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <DetailSkeleton />
      </div>
    );
  }

  if (error || !update) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          title="Update Not Found"
          description={error || "The product update you're looking for does not exist or has been archived."}
          actionLabel="Return to Product Updates"
          onAction={() => navigate('/user/updates')}
        />
      </div>
    );
  }

  // Parse update into structured documentation layout
  const parsed = parseUpdateContent(update);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      {/* 1. Navigation */}
      <UpdateNavigation />

      {/* 2. Header */}
      <UpdateHeader update={update} />

      {/* Cover Image if available */}
      {update.coverImage && (
        <div className="rounded-3xl overflow-hidden max-h-96 w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-md">
          <img
            src={update.coverImage}
            alt={update.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* 3. Quick Summary / At a glance */}
      <QuickSummaryCard highlights={parsed.quickHighlights} />

      {/* 4. Action Required Status Box */}
      <ActionRequiredCard actionRequired={parsed.actionRequired} />

      {/* 5. Why This Update? */}
      <UpdateReasonSection reason={parsed.whyThisUpdate} />

      {/* 6. What Changed? */}
      <WhatChangedSection changes={parsed.whatChanged} label={parsed.labels.changedTitle} />

      {/* 7. Before vs After Comparison */}
      <BeforeAfterCard beforeAfter={parsed.beforeAfter} />

      {/* 8. Developer Technical Details */}
      <TechnicalDetailsCard details={parsed.technicalDetails} />

      {/* 9. User Impact Explanation */}
      <UserImpactCard impact={parsed.userImpact} />

      {/* 10. Detailed Release Notes (Markdown Rendered) */}
      <MarkdownRenderer content={update.content} />

      {/* 11. Tags */}
      {update.tags && update.tags.length > 0 && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Tags & Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {update.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
              >
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>#{tag}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 12. Community Feedback Section */}
      <FeedbackSection updateId={update._id} />

      {/* 13. Related Updates */}
      <RelatedUpdates currentId={update._id} category={update.category} />
    </article>
  );
}
