export default function Layout({ children, dark }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#111" : "#fff",

        // 🔥 SAFE AREA GLOBAL (SÓ AQUI!)
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",

        // 🔥 evita bug lateral em iPhone
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)"
      }}
    >
      {children}
    </div>
  );
}