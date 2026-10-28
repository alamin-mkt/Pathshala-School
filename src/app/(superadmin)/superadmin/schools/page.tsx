"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  School as SchoolIcon,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Trash2,
  Lock,
} from "lucide-react";

interface TenantSchool {
  id: string;
  name: string;
  subdomain: string;
  plan: string;
  students: number;
  status: "Active" | "Suspended" | "Trial";
  createdAt: string;
}

const INITIAL_SCHOOLS: TenantSchool[] = [
  {
    id: "demo-school-greenwood",
    name: "Greenwood International School",
    subdomain: "greenwood",
    plan: "Growth ($149/mo)",
    students: 840,
    status: "Active",
    createdAt: "2026-01-10",
  },
  {
    id: "st-xavier-high",
    name: "St. Xavier Memorial High School",
    subdomain: "stxavier",
    plan: "Enterprise ($349/mo)",
    students: 2150,
    status: "Active",
    createdAt: "2026-02-14",
  },
  {
    id: "oakridge-academy",
    name: "Oakridge Science & Tech Academy",
    subdomain: "oakridge",
    plan: "Starter ($49/mo)",
    students: 290,
    status: "Active",
    createdAt: "2026-04-01",
  },
  {
    id: "heritage-grammar",
    name: "Heritage Grammar School",
    subdomain: "heritage",
    plan: "Growth ($149/mo)",
    students: 650,
    status: "Trial",
    createdAt: "2026-09-15",
  },
];

export default function SuperAdminSchoolsPage() {
  const [schools, setSchools] = useState<TenantSchool[]>(INITIAL_SCHOOLS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSubdomain, setNewSubdomain] = useState("");
  const [newPlan, setNewPlan] = useState("Growth ($149/mo)");

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subdomain.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    const newSchool: TenantSchool = {
      id: newSubdomain.toLowerCase().replace(/[^a-z0-9]/g, ""),
      name: newName,
      subdomain: newSubdomain.toLowerCase().replace(/[^a-z0-9]/g, ""),
      plan: newPlan,
      students: 0,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSchools([newSchool, ...schools]);
    setModalOpen(false);
    setNewName("");
    setNewSubdomain("");
  };

  const toggleStatus = (id: string) => {
    setSchools(
      schools.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: s.status === "Active" ? "Suspended" : "Active",
          };
        }
        return s;
      })
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Institutional Tenants Directory
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage school tenants, provision new environments, and control subscription statuses.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New School</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl shadow-card border border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search school name or subdomain..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>

          <span className="text-xs text-slate-500 font-semibold">
            Showing {filteredSchools.length} of {schools.length} Schools
          </span>
        </div>

        {/* Schools Table */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">School Name</th>
                  <th className="py-3 px-6">Domain / URL</th>
                  <th className="py-3 px-6">Plan</th>
                  <th className="py-3 px-6">Students</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Created Date</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                {filteredSchools.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold">{s.name}</td>
                    <td className="py-4 px-6">
                      <span className="text-slate-500 font-mono text-[11px]">
                        {s.subdomain}.pathshala.app
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{s.plan}</td>
                    <td className="py-4 px-6 font-semibold">{s.students}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          s.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : s.status === "Trial"
                            ? "bg-gold-50 text-gold-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {s.status === "Active" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{s.createdAt}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => toggleStatus(s.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                          s.status === "Active"
                            ? "border-red-200 text-red-600 hover:bg-red-50"
                            : "border-green-200 text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {s.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Create School */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-dropdown p-6 border border-slate-100">
              <h3 className="text-lg font-bold font-heading text-navy-900 mb-4">
                Provision New School Tenant
              </h3>
              <form onSubmit={handleCreateSchool} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                      if (!newSubdomain) {
                        setNewSubdomain(
                          e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
                        );
                      }
                    }}
                    placeholder="e.g. Cambridge Academy"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Subdomain
                  </label>
                  <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                    <input
                      type="text"
                      required
                      value={newSubdomain}
                      onChange={(e) => setNewSubdomain(e.target.value)}
                      placeholder="cambridge"
                      className="w-full px-3 py-2 text-xs focus:outline-none"
                    />
                    <span className="bg-slate-50 px-2.5 py-2 text-xs text-slate-500 font-semibold border-l border-slate-200">
                      .pathshala.app
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Subscription Tier
                  </label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                  >
                    <option value="Starter ($49/mo)">Starter Tier ($49/mo)</option>
                    <option value="Growth ($149/mo)">Growth Tier ($149/mo)</option>
                    <option value="Enterprise ($349/mo)">Enterprise Tier ($349/mo)</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-cta py-2 px-5 text-xs font-bold uppercase tracking-wider"
                  >
                    Deploy Tenant
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
