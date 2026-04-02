import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import "leaflet/dist/leaflet.css";

import { onAuthStateChanged } from "firebase/auth";
import { authCliente as auth } from "@/services/firebaseDual";

export default function App({ Component, pageProps }) {

  const [dark, setDark] = useState(true);
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

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

 return (
  <>
    <Head>
      <title>Açaí da Daiane</title>

      {/* 🔥 VIEWPORT CORRETO */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />

      {/* 🔥 COR DO APP (IMPORTANTE) */}
      <meta name="theme-color" content="#ea1d2c" />

      {/* 🔥 PWA IOS */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* 🔥 MANIFEST (CLIENTE APENAS) */}
      <link rel="manifest" href="/manifest.json" />

      {/* 🔥 ÍCONE IOS */}
      <link rel="apple-touch-icon" href="/icon-192.png" />

      {/* 🔥 FAVICON */}
      <link rel="icon" href="/favicon.ico?v=2" />
    </Head>

    <Layout dark={dark}>
      <Component {...pageProps} user={user} />
    </Layout>
  </>
);
}