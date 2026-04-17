import { MercadoPagoConfig, Payment } from "mercadopago";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbCliente as db } from "../../services/firebaseDual";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_CHECKOUT
});

export default async function handler(req, res) {
  try {
    console.log("WEBHOOK QUERY:", req.query);
    console.log("WEBHOOK BODY:", req.body);

    const paymentId =
      req.query?.["data.id"] ||
      req.query?.id ||
      req.body?.data?.id ||
      req.body?.id;

    const type =
      req.query?.type ||
      req.query?.topic ||
      req.body?.type ||
      req.body?.topic ||
      null;

    if (!paymentId) {
      console.log("SEM PAYMENT ID");
      return res.status(200).json({ ok: true });
    }

    if (type && type !== "payment") {
      console.log("TIPO IGNORADO:", type);
      return res.status(200).json({ ok: true });
    }

    const payment = new Payment(client);

    const result = await payment.get({
      id: String(paymentId)
    });

    console.log("PAYMENT RESULT:", result);

    const pedidoId = result?.external_reference;
    const status = result?.status;

    if (!pedidoId) {
      console.log("SEM PEDIDO ID NO PAYMENT");
      return res.status(200).json({ ok: true });
    }

    const pedidoRef = doc(db, "pedidos", String(pedidoId));
    const pedidoSnap = await getDoc(pedidoRef);

    if (!pedidoSnap.exists()) {
      console.log("PEDIDO NÃO EXISTE:", pedidoId);
      return res.status(200).json({ ok: true });
    }

    if (status === "approved") {
      await updateDoc(pedidoRef, {
        status: "preparando",
        paymentStatus: "approved",
        paymentId: String(paymentId),
        formaPagamento: "cartao_online",
        pagoEm: Date.now()
      });

      console.log("PEDIDO APROVADO:", pedidoId);
    } else if (status === "pending" || status === "in_process") {
      await updateDoc(pedidoRef, {
        status: "aguardando_pagamento_online",
        paymentStatus: status,
        paymentId: String(paymentId)
      });

      console.log("PEDIDO PENDENTE:", pedidoId);
    } else if (
      status === "rejected" ||
      status === "cancelled" ||
      status === "refunded" ||
      status === "charged_back"
    ) {
      await updateDoc(pedidoRef, {
        status: "pagamento_recusado",
        paymentStatus: status,
        paymentId: String(paymentId)
      });

      console.log("PEDIDO RECUSADO:", pedidoId);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.log("ERRO WEBHOOK CHECKOUT:", e);
    return res.status(200).json({ ok: true });
  }
}