export default function Layout({ children, dark }) {
  return (
    <div
      style={{
        minHeight: "100dvh", // 🔥 AQUI A CORREÇÃO REAL
        background: dark ? "#111" : "#fff"
      }}
    >
      {children}
    </div>
  );
}