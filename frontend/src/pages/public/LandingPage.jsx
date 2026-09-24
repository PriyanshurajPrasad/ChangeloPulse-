import React from 'react';
import LandingNavbar from '../../components/landing/LandingNavbar';
import HeroSection from '../../components/landing/HeroSection';
import SocialProofLogos from '../../components/landing/SocialProofLogos';
import FeaturesBentoGrid from '../../components/landing/FeaturesBentoGrid';
import InteractiveWidgetDemo from '../../components/landing/InteractiveWidgetDemo';
import HowItWorks from '../../components/landing/HowItWorks';
import BeforeAfterComparison from '../../components/landing/BeforeAfterComparison';
import ChangelogPreviewSection from '../../components/landing/ChangelogPreviewSection';
import TimelineSection from '../../components/landing/TimelineSection';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import AvatarMarquee from '../../components/landing/AvatarMarquee';
import FinalCTA from '../../components/landing/FinalCTA';
import LandingFooter from '../../components/landing/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Navbar with Announcement Ticker */}
      <LandingNavbar />

      {/* Hero Section with Avatar Stack & Floating Cards */}
      <HeroSection />

      {/* Brand Logos Trust */}
      <SocialProofLogos />

      {/* Bento Grid Features */}
      <FeaturesBentoGrid />

      {/* Interactive What's New Widget Demo */}
      <InteractiveWidgetDemo />

      {/* 3-Step Workflow */}
      <HowItWorks />

      {/* Before / After Transformation */}
      <BeforeAfterComparison />

      {/* Live Changelog Feed Preview */}
      <ChangelogPreviewSection />

      {/* Release Timeline */}
      <TimelineSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Horizontal Avatar Marquee Ticker */}
      <AvatarMarquee />

      {/* Final Conversion CTA */}
      <FinalCTA />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
