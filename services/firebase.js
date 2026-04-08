import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTR3bccO-PnPFlfxNtel2gfbupup_goLU",
  authDomain: "acai-ddff1.firebaseapp.com",
  projectId: "acai-ddff1",
  storageBucket: "acai-ddff1.appspot.com",
  messagingSenderId: "218618921752",
  appId: "1:218618921752:web:c32de26abd5adfbcc4546d"
};

// 🔥 cria app
const app = initializeApp(firebaseConfig);

// 🔥 cria banco
const db = getFirestore(app);

// 🔥 EXPORTA (ISSO QUE TAVA FALTANDO)
export { db };