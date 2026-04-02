import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
      
    }),
  });
}
console.log("KEY:", process.env.FIREBASE_PRIVATE_KEY);
export const dbAdmin = admin.firestore();