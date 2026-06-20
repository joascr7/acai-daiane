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

    if (
      typeof window ===
      "undefined"
    ) return;

    let id =
      new URLSearchParams(
        window.location.search
      ).get("id");

    if (!id) {
      id =
        localStorage.getItem(
          "pedidoAtual"
        );
    }

    setPedidoId(id || "");

    if (!id) {

      setErro(
        "Pedido não encontrado"
      );

      return;

    }

    localStorage.setItem(
      "pedidoAtual",
      String(id)
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

            setPedido(null);

            setErro(
              "Pedido não existe"
            );

            return;

          }

          setErro("");

          setPedido({
            id: snap.id,
            ...snap.data()
          });

        },

        (e) => {

          console.log(
            e
          );

          setErro(
            "Erro ao carregar pedido"
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
          minHeight:
            "100vh",
          background:
            "#000",
          color:
            "#fff",
          padding:
            24
        }}
      >

        <h2>
          Pedido
        </h2>

        <p>
          {erro}
        </p>

        <p>
          ID:
        </p>

        <strong>
          {pedidoId || "-"}
        </strong>

      </div>

    );

  }

  if (!pedido) {

    return (

      <div
        style={{
          minHeight:
            "100vh",
          background:
            "#000",
          color:
            "#fff",
          padding:
            24
        }}
      >

        Carregando pedido...

      </div>

    );

  }

  return (

<div
style={{
minHeight:"100vh",
background:"#000",
padding:20,
color:"#fff"
}}
>

<div
style={{
background:"#111",
padding:24,
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
borderRadius:16
}}
>

⏳
Aguardando pagamento

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
borderRadius:16
}}
>

✅
Pagamento confirmado

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
borderRadius:16
}}
>

🚚
Pedido saiu

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
borderRadius:16
}}
>

🎉
Pedido entregue

</div>

)
}

</div>

</div>

);

}