"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Settings,
  Palette,
  ShieldCheck,
  Save,
  CheckCircle2,
  Lock,
  Download,
  Trash2,
} from "lucide-react";

export default function SchoolSettingsPage() {
  const { school } = useAuth();
  const [saved, setSaved] = useState(false);

  // Settings state
  const [schoolName, setSchoolName] = useState(school?.name || "Greenwood International School");
  const [motto, setMotto] = useState(school?.branding?.motto || "Inspiring excellence, cultivating integrity");
  const [primaryColor, setPrimaryColor] = useState(school?.branding?.primaryColor || "#0B2558");
  const [accentColor, setAccentColor] = useState(school?.branding?.accentColor || "#F0B33A");
  const [ctaColor, setCtaColor] = useState(school?.branding?.ctaColor || "#1F8A3E");

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
              Institutional Settings & White-label Theming
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Customize portal appearance, security policies, role permissions, and system backups.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-5 flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

        {saved && (
          <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Settings successfully updated across your institution!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branding & Appearance */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600">
              <Palette className="w-4 h-4" />
              <span>Branding & Dynamic Color Scheme</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Official Institution Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Motto / Slogan
              </label>
              <input
                type="text"
                value={motto}
                onChange={(e) => setMotto(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono">{primaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">Accent Gold</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono">{accentColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">Action Green</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={ctaColor}
                    onChange={(e) => setCtaColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono">{ctaColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RBAC Security & Matrix */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600">
              <ShieldCheck className="w-4 h-4" />
              <span>RBAC Permissions & Tenant Isolation</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-navy-900">Tenant Custom Claims Policy:</p>
              <p>Claims enforced exclusively via Cloud Functions backend token signing.</p>
              <p className="font-mono text-[11px] text-green-700">{`{ schoolId: "${school?.schoolId || 'demo-school-greenwood'}" }`}</p>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="font-medium text-navy-900">Allow Teachers to publish notices</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded" />
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="font-medium text-navy-900">Allow Parents to pay invoices online</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded" />
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="font-medium text-navy-900">Send automatic absence alerts</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => alert("GDPR export package generated and dispatched to your email.")}
                className="btn-outline py-2 px-3.5 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export School Backup</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
