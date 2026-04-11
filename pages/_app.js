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
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log("AUTH STATE:", u);
      console.log("UID REAL:", u?.uid || null);

      setUser(u || null);
      setLoadingAuth(false);
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

  if (loadingAuth) return null;

  return (
    <>
      <Head>
        <title>Açaí da Daiane</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ea1d2c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>

      <Layout dark={dark}>
        <Component {...pageProps} user={user} />
      </Layout>
    </>
  );
}