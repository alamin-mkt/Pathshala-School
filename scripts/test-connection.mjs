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
  apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("\n=======================================================");
console.log("🔍 Checking Firebase & Google Cloud Firestore Connection");
console.log("=======================================================");
console.log(`📌 Project ID: ${firebaseConfig.projectId || "Not configured"}`);
console.log(`📌 Auth Domain: ${firebaseConfig.authDomain || "Not configured"}`);

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("DummyKey")) {
  console.log("\n⚠️  Status: Currently configured with placeholder/demo keys in .env.local.");
  console.log("👉 Follow the guide below to add your live Google Firebase credentials.\n");
  process.exit(0);
}

try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log("🚀 Testing write operation to Cloud Firestore collection '_system_health'...");
  const testDocRef = doc(db, "_system_health", "connection_test");
  await setDoc(testDocRef, {
    connectedAt: new Date().toISOString(),
    status: "ONLINE",
    client: "Pathshala School SaaS",
  });

  console.log("\n✅ SUCCESS: Connected to live Google Cloud Firestore database successfully!\n");
} catch (error) {
  console.error("\n❌ Connection error:", error.message, "\n");
}
