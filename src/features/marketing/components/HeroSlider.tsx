"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, GraduationCap, ArrowUpRight } from "lucide-react";

interface Slide {
  id: number;
  eyebrow: string;
  titlePart1: string;
  highlightWord: string;
  titlePart2: string;
  description: string;
  bgImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    eyebrow: "A NEW ERA OF EDUCATION",
    titlePart1: "Choose the",
    highlightWord: "best",
    titlePart2: "for your child",
    description:
      "A 21st-century holistic learning environment with modern STEM labs, certified mentorship, and an inspiring safe campus where children thrive.",
    bgImage:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80",
    primaryCtaText: "Know More",
    primaryCtaLink: "#about",
    secondaryCtaText: "Apply Now",
    secondaryCtaLink: "#admissions-cta",
  },
  {
    id: 2,
    eyebrow: "GLOBAL STANDARD CURRICULUM",
    titlePart1: "Inspiring minds,",
    highlightWord: "building",
    titlePart2: "future leaders",
    description:
      "From kindergarten to higher secondary, we empower students with critical thinking, ethical grounding, and creative problem solving.",
    bgImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80",
    primaryCtaText: "Explore Academics",
    primaryCtaLink: "#academics",
    secondaryCtaText: "Take Campus Tour",
    secondaryCtaLink: "/demo-request",
  },
];

export function HeroSlider({ onApplyClick }: { onApplyClick?: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[640px] sm:h-[680px] lg:h-[720px] overflow-hidden bg-navy-950 text-white">
      {/* Background Image Carousel with Rich Gradient Overlay */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={s.bgImage}
            alt="School classroom"
            fill
            className="object-cover object-center transform transition-transform duration-10000 ease-out"
            priority={idx === 0}
          />
          {/* Deep Navy Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/50" />
          <div className="absolute inset-0 bg-navy-950/30 backdrop-blur-[1px]" />
        </div>
      ))}

      {/* Main Hero Content */}
      <div className="container relative z-10 h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/80 border border-navy-700 text-xs font-bold uppercase tracking-wider text-green-400 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>{slide.eyebrow}</span>
          </div>

          {/* Headline with Green Highlight Word */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
            {slide.titlePart1}{" "}
            <span className="text-green-500 inline-flex items-center gap-2">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gold-500 inline animate-spin-slow" />
              {slide.highlightWord}
            </span>{" "}
            <br className="hidden sm:inline" />
            {slide.titlePart2}
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal">
            {slide.description}
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={slide.primaryCtaText === "Apply Now" ? "#admissions-cta" : slide.primaryCtaLink}
              className="btn-cta py-3.5 px-7 text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-green-600/30"
            >
              <GraduationCap className="w-4 h-4 mr-1 text-gold-300" />
              {slide.primaryCtaText}
            </Link>

            <button
              onClick={onApplyClick || (() => {
                const el = document.getElementById("admissions-cta");
                el?.scrollIntoView({ behavior: "smooth" });
              })}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-bold uppercase tracking-wider text-white border-2 border-white/80 hover:bg-white hover:text-navy-900 transition-all duration-200 shadow-md"
            >
              <span>{slide.secondaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-900/60 border border-white/20 text-white flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all"
        aria-label="Previous Slide"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-900/60 border border-white/20 text-white flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all"
        aria-label="Next Slide"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Slider Indicator Dots */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-8 h-2.5 bg-green-500"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
