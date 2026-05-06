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
        background: "rgba(0,0,0,0.4)", // 🔥 mais leve
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
          background: "#ffffff", // 🔥 antes dark
          borderRadius: 20,
          width: "100%",
          maxWidth: 380,
          padding: 20,
          border: "1px solid #e5e7eb",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          color: "#111827", // 🔥 antes branco
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
              color: "#6b7280",
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
              color: "#dc2626", // 🔥 antes #ef4444
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

          <button onClick={onClose} style={btnSecondary}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔥 INPUT LIGHT */
const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 10,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#111827",
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
  boxShadow: "0 6px 16px rgba(234,29,44,0.25)"
};

const btnSecondary = {
  flex: 1,
  background: "#f3f4f6", // 🔥 antes dark
  color: "#111827",
  padding: 12,
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer"
};