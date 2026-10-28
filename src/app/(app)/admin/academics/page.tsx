"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Calendar,
  Layers,
  BookOpen,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  X,
} from "lucide-react";

interface TimetableSlot {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  period: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  class: string;
}

const INITIAL_SLOTS: TimetableSlot[] = [
  { id: "s1", day: "Monday", period: 1, time: "08:30 - 09:15", subject: "Pure Mathematics", teacher: "Ms. Clara Higgins", room: "Room 101", class: "Grade 10" },
  { id: "s2", day: "Monday", period: 2, time: "09:20 - 10:05", subject: "Physics & Mechanics", teacher: "Mr. Lucas Bennett", room: "Lab 3", class: "Grade 10" },
  { id: "s3", day: "Monday", period: 3, time: "10:20 - 11:05", subject: "English Literature", teacher: "Ms. Evelyn Reed", room: "Room 101", class: "Grade 10" },
  { id: "s4", day: "Tuesday", period: 1, time: "08:30 - 09:15", subject: "Chemistry & Biology", teacher: "Mr. Lucas Bennett", room: "Lab 2", class: "Grade 10" },
  { id: "s5", day: "Tuesday", period: 2, time: "09:20 - 10:05", subject: "Pure Mathematics", teacher: "Ms. Clara Higgins", room: "Room 101", class: "Grade 10" },
  { id: "s6", day: "Wednesday", period: 1, time: "08:30 - 09:15", subject: "Computer Science & AI", teacher: "Dr. Marcus Vance", room: "Computer Lab 1", class: "Grade 10" },
  { id: "s7", day: "Wednesday", period: 2, time: "09:20 - 10:05", subject: "History & Civics", teacher: "Ms. Evelyn Reed", room: "Room 101", class: "Grade 10" },
  { id: "s8", day: "Thursday", period: 1, time: "08:30 - 09:15", subject: "Pure Mathematics", teacher: "Ms. Clara Higgins", room: "Room 101", class: "Grade 10" },
  { id: "s9", day: "Thursday", period: 2, time: "09:20 - 10:05", subject: "Physics & Mechanics", teacher: "Mr. Lucas Bennett", room: "Lab 3", class: "Grade 10" },
  { id: "s10", day: "Friday", period: 1, time: "08:30 - 09:15", subject: "Physical Education", teacher: "Coach David", room: "Athletics Field", class: "Grade 10" },
  { id: "s11", day: "Friday", period: 2, time: "09:20 - 10:05", subject: "Art & Studio", teacher: "Ms. Evelyn Reed", room: "Art Studio", class: "Grade 10" },
];

