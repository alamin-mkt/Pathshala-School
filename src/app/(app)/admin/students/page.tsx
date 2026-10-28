"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  GraduationCap,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  IdCard,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import jsPDF from "jspdf";

interface StudentRecord {
  id: string;
  admissionNo: string;
  rollNo: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  bloodGroup: string;
  class: string;
  section: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  status: "Active" | "Transferred" | "Alumni";
}

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "stu-1",
    admissionNo: "ADM-2026-001",
    rollNo: "101",
    name: "Alex Turner",
    gender: "Male",
    dob: "2010-04-12",
    bloodGroup: "O+",
    class: "Grade 10",
    section: "A",
    guardianName: "Elizabeth Turner",
    guardianPhone: "+1 (555) 234-5678",
    guardianEmail: "elizabeth.turner@gmail.com",
    address: "742 Evergreen Terrace, New York",
    status: "Active",
  },
  {
    id: "stu-2",
    admissionNo: "ADM-2026-002",
    rollNo: "102",
    name: "Maya Rostova",
    gender: "Female",
    dob: "2010-09-18",
    bloodGroup: "A+",
    class: "Grade 10",
    section: "A",
    guardianName: "Elena Rostova",
    guardianPhone: "+1 (555) 345-6789",
    guardianEmail: "elena.rostova@gmail.com",
    address: "12 Riverside Drive, New York",
    status: "Active",
  },
  {
    id: "stu-3",
    admissionNo: "ADM-2026-003",
    rollNo: "103",
    name: "Liam Chen",
    gender: "Male",
    dob: "2009-11-05",
    bloodGroup: "B+",
    class: "Grade 11",
    section: "STEM",
    guardianName: "David Chen",
    guardianPhone: "+1 (555) 456-7890",
    guardianEmail: "david.chen@gmail.com",
    address: "88 Lexington Avenue, New York",
    status: "Active",
  },
  {
    id: "stu-4",
    admissionNo: "ADM-2026-004",
    rollNo: "104",
    name: "Sophia Martinez",
    gender: "Female",
    dob: "2012-02-24",
    bloodGroup: "AB+",
    class: "Grade 8",
    section: "B",
    guardianName: "Carlos Martinez",
    guardianPhone: "+1 (555) 567-8901",
    guardianEmail: "carlos.m@gmail.com",
    address: "350 5th Avenue, New York",
    status: "Active",
  },
  {
    id: "stu-5",
    admissionNo: "ADM-2026-005",
    rollNo: "105",
    name: "Tariq Al-Mansoor",
    gender: "Male",
    dob: "2015-06-15",
    bloodGroup: "O+",
    class: "Grade 5",
    section: "A",
    guardianName: "Sarah Al-Mansoor",
    guardianPhone: "+1 (555) 678-9012",
    guardianEmail: "sarah.mansoor@gmail.com",
    address: "220 Central Park South, New York",
    status: "Active",
  },
];

