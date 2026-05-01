export default function ProdutoBasico({
  novoNome,
  setNovoNome,
  categoria,
  setCategoria,
  categorias,
  novoPreco,
  setNovoPreco,

  // 🔥 NOMES CORRETOS (IGUAL salvarProduto)
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

      {/* 🔥 TAMANHO */}
      <input
        placeholder="Tamanho (ex: 300ml)"
        value={novoTamanho || ""}
        onChange={e => setNovoTamanho(e.target.value)}
        style={input}
      />

      {/* 🔥 DESCRIÇÃO DO TAMANHO */}
      <input
        placeholder="Descrição do tamanho (ex: serve 1 pessoa)"
        value={novaDescricaoTamanho || ""}
        onChange={e => setNovaDescricaoTamanho(e.target.value)}
        style={input}
      />

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
  border: "1px solid #1f2937",
  background: "#0f172a",
  color: "#fff",
  outline: "none"
};