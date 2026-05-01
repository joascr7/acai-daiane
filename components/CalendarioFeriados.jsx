import React, { useEffect, useState } from "react";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { dbAdmin as db } from "../services/firebaseDual";

export default function CalendarioFeriados({ horarios, isMobile }) {
  const hoje = new Date();

  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [feriadosApi, setFeriadosApi] = useState([]);

  useEffect(() => {
    async function carregarFeriados() {
      const res = await fetch(
        `https://brasilapi.com.br/api/feriados/v1/${ano}`
      );
      const data = await res.json();
      setFeriadosApi(data || []);
    }
    carregarFeriados();
  }, [ano]);

  const nomesMes = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const diasSemana = ["D","S","T","Q","Q","S","S"];

  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

  const dias = [];

  for (let i = 0; i < primeiroDiaSemana; i++) {
    dias.push(null);
  }

  for (let i = 1; i <= totalDias; i++) {
    const d = new Date(ano, mes, i);
    const key = d.toLocaleDateString("en-CA");
    dias.push({ date: d, key });
  }

  const hojeKey = hoje.toLocaleDateString("en-CA");

  return (
    <div style={calendarCard}>
      <div style={header}>
        <button onClick={() => setMes(mes - 1)} style={navBtn}>◀</button>

        <span style={titulo}>
          {nomesMes[mes]} {ano}
        </span>

        <button onClick={() => setMes(mes + 1)} style={navBtn}>▶</button>
      </div>

      <div style={weekGrid}>
        {diasSemana.map((d, i) => (
          <div key={i} style={weekDay}>{d}</div>
        ))}
      </div>

      <div style={gridCalendar}>
        {dias.map((d, i) => {
          if (!d) return <div key={i} />;

          const feriadoInfo = feriadosApi.find(f => f.date === d.key);
          const isHoje = d.key === hojeKey;
          const isFeriado = !!feriadoInfo || horarios?.feriados?.[d.key];

          return (
            <div
              key={d.key}
              style={{
                ...day,
                background: isFeriado
                  ? "#ea1d2c"
                  : isHoje
                  ? "#1e293b"
                  : "#020617"
              }}
            >
              <div>{d.date.getDate()}</div>

              {feriadoInfo && (
                <div style={feriadoNome}>
                  {feriadoInfo.name.replace("Dia do", "").split(" ")[0]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const calendarCard = {
  background: "#020617",
  padding: 12,
  borderRadius: 14,
  border: "1px solid #1e293b"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10
};

const titulo = {
  fontWeight: 700,
  fontSize: 14
};

const navBtn = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  color: "#fff",
  borderRadius: 8,
  padding: "4px 8px"
};

const weekGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  marginBottom: 4
};

const weekDay = {
  fontSize: 10,
  color: "#64748b",
  textAlign: "center"
};

const gridCalendar = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 4
};

const day = {
  height: 44,
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12
};

const feriadoNome = {
  fontSize: 7,
  opacity: 0.8
};