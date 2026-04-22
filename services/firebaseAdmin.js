// services/firebaseAdmin.js
import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

// 🔎 LOGS PARA DEBUG
console.log("🔥 ENV CHECK:", {
  projeto: !!projectId,
  email: !!clientEmail,
  key: privateKeyRaw ? "OK" : null,
});

// 🔐 Inicializa apenas uma vez
if (!admin.apps.length) {
  if (!projectId || !clientEmail || !privateKeyRaw) {
    console.error("❌ ENV Firebase faltando");
  } else {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKeyRaw.replace(/\\n/g, "\n"),
        }),
      });
      console.log("✅ Firebase Admin inicializado");
    } catch (e) {
      console.error("💥 ERRO AO INICIALIZAR FIREBASE:", e);
    }
  }
}

// 👉 Só exporta se o app existir
export const dbAdmin = admin.apps.length ? admin.firestore() : null;