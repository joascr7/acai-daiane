import { dbCliente as dbAdmin } from "../../services/firebaseDual";

export default async function handler(req, res) {
  try {
    console.log("🔥 WEBHOOK RECEBIDO");

    // 🔥 aceita GET (teste) e POST (real)
    if (req.method !== "POST") {
      return res.status(200).json({ ok: true });
    }

    const paymentId =
      req.body?.data?.id ||
      req.query?.["data.id"];

    console.log("PAYMENT ID:", paymentId);

    if (!paymentId) {
      return res.status(200).json({ ok: true });
    }

    // 🔥 consulta Mercado Pago
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const pagamento = await response.json();

    console.log("STATUS:", pagamento.status);
    console.log("DETAIL:", pagamento.status_detail);

    // 🔥 IGNORA TUDO QUE NÃO FOR PIX PAGO REAL
    if (
      pagamento.status !== "approved" ||
      pagamento.status_detail !== "accredited" ||
      pagamento.payment_method_id !== "pix"
    ) {
      console.log("⏳ IGNORADO (não pago ainda)");
      return res.status(200).json({ ok: true });
    }

    const pedidoId = pagamento.external_reference;

    if (!pedidoId) {
      console.log("❌ Sem external_reference");
      return res.status(200).json({ ok: true });
    }

    const ref = dbAdmin.collection("pedidos").doc(String(pedidoId));

    const snap = await ref.get();

    if (!snap.exists) {
      console.log("❌ Pedido não encontrado");
      return res.status(200).json({ ok: true });
    }

    const pedido = snap.data();

    // 🔥 evita duplicar
    if (pedido.statusPagamento === "pago") {
      console.log("⚠️ Já estava pago");
      return res.status(200).json({ ok: true });
    }

    await ref.update({
      statusPagamento: "pago",
      status: "preparando",
      paymentId: String(paymentId),
      dataPagamento: new Date().toISOString()
    });

    console.log("✅ PAGAMENTO CONFIRMADO");

    return res.status(200).json({ ok: true });

  } catch (e) {
    console.log("🔥 ERRO WEBHOOK:", e);

    // 🔥 IMPORTANTE: sempre retorna 200
    return res.status(200).json({ ok: false });
  }
}