"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserPlus,
  Send,
} from "lucide-react";

export default function SchoolAdminDashboard() {
  const { school } = useAuth();

  const kpis = [
    {
      label: "Enrolled Students",
      value: "840",
      change: "+28 this term",
      icon: GraduationCap,
      color: "text-navy-900 bg-navy-50",
    },
    {
      label: "Teaching Faculty",
      value: "42",
      change: "100% active",
      icon: Users,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Today's Attendance",
      value: "96.4%",
      change: "30 absent",
      icon: ClipboardCheck,
      color: "text-gold-600 bg-gold-50",
    },
    {
      label: "October Fee Inflow",
      value: "$48,250",
      change: "88% collected",
      icon: Wallet,
      color: "text-green-600 bg-green-50",
    },
  ];

  const recentAdmissions = [
    { id: "STU-1048", name: "Lucas Vance", class: "Grade 10 - A", date: "Oct 27, 2026", status: "Enrolled" },
    { id: "STU-1047", name: "Amara Patel", class: "Grade 8 - B", date: "Oct 25, 2026", status: "Enrolled" },
    { id: "STU-1046", name: "Noah Campbell", class: "Grade 5 - A", date: "Oct 22, 2026", status: "Enrolled" },
    { id: "STU-1045", name: "Sophia Jenkins", class: "Kindergarten", date: "Oct 20, 2026", status: "Enrolled" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Operational Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-wider mb-1">
              <span>Academic Year 2026-2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-navy-900 tracking-tight">
              {school?.name || "Greenwood International School"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Operations control center, academic registers, and daily financial telemetry.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <Link
              href="/admin/students"
              className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Admit Student</span>
            </Link>
            <Link
              href="/admin/attendance"
              className="btn-primary text-xs font-semibold py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
            >
              <ClipboardCheck className="w-4 h-4 text-green-400" />
              <span>Take Attendance</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 flex items-start justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {k.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-900 mt-2">
                    {k.value}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 mt-2 bg-green-50 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {k.change}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${k.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Split: Quick Shortcuts & Recent Admissions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Recent Admissions Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-heading text-navy-900">
                  Recent Student Enrollments
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Newly registered students in the current academic semester.
                </p>
              </div>
              <Link
                href="/admin/students"
                className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
              >
                <span>View All Roster</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-6">Student ID</th>
                    <th className="py-3 px-6">Full Name</th>
                    <th className="py-3 px-6">Class & Section</th>
                    <th className="py-3 px-6">Admission Date</th>
                    <th className="py-3 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                  {recentAdmissions.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-mono text-slate-500 text-[11px] font-bold">
                        {st.id}
                      </td>
                      <td className="py-4 px-6 font-bold">{st.name}</td>
                      <td className="py-4 px-6 text-slate-600">{st.class}</td>
                      <td className="py-4 px-6 text-slate-500">{st.date}</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-green-700">
                          <CheckCircle2 className="w-3 h-3" />
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Tasks & Upcoming Deadlines */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100">
              <h3 className="text-base font-bold font-heading text-navy-900 mb-4">
                Operational Shortcuts
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/admin/fees"
                  className="p-3 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50 text-navy-900 transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <Wallet className="w-5 h-5 text-green-600" />
                  <span className="text-xs font-bold">Collect Fee</span>
                </Link>

                <Link
                  href="/admin/examinations"
                  className="p-3 rounded-xl border border-slate-200 hover:border-navy-900 hover:bg-navy-50 text-navy-900 transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <FileText className="w-5 h-5 text-navy-700" />
                  <span className="text-xs font-bold">Gradebook</span>
                </Link>

                <Link
                  href="/admin/communication"
                  className="p-3 rounded-xl border border-slate-200 hover:border-gold-500 hover:bg-gold-50 text-navy-900 transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <Send className="w-5 h-5 text-gold-600" />
                  <span className="text-xs font-bold">Push Notice</span>
                </Link>

                <Link
                  href="/admin/academics"
                  className="p-3 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50 text-navy-900 transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <Calendar className="w-5 h-5 text-green-700" />
                  <span className="text-xs font-bold">Timetable</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Events Box */}
            <div className="bg-navy-900 text-white p-6 rounded-2xl shadow-card relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block">
                  Next Milestone
                </span>
                <h4 className="text-lg font-bold font-heading">
                  Mid-Term Science Olympiad
                </h4>
                <p className="text-xs text-slate-300">
                  Scheduled for Friday, Nov 14 in STEM Lab 3. 120 registered students.
                </p>
                <div className="pt-2">
                  <Link
                    href="/admin/examinations"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 hover:underline"
                  >
                    <span>View Exam Schedules</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
