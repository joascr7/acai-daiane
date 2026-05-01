import {
  Home,
  ClipboardList,
  Package,
  DollarSign,
  Tag,
  Truck,
  Bell,
  Image,
  Star,
  Store,
  X,
  Menu
} from "lucide-react";

export default function Sidebar({
  abaAdmin,
  setAbaAdmin,
  aberto,
  setAberto,
  isMobile
}) {
  const itens = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "pedidos", icon: ClipboardList, label: "Pedidos" },
    { id: "cancelados", icon: ClipboardList, label: "Cancelados" },
    { id: "produtos", icon: Package, label: "Produtos" },
    { id: "avaliacoes", icon: Star, label: "Avaliações" },
    { id: "gastos", icon: DollarSign, label: "Gastos" },
    { id: "cupons", icon: Tag, label: "Cupons" },
    { id: "fretes", icon: Truck, label: "Fretes" },
    { id: "notificacoes", icon: Bell, label: "Notificações" },
    { id: "banners", icon: Image, label: "Banners" },
    { id: "loja", icon: Store, label: "Loja" }
  ];

  return (
    <>
      {/* BOTÃO MOBILE */}
      

      {/* OVERLAY */}
      {isMobile && aberto && (
        <div
          onClick={() => setAberto(false)}
          style={overlay}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...sidebar,
          left: isMobile ? (aberto ? 0 : -260) : 0
        }}
      >
        {/* TOPO */}
        <div style={topo}>
          <strong>Painel</strong>

          {isMobile && (
            <button onClick={() => setAberto(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* ITENS */}
        {itens.map((item) => {
          const Icon = item.icon;
          const ativo = abaAdmin === item.id;

          return (
            <div
              key={item.id}
              onClick={() => {
                setAbaAdmin(item.id);
                if (isMobile) setAberto(false);
              }}
              style={{
                ...itemStyle,
                background: ativo ? "#ea1d2c" : "transparent",
                color: ativo ? "#fff" : "#9ca3af"
              }}
            >
              <Icon size={18} />
              {item.label}
            </div>
          );
        })}
      </div>
    </>
  );
}

const sidebar = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 240,
  height: "100vh",
  background: "#020617",
  padding: 16,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: 6,
  transition: "0.3s"
};

const topo = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
  color: "#fff"
};

const itemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 9998
};

