import "@/styles/globals.css";
import { useEffect, useState } from "react";

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