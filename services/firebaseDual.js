// services/firebaseDual.js

import { initializeApp, getApps } from "firebase/app";
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

// 🔥 UM ÚNICO APP
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// 🔥 EXPORTA TUDO DO MESMO APP
export const authCliente = getAuth(app);
export const authAdmin = getAuth(app);

export const dbCliente = getFirestore(app);
export const dbAdmin = getFirestore(app);