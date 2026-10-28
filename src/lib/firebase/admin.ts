import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "pathshala-school-demo",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "pathshala-school-demo.appspot.com",
    });
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

export const adminAuth = admin.apps.length ? admin.auth() : null;
export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminStorage = admin.apps.length ? admin.storage() : null;

/**
 * Assign tenant custom claims securely
 */
export async function setUserTenantClaims(uid: string, claims: { role: string; schoolId: string }) {
  if (!adminAuth) {
    throw new Error("Admin Auth is not initialized");
  }
  await adminAuth.setCustomUserClaims(uid, claims);
  return { success: true, uid, claims };
}
