import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* VIEWPORT */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />

        {/* PWA / iOS */}
        <meta name="theme-color" content="#ea1d2c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Açaí Daiane" />

        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>

      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#ea1d2c"
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}