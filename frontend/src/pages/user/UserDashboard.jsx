import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { updateService } from '../../services/updateService';

// User Landing Components
import HeroSection from '../../components/user-landing/HeroSection';
import QuickActions from '../../components/user-landing/QuickActions';
import LatestUpdatesFeed from '../../components/user-landing/LatestUpdatesFeed';
import UserFeedbackSummary from '../../components/user-landing/UserFeedbackSummary';
import BentoSection from '../../components/user-landing/BentoSection';
import ChangelogTimeline from '../../components/user-landing/ChangelogTimeline';
import CategorySection from '../../components/user-landing/CategorySection';
import FeatureSection from '../../components/user-landing/FeatureSection';
import ValueSection from '../../components/user-landing/ValueSection';
import UserCTASection from '../../components/user-landing/UserCTASection';
import UserFooter from '../../components/user-landing/UserFooter';

export default function UserDashboard() {
  const { user } = useAuth();
  const { lastEvent } = useSocket();

  const [publishedUpdates, setPublishedUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLandingData = async () => {
    try {
      setLoading(true);
      const res = await updateService.getPublicChangelog({ limit: 10 });
      if (res.success && res.data) {
        setPublishedUpdates(res.data);
      }
    } catch (err) {
      console.error('Failed to load landing page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLandingData();

    const handleUpdateEvent = () => fetchLandingData();
    window.addEventListener('changelog:update', handleUpdateEvent);
    window.addEventListener('focus', handleUpdateEvent);

    return () => {
      window.removeEventListener('changelog:update', handleUpdateEvent);
      window.removeEventListener('focus', handleUpdateEvent);
    };
  }, []);

  // Listen to WebSocket events to auto-refresh landing page data
  useEffect(() => {
    if (lastEvent) {
      fetchLandingData();
    }
  }, [lastEvent]);

  return (
    <div className="w-full space-y-16 animate-fade-in pb-16">
      {/* 1. Full-Width Edge-to-Edge Hero Section */}
      <HeroSection user={user} latestUpdate={publishedUpdates[0]} />

      {/* 2. Spacious Full-Width Release Stream */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <LatestUpdatesFeed updates={publishedUpdates} loading={loading} />
      </div>

      {/* 3. Spacious User Feedback Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <UserFeedbackSummary />
      </div>

      {/* 4. Full-Width Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <UserFooter />
      </div>
    </div>
  );
}
