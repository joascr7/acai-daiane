export default function ProdutoBasico({
  novoNome,
  setNovoNome,
  categoria,
  setCategoria,
  categorias,
  novoPreco,
  setNovoPreco
}) {
  return (
    <>
      <input placeholder="Nome" value={novoNome} onChange={e => setNovoNome(e.target.value)} style={input} />

      <select value={categoria} onChange={e => setCategoria(e.target.value)} style={input}>
        {categorias.map(c => (
          <option key={c.slug} value={c.slug}>{c.nome}</option>
        ))}
      </select>

      <input placeholder="Preço" value={novoPreco} onChange={e => setNovoPreco(e.target.value)} style={input} />
    </>
  );
}

const input = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #1f2937",
  background: "#0f172a",
  color: "#fff"
};