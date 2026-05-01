import React, { useState } from "react";
import CalendarioFeriados from "../CalendarioFeriados";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { dbAdmin as db } from "../../services/firebaseDual";

export default function LojaOverview(props) {
  const {
    categorias = [],
    editandoCategoriaId,
    editandoCategoria,
    setEditandoCategoria,
    setEditandoCategoriaId,
    salvarEdicaoCategoria,
    novaCategoria,
    setNovaCategoria,
    criarCategoria,
    lojaAberta,
    toggleLoja,
    logoInput,
    setLogoInput,
    salvarLogo,
    isMobile,
    horarios
  } = props;

  const [novaDataFeriado, setNovaDataFeriado] = useState("");

  // 🔥 ADICIONAR FERIADO
  async function adicionarFeriado() {
    if (!novaDataFeriado) return;

    try {
      await updateDoc(doc(db, "config", "horarioFuncionamento"), {
        [`feriados.${novaDataFeriado}`]: {
          abre: "16:00",
          fecha: "23:00",
          ativo: true
        }
      });

      setNovaDataFeriado("");
    } catch (e) {
      console.error(e);
    }
  }

  // 🔥 REMOVER FERIADO
  async function removerFeriado(data) {
    try {
      await updateDoc(doc(db, "config", "horarioFuncionamento"), {
        [`feriados.${data}`]: deleteField()
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div style={container}>
      {/* HEADER */}
      <div style={header}>
        <h2 style={{ margin: 0 }}>Loja</h2>
        <span style={sub}>Configurações gerais</span>
      </div>

      {/* GRID */}
      <div style={grid}>

        {/* CATEGORIAS */}
        <div style={card}>
          <h3 style={title}>Categorias</h3>

          {categorias.map((c) => (
            <div key={c.id} style={itemRow}>
              {editandoCategoriaId === c.id ? (
                <input
                  value={editandoCategoria[c.id] || ""}
                  onChange={(e) =>
                    setEditandoCategoria((prev) => ({
                      ...prev,
                      [c.id]: e.target.value
                    }))
                  }
                  style={input}
                />
              ) : (
                <span style={{ flex: 1 }}>{c.nome}</span>
              )}

              <button
                onClick={() =>
                  editandoCategoriaId === c.id
                    ? salvarEdicaoCategoria(c.id)
                    : (
                        setEditandoCategoriaId(c.id),
                        setEditandoCategoria((prev) => ({
                          ...prev,
                          [c.id]: c.nome
                        }))
                      )
                }
                style={btnBlue}
              >
                {editandoCategoriaId === c.id ? "Salvar" : "Editar"}
              </button>
            </div>
          ))}

          <div style={{ display: "flex", gap: 6 }}>
            <input
              placeholder="Nova categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              style={input}
            />
            <button onClick={criarCategoria} style={btnPrimary}>+</button>
          </div>
        </div>

        {/* STATUS */}
        <div style={card}>
          <h3 style={title}>Status da loja</h3>

          <div style={{
            padding: 10,
            borderRadius: 10,
            textAlign: "center",
            fontWeight: 700,
            background: lojaAberta ? "#065f46" : "#7f1d1d"
          }}>
            {lojaAberta ? "Loja aberta" : "Loja fechada"}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => toggleLoja(true)} style={btnGreen}>Abrir</button>
            <button onClick={() => toggleLoja(false)} style={btnRed}>Fechar</button>
          </div>
        </div>

        {/* LOGO */}
        <div style={card}>
          <h3 style={title}>Logo</h3>

          <input
            placeholder="URL da logo"
            value={logoInput}
            onChange={(e) => setLogoInput(e.target.value)}
            style={input}
          />

          {logoInput && (
            <img src={logoInput} style={preview} />
          )}

          <button onClick={salvarLogo} style={btnPrimaryFull}>
            Salvar
          </button>
        </div>

        {/* 🔥 CALENDÁRIO + LISTA */}
        <div style={card}>
          <h3 style={title}>Feriados</h3>

          {/* CALENDÁRIO */}
          <CalendarioFeriados horarios={horarios} />

          {/* INPUT MANUAL */}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <input
              type="date"
              value={novaDataFeriado}
              onChange={(e) => setNovaDataFeriado(e.target.value)}
              style={input}
            />
            <button onClick={adicionarFeriado} style={btnPrimary}>
              +
            </button>
          </div>

          {/* LISTA */}
          <div style={{ marginTop: 10 }}>
            {Object.keys(horarios?.feriados || {}).map((data) => (
              <div key={data} style={itemRow}>
                <span style={{ flex: 1 }}>{data}</span>

                <button
                  onClick={() => removerFeriado(data)}
                  style={btnRedSmall}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const container = {
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  color: "#fff"
};

const header = {
  background: "#0f172a",
  borderRadius: 16,
  padding: 16,
  border: "1px solid #1e293b"
};

const sub = {
  fontSize: 12,
  color: "#94a3b8"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12
};

const card = {
  background: "#0f172a",
  padding: 14,
  borderRadius: 14,
  border: "1px solid #1e293b"
};

const title = {
  fontSize: 14,
  marginBottom: 8
};

const itemRow = {
  display: "flex",
  gap: 6,
  alignItems: "center",
  padding: "6px 8px",
  borderRadius: 8,
  background: "#020617",
  marginBottom: 4
};

const input = {
  flex: 1,
  padding: 8,
  borderRadius: 8,
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#fff"
};

const preview = {
  width: 80,
  height: 80,
  borderRadius: 12,
  marginTop: 8
};

const btnPrimary = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: "#ea1d2c",
  color: "#fff",
  border: "none"
};

const btnPrimaryFull = {
  marginTop: 8,
  width: "100%",
  padding: 10,
  borderRadius: 10,
  background: "#ea1d2c",
  color: "#fff",
  border: "none"
};

const btnBlue = {
  background: "#2563eb",
  color: "#fff",
  borderRadius: 8,
  padding: "6px 10px",
  border: "none"
};

const btnGreen = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  background: "#16a34a",
  color: "#fff",
  border: "none"
};

const btnRed = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  background: "#dc2626",
  color: "#fff",
  border: "none"
};

const btnRedSmall = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "4px 8px"
};