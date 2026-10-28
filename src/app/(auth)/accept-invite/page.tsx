"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, UserCheck, ShieldCheck, ArrowRight } from "lucide-react";

export default function AcceptInvitePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-card border border-slate-100 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md border border-slate-100 mx-auto mb-4">
            <Image
              src="/assets/Pathshala.jpeg"
              alt="Pathshala Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="section-eyebrow">Staff Invitation</span>
          <h2 className="text-2xl font-bold font-heading text-navy-900 mt-1">Activate Staff Account</h2>
          <p className="text-xs text-slate-500 mt-1">
            You were invited to join <span className="font-semibold text-navy-900">Greenwood International School</span> as <span className="font-semibold text-green-700">Senior Faculty</span>.
          </p>
        </div>

        <form onSubmit={handleActivate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Set Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>Role privileges: Academic Curriculum & Student Attendance</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-navy-700" />
              <span>Assigned School ID: demo-school-greenwood</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-cta py-3 font-semibold shadow-sm flex items-center justify-center gap-2"
          >
            {submitting ? "Activating..." : "Accept & Enter Faculty Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
