import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    const paymentId = String(req.query?.paymentId || "").trim();

    if (!paymentId) {
      return res.status(400).json({ erro: "paymentId obrigatório" });
    }

    if (!process.env.MP_ACCESS_TOKEN_CHECKOUT) {
      return res.status(500).json({
        erro: "MP_ACCESS_TOKEN_CHECKOUT ausente",
      });
    }

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_CHECKOUT}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data?.id) {
      return res.status(200).json({
        status: "pending",
        atualizado: false,
      });
    }

    const aprovado = data.status === "approved";

    // 🔥 REGRA ÚNICA: external_reference = ID do pedido no Firestore
    const pedidoId = String(data.external_reference || "").trim();

    if (!pedidoId) {
      return res.status(200).json({
        status: "pending",
        atualizado: false,
        erro: "sem_external_reference",
      });
    }

    const pedidoRef = db.collection("pedidos").doc(pedidoId);
    const snap = await pedidoRef.get();

    if (!snap.exists) {
      return res.status(200).json({
        status: "pending",
        atualizado: false,
        erro: "pedido_nao_existe",
      });
    }

    let atualizado = false;

    if (aprovado) {
      const pedido = snap.data();

      const jaFinalizado =
        pedido?.status === "preparando" ||
        pedido?.status === "entregue";

      if (!jaFinalizado) {
        await pedidoRef.update({
          status: "preparando",
          statusPagamento: "pago",
          paymentStatus: "approved",
          paymentId: String(data.id),
          pagoEm: Date.now(),
        });

        atualizado = true;
      }
    }

    return res.status(200).json({
      id: data.id,
      status: data.status,
      detail: data.status_detail,
      approved: aprovado,
      atualizado,
      pedidoId,
    });

  } catch (e) {
    return res.status(500).json({
      erro: true,
      mensagem: e.message,
    });
  }
}