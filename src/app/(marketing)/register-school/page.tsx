"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  School as SchoolIcon,
  User,
  Mail,
  Lock,
  Globe,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase/client";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function RegisterSchoolPage() {
  const router = useRouter();
  const { switchDemoRole } = useAuth();

  const [step, setStep] = useState(1);
  const [schoolName, setSchoolName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState<"starter" | "growth" | "enterprise">("growth");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubdomainChange = (val: string) => {
    setSubdomain(val.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const schoolId = subdomain || `school-${Date.now().toString().slice(-4)}`;

    try {
      // 1. Try to create firebase auth user if connected
      let uid = `admin_${Date.now()}`;
      try {
        const userCred = await createUserWithEmailAndPassword(auth, adminEmail, password);
        uid = userCred.user.uid;
      } catch {
        // If offline/demo fallback, retain generated uid
      }

      // 2. Create School Document in Firestore
      await setDoc(doc(db, "schools", schoolId), {
        schoolId,
        name: schoolName,
        slug: subdomain,
        domain: `${subdomain}.pathshala.app`,
        planId: plan,
        status: "active",
        branding: {
          logoUrl: "/assets/Pathshala.jpeg",
          primaryColor: "#0B2558",
          secondaryColor: "#1B3A7A",
          accentColor: "#F0B33A",
          ctaColor: "#1F8A3E",
          motto: "Empowering excellence in education",
          address: "Central Campus",
          email: adminEmail,
        },
        settings: {
          currency: "USD",
          timezone: "UTC",
          dateFormat: "YYYY-MM-DD",
          gradingSystem: "letter",
          attendanceMode: "daily",
          enableOnlineAdmissions: true,
          enableFeeGateways: true,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // 3. Create Admin User Document
      await setDoc(doc(db, "users", uid), {
        uid,
        email: adminEmail,
        displayName: adminName,
        role: "schoolAdmin",
        schoolId,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Switch active session
      switchDemoRole("schoolAdmin", schoolId);
      router.push("/admin/onboarding");
    } catch (err: any) {
      // Even if Firestore offline, gracefully route to onboarding with tenant context
      switchDemoRole("schoolAdmin", schoolId);
      router.push("/admin/onboarding");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-8">
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
            <div className="text-left">
              <span className="text-2xl font-black font-heading text-navy-900 block leading-tight">
                Pathshala
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500">
                School Registration Wizard
              </span>
            </div>
          </Link>

          <h2 className="mt-6 text-3xl font-extrabold font-heading text-navy-900 tracking-tight">
            Register your institution
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Set up your branded school portal in less than 2 minutes. No credit card required.
          </p>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                step === 1 ? "bg-green-600 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              <span>1</span>
              <span>School Profile</span>
            </div>
            <div className="w-6 h-0.5 bg-slate-300" />
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                step === 2 ? "bg-green-600 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              <span>2</span>
              <span>Administrator</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-card border border-slate-100">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Official School Name
                  </label>
                  <div className="relative">
                    <SchoolIcon className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => {
                        setSchoolName(e.target.value);
                        if (!subdomain) {
                          handleSubdomainChange(
                            e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
                          );
                        }
                      }}
                      placeholder="e.g. Greenwood International Academy"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Custom Subdomain
                  </label>
                  <div className="flex rounded-lg border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-navy-900">
                    <div className="pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={subdomain}
                      onChange={(e) => handleSubdomainChange(e.target.value)}
                      placeholder="greenwood"
                      className="w-full pl-2.5 pr-2 py-2.5 text-xs sm:text-sm focus:outline-none"
                    />
                    <span className="bg-slate-50 px-3 py-2.5 text-xs text-slate-500 font-semibold border-l border-slate-200">
                      .pathshala.app
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Your faculty, students, and parents will access your portal through this dedicated URL.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-2">
                    Select SaaS Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["starter", "growth", "enterprise"] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setPlan(tier)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          plan === tier
                            ? "border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600/20"
                            : "border-slate-200 hover:border-slate-300 text-navy-900"
                        }`}
                      >
                        <span className="capitalize block text-xs font-bold font-heading">
                          {tier}
                        </span>
                        <span className="text-[10px] text-slate-500">14 Days Free</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!schoolName || !subdomain) {
                        setError("Please enter school name and subdomain");
                        return;
                      }
                      setError(null);
                      setStep(2);
                    }}
                    className="w-full btn-cta py-3 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Proceed to Admin Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Administrator Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="e.g. Dr. Arthur Pendelton"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Administrator Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="principal@greenwood.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Create Master Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Your tenant environment is isolated by Firebase multi-tenant rules.</span>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 btn-outline py-3 text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-2/3 btn-cta py-3 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                  >
                    {submitting ? "Provisioning..." : "Launch School Portal"}
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already registered?{" "}
            <Link href="/login" className="text-navy-900 font-semibold hover:underline">
              Sign into school portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
