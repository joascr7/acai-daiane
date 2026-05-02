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
  const [modal, setModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");

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
        {avaliacoes.map((a) => {
          const produto = produtos.find((p) => p.id === a.produtoId);

          return (
            <div key={a.id} style={{ padding: 12, borderBottom: "1px solid #1f2937" }}>

              {/* PRODUTO */}
              <div>
                <strong>{produto?.nome || "Produto removido"}</strong>

                <div style={{ fontSize: 11, color: "#9ca3af" }}>
                  ⭐ {produto?.mediaAvaliacao || 0} • {produto?.totalAvaliacoes || 0} avaliações
                </div>
              </div>

              {/* NOTA */}
              <div style={{ fontSize: 12, marginTop: 4 }}>
                ⭐ {a.nota} • {a.status}
              </div>

              {/* COMENTÁRIO */}
              {!!a.comentario && (
                <div style={{ fontSize: 12, marginTop: 6 }}>
                  {a.comentario}
                </div>
              )}

              {/* AÇÕES */}
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <button onClick={() => aprovarAvaliacao(a)}>Aprovar</button>
                <button onClick={() => recusarAvaliacao(a)}>Recusar</button>
              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL */}
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
              width: 320
            }}
          >
            <h3>Nova Avaliação</h3>

            {/* SELECT PRODUTO */}
            <select
              value={produtoSelecionado}
              onChange={(e) => setProdutoSelecionado(e.target.value)}
              style={{ width: "100%", marginBottom: 12 }}
            >
              <option value="">Selecionar produto</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>

            {/* ESTRELAS */}
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  onClick={() => setNota(n)}
                  style={{
                    cursor: "pointer",
                    fontSize: 22,
                    color: n <= nota ? "#facc15" : "#374151"
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* COMENTÁRIO */}
            <textarea
              placeholder="Comentário"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              style={{ width: "100%", marginBottom: 12 }}
            />

            {/* BOTÕES */}
            <button
              onClick={() => {
                const produto = produtos.find(p => p.id === produtoSelecionado);

                if (!produto) {
                  alert("Selecione um produto");
                  return;
                }

                if (!comentario) {
                  alert("Digite um comentário");
                  return;
                }

                criarAvaliacaoManual({
                  produtoId: produto.id,
                  nomeProduto: produto.nome,
                  comentario,
                  nota
                });

                setModal(false);
                setComentario("");
                setNota(5);
                setProdutoSelecionado("");
              }}
              style={{ marginRight: 10 }}
            >
              Salvar
            </button>

            <button onClick={() => setModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}