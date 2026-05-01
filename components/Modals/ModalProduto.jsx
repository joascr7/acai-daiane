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
  background: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(6px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modal = {
  width: "100%",
  maxWidth: 420,
  maxHeight: "85vh",
  background: "#020617",
  borderRadius: 20,
  border: "1px solid #1f2937",
  display: "flex",
  flexDirection: "column"
};

const header = {
  padding: 16,
  borderBottom: "1px solid #1f2937",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between"
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
  borderTop: "1px solid #1f2937"
};

const btnSave = {
  flex: 1,
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  height: 48,
  borderRadius: 12
};

const btnCancel = {
  flex: 1,
  background: "#1f2937",
  color: "#fff",
  border: "none",
  height: 48,
  borderRadius: 12
};

const btnIcon = {
  background: "transparent",
  border: "none",
  color: "#9ca3af"
};