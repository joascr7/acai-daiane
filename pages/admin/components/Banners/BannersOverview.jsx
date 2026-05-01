import { ImagePlus, Power, PowerOff, ChevronUp, ChevronDown, Trash2 } from "lucide-react";

export default function BannersOverview({
  bannerTitulo,
  setBannerTitulo,
  bannerSubtitulo,
  setBannerSubtitulo,
  setBannerImagemFile,
  bannerPreview,
  setBannerPreview,
  salvarBanner,
  bannerLoading,
  bannerEditandoId,
  limparFormularioBanner,
  banners = [],
  abrirEdicaoBanner,
  alternarStatusBanner,
  moverBanner,
  excluirBanner,
  input,
  btnPrimary,
  isMobile
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
          border: "1px solid #1f2937"
        }}
      >
        <h2 style={{ margin: 0 }}>Banners</h2>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>
          Gerencie banners promocionais
        </span>
      </div>

      {/* FORM */}
      <div
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 16,
          border: "1px solid #1f2937",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        <h3>{bannerEditandoId ? "Editar banner" : "Novo banner"}</h3>

        <input
          value={bannerTitulo}
          onChange={(e) => setBannerTitulo(e.target.value)}
          placeholder="Título"
          style={input}
        />

        <input
          value={bannerSubtitulo}
          onChange={(e) => setBannerSubtitulo(e.target.value)}
          placeholder="Subtítulo"
          style={input}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setBannerImagemFile(file);

            const reader = new FileReader();
            reader.onload = () => {
              setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
          }}
          style={{
            ...input,
            cursor: "pointer"
          }}
        />

        {bannerPreview && (
          <img
            src={bannerPreview}
            style={{
              width: "100%",
              maxWidth: 420,
              height: 160,
              objectFit: "cover",
              borderRadius: 14,
              marginTop: 10
            }}
          />
        )}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={salvarBanner}
            disabled={bannerLoading}
            style={{
              ...btnPrimary,
              opacity: bannerLoading ? 0.7 : 1
            }}
          >
            {bannerLoading
              ? "Salvando..."
              : bannerEditandoId
              ? "Salvar"
              : "Adicionar"}
          </button>

          {bannerEditandoId && (
            <button
              onClick={limparFormularioBanner}
              style={{
                height: 46,
                padding: "0 16px",
                borderRadius: 12,
                background: "#1f2937",
                color: "#fff",
                border: "none"
              }}
            >
              Cancelar
            </button>
          )}
        </div>
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
        <h3>Banners cadastrados</h3>

        {banners.length === 0 && (
          <div style={{ color: "#9ca3af" }}>
            Nenhum banner cadastrado
          </div>
        )}

        {banners.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12,
              borderRadius: 14,
              border: "1px solid #1f2937",
              background: "#0f172a",
              marginBottom: 10,
              flexWrap: isMobile ? "wrap" : "nowrap"
            }}
          >
            {/* INFO */}
            <div style={{ display: "flex", gap: 10 }}>
              <img
                src={item.imagem}
                style={{
                  width: 100,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 10
                }}
              />

              <div>
                <div style={{ fontWeight: 700 }}>
                  {item.titulo}
                </div>

                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  {item.subtitulo}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: item.ativo ? "#22c55e" : "#ef4444",
                    fontWeight: 700
                  }}
                >
                  {item.ativo ? "Ativo" : "Desativado"}
                </div>
              </div>
            </div>

            {/* AÇÕES */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button onClick={() => abrirEdicaoBanner(item)}>
                <ImagePlus size={16} />
              </button>

              <button onClick={() => alternarStatusBanner(item)}>
                {item.ativo ? <PowerOff size={16} /> : <Power size={16} />}
              </button>

              <button onClick={() => moverBanner(item, -1)}>
                <ChevronUp size={16} />
              </button>

              <button onClick={() => moverBanner(item, 1)}>
                <ChevronDown size={16} />
              </button>

              <button
                onClick={() => excluirBanner(item)}
                style={{
                  background: "#7f1d1d",
                  color: "#fecaca",
                  borderRadius: 8,
                  padding: "4px 8px",
                  border: "none"
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