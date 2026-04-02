export default function Layout({ children, dark }) {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: dark ? "#111" : "#fff"
      }}
    >
      {children}
    </div>
  );
}