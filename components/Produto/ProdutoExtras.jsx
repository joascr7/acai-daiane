import { Plus, Trash2 } from "lucide-react";

export default function ProdutoExtras({
  extras,
  setExtras,
  novaCategoria,
  produtos,
  produtoEditandoId,
  copiarExtrasDeProduto,
  setNovaCategoria,
  maisVendido,          // 🔥 ADD
  setMaisVendido        // 🔥 ADD

}) {
  return (
    <div style={container}>
      <h3 style={title}>Extras</h3>

      {/* 🔥 COPIAR EXTRAS */}
<select
  onChange={(e) => copiarExtrasDeProduto(e.target.value)}
  style={{
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    background: "#020617",
    color: "#fff",
    border: "1px solid #1f2937"
  }}
>
  <option value="">Copiar extras de outro produto</option>

  {produtos
    .filter(p => p.id !== produtoEditandoId) // 🔥 evita copiar dele mesmo
    .map((p) => (
      <option key={p.id} value={p.id}>
        {p.nome}
      </option>
    ))}
</select>

      {/* NOVA CATEGORIA */}
      <div style={row}>
        <input
          placeholder="Categoria (ex: Complementos)"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          style={{ ...input, flex: 1 }}
        />

        <button
          onClick={() => {
            if (!novaCategoria) return;

            setExtras((prev) => [
              ...prev,
              {
                categoria: novaCategoria.trim(),
                min: 0,
                max: 5,
                permitirRepetir: false,
                itens: []
              }
            ]);

            setNovaCategoria("");
          }}
          style={btnAdd}
        >
          <Plus size={18} />
        </button>
      </div>


      <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    background: "#0f172a",
    border: "1px solid #1f2937"
  }}
>
  <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
    🔥 Mais vendido
  </div>

  <div
    onClick={() => setMaisVendido(!maisVendido)}
    style={{
      width: 46,
      height: 26,
      borderRadius: 999,
      background: maisVendido ? "#ea1d2c" : "#374151",
      position: "relative",
      cursor: "pointer",
      transition: "all 0.2s ease"
    }}
  >
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        position: "absolute",
        top: 3,
        left: maisVendido ? 23 : 3,
        transition: "all 0.2s ease"
      }}
    />
  </div>
</div>

      {/* LISTA DE GRUPOS */}
      {extras.map((grupo, i) => (
        <div key={i} style={card}>
          {/* HEADER */}
          <div style={header}>
            <strong>{grupo.categoria}</strong>

            <button
              onClick={() => {
                setExtras((prev) =>
                  prev.filter((_, index) => index !== i)
                );
              }}
              style={btnRemove}
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* MIN MAX */}
          <div style={row}>
            <input
              type="number"
              placeholder="Min"
              value={grupo.min}
              onChange={(e) => {
                const novo = [...extras];
                novo[i].min = Number(e.target.value);
                setExtras(novo);
              }}
              style={input}
            />

            <input
              type="number"
              placeholder="Max"
              value={grupo.max}
              onChange={(e) => {
                const novo = [...extras];
                novo[i].max = Number(e.target.value);
                setExtras(novo);
              }}
              style={input}
            />
          </div>

          {/* PERMITIR REPETIR */}
          <label style={checkboxRow}>
            <input
              type="checkbox"
              checked={grupo.permitirRepetir === true}
              onChange={(e) => {
                const novo = [...extras];
                novo[i].permitirRepetir = e.target.checked;
                setExtras(novo);
              }}
            />
            Permitir repetir item
          </label>

          {/* ITENS */}
          {(grupo.itens || []).map((item, j) => (
            <div key={j} style={row}>
              <input
                placeholder="Nome"
                value={item.nome}
                onChange={(e) => {
                  const novo = [...extras];
                  novo[i].itens[j].nome = e.target.value;
                  setExtras(novo);
                }}
                style={{ ...input, flex: 1 }}
              />

              <input
                type="number"
                placeholder="R$"
                value={item.preco / 100}
                onChange={(e) => {
                  const novo = [...extras];
                  novo[i].itens[j].preco =
                    Math.round(Number(e.target.value) * 100);
                  setExtras(novo);
                }}
                style={{ ...input, width: 80 }}
              />

              <button
                onClick={() => {
                  const novo = [...extras];
                  novo[i].itens.splice(j, 1);
                  setExtras(novo);
                }}
                style={btnRemove}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {/* ADD ITEM */}
          <button
            onClick={() => {
              const novo = [...extras];
              novo[i].itens.push({ nome: "", preco: 0 });
              setExtras(novo);
            }}
            style={btnAddItem}
          >
            <Plus size={14} /> Adicionar item
          </button>
        </div>
      ))}
    </div>
  );
}

/* 🔥 ESTILOS */

const container = {
  background: "#020617",
  borderRadius: 16,
  padding: 14,
  border: "1px solid #1f2937"
};

const title = {
  color: "#fff",
  marginBottom: 10
};

const card = {
  background: "#0f172a",
  borderRadius: 14,
  padding: 12,
  marginTop: 10,
  border: "1px solid #1f2937"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
  color: "#fff"
};

const row = {
  display: "flex",
  gap: 8,
  marginTop: 8,
  alignItems: "center"
};

const input = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #1f2937",
  background: "#020617",
  color: "#fff",
  fontSize: 13
};

const checkboxRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginTop: 8,
  color: "#fff",
  fontSize: 13
};

const btnAdd = {
  width: 42,
  height: 42,
  borderRadius: 10,
  border: "none",
  background: "#ea1d2c",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};

const btnRemove = {
  border: "none",
  background: "#7f1d1d",
  color: "#fff",
  borderRadius: 8,
  padding: 6,
  cursor: "pointer"
};

const btnAddItem = {
  marginTop: 10,
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #1f2937",
  background: "#020617",
  color: "#fff",
  cursor: "pointer"
};