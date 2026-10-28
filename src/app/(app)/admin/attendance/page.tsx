"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  Send,
  Save,
  Download,
  Users,
} from "lucide-react";

interface AttendanceItem {
  id: string;
  rollNo: string;
  name: string;
  status: "P" | "A" | "L" | "E";
  guardianPhone: string;
  guardianName: string;
}

const INITIAL_ROSTER: AttendanceItem[] = [
  { id: "stu-1", rollNo: "101", name: "Alex Turner", status: "P", guardianPhone: "+1 (555) 234-5678", guardianName: "Elizabeth Turner" },
  { id: "stu-2", rollNo: "102", name: "Maya Rostova", status: "P", guardianPhone: "+1 (555) 345-6789", guardianName: "Elena Rostova" },
  { id: "stu-3", rollNo: "103", name: "Liam Chen", status: "A", guardianPhone: "+1 (555) 456-7890", guardianName: "David Chen" },
  { id: "stu-4", rollNo: "104", name: "Sophia Martinez", status: "P", guardianPhone: "+1 (555) 567-8901", guardianName: "Carlos Martinez" },
  { id: "stu-5", rollNo: "105", name: "Tariq Al-Mansoor", status: "L", guardianPhone: "+1 (555) 678-9012", guardianName: "Sarah Al-Mansoor" },
  { id: "stu-6", rollNo: "106", name: "Hannah Vance", status: "P", guardianPhone: "+1 (555) 789-0123", guardianName: "Michael Vance" },
  { id: "stu-7", rollNo: "107", name: "Oliver Brooks", status: "P", guardianPhone: "+1 (555) 890-1234", guardianName: "Clara Brooks" },
  { id: "stu-8", rollNo: "108", name: "Emma Watson", status: "P", guardianPhone: "+1 (555) 901-2345", guardianName: "James Watson" },
];

export default function AttendanceSystemPage() {
  const [selectedClass, setSelectedClass] = useState("Grade 10 - Section A");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [roster, setRoster] = useState<AttendanceItem[]>(INITIAL_ROSTER);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [alertsDispatched, setAlertsDispatched] = useState(false);

  const presentCount = roster.filter((r) => r.status === "P").length;
  const absentCount = roster.filter((r) => r.status === "A").length;
  const lateCount = roster.filter((r) => r.status === "L").length;
  const excusedCount = roster.filter((r) => r.status === "E").length;
  const attendanceRate = Math.round((presentCount / roster.length) * 100);

  const setStatus = (id: string, status: AttendanceItem["status"]) => {
    setRoster(roster.map((r) => (r.id === id ? { ...r, status } : r)));
    setSavedSuccess(false);
  };

  const markAllPresent = () => {
    setRoster(roster.map((r) => ({ ...r, status: "P" })));
    setSavedSuccess(false);
  };

  const handleSaveAttendance = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const dispatchAbsenceAlerts = () => {
    setAlertsDispatched(true);
    setTimeout(() => setAlertsDispatched(false), 4000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Bulk Attendance Register
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Rapid mobile-optimized roll call with instant FCM/SMS parent notifications on absence.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={dispatchAbsenceAlerts}
              className="btn-outline py-2 px-3.5 text-xs font-semibold flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-navy-900" />
              <span>Notify Absentees ({absentCount})</span>
            </button>

            <button
              onClick={handleSaveAttendance}
              className="btn-cta py-2 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Register</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Attendance register saved and synced to cloud Firestore successfully!</span>
          </div>
        )}

        {alertsDispatched && (
          <div className="p-3.5 rounded-xl bg-gold-50 border border-gold-200 text-xs text-gold-900 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <span>Absence notices dispatched via Firebase Cloud Messaging & SMS to {absentCount} guardian phones!</span>
          </div>
        )}

        {/* Filter & Metric Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Controls */}
          <div className="md:col-span-6 bg-white p-4 rounded-xl shadow-card border border-slate-100 flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-bold text-navy-900"
              >
                <option value="Grade 10 - Section A">Grade 10 - Section A</option>
                <option value="Grade 11 - STEM">Grade 11 - STEM</option>
                <option value="Grade 8 - Section B">Grade 8 - Section B</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Attendance Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-semibold text-navy-900"
              />
            </div>

            <div className="pt-5">
              <button
                type="button"
                onClick={markAllPresent}
                className="btn-outline py-1.5 px-3 text-xs font-bold text-green-700 hover:bg-green-50"
              >
                Mark All Present
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-6 grid grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-green-600 block">Present</span>
              <span className="text-xl font-black font-heading text-green-700">{presentCount}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-red-600 block">Absent</span>
              <span className="text-xl font-black font-heading text-red-600">{absentCount}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gold-600 block">Late</span>
              <span className="text-xl font-black font-heading text-gold-600">{lateCount}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-navy-900 block">Rate</span>
              <span className="text-xl font-black font-heading text-navy-900">{attendanceRate}%</span>
            </div>
          </div>
        </div>

        {/* Student Attendance List */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">Roll</th>
                  <th className="py-3 px-6">Student Name</th>
                  <th className="py-3 px-6">Guardian Phone</th>
                  <th className="py-3 px-6 text-center">Attendance Status</th>
                  <th className="py-3 px-6 text-right">Action Quick Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                {roster.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-bold">{s.rollNo}</td>
                    <td className="py-3.5 px-6 font-bold text-navy-900">{s.name}</td>
                    <td className="py-3.5 px-6 text-slate-500 font-mono text-[11px]">
                      {s.guardianPhone} ({s.guardianName})
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase ${
                          s.status === "P"
                            ? "bg-green-100 text-green-800"
                            : s.status === "A"
                            ? "bg-red-100 text-red-800"
                            : s.status === "L"
                            ? "bg-gold-100 text-gold-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {s.status === "P" && "Present"}
                        {s.status === "A" && "Absent"}
                        {s.status === "L" && "Late"}
                        {s.status === "E" && "Excused"}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setStatus(s.id, "P")}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            s.status === "P"
                              ? "bg-green-600 text-white shadow-sm"
                              : "text-slate-600 hover:text-green-700"
                          }`}
                        >
                          P
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatus(s.id, "A")}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            s.status === "A"
                              ? "bg-red-600 text-white shadow-sm"
                              : "text-slate-600 hover:text-red-700"
                          }`}
                        >
                          A
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatus(s.id, "L")}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            s.status === "L"
                              ? "bg-gold-500 text-white shadow-sm"
                              : "text-slate-600 hover:text-gold-700"
                          }`}
                        >
                          L
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatus(s.id, "E")}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            s.status === "E"
                              ? "bg-blue-600 text-white shadow-sm"
                              : "text-slate-600 hover:text-blue-700"
                          }`}
                        >
                          E
                        </button>
                      </div>
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
