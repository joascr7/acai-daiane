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
        color: "#fff"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 18,
          border: "1px solid #1f2937",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Financeiro</h2>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>
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
            color: "#022c22",
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
          { nome: "Hoje", valor: totalHoje, cor: "#22c55e" },
          { nome: "Vendas", valor: totalVendas, cor: "#22c55e" },
          { nome: "Gastos", valor: totalGastosCalc, cor: "#ef4444" },
          { nome: "Lucro", valor: lucro, cor: lucro >= 0 ? "#22c55e" : "#ef4444" }
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#111827",
              borderRadius: 14,
              padding: 14,
              border: "1px solid #1f2937"
            }}
          >
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
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
          background: "#111827",
          borderRadius: 18,
          padding: 16,
          border: "1px solid #1f2937"
        }}
      >
        <h3 style={{ marginBottom: 10 }}>Gastos</h3>

        {gastos.length === 0 ? (
          <div style={{ color: "#9ca3af" }}>
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
                borderBottom: "1px solid #1f2937"
              }}
            >
              <span>{g.nome}</span>

              <div style={{ display: "flex", gap: 10 }}>
                <strong style={{ color: "#ef4444" }}>
                  {formatarReal(g.valor)}
                </strong>

                <button
                  onClick={() => excluirGasto(g.id)}
                  style={{
                    background: "#7f1d1d",
                    color: "#fecaca",
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
          background: "#111827",
          borderRadius: 18,
          padding: 16,
          border: "1px solid #1f2937"
        }}
      >
        <h3 style={{ marginBottom: 10 }}>Vendas manuais</h3>

        {vendasManuais.length === 0 ? (
          <div style={{ color: "#9ca3af" }}>
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
                borderBottom: "1px solid #1f2937"
              }}
            >
              <span>{v.descricao}</span>

              <div style={{ display: "flex", gap: 8 }}>
                <strong style={{ color: "#22c55e" }}>
                  {formatarReal(v.valor)}
                </strong>

                <button
                  onClick={() => abrirEditarVenda(v)}
                  style={{
                    background: "#1e3a8a",
                    color: "#bfdbfe",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 8px"
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => excluirVenda(v.id)}
                  style={{
                    background: "#7f1d1d",
                    color: "#fecaca",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 8px"
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