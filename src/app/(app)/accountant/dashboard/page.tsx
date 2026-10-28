"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Wallet, DollarSign, Receipt, CreditCard, ArrowRight, TrendingUp } from "lucide-react";

export default function AccountantDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="section-eyebrow">Financial Accounts</span>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Accountant Cashier & Ledger
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily collections, counter POS receipts, and invoice balance tracking.
            </p>
          </div>

          <Link
            href="/admin/fees"
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
          >
            <CreditCard className="w-4 h-4" />
            <span>Open POS Counter</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Today&apos;s Collection</span>
            <p className="text-3xl font-black font-heading text-green-700 mt-1">$4,850.00</p>
            <p className="text-[11px] text-slate-500 mt-1">6 invoices settled</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Monthly Inflow</span>
            <p className="text-3xl font-black font-heading text-navy-900 mt-1">$48,250.00</p>
            <p className="text-[11px] text-green-700 font-semibold mt-1">+14% vs last month</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Pending Dues</span>
            <p className="text-3xl font-black font-heading text-red-600 mt-1">$6,450.00</p>
            <p className="text-[11px] text-slate-500 mt-1">12 student accounts overdue</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Recent Counter Receipts Issued
            </h3>
            <Link href="/admin/fees" className="text-xs font-bold text-green-700 hover:underline">
              View All Invoices
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { id: "REC-2026-0891", student: "Alex Turner", amount: "$1,250.00", method: "Cash", time: "10:15 AM" },
              { id: "REC-2026-0890", student: "Sophia Martinez", amount: "$950.00", method: "bKash", time: "09:42 AM" },
              { id: "REC-2026-0889", student: "Maya Rostova", amount: "$800.00", method: "Bank Transfer", time: "09:05 AM" },
            ].map((r, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-navy-900">{r.student}</span>
                  <span className="text-slate-400 font-mono text-[11px] ml-2">({r.id})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-green-700">{r.amount}</span>
                  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] text-slate-600">
                    {r.method}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
