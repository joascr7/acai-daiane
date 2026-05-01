export default function Overlay({ onClick }) {
  return (
    <div
      onClick={() => onClick && onClick()}
      style={overlay}
    />
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 10000,
  WebkitTapHighlightColor: "transparent" // 🔥 melhora iOS
};