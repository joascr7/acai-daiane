import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

import ListaPedidos from "@/components/entregador/ListaPedidos";
import PainelEntrega from "@/components/entregador/PainelEntrega";
import LoginEntregador from "@/components/entregador/LoginEntregador";

export default function EntregadorPage() {

  const [user, setUser] = useState(null);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // 🔥 LOGIN PERSISTENTE
  useEffect(() => {
    const userSalvo = localStorage.getItem("entregador");

    if (userSalvo) {
      setUser(JSON.parse(userSalvo));
    }
  }, []);

  // 🔒 NÃO LOGADO
  if (!user) {
    return <LoginEntregador setUser={setUser} />;
  }

  return (
    <>
      {/* 🔥 HEADER PREMIUM */}
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
        zIndex: 9999,
        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)"
      }}>

        {/* 🔥 NOME CENTRAL */}
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#fff"
        }}>
          <div style={{
            fontSize: 12,
            opacity: 0.9
          }}>
            Olá
          </div>

          <div style={{
            fontSize: 17,
            fontWeight: "800",
            letterSpacing: 0.5
          }}>
            {user?.nome}
          </div>
        </div>

        {/* 🔥 BOTÃO LOGOUT */}
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
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            transition: "0.2s"
          }}
        >
          <LogOut size={18} color="#fff" />
        </button>

      </div>

      {/* 🔥 CONTEÚDO */}
      <div style={{
        marginTop: 65,
        minHeight: "100vh",
        background: "#f7f7f7"
      }}>

        {/* 🚚 CORRIDA ATIVA */}
        {pedidoSelecionado ? (
          <PainelEntrega
          pedido={pedidoSelecionado}
          user={user}
          />
        ) : (
          /* 📋 LISTA */
          <ListaPedidos
            user={user}
            setPedidoSelecionado={setPedidoSelecionado}
          />
        )}

      </div>
    </>
  );
}