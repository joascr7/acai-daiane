import { useState, useEffect, useRef } from "react";
import { db } from "@/services/firebase";
import { useRouter } from "next/router";
import { LogOut } from "lucide-react";


import dynamic from "next/dynamic";

const MapaEntrega = dynamic(
  () => import("./MapaEntrega"),
  { ssr: false }
);



import {
  doc,
  updateDoc,
  onSnapshot,
  runTransaction
} from "firebase/firestore";

import {
  MapPin,
  Truck,
  CheckCircle
} from "lucide-react";

export default function PainelEntrega({ pedido, user }) {
  const [pedidoAtual, setPedidoAtual] = useState(
    pedido?.id ? pedido : null
  );
  const [loading, setLoading] = useState(false);
  const watchIdRef = useRef(null);
  const router = useRouter();

  // 🔥 ATUALIZA ESTADO QUANDO RECEBE PEDIDO
  useEffect(() => {
    if (pedido?.id) {
      setPedidoAtual(pedido);
    }
  }, [pedido]);

  // 🔥 TEMPO REAL (CORRIGIDO)
  useEffect(() => {
    if (!pedidoAtual?.id) return;

    const ref = doc(db, "pedidos", pedidoAtual.id);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setPedidoAtual({
          id: snap.id,
          ...snap.data()
        });
      }
    });

    return () => unsub();
  }, [pedidoAtual?.id]);

  // 🔥 RESTAURAR CORRIDA
  useEffect(() => {
    const id = localStorage.getItem("corridaAtiva");

    if (!id) return;

    const ref = doc(db, "pedidos", id);

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      setPedidoAtual({
        id,
        ...snap.data()
      });
    });

    return () => unsub();
  }, []);

  // 🔥 GPS
  function iniciarLocalizacao() {
    if (!navigator.geolocation) return;
    if (watchIdRef.current) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        if (!pedidoAtual?.id) return;

        await updateDoc(doc(db, "pedidos", pedidoAtual.id), {
          "entrega.localizacao": {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        });
      }
    );
  }

  function pararLocalizacao() {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }

  // 🔥 ACEITAR CORRIDA
  async function aceitarCorrida() {
    if (!pedidoAtual?.id) {
      alert("Pedido inválido");
      return;
    }

    const ref = doc(db, "pedidos", pedidoAtual.id);

    try {
      await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(ref);

        if (!snap.exists()) return;

        const dados = snap.data();

        // 🔥 BLOQUEIO PAGAMENTO
        if (dados.status !== "preparando") {
          alert("Pedido ainda não foi pago!");
          return;
        }

        // 🔥 BLOQUEIO DUPLO ENTREGADOR
        if (dados.entrega?.aceito) {
          alert("Pedido já aceito por outro entregador");
          return;
        }

        // 🔥 ACEITA CORRIDA
        transaction.update(ref, {
          "entrega.aceito": true,
          "entrega.entregadorId": user?.id || null,
          status: "saiu"
        });

        localStorage.setItem("corridaAtiva", pedidoAtual.id);
      });

      console.log("CORRIDA ACEITA");

    } catch (e) {
      console.log(e);
      alert("Erro ao aceitar corrida");
    }
  }

  // 🔥 ATUALIZAR STATUS
  async function atualizar(status) {
    if (!pedidoAtual?.id) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, "pedidos", pedidoAtual.id), {
        status,
        "entrega.status": status
      });

      if (status === "entregue") {
        pararLocalizacao();
        localStorage.removeItem("corridaAtiva");
      }

    } catch (e) {
      console.log(e);
      alert("Erro ao atualizar status");
    }

    setLoading(false);
  }

  // 🔥 ROTA
  function abrirRota() {
    if (!pedidoAtual?.cliente) return;

    const endereco = `${pedidoAtual.cliente.endereco}, ${pedidoAtual.cliente.numero}`;
    window.open(`https://www.google.com/maps?q=${encodeURIComponent(endereco)}`);
  }

  const status = pedidoAtual?.status;

 

// func mostra forma de pagamento efetuada
function BadgePagamento({ pedido }) {

  const pago = pedido?.statusPagamento === "pago";
  const pix = pedido?.formaPagamento === "pix";

  let texto = "";
  let cor = "";

  if (pago && pix) {
    texto = "PIX PAGO";
    cor = "#00c853";
  } else if (!pix) {
    texto = "PAGAR NA ENTREGA";
    cor = "#ff9800";
  } else {
    texto = "AGUARDANDO PIX";
    cor = "#999";
  }

  return (
    <div style={{
      background: cor,
      color: "#fff",
      padding: "6px 12px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: "700",
      display: "inline-block",
      marginTop: 8
    }}>
      {texto}
    </div>
  );
}

