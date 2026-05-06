import { X } from "lucide-react";

export default function ModalProduto({
  aberto,
  onClose,
  children,
  salvarProduto
}) {
  if (!aberto) return null;

  return (
    <div style={overlay}>
      <div style={modal}>

        <div style={header}>
          <h3 style={{ margin: 0 }}>Produto</h3>

          <button onClick={onClose} style={btnIcon}>
            <X size={18} />
          </button>
        </div>

        <div style={content}>
          {children}
        </div>

        <div style={footer}>
          <button onClick={onClose} style={btnCancel}>
            Cancelar
          </button>

          <button onClick={salvarProduto} style={btnSave}>
            Salvar produto
          </button>
        </div>

      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)", // 🔥 menos pesado
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modal = {
  width: "100%",
  maxWidth: 420,
  maxHeight: "85vh",
  background: "#ffffff", // 🔥 antes dark
  borderRadius: 20,
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
};

const header = {
  padding: 16,
  borderBottom: "1px solid #e5e7eb",
  color: "#111827", // 🔥 antes branco
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const content = {
  padding: 16,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 14
};

const footer = {
  display: "flex",
  gap: 10,
  padding: 14,
  borderTop: "1px solid #e5e7eb"
};

const btnSave = {
  flex: 1,
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  height: 48,
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(234,29,44,0.25)"
};

const btnCancel = {
  flex: 1,
  background: "#f3f4f6", // 🔥 antes dark
  color: "#111827",
  border: "none",
  height: 48,
  borderRadius: 12,
  fontWeight: 600,
  cursor: "pointer"
};

const btnIcon = {
  background: "transparent",
  border: "none",
  color: "#6b7280", // 🔥 antes claro demais
  cursor: "pointer"
};