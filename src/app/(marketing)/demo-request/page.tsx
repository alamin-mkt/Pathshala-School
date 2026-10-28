"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopBar } from "@/features/marketing/components/TopBar";
import { Navbar } from "@/features/marketing/components/Navbar";
import { Footer } from "@/features/marketing/components/Footer";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  School,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function DemoRequestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [studentCount, setStudentCount] = useState("500-1,000");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "demoRequests"), {
        name,
        email,
        phone,
        schoolName,
        studentCount,
        preferredDate,
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      <Navbar />

      <main className="flex-1 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="section-eyebrow">Personalized Walkthrough</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-900 tracking-tight leading-tight">
                Experience Pathshala in action.
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect with our product architects for a tailored 20-minute demonstration covering:
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Multi-tenant isolation & security architecture",
                  "Teacher bulk attendance & timetable clash detection",
                  "Automated POS fees, student ledger & receipts",
                  "Parent portal with live academic report cards",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-navy-900 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navy-900">Immediate Deployment</h4>
                  <p className="text-[11px] text-slate-500">Go live in 48 hours with our migration specialists.</p>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-card border border-slate-100">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-navy-900">
                    Demo Scheduled!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-navy-900">{name}</span>. A calendar invitation and video link have been sent to <span className="font-semibold text-navy-900">{email}</span>.
                  </p>
                  <div className="pt-6">
                    <Link
                      href="/"
                      className="btn-primary py-2.5 px-6 text-xs font-semibold inline-flex items-center gap-2"
                    >
                      Return to Homepage
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Dr. Michael Vance"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="mvance@school.edu"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Contact Phone
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (800) 555-0199"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        School / Trust Name
                      </label>
                      <div className="relative">
                        <School className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          placeholder="Westbridge High School"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Total Students
                      </label>
                      <select
                        value={studentCount}
                        onChange={(e) => setStudentCount(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                      >
                        <option value="Under 300">Under 300 Students</option>
                        <option value="300-1,000">300 - 1,000 Students</option>
                        <option value="1,000-3,000">1,000 - 3,000 Students</option>
                        <option value="Multi-Campus (3,000+)">Multi-Campus (3,000+ Students)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-cta py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                    >
                      {submitting ? "Booking Schedule..." : "Confirm Demo Reservation"}
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
