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
      setValor(gastoEditando.valor ? String(gastoEditando.valor / 100) : "");
      setCategoria(gastoEditando.categoria || "insumos");
      setData(gastoEditando.data || "");
      setObs(gastoEditando.obs || "");
    } else if (aberto) {
      setNome("");
      setValor("");
      setCategoria("insumos");
      setData("");
      setObs("");
      setErro("");
    }
  }, [gastoEditando, aberto]);

  if (!aberto) return null;

  async function handleSalvar() {
    setErro("");

    const valorNormalizado = String(valor)
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const valorNumero = Number(valorNormalizado);

    if (!nome.trim()) {
      setErro("Informe o nome do gasto");
      return;
    }

    if (!valorNormalizado || Number.isNaN(valorNumero) || valorNumero <= 0) {
      setErro("Informe um valor válido");
      return;
    }

    try {
      setLoading(true);

      await salvarGasto({
        nome: nome.trim(),
        valor: Math.round(valorNumero * 100),
        categoria,
        data: data || new Date().toISOString().slice(0, 10),
        obs,
        gastoEditando
      });

      onClose();
    } catch (e) {
      console.log("Erro ao salvar gasto:", e);
      setErro("Erro ao salvar gasto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
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
          background: "#ffffff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 420,
          padding: 20,
          border: "1px solid #e5e7eb",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          color: "#111827"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0 }}>
              {gastoEditando ? "Editar gasto" : "Novo gasto"}
            </h3>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Controle financeiro da operação
            </span>
          </div>

          <button onClick={onClose} style={btnIcon}>
            <X size={18} />
          </button>
        </div>

        <input
          placeholder="Nome do gasto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={input}
        />

        <input
          placeholder="Valor"
          inputMode="decimal"
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
          <div style={{ color: "#dc2626", fontSize: 12, marginBottom: 10 }}>
            {erro}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button onClick={onClose} style={btnSecondary}>
            Cancelar
          </button>

          <button
            onClick={handleSalvar}
            disabled={loading}
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

const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 10,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#111827",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box"
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
  boxShadow: "0 6px 16px rgba(234,29,44,0.25)"
};

const btnSecondary = {
  flex: 1,
  background: "#f3f4f6",
  color: "#111827",
  padding: 12,
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer"
};

const btnIcon = {
  background: "transparent",
  border: "none",
  color: "#6b7280",
  cursor: "pointer"
};