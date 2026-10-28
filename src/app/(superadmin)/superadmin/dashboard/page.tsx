"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  School,
  Users,
  Wallet,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function SuperAdminDashboard() {
  const kpis = [
    {
      label: "Registered Schools",
      value: "28",
      growth: "+4 this month",
      icon: School,
      color: "text-navy-900 bg-navy-50",
    },
    {
      label: "Enrolled Students",
      value: "14,820",
      growth: "+12.4% YoY",
      icon: Users,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Monthly Recurring Revenue",
      value: "$18,450",
      growth: "+18.2% vs last mo",
      icon: Wallet,
      color: "text-gold-600 bg-gold-50",
    },
    {
      label: "System Health & Uptime",
      value: "99.98%",
      growth: "All systems nominal",
      icon: ShieldCheck,
      color: "text-green-600 bg-green-50",
    },
  ];

  const recentSchools = [
    {
      id: "demo-school-greenwood",
      name: "Greenwood International School",
      plan: "Growth ($149/mo)",
      students: 840,
      status: "Active",
      renewal: "Nov 15, 2026",
    },
    {
      id: "st-xavier-high",
      name: "St. Xavier Memorial High School",
      plan: "Enterprise ($349/mo)",
      students: 2150,
      status: "Active",
      renewal: "Dec 01, 2026",
    },
    {
      id: "oakridge-academy",
      name: "Oakridge Science & Tech Academy",
      plan: "Starter ($49/mo)",
      students: 290,
      status: "Active",
      renewal: "Nov 22, 2026",
    },
    {
      id: "heritage-grammar",
      name: "Heritage Grammar School",
      plan: "Growth ($149/mo)",
      students: 650,
      status: "Trial",
      renewal: "Nov 04, 2026",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="section-eyebrow">Cloud Operations</span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-navy-900 tracking-tight">
              Super Admin Platform Console
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Multi-tenant telemetry, global subscriptions, and security partition monitors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/superadmin/schools"
              className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Provision New School</span>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 flex items-start justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {kpi.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-900 mt-2">
                    {kpi.value}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 mt-2 bg-green-50 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {kpi.growth}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Tenant Schools Table */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-heading text-navy-900">
                Active Institutional Tenants
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time tenant status, tier limits, and billing renewals.
              </p>
            </div>
            <Link
              href="/superadmin/schools"
              className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
            >
              <span>View All 28 Schools</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">School Name</th>
                  <th className="py-3 px-6">SaaS Plan</th>
                  <th className="py-3 px-6">Enrolled Students</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Next Renewal</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                {recentSchools.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold">{s.name}</td>
                    <td className="py-4 px-6 text-slate-600">{s.plan}</td>
                    <td className="py-4 px-6 font-semibold">{s.students}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          s.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gold-50 text-gold-700"
                        }`}
                      >
                        {s.status === "Active" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{s.renewal}</td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/admin/dashboard`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-navy-900 hover:text-white transition-colors"
                      >
                        <span>Impersonate</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
