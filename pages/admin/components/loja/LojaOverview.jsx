export default function LojaOverview({
  categorias = [],
  editandoCategoriaId,
  editandoCategoria,
  setEditandoCategoria,
  setEditandoCategoriaId,
  salvarEdicaoCategoria,
  novaCategoria,
  setNovaCategoria,
  criarCategoria,
  lojaAberta,
  toggleLoja,
  logoInput,
  setLogoInput,
  salvarLogo,
  isMobile
}) {
  return (
    <div
      style={{
        marginTop: 12,
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
        <h2 style={{ margin: 0 }}>Loja</h2>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>
          Configurações gerais
        </span>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 14
        }}
      >
        {/* CATEGORIAS */}
        <div
          style={{
            background: "#111827",
            padding: 16,
            borderRadius: 16,
            border: "1px solid #1f2937"
          }}
        >
          <h3>Categorias</h3>

          {categorias.map(c => (
            <div
              key={c.id}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "8px",
                borderRadius: 10,
                background: "#0f172a",
                marginBottom: 6
              }}
            >
              {editandoCategoriaId === c.id ? (
                <input
                  value={editandoCategoria[c.id] || ""}
                  onChange={(e) =>
                    setEditandoCategoria(prev => ({
                      ...prev,
                      [c.id]: e.target.value
                    }))
                  }
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: 8,
                    border: "1px solid #1f2937",
                    background: "#111827",
                    color: "#fff"
                  }}
                />
              ) : (
                <span style={{ flex: 1 }}>{c.nome}</span>
              )}

              <button
                onClick={() =>
                  editandoCategoriaId === c.id
                    ? salvarEdicaoCategoria(c.id)
                    : (
                        setEditandoCategoriaId(c.id),
                        setEditandoCategoria(prev => ({
                          ...prev,
                          [c.id]: c.nome
                        }))
                      )
                }
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 10px"
                }}
              >
                {editandoCategoriaId === c.id ? "Salvar" : "Editar"}
              </button>
            </div>
          ))}

          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <input
              placeholder="Nova categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 10,
                border: "1px solid #1f2937",
                background: "#111827",
                color: "#fff"
              }}
            />

            <button
              onClick={criarCategoria}
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                border: "none",
                background: "#ea1d2c",
                color: "#fff",
                fontWeight: 900,
                fontSize: 18
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* STATUS */}
        <div
          style={{
            background: "#111827",
            padding: 16,
            borderRadius: 16,
            border: "1px solid #1f2937"
          }}
        >
          <h3>Status da loja</h3>

          <div
            style={{
              padding: 12,
              borderRadius: 10,
              textAlign: "center",
              fontWeight: 700,
              background: lojaAberta ? "#064e3b" : "#7f1d1d",
              color: "#fff",
              marginBottom: 10
            }}
          >
            {lojaAberta ? "Loja aberta" : "Loja fechada"}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => toggleLoja(true)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 10,
                background: "#16a34a",
                color: "#fff",
                border: "none"
              }}
            >
              Abrir
            </button>

            <button
              onClick={() => toggleLoja(false)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 10,
                background: "#dc2626",
                color: "#fff",
                border: "none"
              }}
            >
              Fechar
            </button>
          </div>
        </div>

        {/* LOGO */}
        <div
          style={{
            background: "#111827",
            padding: 16,
            borderRadius: 16,
            border: "1px solid #1f2937"
          }}
        >
          <h3>Logo da loja</h3>

          <input
            placeholder="URL da logo"
            value={logoInput}
            onChange={(e) => setLogoInput(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 10,
              border: "1px solid #1f2937",
              background: "#111827",
              color: "#fff"
            }}
          />

          {logoInput && (
            <img
              src={logoInput}
              style={{
                width: 90,
                height: 90,
                borderRadius: 14,
                marginTop: 10,
                objectFit: "cover"
              }}
            />
          )}

          <button
            onClick={salvarLogo}
            style={{
              marginTop: 10,
              width: "100%",
              padding: 10,
              borderRadius: 10,
              background: "#ea1d2c",
              color: "#fff",
              border: "none"
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}