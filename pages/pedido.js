import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot
} from "firebase/firestore";
import {
  dbCliente as db
} from "../services/firebaseDual";
export default function Pedido() {
  const [pedido, setPedido] =
    useState(null);
  const [pedidoId, setPedidoId] =
    useState("");
  const [erro, setErro] =
    useState("");
  useEffect(() => {
    const id =
      localStorage.getItem(
        "pedidoAtual"
      );
    setPedidoId(id || "");
    if (!id) {
      setErro(
        "Nenhum pedido salvo"
      );
      return;
    }
    const ref =
      doc(
        db,
        "pedidos",
        String(id)
      );
    const unsub =
      onSnapshot(
        ref,
        (snap) => {
          if (
            !snap.exists()
          ) {
            setErro(
              "Pedido não encontrado"
            );
            return;
          }
          const dados = {
            id:
              snap.id,
            ...snap.data()
          };
          console.log(
            "PEDIDO:",
            dados
          );
          setPedido(
            dados
          );
        },
        (e) => {
          setErro(
            e.message
          );
        }
      );
    return () =>
      unsub();
  }, []);
  if (erro) {
    return (
      <div
        style={{
          padding: 20,
          color:
            "#fff"
        }}
      >
        <h2>
          Erro
        </h2>
        <p>
          {erro}
        </p>
        <p>
          Pedido:
          <br />
          <strong>
            {pedidoId}
          </strong>
        </p>
      </div>
    );
  }
  if (!pedido) {
    return (
      <div
        style={{
          padding: 20,
          color:
            "#fff"
        }}
      >
        <h2>
          Carregando
        </h2>
        <p>
          Pedido:
          <br />
          <strong>
            {pedidoId}
          </strong>
        </p>
      </div>
    );
  }
  const etapas = [
    "aguardando_pagamento",
    "preparando",
    "saiu",
    "entregue"
  ];
  const nomes = {
    aguardando_pagamento:
      "Aguardando pagamento",
    preparando:
      "Preparando",
    saiu:
      "Saiu",
    entregue:
      "Entregue"
  };
  const cores = {
    aguardando_pagamento:
      "#777",
    preparando:
      "#ff9800",
    saiu:
      "#03a9f4",
    entregue:
      "#00c853"
  };
  const indexAtual =
    etapas.indexOf(
      pedido.status
    );
  return (
    <div
      style={{
        padding: 20,
        color:
          "#fff"
      }}
    >
      <h1>
        Acompanhar Pedido
      </h1>
      <div
        style={{
          background:
            "#151515",
          padding: 14,
          borderRadius:
            14,
          marginBottom:
            20
        }}
      >
        <p>
          ID salvo:
          <br />
          <strong>
            {pedidoId}
          </strong>
        </p>
        <p>
          Documento:
          <br />
          <strong>
            {pedido.id}
          </strong>
        </p>
        <p>
          Status:
          <br />
          <strong>
            {pedido.status}
          </strong>
        </p>
        <p>
          Pagamento:
          <br />
          <strong>
            {pedido.statusPagamento ||
              pedido.statuspagamento ||
              "-"}
          </strong>
        </p>
      </div>
      <div
        style={{
          height: 8,
          background:
            "#222",
          borderRadius:
            999
        }}
      >
        <div
          style={{
            height:
              "100%",
            width:
              `${Math.max(
                0,
                indexAtual + 1
              ) * 25}%`,
            background:
              "#6a00ff",
            transition:
              ".4s",
            borderRadius:
              999
          }}
        />
      </div>
      {etapas.map(
        (
          etapa,
          i
        ) => {
          const ativo =
            i <=
            indexAtual;
          return (
            <div
              key={
                etapa
              }
              style={{
                marginTop:
                  12,
                padding:
                  14,
                borderRadius:
                  12,
                background:
                  ativo
                    ? cores[
                        etapa
                      ]
                    : "#111",
                opacity:
                  ativo
                    ? 1
                    : .4
              }}
            >
              {
                ativo
                  ? "✔"
                  : "⏳"
              }
              {" "}
              {
                nomes[
                  etapa
                ]
              }
            </div>
          );
        }
      )}
      <h2
        style={{
          marginTop:
            24
        }}
      >
        Total:
        {" "}
        R$
        {" "}
        {Number(
          pedido.total ||
            0
        ).toFixed(
          2
        )}
      </h2>
    </div>
  );
}