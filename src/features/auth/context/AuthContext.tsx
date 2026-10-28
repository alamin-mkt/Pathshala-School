"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import type { UserProfile, UserRole, School } from "@/types";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  school: School | null;
  role: UserRole | null;
  schoolId: string | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  switchDemoRole: (role: UserRole, schoolId?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user profiles for local evaluation & seamless preview
const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  superAdmin: {
    uid: "superadmin_demo",
    email: "superadmin@pathshala.app",
    displayName: "Platform Director",
    role: "superAdmin",
    schoolId: "platform",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  schoolAdmin: {
    uid: "admin_demo",
    email: "admin@greenwood.edu",
    displayName: "Dr. Sarah Jenkins",
    role: "schoolAdmin",
    schoolId: "demo-school-greenwood",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  principal: {
    uid: "principal_demo",
    email: "principal@greenwood.edu",
    displayName: "Prof. Arthur Pendelton",
    role: "principal",
    schoolId: "demo-school-greenwood",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  teacher: {
    uid: "teacher_demo",
    email: "clara.math@greenwood.edu",
    displayName: "Ms. Clara Higgins",
    role: "teacher",
    schoolId: "demo-school-greenwood",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  accountant: {
    uid: "accountant_demo",
    email: "accounts@greenwood.edu",
    displayName: "Robert Vance",
    role: "accountant",
    schoolId: "demo-school-greenwood",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  librarian: {
    uid: "librarian_demo",
    email: "library@greenwood.edu",
    displayName: "Eleanor Brooks",
    role: "librarian",
    schoolId: "demo-school-greenwood",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  receptionist: {
    uid: "receptionist_demo",
    email: "frontdesk@greenwood.edu",
    displayName: "Maya Patel",
    role: "receptionist",
    schoolId: "demo-school-greenwood",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  student: {
    uid: "student_demo",
    email: "alex.turner@student.greenwood.edu",
    displayName: "Alex Turner",
    role: "student",
    schoolId: "demo-school-greenwood",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  parent: {
    uid: "parent_demo",
    email: "elizabeth.turner@gmail.com",
    displayName: "Elizabeth Turner",
    role: "parent",
    schoolId: "demo-school-greenwood",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

const DEFAULT_DEMO_SCHOOL: School = {
  schoolId: "demo-school-greenwood",
  name: "Greenwood International School",
  slug: "greenwood",
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
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(DEMO_PROFILES.schoolAdmin); // default to schoolAdmin demo
  const [school, setSchool] = useState<School | null>(DEFAULT_DEMO_SCHOOL);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check saved demo role preference from localStorage
    const savedRole = typeof window !== "undefined" ? (localStorage.getItem("pathshala_active_role") as UserRole) : null;
    if (savedRole && DEMO_PROFILES[savedRole]) {
      setProfile(DEMO_PROFILES[savedRole]);
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data() as UserProfile;
            setProfile(data);

            if (data.schoolId && data.schoolId !== "platform") {
              const schoolDocRef = doc(db, "schools", data.schoolId);
              const schoolSnap = await getDoc(schoolDocRef);
              if (schoolSnap.exists()) {
                setSchool(schoolSnap.data() as School);
              }
            }
          }
        } catch {
          // Fall back gracefully to active profile state
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch {
      // If offline/demo auth fails, map recognized demo emails directly
      const matched = Object.values(DEMO_PROFILES).find((p) => p.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setProfile(matched);
        if (typeof window !== "undefined") {
          localStorage.setItem("pathshala_active_role", matched.role);
        }
      } else {
        throw new Error("Invalid credentials. For quick demo, select a role from the demo picker.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      console.warn("Google sign in fallback triggered:", e.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch {
      // Ignored
    } finally {
      setUser(null);
      setProfile(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("pathshala_active_role");
      }
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const switchDemoRole = (role: UserRole, schoolId?: string) => {
    const demoProf = DEMO_PROFILES[role];
    if (demoProf) {
      const updated = { ...demoProf, schoolId: schoolId || demoProf.schoolId };
      setProfile(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("pathshala_active_role", role);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        school,
        role: profile?.role || null,
        schoolId: profile?.schoolId || null,
        loading,
        signIn,
        signInGoogle,
        signOut,
        resetPassword,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
