import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey:
        process.env.FB_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        )
    })
  });
}

const db = admin.firestore();

export default async function handler(
  req,
  res
) {
  const { paymentId } =
    req.query;

  if (!paymentId) {
    return res.status(400).json({
      erro: "Sem paymentId"
    });
  }

  try {
    console.log(
      "CONSULTANDO:",
      paymentId
    );

    // 🔥 PIX usa MP_ACCESS_TOKEN
    const response =
      await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization:
              `Bearer ${process.env.MP_ACCESS_TOKEN}`
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

    const data =
      await response.json();

    console.log(
      "STATUS:",
      data.status
    );

    console.log(
      "REFERENCE:",
      data.external_reference
    );

    if (!data?.id) {
      return res.status(200).json({
        status: "pending"
      });
    }

    // 🔥 PAGAMENTO APROVADO
    if (
      data.status ===
        "approved" &&
      data.external_reference
    ) {
      const pedidoId =
        String(
          data.external_reference
        );

      const ref =
        db
          .collection(
            "pedidos"
          )
          .doc(
            pedidoId
          );

      const snap =
        await ref.get();

      if (snap.exists) {
        const pedido =
          snap.data();

        if (
          pedido.status !==
            "preparando" &&
          pedido.status !==
            "entregue"
        ) {
          await ref.update({

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

            pago:
              true,

            pagoEm:
              Date.now(),

            atualizadoEm:
              Date.now()
          });

          console.log(
            "PEDIDO LIBERADO"
          );
        }
      }
    }

    return res.status(200).json({

      id:
        data.id,

      status:
        data.status,

      approved:
        data.status ===
        "approved",

      paid:
        data.status ===
        "approved",

      externalReference:
        data.external_reference,

      paymentMethod:
        data.payment_method_id
    });

  } catch (e) {

    console.log(
      "ERRO:",
      e
    );

    return res.status(200).json({
      status:
        "pending"
    });
  }
}