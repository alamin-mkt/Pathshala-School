"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Send,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-navy-900 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-900">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 relative rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
                <Image
                  src="/assets/Pathshala.jpeg"
                  alt="Pathshala Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-black font-heading text-white tracking-tight leading-tight block">
                  Pathshala
                </span>
                <span className="text-[10px] tracking-widest text-gold-500 font-semibold uppercase">
                  Better way to learn
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pathshala is a next-generation multi-tenant school operating system empowering forward-thinking educational institutions with unified academics, digital admissions, smart attendance, and collaborative parent communication.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={soc.label}
                    className="w-8 h-8 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-400 hover:text-gold-500 hover:border-gold-500/50 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-green-400 transition-colors">
                  About Our School
                </Link>
              </li>
              <li>
                <Link href="#academics" className="hover:text-green-400 transition-colors">
                  Curriculum & Labs
                </Link>
              </li>
              <li>
                <Link href="#events" className="hover:text-green-400 transition-colors">
                  Events & Calendar
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-green-400 transition-colors">
                  SaaS Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="/register-school" className="hover:text-green-400 transition-colors">
                  Register School
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>142 Academic Boulevard, Educational District, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a href="tel:+18005557284" className="hover:text-white transition-colors">
                  +1 (800) 555-PATH (7284)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a href="mailto:admissions@pathshala.edu" className="hover:text-white transition-colors">
                  admissions@pathshala.edu
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive weekly updates on admissions milestones, seminars, and school publications.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to our bulletin!");
              }}
              className="space-y-2"
            >
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-navy-900 border border-navy-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-cta py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Pathshala Multi-Tenant SaaS. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/security" className="hover:text-slate-300 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white/20"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
