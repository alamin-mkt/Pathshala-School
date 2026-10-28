"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  MessageSquare,
  Plus,
  Send,
  Bell,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Mail,
  Smartphone,
} from "lucide-react";

interface SchoolNotice {
  id: string;
  title: string;
  content: string;
  target: "all" | "teachers" | "parents" | "students";
  category: "academic" | "urgent" | "event" | "general";
  date: string;
  author: string;
}

const INITIAL_NOTICES: SchoolNotice[] = [
  {
    id: "not-1",
    title: "Mid-Term Examination Schedule & Syllabus Finalized",
    content: "The official academic mid-term schedules for Grades 6 through 12 have been published. Please ensure students review their subject revision sheets.",
    target: "all",
    category: "academic",
    date: "2026-10-27",
    author: "Academic Coordinator",
  },
  {
    id: "not-2",
    title: "Quarterly Parent-Teacher Conference - Friday 3:00 PM",
    content: "We warmly invite all guardians to discuss their child's academic progress and term report cards with class mentors in the main pavilion.",
    target: "parents",
    category: "event",
    date: "2026-10-25",
    author: "Dr. Sarah Jenkins",
  },
  {
    id: "not-3",
    title: "Faculty Professional Development Workshop on Modern STEM",
    content: "All science and mathematics teaching staff are requested to attend the interactive robotics workshop in Lab 3 tomorrow morning at 08:00 AM.",
    target: "teachers",
    category: "academic",
    date: "2026-10-22",
    author: "Head of School",
  },
];

export default function CommunicationPage() {
  const [notices, setNotices] = useState<SchoolNotice[]>(INITIAL_NOTICES);
  const [activeTab, setActiveTab] = useState<"notices" | "messages">("notices");
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState<SchoolNotice["target"]>("all");
  const [category, setCategory] = useState<SchoolNotice["category"]>("academic");

  // In-app messaging mockup
  const [messages, setMessages] = useState([
    { id: "m1", sender: "Elizabeth Turner (Parent of Alex)", text: "Good morning Ms. Clara, will Alex need special math software for calculus homework?", time: "09:15 AM", isTeacher: false },
    { id: "m2", sender: "Ms. Clara Higgins (Math Faculty)", text: "Hello Mrs. Turner, no special software is required. We are using standard web graphing tools accessible directly through the portal.", time: "09:30 AM", isTeacher: true },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: SchoolNotice = {
      id: `not-${Date.now()}`,
      title,
      content,
      target,
      category,
      date: new Date().toISOString().split("T")[0],
      author: "School Administration",
    };
    setNotices([newNotice, ...notices]);
    setModalOpen(false);
    setTitle("");
    setContent("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage) return;
    setMessages([
      ...messages,
      {
        id: `msg-${Date.now()}`,
        sender: "Ms. Clara Higgins (Faculty)",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isTeacher: true,
      },
    ]);
    setNewMessage("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Communication & Broadcast Bulletins
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Targeted announcements, in-app parent-teacher messaging, and FCM mobile push alerts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("notices")}
              className={`pill-tab ${activeTab === "notices" ? "pill-tab-active" : "pill-tab-inactive"}`}
            >
              Notice Board
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`pill-tab ${activeTab === "messages" ? "pill-tab-active" : "pill-tab-inactive"}`}
            >
              Teacher-Parent Chat
            </button>
          </div>
        </div>

        {activeTab === "notices" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Active Bulletins ({notices.length})
              </span>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-cta text-xs font-bold uppercase tracking-wider py-2 px-4 flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Notice</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700">
                        {n.category}
                      </span>
                      <span className="text-[11px] text-slate-400 capitalize">
                        Audience: <strong className="text-navy-900">{n.target}</strong>
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-heading text-navy-900 leading-snug">
                      {n.title}
                    </h3>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                      {n.content}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{n.author}</span>
                    <span>{n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Real-time Parent-Teacher Chat Tab */
          <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden flex flex-col h-[520px]">
            <div className="p-4 bg-navy-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-heading">
                  Thread: Elizabeth Turner (Parent of Alex Turner, Grade 10)
                </h3>
                <p className="text-[11px] text-slate-300">
                  Direct message inquiry regarding Academic Session
                </p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.isTeacher ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] text-slate-400 font-semibold mb-1">
                    {m.sender} &bull; {m.time}
                  </span>
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      m.isTeacher
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-white text-navy-900 border border-slate-200 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your response to the guardian..."
                className="flex-1 px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="submit"
                className="btn-cta py-2 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Modal: Publish Notice */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-dropdown p-6 border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-lg font-bold font-heading text-navy-900">
                  Compose School Notice
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-navy-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePostNotice} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Notice Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Science Fair Registration Deadline"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Target Audience</label>
                    <select
                      value={target}
                      onChange={(e: any) => setTarget(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="all">Entire School</option>
                      <option value="parents">Parents / Guardians</option>
                      <option value="teachers">Teaching Faculty</option>
                      <option value="students">Students Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="academic">Academic</option>
                      <option value="event">Campus Event</option>
                      <option value="urgent">Urgent Notice</option>
                      <option value="general">General Bulletin</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Detailed Announcement *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter full notice content..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
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
                    <span>Broadcast Now</span>
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
