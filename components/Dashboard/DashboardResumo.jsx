import { TrendingUp } from "lucide-react";

export default function DashboardResumo({
  isMobile,
  limparFormularioGasto,
  setMostrarModalGasto
}) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: isMobile ? 16 : 20,
        marginBottom: 16,
        border: "1px solid #1f2937",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: 16,
        flexWrap: "wrap",
        color: "#fff"
      }}
    >
      {/* ESQUERDA */}
      <div style={{ maxWidth: 520 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#1f2937",
            color: "#f87171",
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            marginBottom: 10
          }}
        >
          <TrendingUp size={14} />
          Dashboard financeiro
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: isMobile ? 22 : 28,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.2
          }}
        >
          Controle total da operação
        </h2>

        <p
          style={{
            marginTop: 6,
            fontSize: 13,
            color: "#9ca3af"
          }}
        >
          Acompanhe faturamento, gastos e indicadores da loja em tempo real.
        </p>
      </div>

      {/* BOTÃO */}
      <button
        onClick={() => {
          limparFormularioGasto();
          setMostrarModalGasto(true);
        }}
        style={{
          height: 42,
          padding: "0 16px",
          borderRadius: 12,
          background: "#ea1d2c",
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          border: "none",
          boxShadow: "0 8px 20px rgba(234,29,44,0.35)",
          transition: "0.2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Novo gasto
      </button>
    </div>
  );
}