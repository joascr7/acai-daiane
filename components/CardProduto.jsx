export default function CardProduto({
  p,
  onAbrirProduto,
  produtoEmPromocao,
  precoFinalProduto,
  formatarReal
}) {
  const emPromocao = produtoEmPromocao(p);
  const mostrarMaisVendido = p?.maisVendido === true;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20, // 🔥 levemente menor (mais moderno)
        padding: 12,
        border: "1px solid #e5e7eb", // 🔥 melhor que #f0f0f0
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)" // 🔥 mais leve
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        {/* IMAGEM */}
        <div
          onClick={onAbrirProduto}
          style={{
            width: 104,
            height: 104,
            borderRadius: 16,
            overflow: "hidden",
            background: "#f3f4f6", // 🔥 melhor contraste
            flexShrink: 0,
            cursor: "pointer",
            position: "relative"
          }}
        >
          <img
            src={p?.imagem || "/acai.png"}
            alt={p?.nome || "Produto"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none"
            }}
          />

          {(emPromocao || mostrarMaisVendido) && (
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                maxWidth: "85%"
              }}
            >
              {emPromocao && (
                <div
                  style={{
                    background: "#ea1d2c",
                    color: "#fff",
                    fontSize: 10,
                    padding: "4px 8px",
                    borderRadius: 999,
                    fontWeight: 800,
                    whiteSpace: "nowrap"
                  }}
                >
                  Oferta
                </div>
              )}

              {mostrarMaisVendido && (
                <div
                  style={{
                    background: "#f97316", // 🔥 melhor que laranja antigo
                    color: "#fff",
                    fontSize: 10,
                    padding: "4px 8px",
                    borderRadius: 999,
                    fontWeight: 800,
                    whiteSpace: "nowrap"
                  }}
                >
                  Mais vendido
                </div>
              )}
            </div>
          )}
        </div>

        {/* MEIO */}
        <div
          style={{
            flex: 1,
            minWidth: 0
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.2
            }}
          >
            {p?.nome}
          </div>

          {!!p?.descricao && (
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "#4b5563", // 🔥 antes #666
                lineHeight: 1.35,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              }}
            >
              {p.descricao}
            </div>
          )}

          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "#6b7280" // 🔥 melhor contraste
            }}
          >
            {p?.tamanho ? `• ${p.tamanho}` : ""}
          </div>

          <div style={{ marginTop: 10 }}>
            {emPromocao ? (
              <>
                <div
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    textDecoration: "line-through",
                    marginBottom: 4
                  }}
                >
                  {formatarReal(p?.preco || 0)}
                </div>

                <strong
                  style={{
                    fontSize: 18,
                    color: "#ea1d2c",
                    fontWeight: 900
                  }}
                >
                  {formatarReal(precoFinalProduto(p))}
                </strong>
              </>
            ) : (
              <strong
                style={{
                  fontSize: 18,
                  color: "#111827",
                  fontWeight: 900
                }}
              >
                {formatarReal(precoFinalProduto(p))}
              </strong>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}