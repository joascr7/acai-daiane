// services/firebaseDual.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTR3bccO-PnPFlfxNtel2gfbupup_goLU",
  authDomain: "acai-ddff1.firebaseapp.com",
  projectId: "acai-ddff1",
  storageBucket: "acai-ddff1.firebasestorage.app",
  messagingSenderId: "218618921752",
  appId: "1:218618921752:web:c32de26abd5adfbcc4546d",
  measurementId: "G-TWVZ9NPED1"
};

// 🔥 EVITA ERRO NO NEXT (SSR + HOT RELOAD)
let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// 🔥 EXPORTS
export { app };
export const authCliente = getAuth(app);
export const authAdmin = getAuth(app);

export const dbCliente = getFirestore(app);
export const dbAdmin = getFirestore(app);