"use client";

import React, { useState } from "react";
import { TopBar } from "@/features/marketing/components/TopBar";
import { Navbar } from "@/features/marketing/components/Navbar";
import { HeroSlider } from "@/features/marketing/components/HeroSlider";
import { FeatureCards } from "@/features/marketing/components/FeatureCards";
import { PrincipalMessage } from "@/features/marketing/components/PrincipalMessage";
import { EventsAndNews } from "@/features/marketing/components/EventsAndNews";
import { MeetTeachers } from "@/features/marketing/components/MeetTeachers";
import { LatestNews } from "@/features/marketing/components/LatestNews";
import { Testimonials } from "@/features/marketing/components/Testimonials";
import { AwardsAndStats } from "@/features/marketing/components/AwardsAndStats";
import { AdmissionsCtaBand } from "@/features/marketing/components/AdmissionsCtaBand";
import { Footer } from "@/features/marketing/components/Footer";
import { QuickInquiryModal } from "@/features/marketing/components/QuickInquiryModal";

export default function MarketingHomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenApplyModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col antialiased selection:bg-gold-500/30 selection:text-navy-900">
      {/* 1. Top Bar & Sticky Navbar */}
      <TopBar />
      <Navbar onApplyClick={handleOpenApplyModal} />

      <main className="flex-1">
        {/* 2. Hero Slider with Overlay & Arrows */}
        <HeroSlider onApplyClick={handleOpenApplyModal} />

        {/* 3. Four Overlapping Feature Cards with Green Bottom Border */}
        <FeatureCards />

        {/* 4. Principal Message with 25+ Years Badge & Quote */}
        <PrincipalMessage />

        {/* 5. Events & News with Category Tabs & Highlighted Dark Card */}
        <EventsAndNews />

        {/* 6. Meet Our Teachers Dark Carousel */}
        <MeetTeachers />

        {/* 7. Latest News 3-Card Grid */}
        <LatestNews />

        {/* 8. Testimonials Section with Star Ratings */}
        <Testimonials />

        {/* 9. Awards and Stats Animated Counters */}
        <AwardsAndStats />

        {/* 10. Admissions CTA Band + Have any questions Form */}
        <AdmissionsCtaBand onApplyClick={handleOpenApplyModal} />
      </main>

      {/* 11. Footer with Quick Links & Newsletter */}
      <Footer />

      {/* Interactive Admission Application Modal */}
      <QuickInquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
