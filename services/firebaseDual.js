// services/firebaseDual.js

import { initializeApp, getApps } from "firebase/app";
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


// CLIENTE
const appCliente =
  getApps().find(app => app.name === "cliente") ||
  initializeApp(firebaseConfig, "cliente");

// ADMIN
const appAdmin =
  getApps().find(app => app.name === "admin") ||
  initializeApp(firebaseConfig, "admin");

// 🔥 AUTH
export const authCliente = getAuth(appCliente);
export const authAdmin = getAuth(appAdmin);

// 🔥 DB CORRETO (MESMO APP DO CLIENTE)
export const dbCliente = getFirestore(appCliente);