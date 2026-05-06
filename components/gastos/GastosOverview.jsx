export default function GastosOverview({
  pedidos = [],
  vendasManuais = [],
  gastos = [],
  formatarReal,
  isMobile,
  excluirGasto,
  excluirVenda,
  abrirEditarVenda,
  setMostrarModalVenda,
  setNovaVendaDesc,
  setNovaVendaValor,
  setEditandoVenda
}) {
  const hoje = new Date().toDateString();

  const getData = (d) => {
    if (!d) return null;
    if (d?.toDate) return d.toDate();
    return new Date(d);
  };

  // ===== VENDAS =====
  const vendasSiteLista = pedidos.filter(p => p.status === "entregue");

  const vendasSite = vendasSiteLista.reduce(
    (acc, p) => acc + Number(p.total || 0),
    0
  );

  const vendasSiteHoje = vendasSiteLista.reduce((acc, p) => {
    const data = getData(p.data);
    if (!data) return acc;
    return data.toDateString() === hoje
      ? acc + Number(p.total || 0)
      : acc;
  }, 0);

  const totalVendasManuais = vendasManuais.reduce(
    (acc, v) => acc + Number(v.valor || 0),
    0
  );

  const vendasManuaisHoje = vendasManuais.reduce((acc, v) => {
    const data = getData(v.data);
    if (!data) return acc;
    return data.toDateString() === hoje
      ? acc + Number(v.valor || 0)
      : acc;
  }, 0);

  const totalVendas = vendasSite + totalVendasManuais;
  const totalHoje = vendasSiteHoje + vendasManuaisHoje;

  const totalGastosCalc = gastos.reduce(
    (acc, g) => acc + Number(g.valor || 0),
    0
  );

  const lucro = totalVendas - totalGastosCalc;

  return (
    <div
      style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        color: "#111827"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 18,
          padding: 18,
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Financeiro</h2>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            Controle total da operação
          </span>
        </div>

        <button
          onClick={() => {
            setEditandoVenda(null);
            setNovaVendaDesc("");
            setNovaVendaValor("");
            setMostrarModalVenda(true);
          }}
          style={{
            height: 40,
            padding: "0 14px",
            borderRadius: 10,
            background: "#22c55e",
            color: "#ffffff",
            border: "none",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          + Nova venda
        </button>
      </div>

      {/* RESUMO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
          gap: 12
        }}
      >
        {[
          { nome: "Hoje", valor: totalHoje, cor: "#16a34a" },
          { nome: "Vendas", valor: totalVendas, cor: "#16a34a" },
          { nome: "Gastos", valor: totalGastosCalc, cor: "#dc2626" },
          { nome: "Lucro", valor: lucro, cor: lucro >= 0 ? "#16a34a" : "#dc2626" }
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              borderRadius: 14,
              padding: 14,
              border: "1px solid #e5e7eb"
            }}
          >
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              {item.nome}
            </span>

            <strong
              style={{
                display: "block",
                fontSize: 18,
                color: item.cor
              }}
            >
              {formatarReal(item.valor)}
            </strong>
          </div>
        ))}
      </div>

      {/* GASTOS */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 18,
          padding: 16,
          border: "1px solid #e5e7eb"
        }}
      >
        <h3 style={{ marginBottom: 10 }}>Gastos</h3>

        {gastos.length === 0 ? (
          <div style={{ color: "#6b7280" }}>
            Nenhum gasto cadastrado
          </div>
        ) : (
          gastos.map(g => (
            <div
              key={g.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              <span>{g.nome}</span>

              <div style={{ display: "flex", gap: 10 }}>
                <strong style={{ color: "#dc2626" }}>
                  {formatarReal(g.valor)}
                </strong>

                <button
                  onClick={() => excluirGasto(g.id)}
                  style={{
                    background: "#fee2e2",
                    color: "#991b1b",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 8px",
                    cursor: "pointer"
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* VENDAS */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 18,
          padding: 16,
          border: "1px solid #e5e7eb"
        }}
      >
        <h3 style={{ marginBottom: 10 }}>Vendas manuais</h3>

        {vendasManuais.length === 0 ? (
          <div style={{ color: "#6b7280" }}>
            Nenhuma venda manual
          </div>
        ) : (
          vendasManuais.map(v => (
            <div
              key={v.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              <span>{v.descricao}</span>

              <div style={{ display: "flex", gap: 8 }}>
                <strong style={{ color: "#16a34a" }}>
                  {formatarReal(v.valor)}
                </strong>

                <button
                  onClick={() => abrirEditarVenda(v)}
                  style={{
                    background: "#e0f2fe",
                    color: "#075985",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 8px",
                    cursor: "pointer"
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => excluirVenda(v.id)}
                  style={{
                    background: "#fee2e2",
                    color: "#991b1b",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 8px",
                    cursor: "pointer"
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}