"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ShieldCheck, Search, Filter } from "lucide-react";

export default function SuperAdminAuditPage() {
  const [logs] = useState([
    {
      id: "log-1",
      timestamp: "2026-10-28 09:42:15 UTC",
      actor: "superadmin@pathshala.app",
      action: "TENANT_PROVISIONED",
      target: "Oakridge Science & Tech Academy (oakridge)",
      ipAddress: "198.51.100.24",
      status: "SUCCESS",
    },
    {
      id: "log-2",
      timestamp: "2026-10-28 08:15:02 UTC",
      actor: "admin@greenwood.edu",
      action: "CUSTOM_CLAIMS_SET",
      target: "uid: teacher_clara (Role: teacher)",
      ipAddress: "203.0.113.195",
      status: "SUCCESS",
    },
    {
      id: "log-3",
      timestamp: "2026-10-27 18:30:44 UTC",
      actor: "system_cron",
      action: "FEE_REMINDERS_DISPATCHED",
      target: "Greenwood International School (42 notifications)",
      ipAddress: "10.0.4.12",
      status: "SUCCESS",
    },
    {
      id: "log-4",
      timestamp: "2026-10-27 14:12:10 UTC",
      actor: "accounts@greenwood.edu",
      action: "PAYMENT_RECORDED",
      target: "Receipt #REC-2026-0891 ($1,250.00)",
      ipAddress: "203.0.113.195",
      status: "SUCCESS",
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-900">
            Platform Security Audit Log
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Immutable system audit records tracking privilege changes, tenant creations, and sensitive financial logs.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 font-sans">
                <tr>
                  <th className="py-3 px-6">Timestamp</th>
                  <th className="py-3 px-6">Actor</th>
                  <th className="py-3 px-6">Action</th>
                  <th className="py-3 px-6">Target Entity</th>
                  <th className="py-3 px-6">IP Address</th>
                  <th className="py-3 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-navy-900">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-6 text-slate-500 text-[11px]">{l.timestamp}</td>
                    <td className="py-3.5 px-6 font-semibold font-sans">{l.actor}</td>
                    <td className="py-3.5 px-6 text-green-700 font-bold">{l.action}</td>
                    <td className="py-3.5 px-6 text-slate-600 font-sans">{l.target}</td>
                    <td className="py-3.5 px-6 text-slate-400 text-[11px]">{l.ipAddress}</td>
                    <td className="py-3.5 px-6 text-right font-sans">
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
