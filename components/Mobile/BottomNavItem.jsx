/*/export default function BottomNavItem({
  id,
  icon: Icon,
  ativo,
  onClick,
  badge
}) {
  const isActive = ativo === id;

  // 🔒 proteção total
  const SafeIcon = Icon || (() => null);
  const safeBadge = Number(badge) || 0;

  return (
    <button
      onClick={() => onClick && onClick(id)}
      style={btn}
    >
      <SafeIcon
        size={22}
        color={isActive ? "#ea1d2c" : "#6b7280"}
      />

      {safeBadge > 0 && (
        <div style={badgeStyle}>{safeBadge}</div>
      )}
    </button>
  );
}

const btn = {
  flex: 1,
  height: 52,
  background: "transparent",
  border: "none",
  position: "relative"
};

const badgeStyle = {
  position: "absolute",
  top: 6,
  right: "25%",
  background: "#ea1d2c",
  color: "#fff",
  borderRadius: 999,
  fontSize: 10,
  padding: "2px 6px"
};/*/