import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import "leaflet/dist/leaflet.css";

// 🔥 FIREBASE AUTH
import { onAuthStateChanged } from "firebase/auth";
import { authCliente as auth } from "@/services/firebaseDual";

export default function App({ Component, pageProps }) {

  // 🌙 DARK MODE
  const [dark, setDark] = useState(true);

  // 🔐 USER GLOBAL (NOVO)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!dark) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [dark]);

  // 📲 PWA INSTALL
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Açaí da Daiane</title>

        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />

        <meta name="theme-color" content="#7a00ff" />
      </Head>

      {/* 🔥 LAYOUT GLOBAL */}
      <Layout dark={dark} setDark={setDark}>
        {/* 🔥 PASSANDO USER PRA TODAS AS PÁGINAS */}
        <Component {...pageProps} user={user} />
      </Layout>
    </>
  );
}