import admin from "firebase-admin";

const projectId = process.env.ID_DO_PROJETO_FB;
const clientEmail = process.env.FB_CLIENT_EMAIL;
const privateKeyRaw = process.env.FB_PRIVATE_KEY;

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

// 🔥 SÓ EXPORTA SE EXISTIR APP
export const dbAdmin = admin.apps.length
  ? admin.firestore()
  : null;