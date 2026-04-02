import { useRouter } from "next/router";

export default function Layout({ children, dark }) {

  const router = useRouter();

  const isLogin = router.pathname === "/login";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#111" : "#fff"
      }}
    >
      {isLogin ? (
        // 🔥 LOGIN FULLSCREEN (SEM SAFE AREA)
        children
      ) : (
        // 🔥 RESTO DO APP (COM SAFE AREA CONTROLADO)
        <div
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingLeft: "env(safe-area-inset-left)",
            paddingRight: "env(safe-area-inset-right)"
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}