// services/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 ADICIONAR ISSO
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

// Inicializa
const app = initializeApp(firebaseConfig);

// 🔥 BANCO
export const db = getFirestore(app);

// 🔥 AUTH (ESSENCIAL PRO ADMIN)
export const auth = getAuth(app);