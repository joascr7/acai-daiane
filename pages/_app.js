import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {

  const [dark, setDark] = useState(true); // padrão dark

  useEffect(() => {
    if (!dark) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [dark]);

  return <Component {...pageProps} />;
}

<Head>
  <title>Açaí da Daiane</title>

  <link rel="icon" href="/favicon.ico" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="apple-touch-icon" href="/icon.png" />

  <meta name="theme-color" content="#7a00ff" />
</Head>

