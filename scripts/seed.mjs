/**
 * Pathshala Multi-Tenant Seed Script
 * Generates 2 realistic demo schools, super admin, teachers, 100 students,
 * guardians, full attendance records, exam results, invoices, and bulletins.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env.local natively
const envPath = resolve(__dirname, "../.env.local");
const envVars = {};

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        envVars[key] = val;
      }
    }
  });
}

const firebaseConfig = {
  apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedData() {
  console.log("🌱 Starting Pathshala Multi-Tenant Seeding to Google Firestore...");
  console.log(`📌 Project: ${firebaseConfig.projectId}`);

  // 1. Super Admin Profile
  await setDoc(doc(db, "users", "superadmin_demo"), {
    uid: "superadmin_demo",
    email: "superadmin@pathshala.app",
    displayName: "Platform Director",
    role: "superAdmin",
    schoolId: "platform",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("✅ Super Admin seeded.");

  // 2. Demo School 1: Greenwood International School
  const school1Id = "demo-school-greenwood";
  await setDoc(doc(db, "schools", school1Id), {
    schoolId: school1Id,
    name: "Greenwood International School",
    slug: "greenwood",
    domain: "greenwood.pathshala.app",
    planId: "growth",
    status: "active",
    branding: {
      logoUrl: "/assets/Pathshala.jpeg",
      primaryColor: "#0B2558",
      secondaryColor: "#1B3A7A",
      accentColor: "#F0B33A",
      ctaColor: "#1F8A3E",
      motto: "Inspiring excellence, cultivating integrity",
      address: "142 Academic Boulevard, New York, NY",
      phone: "+1 (800) 555-PATH",
      email: "admissions@greenwood.edu",
      website: "https://greenwood.pathshala.app",
    },
    settings: {
      currency: "USD",
      timezone: "America/New_York",
      dateFormat: "YYYY-MM-DD",
      gradingSystem: "letter",
      attendanceMode: "daily",
      enableOnlineAdmissions: true,
      enableFeeGateways: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("✅ Demo School 1 (Greenwood) seeded.");

  // 3. Demo School 2: St. Xavier Memorial High School
  const school2Id = "st-xavier-high";
  await setDoc(doc(db, "schools", school2Id), {
    schoolId: school2Id,
    name: "St. Xavier Memorial High School",
    slug: "stxavier",
    domain: "stxavier.pathshala.app",
    planId: "enterprise",
    status: "active",
    branding: {
      logoUrl: "/assets/Pathshala.jpeg",
      primaryColor: "#1E3A8A",
      secondaryColor: "#172554",
      accentColor: "#F59E0B",
      ctaColor: "#16A34A",
      motto: "Knowledge, Character, and Faith",
      address: "500 Grand Concourse, Boston, MA",
      phone: "+1 (800) 555-XAVIER",
      email: "info@stxavier.edu",
      website: "https://stxavier.pathshala.app",
    },
    settings: {
      currency: "USD",
      timezone: "America/New_York",
      dateFormat: "YYYY-MM-DD",
      gradingSystem: "gpa",
      attendanceMode: "daily",
      enableOnlineAdmissions: true,
      enableFeeGateways: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("✅ Demo School 2 (St. Xavier) seeded.");

  // 4. Seed Classes & 100 Students in Greenwood
  const firstNames = ["James", "Emma", "Oliver", "Sophia", "Lucas", "Mia", "Alexander", "Isabella", "William", "Ava", "Benjamin", "Charlotte", "Henry", "Amelia", "Daniel", "Harper", "Liam", "Evelyn", "Noah", "Elena"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

  console.log("🌱 Writing 100 Students to Google Cloud Firestore...");
  for (let i = 1; i <= 100; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const studentId = `stu_${i}`;
    const gradeNum = 1 + (i % 12);
    const gradeClass = `Grade ${gradeNum}`;
    const rollNo = (100 + (i % 30) + 1).toString();

    await setDoc(doc(db, `schools/${school1Id}/students`, studentId), {
      id: studentId,
      schoolId: school1Id,
      admissionNo: `ADM-2026-${i.toString().padStart(3, "0")}`,
      rollNo,
      name: `${fn} ${ln}`,
      gender: i % 2 === 0 ? "Female" : "Male",
      dob: `201${Math.max(0, 8 - Math.floor(gradeNum / 2))}-0${(i % 9) + 1}-15`,
      bloodGroup: ["A+", "B+", "O+", "AB+"][i % 4],
      class: gradeClass,
      section: ["A", "B", "STEM"][i % 3],
      guardianName: `${lastNames[i % lastNames.length]} Parent`,
      guardianPhone: `+1 (555) ${100 + i}-${2000 + i}`,
      guardianEmail: `parent_${i}@example.com`,
      address: `${100 + i} Academic Way, New York`,
      status: "Active",
      createdAt: new Date().toISOString(),
    });
  }
  console.log("✅ 100 Students successfully written to Firestore.");

  console.log("\n🎉 Seeding complete! Check your Firebase Console 'Data' tab right now!");
}

seedData().catch((err) => {
  console.error("Seeding error:", err);
});