function logout() {
  localStorage.removeItem("entregador");

  // limpa corrida também
  localStorage.removeItem("corridaAtiva");

  // limpa estado
  setPedidoAtual(null);

  // volta pro login
  router.push("/entregador");
}

return (
  <div style={{
    minHeight: "100vh",
    background: "#f7f7f7",
    display: "flex",
    justifyContent: "center"
  }}>
    <div style={{
      width: "100%",
      maxWidth: 420,
      background: "#fff",
      minHeight: "100vh",
      position: "relative"
    }}>

      {/* 🔥 MAPA + HEADER */}
      <div style={{
        position: "relative",
        height: 260,
        overflow: "hidden"
      }}>
        <MapaEntrega pedido={pedidoAtual} />

        {/* OVERLAY */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)"
        }} />

        {/* HEADER */}
        <div style={{
          position: "absolute",
          top: 15,
          left: 15,
          color: "#fff"
        }}>
          <div style={{
            fontSize: 12,
            opacity: 0.9
          }}>
            Olá, {user?.nome}
          </div>

          <div style={{
            fontSize: 20,
            fontWeight: "800"
          }}>
            Pedido #{pedidoAtual?.codigo}
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: 14,
            padding: 10,
            cursor: "pointer",
            backdropFilter: "blur(5px)"
          }}
        >
          <LogOut size={18} color="#fff" />
        </button>
      </div>

      {/* 🔥 CARD CLIENTE */}
      <div style={{
        marginTop: -50,
        padding: 15
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 20,
          padding: 18,
          boxShadow: "0 15px 40px rgba(0,0,0,0.12)"
        }}>
          <p style={{
            fontWeight: "800",
            fontSize: 16,
            marginBottom: 4
          }}>
            {pedidoAtual?.cliente?.nome}
          </p>

          <p style={{
            color: "#777",
            fontSize: 14,
            marginBottom: 12
          }}>
            {pedidoAtual?.cliente?.endereco}
          </p>

          <BadgePagamento pedido={pedidoAtual} />
        </div>
      </div>

      {/* 🔥 BOTÕES */}
      <div style={{ padding: 15 }}>

        {!pedidoAtual?.entrega?.aceito && (
          <button
            onClick={aceitarCorrida}
            style={btnPrimary(true)}
          >
            <Truck size={18} />
            Aceitar corrida
          </button>
        )}

        {pedidoAtual?.entrega?.aceito && (
          <>
            <button onClick={abrirRota} style={btnDark}>
              <MapPin size={18} />
              Ver rota
            </button>

            <button
              disabled={status !== "preparando"}
              onClick={() => atualizar("saiu")}
              style={btnPrimary(status === "preparando")}
            >
              Saiu para entrega
            </button>

            <button
              disabled={status !== "saiu"}
              onClick={() => atualizar("chegou")}
              style={btnPrimary(status === "saiu")}
            >
              Cheguei
            </button>

            <button
              disabled={status !== "chegou"}
              onClick={async () => {
                await atualizar("entregue");
                setPedidoAtual(null);
              }}
              style={btnPrimary(status === "chegou")}
            >
              Finalizar entrega
            </button>

            <button
              onClick={() => setPedidoAtual(null)}
              style={btnBack}
            >
              Voltar para pedidos
            </button>
          </>
        )}

      </div>

      {loading && (
        <p style={{
          textAlign: "center",
          marginTop: 10,
          color: "#666"
        }}>
          Atualizando...
        </p>
      )}
    </div>
  </div>
);
}

/* 🔥 ESTILOS */

const btnPrimary = (ativo) => ({
  width: "100%",
  padding: 16,
  borderRadius: 16,
  border: "none",
  marginBottom: 10,
  background: ativo
    ? "linear-gradient(135deg,#ff2a2a,#ff4d4d)"
    : "#eee",
  color: ativo ? "#fff" : "#999",
  fontWeight: "800",
  fontSize: 15,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  boxShadow: ativo
    ? "0 10px 25px rgba(255,42,42,0.35)"
    : "none",
  cursor: "pointer"
});

const btnDark = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  border: "none",
  marginBottom: 10,
  background: "#111",
  color: "#fff",
  fontWeight: "800",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  cursor: "pointer"
};

const btnBack = {
  width: "100%",
  padding: 14,
  borderRadius: 12,
  border: "none",
  background: "#ddd",
  color: "#333",
  fontWeight: "600",
  marginTop: 10,
  cursor: "pointer"
};