import { Gift } from "lucide-react";

export default function ProdutoFidelidade({
  fidelidade,
  setFidelidade,
  resgate,
  setResgate
}) {
  return (
    <>
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Gift size={16} />
          <span>Fidelidade</span>
        </div>

        <input
          type="checkbox"
          checked={fidelidade}
          onChange={e => setFidelidade(e.target.checked)}
        />
      </div>

      <div style={card}>
        <span>Resgate grátis</span>

        <input
          type="checkbox"
          checked={resgate}
          onChange={e => setResgate(e.target.checked)}
        />
      </div>
    </>
  );
}

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  background: "#ffffff",        // 🔥 antes #0f172a
  color: "#111827",             // 🔥 antes branco
  borderRadius: 12,
  border: "1px solid #e5e7eb",  // 🔥 adicionado leve
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
};