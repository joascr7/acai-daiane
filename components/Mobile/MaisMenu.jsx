/*/import { Truck, Bell, ImagePlus, Star, Store } from "lucide-react";

export default function MaisMenu({
  setAbaAdmin,
  setAbrirMaisMenu,
  notificacoesAdmin
}) {
  const itens = [
    { id: "fretes", label: "Fretes", icon: Truck },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "banners", label: "Banners", icon: ImagePlus },
    { id: "avaliacoes", label: "Avaliações", icon: Star },
    { id: "loja", label: "Loja", icon: Store }
  ];

  // 🔒 seguro (não quebra se undefined)
  const listaNotificacoes = Array.isArray(notificacoesAdmin)
    ? notificacoesAdmin
    : [];

  const naoLidas = listaNotificacoes.filter((n) => !n?.lida).length;

  return (
    <div style={menu}>
      {itens.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            onClick={() => {
              setAbaAdmin(item.id);
              setAbrirMaisMenu(false);
            }}
            style={itemStyle}
          >
            <Icon size={18} />

            <span>{item.label}</span>

            {item.id === "notificacoes" && naoLidas > 0 && (
              <div style={badge}>{naoLidas}</div>
            )}
          </div>
        );
      })}

      <div onClick={() => setAbrirMaisMenu(false)} style={close}>
        Fechar
      </div>
    </div>
  );
}

const menu = {
  position: "fixed",
  bottom: 70,
  right: 12,
  background: "#020617",
  borderRadius: 16,
  padding: 10,
  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
  zIndex: 10001
};

const itemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 10,
  color: "#fff",
  cursor: "pointer"
};

const badge = {
  marginLeft: "auto",
  background: "#ea1d2c",
  padding: "2px 6px",
  borderRadius: 999,
  fontSize: 10
};

const close = {
  marginTop: 6,
  color: "#ea1d2c",
  fontWeight: 700,
  cursor: "pointer"
};/*/