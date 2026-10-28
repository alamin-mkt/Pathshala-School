"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, Quote } from "lucide-react";

export function PrincipalMessage() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Framed Portrait with 25+ Years Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-8 border-slate-50">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="School Principal Dr. Sarah Jenkins"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            </div>

            {/* 25+ Years Badge */}
            <div className="absolute -bottom-6 -left-2 sm:left-4 bg-green-600 text-white p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-3.5 border-4 border-white animate-bounce-slow">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Award className="w-7 h-7 text-gold-300" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-heading leading-none block">
                  25+
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-green-100">
                  Years of Excellence
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7">
            <span className="section-eyebrow">Leadership Note</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-900 tracking-tight leading-tight">
              A message from our principal
            </h2>

            <div className="mt-6 relative">
              <Quote className="w-10 h-10 text-green-100 absolute -top-4 -left-4 -z-10" />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">
                &ldquo;Welcome to Pathshala, where every student is recognized as a unique visionary.
                Our fundamental mission is to cultivate curious minds, instill compassionate leadership,
                and equip students with the resilience to navigate a transforming world.&rdquo;
              </p>
            </div>

            <p className="mt-4 text-slate-500 text-xs sm:text-sm leading-relaxed">
              For over two decades, our institution has stood at the crossroads of scholastic rigor and
              character development. Through individual mentorship, experiential science laboratories,
              and championship sports programs, we prepare young learners to excel internationally.
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="text-base font-bold font-heading text-navy-900">
                  Dr. Sarah Jenkins, Ph.D.
                </h4>
                <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">
                  Head of School & Executive Principal
                </p>
              </div>

              <Link
                href="/demo-request"
                className="btn-outline text-xs font-bold py-2.5 px-5 flex items-center gap-2 group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
