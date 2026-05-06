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

export default function DashboardGrafico({
  pedidos = [],
  vendasManuais = [],
  formatarReal
}) {
  const map = {};

  const getData = (d) => {
    if (!d) return new Date();
    if (d?.toDate) return d.toDate();
    return new Date(d);
  };

  pedidos.forEach((p) => {
    if (p.status === "cancelado" || p.status === "pendente") return;

    const data = getData(p.data || p.criadoEm);

    const dia = data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit"
    });

    if (!map[dia]) map[dia] = 0;

    map[dia] += Number(p.total || 0);
  });

  vendasManuais.forEach((v) => {
    const data = getData(v.data);

    const dia = data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit"
    });

    if (!map[dia]) map[dia] = 0;

    map[dia] += Number(v.valor || 0);
  });

  const dados = Object.entries(map).map(([dia, valor]) => ({
    dia,
    valor
  }));

  dados.sort((a, b) => {
    const [d1, m1] = a.dia.split("/");
    const [d2, m2] = b.dia.split("/");

    const data1 = new Date(`${new Date().getFullYear()}-${m1}-${d1}`);
    const data2 = new Date(`${new Date().getFullYear()}-${m2}-${d2}`);

    return data1 - data2;
  });

  const total = dados.reduce((acc, d) => acc + d.valor, 0);

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
        background: "#ffffff", // 🔥 antes dark
        borderRadius: 20,
        padding: 18,
        border: "1px solid #e5e7eb",
        margin: "8px 0 20px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
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
          <h3 style={{ color: "#111827", margin: 0 }}>
            Faturamento
          </h3>

          <div style={{ fontSize: 13, color: "#6b7280" }}>
            Últimos dias
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              color: "#16a34a",
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
              color: positivo ? "#16a34a" : "#dc2626",
              fontWeight: 700
            }}
          >
            {positivo ? "▲" : "▼"} {crescimento.toFixed(1)}%
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={dados}>
          {/* GRADIENTE */}
          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#e5e7eb" // 🔥 antes dark
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="dia"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke="#6b7280"
            tickFormatter={(v) => `R$ ${v}`}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              color: "#111827",
              fontSize: 12
            }}
            formatter={(value) => formatarReal(value)}
          />

          <Area
            type="monotone"
            dataKey="valor"
            stroke="#16a34a"
            strokeWidth={3}
            fill="url(#colorGreen)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}