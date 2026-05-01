export default function CanceladosOverview({
  agrupados = {},
  aberto,
  setAberto,
  formatarReal,
  pedidosCancelados = []
}) {
  return (
    <div
      style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#0f172a",
        padding: 12,
        borderRadius: 16,
        color: "#fff"
      }}
    >
      {Object.entries(agrupados).map(([cliente, lista]) => {
        const abertoCliente = aberto === cliente;

        return (
          <div
            key={cliente}
            style={{
              borderRadius: 14,
              background: "#111827",
              border: "1px solid #1f2937",
              overflow: "hidden"
            }}
          >
            {/* HEADER */}
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
                background: "#0f172a"
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>
                  {cliente}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#9ca3af"
                  }}
                >
                  {lista.length} cancelado(s)
                </div>
              </div>

              <div
                style={{
                  background: "#7f1d1d",
                  color: "#fecaca",
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
                  borderTop: "1px solid #1f2937",
                  background: "#020617"
                }}
              >
                {lista.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid #1f2937"
                    }}
                  >
                    {/* TOPO */}
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600
                      }}
                    >
                      #{p.codigo} — {formatarReal(p.total)}
                    </div>

                    {/* ITENS */}
                    {Array.isArray(p.itens) &&
                      p.itens.map((item, i) => (
                        <div key={i} style={{ marginTop: 4 }}>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#d1d5db"
                            }}
                          >
                            {item.nome} (x{item.quantidade})
                          </div>

                          {/* EXTRAS */}
                          {Array.isArray(item.extras) &&
                            item.extras.map((e, j) => {
                              const qtd = Number(e?.qtd || 1);

                              return (
                                <div
                                  key={j}
                                  style={{
                                    fontSize: 11,
                                    color: "#9ca3af",
                                    marginLeft: 6
                                  }}
                                >
                                  + {e.nome}{" "}
                                  {qtd > 1 ? `x${qtd}` : ""}
                                </div>
                              );
                            })}
                        </div>
                      ))}

                    {/* DATA */}
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6b7280",
                        marginTop: 4
                      }}
                    >
                      {p.data
                        ? new Date(p.data).toLocaleString("pt-BR")
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* VAZIO */}
      {pedidosCancelados.length === 0 && (
        <div
          style={{
            background: "#111827",
            borderRadius: 14,
            padding: 18,
            textAlign: "center",
            color: "#9ca3af",
            border: "1px solid #1f2937"
          }}
        >
          Nenhum pedido cancelado
        </div>
      )}
    </div>
  );
}