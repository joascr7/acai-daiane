export default function AvaliacoesOverview({
  avaliacoes = [],
  produtos = [],
  filtroAvaliacao,
  setFiltroAvaliacao,
  busca,
  setBusca,
  aprovarAvaliacao,
  recusarAvaliacao,
  isMobile
}) {
  return (
    <div
      style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        color: "#fff"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 18,
          border: "1px solid #1f2937"
        }}
      >
        <h2 style={{ margin: 0 }}>Avaliações</h2>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>
          Controle de feedbacks dos clientes
        </span>
      </div>

      {/* FILTROS */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto"
        }}
      >
        {["todas", "pendente", "aprovado", "recusado"].map((f) => {
          const count =
            f === "todas"
              ? avaliacoes.length
              : avaliacoes.filter((a) => a.status === f).length;

          const ativo = filtroAvaliacao === f;

          return (
            <div
              key={f}
              onClick={() => setFiltroAvaliacao(f)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: ativo ? "#ea1d2c" : "#111827",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                border: "1px solid #1f2937",
                whiteSpace: "nowrap"
              }}
            >
              {f} ({count})
            </div>
          );
        })}
      </div>

      {/* BUSCA */}
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar produto..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: "1px solid #1f2937",
          background: "#111827",
          color: "#fff"
        }}
      />

      {/* LISTA */}
      <div
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 14,
          border: "1px solid #1f2937"
        }}
      >
        {avaliacoes
          .filter((a) => {
            const produto = produtos.find((p) => p.id === a.produtoId);

            const passaFiltro =
              filtroAvaliacao === "todas" ||
              a.status === filtroAvaliacao;

            const passaBusca =
              !busca ||
              produto?.nome?.toLowerCase().includes(busca.toLowerCase());

            return passaFiltro && passaBusca;
          })
          .sort((a, b) => Number(b.criadoEm) - Number(a.criadoEm))
          .map((a) => {
            const produto = produtos.find((p) => p.id === a.produtoId);

            const corStatus =
              a.status === "aprovado"
                ? "#22c55e"
                : a.status === "recusado"
                ? "#ef4444"
                : "#f59e0b";

            return (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 12,
                  borderRadius: 14,
                  background: "#0f172a",
                  marginBottom: 10,
                  border: "1px solid #1f2937"
                }}
              >
                <img
                  src={produto?.imagem || "/acai.png"}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    objectFit: "cover"
                  }}
                />

                <div style={{ flex: 1 }}>
                  <strong>{produto?.nome}</strong>

                  <div style={{ fontSize: 12, color: "#9ca3af" }}>
                    Pedido #{a.pedidoId?.slice(0, 6)}
                  </div>

                  <div style={{ marginTop: 4, fontSize: 12 }}>
                    ⭐ {a.nota.toFixed(1)} •{" "}
                    <span style={{ color: corStatus }}>
                      {a.status}
                    </span>
                  </div>

                  {!!a.comentario && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        background: "#111827",
                        padding: 8,
                        borderRadius: 8,
                        color: "#d1d5db"
                      }}
                    >
                      {a.comentario}
                    </div>
                  )}

                  {/* FEEDBACKS */}
                  {Array.isArray(a.feedbacks) && (
                    <div
                      style={{
                        marginTop: 6,
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap"
                      }}
                    >
                      {a.feedbacks.map((f, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: 11,
                            background: "#1f2937",
                            padding: "4px 8px",
                            borderRadius: 999
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* AÇÕES */}
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      onClick={() => aprovarAvaliacao(a)}
                      style={{
                        background: "#064e3b",
                        color: "#6ee7b7",
                        border: "none",
                        borderRadius: 8,
                        padding: "4px 8px"
                      }}
                    >
                      Aprovar
                    </button>

                    <button
                      onClick={() => recusarAvaliacao(a)}
                      style={{
                        background: "#7f1d1d",
                        color: "#fecaca",
                        border: "none",
                        borderRadius: 8,
                        padding: "4px 8px"
                      }}
                    >
                      Recusar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}