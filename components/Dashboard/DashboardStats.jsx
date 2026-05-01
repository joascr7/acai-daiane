import { ShoppingBag, Package, Ticket, Store } from "lucide-react";

export default function DashboardStats({
  pedidosEmAndamento,
  produtosAtivos,
  cupons,
  lojaAberta,
  isMobile
}) {
  const stats = [
    {
      titulo: "Pedidos",
      valor: pedidosEmAndamento,
      cor: "#3b82f6",
      icon: <ShoppingBag size={18} />
    },
    {
      titulo: "Produtos",
      valor: produtosAtivos,
      cor: "#a855f7",
      icon: <Package size={18} />
    },
    {
      titulo: "Cupons",
      valor: cupons.length,
      cor: "#f97316",
      icon: <Ticket size={18} />
    },
    {
      titulo: "Status",
      valor: lojaAberta ? "Aberta" : "Fechada",
      cor: lojaAberta ? "#22c55e" : "#ef4444",
      icon: <Store size={18} />
    }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        gap: 14,
        marginTop: 10
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: 16,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            transition: "0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* TOPO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: `${s.cor}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: s.cor
              }}
            >
              {s.icon}
            </div>

            <span
              style={{
                fontSize: 12,
                color: "#9ca3af",
                fontWeight: 600
              }}
            >
              {s.titulo}
            </span>
          </div>

          {/* VALOR */}
          <strong
            style={{
              fontSize: 20,
              color: "#fff"
            }}
          >
            {s.valor}
          </strong>

          {/* STATUS EXTRA */}
          {s.titulo === "Status" && (
            <div
              style={{
                fontSize: 11,
                color: s.cor,
                fontWeight: 700
              }}
            >
              {lojaAberta ? "Funcionando normalmente" : "Loja pausada"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}