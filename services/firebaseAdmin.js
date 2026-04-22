import admin from "firebase-admin";

const projectId = process.env.FB_PROJECT_ID;
const clientEmail = process.env.FB_CLIENT_EMAIL;
const privateKeyRaw = process.env.FB_PRIVATE_KEY;

console.log("🔥 ENV CHECK:", {
  projeto: !!projectId,
  email: !!clientEmail,
  key: privateKeyRaw ? "OK" : null,
});

if (!admin.apps.length) {
  if (!projectId || !clientEmail || !privateKeyRaw) {
    console.error("❌ ENV Firebase faltando");
  } else {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKeyRaw.replace(/\\n/g, "\n"),
      }),
    });

    console.log("✅ Firebase conectado");
  }
}

export const dbAdmin = admin.apps.length
  ? admin.firestore()
  : null;