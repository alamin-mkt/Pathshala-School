"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Users,
  Award,
  Wallet,
  ClipboardCheck,
  CreditCard,
  Download,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

interface Child {
  id: string;
  name: string;
  grade: string;
  rollNo: string;
  attendance: string;
  gpa: string;
  dueAmount: number;
}

const CHILDREN: Child[] = [
  {
    id: "c1",
    name: "Alex Turner",
    grade: "Grade 10 - Section A",
    rollNo: "101",
    attendance: "98.2%",
    gpa: "3.88",
    dueAmount: 0,
  },
  {
    id: "c2",
    name: "Emma Turner",
    grade: "Grade 6 - Section B",
    rollNo: "604",
    attendance: "95.5%",
    gpa: "3.75",
    dueAmount: 450,
  },
];

export default function ParentDashboardPage() {
  const [selectedChild, setSelectedChild] = useState<Child>(CHILDREN[0]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="section-eyebrow">Guardian Portal</span>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Welcome, Elizabeth Turner
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitor your children&apos;s daily attendance, academic report cards, and settle school fee invoices.
            </p>
          </div>

          {/* Child Switcher Pill */}
          <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 pl-2">Child:</span>
            {CHILDREN.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedChild.id === child.id
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-navy-900"
                }`}
              >
                {child.name} ({child.grade.split(" - ")[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Selected Child Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              Attendance Record
            </span>
            <p className="text-3xl font-black font-heading text-green-700 mt-1">
              {selectedChild.attendance}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Status: Regular &amp; Punctual</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              Academic Term GPA
            </span>
            <p className="text-3xl font-black font-heading text-navy-900 mt-1">
              {selectedChild.gpa} / 4.0
            </p>
            <p className="text-[11px] text-gold-600 font-semibold mt-1">Term 1 Honor Roll</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              Tuition Fee Balance
            </span>
            <p
              className={`text-3xl font-black font-heading mt-1 ${
                selectedChild.dueAmount === 0 ? "text-green-700" : "text-red-600"
              }`}
            >
              ${selectedChild.dueAmount.toFixed(2)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {selectedChild.dueAmount === 0 ? "All Invoices Paid" : "Payment Due"}
            </p>
          </div>
        </div>

        {/* Action Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fee & Payment Card */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Fee Invoices for {selectedChild.name}
            </h3>
            {selectedChild.dueAmount > 0 ? (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-navy-900">Term 1 Tuition &amp; Lab Balance</span>
                  <span className="font-bold text-red-600">${selectedChild.dueAmount}</span>
                </div>
                <button
                  onClick={() => alert("Redirecting to secure online payment gateway (bKash/SSL/Stripe)...")}
                  className="w-full btn-cta py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Balance Online</span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-xs text-green-800">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>All tuition and ancillary fee balances for {selectedChild.name} are settled.</span>
              </div>
            )}
          </div>

          {/* Report Card & Communication Card */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Official Academic Records
            </h3>
            <p className="text-xs text-slate-500">
              Download the official First Semester report card certified by the executive principal.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/student/report-card"
                className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-green-400" />
                <span>Download Report Card (PDF)</span>
              </Link>
              <Link
                href="/admin/communication"
                className="btn-outline py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Class Teacher</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
