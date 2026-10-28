"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  GraduationCap,
  Award,
  Calendar,
  ClipboardCheck,
  Download,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <span className="section-eyebrow">Student Desk</span>
          <h1 className="text-2xl font-bold font-heading text-navy-900">
            Welcome back, Alex Turner
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Grade 10 - Section A &bull; Roll Number #101 &bull; Academic Session 2026-2027
          </p>
        </div>

        {/* 3 Student KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">My Attendance</span>
            <p className="text-3xl font-black font-heading text-green-700 mt-1">98.2%</p>
            <p className="text-[11px] text-slate-500 mt-1">1 absence recorded</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Current Term GPA</span>
            <p className="text-3xl font-black font-heading text-navy-900 mt-1">3.88 / 4.0</p>
            <p className="text-[11px] text-gold-600 font-semibold mt-1">Class Rank #1</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Borrowed Books</span>
            <p className="text-3xl font-black font-heading text-navy-900 mt-1">2 Books</p>
            <p className="text-[11px] text-slate-500 mt-1">Due in 5 days</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Term Report Card Available
            </h3>
            <p className="text-xs text-slate-500">
              Your official certified academic transcript for the First Semester Examination is ready.
            </p>
            <div>
              <Link
                href="/student/report-card"
                className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 inline-flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>View & Download Report Card</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Today&apos;s Lecture Schedule
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="font-semibold text-navy-900">Pure Mathematics</span>
                <span className="text-slate-500">08:30 - 09:15 AM (Room 101)</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="font-semibold text-navy-900">Physics & Mechanics</span>
                <span className="text-slate-500">09:20 - 10:05 AM (Lab 3)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
