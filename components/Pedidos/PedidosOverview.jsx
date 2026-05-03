import PedidoCard from "./PedidoCard";
import { useRef, useState, useEffect } from "react";

export default function PedidosOverview({
  pedidos = [],
  buscaCodigo,
  setBuscaCodigo,
  produtos,
  formatarReal,
  atualizarStatus,
  cancelarPedido,
  isMobile
}) {
  // 🔊 SOM GLOBAL
  const audioRef = useRef(null);
  const [tocando, setTocando] = useState(false);
  const prevQtdRef = useRef(0);

  function pararSom() {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setTocando(false);
  }

  const filtrar = (p) => {
    if (!buscaCodigo) return true;
    return (p.codigo || "")
      .toLowerCase()
      .includes(buscaCodigo.toLowerCase());
  };

  const emAndamento = pedidos.filter(
    (p) =>
      filtrar(p) &&
      p.status !== "entregue" &&
      p.status !== "cancelado"
  );

  const entregues = pedidos.filter(
    (p) => filtrar(p) && p.status === "entregue"
  );

  // 🔥 TOCA SOM SÓ QUANDO CHEGA NOVO PEDIDO
  useEffect(() => {
    if (emAndamento.length > prevQtdRef.current) {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {});
        setTocando(true);
      }
    }

    prevQtdRef.current = emAndamento.length;
  }, [emAndamento.length]);

  return (
    <div style={{ marginTop: 16, color: "#fff" }}>

      {/* 🔊 AUDIO */}
      <audio ref={audioRef} src="/notificacao.mp3" />

      {/* HEADER */}
      <div
        style={{
          background: "#111827",
          padding: 16,
          borderRadius: 16,
          border: "1px solid #1f2937",
          marginBottom: 16
        }}
      >
        <h2>Pedidos</h2>

        <input
          placeholder="Buscar código"
          value={buscaCodigo}
          onChange={(e) => setBuscaCodigo(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1f2937"
          }}
        />
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 16
        }}
      >
        {/* EM ANDAMENTO */}
        <div>
          <h3
            style={{
              color: "#010408",
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 12
            }}
          >
            Em andamento ({emAndamento.length})
          </h3>

          {emAndamento.map((p) => (
            <PedidoCard
              key={p.id}
              p={p}
              produtos={produtos}
              formatarReal={formatarReal}
              atualizarStatus={atualizarStatus}
              cancelarPedido={cancelarPedido}
              pararSom={pararSom}   // 🔥 agora existe
              tocando={tocando}     // 🔥 agora funciona
            />
          ))}
        </div>

        {/* ENTREGUES */}
        <div>
          <h3>Entregues ({entregues.length})</h3>

          {entregues.map((p) => (
            <PedidoCard
              key={p.id}
              p={p}
              produtos={produtos}
              formatarReal={formatarReal}
              atualizarStatus={atualizarStatus}
              cancelarPedido={cancelarPedido}
            />
          ))}
        </div>
      </div>
    </div>
  );
}