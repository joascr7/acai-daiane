import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTR3bccO-PnPFlfxNtel2gfbupup_goLU",
  authDomain: "acai-ddff1.firebaseapp.com",
  projectId: "acai-ddff1",
  storageBucket: "acai-ddff1.appspot.com",
  messagingSenderId: "218618921752",
  appId: "1:218618921752:web:c32de26abd5adfbcc4546d"
};

// 🔥 GARANTE QUE SEMPRE EXISTE UM DEFAULT
let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log("🔥 Firebase inicializado");
} else {
  app = getApp();
  console.log("♻️ Firebase reutilizado");
}

export { app };