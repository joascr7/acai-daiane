import { Image } from "lucide-react";

export default function ProdutoImagem({ novaImagem, setNovaImagem }) {
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          const reader = new FileReader();
          reader.onloadend = () => setNovaImagem(reader.result);
          reader.readAsDataURL(e.target.files[0]);
        }}
      />

      {novaImagem && (
        <img src={novaImagem} style={img} />
      )}
    </>
  );
}

const img = {
  width: "100%",
  height: 160,
  objectFit: "cover",
  borderRadius: 12
};