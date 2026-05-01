export default function PedidoCard({
  p,
  produtos,
  formatarReal,
  atualizarStatus,
  cancelarPedido
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

          const produtoBanco = produtos.find(prod =>
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
              
              <div>
                <strong>
                  {item.nome || item.produto?.nome} (x{item.quantidade})
                </strong>

                {item.gratis && (
                  <span style={{
                    marginLeft: 6,
                    fontSize: 11,
                    color: "#22c55e",
                    fontWeight: 700
                  }}>
                    🎁 GRÁTIS
                  </span>
                )}
              </div>

              {/* TAMANHO */}
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

              {/* EXTRAS */}
              {Array.isArray(item.extras) &&
                item.extras.map((e, j) => (
                  <div
                    key={j}
                    style={{
                      fontSize: 12,
                      color: "#9ca3af"
                    }}
                  >
                    + {e.nome} {e.qtd > 1 ? `x${e.qtd}` : ""}
                  </div>
                ))}
            </div>
          );
        })}

      {/* PAGAMENTO */}
      <div style={{ marginTop: 6 }}>
        Pagamento:
        <span
          style={{
            marginLeft: 6,
            background:
              p.formaPagamento === "pix"
                ? "#7c3aed"
                : p.formaPagamento === "dinheiro"
                ? "#16a34a"
                : "#2563eb",
            padding: "2px 6px",
            borderRadius: 6,
            fontSize: 12
          }}
        >
          {p.formaPagamento}
        </span>
      </div>

      {/* TOTAL */}
      <div style={{ marginTop: 6 }}>
        Total: <strong>{formatarReal(p.total)}</strong>
      </div>

      {/* DATA */}
      <div style={{ fontSize: 11, color: "#9ca3af" }}>
        {p.data
          ? new Date(p.data).toLocaleString("pt-BR")
          : ""}
      </div>

      {/* STATUS */}
      <div style={{ marginTop: 6 }}>
        Status:
        <span style={{ color: cores[status], marginLeft: 6 }}>
          {status}
        </span>
      </div>

      {/* AÇÕES */}
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {status === "novo" && (
          <button onClick={() => atualizarStatus(p.id, "preparando")}>
            Preparar
          </button>
        )}

        {status === "preparando" && (
          <button onClick={() => atualizarStatus(p.id, "saiu")}>
            Saiu
          </button>
        )}

        {status === "saiu" && (
          <button onClick={() => atualizarStatus(p.id, "entregue")}>
            Entregue
          </button>
        )}
      </div>

      {/* CANCELAR */}
      {status !== "entregue" && status !== "cancelado" && (
  <button
    onClick={() => cancelarPedido(p.id)}
    style={{
      marginTop: 8,
      background: "#ef4444",
      color: "#fff",
      padding: "6px 10px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontWeight: 600
    }}
  >
    Cancelar
  </button>
)}
    </div>
  );
}