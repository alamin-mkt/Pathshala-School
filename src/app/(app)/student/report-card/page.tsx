"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Award, Download, CheckCircle2 } from "lucide-react";
import jsPDF from "jspdf";

export default function StudentReportCardPage() {
  const { school } = useAuth();

  const studentData = {
    name: "Alex Turner",
    rollNo: "101",
    class: "Grade 10 - Section A",
    overallGpa: 3.88,
    overallGrade: "A+",
    rank: 1,
    remarks: "Outstanding academic performance with exceptional mathematical aptitude.",
    subjects: [
      { name: "Pure Mathematics", marks: 94, maxMarks: 100, grade: "A+", gpa: 4.0 },
      { name: "Physics & Mechanics", marks: 88, maxMarks: 100, grade: "A", gpa: 3.7 },
      { name: "Chemistry & Biology", marks: 91, maxMarks: 100, grade: "A+", gpa: 4.0 },
      { name: "English Literature", marks: 86, maxMarks: 100, grade: "A", gpa: 3.7 },
      { name: "Computer Science & AI", marks: 96, maxMarks: 100, grade: "A+", gpa: 4.0 },
    ],
  };

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFillColor(11, 37, 88);
    doc.rect(0, 0, 210, 36, "F");

    doc.setFillColor(240, 179, 58);
    doc.rect(0, 36, 210, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(school?.name || "GREENWOOD INTERNATIONAL SCHOOL", 105, 14, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("OFFICIAL ACADEMIC TRANSCRIPT & PROGRESS REPORT", 105, 21, { align: "center" });
    doc.text("FIRST SEMESTER EXAMINATION 2026-2027", 105, 28, { align: "center" });

    doc.setFillColor(245, 247, 250);
    doc.roundedRect(15, 45, 180, 28, 3, 3, "F");
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(15, 45, 180, 28, 3, 3, "D");

    doc.setTextColor(11, 37, 88);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.text(`Student Name: ${studentData.name}`, 22, 54);
    doc.text(`Class & Section: ${studentData.class}`, 22, 61);
    doc.text(`Roll Number: ${studentData.rollNo}`, 22, 68);

    doc.text(`Class Rank: #${studentData.rank}`, 120, 54);
    doc.text(`GPA: ${studentData.overallGpa.toFixed(2)}`, 120, 61);
    doc.text(`Grade: ${studentData.overallGrade}`, 120, 68);

    let tableY = 82;
    doc.setFillColor(11, 37, 88);
    doc.rect(15, tableY, 180, 8, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text("Subject Description", 20, tableY + 5.5);
    doc.text("Marks", 135, tableY + 5.5, { align: "center" });
    doc.text("Grade", 160, tableY + 5.5, { align: "center" });
    doc.text("GPA", 182, tableY + 5.5, { align: "center" });

    tableY += 8;
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);

    studentData.subjects.forEach((subj, i) => {
      doc.rect(15, tableY, 180, 8, "D");
      doc.text(subj.name, 20, tableY + 5.5);
      doc.text(`${subj.marks}/${subj.maxMarks}`, 135, tableY + 5.5, { align: "center" });
      doc.text(subj.grade, 160, tableY + 5.5, { align: "center" });
      doc.text(subj.gpa.toFixed(1), 182, tableY + 5.5, { align: "center" });
      tableY += 8;
    });

    tableY += 12;
    doc.setFont("helvetica", "italic");
    doc.setTextColor(71, 85, 105);
    doc.text(`Remarks: "${studentData.remarks}"`, 20, tableY);

    doc.save("Alex_Turner_Report_Card.pdf");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Academic Report Card & Transcript
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Certified academic evaluation for the First Semester Examination 2026-2027.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-5 flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF</span>
          </button>
        </div>

        {/* Visual Report Card Preview */}
        <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-navy-900">{studentData.name}</h2>
              <p className="text-xs text-slate-500">
                {studentData.class} &bull; Roll #{studentData.rollNo}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-heading text-green-700">
                GPA {studentData.overallGpa}
              </span>
              <p className="text-xs font-bold text-gold-600">Grade {studentData.overallGrade} &bull; Rank #1</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Course Grade Breakdown
            </h3>
            {studentData.subjects.map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-semibold"
              >
                <span className="text-navy-900">{s.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500">{s.marks} / {s.maxMarks}</span>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold">
                    {s.grade}
                  </span>
                  <span className="font-mono text-navy-900">{s.gpa.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
