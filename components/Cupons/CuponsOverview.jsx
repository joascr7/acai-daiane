export default function CuponsOverview({
  codigo,
  setCodigo,
  desconto,
  setDesconto,
  validade,
  setValidade,
  limite,
  setLimite,
  criarCupom,
  cupons = [],
  deletarCupom,
  input,
  isMobile
}) {
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
          border: "1px solid #e5e7eb"
        }}
      >
        <h2 style={{ margin: 0 }}>Cupons</h2>
        <span style={{ fontSize: 13, color: "#6b7280" }}>
          Crie e gerencie descontos
        </span>
      </div>

      {/* FORM */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 18,
          padding: 16,
          border: "1px solid #e5e7eb",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 10
        }}
      >
        <input
          placeholder="Código"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
          style={input}
        />

        <input
          placeholder="Desconto (%)"
          type="number"
          value={desconto}
          onChange={e => setDesconto(e.target.value)}
          style={input}
        />

        <input
          type="date"
          value={validade}
          onChange={e => setValidade(e.target.value)}
          style={input}
        />

        <input
          placeholder="Limite de uso"
          type="number"
          value={limite}
          onChange={e => setLimite(e.target.value)}
          style={input}
        />

        <button
          onClick={criarCupom}
          style={{
            gridColumn: "1 / -1",
            height: 44,
            borderRadius: 12,
            background: "#ea1d2c",
            color: "#fff",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
            transition: "0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Criar cupom
        </button>
      </div>

      {/* LISTA */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 18,
          padding: 16,
          border: "1px solid #e5e7eb"
        }}
      >
        <h3 style={{ marginBottom: 12 }}>Cupons criados</h3>

        {cupons.length === 0 && (
          <div style={{ color: "#6b7280" }}>
            Nenhum cupom criado
          </div>
        )}

        {cupons.map((c) => {
          const usos = c.usos ? Object.keys(c.usos).length : 0;

          return (
            <div
              key={c.id}
              style={{
                background: "#f9fafb",
                borderRadius: 14,
                padding: 14,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #e5e7eb",
                transition: "0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                <strong style={{ fontSize: 16 }}>
                  {c.codigo}
                </strong>

                <div style={{ fontSize: 13, color: "#6b7280" }}>
                  {c.desconto}% OFF
                </div>

                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Uso: {usos}/{c.limite || "∞"}
                </div>

                <div style={{ fontSize: 11, color: "#6b7280" }}>
                  Validade: {c.validade || "Sem data"}
                </div>
              </div>

              <button
                onClick={() => deletarCupom(c.id)}
                style={{
                  height: 36,
                  padding: "0 12px",
                  borderRadius: 10,
                  background: "#fee2e2",
                  color: "#991b1b",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Remover
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}