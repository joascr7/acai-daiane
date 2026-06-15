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
  if (req.method !== "GET") {
    return res.status(405).json({
      erro: "Método não permitido"
    });
  }
  try {
    const paymentId =
      String(
        req.query?.paymentId || ""
      ).trim();
    if (!paymentId) {
      return res.status(400).json({
        erro:
          "paymentId obrigatório"
      });
    }
    if (
      !process.env
        .MP_ACCESS_TOKEN_CHECKOUT
    ) {
      return res.status(500).json({
        erro:
          "MP_ACCESS_TOKEN_CHECKOUT ausente"
      });
    }
    console.log(
      "CONSULTANDO MP:",
      paymentId
    );
    const response =
      await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization:
              `Bearer ${process.env.MP_ACCESS_TOKEN_CHECKOUT}`
          }
        }
      );
    const data =
      await response.json();
    console.log(
      "MP RESPONSE:",
      data
    );
    if (
      !response.ok ||
      !data?.id
    ) {
      return res.status(200).json({
        status:
          "pending",
        atualizado:
          false
      });
    }
    const aprovado =
      data.status ===
      "approved";
    let atualizado =
      false;
    let pedidoId =
      data.external_reference ||
      null;
    let pedidoRef =
      null;
    if (pedidoId) {
      const tentativa =
        db
          .collection(
            "pedidos"
          )
          .doc(
            String(
              pedidoId
            )
          );
      const snap =
        await tentativa.get();
      if (snap.exists) {
        pedidoRef =
          tentativa;
      }
    }
    if (!pedidoRef) {
      const busca =
        await db
          .collection(
            "pedidos"
          )
          .where(
            "paymentId",
            "==",
            String(
              paymentId
            )
          )
          .limit(1)
          .get();
      if (
        !busca.empty
      ) {
        pedidoRef =
          busca.docs[0]
            .ref;
        pedidoId =
          busca.docs[0]
            .id;
      }
    }
    if (
      aprovado &&
      pedidoRef
    ) {
      const pedido =
        (
          await pedidoRef.get()
        ).data();
      const statusAtual =
        pedido?.status;
      if (
        statusAtual !==
          "preparando" &&
        statusAtual !==
          "entregue"
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
          pagoEm:
            Date.now()
        });
        atualizado =
          true;
        console.log(
          "PEDIDO ATUALIZADO:",
          pedidoId
        );
      }
    }
    return res
      .status(200)
      .json({
        id:
          data.id,
        paymentId:
          String(
            data.id
          ),
        status:
          data.status,
        detail:
          data.status_detail,
        approved:
          aprovado,
        atualizado,
        externalReference:
          pedidoId
      });
  } catch (e) {
    console.log(
      "ERRO CHECK:",
      e
    );
    return res
      .status(500)
      .json({
        erro:
          true,
        mensagem:
          e.message
      });
  }
}