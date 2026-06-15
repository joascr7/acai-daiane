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

    console.log("CONSULTANDO MP:", paymentId);

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_CHECKOUT}`,
        },
      }
    );

    const data = await response.json();

    console.log("MP RESPONSE:", data);

    if (!response.ok || !data?.id) {
      return res.status(200).json({
        status: "pending",
        atualizado: false,
      });
    }

    const aprovado = data.status === "approved";
    const externalReference = String(data.external_reference || "").trim();

    let pedidoRef = null;
    let pedidoId = externalReference || null;

    // 🔥 1. PRIORIDADE: external_reference (PIX correto)
    if (externalReference) {
      const ref = db.collection("pedidos").doc(externalReference);
      const snap = await ref.get();

      if (snap.exists) {
        pedidoRef = ref;
      }
    }

    // 🔥 2. FALLBACK: paymentId salvo no pedido
    if (!pedidoRef) {
      const busca = await db
        .collection("pedidos")
        .where("paymentId", "==", String(paymentId))
        .limit(1)
        .get();

      if (!busca.empty) {
        pedidoRef = busca.docs[0].ref;
        pedidoId = busca.docs[0].id;
      }
    }

    let atualizado = false;

    // 🔥 3. UPDATE SE PAGAMENTO APROVADO
    if (aprovado && pedidoRef) {
      const pedidoSnap = await pedidoRef.get();

      if (pedidoSnap.exists) {
        const pedido = pedidoSnap.data();
        const statusAtual = pedido?.status;

        const jaFinalizado =
          statusAtual === "preparando" ||
          statusAtual === "entregue";

        if (!jaFinalizado) {
          await pedidoRef.update({
            status: "preparando",
            statusPagamento: "pago",
            paymentStatus: "approved",
            paymentId: String(data.id),
            external_reference: externalReference,
            pagoEm: Date.now(),
          });

          atualizado = true;

          console.log("PEDIDO ATUALIZADO:", pedidoRef.id);
        }
      }
    }

    return res.status(200).json({
      id: data.id,
      status: data.status,
      detail: data.status_detail,
      approved: aprovado,
      atualizado,
      externalReference,
      pedidoId,
    });
  } catch (e) {
    console.log("ERRO CHECK:", e);

    return res.status(500).json({
      erro: true,
      mensagem: e.message,
    });
  }
}