import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default async function handler(req, res) {

  try {

    const paymentId = req.query["data.id"];

    if (!paymentId) {
      return res.status(200).send("ok");
    }

    console.log("Webhook recebido:", paymentId);

    // 🔥 CONSULTA STATUS DO PAGAMENTO
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });

    const pagamento = await response.json();

    console.log("Status pagamento:", pagamento.status);

    // 🔥 SE PAGOU
    if (pagamento.status === "approved") {

      const pedidosRef = collection(db, "pedidos");

      const q = query(pedidosRef, where("paymentId", "==", String(paymentId)));

      const snapshot = await getDocs(q);

      snapshot.forEach(async (docItem) => {
        await updateDoc(docItem.ref, {
          statusPagamento: "pago"
        });
      });

      console.log("Pedido atualizado para PAGO");
    }

    return res.status(200).send("ok");

  } catch (e) {
    console.log("Erro webhook:", e);
    return res.status(500).send("erro");
  }
}