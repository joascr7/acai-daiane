import { MercadoPagoConfig, Payment } from "mercadopago";


const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_CHECKOUT
});

export default async function handler(req, res) {
  try {
    const paymentId =
      req.query?.["data.id"] ||
      req.body?.data?.id ||
      req.body?.id;

    const type =
      req.query?.type ||
      req.body?.type ||
      null;

    if (!paymentId || type !== "payment") {
      return res.status(200).json({ ok: true });
    }

    const payment = new Payment(client);

    const result = await payment.get({
      id: String(paymentId)
    });

    const pedidoId = result?.external_reference;
    const status = result?.status;

    if (!pedidoId) {
      return res.status(200).json({ ok: true });
    }

    const pedidoRef = doc(db, "pedidos", String(pedidoId));
    const pedidoSnap = await getDoc(pedidoRef);

    if (!pedidoSnap.exists()) {
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
    } else if (status === "pending" || status === "in_process") {
      await updateDoc(pedidoRef, {
        status: "aguardando_pagamento_online",
        paymentStatus: status,
        paymentId: String(paymentId)
      });
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
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.log("ERRO WEBHOOK CHECKOUT:", e);
    return res.status(200).json({ ok: true });
  }
}