export default function StudentsDirectoryPage() {
  const { school } = useAuth();
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState<StudentRecord | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formGender, setFormGender] = useState<"Male" | "Female" | "Other">("Male");
  const [formDob, setFormDob] = useState("2011-05-10");
  const [formBlood, setFormBlood] = useState("O+");
  const [formClass, setFormClass] = useState("Grade 10");
  const [formSection, setFormSection] = useState("A");
  const [formRoll, setFormRoll] = useState("106");
  const [formGuardian, setFormGuardian] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAddress, setFormAddress] = useState("");

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.includes(search);
    const matchesClass = selectedClass === "All" || s.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: StudentRecord = {
      id: `stu-${Date.now()}`,
      admissionNo: `ADM-2026-${(students.length + 1).toString().padStart(3, "0")}`,
      rollNo: formRoll || `${100 + students.length + 1}`,
      name: formName,
      gender: formGender,
      dob: formDob,
      bloodGroup: formBlood,
      class: formClass,
      section: formSection,
      guardianName: formGuardian,
      guardianPhone: formPhone,
      guardianEmail: formEmail,
      address: formAddress,
      status: "Active",
    };

    setStudents([newStudent, ...students]);
    setAddModalOpen(false);
    // Reset form
    setFormName("");
    setFormGuardian("");
    setFormPhone("");
    setFormEmail("");
    setFormAddress("");
  };

  // Generate Student ID Card PDF
  const downloadIdCardPdf = (student: StudentRecord) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [85.6, 54], // Standard CR80 ID Card dimensions (vertical)
    });

    // Navy Header Background
    doc.setFillColor(11, 37, 88); // #0B2558
    doc.rect(0, 0, 54, 24, "F");

    // Gold Accent Stripe
    doc.setFillColor(240, 179, 58); // #F0B33A
    doc.rect(0, 24, 54, 2, "F");

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(school?.name || "PATHSHALA SCHOOL", 27, 8, { align: "center" });

    doc.setFontSize(5.5);
    doc.setFont("helvetica", "normal");
    doc.text("STUDENT IDENTITY CARD", 27, 13, { align: "center" });
    doc.text("SESSION 2026-2027", 27, 17, { align: "center" });

    // Photo Box Placeholder
    doc.setFillColor(240, 245, 250);
    doc.roundedRect(17, 28, 20, 22, 2, 2, "F");
    doc.setDrawColor(31, 138, 62); // Green border
    doc.setLineWidth(0.5);
    doc.roundedRect(17, 28, 20, 22, 2, 2, "D");

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(5);
    doc.text("PHOTO", 27, 40, { align: "center" });

    // Student Name
    doc.setTextColor(11, 37, 88);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(student.name, 27, 54, { align: "center" });

    // Details Grid
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(71, 85, 105);

    const startY = 59;
    const lineSpacing = 3.6;

    doc.text(`Adm No: ${student.admissionNo}`, 6, startY);
    doc.text(`Roll No: ${student.rollNo}`, 32, startY);

    doc.text(`Class: ${student.class} - ${student.section}`, 6, startY + lineSpacing);
    doc.text(`Blood: ${student.bloodGroup}`, 32, startY + lineSpacing);

    doc.text(`DOB: ${student.dob}`, 6, startY + lineSpacing * 2);
    doc.text(`Emergency: ${student.guardianPhone}`, 6, startY + lineSpacing * 3);

    // Green Footer Bar with Barcode Mock
    doc.setFillColor(31, 138, 62); // #1F8A3E
    doc.rect(0, 78, 54, 7.6, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.5);
    doc.text("AUTHORIZED SIGNATURE", 27, 82, { align: "center" });

    doc.save(`${student.name.replace(/\s+/g, "_")}_ID_Card.pdf`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Students Roster & Admission Records
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Active student directory, parent contacts, profile dossiers, and vector ID cards.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                // Export CSV
                const csvContent =
                  "data:text/csv;charset=utf-8," +
                  ["AdmissionNo,RollNo,Name,Class,Section,BloodGroup,Guardian,Phone"]
                    .concat(
                      students.map(
                        (s) =>
                          `${s.admissionNo},${s.rollNo},"${s.name}",${s.class},${s.section},${s.bloodGroup},"${s.guardianName}",${s.guardianPhone}`
                      )
                    )
                    .join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `Students_Roster_${Date.now()}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="btn-outline py-2.5 px-4 text-xs font-semibold flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setAddModalOpen(true)}
              className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Admit Student</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl shadow-card border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, admission no, or roll..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Grade:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-semibold"
              >
                <option value="All">All Grades</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 5">Grade 5</option>
              </select>
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              {filteredStudents.length} Students
            </span>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Adm No</th>
                  <th className="py-3.5 px-6">Roll</th>
                  <th className="py-3.5 px-6">Student Name</th>
                  <th className="py-3.5 px-6">Class & Section</th>
                  <th className="py-3.5 px-6">Gender / DOB</th>
                  <th className="py-3.5 px-6">Parent / Emergency Contact</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500 font-bold">
                      {st.admissionNo}
                    </td>
                    <td className="py-3.5 px-6 font-bold">{st.rollNo}</td>
                    <td className="py-3.5 px-6 font-bold text-navy-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-navy-100 text-navy-800 font-bold flex items-center justify-center text-[11px]">
                          {st.name.charAt(0)}
                        </div>
                        <span>{st.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-semibold">{st.class}</span> - Sec {st.section}
                    </td>
                    <td className="py-3.5 px-6 text-slate-500 text-[11px]">
                      {st.gender} &bull; {st.dob}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="text-[11px]">
                        <p className="font-semibold text-navy-900">{st.guardianName}</p>
                        <p className="text-slate-400 font-mono">{st.guardianPhone}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-green-700">
                        <CheckCircle2 className="w-3 h-3" />
                        {st.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-1.5">
                      <button
                        onClick={() => downloadIdCardPdf(st)}
                        title="Download ID Card (PDF)"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                      >
                        <IdCard className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setViewStudent(st)}
                        title="View Full Profile"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add New Admission */}
        {addModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-dropdown overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
              <div className="p-6 bg-navy-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-heading">Admit New Student</h3>
                  <p className="text-xs text-slate-300">
                    Register academic details, guardian contacts, and allocate roll number.
                  </p>
                </div>
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Maya Rostova"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Gender
                    </label>
                    <select
                      value={formGender}
                      onChange={(e: any) => setFormGender(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      required
                      value={formDob}
                      onChange={(e) => setFormDob(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Blood Group
                    </label>
                    <select
                      value={formBlood}
                      onChange={(e) => setFormBlood(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formRoll}
                      onChange={(e) => setFormRoll(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Class</label>
                    <select
                      value={formClass}
                      onChange={(e) => setFormClass(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 5">Grade 5</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Section</label>
                    <select
                      value={formSection}
                      onChange={(e) => setFormSection(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="STEM">Section STEM</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold font-heading text-navy-900 mb-2">
                    Parent / Guardian Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Parent Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formGuardian}
                        onChange={(e) => setFormGuardian(e.target.value)}
                        placeholder="Rachel Rostova"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="142 Academic Blvd, New York"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-cta py-2 px-6 text-xs font-bold uppercase tracking-wider"
                  >
                    Enroll Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: View Student Profile */}
        {viewStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-dropdown overflow-hidden border border-slate-100 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-white font-black text-lg flex items-center justify-center">
                    {viewStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-navy-900">
                      {viewStudent.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {viewStudent.admissionNo} &bull; Roll #{viewStudent.rollNo}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setViewStudent(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-navy-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-navy-900">Grade & Section:</span>
                  <span>
                    {viewStudent.class} - Section {viewStudent.section}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-navy-900">Blood Group:</span>
                  <span>{viewStudent.bloodGroup}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-navy-900">Date of Birth:</span>
                  <span>{viewStudent.dob}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-navy-900">Primary Guardian:</span>
                  <span>{viewStudent.guardianName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-navy-900">Emergency Phone:</span>
                  <span className="font-mono text-green-700">{viewStudent.guardianPhone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-navy-900">Guardian Email:</span>
                  <span>{viewStudent.guardianEmail}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-navy-900">Address:</span>
                  <span>{viewStudent.address}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => downloadIdCardPdf(viewStudent)}
                  className="w-full btn-cta py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <IdCard className="w-4 h-4" />
                  <span>Download ID Card (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
