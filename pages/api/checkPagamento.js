import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n")
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
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.MP_ACCESS_TOKEN_CHECKOUT}`
        }
      }
    );

    if (!response.ok) {
      console.log(
        "❌ ERRO MP:",
        response.status
      );

      return res.status(200).json({
        status: "pending",
        approved: false
      });
    }

    const data = await response.json();

    console.log(
      "STATUS:",
      data.status
    );

    console.log(
      "PAYMENT:",
      data.id
    );

    if (
      !data?.id ||
      String(data.id) !==
        String(paymentId)
    ) {
      return res.status(200).json({
        status: "pending",
        approved: false
      });
    }

    const pedidoId =
      data.external_reference;

    // 🔥 ATUALIZA FIRESTORE
    if (
      data.status === "approved" &&
      pedidoId
    ) {
      try {

        const pedidoRef =
          db
            .collection("pedidos")
            .doc(
              String(
                pedidoId
              )
            );

        const pedido =
          await pedidoRef.get();

        if (
          pedido.exists
        ) {

          const atual =
            pedido.data();

          if (
            atual.status !==
            "preparando"
          ) {

            await pedidoRef.update({

              status:
                "preparando",

              statusPagamento:
                "pago",

              paymentStatus:
                "approved",

              paymentId:
                String(
                  data.id
                ),

              formaPagamento:
                atual
                  ?.formaPagamento ||
                data
                  ?.payment_method_id,

              pago: true,

              pagoEm:
                Date.now(),

              atualizadoEm:
                Date.now()
            });

            console.log(
              "✅ PEDIDO LIBERADO"
            );
          }
        }

      } catch (err) {

        console.log(
          "ERRO FIRESTORE:",
          err
        );
      }
    }

    return res
      .status(200)
      .json({

        id:
          data.id,

        status:
          data.status,

        paymentStatus:
          data.status,

        paymentMethod:
          data.payment_method_id,

        externalReference:
          pedidoId,

        approved:
          data.status ===
          "approved",

        paid:
          data.status ===
          "approved",

        detail:
          data.status_detail ||

          null
      });

  } catch (e) {

    console.log(
      "ERRO CHECK:",
      e
    );

    return res
      .status(200)
      .json({

        status:
          "pending",

        approved:
          false,

        erro:
          true
      });
  }
}