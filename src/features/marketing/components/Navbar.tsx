"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight, Sparkles } from "lucide-react";

export function Navbar({ onApplyClick }: { onApplyClick?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-soft py-3 border-b border-slate-100"
          : "bg-white/95 backdrop-blur-md py-4 border-b border-slate-100"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 relative rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105 border border-slate-100">
            <Image
              src="/assets/Pathshala.jpeg"
              alt="Pathshala Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-navy-900 tracking-tight font-heading leading-tight group-hover:text-navy-700 transition-colors">
              Pathshala
            </span>
            <span className="text-[10px] tracking-widest text-navy-500 font-semibold uppercase">
              Better way to learn
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-navy-900">
          <Link href="/" className="text-green-600 hover:text-green-700 transition-colors">
            Home
          </Link>

          {/* Academics Dropdown */}
          <div
            className="relative group py-2"
            onMouseEnter={() => setActiveDropdown("academics")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <span>Academics</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-transform group-hover:rotate-180" />
            </button>
            {activeDropdown === "academics" && (
              <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-dropdown border border-slate-100 py-2.5 animate-in fade-in-50 slide-in-from-top-2">
                <Link
                  href="#academics"
                  className="block px-4 py-2 text-xs text-navy-900 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                >
                  Curriculum & Syllabus
                </Link>
                <Link
                  href="#teachers"
                  className="block px-4 py-2 text-xs text-navy-900 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                >
                  Faculty Directory
                </Link>
                <Link
                  href="#awards"
                  className="block px-4 py-2 text-xs text-navy-900 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                >
                  Academic Achievements
                </Link>
              </div>
            )}
          </div>

          {/* Admissions Dropdown */}
          <div
            className="relative group py-2"
            onMouseEnter={() => setActiveDropdown("admissions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <span>Admissions</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-transform group-hover:rotate-180" />
            </button>
            {activeDropdown === "admissions" && (
              <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-dropdown border border-slate-100 py-2.5 animate-in fade-in-50 slide-in-from-top-2">
                <Link
                  href="#admissions"
                  className="block px-4 py-2 text-xs text-navy-900 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                >
                  Admission Guidelines
                </Link>
                <Link
                  href="/pricing"
                  className="block px-4 py-2 text-xs text-navy-900 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                >
                  SaaS Plans & Pricing
                </Link>
                <Link
                  href="/register-school"
                  className="block px-4 py-2 text-xs text-navy-900 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                >
                  Register Your School
                </Link>
              </div>
            )}
          </div>

          <Link href="#events" className="hover:text-green-600 transition-colors">
            Events
          </Link>

          <Link href="/pricing" className="hover:text-green-600 transition-colors flex items-center gap-1">
            <span>SaaS Pricing</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gold-100 text-gold-700 font-bold">
              New
            </span>
          </Link>

          <Link href="/login" className="text-navy-700 hover:text-navy-900 transition-colors">
            Portals
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/demo-request"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-md border border-navy-900/15 text-navy-900 hover:bg-navy-50 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Book Live Demo</span>
          </Link>

          <button
            onClick={onApplyClick || (() => {
              const el = document.getElementById("admissions-cta");
              el?.scrollIntoView({ behavior: "smooth" });
            })}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-5 shadow-sm"
          >
            Apply Now
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-navy-900 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-navy-900">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-green-600"
            >
              Home
            </Link>
            <Link
              href="#academics"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-green-600"
            >
              Academics
            </Link>
            <Link
              href="#events"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-green-600"
            >
              Events & News
            </Link>
            <Link
              href="#teachers"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-green-600"
            >
              Our Teachers
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-green-600"
            >
              SaaS Plans & Pricing
            </Link>
            <Link
              href="/demo-request"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-green-600"
            >
              Book Demo
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-green-700 flex items-center justify-between"
            >
              <span>Portal Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
