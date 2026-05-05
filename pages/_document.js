import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* 🔥 VIEWPORT CORRETO */}
        
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#ea1d2c" />

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Açaí Daiane" />
            <link rel="apple-touch-icon" href="/icon-192.png" />

       <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}