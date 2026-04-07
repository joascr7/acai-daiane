export default function Layout({ children, dark }) {
  return (
    <div
      style={{
        minHeight: "100dvh", // 🔥 AQUI A CORREÇÃO REAL
        background: "#f4f5f7"
      }}
    >
      {children}
    </div>
  );
}