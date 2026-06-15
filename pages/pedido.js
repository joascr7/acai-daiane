import { useEffect, useState } from "react";
import { dbCliente as db } from "../services/firebaseDual";
import {
  doc,
  onSnapshot
} from "firebase/firestore";

export default function Pedido() {

  const [pedido, setPedido] =
    useState(null);

  useEffect(() => {

    const id =
      localStorage.getItem(
        "pedidoAtual"
      );

    console.log(
      "ID LOCAL:",
      id
    );

    if (!id) return;

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
            console.log(
              "PEDIDO NÃO EXISTE"
            );
            return;
          }

          const dados = {
            id: snap.id,
            ...snap.data()
          };

          console.log(
            "PEDIDO FIRE:",
            dados
          );

          setPedido(
            dados
          );

        }
      );

    return () =>
      unsub();

  }, []);

  if (!pedido) {
    return (
      <div
        style={{
          padding: 30,
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
color:"#fff"
}}
>

<div
style={{
background:"#111",
padding:20,
borderRadius:16,
marginBottom:20
}}
>

<h2>
Pedido
</h2>

<p>
ID:
<br/>
{pedido.id}
</p>

<p>
Status:
<br/>
{pedido.status}
</p>

<p>
Pagamento:
<br/>
{
pedido.statusPagamento ||
pedido.paymentStatus ||
"sem"
}
</p>

<p>
Total:
<br/>
R$ {
Number(
pedido.total||0
).toFixed(2)
}
</p>

</div>

{
pedido.status==="preparando" &&
<div
style={{
background:"#00a83a",
padding:16,
borderRadius:12
}}
>
Pagamento confirmado
</div>
}

{
pedido.status==="aguardando_pagamento" &&
<div
style={{
background:"#ff9800",
padding:16,
borderRadius:12
}}
>
Aguardando pagamento
</div>
}

</div>

);

}