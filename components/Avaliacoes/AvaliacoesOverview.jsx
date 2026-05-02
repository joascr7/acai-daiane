import { useState } from "react";

export default function AvaliacoesOverview({
  avaliacoes = [],
  produtos = [],
  filtroAvaliacao,
  setFiltroAvaliacao,
  busca,
  setBusca,
  aprovarAvaliacao,
  recusarAvaliacao,
  criarAvaliacaoManual
}) {
  
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [modal, setModal] = useState(false);

const [avaliacoesTemp, setAvaliacoesTemp] = useState([
  {
    produtoId: "",
    nota: 5,
    comentario: ""
  }
]);


function atualizarItem(index, campo, valor) {
  const copia = [...avaliacoesTemp];
  copia[index][campo] = valor;
  setAvaliacoesTemp(copia);
}

function adicionarItem() {
  setAvaliacoesTemp([
    ...avaliacoesTemp,
    { produtoId: "", nota: 5, comentario: "" }
  ]);
}

function removerItem(index) {
  const copia = avaliacoesTemp.filter((_, i) => i !== index);
  setAvaliacoesTemp(copia);
}

  return (
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16, color: "#fff" }}>

      {/* HEADER */}
      <div
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 18,
          border: "1px solid #1f2937",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Avaliações</h2>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>
            Controle de feedbacks dos clientes
          </span>
        </div>

        <button
          onClick={() => setModal(true)}
          style={{
            background: "#ea1d2c",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: 10,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          + Nova
        </button>
      </div>

      {/* FILTROS */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
        {["todas", "pendente", "aprovado", "recusado"].map((f) => {
          const count =
            f === "todas"
              ? avaliacoes.length
              : avaliacoes.filter((a) => a.status === f).length;

          return (
            <div
              key={f}
              onClick={() => setFiltroAvaliacao(f)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: filtroAvaliacao === f ? "#ea1d2c" : "#111827",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                border: "1px solid #1f2937"
              }}
            >
              {f} ({count})
            </div>
          );
        })}
      </div>

      {/* BUSCA */}
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar produto..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: "1px solid #1f2937",
          background: "#111827",
          color: "#fff"
        }}
      />

      {/* LISTA */}
      <div style={{ background: "#111827", borderRadius: 18, padding: 14, border: "1px solid #1f2937" }}>
        {avaliacoes
          .filter((a) => {
            const produto = produtos.find((p) => p.id === a.produtoId);

            const passaFiltro =
              filtroAvaliacao === "todas" ||
              a.status === filtroAvaliacao;

            const passaBusca =
              !busca ||
              produto?.nome?.toLowerCase().includes(busca.toLowerCase());

            return passaFiltro && passaBusca;
          })
          .sort((a, b) => Number(b.criadoEm) - Number(a.criadoEm))
          .map((a) => {
            const produto = produtos.find((p) => p.id === a.produtoId);

            return (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 12,
                  borderBottom: "1px solid #1f2937",
                  alignItems: "center"
                }}
              >
                {/* IMAGEM */}
                <img
                  src={produto?.imagem || "/acai.png"}
                  alt={produto?.nome}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    objectFit: "cover",
                    background: "#1f2937"
                  }}
                />

                {/* CONTEÚDO */}
                <div style={{ flex: 1 }}>
                  <strong>
                    {produto?.nome || "Produto removido"}
                  </strong>

                  {/* MÉDIA */}
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>
                    ⭐ {produto?.mediaAvaliacao || 0} •{" "}
                    {produto?.totalAvaliacoes || 0} avaliações
                  </div>

                  {/* NOTA */}
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    ⭐ {a.nota} •{" "}
                    <span
                      style={{
                        color:
                          a.status === "aprovado"
                            ? "#22c55e"
                            : a.status === "recusado"
                            ? "#ef4444"
                            : "#facc15",
                        fontWeight: 700
                      }}
                    >
                      {a.status}
                    </span>
                  </div>

                  {/* COMENTÁRIO */}
                  {!!a.comentario && (
                    <div style={{ fontSize: 12, marginTop: 6 }}>
                      {a.comentario}
                    </div>
                  )}

                  {/* AÇÕES */}
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button
                      onClick={() => aprovarAvaliacao(a)}
                      style={{
                        background: "#22c55e",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: 6,
                        color: "#fff",
                        cursor: "pointer"
                      }}
                    >
                      Aprovar
                    </button>

                    <button
                      onClick={() => recusarAvaliacao(a)}
                      style={{
                        background: "#ef4444",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: 6,
                        color: "#fff",
                        cursor: "pointer"
                      }}
                    >
                      Recusar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {modal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
        background: "#111827",
        padding: 20,
        borderRadius: 16,
        width: 340,
        maxHeight: "90vh",
        overflowY: "auto"
      }}
    >
      <h3>Nova Avaliação</h3>

      {avaliacoesTemp.map((item, index) => {
        const produto = produtos.find(p => p.id === item.produtoId);

        return (
          <div
            key={index}
            style={{
              border: "1px solid #1f2937",
              borderRadius: 12,
              padding: 10,
              marginBottom: 10
            }}
          >
            {/* SELECT */}
            <select
              value={item.produtoId}
              onChange={(e) =>
                atualizarItem(index, "produtoId", e.target.value)
              }
              style={{ width: "100%", marginBottom: 8 }}
            >
              <option value="">Selecionar produto</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>

            {/* 🔥 IMAGEM DO PRODUTO */}
            {produto && (
              <img
                src={produto.imagem || "/acai.png"}
                alt={produto.nome}
                style={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 8
                }}
              />
            )}

            {/* ESTRELAS */}
            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  onClick={() => atualizarItem(index, "nota", n)}
                  style={{
                    cursor: "pointer",
                    fontSize: 22,
                    color: n <= item.nota ? "#facc15" : "#374151"
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* COMENTÁRIO */}
            <textarea
              placeholder="Comentário"
              value={item.comentario}
              onChange={(e) =>
                atualizarItem(index, "comentario", e.target.value)
              }
              style={{ width: "100%", marginBottom: 8 }}
            />

            {/* REMOVER */}
            {avaliacoesTemp.length > 1 && (
              <button
                onClick={() => removerItem(index)}
                style={{
                  background: "#ef4444",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: 6,
                  color: "#fff"
                }}
              >
                Remover
              </button>
            )}
          </div>
        );
      })}

      {/* ADICIONAR MAIS */}
      <button
        onClick={adicionarItem}
        style={{
          width: "100%",
          marginBottom: 10,
          background: "#374151",
          color: "#fff",
          border: "none",
          padding: 8,
          borderRadius: 8
        }}
      >
        + Adicionar mais
      </button>

      {/* SALVAR TODOS */}
      <button
        onClick={() => {
          for (const item of avaliacoesTemp) {
            const produto = produtos.find(p => p.id === item.produtoId);

            if (!produto || !item.comentario) continue;

            criarAvaliacaoManual({
              produtoId: produto.id,
              nomeProduto: produto.nome,
              comentario: item.comentario,
              nota: item.nota
            });
          }

          setModal(false);
          setAvaliacoesTemp([
            { produtoId: "", nota: 5, comentario: "" }
          ]);
        }}
        style={{
          width: "100%",
          background: "#22c55e",
          border: "none",
          padding: 10,
          borderRadius: 8,
          color: "#fff",
          fontWeight: 700
        }}
      >
        Salvar tudo
      </button>

      <button
        onClick={() => setModal(false)}
        style={{ marginTop: 6, width: "100%" }}
      >
        Cancelar
      </button>
    </div>
  </div>
)}
    </div>
  );
}