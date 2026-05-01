import { X } from "lucide-react";
import { useState } from "react";

export default function ModalVenda({
  aberto,
  onClose,
  editandoVenda,
  salvarVenda
}) {
  const [descricao, setDescricao] = useState(
    editandoVenda?.descricao || ""
  );
  const [valor, setValor] = useState(
    editandoVenda ? editandoVenda.valor / 100 : ""
  );
  const [erro, setErro] = useState("");

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
          maxWidth: 380,
          padding: 20,
          border: "1px solid #1f2937",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          color: "#fff",
          animation: "fadeIn 0.2s ease"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16
          }}
        >
          <h3 style={{ margin: 0 }}>
            {editandoVenda ? "Editar venda" : "Nova venda"}
          </h3>

          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* INPUT DESCRIÇÃO */}
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={input}
        />

        {/* INPUT VALOR */}
        <input
          type="number"
          placeholder="Valor (ex: 25.90)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={input}
        />

        {/* ERRO */}
        {erro && (
          <div
            style={{
              color: "#ef4444",
              fontSize: 12,
              marginBottom: 10
            }}
          >
            {erro}
          </div>
        )}

        {/* BOTÕES */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => {
              if (!descricao || !valor) {
                setErro("Preencha todos os campos");
                return;
              }

              salvarVenda({
                descricao,
                valor: Math.round(Number(valor) * 100),
                editandoVenda
              });

              onClose();
            }}
            style={btnPrimary}
          >
            Salvar
          </button>

          <button
            onClick={onClose}
            style={btnSecondary}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔥 ESTILO PADRÃO */
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