// services/firebaseAdmin.js

import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "acai-ddff1",
      clientEmail: "SEU_CLIENT_EMAIL_AQUI",
      privateKey: "SUA_PRIVATE_KEY_AQUI".replace(/\\n/g, "\n"),
    }),
  });
}

export const dbAdmin = admin.firestore();