export default function CanceladosOverview({
  agrupados = {},
  aberto,
  setAberto,
  formatarReal,
  pedidosCancelados = [],
  apagarPedidoCancelado,
  apagarTodosCancelados
}) {
  return (
    <div
      style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#f7f7f7",
        padding: 12,
        borderRadius: 16,
        color: "#111827"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap"
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 18 }}>
            Pedidos cancelados
          </h2>

          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
            {pedidosCancelados.length} pedido(s)
          </div>
        </div>

        {pedidosCancelados.length > 0 && (
          <button
            onClick={apagarTodosCancelados}
            style={btnDanger}
          >
            Apagar todos
          </button>
        )}
      </div>

      {Object.entries(agrupados).map(([cliente, lista]) => {
        const abertoCliente = aberto === cliente;

        return (
          <div
            key={cliente}
            style={{
              borderRadius: 14,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              overflow: "hidden"
            }}
          >
            {/* HEADER CLIENTE */}
            <div
              onClick={() =>
                setAberto(abertoCliente ? null : cliente)
              }
              style={{
                padding: "12px 14px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#ffffff"
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "#111827" }}>
                  {cliente}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280"
                  }}
                >
                  {lista.length} cancelado(s)
                </div>
              </div>

              <div
                style={{
                  background: "#fee2e2",
                  color: "#991b1b",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700
                }}
              >
                Cancelados
              </div>
            </div>

            {/* LISTA */}
            {abertoCliente && (
              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  background: "#fafafa"
                }}
              >
                {lista.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid #e5e7eb"
                    }}
                  >
                    {/* TOPO */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 10
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#111827"
                          }}
                        >
                          #{p.codigo} — {formatarReal(p.total)}
                        </div>

                        <div
                          style={{
                            fontSize: 11,
                            color: "#9ca3af",
                            marginTop: 4
                          }}
                        >
                          {p.data
                            ? new Date(p.data).toLocaleString("pt-BR")
                            : ""}
                        </div>
                      </div>

                      <button
                        onClick={() => apagarPedidoCancelado(p.id)}
                        style={btnRemove}
                      >
                        Apagar
                      </button>
                    </div>

                    {/* ITENS */}
                    {Array.isArray(p.itens) &&
                      p.itens.map((item, i) => (
                        <div key={i} style={{ marginTop: 6 }}>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#374151"
                            }}
                          >
                            {item.nome} (x{item.quantidade})
                          </div>

                          {Array.isArray(item.extras) &&
                            item.extras.map((e, j) => {
                              const qtd = Number(e?.qtd || 1);

                              return (
                                <div
                                  key={j}
                                  style={{
                                    fontSize: 11,
                                    color: "#6b7280",
                                    marginLeft: 6
                                  }}
                                >
                                  + {e.nome} {qtd > 1 ? `x${qtd}` : ""}
                                </div>
                              );
                            })}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {pedidosCancelados.length === 0 && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            padding: 18,
            textAlign: "center",
            color: "#6b7280",
            border: "1px solid #e5e7eb"
          }}
        >
          Nenhum pedido cancelado
        </div>
      )}
    </div>
  );
}

const btnDanger = {
  height: 38,
  padding: "0 14px",
  borderRadius: 10,
  border: "none",
  background: "#dc2626",
  color: "#ffffff",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer"
};

const btnRemove = {
  height: 32,
  padding: "0 10px",
  borderRadius: 9,
  border: "none",
  background: "#fee2e2",
  color: "#991b1b",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap"
};