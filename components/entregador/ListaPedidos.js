import { useEffect, useState } from "react";
import { db } from "@/services/firebase";

import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

import { Truck, MapPin } from "lucide-react";

export default function ListaPedidos({ setPedidoSelecionado }) {

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "pedidos"),
      where("status", "==", "preparando"),
      where("entrega.aceito", "==", false)
    );

    const unsub = onSnapshot(q, (snap) => {
      const lista = [];
      snap.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setPedidos(lista);
    });

    return () => unsub();
  }, []);

  function aceitar(pedido) {
    setPedidoSelecionado(pedido);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f2f2f2",
      display: "flex",
      justifyContent: "center"
    }}>

      {/* 🔥 CONTAINER CENTRAL */}
      <div style={{
        width: "100%",
        maxWidth: 420,
        padding: 16
      }}>

        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{
            fontWeight: "800",
            color: "#111",
            marginBottom: 4
          }}>
            Pedidos disponíveis
          </h2>

          <p style={{
            fontSize: 13,
            color: "#777"
          }}>
            Atualizado em tempo real
          </p>
        </div>

        {/* SEM PEDIDOS */}
        {pedidos.length === 0 && (
          <div style={{
            marginTop: 80,
            textAlign: "center",
            color: "#999"
          }}>
            Nenhum pedido disponível
          </div>
        )}

        {/* LISTA */}
        {pedidos.map((p) => {

          const pixPago =
            p.formaPagamento === "pix" &&
            p.statusPagamento === "pago";

          return (
            <div
              key={p.id}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: 16,
                marginBottom: 14,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
              }}
            >

              {/* TOPO */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8
              }}>
                <strong style={{ fontSize: 15 }}>
                  Pedido #{p.codigo}
                </strong>

                <span style={{
                  background: pixPago ? "#00c853" : "#ff9800",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: "700"
                }}>
                  {pixPago ? "PIX PAGO" : "NA ENTREGA"}
                </span>
              </div>

              {/* CLIENTE */}
              <p style={{
                fontWeight: "700",
                fontSize: 14,
                marginBottom: 4
              }}>
                {p.cliente?.nome}
              </p>

              {/* ENDEREÇO */}
              <p style={{
                fontSize: 13,
                color: "#666",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                <MapPin size={14} />
                {p.cliente?.endereco}, {p.cliente?.numero}
              </p>

              {/* INFO */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12
              }}>
                <span style={{
                  fontSize: 13,
                  color: "#444"
                }}>
                  {p.itens?.length} itens
                </span>

                <span style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: "#ff2a2a"
                }}>
                  R$ {(p.total / 100).toFixed(2)}
                </span>
              </div>

              {/* BOTÃO */}
              <button
                onClick={() => aceitar(p)}
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 14,
                  border: "none",
                  background: "#ff2a2a",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 6px 15px rgba(255,42,42,0.3)",
                  cursor: "pointer"
                }}
              >
                <Truck size={18} />
                Aceitar corrida
              </button>

            </div>
          );
        })}

      </div>
    </div>
  );
}