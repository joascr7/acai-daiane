import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBTR3bccO-PnPFlfxNtel2gfbupup_goLU",
  authDomain: "acai-ddff1.firebaseapp.com",
  projectId: "acai-ddff1",
  storageBucket: "acai-ddff1.firebasestorage.app",
  messagingSenderId: "218618921752",
  appId: "1:218618921752:web:c32de26abd5adfbcc4546d"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);