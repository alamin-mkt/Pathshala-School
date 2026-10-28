"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Award,
  Calendar,
  Download,
  Plus,
  CheckCircle2,
  FileText,
  Search,
  Filter,
  Star,
  Printer,
} from "lucide-react";
import jsPDF from "jspdf";

interface ExamRecord {
  id: string;
  title: string;
  session: string;
  startDate: string;
  endDate: string;
  status: "Scheduled" | "Ongoing" | "Published";
}

interface StudentGrade {
  studentId: string;
  name: string;
  rollNo: string;
  class: string;
  subjects: {
    name: string;
    marks: number;
    maxMarks: number;
    grade: string;
    gpa: number;
  }[];
  totalMarks: number;
  maxTotal: number;
  overallGpa: number;
  overallGrade: string;
  rank: number;
  remarks: string;
}

const INITIAL_EXAMS: ExamRecord[] = [
  { id: "ex-1", title: "First Semester Final Examination 2026", session: "2026-2027", startDate: "2026-10-10", endDate: "2026-10-22", status: "Published" },
  { id: "ex-2", title: "Mid-Term Assessment - STEM & Humanities", session: "2026-2027", startDate: "2026-11-15", endDate: "2026-11-20", status: "Scheduled" },
];

const INITIAL_GRADES: StudentGrade[] = [
  {
    studentId: "stu-1",
    name: "Alex Turner",
    rollNo: "101",
    class: "Grade 10 - Section A",
    subjects: [
      { name: "Pure Mathematics", marks: 94, maxMarks: 100, grade: "A+", gpa: 4.0 },
      { name: "Physics & Mechanics", marks: 88, maxMarks: 100, grade: "A", gpa: 3.7 },
      { name: "Chemistry & Biology", marks: 91, maxMarks: 100, grade: "A+", gpa: 4.0 },
      { name: "English Literature", marks: 86, maxMarks: 100, grade: "A", gpa: 3.7 },
      { name: "Computer Science & AI", marks: 96, maxMarks: 100, grade: "A+", gpa: 4.0 },
    ],
    totalMarks: 455,
    maxTotal: 500,
    overallGpa: 3.88,
    overallGrade: "A+",
    rank: 1,
    remarks: "Outstanding academic performance with exceptional mathematical aptitude.",
  },
  {
    studentId: "stu-2",
    name: "Maya Rostova",
    rollNo: "102",
    class: "Grade 10 - Section A",
    subjects: [
      { name: "Pure Mathematics", marks: 90, maxMarks: 100, grade: "A+", gpa: 4.0 },
      { name: "Physics & Mechanics", marks: 84, maxMarks: 100, grade: "A-", gpa: 3.3 },
      { name: "Chemistry & Biology", marks: 89, maxMarks: 100, grade: "A", gpa: 3.7 },
      { name: "English Literature", marks: 93, maxMarks: 100, grade: "A+", gpa: 4.0 },
      { name: "Computer Science & AI", marks: 92, maxMarks: 100, grade: "A+", gpa: 4.0 },
    ],
    totalMarks: 448,
    maxTotal: 500,
    overallGpa: 3.8,
    overallGrade: "A+",
    rank: 2,
    remarks: "Exemplary commitment, articulate writing, and collaborative teamwork.",
  },
  {
    studentId: "stu-3",
    name: "Liam Chen",
    rollNo: "103",
    class: "Grade 10 - Section A",
    subjects: [
      { name: "Pure Mathematics", marks: 82, maxMarks: 100, grade: "B+", gpa: 3.3 },
      { name: "Physics & Mechanics", marks: 85, maxMarks: 100, grade: "A", gpa: 3.7 },
      { name: "Chemistry & Biology", marks: 80, maxMarks: 100, grade: "B+", gpa: 3.3 },
      { name: "English Literature", marks: 78, maxMarks: 100, grade: "B", gpa: 3.0 },
      { name: "Computer Science & AI", marks: 95, maxMarks: 100, grade: "A+", gpa: 4.0 },
    ],
    totalMarks: 420,
    maxTotal: 500,
    overallGpa: 3.46,
    overallGrade: "A-",
    rank: 3,
    remarks: "Good consistency. Recommended extra focus on literary analysis.",
  },
];

