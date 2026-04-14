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
        background: "#fff",
        borderRadius: 24,
        padding: 12,
        border: "1px solid #f0f0f0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
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
            borderRadius: 18,
            overflow: "hidden",
            background: "#f6f6f6",
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
                    fontSize: 9,
                    padding: "4px 8px",
                    borderRadius: 999,
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    boxShadow: "0 6px 14px rgba(234,29,44,0.18)"
                  }}
                >
                  Oferta
                </div>
              )}

              {mostrarMaisVendido && (
                <div
                  style={{
                    background: "#ff7a00",
                    color: "#fff",
                    fontSize: 9,
                    padding: "4px 8px",
                    borderRadius: 999,
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    boxShadow: "0 6px 14px rgba(255,122,0,0.18)"
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
              color: "#111",
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
                color: "#666",
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
              color: "#8b8b8b"
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
                    color: "#a3a3a3",
                    textDecoration: "line-through",
                    lineHeight: 1.1,
                    marginBottom: 4
                  }}
                >
                  {formatarReal(p?.preco || 0)}
                </div>

                <strong
                  style={{
                    fontSize: 18,
                    color: "#ea1d2c",
                    lineHeight: 1.05,
                    fontWeight: 900,
                    letterSpacing: "-0.03em"
                  }}
                >
                  {formatarReal(precoFinalProduto(p))}
                </strong>
              </>
            ) : (
              <strong
                style={{
                  fontSize: 18,
                  color: "#111",
                  lineHeight: 1.05,
                  fontWeight: 900,
                  letterSpacing: "-0.03em"
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