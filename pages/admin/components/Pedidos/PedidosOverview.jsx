import PedidoCard from "./PedidoCard";

export default function PedidosOverview({
  pedidos,
  buscaCodigo,
  setBuscaCodigo,
  produtos,
  formatarReal,
  atualizarStatus,
  cancelarPedido,
  isMobile
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
    <div style={{ marginTop: 16, color: "#fff" }}>
      
      {/* HEADER */}
      <div
        style={{
          background: "#111827",
          padding: 16,
          borderRadius: 16,
          border: "1px solid #1f2937",
          marginBottom: 16
        }}
      >
        <h2>Pedidos</h2>

        <input
          placeholder="Buscar código"
          value={buscaCodigo}
          onChange={(e) => setBuscaCodigo(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1f2937"
          }}
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
          <h3>Em andamento ({emAndamento.length})</h3>

          {emAndamento.map((p) => (
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

        {/* ENTREGUES */}
        <div>
          <h3>Entregues ({entregues.length})</h3>

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