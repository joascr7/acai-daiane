import { MercadoPagoConfig, Payment } from "mercadopago";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbCliente as db } from "../../services/firebaseDual";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_CHECKOUT
});

export default async function handler(req, res) {
  try {
    console.log("🔥 WEBHOOK CHAMOU");
    console.log("METHOD:", req.method);
    console.log("QUERY:", req.query);
    console.log("BODY:", req.body);

    const paymentId =
      req.query?.["data.id"] ||
      req.query?.id ||
      req.body?.data?.id ||
      req.body?.id ||
      req.body?.resource?.split("/")?.pop();

    console.log("PAYMENT ID:", paymentId);

    if (!paymentId) {
      return res.status(200).json({ ok: true });
    }

    const payment = new Payment(client);

    const result = await payment.get({
      id: String(paymentId)
    });

    console.log("RESULT MP:", result);

    const pedidoId = result.external_reference;
    const status = result.status;

    console.log("PEDIDO ID:", pedidoId);
    console.log("STATUS:", status);

    if (!pedidoId) {
      return res.status(200).json({ ok: true });
    }

    const ref = doc(db, "pedidos", String(pedidoId));

    await updateDoc(ref, {
      paymentStatus: status,
      paymentId: String(paymentId),
      status:
        status === "approved"
          ? "preparando"
          : "aguardando_pagamento_online"
    });

    console.log("🔥 FIREBASE ATUALIZADO");

    return res.status(200).json({ ok: true });

  } catch (e) {
    console.log("ERRO WEBHOOK:", e);
    return res.status(200).json({ ok: true });
  }
}