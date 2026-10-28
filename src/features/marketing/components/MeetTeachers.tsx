"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Mail, ArrowRight, ArrowLeft } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  avatarUrl: string;
}

const TEACHERS: Teacher[] = [
  {
    id: "t1",
    name: "Ms. Clara Higgins",
    designation: "Head of Mathematics",
    subject: "Mathematics",
    qualification: "M.Sc. Pure Mathematics, Oxford",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t2",
    name: "Mr. Lucas Bennett",
    designation: "Senior Science Lecturer",
    subject: "Physics & Chemistry",
    qualification: "M.S. Applied Physics, Stanford",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t3",
    name: "Ms. Evelyn Reed",
    designation: "Head of English Literature",
    subject: "Literature & Arts",
    qualification: "M.A. English, Columbia",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t4",
    name: "Dr. Marcus Vance",
    designation: "Computer Science Faculty",
    subject: "Robotics & AI",
    qualification: "Ph.D. Computer Engineering, MIT",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
];

export function MeetTeachers() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleTeachers = TEACHERS.slice(startIndex, startIndex + 3);
  if (visibleTeachers.length < 3) {
    visibleTeachers.push(...TEACHERS.slice(0, 3 - visibleTeachers.length));
  }

  return (
    <section id="teachers" className="py-20 sm:py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3A7A_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-eyebrow text-green-400">Our Faculty</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Meet our teachers
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Passionate educators dedicated to nurturing intellectual curiosity and moral character.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStartIndex((prev) => (prev === 0 ? TEACHERS.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full bg-navy-900 border border-navy-700 hover:bg-green-600 hover:border-green-600 transition-colors flex items-center justify-center text-white"
              aria-label="Previous Teachers"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setStartIndex((prev) => (prev + 1) % TEACHERS.length)}
              className="w-10 h-10 rounded-full bg-navy-900 border border-navy-700 hover:bg-green-600 hover:border-green-600 transition-colors flex items-center justify-center text-white"
              aria-label="Next Teachers"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTeachers.map((teacher, idx) => (
            <div
              key={`${teacher.id}-${idx}`}
              className="bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center"
            >
              {/* Subject Chip */}
              <span className="px-3.5 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-wider mb-6">
                {teacher.subject}
              </span>

              {/* Avatar with Green Ring */}
              <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-green-500 to-green-300 mb-4 shadow-md">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={teacher.avatarUrl}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name & Qualification */}
              <h3 className="text-lg font-bold font-heading text-navy-900">
                {teacher.name}
              </h3>
              <p className="text-xs font-semibold text-green-700 mt-0.5">
                {teacher.designation}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {teacher.qualification}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 text-slate-400">
                <a href="#teachers" className="hover:text-green-600 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#teachers" className="hover:text-green-600 transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#teachers" className="hover:text-green-600 transition-colors" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Profile Link */}
              <div className="mt-5 w-full">
                <Link
                  href="/login"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg bg-slate-50 hover:bg-green-50 text-navy-900 hover:text-green-700 text-xs font-semibold transition-colors"
                >
                  <span>View Faculty Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