export default function ExaminationsPage() {
  const { school } = useAuth();
  const [activeTab, setActiveTab] = useState<"grades" | "schedules">("grades");
  const [grades, setGrades] = useState<StudentGrade[]>(INITIAL_GRADES);
  const [exams, setExams] = useState<ExamRecord[]>(INITIAL_EXAMS);
  const [search, setSearch] = useState("");

  const filteredGrades = grades.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) || g.rollNo.includes(search)
  );

  // Generate Official Academic Report Card PDF
  const downloadReportCardPdf = (student: StudentGrade) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Top Brand Header Banner (Navy)
    doc.setFillColor(11, 37, 88); // #0B2558
    doc.rect(0, 0, 210, 36, "F");

    // Gold decorative stripe
    doc.setFillColor(240, 179, 58); // #F0B33A
    doc.rect(0, 36, 210, 3, "F");

    // Header Typography
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(school?.name || "GREENWOOD INTERNATIONAL SCHOOL", 105, 14, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("OFFICIAL ACADEMIC TRANSCRIPT & PROGRESS REPORT", 105, 21, { align: "center" });
    doc.text("FIRST SEMESTER EXAMINATION 2026-2027", 105, 28, { align: "center" });

    // Student Information Block
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(15, 45, 180, 28, 3, 3, "F");
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(15, 45, 180, 28, 3, 3, "D");

    doc.setTextColor(11, 37, 88);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.text(`Student Name: ${student.name}`, 22, 54);
    doc.text(`Class & Section: ${student.class}`, 22, 61);
    doc.text(`Roll Number: ${student.rollNo}`, 22, 68);

    doc.text(`Class Rank: #${student.rank} of 42`, 120, 54);
    doc.text(`Cumulative GPA: ${student.overallGpa.toFixed(2)}`, 120, 61);
    doc.text(`Overall Letter Grade: ${student.overallGrade}`, 120, 68);

    // Subject Marks Table Header
    let tableY = 82;
    doc.setFillColor(11, 37, 88);
    doc.rect(15, tableY, 180, 8, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text("Subject Description", 20, tableY + 5.5);
    doc.text("Max Marks", 105, tableY + 5.5, { align: "center" });
    doc.text("Marks Obtained", 135, tableY + 5.5, { align: "center" });
    doc.text("Grade", 160, tableY + 5.5, { align: "center" });
    doc.text("Grade Point", 182, tableY + 5.5, { align: "center" });

    // Table Rows
    tableY += 8;
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);

    student.subjects.forEach((subj, i) => {
      if (i % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(15, tableY, 180, 8, "F");
      }
      doc.rect(15, tableY, 180, 8, "D");

      doc.text(subj.name, 20, tableY + 5.5);
      doc.text(subj.maxMarks.toString(), 105, tableY + 5.5, { align: "center" });
      doc.text(subj.marks.toString(), 135, tableY + 5.5, { align: "center" });
      doc.text(subj.grade, 160, tableY + 5.5, { align: "center" });
      doc.text(subj.gpa.toFixed(1), 182, tableY + 5.5, { align: "center" });

      tableY += 8;
    });

    // Total Row
    doc.setFillColor(232, 245, 236); // #E8F5EC
    doc.rect(15, tableY, 180, 9, "F");
    doc.rect(15, tableY, 180, 9, "D");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 138, 62); // Green
    doc.text("TOTAL AGGREGATE", 20, tableY + 6);
    doc.text(student.maxTotal.toString(), 105, tableY + 6, { align: "center" });
    doc.text(student.totalMarks.toString(), 135, tableY + 6, { align: "center" });
    doc.text(student.overallGrade, 160, tableY + 6, { align: "center" });
    doc.text(student.overallGpa.toFixed(2), 182, tableY + 6, { align: "center" });

    // Teacher Remarks Box
    tableY += 16;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(15, tableY, 180, 22, 2, 2, "D");

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(11, 37, 88);
    doc.text("FACULTY & PRINCIPAL APPRAISAL:", 20, tableY + 6);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`"${student.remarks}"`, 20, tableY + 14);

    // Signatures
    tableY += 38;
    doc.setDrawColor(148, 163, 184);
    doc.line(25, tableY, 75, tableY);
    doc.line(135, tableY, 185, tableY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(11, 37, 88);
    doc.text("CLASS TEACHER", 50, tableY + 5, { align: "center" });
    doc.text("HEAD OF SCHOOL / PRINCIPAL", 160, tableY + 5, { align: "center" });

    // Footer Accreditation Note
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text(
      "This document is a certified official academic record issued by Pathshala Cloud SaaS. Verified digital transcript.",
      105,
      285,
      { align: "center" }
    );

    doc.save(`${student.name.replace(/\s+/g, "_")}_Report_Card.pdf`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Examinations, Marks & Report Cards
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Gradebook entries, GPA calculations, rank lists, and downloadable vector PDF report cards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("grades")}
              className={`pill-tab ${activeTab === "grades" ? "pill-tab-active" : "pill-tab-inactive"}`}
            >
              Gradebook & Transcripts
            </button>
            <button
              onClick={() => setActiveTab("schedules")}
              className={`pill-tab ${activeTab === "schedules" ? "pill-tab-active" : "pill-tab-inactive"}`}
            >
              Exam Schedules
            </button>
          </div>
        </div>

        {activeTab === "grades" ? (
          <div className="space-y-4">
            {/* Search Filter */}
            <div className="bg-white p-4 rounded-xl shadow-card border border-slate-100 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student by name or roll..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                />
              </div>

              <span className="text-xs text-slate-500 font-semibold">
                Class: <strong className="text-navy-900">Grade 10 - Section A</strong>
              </span>
            </div>

            {/* Grades Table */}
            <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                    <tr>
                      <th className="py-3.5 px-6">Rank</th>
                      <th className="py-3.5 px-6">Roll</th>
                      <th className="py-3.5 px-6">Student Name</th>
                      <th className="py-3.5 px-6">Total Marks</th>
                      <th className="py-3.5 px-6">GPA</th>
                      <th className="py-3.5 px-6">Grade</th>
                      <th className="py-3.5 px-6 text-right">Official Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                    {filteredGrades.map((g) => (
                      <tr key={g.studentId} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-bold text-green-700">#{g.rank}</td>
                        <td className="py-4 px-6 font-bold">{g.rollNo}</td>
                        <td className="py-4 px-6 font-bold text-navy-900">{g.name}</td>
                        <td className="py-4 px-6">
                          <span className="font-bold">{g.totalMarks}</span> / {g.maxTotal}
                        </td>
                        <td className="py-4 px-6 font-bold text-navy-900">
                          {g.overallGpa.toFixed(2)}
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-green-50 text-green-800">
                            {g.overallGrade}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => downloadReportCardPdf(g)}
                            className="btn-cta py-1.5 px-3.5 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Report Card (PDF)</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Schedules Tab */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((ex) => (
              <div
                key={ex.id}
                className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      {ex.status}
                    </span>
                    <h3 className="text-base font-bold font-heading text-navy-900 mt-2">
                      {ex.title}
                    </h3>
                  </div>
                  <Calendar className="w-5 h-5 text-gold-500" />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                  <p>
                    <strong>Session:</strong> {ex.session}
                  </p>
                  <p>
                    <strong>Duration:</strong> {ex.startDate} &mdash; {ex.endDate}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={() => setActiveTab("grades")}
                    className="btn-primary py-1.5 px-4 text-xs font-semibold"
                  >
                    View Marks & Ranking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
