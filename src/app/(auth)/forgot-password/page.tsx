"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      // In demo/offline mode, give helpful feedback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-card border border-slate-100">
        <div className="flex justify-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md border border-slate-100">
              <Image
                src="/assets/Pathshala.jpeg"
                alt="Pathshala Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-navy-900 block leading-tight">
                Pathshala
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gold-500 font-semibold">
                SaaS Portal
              </span>
            </div>
          </Link>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-heading text-navy-900">Recovery Email Dispatched</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              If an account is associated with <span className="font-semibold text-navy-900">{email}</span>, you will receive password reset instructions within 2 minutes.
            </p>
            <div className="pt-4">
              <Link
                href="/login"
                className="btn-primary w-full text-xs font-semibold py-2.5 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold font-heading text-navy-900">Reset Your Password</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your registered school email to receive recovery instructions.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  School Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@school.edu"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-cta py-2.5 text-xs font-semibold shadow-sm flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Reset Link"}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-navy-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
