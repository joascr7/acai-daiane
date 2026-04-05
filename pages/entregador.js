import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import Head from "next/head"; // 🔥 IMPORTANTE

import ListaPedidos from "@/components/entregador/ListaPedidos";
import PainelEntrega from "@/components/entregador/PainelEntrega";
import LoginEntregador from "@/components/entregador/LoginEntregador";

export default function EntregadorPage() {

  const [user, setUser] = useState(null);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSalvo = localStorage.getItem("entregador");
      if (userSalvo) {
        setUser(JSON.parse(userSalvo));
      }
    }
  }, []);

  if (!user) {
    return <LoginEntregador setUser={setUser} />;
  }

  return (
    <>
      {/* 🔥 HEAD CORRETO */}
      <Head>
        <link rel="manifest" href="/manifest-entregador.json" />
        <meta name="theme-color" content="#000000" />
      </Head>

      {/* 🔥 HEADER */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 65,
        background: "linear-gradient(135deg,#ff2a2a,#ff4d4d)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 15px",
        zIndex: 9999
      }}>

        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#fff"
        }}>
          <div style={{ fontSize: 12 }}>Olá</div>
          <div style={{ fontSize: 17, fontWeight: "800" }}>
            {user?.nome}
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("entregador");
            setUser(null);
            setPedidoSelecionado(null);
          }}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: 12,
            padding: 10,
            cursor: "pointer"
          }}
        >
          <LogOut size={18} color="#fff" />
        </button>
      </div>

      {/* 🔥 CONTEÚDO */}
      <div style={{
        marginTop: 65,
        minHeight: "100dvh",
        background: "#f7f7f7"
      }}>

        {pedidoSelecionado ? (
          <PainelEntrega
            pedido={pedidoSelecionado}
            user={user}
          />
        ) : (
          <ListaPedidos
            user={user}
            setPedidoSelecionado={setPedidoSelecionado}
          />
        )}

      </div>
    </>
  );
}