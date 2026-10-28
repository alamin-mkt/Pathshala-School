"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  BarChart3,
  Download,
  TrendingUp,
  Users,
  Wallet,
  ClipboardCheck,
  Award,
} from "lucide-react";

export default function ReportsAnalyticsPage() {
  const exportSummaryCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Metric,Value,Period",
        "Total Students,840,Session 2026-2027",
        "Average Monthly Attendance,96.4%,October 2026",
        "Fee Collection Progress,88.2%,Term 1",
        "Overall Passing Rate,98.6%,First Semester Exams",
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `School_Analytics_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Institutional Reports & Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Cross-sectional academic performance, attendance distribution, and fee collection summaries.
            </p>
          </div>

          <button
            onClick={exportSummaryCsv}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics (CSV)</span>
          </button>
        </div>

        {/* 4 Analytics KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Average Attendance</span>
            <p className="text-2xl font-black font-heading text-navy-900 mt-1">96.4%</p>
            <p className="text-[11px] text-green-700 font-semibold mt-1">+1.2% vs last semester</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Fee Inflow Progress</span>
            <p className="text-2xl font-black font-heading text-green-700 mt-1">88.2%</p>
            <p className="text-[11px] text-slate-500 mt-1">$48,250 of $54,700 invoiced</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Class Passing Rate</span>
            <p className="text-2xl font-black font-heading text-navy-900 mt-1">98.6%</p>
            <p className="text-[11px] text-gold-600 font-semibold mt-1">GPA 3.62 school average</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Faculty Retention</span>
            <p className="text-2xl font-black font-heading text-navy-900 mt-1">100%</p>
            <p className="text-[11px] text-green-700 font-semibold mt-1">42 certified faculty active</p>
          </div>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Attendance Distribution by Grade Level
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { label: "Grade 10 (Secondary)", rate: 98, count: "82/84 students" },
                { label: "Grade 11 (Senior STEM)", rate: 96, count: "68/71 students" },
                { label: "Grade 8 (Middle School)", rate: 95, count: "90/95 students" },
                { label: "Grade 5 (Primary)", rate: 97, count: "66/68 students" },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-navy-900">{item.label}</span>
                    <span className="text-slate-500">{item.count} ({item.rate}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${item.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Academic Subject Proficiency (Average GPA)
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { subject: "Computer Science & AI", gpa: "3.92 / 4.0", pct: 98 },
                { subject: "Pure Mathematics", gpa: "3.78 / 4.0", pct: 94 },
                { subject: "Physics & Mechanics", gpa: "3.65 / 4.0", pct: 91 },
                { subject: "English Literature", gpa: "3.72 / 4.0", pct: 93 },
              ].map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-navy-900">{s.subject}</span>
                    <span className="text-green-700 font-bold">{s.gpa}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-navy-900 rounded-full" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
