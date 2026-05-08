import { useState } from "react";

export default function PedidoCard({
  p,
  produtos,
  formatarReal,
  atualizarStatus,
  cancelarPedido,
  pararSom,
  tocando
}) {
  const [mostrarDetalhes, setMostrarDetalhes] = useState(true);

  const status = p.status || "novo";

  const coresStatus = {
    novo: "#6b7280",
    pendente: "#f59e0b",
    aguardando_pagamento: "#f59e0b",
    aguardando_pagamento_online: "#f59e0b",
    preparando: "#f59e0b",
    saiu: "#0ea5e9",
    entregue: "#16a34a",
    cancelado: "#dc2626"
  };

  const statusLabel = {
    novo: "Novo",
    pendente: "Pendente",
    aguardando_pagamento: "Aguardando pagamento",
    aguardando_pagamento_online: "Aguardando pagamento",
    preparando: "Preparando",
    saiu: "Saiu para entrega",
    entregue: "Entregue",
    cancelado: "Cancelado"
  };

  const tipoPedido =
    p.tipoEntrega ||
    p.tipo ||
    p.entrega?.tipo ||
    p.cliente?.tipoEntrega ||
    (Number(p.taxaEntrega || 0) === 0 ? "retirada" : "entrega");

  const tipoNormalizado = String(tipoPedido || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const isRetirada =
    tipoNormalizado === "retirada" ||
    tipoNormalizado.includes("retirar") ||
    tipoNormalizado.includes("buscar") ||
    tipoNormalizado.includes("balcao") ||
    p.retirada === true ||
    p.entrega?.tipo === "retirada";

  const formaPagamentoBruta =
    p.formaPagamento ||
    p.pagamento?.forma ||
    p.pagamento?.tipo ||
    p.paymentMethod ||
    p.metodoPagamento ||
    p.pagamento ||
    "";

  const formaPagamento = String(formaPagamentoBruta || "")
    .toLowerCase()
    .trim();

  const formaPagamentoLabel = {
    pix: "Pix",
    dinheiro: "Dinheiro",
    cartao: "Cartão",
    cartão: "Cartão",
    cartao_online: "Cartão online",
    cartão_online: "Cartão online",
    cartao_entrega: "Cartão na entrega",
    cartão_entrega: "Cartão na entrega",
    credit_card: "Cartão online",
    debit_card: "Cartão"
  };

  const cupomCodigo =
    typeof p.cupom === "string"
      ? p.cupom
      : p.cupom?.codigo || p.cupom?.id || "";

  const enderecoCompleto = [
    p.cliente?.endereco,
    p.cliente?.numero,
    p.cliente?.bairro
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div style={card}>
      {/* TOPO */}
      <div style={topBar}>
        <div>
          <div style={codigo}>
            #{p.codigo || p.id?.slice(0, 6)}
          </div>

          <div style={dataPedido}>
            {p.data
              ? new Date(Number(p.data)).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              : ""}
          </div>
        </div>

        <div style={topActions}>
          <div
            style={{
              ...statusBadge,
              background: `${coresStatus[status] || "#6b7280"}15`,
              color: coresStatus[status] || "#6b7280"
            }}
          >
            {statusLabel[status] || status}
          </div>

          <button
            onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
            style={btnToggle}
          >
            {mostrarDetalhes ? "Ocultar" : "Detalhes"}
          </button>
        </div>
      </div>

      {mostrarDetalhes && (
        <>
          {/* CLIENTE */}
          <div style={clienteBox}>
            <div>
              <div style={nome}>
                {p.cliente?.nome || "Cliente"}
              </div>

              {p.cliente?.telefone && (
                <div style={subInfo}>
                  {p.cliente.telefone}
                </div>
              )}

              {!isRetirada && enderecoCompleto && (
                <div style={endereco}>
                  {enderecoCompleto}
                </div>
              )}

              {isRetirada && (
                <div style={retiradaInfo}>
                  Pedido para retirada na loja
                </div>
              )}
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
                label={formaPagamentoLabel[formaPagamento] || formaPagamentoBruta}
                tipo="pagamento"
              />
            )}

            {cupomCodigo && (
              <Badge
                label={`Cupom ${cupomCodigo}`}
                tipo="cupom"
              />
            )}

            {Number(p.taxaEntrega || 0) > 0 && !isRetirada && (
              <Badge
                label={`Frete ${formatarReal(p.taxaEntrega)}`}
                tipo="frete"
              />
            )}
          </div>

          {/* ITENS */}
          <div style={itensBox}>
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
                    <div style={itemLinha}>
                      <div style={itemNome}>
                        {item.nome || item.produto?.nome || "Produto"}
                      </div>

                      <div style={itemQtd}>
                        ×{item.quantidade || 1}
                      </div>
                    </div>

                    {tamanho && (
                      <div style={itemDetalhe}>
                        {tamanho}
                      </div>
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

          {/* OBSERVAÇÃO */}
          {p.observacao && (
            <div style={observacaoBox}>
              <strong>Observação:</strong> {p.observacao}
            </div>
          )}

          {/* TOTAL */}
          <div style={footer}>
            <div>
              <div style={totalLabel}>Total</div>

              <div style={total}>
                {formatarReal(p.total)}
              </div>

              {Number(p.desconto || 0) > 0 && (
                <div style={desconto}>
                  Desconto: -{formatarReal(p.desconto)}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* AÇÕES */}
      <div style={acoes}>
        {(status === "novo" ||
          status === "pendente" ||
          status === "aguardando_pagamento" ||
          status === "aguardando_pagamento_online") && (
          <button
            onClick={() => atualizarStatus(p.id, "preparando")}
            style={btn("#f59e0b")}
          >
            Preparar
          </button>
        )}

        {status === "preparando" && !isRetirada && (
          <button
            onClick={() => atualizarStatus(p.id, "saiu")}
            style={btn("#0ea5e9")}
          >
            Saiu
          </button>
        )}

        {status === "preparando" && isRetirada && (
          <button
            onClick={() => atualizarStatus(p.id, "entregue")}
            style={btn("#16a34a")}
          >
            Retirado
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
          <button onClick={pararSom} style={btnGhost}>
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
    },
    frete: {
      background: "#fef2f2",
      color: "#991b1b"
    }
  };

  const style = estilos[tipo] || estilos.entrega;

  return (
    <div
      style={{
        padding: "5px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        background: style.background,
        color: style.color,
        whiteSpace: "nowrap"
      }}
    >
      {label}
    </div>
  );
}

function btn(color) {
  return {
    flex: 1,
    minWidth: 90,
    height: 40,
    background: color,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 12
  };
}

const btnGhost = {
  flex: 1,
  minWidth: 90,
  height: 40,
  background: "#ffffff",
  color: "#6b7280",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 12
};

const btnToggle = {
  height: 34,
  padding: "0 12px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#374151",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap"
};

const card = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 16,
  marginBottom: 14,
  border: "1px solid #e5e7eb",
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 10,
  marginBottom: 12
};

const topActions = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end"
};

const codigo = {
  fontSize: 12,
  fontWeight: 800,
  color: "#ea1d2c"
};

const dataPedido = {
  marginTop: 2,
  fontSize: 11,
  color: "#6b7280"
};

const statusBadge = {
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
  textTransform: "capitalize",
  whiteSpace: "nowrap"
};

const clienteBox = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  marginBottom: 10
};

const nome = {
  fontWeight: 800,
  fontSize: 15,
  color: "#111827"
};

const subInfo = {
  marginTop: 2,
  fontSize: 12,
  color: "#4b5563"
};

const endereco = {
  marginTop: 4,
  fontSize: 12,
  color: "#374151",
  lineHeight: 1.35
};

const retiradaInfo = {
  marginTop: 4,
  fontSize: 12,
  color: "#374151",
  background: "#f3f4f6",
  display: "inline-block",
  padding: "4px 8px",
  borderRadius: 999,
  fontWeight: 700
};

const badgesContainer = {
  display: "flex",
  gap: 6,
  marginTop: 8,
  marginBottom: 12,
  flexWrap: "wrap"
};

const itensBox = {
  borderTop: "1px solid #f3f4f6",
  borderBottom: "1px solid #f3f4f6",
  padding: "10px 0",
  display: "flex",
  flexDirection: "column",
  gap: 8
};

const itemBox = {
  background: "#f9fafb",
  border: "1px solid #f3f4f6",
  borderRadius: 12,
  padding: 10
};

const itemLinha = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8
};

const itemNome = {
  fontWeight: 700,
  fontSize: 13,
  color: "#111827"
};

const itemQtd = {
  fontWeight: 800,
  fontSize: 12,
  color: "#ea1d2c"
};

const itemDetalhe = {
  marginTop: 3,
  fontSize: 11,
  color: "#6b7280"
};

const itemExtra = {
  marginTop: 3,
  fontSize: 11,
  color: "#6b7280"
};

const observacaoBox = {
  marginTop: 10,
  background: "#fff7ed",
  color: "#92400e",
  borderRadius: 12,
  padding: 10,
  fontSize: 12,
  lineHeight: 1.35
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12
};

const totalLabel = {
  fontSize: 11,
  color: "#6b7280",
  fontWeight: 700
};

const total = {
  marginTop: 2,
  fontWeight: 900,
  fontSize: 18,
  color: "#111827"
};

const desconto = {
  marginTop: 2,
  fontSize: 11,
  color: "#16a34a",
  fontWeight: 700
};

const acoes = {
  display: "flex",
  gap: 8,
  marginTop: 14,
  flexWrap: "wrap"
};