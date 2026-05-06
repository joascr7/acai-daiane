import { Image } from "lucide-react";

export default function ProdutoImagem({ novaImagem, setNovaImagem }) {
  return (
    <>
      {/* INPUT CUSTOM */}
      <label style={uploadBox}>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const reader = new FileReader();
            reader.onloadend = () => setNovaImagem(reader.result);
            if (e.target.files[0]) {
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />

        <div style={uploadContent}>
          <Image size={20} />
          <span>
            {novaImagem ? "Alterar imagem" : "Selecionar imagem"}
          </span>
        </div>
      </label>

      {/* PREVIEW */}
      {novaImagem && (
        <img src={novaImagem} style={img} />
      )}
    </>
  );
}

const uploadBox = {
  width: "100%",
  padding: 16,
  borderRadius: 12,
  border: "1px dashed #e5e7eb",
  background: "#ffffff",
  cursor: "pointer",
  transition: "0.2s"
};

const uploadContent = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  color: "#6b7280",
  fontSize: 13,
  fontWeight: 600
};

const img = {
  width: "100%",
  height: 160,
  objectFit: "cover",
  borderRadius: 12,
  marginTop: 10,
  border: "1px solid #e5e7eb"
};