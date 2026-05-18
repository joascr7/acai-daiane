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
        
        flexDirection: "column",
        gap: 1,
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
                  marginBottom: 6,
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
                      padding: 14,
                      borderRadius: 18,
                      border: "1px solid #f0f0f0",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                      marginBottom: 6,
                      cursor: "pointer"
                    }}
                  >
                    <div
  style={{
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: 14
  }}
>
                      
                      {/* IMAGEM */}
<div
  style={{
    width: 120,
    height: 120,
    minWidth: 120,
    borderRadius: 14,
    overflow: "hidden",
    background: "#f5f5f5"
  }}
>
  <img
    src={p.imagem || "/acai.png"}
    alt={p.nome}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
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
<div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0
  }}
>
                        
                        {/* ⭐ AVALIAÇÃO */}
                        {p.mostrarAvaliacao && Number(p.avaliacao || 0) > 0 && (
                          <div style={{ fontSize: 12, marginBottom: 6 }}>
                            ⭐ {Number(p.avaliacao).toFixed(1)} •{" "}
                            {p.totalAvaliacoes || 0} avaliações
                          </div>
                        )}

                        {/* 🏷️ NOME */}
                        <div
  style={{
    fontWeight: 800,
    fontSize: 18,
    lineHeight: 1.1,
    marginBottom: 4
  }}
>
                          {p.nome}
                        </div>

                        {/* 📄 DESCRIÇÃO */}
                        {!!p.descricao && (
                          <div
  style={{
    fontSize: 14,
    color: "#666",
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  }}
>
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
      
      color: "#5b21b6",
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700
      
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
                              fontSize: 18,
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