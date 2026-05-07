export default function PedidoCard({
  p,
  produtos,
  formatarReal,
  atualizarStatus,
  cancelarPedido,
  pararSom,
  tocando
}) {
  const status = p.status || "novo";

  const coresStatus = {
    novo: "#6b7280",
    preparando: "#f59e0b",
    saiu: "#0ea5e9",
    entregue: "#16a34a",
    cancelado: "#dc2626"
  };

  const tipoPedido =
    p.tipoEntrega ||
    p.tipo ||
    p.entrega?.tipo ||
    p.cliente?.tipoEntrega ||
    "entrega";

  const isRetirada = tipoPedido === "retirada";

  const formaPagamento =
    p.formaPagamento ||
    p.pagamento?.forma ||
    p.pagamento ||
    "";

  const formaPagamentoLabel = {
    pix: "Pix",
    dinheiro: "Dinheiro",
    cartao: "Cartão",
    cartao_online: "Cartão online",
    cartao_entrega: "Cartão na entrega"
  };

  const cupomCodigo =
    typeof p.cupom === "string"
      ? p.cupom
      : p.cupom?.codigo || p.cupom?.id || "";

  return (
    <div style={card}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <div style={nome}>
            {p.cliente?.nome || "Cliente"}
          </div>

          <div style={subInfo}>
            {p.cliente?.telefone}
          </div>

          {!isRetirada && (
            <div style={subInfo}>
              {p.cliente?.endereco}, {p.cliente?.numero}
            </div>
          )}
        </div>

        <div style={codigo}>
          #{p.codigo}
        </div>
      </div>

      {/* BADGES */}
      <div style={badgesContainer}>
        <Badge
          label={isRetirada ? "Retirada" : "Entrega"}
          tipo={isRetirada ? "retirada" : "entrega"}
        />

        {formaPagamento && (
          <Badge
            label={formaPagamentoLabel[formaPagamento] || formaPagamento}
            tipo="pagamento"
          />
        )}

        {cupomCodigo && (
          <Badge
            label={`Cupom ${cupomCodigo}`}
            tipo="cupom"
          />
        )}
      </div>

      {/* ITENS */}
      <div style={{ marginTop: 10 }}>
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

            return (
              <div key={i} style={itemBox}>
                <div style={itemNome}>
                  {item.nome || item.produto?.nome} ×{item.quantidade}
                </div>

                {tamanho && (
                  <div style={itemDetalhe}>{tamanho}</div>
                )}

                {Array.isArray(item.extras) &&
                  item.extras.map((e, j) => (
                    <div key={j} style={itemExtra}>
                      + {e.nome} {e.qtd > 1 ? `x${e.qtd}` : ""}
                    </div>
                  ))}
              </div>
            );
          })}
      </div>

      {/* TOTAL + STATUS */}
      <div style={footer}>
        <div>
          <div style={total}>
            {formatarReal(p.total)}
          </div>

          {p.desconto > 0 && (
            <div style={desconto}>
              Desconto: -{formatarReal(p.desconto)}
            </div>
          )}
        </div>

        <div
          style={{
            ...statusBadge,
            color: coresStatus[status]
          }}
        >
          {status}
        </div>
      </div>

      {/* AÇÕES */}
      <div style={acoes}>
        {status === "novo" && (
          <button
            onClick={() => atualizarStatus(p.id, "preparando")}
            style={btn("#f59e0b")}
          >
            Preparar
          </button>
        )}

        {status === "preparando" && (
          <button
            onClick={() => atualizarStatus(p.id, "saiu")}
            style={btn("#0ea5e9")}
          >
            Saiu
          </button>
        )}

        {status === "saiu" && (
          <button
            onClick={() => atualizarStatus(p.id, "entregue")}
            style={btn("#16a34a")}
          >
            Entregue
          </button>
        )}

        {status !== "entregue" && status !== "cancelado" && (
          <button
            onClick={() => cancelarPedido(p.id)}
            style={btn("#dc2626")}
          >
            Cancelar
          </button>
        )}

        {tocando && (
          <button
            onClick={pararSom}
            style={btnGhost}
          >
            Silenciar
          </button>
        )}
      </div>
    </div>
  );
}

function Badge({ label, tipo }) {
  const estilos = {
    entrega: {
      background: "#dcfce7",
      color: "#166534"
    },
    retirada: {
      background: "#f3f4f6",
      color: "#374151"
    },
    pagamento: {
      background: "#e0f2fe",
      color: "#075985"
    },
    cupom: {
      background: "#fffbeb",
      color: "#92400e"
    }
  };

  const style = estilos[tipo] || estilos.entrega;

  return (
    <div
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: style.background,
        color: style.color
      }}
    >
      {label}
    </div>
  );
}

function btn(color) {
  return {
    flex: 1,
    height: 38,
    background: color,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer"
  };
}

const btnGhost = {
  height: 38,
  background: "transparent",
  color: "#6b7280",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer"
};

const card = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 6
};

const nome = {
  fontWeight: 700,
  fontSize: 15,
  color: "#111827"
};

const subInfo = {
  fontSize: 12,
  color: "#4b5563"
};

const codigo = {
  fontSize: 12,
  color: "#6b7280"
};

const badgesContainer = {
  display: "flex",
  gap: 6,
  marginTop: 6,
  flexWrap: "wrap"
};

const itemBox = {
  marginBottom: 8
};

const itemNome = {
  fontWeight: 600,
  fontSize: 13,
  color: "#111827"
};

const itemDetalhe = {
  fontSize: 11,
  color: "#6b7280"
};

const itemExtra = {
  fontSize: 11,
  color: "#6b7280"
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 10
};

const total = {
  fontWeight: 700,
  fontSize: 15,
  color: "#111827"
};

const desconto = {
  fontSize: 11,
  color: "#16a34a"
};

const statusBadge = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: "capitalize"
};

const acoes = {
  display: "flex",
  gap: 8,
  marginTop: 12
};