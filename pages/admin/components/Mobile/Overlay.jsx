export default function Overlay({ onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 10000
      }}
    />
  );
}