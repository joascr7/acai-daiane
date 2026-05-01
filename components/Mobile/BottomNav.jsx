import BottomNavItem from "./BottomNavItem";
import { Home, ClipboardList, Package, DollarSign, MoreHorizontal } from "lucide-react";

export default function BottomNav({
  abaAdmin,
  setAbaAdmin,
  pedidosEmAndamento,
  setAbrirMaisMenu
}) {
  const safePedidos = Number(pedidosEmAndamento) || 0;

  return (
    <div style={nav}>
      <BottomNavItem
        id="dashboard"
        icon={Home}
        ativo={abaAdmin}
        onClick={(v) => setAbaAdmin && setAbaAdmin(v)}
      />

      <BottomNavItem
        id="pedidos"
        icon={ClipboardList}
        ativo={abaAdmin}
        onClick={(v) => setAbaAdmin && setAbaAdmin(v)}
        badge={safePedidos}
      />

      <BottomNavItem
        id="produtos"
        icon={Package}
        ativo={abaAdmin}
        onClick={(v) => setAbaAdmin && setAbaAdmin(v)}
      />

      <BottomNavItem
        id="gastos"
        icon={DollarSign}
        ativo={abaAdmin}
        onClick={(v) => setAbaAdmin && setAbaAdmin(v)}
      />

      {/* BOTÃO MAIS */}
      <button
        onClick={() => setAbrirMaisMenu && setAbrirMaisMenu(true)}
        style={btn}
      >
        <MoreHorizontal size={22} color="#6b7280" />
      </button>
    </div>
  );
}