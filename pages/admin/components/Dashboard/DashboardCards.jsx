import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

export default function DashboardCards({
  totalFaturado,
  totalGastos,
  lucroTotal,
  margemLucro,
  isMobile,
  formatarReal
}) {
  const cards = [
    {
      titulo: "Faturamento",
      valor: formatarReal(totalFaturado),
      cor: "#22c55e",
      icon: <DollarSign size={18} />
    },
    {
      titulo: "Gastos",
      valor: formatarReal(totalGastos),
      cor: "#ef4444",
      icon: <TrendingDown size={18} />
    },
    {
      titulo: "Lucro",
      valor: formatarReal(lucroTotal),
      extra: `${margemLucro}%`,
      cor: lucroTotal < 0 ? "#ef4444" : "#22c55e",
      icon: <TrendingUp size={18} />
    }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: 16,
        marginBottom: 18
      }}
    >
      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: 18,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            transition: "0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* TOPO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: `${c.cor}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: c.cor
              }}
            >
              {c.icon}
            </div>

            <span
              style={{
                fontSize: 12,
                color: "#9ca3af",
                fontWeight: 600
              }}
            >
              {c.titulo}
            </span>
          </div>

          {/* VALOR */}
          <strong
            style={{
              fontSize: 24,
              color: "#fff",
              lineHeight: 1.1
            }}
          >
            {c.valor}
          </strong>

          {/* EXTRA */}
          {c.extra && (
            <span
              style={{
                fontSize: 12,
                color: c.cor,
                fontWeight: 700
              }}
            >
              {c.extra}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}