import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTR3bccO-PnPFlfxNtel2gfbupup_goLU",
  authDomain: "acai-ddff1.firebaseapp.com",
  projectId: "acai-ddff1",
  storageBucket: "acai-ddff1.appspot.com",
  messagingSenderId: "218618921752",
  appId: "1:218618921752:web:c32de26abd5adfbcc4546d"
};

// 🔥 CRIA O DEFAULT SEMPRE
const app = getApps().find(app => app.name === "[DEFAULT]")
  || initializeApp(firebaseConfig);

export { app };