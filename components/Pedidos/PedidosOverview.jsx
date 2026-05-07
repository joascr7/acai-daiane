import PedidoCard from "./PedidoCard";

export default function PedidosOverview({
  pedidos = [],
  buscaCodigo,
  setBuscaCodigo,
  produtos,
  formatarReal,
  atualizarStatus,
  cancelarPedido,
  isMobile,
  pararSom,     // 🔥 vem do Admin
  tocando       // 🔥 vem do Admin
}) {
  const filtrar = (p) => {
    if (!buscaCodigo) return true;
    return (p.codigo || "")
      .toLowerCase()
      .includes(buscaCodigo.toLowerCase());
  };

  const emAndamento = pedidos.filter(
    (p) =>
      filtrar(p) &&
      p.status !== "entregue" &&
      p.status !== "cancelado"
  );

  const entregues = pedidos.filter(
    (p) => filtrar(p) && p.status === "entregue"
  );

  return (
    <div style={container}>
      {/* HEADER */}
      <div style={header}>
        <h2 style={titulo}>Pedidos</h2>

        <input
          placeholder="Buscar código do pedido"
          value={buscaCodigo}
          onChange={(e) => setBuscaCodigo(e.target.value)}
          style={input}
        />
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 16
        }}
      >
        {/* EM ANDAMENTO */}
        <div>
          <h3 style={secaoTitulo}>
            Em andamento ({emAndamento.length})
          </h3>

          {emAndamento.map((p) => (
            <PedidoCard
              key={p.id}
              p={p}
              produtos={produtos}
              formatarReal={formatarReal}
              atualizarStatus={atualizarStatus}
              cancelarPedido={cancelarPedido}
              pararSom={pararSom}   // 🔥 controle central
              tocando={tocando}     // 🔥 estado global
            />
          ))}
        </div>

        {/* ENTREGUES */}
        <div>
          <h3 style={secaoTitulo}>
            Entregues ({entregues.length})
          </h3>

          {entregues.map((p) => (
            <PedidoCard
              key={p.id}
              p={p}
              produtos={produtos}
              formatarReal={formatarReal}
              atualizarStatus={atualizarStatus}
              cancelarPedido={cancelarPedido}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const container = {
  marginTop: 16,
  background: "#f7f7f7",
  padding: 12,
  minHeight: "100vh"
};

const header = {
  background: "#ffffff",
  padding: 16,
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  marginBottom: 16,
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
};

const titulo = {
  marginBottom: 10,
  fontSize: 18,
  fontWeight: 700,
  color: "#111827"
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  background: "#ffffff",
  color: "#111827",
  border: "1px solid #e5e7eb",
  outline: "none",
  fontSize: 13
};

const secaoTitulo = {
  color: "#111827",
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 12
};