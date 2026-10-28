# Pathshala | Multi-Tenant School Management SaaS

> **Tagline**: *"Better way to learn"*  
> **Architecture**: Isolated Multi-Tenant SaaS with Next.js 14+ (App Router), TypeScript (strict), Tailwind CSS, Firebase Auth (Custom Claims RBAC), Cloud Firestore, Storage, and Canvas/Vector PDF Engine.

---

## 🌟 Overview & Product Features

Pathshala is an enterprise-grade, multi-tenant school operating system where schools register, receive their own branded portal (with runtime CSS theming), and manage:
- **Public School Marketing Website**: Pixel-faithful to the demo design with Hero slider, overlapping feature cards with green borders, principal address with 25+ years badge, category-tabbed events, dark faculty carousel, testimonials with 5-star ratings, animated counter stats, admissions inquiry banner, and interactive online admission applications.
- **Multi-Tenant SaaS Core**: Super Admin platform directory, tenant provisioning, subscription tiers (Starter, Growth, Enterprise), usage analytics, and cross-tenant security audit trail.
- **Onboarding Wizard**: 5-step guided setup for freshly provisioned schools (Identity, Dynamic Branding Colors, Academic Calendar, Classes & Sections, and Grading Policy).
- **Academic Management**: Classes, sections, subjects, and Timetable Builder with automated teacher and room conflict detection.
- **Students & Admissions**: Online admissions pipeline (Applied -> Reviewed -> Accepted -> Enrolled), student directory, profile dossiers, CSV export, and downloadable **Student ID Cards (PDF)**.
- **Bulk Attendance**: Touch-optimized daily and period roll call with "Mark All Present" toggle and automatic parent SMS/FCM notification dispatch for absentees.
- **Examinations & Report Cards**: Mid-term & final schedules, mark entry with auto GPA & letter grade calculation, class rank lists, and official certified **Academic Report Cards (PDF)**.
- **Fees & Counter POS**: Fee structures, invoicing, dues dashboard, payment recording (Cash, Bank, bKash, SSLCommerz, Stripe), and instant **Fee Payment Receipts (PDF)**.
- **Parent & Student Portals**: Direct access to timetables, homework, notices, online fee payment, and child progress switchers.
- **Communication & CMS**: Audience-targeted bulletins, direct in-app teacher-parent messaging, and website CMS editor.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js `v18+` or `v20+` (Tested on Node `v24.22.1`)
- npm `v9+` or `v11+`

### 2. Installation
```bash
# Install all production & dev dependencies
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the project root (pre-configured defaults already included):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDummyKeyForPathshalaSchoolApp01
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pathshala-school-demo.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pathshala-school-demo
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pathshala-school-demo.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=789123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:789123456789:web:demoapppathshala
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running the Automated Test Suite
```bash
npm run test
```

### 6. Executing Multi-Tenant Database Seed
```bash
npm run seed
```

---

## 👥 Role-Based Portals & Quick Demo Personas

Pathshala features an instant role-switcher in both the `/login` portal and the dashboard sidebar, allowing you to test all personas with 1 click:

| Role | Demo Email | Portal Route | Primary Capabilities |
|---|---|---|---|
| **Super Admin** | `superadmin@pathshala.app` | `/superadmin/dashboard` | Platform directory, school provisioning, plans, analytics, audit log |
| **School Admin** | `admin@greenwood.edu` | `/admin/dashboard` | Full campus administration, academics, admissions, staff, fees, reports |
| **Principal** | `principal@greenwood.edu` | `/admin/dashboard` | Academic oversight, report cards, calendar approvals |
| **Teacher** | `clara.math@greenwood.edu` | `/teacher/dashboard` | Daily roll call, timetable, gradebook entry, parent messages |
| **Accountant** | `accounts@greenwood.edu` | `/accountant/dashboard` | POS counter fee collection, invoice ledger, receipt printing |
| **Student** | `alex.turner@student.greenwood.edu` | `/student/dashboard` | Timetable, attendance stats, term report card PDF download |
| **Parent** | `elizabeth.turner@gmail.com` | `/parent/dashboard` | Multi-child switcher, fee dues payment, absence alerts |

---

## 🔒 Security & Multi-Tenant Isolation
- **Tenant Isolation**: Every Firestore query is scoped to `/schools/{schoolId}/...`.
- **Custom Claims**: Identity tokens carry `{ role: string, schoolId: string }`, signed exclusively by Cloud Functions.
- **Firestore Security Rules**: Fully declared in [`firestore.rules`](./firestore.rules) enforcing strict cross-tenant isolation and parent/student record privacy.
- **Storage Rules**: Declared in [`storage.rules`](./storage.rules) restricting uploads to school-scoped directories with MIME and size bounds.

---

## 📄 Documentation Links
- [Data Model & ERD Diagram](docs/data-model.md)
- [Architectural Decisions Record (ADR)](docs/decisions.md)
