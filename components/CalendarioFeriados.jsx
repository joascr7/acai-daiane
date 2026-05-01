import React, { useEffect, useState } from "react";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { dbAdmin as db } from "../services/firebaseDual";

export default function CalendarioFeriados({ horarios, isMobile }) {
  const hoje = new Date();

  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [feriadosApi, setFeriadosApi] = useState([]);

  // 🔥 BUSCAR FERIADOS
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

    const key = d.toLocaleDateString("en-CA"); // 🔥 sem bug

    dias.push({ date: d, key });
  }

  const hojeKey = hoje.toLocaleDateString("en-CA");

  async function toggleFeriado(key) {
    const existe = horarios?.feriados?.[key];

    try {
      if (existe) {
        await updateDoc(doc(db, "config", "horarioFuncionamento"), {
          [`feriados.${key}`]: deleteField()
        });
      } else {
        await updateDoc(doc(db, "config", "horarioFuncionamento"), {
          [`feriados.${key}`]: {
            abre: "16:00",
            fecha: "23:00",
            ativo: true
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div style={card}>
      
      {/* HEADER */}
      <div style={header}>
        <button onClick={() => setMes(mes - 1)} style={navBtn}>◀</button>

        <span style={titulo}>
          {nomesMes[mes]} {ano}
        </span>

        <button onClick={() => setMes(mes + 1)} style={navBtn}>▶</button>
      </div>

      {/* DIAS SEMANA */}
      <div style={weekGrid}>
        {diasSemana.map((d, i) => (
          <div key={i} style={weekDay}>{d}</div>
        ))}
      </div>

      {/* CALENDÁRIO */}
      <div style={grid}>
        {dias.map((d, i) => {
          if (!d) return <div key={i} />;

          const feriadoInfo = feriadosApi.find(f => f.date === d.key);

          const isHoje = d.key === hojeKey;
          const isFeriadoApi = !!feriadoInfo;
          const isFeriadoManual = horarios?.feriados?.[d.key];

          const isFeriado = isFeriadoManual || isFeriadoApi;

          return (
            <div
              key={d.key}
              onClick={() => toggleFeriado(d.key)}
              style={{
                ...day,
                background: isFeriado
                  ? "#ea1d2c"
                  : isHoje
                  ? "#1e293b"
                  : "#020617",
                border: isHoje ? "1px solid #475569" : "1px solid #1e293b"
              }}
            >
              <div>{d.date.getDate()}</div>

              {/* 🔥 NOME CURTO */}
              {feriadoInfo && (
                <div style={feriadoNome}>
                  {feriadoInfo.name.replace("Dia do", "").split(" ")[0]}
                </div>
              )}

              {isFeriado && <div style={dot} />}
            </div>
          );
        })}
      </div>

      <div style={legend}>
        <span><b>•</b> Vermelho = Feriado</span>
      </div>
    </div>
  );
}

const card = {
  background: "#020617",
  padding: 16,
  borderRadius: 16,
  border: "1px solid #1e293b"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12
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
  padding: "4px 10px",
  cursor: "pointer"
};

const weekGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  marginBottom: 6
};

const weekDay = {
  textAlign: "center",
  fontSize: 11,
  color: "#64748b"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 6
};

const day = {
  height: 52,
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontWeight: 600,
  position: "relative"
};

const feriadoNome = {
  fontSize: 9,
  marginTop: 2,
  opacity: 0.9,
  textAlign: "center",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const dot = {
  width: 5,
  height: 5,
  background: "#fff",
  borderRadius: "50%",
  position: "absolute",
  bottom: 6
};

const legend = {
  marginTop: 10,
  fontSize: 11,
  color: "#64748b"
};