export default function AcademicsPage() {
  const [selectedClass, setSelectedClass] = useState("Grade 10");
  const [slots, setSlots] = useState<TimetableSlot[]>(INITIAL_SLOTS);
  const [modalOpen, setModalOpen] = useState(false);

  // New slot form
  const [day, setDay] = useState<TimetableSlot["day"]>("Monday");
  const [period, setPeriod] = useState(3);
  const [subject, setSubject] = useState("Physics & Mechanics");
  const [teacher, setTeacher] = useState("Mr. Lucas Bennett");
  const [room, setRoom] = useState("Room 101");
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  const days: TimetableSlot["day"][] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [1, 2, 3, 4, 5, 6];

  const checkConflict = (checkDay: string, checkPeriod: number, checkTeacher: string, checkRoom: string) => {
    // Check teacher double booking
    const teacherClash = slots.find(
      (s) => s.day === checkDay && s.period === checkPeriod && s.teacher === checkTeacher
    );
    if (teacherClash) {
      return `Conflict Alert: ${checkTeacher} is already teaching "${teacherClash.subject}" in ${teacherClash.room} during Period ${checkPeriod} on ${checkDay}!`;
    }

    // Check room double booking
    const roomClash = slots.find(
      (s) => s.day === checkDay && s.period === checkPeriod && s.room === checkRoom
    );
    if (roomClash) {
      return `Conflict Alert: ${checkRoom} is already booked by ${roomClash.teacher} during Period ${checkPeriod} on ${checkDay}!`;
    }

    return null;
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const clash = checkConflict(day, period, teacher, room);
    if (clash) {
      setConflictWarning(clash);
      return;
    }

    const times: Record<number, string> = {
      1: "08:30 - 09:15",
      2: "09:20 - 10:05",
      3: "10:20 - 11:05",
      4: "11:10 - 11:55",
      5: "12:30 - 01:15",
      6: "01:20 - 02:05",
    };

    const newSlot: TimetableSlot = {
      id: `slot-${Date.now()}`,
      day,
      period,
      time: times[period] || "08:30 - 09:15",
      subject,
      teacher,
      room,
      class: selectedClass,
    };

    setSlots([...slots, newSlot]);
    setModalOpen(false);
    setConflictWarning(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Academics & Timetable Matrix
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Visual period scheduler with automated teacher and classroom conflict detection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white font-bold text-navy-900"
            >
              <option value="Grade 10">Grade 10 - Section A</option>
              <option value="Grade 11">Grade 11 - STEM</option>
              <option value="Grade 8">Grade 8 - Section B</option>
            </select>

            <button
              onClick={() => {
                setConflictWarning(null);
                setModalOpen(true);
              }}
              className="btn-cta text-xs font-bold uppercase tracking-wider py-2 px-4 flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Class Period</span>
            </button>
          </div>
        </div>

        {/* Weekly Timetable Grid */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              {selectedClass} &bull; Weekly Schedule Matrix
            </span>
            <div className="flex items-center gap-2 text-[11px] text-green-700 font-bold bg-green-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Schedule Clashes Detected</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white font-semibold">
                  <th className="py-3 px-4 w-28 border-r border-navy-800">Day</th>
                  {periods.map((p) => (
                    <th key={p} className="py-3 px-4 min-w-[160px] border-r border-navy-800 text-center">
                      <span className="block font-bold">Period {p}</span>
                      <span className="text-[10px] text-slate-300 font-normal">
                        {p === 1 && "08:30 - 09:15"}
                        {p === 2 && "09:20 - 10:05"}
                        {p === 3 && "10:20 - 11:05"}
                        {p === 4 && "11:10 - 11:55"}
                        {p === 5 && "12:30 - 01:15"}
                        {p === 6 && "01:20 - 02:05"}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {days.map((d) => (
                  <tr key={d} className="hover:bg-slate-50/50">
                    <td className="py-4 px-4 font-bold text-navy-900 bg-slate-50/80 border-r border-slate-100">
                      {d}
                    </td>
                    {periods.map((p) => {
                      const slot = slots.find((s) => s.day === d && s.period === p);
                      return (
                        <td key={p} className="p-2 border-r border-slate-100 align-top">
                          {slot ? (
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 hover:border-green-600 transition-colors space-y-1">
                              <p className="font-bold text-navy-900 text-[11px] leading-tight">
                                {slot.subject}
                              </p>
                              <p className="text-[10px] text-green-700 font-medium flex items-center gap-1">
                                <User className="w-3 h-3 text-green-600" />
                                {slot.teacher}
                              </p>
                              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gold-500" />
                                {slot.room}
                              </p>
                            </div>
                          ) : (
                            <div className="h-16 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-300">
                              Free Slot
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add Timetable Slot */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-dropdown p-6 border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-lg font-bold font-heading text-navy-900">
                  Assign Timetable Slot
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-navy-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {conflictWarning && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                  <span>{conflictWarning}</span>
                </div>
              )}

              <form onSubmit={handleAddSlot} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Day</label>
                    <select
                      value={day}
                      onChange={(e: any) => setDay(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Period</label>
                    <select
                      value={period}
                      onChange={(e) => setPeriod(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      {periods.map((p) => (
                        <option key={p} value={p}>
                          Period {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Pure Mathematics">Pure Mathematics</option>
                    <option value="Physics & Mechanics">Physics & Mechanics</option>
                    <option value="Chemistry & Biology">Chemistry & Biology</option>
                    <option value="English Literature">English Literature</option>
                    <option value="Computer Science & AI">Computer Science & AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Teacher</label>
                  <select
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Ms. Clara Higgins">Ms. Clara Higgins (Mathematics)</option>
                    <option value="Mr. Lucas Bennett">Mr. Lucas Bennett (Physics)</option>
                    <option value="Ms. Evelyn Reed">Ms. Evelyn Reed (English)</option>
                    <option value="Dr. Marcus Vance">Dr. Marcus Vance (CS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Room / Lab</label>
                  <input
                    type="text"
                    required
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="e.g. Room 101 or Lab 3"
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
                    className="btn-cta py-2 px-6 text-xs font-bold uppercase tracking-wider"
                  >
                    Save Slot
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
