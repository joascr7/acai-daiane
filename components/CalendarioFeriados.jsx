
import { doc, updateDoc, getDoc, deleteField } from "firebase/firestore";
import { db } from "../services/firebaseDual";
import React, { useEffect, useState } from "react";

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

  // 🔥 NOVO: função pra fechar/reabrir dia

async function toggleDiaFechado(data) {
  const ref = doc(db, "config", "horarios");

  // 🔥 SEMPRE pega do Firestore (fonte real)
  const snap = await getDoc(ref);
  const atual = snap.data()?.diasFechados || {};

  const jaExiste = atual[data];

  console.log("FIRESTORE:", atual);
  console.log("EXISTE REAL?", jaExiste);

  if (jaExiste) {
    await updateDoc(ref, {
      [`diasFechados.${data}`]: deleteField()
    });
  } else {
    await updateDoc(ref, {
      [`diasFechados.${data}`]: true
    });
  }
}

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
    <div style={card}>
      
      {/* HEADER */}
      <div style={header}>
        <button
          onClick={() => {
            if (mes === 0) {
              setMes(11);
              setAno(ano - 1);
            } else {
              setMes(mes - 1);
            }
          }}
          style={navBtn}
        >
          ◀
        </button>

        <span style={titulo}>
          {nomesMes[mes]} {ano}
        </span>

        <button
          onClick={() => {
            if (mes === 11) {
              setMes(0);
              setAno(ano + 1);
            } else {
              setMes(mes + 1);
            }
          }}
          style={navBtn}
        >
          ▶
        </button>
      </div>

      {/* DIAS */}
      <div style={calendarGrid}>
        {diasSemana.map((d, i) => (
          <div key={i} style={weekDay}>{d}</div>
        ))}

        {dias.map((d, i) => {
          if (!d) return <div key={i} style={empty} />;

          const feriadoInfo = feriadosApi.find(f => f.date === d.key);

          const isHoje = d.key === hojeKey;

          // 🔥 NOVO
          const isFechado = horarios?.diasFechados?.[d.key];

          const isFeriado = !!feriadoInfo; // 🔥 só API agora

          return (
            <div
              key={d.key}
              onClick={() => toggleDiaFechado(d.key)} // 🔥 CLIQUE AQUI
              style={{
                ...day,
                background: isFechado
                  ? "#dc2626" // 🔴 fechado manual
                  : isFeriado
                  ? "#f59e0b" // 🟡 feriado
                  : isHoje
                  ? "#1e293b"
                  : "#020617",
                cursor: "pointer"
              }}
            >
              <div style={dayNumber}>
                {d.date.getDate()}
              </div>

              {isFechado && (
                <div style={feriadoNome}>
                  Fechado
                </div>
              )}

              {isFeriado && !isFechado && (
                <div style={feriadoNome}>
                  {feriadoInfo.name.split(" ")[0]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= ESTILO ================= */

const card = {
  background: "#020617",
  padding: 8,
  borderRadius: 16,
  border: "1px solid #1e293b",
  width: "100%",
  maxWidth: "100%", // 🔥 IMPORTANTE
  boxSizing: "border-box",
  overflow: "hidden" // 🔥 evita vazar
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10
};

const titulo = {
  fontWeight: 700,
  fontSize: 14,
  color: "#fff"
};

const navBtn = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  color: "#fff",
  borderRadius: 8,
  padding: "6px 10px",
  cursor: "pointer"
};

/* 🔥 GRID RESPONSIVO */
const calendarGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 3
};

const weekDay = {
  textAlign: "center",
  fontSize: 9,
  color: "#64748b"
};
const empty = {
  aspectRatio: "1 / 1"
};

const day = {
  width: "100%",
  aspectRatio: "1 / 1",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 11, // 🔥 menor
  color: "#fff",
  padding: 2 // 🔥 ajuda a caber
};

const dayNumber = {
  fontWeight: 700,
  fontSize: 12
};

const feriadoNome = {
  fontSize: 7,
  marginTop: 1,
  opacity: 0.85,
  textAlign: "center"
};

