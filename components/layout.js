import { useRouter } from "next/router";

export default function Layout({ children }) {

  const router = useRouter();
  const isLogin = router.pathname === "/login";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff" // 🔥 SEMPRE BRANCO
      }}
    >
      {isLogin ? (
        children
      ) : (
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