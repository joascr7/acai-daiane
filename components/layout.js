export default function Layout({ children, dark }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#111" : "#fff"
      }}
    >
      {children}
    </div>
  );
}