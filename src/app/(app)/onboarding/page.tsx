"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { doc, updateDoc, setDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import {
  School,
  Palette,
  Calendar,
  Layers,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Upload,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { school, profile } = useAuth();
  const schoolId = school?.schoolId || "demo-school-greenwood";

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Form State
  const [schoolName, setSchoolName] = useState(school?.name || "Greenwood International School");
  const [motto, setMotto] = useState(school?.branding?.motto || "Inspiring excellence, cultivating integrity");
  const [phone, setPhone] = useState(school?.branding?.phone || "+1 (800) 555-PATH");
  const [address, setAddress] = useState(school?.branding?.address || "142 Academic Boulevard, New York, NY");
  const [primaryColor, setPrimaryColor] = useState(school?.branding?.primaryColor || "#0B2558");
  const [accentColor, setAccentColor] = useState(school?.branding?.accentColor || "#F0B33A");
  const [ctaColor, setCtaColor] = useState(school?.branding?.ctaColor || "#1F8A3E");

  const [academicYear, setAcademicYear] = useState("2026-2027");
  const [startDate, setStartDate] = useState("2026-08-15");
  const [endDate, setEndDate] = useState("2027-06-20");

  const [classList, setClassList] = useState([
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11 (STEM)",
    "Grade 12 (STEM)",
  ]);

  const [gradingSystem, setGradingSystem] = useState<"letter" | "gpa">("letter");
  const [attendanceMode, setAttendanceMode] = useState<"daily" | "period">("daily");

  const handleFinishOnboarding = async () => {
    setSaving(true);
    try {
      // 1. Update School document
      const schoolRef = doc(db, "schools", schoolId);
      await updateDoc(schoolRef, {
        name: schoolName,
        branding: {
          ...school?.branding,
          motto,
          phone,
          address,
          primaryColor,
          accentColor,
          ctaColor,
        },
        settings: {
          ...school?.settings,
          gradingSystem,
          attendanceMode,
        },
        updatedAt: new Date().toISOString(),
      });

      // 2. Add Academic Year
      const yearRef = doc(db, `schools/${schoolId}/academicYears`, "ay_current");
      await setDoc(yearRef, {
        name: academicYear,
        startDate,
        endDate,
        isCurrent: true,
      });

      // 3. Add Classes
      for (let i = 0; i < classList.length; i++) {
        const cName = classList[i];
        const classRef = doc(db, `schools/${schoolId}/classes`, `class_${i + 1}`);
        await setDoc(classRef, {
          id: `class_${i + 1}`,
          name: cName,
          numericLevel: i + 1,
          academicYearId: "ay_current",
        });

        // Add default Section A
        const sectionRef = doc(db, `schools/${schoolId}/sections`, `sec_${i + 1}_A`);
        await setDoc(sectionRef, {
          id: `sec_${i + 1}_A`,
          classId: `class_${i + 1}`,
          name: "Section A",
          capacity: 40,
        });
      }

      router.push("/admin/dashboard");
    } catch {
      // Offline/Demo fallback: immediately proceed
      router.push("/admin/dashboard");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-3xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>School Provisioning Wizard</span>
          </div>
          <h1 className="text-3xl font-black font-heading text-navy-900 tracking-tight">
            Configure Your School Portal
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Let&apos;s personalize your academic year, branding colors, and classroom structure.
          </p>

          {/* Stepper Tabs */}
          <div className="mt-8 grid grid-cols-5 gap-2 text-center text-xs font-bold">
            {[
              { num: 1, label: "Identity", icon: School },
              { num: 2, label: "Branding", icon: Palette },
              { num: 3, label: "Calendar", icon: Calendar },
              { num: 4, label: "Classes", icon: Layers },
              { num: 5, label: "Grading", icon: Award },
            ].map((s) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <div
                  key={s.num}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    isActive
                      ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                      : isPast
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-white text-slate-400 border-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] font-heading">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-card border border-slate-100">
          {/* Step 1: School Identity */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold font-heading text-navy-900">
                School Identity & Address
              </h3>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Motto / Slogan
                </label>
                <input
                  type="text"
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                  placeholder="e.g. Inspiring excellence, cultivating integrity"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Campus Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Branding & Runtime Colors */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold font-heading text-navy-900">
                  Custom Theming & Colors
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pathshala injects these colors into CSS variables at runtime for complete white-label branding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-2">
                    Primary Brand Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-24 px-2 py-1.5 text-xs font-mono border border-slate-200 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-24 px-2 py-1.5 text-xs font-mono border border-slate-200 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-2">
                    CTA Button Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={ctaColor}
                      onChange={(e) => setCtaColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200"
                    />
                    <input
                      type="text"
                      value={ctaColor}
                      onChange={(e) => setCtaColor(e.target.value)}
                      className="w-24 px-2 py-1.5 text-xs font-mono border border-slate-200 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Real-time Theme Preview Card */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Live Theme Preview
                </span>
                <div
                  className="p-4 rounded-xl text-white flex items-center justify-between"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div>
                    <h4 className="text-sm font-bold font-heading">{schoolName}</h4>
                    <p className="text-[11px] opacity-80">{motto}</p>
                  </div>
                  <button
                    type="button"
                    style={{ backgroundColor: ctaColor }}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm"
                  >
                    Action Button
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Academic Year */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold font-heading text-navy-900">
                Academic Session & Terms
              </h3>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Academic Year Name
                </label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  placeholder="e.g. 2026-2027"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Session Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Session End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Class Structure */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold font-heading text-navy-900">
                  Classes & Grade Levels
                </h3>
                <p className="text-xs text-slate-500">
                  Standard grade levels are pre-filled. You can add or adjust them anytime.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                {classList.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-navy-900 flex items-center justify-between"
                  >
                    <span>{c}</span>
                    <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded font-mono">
                      Sec A
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Grading & Attendance */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold font-heading text-navy-900">
                  Grading Scale & Attendance Policy
                </h3>
                <p className="text-xs text-slate-500">
                  Configure calculation rules for student report cards and daily attendance registers.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-2">
                  Grading Standard
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGradingSystem("letter")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      gradingSystem === "letter"
                        ? "border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600/20"
                        : "border-slate-200 hover:border-slate-300 text-navy-900"
                    }`}
                  >
                    <span className="font-bold text-xs block">Letter Grade (A+, A, B, C, F)</span>
                    <span className="text-[11px] text-slate-500">Ideal for primary & secondary systems</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGradingSystem("gpa")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      gradingSystem === "gpa"
                        ? "border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600/20"
                        : "border-slate-200 hover:border-slate-300 text-navy-900"
                    }`}
                  >
                    <span className="font-bold text-xs block">GPA Scale (4.0 / 5.0)</span>
                    <span className="text-[11px] text-slate-500">Standard weighted credit point system</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-2">
                  Attendance Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendanceMode("daily")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      attendanceMode === "daily"
                        ? "border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600/20"
                        : "border-slate-200 hover:border-slate-300 text-navy-900"
                    }`}
                  >
                    <span className="font-bold text-xs block">Daily Bulk Attendance</span>
                    <span className="text-[11px] text-slate-500">Class teacher marks morning roll call once daily</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendanceMode("period")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      attendanceMode === "period"
                        ? "border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600/20"
                        : "border-slate-200 hover:border-slate-300 text-navy-900"
                    }`}
                  >
                    <span className="font-bold text-xs block">Period-Wise Attendance</span>
                    <span className="text-[11px] text-slate-500">Each subject teacher marks attendance per period</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-outline text-xs font-semibold py-2.5 px-5 flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-6 flex items-center gap-2 shadow-sm"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishOnboarding}
                disabled={saving}
                className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-7 flex items-center gap-2 shadow-md"
              >
                {saving ? "Provisioning..." : "Launch School Workspace"}
                <CheckCircle2 className="w-4 h-4 text-gold-300" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
