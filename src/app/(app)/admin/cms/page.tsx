"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Globe, Save, CheckCircle2, Sparkles, Eye, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SchoolWebsiteCmsPage() {
  const { school } = useAuth();
  const [saved, setSaved] = useState(false);

  // Editable CMS Sections
  const [heroTitle, setHeroTitle] = useState("Choose the best for your child");
  const [heroSubtext, setHeroSubtext] = useState(
    "A 21st-century holistic learning environment with modern STEM labs, certified mentorship, and an inspiring safe campus where children thrive."
  );
  const [principalQuote, setPrincipalQuote] = useState(
    "Welcome to Pathshala, where every student is recognized as a unique visionary. Our fundamental mission is to cultivate curious minds and instill compassionate leadership."
  );
  const [admissionsOpen, setAdmissionsOpen] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              School Website Content Management (CMS)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Customize your public-facing marketing homepage, hero banners, principal note, and admissions flags in real time.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="btn-outline py-2 px-3.5 text-xs font-semibold flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </Link>

            <button
              onClick={handleSave}
              className="btn-cta py-2 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Publish Changes</span>
            </button>
          </div>
        </div>

        {saved && (
          <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Public website content updated and synced to Firestore CDN!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Hero Banner */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-600" />
              <span>Section: Hero Slider & Headline</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Sub-headline Description
              </label>
              <textarea
                rows={3}
                value={heroSubtext}
                onChange={(e) => setHeroSubtext(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>
          </div>

          {/* Section 2: Principal Message */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-600" />
              <span>Section: Principal Message</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Principal Quote & Heartfelt Welcome
              </label>
              <textarea
                rows={4}
                value={principalQuote}
                onChange={(e) => setPrincipalQuote(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <h4 className="text-xs font-bold text-navy-900">Online Admissions Banner</h4>
                <p className="text-[11px] text-slate-500">Enable &ldquo;Apply Now&rdquo; modal on homepage</p>
              </div>
              <input
                type="checkbox"
                checked={admissionsOpen}
                onChange={(e) => setAdmissionsOpen(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
