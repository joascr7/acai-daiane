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
    console.log("🔥 WEBHOOK CHECKOUT");

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
      (
        typeof req.body?.resource === "string"
          ? req.body.resource.split("/").pop()
          : null
      );

    console.log("TYPE:", type);
    console.log("PAYMENT:", paymentId);

    if (!paymentId) {
      console.log("❌ Sem paymentId");
      return res.status(200).json({ ok: true });
    }

    if (type && type !== "payment") {
      console.log("⏭ Evento ignorado:", type);

      return res.status(200).json({
        ok: true
      });
    }

    const payment = new Payment(client);

    let result;

    try {
      result = await payment.get({
        id: String(paymentId)
      });
    } catch (err) {
      console.log("❌ Erro MP:", err);

      return res.status(200).json({
        ok: true
      });
    }

    console.log("RESULT:", result);

    const pedidoId =
      result?.external_reference;

    const status =
      String(
        result?.status || ""
      ).toLowerCase();

    const metodo =
      result?.payment_method_id ||
      null;

    if (!pedidoId) {
      console.log(
        "❌ external_reference vazio"
      );

      return res.status(200).json({
        ok: true
      });
    }

    const pedidoRef =
      adminDb
        .collection("pedidos")
        .doc(String(pedidoId));

    const pedidoSnap =
      await pedidoRef.get();

    if (!pedidoSnap.exists) {

      console.log(
        "❌ Pedido inexistente"
      );

      return res.status(200).json({
        ok: true
      });
    }

    const pedido =
      pedidoSnap.data();

    const statusAtual =
      String(
        pedido?.status || ""
      ).toLowerCase();

    // evita sobrescrever pedido pronto
    if (
      statusAtual === "entregue"
    ) {
      console.log(
        "⏭ Pedido entregue"
      );

      return res.status(200).json({
        ok: true
      });
    }

    // APROVADO
    if (status === "approved") {

      if (
        pedido?.statusPagamento === "pago" ||
        statusAtual === "preparando"
      ) {
        console.log(
          "⚠️ Pedido já pago"
        );

        return res.status(200).json({
          ok: true
        });
      }

      await pedidoRef.update({

        status: "preparando",

        paymentStatus: "approved",

        statusPagamento: "pago",

        paymentId:
          String(paymentId),

        formaPagamento:
          pedido?.formaPagamento ||
          metodo,

        pago: true,

        pagoEm:
          Date.now(),

        atualizadoEm:
          Date.now()
      });

      console.log(
        "✅ PEDIDO LIBERADO:",
        pedidoId
      );
    }

    // PENDENTE
    else if (
      status === "pending" ||
      status === "in_process"
    ) {

      await pedidoRef.update({

        status:
          pedido?.formaPagamento ===
          "cartao_online"
            ? "aguardando_pagamento_online"
            : "aguardando_pagamento_pix",

        paymentStatus:
          status,

        paymentId:
          String(paymentId),

        atualizadoEm:
          Date.now()
      });

      console.log(
        "⏳ AGUARDANDO:",
        pedidoId
      );
    }

    // RECUSADO
    else if (
      [
        "rejected",
        "cancelled",
        "refunded",
        "charged_back"
      ].includes(status)
    ) {

      await pedidoRef.update({

        status:
          "pagamento_recusado",

        paymentStatus:
          status,

        paymentId:
          String(paymentId),

        atualizadoEm:
          Date.now()
      });

      console.log(
        "❌ RECUSADO:",
        pedidoId
      );
    }

    // OUTROS
    else {

      await pedidoRef.update({

        paymentStatus:
          status,

        paymentId:
          String(paymentId),

        atualizadoEm:
          Date.now()
      });

      console.log(
        "ℹ️ STATUS:",
        status
      );
    }

    return res
      .status(200)
      .json({
        ok: true
      });

  } catch (e) {

    console.log(
      "🔥 ERRO:",
      e
    );

    return res
      .status(200)
      .json({
        ok: false
      });
  }
}