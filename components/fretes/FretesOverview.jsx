export default function FretesOverview({
  fretes = [],
  bairroFrete,
  valorFrete,
  setBairroFrete,
  setValorFrete,
  salvarFrete,
  loadingFrete,
  freteEditandoId,
  limparFormularioFrete,
  abrirEdicaoFrete,
  alternarStatusFrete,
  excluirFrete,
  formatarReal,
  isMobile
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        padding: 18,
        border: "1px solid #e5e7eb",
        color: "#111827"
      }}
    >
      <h2 style={{ marginBottom: 16 }}>Frete por bairro</h2>

      {/* FORM */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr auto auto",
          gap: 10,
          marginBottom: 16
        }}
      >
        <input
          value={bairroFrete}
          onChange={(e) => setBairroFrete(e.target.value)}
          placeholder="Nome do bairro"
          style={input}
        />

        <input
          value={valorFrete}
          onChange={(e) => setValorFrete(e.target.value)}
          placeholder="Valor"
          style={input}
        />

        <button
          onClick={salvarFrete}
          disabled={loadingFrete}
          style={btnPrimary}
        >
          {loadingFrete
            ? "Salvando..."
            : freteEditandoId
            ? "Salvar"
            : "Adicionar"}
        </button>

        {freteEditandoId && (
          <button
            onClick={limparFormularioFrete}
            style={btnSecondary}
          >
            Cancelar
          </button>
        )}
      </div>

      {/* LISTA */}
      {fretes.length === 0 && (
        <div style={{ color: "#6b7280" }}>
          Nenhum bairro cadastrado
        </div>
      )}

      {fretes.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 12,
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: isMobile ? "wrap" : "nowrap"
          }}
        >
          <div>
            <strong>{item?.bairro}</strong>

            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {formatarReal(item.valor)}
            </div>

            <div
              style={{
                fontSize: 12,
                color: item?.ativo ? "#16a34a" : "#dc2626",
                fontWeight: 700
              }}
            >
              {item?.ativo ? "Ativo" : "Desativado"}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => abrirEdicaoFrete(item)}
              style={{
                background: "#e0f2fe",
                color: "#075985",
                border: "none",
                borderRadius: 8,
                padding: "4px 8px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Editar
            </button>

            <button
              onClick={() => alternarStatusFrete(item)}
              style={{
                background: item?.ativo ? "#fee2e2" : "#dcfce7",
                color: item?.ativo ? "#991b1b" : "#166534",
                border: "none",
                borderRadius: 8,
                padding: "4px 8px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {item?.ativo ? "Desativar" : "Ativar"}
            </button>

            <button
              onClick={() => excluirFrete(item.id)}
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                border: "none",
                borderRadius: 8,
                padding: "4px 8px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 🔥 INPUT PADRÃO */
const input = {
  height: 44,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#111827",
  padding: "0 12px",
  fontSize: 13
};

const btnPrimary = {
  height: 44,
  borderRadius: 10,
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  fontWeight: 700,
  cursor: "pointer"
};

const btnSecondary = {
  height: 44,
  borderRadius: 10,
  background: "#f3f4f6",
  color: "#111827",
  border: "none",
  fontWeight: 600,
  cursor: "pointer"
};