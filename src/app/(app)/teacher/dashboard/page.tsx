"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Calendar,
  ClipboardCheck,
  Award,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export default function TeacherDashboardPage() {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <span className="section-eyebrow">Faculty Workspace</span>
          <h1 className="text-2xl font-bold font-heading text-navy-900">
            Welcome back, {profile?.displayName || "Ms. Clara Higgins"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Today is Wednesday, Oct 28 &bull; You have 3 scheduled lectures and 1 pending gradebook submission.
          </p>
        </div>

        {/* Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link
            href="/admin/attendance"
            className="bg-white p-5 rounded-2xl shadow-card border border-slate-100 hover:border-green-600 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Roll Call</span>
              <h3 className="text-lg font-bold font-heading text-navy-900 mt-1">
                Mark Attendance
              </h3>
              <p className="text-[11px] text-green-700 font-semibold mt-1">Grade 10 - Section A</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
              <ClipboardCheck className="w-5 h-5" />
            </div>
          </Link>

          <Link
            href="/admin/examinations"
            className="bg-white p-5 rounded-2xl shadow-card border border-slate-100 hover:border-navy-900 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Evaluation</span>
              <h3 className="text-lg font-bold font-heading text-navy-900 mt-1">
                Gradebook Entry
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">Mid-Term Pure Math</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </div>
          </Link>

          <Link
            href="/admin/academics"
            className="bg-white p-5 rounded-2xl shadow-card border border-slate-100 hover:border-gold-500 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Schedule</span>
              <h3 className="text-lg font-bold font-heading text-navy-900 mt-1">
                My Class Timetable
              </h3>
              <p className="text-[11px] text-gold-600 font-semibold mt-1">Next: Period 2 (Room 101)</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* Today's Teaching Schedule */}
        <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100">
          <h3 className="text-base font-bold font-heading text-navy-900 mb-4">
            Today&apos;s Class Schedule
          </h3>
          <div className="space-y-3">
            {[
              { time: "08:30 - 09:15 AM", subject: "Pure Mathematics (Calculus)", class: "Grade 10 - Section A", room: "Room 101", status: "Completed" },
              { time: "09:20 - 10:05 AM", subject: "Algebra II & Functions", class: "Grade 9 - Section B", room: "Room 104", status: "Upcoming" },
              { time: "11:10 - 11:55 AM", subject: "Pure Mathematics Tutorial", class: "Grade 11 - STEM", room: "Lab 2", status: "Upcoming" },
            ].map((slot, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="font-bold text-navy-900 block">{slot.subject}</span>
                    <span className="text-slate-500">{slot.class} &bull; {slot.room}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-500">{slot.time}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      slot.status === "Completed"
                        ? "bg-green-50 text-green-700"
                        : "bg-gold-50 text-gold-700"
                    }`}
                  >
                    {slot.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
