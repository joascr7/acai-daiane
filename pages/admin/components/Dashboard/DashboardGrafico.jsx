"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function DashboardGrafico({ pedidos = [], formatarReal }) {
  const map = {};

  // 🔥 AGRUPAR POR DIA
  pedidos.forEach((p) => {
    if (p.status !== "entregue") return;

    const data = new Date(p.data);
    const dia = data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit"
    });

    if (!map[dia]) map[dia] = 0;

    map[dia] += Number(p.total || 0);
  });

  // 🔥 ARRAY
  const dados = Object.entries(map).map(([dia, valor]) => ({
    dia,
    valor
  }));

  // 🔥 ORDENAR
  dados.sort((a, b) => {
    const [d1, m1] = a.dia.split("/");
    const [d2, m2] = b.dia.split("/");
    return new Date(`2024-${m1}-${d1}`) - new Date(`2024-${m2}-${d2}`);
  });

  // 🔥 TOTAL
  const total = dados.reduce((acc, d) => acc + d.valor, 0);

  // 🔥 COMPARAÇÃO
  const ultimo = dados[dados.length - 1]?.valor || 0;
  const penultimo = dados[dados.length - 2]?.valor || 0;

  const crescimento =
    penultimo > 0
      ? ((ultimo - penultimo) / penultimo) * 100
      : 0;

  const positivo = crescimento >= 0;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #020617, #0f172a)",
        borderRadius: 22,
        padding: 18,
        border: "1px solid #1f2937",
        margin: "8px 0 20px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10
        }}
      >
        <div>
          <h3 style={{ color: "#fff", margin: 0 }}>
            Faturamento
          </h3>

          <div style={{ fontSize: 13, color: "#9ca3af" }}>
            Últimos dias
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              color: "#22c55e",
              fontWeight: 800,
              fontSize: 22
            }}
          >
            {formatarReal(total)}
          </div>

          <div
            style={{
              fontSize: 13,
              letterSpacing: 0.3,
              color: positivo ? "#22c55e" : "#ef4444",
              fontWeight: 700
            }}
          >
            {positivo ? "▲" : "▼"} {crescimento.toFixed(1)}%
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={dados}>
          {/* 🔥 GRADIENTE */}
          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* GRID */}
          <CartesianGrid
            stroke="#1f2937"
            strokeDasharray="3 3"
            vertical={false}
          />

          {/* X */}
          <XAxis
            dataKey="dia"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />

          {/* Y */}
          <YAxis
            stroke="#6b7280"
            tickFormatter={(v) => `R$ ${v}`}
            tick={{ fontSize: 12 }}
          />

          {/* TOOLTIP */}
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #1f2937",
              borderRadius: 12,
              color: "#fff",
              fontSize: 12
            }}
            formatter={(value) => formatarReal(value)}
          />

          {/* 🔥 ÁREA PREMIUM */}
          <Area
            type="monotone"
            dataKey="valor"
            stroke="#22c55e"
            strokeWidth={4}
            fill="url(#colorGreen)"
            dot={false}
            style={{
              filter: "drop-shadow(0 0 6px #22c55e88)"
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}