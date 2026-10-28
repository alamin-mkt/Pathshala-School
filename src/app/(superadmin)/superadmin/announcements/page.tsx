"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MessageSquare, Plus, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function SuperAdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    {
      id: "ann-1",
      title: "Scheduled Maintenance Window - Sunday 2:00 AM UTC",
      target: "All 28 Tenants",
      date: "2026-10-25",
      type: "Maintenance",
      author: "Platform Engineering",
    },
    {
      id: "ann-2",
      title: "New Feature Release: Bulk PDF Academic Report Cards v2.4",
      target: "School Admins & Principals",
      date: "2026-10-20",
      type: "Feature",
      author: "Product Team",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Feature");
  const [target, setTarget] = useState("All 28 Tenants");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncements([
      {
        id: `ann-${Date.now()}`,
        title,
        target,
        date: new Date().toISOString().split("T")[0],
        type,
        author: "Super Admin",
      },
      ...announcements,
    ]);
    setModalOpen(false);
    setTitle("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Global Platform Announcements
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Broadcast high-priority notices and release updates to all schools and portals.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        </div>

        <div className="space-y-4">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white p-5 rounded-2xl shadow-card border border-slate-100 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      {a.type}
                    </span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-500">Audience: {a.target}</span>
                  </div>
                  <h3 className="text-sm font-bold font-heading text-navy-900">{a.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Published by {a.author} on {a.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-dropdown p-6 border border-slate-100">
              <h3 className="text-lg font-bold font-heading text-navy-900 mb-4">
                Publish Platform Announcement
              </h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Announcement Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Scheduled Firebase maintenance"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="Feature">Feature Release</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Alert">Security Alert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Target</label>
                    <select
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="All 28 Tenants">All 28 Tenants</option>
                      <option value="School Admins">School Admins</option>
                      <option value="Faculty">Teachers Only</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-cta py-2 px-5 text-xs font-bold uppercase tracking-wider"
                  >
                    Broadcast
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
