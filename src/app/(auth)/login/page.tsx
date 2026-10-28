"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/types";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  School as SchoolIcon,
  GraduationCap,
  Users,
  Wallet,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInGoogle, switchDemoRole, role: activeRole } = useAuth();

  const [email, setEmail] = useState("admin@greenwood.edu");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      // Route based on role
      routeToRole(activeRole || "schoolAdmin");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signInGoogle();
      routeToRole(activeRole || "schoolAdmin");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleSelect = (role: UserRole, demoEmail: string) => {
    switchDemoRole(role);
    setEmail(demoEmail);
    setPassword("password123");
    routeToRole(role);
  };

  const routeToRole = (role: UserRole) => {
    switch (role) {
      case "superAdmin":
        router.push("/superadmin/dashboard");
        break;
      case "schoolAdmin":
      case "principal":
        router.push("/admin/dashboard");
        break;
      case "teacher":
        router.push("/teacher/dashboard");
        break;
      case "accountant":
        router.push("/accountant/dashboard");
        break;
      case "student":
        router.push("/student/dashboard");
        break;
      case "parent":
        router.push("/parent/dashboard");
        break;
      default:
        router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Brand Hero Column */}
      <div className="lg:w-1/2 bg-navy-900 text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Glow Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-navy-700/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md">
              <Image
                src="/assets/Pathshala.jpeg"
                alt="Pathshala Logo"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                Pathshala
              </span>
              <p className="text-[10px] tracking-widest text-gold-500 uppercase font-bold">
                Learn. Grow. Shine.
              </p>
            </div>
          </Link>

          <div className="mt-16 lg:mt-24 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/80 border border-navy-700 text-xs font-medium text-gold-500 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Multi-Tenant School Management Platform</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold font-heading leading-tight text-white">
              Empowering schools with unified intelligence.
            </h1>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              Pathshala brings academic excellence, real-time attendance, intelligent fee collection,
              and seamless guardian communication under one secure, branded cloud portal.
            </p>

            <div className="mt-10 space-y-3.5">
              {[
                "Zero-data leakage multi-tenant isolation via Firebase rules",
                "Dedicated branded web portals for students, parents, and faculty",
                "Instant PDF report cards, ID badges, and POS fee receipts",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-12 border-t border-navy-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} Pathshala SaaS</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            256-bit AES Tenant Encryption
          </span>
        </div>
      </div>

      {/* Authentication Form Column */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-card border border-slate-100">
          <div>
            <span className="section-eyebrow">Secure Access</span>
            <h2 className="text-2xl font-bold font-heading text-navy-900">Sign in to your school</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your authorized credentials or choose a quick demo persona below.
            </p>
          </div>

          {/* Quick Demo Persona Switcher */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] font-semibold text-navy-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Quick Demo Personas</span>
              <span className="text-[10px] text-green-600 font-normal">Click to switch</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleRoleSelect("superAdmin", "superadmin@pathshala.app")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 hover:border-navy-900 hover:bg-navy-50 text-navy-900 font-medium transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-navy-700" />
                <span>Super Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("schoolAdmin", "admin@greenwood.edu")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 hover:border-green-600 hover:bg-green-50 text-green-700 font-medium transition-all"
              >
                <SchoolIcon className="w-3.5 h-3.5 text-green-600" />
                <span>School Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("teacher", "clara.math@greenwood.edu")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 hover:border-gold-500 hover:bg-gold-50 text-navy-900 font-medium transition-all"
              >
                <Users className="w-3.5 h-3.5 text-gold-600" />
                <span>Teacher</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("accountant", "accounts@greenwood.edu")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 hover:border-navy-900 hover:bg-navy-50 text-navy-900 font-medium transition-all"
              >
                <Wallet className="w-3.5 h-3.5 text-navy-700" />
                <span>Accountant</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("student", "alex.turner@student.greenwood.edu")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 hover:border-green-600 hover:bg-green-50 text-green-700 font-medium transition-all"
              >
                <GraduationCap className="w-3.5 h-3.5 text-green-600" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("parent", "elizabeth.turner@gmail.com")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 hover:border-gold-500 hover:bg-gold-50 text-navy-900 font-medium transition-all"
              >
                <Users className="w-3.5 h-3.5 text-gold-600" />
                <span>Parent</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Institutional Email
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-navy-900">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-green-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-cta py-3 font-semibold shadow-sm flex items-center justify-center gap-2"
            >
              {submitting ? "Signing in..." : "Enter Portal"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold absolute">
              or
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold text-navy-900 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google Workspace
          </button>

          <p className="text-center text-xs text-slate-500">
            Registering a new institution?{" "}
            <Link href="/register-school" className="text-navy-900 font-semibold hover:underline">
              Start Free Trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
