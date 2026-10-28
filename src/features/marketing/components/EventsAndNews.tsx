"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";

type Category = "Academics" | "Admissions" | "Sports";

interface EventItem {
  id: string;
  day: string;
  month: string;
  title: string;
  category: Category;
  location: string;
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
}

const EVENTS: EventItem[] = [
  {
    id: "e1",
    day: "12",
    month: "Oct",
    title: "Annual Science Fair",
    category: "Academics",
    location: "STEM Complex Lab 3",
    description: "Young scientists showcase groundbreaking robotics, clean energy models, and biological innovations.",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "e2",
    day: "24",
    month: "Oct",
    title: "Reading & Literature Week",
    category: "Academics",
    location: "Central Library Pavilion",
    description: "Book fairs, author keynote discussions, and inter-house poetry recitals.",
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "e3",
    day: "30",
    month: "Oct",
    title: "Annual Day Celebration",
    category: "Sports",
    location: "Main Arts Auditorium",
    description: "Join us for an unforgettable evening of music, drama, cultural dances, and the annual student honours gala.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: "e4",
    day: "05",
    month: "Nov",
    title: "Kindergarten & Primary Open Day",
    category: "Admissions",
    location: "Campus Administration Wing",
    description: "Prospective parents meet our faculty, tour interactive classrooms, and review admissions requirements.",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "e5",
    day: "18",
    month: "Nov",
    title: "Inter-School Football Championship",
    category: "Sports",
    location: "Pathshala Athletics Ground",
    description: "Top regional varsity teams compete for the prestigious Pathshala Golden Cup.",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
  },
];

export function EventsAndNews() {
  const [activeTab, setActiveTab] = useState<Category>("Academics");

  const filteredEvents = EVENTS.filter((e) => e.category === activeTab || e.isFeatured);
  const regularEvents = filteredEvents.filter((e) => !e.isFeatured).slice(0, 2);
  const featuredEvent = EVENTS.find((e) => e.isFeatured) || EVENTS[2];

  return (
    <section id="events" className="py-20 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Eyebrow and Subtitle */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Campus Happenings</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-900 tracking-tight">
            Events & news
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Stay up to date with the latest calendar milestones, seminars, and arts galas.
          </p>

          {/* Pill Category Tabs */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 bg-white rounded-full shadow-soft border border-slate-200">
            {(["Academics", "Admissions", "Sports"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`pill-tab ${
                  activeTab === cat ? "pill-tab-active" : "pill-tab-inactive"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout matching the demo site */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 2 Stacked Event Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {regularEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-slate-100 flex flex-col sm:flex-row gap-5 items-center transition-all hover:shadow-card hover:-translate-y-0.5"
              >
                <div className="relative w-full sm:w-44 h-40 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={evt.imageUrl}
                    alt={evt.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-green-600 mb-1">
                    <span className="text-lg font-black font-heading leading-none">
                      {evt.day}
                    </span>
                    <span className="uppercase text-[11px] font-bold text-slate-500">
                      {evt.month}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1 text-slate-500 font-normal">
                      <MapPin className="w-3 h-3 text-gold-500" />
                      {evt.location}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-heading text-navy-900 hover:text-green-600 transition-colors cursor-pointer">
                    {evt.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: 1 Highlighted Dark Featured Card */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[340px] rounded-2xl overflow-hidden shadow-card flex flex-col justify-end p-8 text-white group">
              <Image
                src={featuredEvent.imageUrl}
                alt={featuredEvent.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-600 text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3 text-gold-300" />
                  <span>Featured Event</span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-black font-heading text-gold-500">
                    {featuredEvent.day}
                  </span>
                  <span className="text-sm font-bold uppercase text-slate-300">
                    {featuredEvent.month}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  {featuredEvent.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  {featuredEvent.location}
                </p>

                <p className="mt-3 text-xs text-slate-200/90 leading-relaxed line-clamp-3">
                  {featuredEvent.description}
                </p>

                <div className="mt-6">
                  <Link
                    href="#admissions-cta"
                    className="inline-flex items-center gap-2 btn-cta text-xs font-bold py-2.5 px-5 shadow-lg"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
