"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { TopBar } from "@/features/marketing/components/TopBar";
import { Navbar } from "@/features/marketing/components/Navbar";
import { Footer } from "@/features/marketing/components/Footer";

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: "Starter",
      id: "starter",
      priceMonthly: 49,
      priceAnnual: 39,
      description: "Perfect for growing academies, primary schools, and boutique learning centers.",
      studentLimit: "Up to 300 Students",
      features: [
        "Up to 300 Active Students",
        "Teacher & Attendance Marking",
        "Class Timetable Builder",
        "Online Gradebook & Report Cards",
        "Guardian Communication Notices",
        "Basic Fee Receipts (PDF)",
        "Standard Email Support",
      ],
      popular: false,
    },
    {
      name: "Growth",
      id: "growth",
      priceMonthly: 149,
      priceAnnual: 119,
      description: "Comprehensive management suite for established high schools and institutions.",
      studentLimit: "Up to 1,500 Students",
      features: [
        "Up to 1,500 Active Students",
        "All Starter Features Included",
        "White-label Branding & Colors",
        "POS Cashier & Online Payment Gateways",
        "Public School Website CMS & Admissions",
        "Library Catalog & Circulation",
        "Transport Fleet & Vehicle Routes",
        "FCM Push Alerts & SMS Reminders",
        "Priority 24/7 Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      id: "enterprise",
      priceMonthly: 349,
      priceAnnual: 279,
      description: "Tailored multi-campus infrastructure for school chains and educational trusts.",
      studentLimit: "Unlimited Students",
      features: [
        "Unlimited Active Students & Branches",
        "Multi-Campus Centralized Dashboard",
        "Custom Domain (school.edu.com)",
        "Automated Biometric Hardware Integration",
        "Dedicated Database Sharding & SLA",
        "Custom Feature Development",
        "Dedicated Account Executive",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      <Navbar />

      <main className="flex-1 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="section-eyebrow">Predictable SaaS Pricing</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-navy-900 tracking-tight leading-tight">
              One platform. Infinite academic possibilities.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Transparent, per-institution subscription tiers designed for single campuses and multi-branch school networks. 14-day risk-free trial on all plans.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-white rounded-full shadow-soft border border-slate-200">
              <button
                type="button"
                onClick={() => setAnnualBilling(false)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  !annualBilling ? "bg-navy-900 text-white shadow-sm" : "text-slate-600 hover:text-navy-900"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setAnnualBilling(true)}
                className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  annualBilling ? "bg-green-600 text-white shadow-sm" : "text-slate-600 hover:text-navy-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-gold-400 text-navy-950 px-2 py-0.5 rounded-full font-black">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
            {plans.map((p) => {
              const price = annualBilling ? p.priceAnnual : p.priceMonthly;
              return (
                <div
                  key={p.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                    p.popular
                      ? "bg-navy-900 text-white shadow-dropdown ring-2 ring-gold-500"
                      : "bg-white text-navy-900 shadow-card border border-slate-100"
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-950 font-black text-[11px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Most Popular for Schools</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold font-heading">{p.name}</h3>
                    <p className={`text-xs mt-2 leading-relaxed ${p.popular ? "text-slate-300" : "text-slate-500"}`}>
                      {p.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black font-heading tracking-tight">
                        ${price}
                      </span>
                      <span className={`text-xs font-medium ${p.popular ? "text-slate-300" : "text-slate-500"}`}>
                        / month {annualBilling ? "(billed annually)" : ""}
                      </span>
                    </div>

                    <div className={`mt-2 text-xs font-bold inline-block px-3 py-1 rounded-full ${p.popular ? "bg-navy-800 text-gold-400" : "bg-slate-100 text-green-700"}`}>
                      {p.studentLimit}
                    </div>

                    {/* Features List */}
                    <div className="mt-8 space-y-3 pt-6 border-t border-slate-200/20">
                      {p.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs">
                          <CheckCircle2
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              p.popular ? "text-green-400" : "text-green-600"
                            }`}
                          />
                          <span className={p.popular ? "text-slate-200" : "text-slate-700"}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href={`/register-school?plan=${p.id}`}
                      className={`w-full py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                        p.popular
                          ? "btn-cta text-white"
                          : "bg-navy-900 text-white hover:bg-navy-800"
                      }`}
                    >
                      <span>Start 14-Day Free Trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee Banner */}
          <div className="mt-16 max-w-4xl mx-auto p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-heading text-navy-900">
                  30-Day Money-Back Guarantee & Free Data Migration
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our engineering team assists with bulk importing your current CSV student rosters, fee balances, and staff profiles at no extra cost.
                </p>
              </div>
            </div>

            <Link
              href="/demo-request"
              className="btn-outline text-xs font-bold py-2.5 px-5 flex-shrink-0"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
