import { Tag } from "lucide-react";

export default function ProdutoPromocao({
  promocaoAtiva,
  setPromocaoAtiva,
  novoPrecoPromocional,
  setNovoPrecoPromocional
}) {
  return (
    <div style={card}>
      <div style={row}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Tag size={16} />
          <span>Promoção</span>
        </div>

        <input
          type="checkbox"
          checked={promocaoAtiva}
          onChange={e => setPromocaoAtiva(e.target.checked)}
        />
      </div>

      {promocaoAtiva && (
        <input
          placeholder="Preço promocional"
          value={novoPrecoPromocional}
          onChange={e => setNovoPrecoPromocional(e.target.value)}
          style={input}
        />
      )}
    </div>
  );
}

const card = {
  padding: 12,
  borderRadius: 12,
  background: "#ffffff",            // 🔥 antes #0f172a
  border: "1px solid #e5e7eb",      // 🔥 adicionado padrão
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#111827",                // 🔥 antes branco
  fontSize: 13,
  fontWeight: 600
};

const input = {
  marginTop: 10,
  padding: 10,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#111827",
  outline: "none",
  fontSize: 13
};