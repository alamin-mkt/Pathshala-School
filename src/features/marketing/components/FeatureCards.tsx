"use client";

import React from "react";
import { GraduationCap, ShieldCheck, Laptop, Trophy } from "lucide-react";

const FEATURES = [
  {
    title: "Expert teachers",
    description: "Certified educators offering tailored mentorship, passion, and rigor.",
    icon: GraduationCap,
  },
  {
    title: "Safe campus",
    description: "CCTV-secured grounds, verified personnel, and a supportive environment.",
    icon: ShieldCheck,
  },
  {
    title: "Modern labs",
    description: "Cutting-edge robotics, high-speed computer labs, and biology centers.",
    icon: Laptop,
  },
  {
    title: "Sports & arts",
    description: "Multi-court sports pavilions, music conservatories, and theater clubs.",
    icon: Trophy,
  },
];

export function FeatureCards() {
  return (
    <div className="relative -mt-12 sm:-mt-16 z-30 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="feature-card group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-green-600 group-hover:text-white">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-navy-900 group-hover:text-green-700 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
