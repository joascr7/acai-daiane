import { useEffect, useState } from "react";
import { dbCliente as db } from "../services/firebaseDual";
import {
  doc,
  onSnapshot
} from "firebase/firestore";

export default function Pedido() {

  const [pedido, setPedido] =
    useState(null);

  const [erro, setErro] =
    useState("");

  const [pedidoId, setPedidoId] =
    useState("");

  useEffect(() => {

    const queryId =
      typeof window !== "undefined"
        ? new URLSearchParams(
            window.location.search
          ).get("id")
        : null;

    const localId =
      typeof window !== "undefined"
        ? localStorage.getItem(
            "pedidoAtual"
          )
        : null;

    const id =
      queryId ||
      localId;

    setPedidoId(id || "");

    if (!id) {
      setErro(
        "Pedido não encontrado"
      );
      return;
    }

    localStorage.setItem(
      "pedidoAtual",
      id
    );

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

          if (!snap.exists()) {

            setErro(
              "Pedido não existe"
            );

            return;
          }

          setPedido({
            id: snap.id,
            ...snap.data()
          });

          setErro("");

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
          color: "#fff"
        }}
      >

        <h2>
          Erro
        </h2>

        <p>
          {erro}
        </p>

        <p>
          ID:
          <br />
          {pedidoId}
        </p>

      </div>
    );
  }

  if (!pedido) {
    return (
      <div
        style={{
          padding: 20,
          color: "#fff"
        }}
      >
        Carregando pedido...
      </div>
    );
  }

  return (

<div
style={{
padding:20,
background:"#000",
minHeight:"100vh",
color:"#fff"
}}
>

<div
style={{
background:"#111",
padding:20,
borderRadius:20
}}
>

<h1>
📦 Pedido
</h1>

<p>
ID
<br/>
<strong>
{pedido.id}
</strong>
</p>

<p>
Status
<br/>
<strong>
{pedido.status}
</strong>
</p>

<p>
Pagamento
<br/>
<strong>
{
pedido.statusPagamento ||
pedido.paymentStatus ||
"aguardando"
}
</strong>
</p>

<p>
Total
<br/>
<strong>
R$
{
Number(
pedido.total || 0
).toFixed(2)
}
</strong>
</p>

</div>

<div
style={{
marginTop:20
}}
>

{
pedido.status ===
"aguardando_pagamento" && (

<div
style={{
background:"#ff9800",
padding:16,
borderRadius:12
}}
>
⏳ Aguardando pagamento
</div>

)
}

{
pedido.status ===
"preparando" && (

<div
style={{
background:"#00a83a",
padding:16,
borderRadius:12
}}
>
✅ Pagamento confirmado
</div>

)
}

{
pedido.status ===
"saiu" && (

<div
style={{
background:"#2196f3",
padding:16,
borderRadius:12
}}
>
🚚 Pedido saiu
</div>

)
}

{
pedido.status ===
"entregue" && (

<div
style={{
background:"#00c853",
padding:16,
borderRadius:12
}}
>
🎉 Entregue
</div>

)
}

</div>

</div>

);

}