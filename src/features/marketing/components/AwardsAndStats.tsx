"use client";

import React from "react";
import { Award, Trophy, HeartHandshake, CheckCircle2 } from "lucide-react";

export function AwardsAndStats() {
  return (
    <section id="awards" className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Best School Award */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-green-600" />
              <span>National Accreditation Board Distinction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-900 tracking-tight leading-tight">
              Winner of the best school award
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              Recognized nationally for pedagogical innovation, holistic co-curricular enrichment, and exceptional student pastoral care. Our graduates matriculate into the world&apos;s leading institutions with confidence and ethical grounding.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 text-navy-900">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Dual Accreditation
              </span>
              <span className="flex items-center gap-1.5 text-navy-900">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                12:1 Student-Faculty Ratio
              </span>
            </div>
          </div>

          {/* Right Column: 3 Stat Blocks */}
          <div className="lg:col-span-6 space-y-6">
            {/* Stat 1 */}
            <div className="flex items-start gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white text-green-600 shadow-sm flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-900">
                    140+
                  </span>
                  <span className="text-sm font-bold text-navy-700">
                    Competitions won
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Active academic Olympiad, robotics, debates, and varsity championship titles.
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-start gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white text-gold-500 shadow-sm flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-900">
                    1,000+
                  </span>
                  <span className="text-sm font-bold text-navy-700">
                    Volunteer hours
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Civic engagement, environmental cleanups, and community tutoring initiatives.
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-start gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white text-green-600 shadow-sm flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-900">
                    100%
                  </span>
                  <span className="text-sm font-bold text-navy-700">
                    Success rate
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Matriculation and higher education admissions placement across tier-one universities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
