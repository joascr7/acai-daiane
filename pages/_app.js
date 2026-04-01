import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout";
export default function App({ Component, pageProps }) {

  // 🔥 DARK MODE
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (!dark) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [dark]);

  // 🔥 PWA INSTALL
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      console.log("🔥 Pode instalar o app!");
      window.deferredPrompt = e;
    });
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

      <Component {...pageProps} />
    </>
  );
}
