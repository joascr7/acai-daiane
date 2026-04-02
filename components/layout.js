export default function Layout({ children, dark }) {
  return (
    <div
      style={{
        height: "100vh", // 🔥 VOLTA PRO VH
        width: "100%",   // 🔥 IMPORTANTE
        overflowX: "hidden", // 🔥 evita “alargar”

        background: dark ? "#111" : "#fff"
      }}
    >
      {children}
    </div>
  );
}