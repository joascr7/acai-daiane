export default function PedidoCard({
  p,
  produtos,
  formatarReal,
  atualizarStatus,
  cancelarPedido,
  pararSom,     // 🔥 vem do pai
  tocando       // 🔥 vem do pai
}) {
  const status = p.status || "novo";

  const cores = {
    novo: "#9ca3af",
    preparando: "#f59e0b",
    saiu: "#38bdf8",
    entregue: "#22c55e",
    cancelado: "#ef4444"
  };

  const temFidelidade =
    Array.isArray(p.itens) &&
    p.itens.some(item => item.gratis);

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 16,
        padding: 14,
        border: "1px solid #1f2937",
        marginBottom: 12,
        borderLeft: `4px solid ${
          temFidelidade ? "#22c55e" : cores[status]
        }`,
        color: "#fff"
      }}
    >
      {/* CLIENTE */}
      <div style={{ marginBottom: 8 }}>
        <strong>{p.cliente?.nome || "Cliente"}</strong><br />
        <span style={{ fontSize: 12, color: "#9ca3af" }}>
          {p.cliente?.telefone}
        </span><br />
        <span style={{ fontSize: 12, color: "#9ca3af" }}>
          {p.cliente?.endereco}, {p.cliente?.numero}
        </span>
      </div>

      {/* CÓDIGO */}
      <div style={{ marginBottom: 6 }}>
        Código: <strong>{p.codigo}</strong>
      </div>

      {/* ITENS */}
      {Array.isArray(p.itens) &&
        p.itens.map((item, i) => {
          const produtoBanco = produtos.find(
            (prod) =>
              prod.id === item.produtoId ||
              prod.nome === item.nome ||
              prod.nome === item.produto?.nome
          );

          const tamanho =
            item.tamanho || produtoBanco?.tamanho || "";

          const desc =
            item.descricaoTamanho ||
            produtoBanco?.descricaoTamanho ||
            "";

          return (
            <div key={i} style={{ marginBottom: 6 }}>
              <strong>
                {item.nome || item.produto?.nome} (x{item.quantidade})
              </strong>

              {(tamanho || desc) && (
                <div
                  style={{
                    background: "#1f2937",
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: 999,
                    fontSize: 11,
                    marginTop: 2
                  }}
                >
                  {tamanho}
                  {desc && ` • ${desc}`}
                </div>
              )}

              {Array.isArray(item.extras) &&
                item.extras.map((e, j) => (
                  <div key={j} style={{ fontSize: 12, color: "#9ca3af" }}>
                    + {e.nome} {e.qtd > 1 ? `x${e.qtd}` : ""}
                  </div>
                ))}
            </div>
          );
        })}

      {/* TOTAL */}
      <div style={{ marginTop: 6 }}>
        Total: <strong>{formatarReal(p.total)}</strong>
      </div>

      {/* STATUS */}
      <div style={{ marginTop: 6 }}>
        Status:
        <span style={{ color: cores[status], marginLeft: 6 }}>
          {status}
        </span>
      </div>

      {/* 🔥 AÇÕES STATUS PREMIUM */}
<div style={{ display: "flex", gap: 8, marginTop: 12 }}>

  {status === "novo" && (
    <button
      onClick={() => atualizarStatus(p.id, "preparando")}
      style={{
        flex: 1,
        height: 40,
        background: "#f59e0b",
        color: "#111",
        border: "none",
        borderRadius: 10,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#d97706";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#f59e0b";
      }}
    >
      Preparar
    </button>
  )}

  {status === "preparando" && (
    <button
      onClick={() => atualizarStatus(p.id, "saiu")}
      style={{
        flex: 1,
        height: 40,
        background: "#38bdf8",
        color: "#022c22",
        border: "none",
        borderRadius: 10,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#0ea5e9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#38bdf8";
      }}
    >
      Saiu
    </button>
  )}

  {status === "saiu" && (
    <button
      onClick={() => atualizarStatus(p.id, "entregue")}
      style={{
        flex: 1,
        height: 40,
        background: "#22c55e",
        color: "#052e16",
        border: "none",
        borderRadius: 10,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#16a34a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#22c55e";
      }}
    >
      Entregue
    </button>
  )}

</div>

      {/* 🔥 AÇÕES FINAIS PREMIUM */}
      {status !== "entregue" && status !== "cancelado" && (
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>

          {/* 🔇 BOTÃO SOM */}
          {tocando && (
            <button
              onClick={pararSom}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "#1f2937",
                border: "1px solid #374151",
                color: "#9ca3af",
                cursor: "pointer",
                fontSize: 18
              }}
            >
              🔇
            </button>
          )}

          {/* CANCELAR */}
          <button
            onClick={() => cancelarPedido(p.id)}
            style={{
              flex: 1,
              height: 44,
              background: "#ef4444",
              color: "#fff",
              borderRadius: 12,
              border: "none",
              fontWeight: 700
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}