"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Wallet, Check, Edit2, Plus, Sparkles } from "lucide-react";

export default function SuperAdminPlansPage() {
  const [plans, setPlans] = useState([
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: 49,
      annualPrice: 39,
      studentCap: 300,
      activeTenants: 12,
      features: [
        "Up to 300 Students",
        "Teacher Attendance Marker",
        "Gradebook & Report Cards",
        "Email Support",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      monthlyPrice: 149,
      annualPrice: 119,
      studentCap: 1500,
      activeTenants: 11,
      features: [
        "Up to 1,500 Students",
        "White-label Branding & Colors",
        "Online Payment & POS Cashier",
        "Library & Transport Fleet",
        "SMS & FCM Push Alerts",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: 349,
      annualPrice: 279,
      studentCap: 999999,
      activeTenants: 5,
      features: [
        "Unlimited Students & Multi-branch",
        "Custom Root Domain",
        "Biometric Hardware Integration",
        "Dedicated Database & SLA",
        "24/7 Dedicated Account Rep",
      ],
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-900">
            SaaS Subscription Tiers & Feature Gates
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure platform pricing, student quotas, and enterprise entitlements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-heading text-navy-900">{p.name}</h3>
                  <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    {p.activeTenants} Active Schools
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black font-heading text-navy-900">
                    ${p.monthlyPrice}
                  </span>
                  <span className="text-xs text-slate-500">/ mo</span>
                </div>

                <p className="text-xs text-slate-500 mt-1">
                  Quota:{" "}
                  <span className="font-bold text-navy-900">
                    {p.studentCap > 50000 ? "Unlimited" : p.studentCap.toLocaleString()}{" "}
                    Students
                  </span>
                </p>

                <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-700">
                  {p.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => alert(`Edit plan ${p.name}`)}
                  className="w-full btn-outline py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Configure Limits</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
