import {
  ShoppingBag,
  Package,
  Ticket,
  Store,
  Users,
  DollarSign,
  CheckCircle2
} from "lucide-react";

export default function DashboardStats({
  pedidosEmAndamento,
  
  produtosAtivos,
  cupons = [],
  lojaAberta,
  usuarios = [],
  pedidos = [],
  vendasManuais = [],
  formatarReal,
  isMobile
}) {
  const clientesValidos = usuarios.filter((u) => {
    return (
      u?.uid ||
      u?.clienteEmail ||
      u?.email ||
      u?.clienteTelefone ||
      u?.clienteNome
    );
  });

  const totalPedidos = pedidos
  .filter((p) => {
    const status = String(p.status || "").toLowerCase();

    return (
      status !== "cancelado" &&
      status !== "pendente" &&
      status !== "aguardando_pagamento" &&
      status !== "aguardando_pagamento_online"
    );
  })
  .reduce((acc, p) => acc + Number(p.total || 0), 0);

const totalManual = vendasManuais.reduce((acc, v) => {
  return acc + Number(v.valor || 0);
}, 0);

const totalVendas = totalPedidos + totalManual;

const pedidosFinalizadosSite = pedidos.filter((p) => {
  const status = String(p.status || "").toLowerCase();

  return (
    status === "entregue" ||
    status === "finalizado"
  );
}).length;

const vendasManuaisFinalizadas = vendasManuais.length;

const pedidosFinalizados =
  pedidosFinalizadosSite + vendasManuaisFinalizadas;

  const stats = [
    {
      titulo: "Pedidos Abertos",
      valor: pedidosEmAndamento,
      cor: "#3b82f6",
      icon: <ShoppingBag size={18} />
    },

    {
  titulo: "Finalizados",
  valor: pedidosFinalizados,
  cor: "#16a34a",
  icon: <CheckCircle2 size={18} />
},

    {
  titulo: "Vendas",
  valor: formatarReal(totalVendas),
  cor: "#16a34a",
  icon: <DollarSign size={18} />
},
    {
      titulo: "Clientes",
      valor: clientesValidos.length,
      cor: "#06b6d4",
      icon: <Users size={18} />
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
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(7, 1fr)",
        gap: 14,
        marginTop: 10
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            transition: "0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
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
                background: `${s.cor}15`,
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
                color: "#6b7280",
                fontWeight: 600
              }}
            >
              {s.titulo}
            </span>
          </div>

          <strong
            style={{
              fontSize: 20,
              color: "#111827"
            }}
          >
            {s.valor}
          </strong>

          {s.titulo === "Status" && (
            <div
              style={{
                fontSize: 11,
                color: s.cor,
                fontWeight: 700
              }}
            >
              {lojaAberta
                ? "Funcionando normalmente"
                : "Loja pausada"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}