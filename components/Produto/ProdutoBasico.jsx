export default function ProdutoBasico({
  novoNome,
  setNovoNome,
  categoria,
  setCategoria,
  categorias,
  novoPreco,
  setNovoPreco,

  novoTamanho,
  setNovoTamanho,
  novaDescricaoTamanho,
  setNovaDescricaoTamanho,
  novaDescricao,
  setNovaDescricao
}) {
  return (
    <>
      {/* NOME */}
      <input
        placeholder="Nome"
        value={novoNome}
        onChange={e => setNovoNome(e.target.value)}
        style={input}
      />

      {/* CATEGORIA */}
      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        style={input}
      >
        {categorias.map(c => (
          <option key={c.slug} value={c.slug}>
            {c.nome}
          </option>
        ))}
      </select>

      {/* PREÇO */}
      <input
        placeholder="Preço"
        value={novoPreco}
        onChange={e => setNovoPreco(e.target.value)}
        style={input}
      />

      {/* TAMANHO */}
      <input
        placeholder="Tamanho (ex: 300ml)"
        value={novoTamanho || ""}
        onChange={e => setNovoTamanho(e.target.value)}
        style={input}
      />

      {/* DESCRIÇÃO TAMANHO */}
      <input
        placeholder="Descrição do tamanho (ex: serve 1 pessoa)"
        value={novaDescricaoTamanho || ""}
        onChange={e => setNovaDescricaoTamanho(e.target.value)}
        style={input}
      />

      {/* DESCRIÇÃO PRODUTO */}
      <input
        placeholder="Descrição do produto"
        value={novaDescricao || ""}
        onChange={e => setNovaDescricao(e.target.value)}
        style={input}
      />
    </>
  );
}

const input = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #e5e7eb",   // 🔥 antes dark
  background: "#ffffff",         // 🔥 antes #0f172a
  color: "#111827",              // 🔥 antes branco
  outline: "none",
  fontSize: 13
};