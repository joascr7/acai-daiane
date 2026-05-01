import { Pencil, Power, PowerOff, ChevronUp, ChevronDown, Trash2 } from "lucide-react";

export default function ProdutosOverview({
  produtos = [],
  abrirEdicao,
  toggleProduto,
  moverProduto,
  excluirProduto,
  formatarReal,
  isMobile,
  setMostrarModalProduto,
  setProdutoEditandoId,
  setNovoNome,
  setNovoPreco,
  setNovoPrecoPromocional,
  setPromocaoAtiva,
  setNovoTamanho,
  setNovaDescricao,
  setNovaImagem,
  setMaisVendido,
  setCategoria,
  categorias = []
}) {
  return (
    <div
      style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        color: "#fff"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 18,
          border: "1px solid #1f2937",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Produtos</h2>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>
            Gerencie seus produtos
          </span>
        </div>

        <button
          onClick={() => {
            setProdutoEditandoId(null);
            setNovoNome("");
            setNovoPreco("");
            setNovoPrecoPromocional("");
            setPromocaoAtiva(false);
            setNovoTamanho("");
            setNovaDescricao("");
            setNovaImagem("");
            setMaisVendido(false);
            setCategoria(categorias?.[0]?.slug || "");
            setMostrarModalProduto(true);
          }}
          style={{
            height: 42,
            padding: "0 16px",
            borderRadius: 12,
            background: "#ea1d2c",
            color: "#fff",
            border: "none",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Novo produto
        </button>
      </div>

      {/* LISTA */}
      <div
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 16,
          border: "1px solid #1f2937"
        }}
      >
        {produtos.length === 0 && (
          <div style={{ color: "#9ca3af" }}>
            Nenhum produto cadastrado
          </div>
        )}

        {produtos.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              padding: 12,
              borderRadius: 14,
              background: "#0f172a",
              marginBottom: 10,
              border: "1px solid #1f2937",
              flexWrap: isMobile ? "wrap" : "nowrap",
              transition: "0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* INFO */}
            <div style={{ display: "flex", gap: 10, flex: 1 }}>
              <img
                src={p.imagem || "/acai.png"}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  objectFit: "cover"
                }}
              />

              <div>
                <strong>{p.nome}</strong>

                {/* PREÇO */}
                <div style={{ fontSize: 13 }}>
                  {p.promocao && p.precoPromocional ? (
                    <>
                      <span style={{
                        textDecoration: "line-through",
                        color: "#6b7280"
                      }}>
                        {formatarReal(p.preco)}
                      </span>{" "}
                      <span style={{ color: "#22c55e", fontWeight: 700 }}>
                        {formatarReal(p.precoPromocional)}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "#22c55e" }}>
                      {formatarReal(p.preco)}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  {p.tamanho}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    color: p.ativo ? "#22c55e" : "#ef4444",
                    fontWeight: 700
                  }}
                >
                  {p.ativo ? "Ativo" : "Inativo"}
                </div>
              </div>
            </div>

            {/* AÇÕES */}
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap"
              }}
            >
              <button
                onClick={() => abrirEdicao(p)}
                style={btnIcon}
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => toggleProduto(p)}
                style={{
                  ...btnIcon,
                  background: p.ativo ? "#7f1d1d" : "#064e3b",
                  color: "#fff"
                }}
              >
                {p.ativo ? <PowerOff size={16} /> : <Power size={16} />}
              </button>

              <button
                onClick={() => moverProduto(p, -1)}
                style={btnIcon}
              >
                <ChevronUp size={16} />
              </button>

              <button
                onClick={() => moverProduto(p, 1)}
                style={btnIcon}
              >
                <ChevronDown size={16} />
              </button>

              <button
                onClick={() => excluirProduto(p)}
                style={{
                  ...btnIcon,
                  background: "#7f1d1d",
                  color: "#fecaca"
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* BOTÃO PADRÃO */
const btnIcon = {
  width: 38,
  height: 38,
  borderRadius: 10,
  border: "1px solid #1f2937",
  background: "#111827",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};