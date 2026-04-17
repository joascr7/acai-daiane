import { MercadoPagoConfig, Payment } from "mercadopago";
import admin from "firebase-admin";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_CHECKOUT
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n")
    })
  });
}

const adminDb = admin.firestore();

export default async function handler(req, res) {
  try {
    console.log("WEBHOOK METHOD:", req.method);
    console.log("WEBHOOK QUERY:", req.query);
    console.log("WEBHOOK BODY:", req.body);

    const type =
      req.query?.type ||
      req.query?.topic ||
      req.body?.type ||
      req.body?.topic ||
      null;

    const paymentId =
      req.query?.["data.id"] ||
      req.query?.id ||
      req.body?.data?.id ||
      req.body?.id ||
      (typeof req.body?.resource === "string"
        ? req.body.resource.split("/").pop()
        : null);

    if (!paymentId) {
      console.log("SEM PAYMENT ID");
      return res.status(200).json({ ok: true });
    }

    if (type && type !== "payment") {
      console.log("TIPO IGNORADO:", type);
      return res.status(200).json({ ok: true });
    }

    const payment = new Payment(client);

    let result;

    try {
      result = await payment.get({
        id: String(paymentId)
      });
    } catch (err) {
      console.log("ERRO AO BUSCAR PAYMENT NO MP:", err);
      return res.status(200).json({ ok: true });
    }

    console.log("PAYMENT RESULT:", result);

    const pedidoId = result?.external_reference;
    const status = result?.status;

    if (!pedidoId) {
      console.log("SEM PEDIDO ID NO PAYMENT");
      return res.status(200).json({ ok: true });
    }

    const pedidoRef = adminDb.collection("pedidos").doc(String(pedidoId));
    const pedidoSnap = await pedidoRef.get();

    if (!pedidoSnap.exists) {
      console.log("PEDIDO NÃO EXISTE:", pedidoId);
      return res.status(200).json({ ok: true });
    }

    if (status === "approved") {
      await pedidoRef.update({
        status: "preparando",
        paymentStatus: "approved",
        paymentId: String(paymentId),
        formaPagamento: "cartao_online",
        pagoEm: Date.now()
      });

      console.log("PEDIDO APROVADO:", pedidoId);
    } else if (status === "pending" || status === "in_process") {
      await pedidoRef.update({
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
      await pedidoRef.update({
        status: "pagamento_recusado",
        paymentStatus: status,
        paymentId: String(paymentId)
      });

      console.log("PEDIDO RECUSADO:", pedidoId);
    } else {
      await pedidoRef.update({
        paymentStatus: status,
        paymentId: String(paymentId)
      });

      console.log("STATUS NÃO TRATADO, MAS SALVO:", status);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.log("ERRO WEBHOOK CHECKOUT:", e);
    return res.status(200).json({ ok: true });
  }
}