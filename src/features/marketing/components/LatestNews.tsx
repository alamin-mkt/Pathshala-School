"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
}

const NEWS: NewsItem[] = [
  {
    id: "n1",
    date: "15 Oct 2026",
    category: "Academics",
    title: "New STEM Robotics Lab inaugurated by Minister of Education",
    excerpt:
      "State-of-the-art AI workstations, 3D rapid prototyping, and automated sensor suites are now available to high school students.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "n2",
    date: "18 Oct 2026",
    category: "Campus Life",
    title: "Pathshala students secure top honours at National Math Olympiad",
    excerpt:
      "Four junior mathematicians won gold and bronze medals, marking the fifth consecutive year of national competitive dominance.",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "n3",
    date: "22 Oct 2026",
    category: "Athletics",
    title: "Varsity football team advances to state tournament semifinals",
    excerpt:
      "A thrilling 3-2 victory in overtime secures the Pathshala Panthers their inaugural ticket to the regional finals.",
    imageUrl:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80",
  },
];

export function LatestNews() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-eyebrow">Announcements</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-900 tracking-tight">
            Latest news
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Read inspiring stories, competition triumphs, and milestone announcements from our vibrant campus.
          </p>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-dropdown transition-all duration-300 hover:-translate-y-1 border border-slate-100 flex flex-col group"
            >
              {/* Image & Date Badge */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-green-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* News Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-500" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold font-heading text-navy-900 group-hover:text-green-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link
                    href="#news"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-800 transition-colors"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Pill Button */}
        <div className="mt-12 text-center">
          <Link
            href="#events"
            className="btn-cta text-xs font-bold uppercase tracking-wider py-3 px-8 shadow-sm"
          >
            View all news
          </Link>
        </div>
      </div>
    </section>
  );
}
