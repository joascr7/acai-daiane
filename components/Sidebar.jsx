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
            <button onClick={() => setAberto(false)} style={btnClose}>
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
                background: ativo ? "rgba(255,255,255,0.18)" : "transparent",
                color: ativo ? "#ffffff" : "rgba(255,255,255,0.86)",
                boxShadow: ativo ? "inset 3px 0 0 #ffffff" : "none"
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

  background: "linear-gradient(180deg, #ea1d2c 0%, #d71927 55%, #bd1420 100%)",

  padding: 16,
  zIndex: 9999,

  display: "flex",
  flexDirection: "column",
  gap: 6,

  transition: "0.3s ease",

  borderRight: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "4px 0 24px rgba(0,0,0,0.16)"
};

const topo = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
  color: "#ffffff",
  fontSize: 17,
  fontWeight: 800,
  letterSpacing: 0.2
};

const itemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 14,
  transition: "0.2s ease",
  color: "rgba(255,255,255,0.88)"
};

const btnClose = {
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.18)",
  color: "#ffffff",
  cursor: "pointer",
  borderRadius: 10,
  width: 34,
  height: 34,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(2px)",
  zIndex: 9998
};