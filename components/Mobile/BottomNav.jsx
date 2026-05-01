import BottomNavItem from "./BottomNavItem";
import { Home, ClipboardList, Package, DollarSign } from "lucide-react";

export default function BottomNav({
  abaAdmin,
  setAbaAdmin,
  pedidosEmAndamento,
  setAbrirMaisMenu
}) {
  return (
    <div style={nav}>
      <BottomNavItem
        id="dashboard"
        icon={Home}
        ativo={abaAdmin}
        onClick={setAbaAdmin}
      />

      <BottomNavItem
        id="pedidos"
        icon={ClipboardList}
        ativo={abaAdmin}
        onClick={setAbaAdmin}
        badge={pedidosEmAndamento}
      />

      <BottomNavItem
        id="produtos"
        icon={Package}
        ativo={abaAdmin}
        onClick={setAbaAdmin}
      />

      <BottomNavItem
        id="gastos"
        icon={DollarSign}
        ativo={abaAdmin}
        onClick={setAbaAdmin}
      />

      <button onClick={() => setAbrirMaisMenu(true)} style={btn}>
        ⋯
      </button>
    </div>
  );
}

const nav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#020617",
  borderTop: "1px solid #1f2937",
  display: "flex",
  zIndex: 9999,

  height: "calc(56px + env(safe-area-inset-bottom))",
  paddingBottom: "env(safe-area-inset-bottom)",

  backdropFilter: "blur(10px)"
};

const btn = {
  flex: 1,
  height: 56,
  background: "transparent",
  border: "none",
  color: "#6b7280",
  fontSize: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};