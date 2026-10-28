"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/types";
import {
  School,
  LayoutDashboard,
  GraduationCap,
  Users,
  Calendar,
  ClipboardCheck,
  Award,
  Wallet,
  MessageSquare,
  BookOpen,
  Bus,
  Settings,
  Globe,
  BarChart3,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, school, role, signOut, switchDemoRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Role-specific navigation items
  const getNavItems = (): NavItem[] => {
    switch (role) {
      case "superAdmin":
        return [
          { label: "Platform Overview", href: "/superadmin/dashboard", icon: LayoutDashboard },
          { label: "Schools Directory", href: "/superadmin/schools", icon: School },
          { label: "SaaS Plans", href: "/superadmin/plans", icon: Wallet },
          { label: "Platform Analytics", href: "/superadmin/analytics", icon: BarChart3 },
          { label: "Announcements", href: "/superadmin/announcements", icon: MessageSquare },
          { label: "Security Audit Log", href: "/superadmin/audit", icon: ShieldCheck },
        ];
      case "teacher":
        return [
          { label: "Teacher Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
          { label: "Mark Attendance", href: "/admin/attendance", icon: ClipboardCheck },
          { label: "My Classes & Timetable", href: "/admin/academics", icon: Calendar },
          { label: "Gradebook & Marks", href: "/admin/examinations", icon: Award },
          { label: "Parent Notices", href: "/admin/communication", icon: MessageSquare },
        ];
      case "accountant":
        return [
          { label: "Accounts Dashboard", href: "/accountant/dashboard", icon: LayoutDashboard },
          { label: "Collect Fee & POS", href: "/admin/fees", icon: Wallet },
          { label: "Invoices & Ledger", href: "/admin/fees?tab=invoices", icon: ClipboardCheck },
          { label: "School Expenses", href: "/admin/fees?tab=expenses", icon: BarChart3 },
        ];
      case "student":
        return [
          { label: "My Student Desk", href: "/student/dashboard", icon: LayoutDashboard },
          { label: "My Attendance", href: "/student/attendance", icon: ClipboardCheck },
          { label: "Term Report Cards", href: "/student/report-card", icon: Award },
          { label: "Class Timetable", href: "/student/timetable", icon: Calendar },
          { label: "Notices & Bulletins", href: "/student/notices", icon: MessageSquare },
        ];
      case "parent":
        return [
          { label: "Guardian Overview", href: "/parent/dashboard", icon: LayoutDashboard },
          { label: "Fee Dues & Online Pay", href: "/parent/fees", icon: Wallet },
          { label: "Child Progress Reports", href: "/parent/progress", icon: Award },
          { label: "Attendance Alerts", href: "/parent/attendance", icon: ClipboardCheck },
        ];
      default: // schoolAdmin and principal
        return [
          { label: "School Overview", href: "/admin/dashboard", icon: LayoutDashboard },
          { label: "Onboarding Wizard", href: "/onboarding", icon: SparklesIcon },
          { label: "Academics & Timetable", href: "/admin/academics", icon: Calendar },
          { label: "Admissions Workflow", href: "/admin/admissions", icon: GraduationCap },
          { label: "Students Directory", href: "/admin/students", icon: Users },
          { label: "Staff & Faculty", href: "/admin/staff", icon: UserCheck },
          { label: "Attendance System", href: "/admin/attendance", icon: ClipboardCheck },
          { label: "Exams & Results (PDF)", href: "/admin/examinations", icon: Award },
          { label: "Fees & POS Receipts", href: "/admin/fees", icon: Wallet },
          { label: "Communication / FCM", href: "/admin/communication", icon: MessageSquare },
          { label: "Library Catalog", href: "/admin/library", icon: BookOpen },
          { label: "Transport Routes", href: "/admin/transport", icon: Bus },
          { label: "Website CMS", href: "/admin/cms", icon: Globe },
          { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
          { label: "School Settings", href: "/admin/settings", icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  const handleRoleSwitch = (newRole: UserRole) => {
    switchDemoRole(newRole);
    switch (newRole) {
      case "superAdmin":
        router.push("/superadmin/dashboard");
        break;
      case "teacher":
        router.push("/teacher/dashboard");
        break;
      case "accountant":
        router.push("/accountant/dashboard");
        break;
      case "student":
        router.push("/student/dashboard");
        break;
      case "parent":
        router.push("/parent/dashboard");
        break;
      default:
        router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-navy-950 text-white border-r border-navy-900 flex-shrink-0 z-20">
        {/* Brand Area */}
        <div className="p-5 border-b border-navy-900 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
              <Image
                src={school?.branding?.logoUrl || "/assets/Pathshala.jpeg"}
                alt="Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="overflow-hidden">
              <span className="text-base font-bold font-heading text-white truncate block leading-tight">
                {role === "superAdmin" ? "Pathshala Cloud" : school?.name || "Pathshala School"}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-gold-500 font-semibold truncate block">
                {role === "superAdmin" ? "Super Admin" : "School Portal"}
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Demo Persona Switcher Dropdown in Sidebar */}
        <div className="p-3 border-b border-navy-900 bg-navy-900/60">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Role Persona
          </label>
          <select
            value={role || "schoolAdmin"}
            onChange={(e) => handleRoleSwitch(e.target.value as UserRole)}
            className="w-full bg-navy-950 border border-navy-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <option value="superAdmin">Super Admin (Platform)</option>
            <option value="schoolAdmin">School Admin</option>
            <option value="principal">Principal</option>
            <option value="teacher">Faculty / Teacher</option>
            <option value="accountant">School Accountant</option>
            <option value="student">Student Portal</option>
            <option value="parent">Parent Portal</option>
          </select>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-slate-300 hover:bg-navy-900 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-navy-900 bg-navy-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-950 font-black text-xs flex items-center justify-center flex-shrink-0">
              {profile?.displayName?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {profile?.displayName || "Authorized User"}
              </p>
              <p className="text-[10px] text-slate-400 truncate capitalize">
                {role}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              signOut();
              router.push("/login");
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-navy-900 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* School / Tenant Title */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-bold text-navy-900 font-heading">
                {role === "superAdmin" ? "Global Operations" : school?.name || "Pathshala School"}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-green-700 font-semibold capitalize bg-green-50 px-2 py-0.5 rounded-full text-[11px]">
                {role} View
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-200 text-navy-900 hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-green-600" />
              <span>Public Website</span>
            </Link>

            <button
              onClick={() => alert("Notification center: 0 unread alerts")}
              className="p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded-lg relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-600" />
            </button>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2 text-xs">
              <div className="w-8 h-8 rounded-full bg-navy-900 text-white font-bold flex items-center justify-center">
                {profile?.displayName?.charAt(0) || "A"}
              </div>
              <span className="hidden sm:inline font-bold text-navy-900">
                {profile?.displayName?.split(" ")[0] || "User"}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Children */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-72 bg-navy-950 text-white flex flex-col h-full shadow-2xl p-4">
            <div className="flex items-center justify-between pb-4 border-b border-navy-900">
              <span className="text-lg font-bold font-heading text-white">Pathshala</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold ${
                      active ? "bg-green-600 text-white" : "text-slate-300 hover:bg-navy-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
