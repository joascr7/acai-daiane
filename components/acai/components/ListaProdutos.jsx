export default function ListaProdutos({
  categorias,
  produtos,
  carrinho,
  setCarrinho,
  modoCompra,
  setBloqueioMsg,
  validarLojaAberta,
  categoriaTemExtras,
  categoriaVaiDiretoCarrinho,
  precoFinalProduto,
  produtoEmPromocao,
  formatarReal,
  setProduto,
  setAba,
  setStep,
  normalizar,
  ORDEM_CATEGORIAS
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "4px 6px 14px"
      }}
    >
      {[...categorias]
        .sort((a, b) => {
          const ia = ORDEM_CATEGORIAS.indexOf(normalizar(a.nome));
          const ib = ORDEM_CATEGORIAS.indexOf(normalizar(b.nome));
          return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
        })
        .map((cat) => {
          const lista = produtos.filter(
            (p) =>
              p.ativo === true &&
              normalizar(p.categoria) === normalizar(cat.nome)
          );

          if (!lista.length) return null;

          return (
            <div key={cat.id} style={{ marginBottom: 24 }}>
              {/* 🔥 TÍTULO DA CATEGORIA */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  marginBottom: 12,
                  color: "#111"
                }}
              >
                {cat.nome}
              </div>

              {lista.map((p, i) => {
                const abrirProduto = () => {
                  if (modoCompra === "fidelidade" && !p.resgate) {
                    setBloqueioMsg("Escolha apenas o açaí do plano fidelidade");
                    return;
                  }

                  if (!p.ativo) return;
                  if (!validarLojaAberta()) return;

                  if (categoriaTemExtras(p.categoria)) {
                    setProduto({
                      ...p,
                      preco: precoFinalProduto(p)
                    });
                    setAba("home");
                    setStep(2);
                    return;
                  }

                  if (categoriaVaiDiretoCarrinho(p.categoria)) {
                    setCarrinho((prev) => [
                      ...prev,
                      {
                        produto: p,
                        quantidade: 1,
                        extras: [],
                        total: Number(precoFinalProduto(p) || 0)
                      }
                    ]);

                    setAba("carrinho");
                    setStep(3);
                  }
                };

                return (
                  <div
                    key={i}
                    onClick={abrirProduto}
                    style={{
                      position: "relative",
                      background: "#fff",
                      borderRadius: 24,
                      padding: 12,
                      border: "1px solid #f0f0f0",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                      marginBottom: 10,
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", gap: 12 }}>
                      
                      {/* 🖼️ IMAGEM */}
                      <div
                        style={{
                          width: 160,
                          height: 160,
                          borderRadius: 18,
                          overflow: "hidden",
                          background: "#f6f6f6",
                          flexShrink: 0,
                          position: "relative"
                        }}
                      >
                        <img
                          src={p.imagem || "/acai.png"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />

                        {/* 🔥 BADGES */}
                        {(produtoEmPromocao(p) || p.maisVendido) && (
                          <div
                            style={{
                              position: "absolute",
                              top: 8,
                              left: 8,
                              display: "flex",
                              flexDirection: "column",
                              gap: 4,
                              zIndex: 2
                            }}
                          >
                            {produtoEmPromocao(p) && (
                              <div
                                style={{
                                  background: "#ea1d2c",
                                  color: "#fff",
                                  fontSize: 11,
                                  fontWeight: 800,
                                  padding: "4px 10px",
                                  borderRadius: 999
                                }}
                              >
                                Imperdível
                              </div>
                            )}

                            {p.maisVendido && (
                              <div
                                style={{
                                  background: "rgba(0,0,0,0.6)",
                                  color: "#fff",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  padding: "4px 10px",
                                  borderRadius: 999
                                }}
                              >
                                Mais pedido
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* 📦 CONTEÚDO */}
                      <div style={{ flex: 1 }}>
                        
                        {/* ⭐ AVALIAÇÃO */}
                        {p.mostrarAvaliacao && Number(p.avaliacao || 0) > 0 && (
                          <div style={{ fontSize: 12, marginBottom: 6 }}>
                            ⭐ {Number(p.avaliacao).toFixed(1)} •{" "}
                            {p.totalAvaliacoes || 0} avaliações
                          </div>
                        )}

                        {/* 🏷️ NOME */}
                        <div style={{ fontWeight: 900 }}>
                          {p.nome}
                        </div>

                        {/* 📄 DESCRIÇÃO */}
                        {!!p.descricao && (
                          <div style={{ fontSize: 12, color: "#666" }}>
                            {p.descricao}
                          </div>
                        )}

                        {/* 📏 TAMANHO */}
                        {p.tamanho && (
  <div
    style={{
      marginTop: 8,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "#f3f0ff",
      color: "#5b21b6",
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
      border: "1px solid #e0d7ff"
    }}
  >
    <span>{p.tamanho}</span>

    {p.descricaoTamanho && (
      <span
        style={{
          fontWeight: 500,
          color: "#6d28d9"
        }}
      >
        • {p.descricaoTamanho}
      </span>
    )}
  </div>
)}

                        {/* 💰 PREÇO */}
                        <div style={{ marginTop: 8 }}>
                          {produtoEmPromocao(p) && (
                            <div
                              style={{
                                textDecoration: "line-through",
                                fontSize: 12,
                                color: "#888"
                              }}
                            >
                              {formatarReal(p.preco || 0)}
                            </div>
                          )}

                          <div style={{ fontSize: 12, color: "#888" }}>
                            A partir de
                          </div>

                          <div
                            style={{
                              fontSize: 22,
                              fontWeight: 900,
                              color: produtoEmPromocao(p)
                                ? "#ea1d2c"
                                : "#111"
                            }}
                          >
                            {formatarReal(precoFinalProduto(p))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}