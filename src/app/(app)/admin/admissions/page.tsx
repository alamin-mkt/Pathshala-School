"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  GraduationCap,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  Filter,
  Eye,
  UserCheck,
} from "lucide-react";

interface Application {
  id: string;
  appNo: string;
  studentName: string;
  grade: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  date: string;
  status: "applied" | "reviewed" | "accepted" | "enrolled" | "rejected";
}

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    appNo: "APP-982144",
    studentName: "Leo Matthews",
    grade: "Grade 10",
    guardianName: "Rachel Matthews",
    guardianPhone: "+1 (555) 888-1234",
    guardianEmail: "rachel.m@example.com",
    date: "2026-10-27",
    status: "applied",
  },
  {
    id: "app-2",
    appNo: "APP-982143",
    studentName: "Chloe Davenport",
    grade: "Grade 8",
    guardianName: "Thomas Davenport",
    guardianPhone: "+1 (555) 777-2345",
    guardianEmail: "t.davenport@example.com",
    date: "2026-10-26",
    status: "reviewed",
  },
  {
    id: "app-3",
    appNo: "APP-982142",
    studentName: "Zack Robinson",
    grade: "Grade 11 (STEM)",
    guardianName: "Emma Robinson",
    guardianPhone: "+1 (555) 666-3456",
    guardianEmail: "emma.r@example.com",
    date: "2026-10-25",
    status: "accepted",
  },
  {
    id: "app-4",
    appNo: "APP-982141",
    studentName: "Benjamin Scott",
    grade: "Grade 5",
    guardianName: "Hannah Scott",
    guardianPhone: "+1 (555) 555-4567",
    guardianEmail: "hannah.scott@example.com",
    date: "2026-10-24",
    status: "enrolled",
  },
];

export default function AdmissionsWorkflowPage() {
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = applications.filter((a) => {
    const matchesSearch =
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.appNo.toLowerCase().includes(search.toLowerCase()) ||
      a.guardianName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: Application["status"]) => {
    setApplications(
      applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-900">
            Admissions & Online Applications Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review prospective student submissions from website portal and enroll them seamlessly into active rosters.
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl shadow-card border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search application number, applicant name, or guardian..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-semibold"
              >
                <option value="all">All Stages</option>
                <option value="applied">Applied (New)</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="enrolled">Enrolled</option>
              </select>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              {filtered.length} Applications
            </span>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">App Number</th>
                  <th className="py-3.5 px-6">Applicant Name</th>
                  <th className="py-3.5 px-6">Applied Grade</th>
                  <th className="py-3.5 px-6">Parent Details</th>
                  <th className="py-3.5 px-6">Submission Date</th>
                  <th className="py-3.5 px-6">Stage</th>
                  <th className="py-3.5 px-6 text-right">Workflow Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono text-[11px] text-slate-500 font-bold">
                      {app.appNo}
                    </td>
                    <td className="py-4 px-6 font-bold">{app.studentName}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {app.grade}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-[11px]">
                        <p className="font-semibold text-navy-900">{app.guardianName}</p>
                        <p className="text-slate-400 font-mono">{app.guardianPhone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{app.date}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          app.status === "enrolled"
                            ? "bg-green-50 text-green-700"
                            : app.status === "accepted"
                            ? "bg-gold-50 text-gold-700"
                            : app.status === "reviewed"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {app.status === "applied" && (
                        <button
                          onClick={() => updateStatus(app.id, "reviewed")}
                          className="px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-semibold"
                        >
                          Mark Reviewed
                        </button>
                      )}
                      {app.status === "reviewed" && (
                        <button
                          onClick={() => updateStatus(app.id, "accepted")}
                          className="px-3 py-1.5 rounded-lg border border-gold-300 text-gold-700 hover:bg-gold-50 text-xs font-semibold"
                        >
                          Offer Acceptance
                        </button>
                      )}
                      {app.status === "accepted" && (
                        <button
                          onClick={() => {
                            updateStatus(app.id, "enrolled");
                            alert(`Student ${app.studentName} has been enrolled successfully!`);
                          }}
                          className="btn-cta py-1.5 px-3 text-xs font-bold uppercase tracking-wider flex items-center gap-1 inline-flex"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Complete Enrollment</span>
                        </button>
                      )}
                      {app.status === "enrolled" && (
                        <span className="text-xs text-green-700 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Enrolled
                        </span>
                      )}
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
