"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, LogIn } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-navy-950 text-slate-300 text-xs border-b border-navy-800/80 hidden md:block">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 sm:px-6 lg:px-8">
        {/* Contact & Hours */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+18005557284"
            className="flex items-center gap-1.5 hover:text-gold-500 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-green-500" />
            <span>+1 (800) 555-PATH</span>
          </a>
          <a
            href="mailto:contact@pathshala.edu"
            className="flex items-center gap-1.5 hover:text-gold-500 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-green-500" />
            <span>info@pathshala.edu</span>
          </a>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-gold-500" />
            <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
          </div>
        </div>

        {/* Socials & Portal Login */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border-r border-navy-800 pr-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-white hover:text-gold-500 font-semibold transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-green-500" />
            <span>Portal Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
