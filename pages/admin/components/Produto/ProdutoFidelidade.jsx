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
        <Gift size={16} />
        <span>Fidelidade</span>
        <input type="checkbox" checked={fidelidade} onChange={e => setFidelidade(e.target.checked)} />
      </div>

      <div style={card}>
        <span>Resgate grátis</span>
        <input type="checkbox" checked={resgate} onChange={e => setResgate(e.target.checked)} />
      </div>
    </>
  );
}

const card = {
  display: "flex",
  justifyContent: "space-between",
  padding: 12,
  background: "#0f172a",
  color: "#fff",
  borderRadius: 12
};