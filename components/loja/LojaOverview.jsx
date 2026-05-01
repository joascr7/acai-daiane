export default function LojaOverview(props) {
  const {
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
  } = props;

  return (
    <div
      style={{
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        color: "#fff"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#0f172a",
          borderRadius: 16,
          padding: "16px 18px",
          border: "1px solid #1e293b"
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18 }}>Loja</h2>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>
          Configurações gerais
        </span>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12
        }}
      >
        {/* CATEGORIAS */}
        <div style={card}>
          <h3 style={title}>Categorias</h3>

          {categorias.map((c) => (
            <div key={c.id} style={itemRow}>
              {editandoCategoriaId === c.id ? (
                <input
                  value={editandoCategoria[c.id] || ""}
                  onChange={(e) =>
                    setEditandoCategoria((prev) => ({
                      ...prev,
                      [c.id]: e.target.value
                    }))
                  }
                  style={input}
                />
              ) : (
                <span style={{ flex: 1, fontSize: 13 }}>{c.nome}</span>
              )}

              <button
                onClick={() =>
                  editandoCategoriaId === c.id
                    ? salvarEdicaoCategoria(c.id)
                    : (
                        setEditandoCategoriaId(c.id),
                        setEditandoCategoria((prev) => ({
                          ...prev,
                          [c.id]: c.nome
                        }))
                      )
                }
                style={btnBlue}
              >
                {editandoCategoriaId === c.id ? "Salvar" : "Editar"}
              </button>
            </div>
          ))}

          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <input
              placeholder="Nova categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              style={input}
            />

            <button onClick={criarCategoria} style={btnPrimary}>
              +
            </button>
          </div>
        </div>

        {/* STATUS */}
        <div style={card}>
          <h3 style={title}>Status da loja</h3>

          <div
            style={{
              padding: 10,
              borderRadius: 10,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 13,
              background: lojaAberta ? "#065f46" : "#7f1d1d",
              marginBottom: 10
            }}
          >
            {lojaAberta ? "Loja aberta" : "Loja fechada"}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => toggleLoja(true)} style={btnGreen}>
              Abrir
            </button>

            <button onClick={() => toggleLoja(false)} style={btnRed}>
              Fechar
            </button>
          </div>
        </div>

        {/* LOGO */}
        <div style={card}>
          <h3 style={title}>Logo da loja</h3>

          <input
            placeholder="URL da logo"
            value={logoInput}
            onChange={(e) => setLogoInput(e.target.value)}
            style={input}
          />

          {logoInput && (
            <img
              src={logoInput}
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                marginTop: 8,
                objectFit: "cover"
              }}
            />
          )}

          <button onClick={salvarLogo} style={btnPrimaryFull}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}


const card = {
  background: "#0f172a",
  padding: 14,
  borderRadius: 14,
  border: "1px solid #1e293b"
};

const title = {
  fontSize: 14,
  marginBottom: 8,
  color: "#e5e7eb"
};

const itemRow = {
  display: "flex",
  gap: 6,
  alignItems: "center",
  padding: "6px 8px",
  borderRadius: 8,
  background: "#020617",
  marginBottom: 4
};

const input = {
  flex: 1,
  padding: "8px",
  borderRadius: 8,
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#fff",
  fontSize: 13
};

const btnPrimary = {
  width: 36,
  height: 36,
  borderRadius: 8,
  border: "none",
  background: "#ea1d2c",
  color: "#fff",
  fontWeight: 900,
  cursor: "pointer"
};

const btnPrimaryFull = {
  marginTop: 8,
  width: "100%",
  padding: 10,
  borderRadius: 10,
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

const btnBlue = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "6px 10px",
  fontSize: 12,
  cursor: "pointer"
};

const btnGreen = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  fontSize: 13
};

const btnRed = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  background: "#dc2626",
  color: "#fff",
  border: "none",
  fontSize: 13
};