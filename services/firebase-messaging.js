import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTR3bccO-PnPFlfxNtel2gfbupup_goLU",
  authDomain: "acai-ddff1.firebaseapp.com",
  projectId: "acai-ddff1",
  storageBucket: "acai-ddff1.firebasestorage.app",
  messagingSenderId: "218618921752",
  appId: "1:218618921752:web:c32de26abd5adfbcc4546d"
};

// 🔥 FORÇA CRIAR UMA VEZ SÓ NO CLIENTE
let app;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
}

export { app };