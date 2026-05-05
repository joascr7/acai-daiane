import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* VIEWPORT */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* PWA / iOS */}
        <meta name="theme-color" content="#ffffff" />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* 🔥 REMOVE TRANSLUCENT (ESSENCIAL) */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />

        <meta name="apple-mobile-web-app-title" content="Açaí Daiane" />

        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>

      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#ffffff"
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}