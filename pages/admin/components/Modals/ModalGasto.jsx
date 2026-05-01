import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function ModalGasto({
  aberto,
  onClose,
  gastoEditando,
  salvarGasto
}) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("insumos");
  const [data, setData] = useState("");
  const [obs, setObs] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (gastoEditando) {
      setNome(gastoEditando.nome || "");
      setValor(gastoEditando.valor / 100 || "");
      setCategoria(gastoEditando.categoria || "insumos");
      setData(gastoEditando.data || "");
      setObs(gastoEditando.obs || "");
    }
  }, [gastoEditando]);

  if (!aberto) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 12
      }}
    >
      <div
        style={{
          background: "#020617",
          borderRadius: 20,
          width: "100%",
          maxWidth: 420,
          padding: 20,
          border: "1px solid #1f2937",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          color: "#fff"
        }}
      >
        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16
        }}>
          <div>
            <h3 style={{ margin: 0 }}>
              {gastoEditando ? "Editar gasto" : "Novo gasto"}
            </h3>

            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              Controle financeiro da operação
            </span>
          </div>

          <button onClick={onClose} style={btnIcon}>
            <X size={18} />
          </button>
        </div>

        {/* INPUTS */}
        <input
          placeholder="Nome do gasto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={input}
        />

        <input
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={input}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={input}
        >
          <option value="insumos">Insumos</option>
          <option value="embalagens">Embalagens</option>
          <option value="bebidas">Bebidas</option>
          <option value="energia">Energia</option>
          <option value="internet">Internet</option>
          <option value="transporte">Transporte</option>
          <option value="marketing">Marketing</option>
          <option value="outros">Outros</option>
        </select>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Observação"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          style={{ ...input, minHeight: 80 }}
        />

        {erro && (
          <div style={{ color: "#ef4444", fontSize: 12 }}>
            {erro}
          </div>
        )}

        {/* BOTÕES */}
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button onClick={onClose} style={btnSecondary}>
            Cancelar
          </button>

          <button
            onClick={async () => {
              if (!nome || !valor) {
                setErro("Preencha os campos obrigatórios");
                return;
              }

              setLoading(true);

              await salvarGasto({
                nome,
                valor: Math.round(Number(valor) * 100),
                categoria,
                data,
                obs,
                gastoEditando
              });

              setLoading(false);
              onClose();
            }}
            style={{
              ...btnPrimary,
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading
              ? "Salvando..."
              : gastoEditando
              ? "Salvar alteração"
              : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔥 ESTILOS */
const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 10,
  borderRadius: 12,
  border: "1px solid #1f2937",
  background: "#0f172a",
  color: "#fff",
  fontSize: 14,
  outline: "none"
};

const btnPrimary = {
  flex: 1,
  background: "#ea1d2c",
  color: "#fff",
  padding: 12,
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(234,29,44,0.35)"
};

const btnSecondary = {
  flex: 1,
  background: "#1f2937",
  color: "#fff",
  padding: 12,
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer"
};

const btnIcon = {
  background: "transparent",
  border: "none",
  color: "#9ca3af",
  cursor: "pointer"
};