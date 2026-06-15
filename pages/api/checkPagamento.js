import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, "\n")
    })
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { paymentId } = req.query;

  if (!paymentId) {
    return res.status(400).json({
      erro: "Sem paymentId"
    });
  }

  try {
    console.log("VERIFICANDO PAYMENT:", paymentId);

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_CHECKOUT}`
        }
      }
    );

    if (!response.ok) {
      console.log(
        "ERRO MP:",
        response.status
      );

      return res.status(200).json({
        status: "pending"
      });
    }

    const data = await response.json();

    console.log("MP STATUS:", data?.status);
    console.log("MP DETAIL:", data?.status_detail);
    console.log("MP PAYMENT:", data?.id);
    console.log(
      "MP EXTERNAL:",
      data?.external_reference
    );

    if (
      !data?.id ||
      String(data.id) !== String(paymentId)
    ) {
      return res.status(200).json({
        status: "pending"
      });
    }

    // 🔥 PAGAMENTO APROVADO → ATUALIZA FIRESTORE
    if (
      data.status === "approved" &&
      data.external_reference
    ) {
      const pedidoId =
        String(data.external_reference);

      const ref =
        db.collection("pedidos").doc(pedidoId);

      const snap =
        await ref.get();

      if (!snap.exists) {
        console.log(
          "PEDIDO NÃO ENCONTRADO:",
          pedidoId
        );

        return res.status(200).json({
          id: data.id,
          status: data.status
        });
      }

      const pedido =
        snap.data();

      const statusAtual =
        String(
          pedido?.status || ""
        ).toLowerCase();

      if (
        statusAtual !== "preparando" &&
        statusAtual !== "entregue"
      ) {
        await ref.update({

          // pedido
          status: "preparando",

          // pagamento
          statusPagamento: "pago",
          paymentStatus: "approved",

          paymentId:
            String(data.id),

          pago: true,

          pagoEm:
            Date.now(),

          atualizadoEm:
            Date.now()
        });

        console.log(
          "PEDIDO ATUALIZADO:",
          pedidoId
        );
      } else {
        console.log(
          "PEDIDO JÁ PROCESSADO"
        );
      }
    }

    return res.status(200).json({
      id: data.id,

      status:
        data.status ||

        "pending",

      paymentStatus:
        data.status,

      paymentMethod:
        data.payment_method_id,

      externalReference:
        data.external_reference,

      approved:
        data.status === "approved",

      paid:
        data.status === "approved",

      detail:
        data.status_detail ||

        null
    });

  } catch (e) {

    console.log(
      "ERRO CHECK:",
      e
    );

    return res.status(200).json({

      status:
        "pending",

      erro:
        true
    });
  }
}