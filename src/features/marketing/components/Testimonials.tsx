"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  stars: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Pathshala has nurtured my daughter's love for inquiry and science. The transparent portal lets us view homework, grades, and fee receipts in seconds. We could not ask for a better school community.",
    author: "Elena Rostova",
    role: "Mother of Maya (Grade 8)",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    stars: 5,
  },
  {
    id: "t2",
    quote:
      "The individual attention teachers provide is remarkable. When my son struggled with advanced calculus, his teacher held weekly office hours. The digital attendance alert system also provides peace of mind.",
    author: "David Chen",
    role: "Father of Liam (Grade 11)",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    stars: 5,
  },
  {
    id: "t3",
    quote:
      "The school's balance between rigorous academics and co-curricular performing arts is unmatched. My twins love coming to campus every single day.",
    author: "Sarah Al-Mansoor",
    role: "Mother of Tariq & Noor (Grade 5)",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    stars: 5,
  },
];

export function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="py-20 sm:py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-950 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(#F0B33A_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-eyebrow text-green-400">Parent Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            What parents say
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Hear first-hand experiences from families whose children thrive in our classrooms.
          </p>
        </div>

        {/* Testimonials Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-navy-900/80 backdrop-blur-md rounded-2xl p-7 border border-navy-700/60 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-green-500/50 hover:-translate-y-1 ${
                idx === activeSlide ? "ring-2 ring-green-500/30" : ""
              }`}
            >
              <div>
                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1 mb-4 text-gold-500">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-navy-700 mb-2" />

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-navy-800">
                <div className="relative w-11 h-11 rounded-full p-0.5 bg-green-500">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={t.avatarUrl}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold font-heading text-white">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-green-400 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === activeSlide ? "w-7 h-2 bg-green-500" : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
