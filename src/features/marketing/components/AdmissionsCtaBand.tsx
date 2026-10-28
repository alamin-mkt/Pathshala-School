"use client";

import React, { useState } from "react";
import { GraduationCap, HelpCircle, Send, CheckCircle2 } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export function AdmissionsCtaBand({ onApplyClick }: { onApplyClick?: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      // Save lead directly to Firestore
      await addDoc(collection(db, "schools/demo-school-greenwood/applications"), {
        guardianEmail: email,
        studentName: "Prospective Student",
        appliedClassId: "General Inquiry",
        status: "applied",
        submittedAt: new Date().toISOString(),
        notes: "Captured via website footer inquiry bar",
      });
      setSubmitted(true);
      setEmail("");
    } catch {
      // Offline/Demo graceful fallback
      setSubmitted(true);
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="admissions-cta" className="bg-green-700 text-white py-12 lg:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Block: Admissions Open */}
          <div className="lg:col-span-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 text-white">
              <GraduationCap className="w-7 h-7 text-gold-300" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Admissions are open for 2026-27
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-green-100/90 leading-relaxed max-w-md">
                Limited seats available for Kindergarten, Middle School, and Senior Secondary STEM.
              </p>

              <div className="mt-4">
                <button
                  onClick={onApplyClick}
                  className="bg-white text-green-800 hover:bg-gold-50 hover:text-navy-900 transition-colors px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Block: Have any questions? */}
          <div className="lg:col-span-6 lg:border-l lg:border-green-600 lg:pl-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 text-white">
              <HelpCircle className="w-7 h-7 text-gold-300" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Have any questions?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-green-100/90 leading-relaxed">
                Enter your email address and our admissions counselors will contact you promptly.
              </p>

              {submitted ? (
                <div className="mt-4 p-3 rounded-lg bg-green-800/80 border border-green-500/50 flex items-center gap-2 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-gold-300 flex-shrink-0" />
                  <span>Thank you! Our admissions coordinator will reach out within 24 hours.</span>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="mt-4 flex max-w-md gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-2.5 rounded-md bg-white text-navy-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-navy-900 hover:bg-navy-800 text-white px-5 py-2.5 rounded-md flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
                    aria-label="Send Inquiry"
                  >
                    <Send className="w-4 h-4 text-gold-400" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
