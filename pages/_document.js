import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* 🔥 VIEWPORT */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />

        {/* 🔥 PWA */}
        <meta name="theme-color" content="#ea1d2c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Açaí Daiane" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* 🔥 REMOVE TELA BRANCA + SPLASH */}
        <style>{`
          body {
            margin: 0;
            background: #000;
          }

          #splash {
            position: fixed;
            inset: 0;
            z-index: 999999;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          #splash video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
      </Head>

      <body>
        {/* 🔥 SPLASH VIDEO */}
        <div id="splash">
          <video
            src="/splash.mp4"
            autoPlay
            muted
            playsInline
          />
        </div>

        <Main />
        <NextScript />

        {/* 🔥 REMOVE SPLASH DEPOIS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("load", function () {
                setTimeout(() => {
                  const splash = document.getElementById("splash");
                  if (splash) {
                    splash.style.opacity = "0";
                    splash.style.transition = "opacity 0.6s ease";
                    setTimeout(() => splash.remove(), 600);
                  }
                }, 2500);
              });
            `,
          }}
        />
      </body>
    </Html>
  );
}