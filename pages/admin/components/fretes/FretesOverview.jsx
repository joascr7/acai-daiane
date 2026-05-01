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
        background: "#0f172a",
        borderRadius: 20,
        padding: 18,
        border: "1px solid #1f2937",
        color: "#fff"
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
          style={{
            height: 44,
            borderRadius: 10,
            border: "1px solid #1f2937",
            background: "#111827",
            color: "#fff",
            padding: "0 12px"
          }}
        />

        <input
          value={valorFrete}
          onChange={(e) => setValorFrete(e.target.value)}
          placeholder="Valor"
          style={{
            height: 44,
            borderRadius: 10,
            border: "1px solid #1f2937",
            background: "#111827",
            color: "#fff",
            padding: "0 12px"
          }}
        />

        <button
          onClick={salvarFrete}
          disabled={loadingFrete}
          style={{
            height: 44,
            borderRadius: 10,
            background: "#ea1d2c",
            color: "#fff",
            border: "none",
            fontWeight: 700
          }}
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
            style={{
              height: 44,
              borderRadius: 10,
              background: "#1f2937",
              color: "#fff",
              border: "none"
            }}
          >
            Cancelar
          </button>
        )}
      </div>

      {/* LISTA */}
      {fretes.length === 0 && (
        <div style={{ color: "#9ca3af" }}>
          Nenhum bairro cadastrado
        </div>
      )}

      {fretes.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
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
            <div style={{ fontSize: 13, color: "#9ca3af" }}>
              {formatarReal(item.valor)}
            </div>
            <div style={{
              fontSize: 12,
              color: item?.ativo ? "#22c55e" : "#ef4444"
            }}>
              {item?.ativo ? "Ativo" : "Desativado"}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => abrirEdicaoFrete(item)}
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
              onClick={() => alternarStatusFrete(item)}
              style={{
                background: item?.ativo ? "#7c2d12" : "#064e3b",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "4px 8px"
              }}
            >
              {item?.ativo ? "Desativar" : "Ativar"}
            </button>

            <button
              onClick={() => excluirFrete(item.id)}
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
      ))}
    </div>
  );
}