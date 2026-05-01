export default function NotificacoesOverview({
  usuarios = [],
  produtos = [],
  clienteSelecionado,
  setClienteSelecionado,
  produtoNotificacao,
  setProdutoNotificacao,
  textoNotificacao,
  setTextoNotificacao,
  imagemNotificacao,
  setImagemNotificacao,
  imagemTemp,
  setImagemTemp,
  mostrarCrop,
  setMostrarCrop,
  zoom,
  setZoom,
  crop,
  setCrop,
  setCroppedAreaPixels,
  enviarNotificacao,
  notificacoesAdmin = [],
  removerNotificacao,
  input,
  btnPrimary,
  btnSecondary,
  isMobile
}) {
  return (
    <div style={{
      marginTop: 16,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      color: "#fff"
    }}>

      {/* HEADER */}
      <div style={{
        background: "#111827",
        borderRadius: 18,
        padding: 18,
        border: "1px solid #1f2937"
      }}>
        <h2 style={{ margin: 0 }}>Notificações</h2>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>
          Envie avisos para seus clientes
        </span>
      </div>

      {/* FORM */}
      <div style={{
        background: "#111827",
        borderRadius: 18,
        padding: 16,
        border: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}>

        <h3>Nova notificação</h3>

        <select
          value={clienteSelecionado || ""}
          onChange={(e) => setClienteSelecionado(e.target.value)}
          style={input}
        >
          <option value="">Enviar para TODOS</option>
          {usuarios.map(u => (
            <option key={u.uid} value={u.uid}>
              {u.clienteNome || u.clienteEmail}
            </option>
          ))}
        </select>

        <select
          value={produtoNotificacao}
          onChange={(e) => setProdutoNotificacao(e.target.value)}
          style={input}
        >
          <option value="">Produto (opcional)</option>
          {produtos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <input
          placeholder="Mensagem..."
          value={textoNotificacao}
          onChange={(e) => setTextoNotificacao(e.target.value)}
          style={input}
        />

        {/* PREVIEW */}
        {imagemNotificacao && (
          <img
            src={imagemNotificacao}
            style={{
              width: "100%",
              maxWidth: 280,
              borderRadius: 12
            }}
          />
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={enviarNotificacao} style={btnPrimary}>
            Enviar
          </button>

          <button
            onClick={() => {
              setTextoNotificacao("");
              setImagemNotificacao("");
              setProdutoNotificacao("");
              setClienteSelecionado("");
            }}
            style={btnSecondary}
          >
            Limpar
          </button>
        </div>
      </div>

      {/* HISTÓRICO */}
      <div style={{
        background: "#111827",
        borderRadius: 18,
        padding: 16,
        border: "1px solid #1f2937"
      }}>
        <h3>Histórico</h3>

        {notificacoesAdmin.length === 0 && (
          <div style={{ color: "#9ca3af" }}>
            Nenhuma notificação
          </div>
        )}

        {notificacoesAdmin.map(n => (
          <div
            key={n.id}
            style={{
              background: "#0f172a",
              padding: 12,
              borderRadius: 12,
              marginBottom: 10,
              border: "1px solid #1f2937"
            }}
          >
            <div style={{ fontWeight: 700 }}>
              {n.texto || "Sem texto"}
            </div>

            {n.imagem && (
              <img
                src={n.imagem}
                style={{
                  width: "100%",
                  maxWidth: 260,
                  marginTop: 8,
                  borderRadius: 10
                }}
              />
            )}

            <div style={{
              fontSize: 12,
              color: "#9ca3af",
              marginTop: 6
            }}>
              {n.para === "todos"
                ? "Todos os clientes"
                : "Cliente específico"}
            </div>

            <button
              onClick={() => removerNotificacao(n.id)}
              style={{
                marginTop: 8,
                background: "#7f1d1d",
                color: "#fecaca",
                border: "none",
                borderRadius: 8,
                padding: "4px 8px"
              }}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}