"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  CheckCircle2,
  Send,
  X,
  UserCheck,
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: "teacher" | "principal" | "accountant" | "librarian" | "receptionist";
  designation: string;
  email: string;
  phone: string;
  qualification: string;
  subjects?: string[];
  status: "Active" | "Invited" | "On Leave";
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: "stf-1",
    name: "Dr. Arthur Pendelton",
    role: "principal",
    designation: "Executive Principal",
    email: "principal@greenwood.edu",
    phone: "+1 (800) 555-0101",
    qualification: "Ph.D. Educational Leadership, Harvard",
    status: "Active",
  },
  {
    id: "stf-2",
    name: "Ms. Clara Higgins",
    role: "teacher",
    designation: "Head of Mathematics",
    email: "clara.math@greenwood.edu",
    phone: "+1 (800) 555-0102",
    qualification: "M.Sc. Pure Mathematics, Oxford",
    subjects: ["Calculus", "Algebra II", "Geometry"],
    status: "Active",
  },
  {
    id: "stf-3",
    name: "Mr. Lucas Bennett",
    role: "teacher",
    designation: "Senior Science Lecturer",
    email: "lucas.physics@greenwood.edu",
    phone: "+1 (800) 555-0103",
    qualification: "M.S. Applied Physics, Stanford",
    subjects: ["Physics", "Mechanics", "Robotics"],
    status: "Active",
  },
  {
    id: "stf-4",
    name: "Robert Vance",
    role: "accountant",
    designation: "Chief Financial Accountant",
    email: "accounts@greenwood.edu",
    phone: "+1 (800) 555-0104",
    qualification: "CPA, B.Com Finance",
    status: "Active",
  },
  {
    id: "stf-5",
    name: "Eleanor Brooks",
    role: "librarian",
    designation: "Head Librarian & Archivist",
    email: "library@greenwood.edu",
    phone: "+1 (800) 555-0105",
    qualification: "Master of Library Science (MLS)",
    status: "Active",
  },
];

export default function StaffDirectoryPage() {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<StaffMember["role"]>("teacher");
  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [phone, setPhone] = useState("");
  const [subjectText, setSubjectText] = useState("");

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff: StaffMember = {
      id: `stf-${Date.now()}`,
      name,
      email,
      role,
      designation: designation || "Faculty Member",
      phone: phone || "+1 (800) 555-0000",
      qualification: qualification || "Degree in Education",
      subjects: subjectText ? subjectText.split(",").map((s) => s.trim()) : undefined,
      status: "Invited",
    };
    setStaff([...staff, newStaff]);
    setModalOpen(false);
    // Reset
    setName("");
    setEmail("");
    setDesignation("");
    setQualification("");
    setPhone("");
    setSubjectText("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Staff, Faculty & Role Assignments
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage teaching faculty, accountants, and staff privileges backed by Firebase Custom Claims.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Invite Faculty Member</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-card border border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty name, email, or designation..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>
          <span className="text-xs text-slate-500 font-semibold">{filtered.length} Staff</span>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Faculty Name</th>
                  <th className="py-3.5 px-6">Assigned Role</th>
                  <th className="py-3.5 px-6">Official Designation</th>
                  <th className="py-3.5 px-6">Contact Email & Phone</th>
                  <th className="py-3.5 px-6">Qualification</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-navy-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-green-50 text-green-700 font-bold flex items-center justify-center text-[11px]">
                          {s.name.charAt(0)}
                        </div>
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="capitalize px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-navy-50 text-navy-900">
                        {s.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">{s.designation}</td>
                    <td className="py-4 px-6">
                      <div className="text-[11px]">
                        <p className="font-semibold text-navy-900">{s.email}</p>
                        <p className="text-slate-400 font-mono">{s.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-[11px]">{s.qualification}</td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          s.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gold-50 text-gold-700"
                        }`}
                      >
                        {s.status === "Active" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Mail className="w-3 h-3" />
                        )}
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Invite Staff */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-dropdown overflow-hidden border border-slate-100 p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-lg font-bold font-heading text-navy-900">
                  Invite Faculty or Staff Member
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-navy-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Arthur Pendelton"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Role / Privilege *
                    </label>
                    <select
                      value={role}
                      onChange={(e: any) => setRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="teacher">Teacher / Faculty</option>
                      <option value="principal">Principal</option>
                      <option value="accountant">Accountant</option>
                      <option value="librarian">Librarian</option>
                      <option value="receptionist">Receptionist</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Official Designation
                    </label>
                    <input
                      type="text"
                      required
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Senior Math Lecturer"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="faculty@greenwood.edu"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (800) 555-0000"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Qualifications & Degree
                  </label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="M.Sc. Mathematics, Oxford"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-cta py-2 px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Invitation</span>
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
