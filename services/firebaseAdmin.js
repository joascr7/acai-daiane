import admin from "firebase-admin";

const projectId = process.env.ID_DO_PROJETO_FB;
const clientEmail = process.env.FB_CLIENT_EMAIL;
const privateKeyRaw = process.env.FB_PRIVATE_KEY;

console.log("🔥 DEBUG:");
console.log("PROJECT:", projectId);
console.log("EMAIL:", clientEmail);
console.log("KEY TYPE:", typeof privateKeyRaw);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKeyRaw?.replace(/\\n/g, "\n"),
      }),
    });

    console.log("✅ Firebase Admin OK");
  } catch (e) {
    console.log("💥 ERRO FIREBASE:", e);
  }
}

export const dbAdmin = admin.firestore();