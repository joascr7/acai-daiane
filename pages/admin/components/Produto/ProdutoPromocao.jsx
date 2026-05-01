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
        <Tag size={16} />
        <span>Promoção</span>

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

const card = { padding: 12, borderRadius: 12, background: "#0f172a" };
const row = { display: "flex", justifyContent: "space-between", color: "#fff" };
const input = { marginTop: 10, padding: 10 };