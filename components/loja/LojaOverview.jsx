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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12,
          width: "100%",
          boxSizing: "border-box"
        }}
      >
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

          <div
            style={{
              padding: 10,
              borderRadius: 10,
              textAlign: "center",
              fontWeight: 700,
              background: lojaAberta ? "#dcfce7" : "#fee2e2",
              color: lojaAberta ? "#166534" : "#991b1b"
            }}
          >
            {lojaAberta ? "Loja aberta" : "Loja fechada"}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => toggleLoja(true)} style={btnGreen}>
              Abrir
            </button>
            <button onClick={() => toggleLoja(false)} style={btnRed}>
              Fechar
            </button>
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

          {logoInput && <img src={logoInput} style={preview} />}

          <button onClick={salvarLogo} style={btnPrimaryFull}>
            Salvar
          </button>
        </div>

        {/* FERIADOS */}
        <div style={{ ...card, gridColumn: "1 / -1" }}>
          <h3 style={title}>Feriados</h3>

          <CalendarioFeriados horarios={horarios} />

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

/* 🔥 ESTILOS LIGHT */

const container = {
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  color: "#111827"
};

const header = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 16,
  border: "1px solid #e5e7eb"
};

const sub = {
  fontSize: 12,
  color: "#6b7280"
};

const card = {
  background: "#ffffff",
  padding: 14,
  borderRadius: 14,
  border: "1px solid #e5e7eb"
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
  background: "#f9fafb",
  marginBottom: 4,
  border: "1px solid #e5e7eb"
};

const input = {
  flex: 1,
  padding: 8,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#111827"
};

const preview = {
  width: 80,
  height: 80,
  borderRadius: 12,
  marginTop: 8,
  border: "1px solid #e5e7eb"
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
  background: "#e0f2fe",
  color: "#075985",
  borderRadius: 8,
  padding: "6px 10px",
  border: "none"
};

const btnGreen = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  background: "#dcfce7",
  color: "#166534",
  border: "none"
};

const btnRed = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  background: "#fee2e2",
  color: "#991b1b",
  border: "none"
};

const btnRedSmall = {
  background: "#fee2e2",
  color: "#991b1b",
  border: "none",
  borderRadius: 6,
  padding: "4px 8px"
};