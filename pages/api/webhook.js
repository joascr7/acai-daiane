// pages/api/webhook.js

export const config = {
  runtime: "nodejs"
};

import { dbAdmin } from "../../services/firebaseAdmin";

export default async function handler(req, res) {
  try {
    console.log("🔥 WEBHOOK RECEBIDO");

    if (req.method !== "POST") {
      return res.status(200).json({ ok: true });
    }

    if (!dbAdmin) {
      console.log("❌ Firebase Admin indisponível");
      return res.status(200).json({ ok: false });
    }

    const paymentId =
      req.body?.data?.id ||
      req.query?.["data.id"];

    console.log("PAYMENT ID:", paymentId);

    if (!paymentId) {
      return res.status(200).json({ ok: true });
    }

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    );

    const pagamento = await response.json();

    console.log("STATUS:", pagamento.status);
    console.log("DETAIL:", pagamento.status_detail);
    console.log("METHOD:", pagamento.payment_method_id);

    // 🔥 APENAS PAGAMENTO APROVADO
    if (pagamento.status !== "approved") {
      console.log("⏳ Ainda não aprovado");

      return res.status(200).json({
        ok: true
      });
    }

    const pedidoId =
      pagamento.external_reference;

    if (!pedidoId) {
      console.log("❌ Sem external_reference");

      return res.status(200).json({
        ok: true
      });
    }

    const ref =
      dbAdmin
        .collection("pedidos")
        .doc(String(pedidoId));

    const snap =
      await ref.get();

    if (!snap.exists) {
      console.log("❌ Pedido não encontrado");

      return res.status(200).json({
        ok: true
      });
    }

    const pedido =
      snap.data();

    // evita duplicação
    if (
      pedido?.statusPagamento === "pago" ||
      pedido?.status === "preparando" ||
      pedido?.status === "entregue"
    ) {
      console.log("⚠️ Pedido já processado");

      return res.status(200).json({
        ok: true
      });
    }

    const novoStatus =
      pedido?.tipoEntrega === "retirada"
        ? "preparando"
        : "preparando";

    await ref.update({
      statusPagamento: "pago",

      status: novoStatus,

      paymentId: String(paymentId),

      formaPagamento:
        pagamento.payment_method_id ||
        pedido?.formaPagamento,

      dataPagamento:
        new Date().toISOString(),

      atualizadoEm:
        Date.now()
    });

    console.log(
      "✅ Pedido liberado:",
      pedidoId
    );

    return res.status(200).json({
      ok: true
    });

  } catch (e) {

    console.log(
      "🔥 ERRO WEBHOOK:",
      e
    );

    return res.status(200).json({
      ok: false
    });
  }
}