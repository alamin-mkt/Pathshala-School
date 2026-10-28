"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MailCheck, ArrowRight, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-card border border-slate-100 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md border border-slate-100">
            <Image
              src="/assets/Pathshala.jpeg"
              alt="Pathshala Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto text-navy-700">
          <MailCheck className="w-8 h-8 text-navy-900" />
        </div>

        <div>
          <h2 className="text-2xl font-bold font-heading text-navy-900">Verify Your Institutional Email</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            We have dispatched a verification link to your institutional email. Please click the link inside to activate your school credentials and proceed.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => alert("Verification link resent successfully.")}
            className="w-full btn-outline py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Resend Email
          </button>

          <Link
            href="/login"
            className="w-full btn-cta py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
          >
            Continue to Login
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
