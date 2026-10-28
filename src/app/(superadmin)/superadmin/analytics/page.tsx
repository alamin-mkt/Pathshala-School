"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart3, TrendingUp, Users, School, Globe, DollarSign } from "lucide-react";

export default function SuperAdminAnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-900">
            Platform Growth & Usage Telemetry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aggregate student volume, concurrent active sessions, and revenue forecasts.
          </p>
        </div>

        {/* Metric summary boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold uppercase">
              Total Managed Students
            </span>
            <p className="text-3xl font-black font-heading text-navy-900 mt-2">14,820</p>
            <p className="text-xs text-green-700 font-semibold mt-1">+1,240 enrolled this term</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold uppercase">
              Annual Contract Value (ARR)
            </span>
            <p className="text-3xl font-black font-heading text-navy-900 mt-2">$221,400</p>
            <p className="text-xs text-green-700 font-semibold mt-1">94% gross renewal rate</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold uppercase">
              Cloud Storage Utilized
            </span>
            <p className="text-3xl font-black font-heading text-navy-900 mt-2">412.8 GB</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">PDF receipts, report cards & ID scans</p>
          </div>
        </div>

        {/* Visual telemetry card */}
        <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Monthly Active Users by Tenant Role
            </h3>
            <span className="text-xs font-semibold text-slate-400">Past 30 Days</span>
          </div>

          <div className="space-y-4">
            {[
              { role: "Guardians & Parents", count: "11,200 active", pct: 76, color: "bg-green-600" },
              { role: "Students (Desk & Homework)", count: "9,840 active", pct: 67, color: "bg-navy-700" },
              { role: "Teachers & Faculty", count: "1,140 active", pct: 89, color: "bg-gold-500" },
              { role: "Accountants & Staff", count: "180 active", pct: 95, color: "bg-navy-900" },
            ].map((r, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-navy-900">{r.role}</span>
                  <span className="text-slate-500">{r.count}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${r.color}`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
