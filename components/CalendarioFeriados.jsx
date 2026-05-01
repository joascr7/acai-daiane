import React, { useEffect, useState } from "react";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { dbAdmin as db } from "../services/firebaseDual";


export default function CalendarioFeriados({ horarios }) {
  const hoje = new Date();

  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [feriadosApi, setFeriadosApi] = useState([]);

  useEffect(() => {
    async function carregarFeriados() {
      try {
        const res = await fetch(
          `https://brasilapi.com.br/api/feriados/v1/${ano}`
        );
        const data = await res.json();
        setFeriadosApi(data || []);
      } catch (e) {
        console.log(e);
      }
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
      {/* HEADER */}
      <div style={header}>
        <button onClick={() => setMes(mes - 1)} style={navBtn}>◀</button>

        <span style={titulo}>
          {nomesMes[mes]} {ano}
        </span>

        <button onClick={() => setMes(mes + 1)} style={navBtn}>▶</button>
      </div>

      {/* DIAS */}
      <div style={weekGrid}>
        {diasSemana.map((d, i) => (
          <div key={i} style={weekDay}>{d}</div>
        ))}
      </div>

      {/* CALENDÁRIO */}
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
                  {feriadoInfo.name.replace("Dia do", "").slice(0, 10)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


const container = {
  width: "100%",
  maxWidth: 500,        // 🔥 controla largura
  margin: "0 auto",
  padding: 12,
  boxSizing: "border-box"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr", // 🔥 1 coluna SEMPRE (mobile perfeito)
  gap: 12,
  width: "100%"
};

const card = {
  background: "#0f172a",
  padding: 14,
  borderRadius: 16,
  border: "1px solid #1e293b",
  width: "100%",
  boxSizing: "border-box"
};

const title = {
  fontSize: 14,
  marginBottom: 8,
  fontWeight: 700
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#fff",
  marginTop: 8,
  boxSizing: "border-box"
};

const btnFull = {
  width: "100%",            // 🔥 evita quebrar layout
  padding: 12,
  borderRadius: 12,
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  marginTop: 10,
  fontWeight: 700
};


const calendarCard = {
  background: "#020617",
  padding: 10,
  borderRadius: 14,
  border: "1px solid #1e293b",
  width: "100%",
  boxSizing: "border-box",
  overflow: "hidden"
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
  marginBottom: 6
};

const weekDay = {
  fontSize: 10,
  color: "#64748b",
  textAlign: "center"
};

const gridCalendar = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 6 // 🔥 aumenta espaço (corrige esmagamento)
};

const day = {
  height: 48, // 🔥 mais altura
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  padding: 4,
  boxSizing: "border-box"
};

const feriadoNome = {
  fontSize: 8,
  marginTop: 2,
  opacity: 0.85,
  textAlign: "center",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};