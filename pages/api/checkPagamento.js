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
  try {
    const { paymentId } = req.query;

    if (!paymentId) {
      return res.status(400).json({
        erro: "paymentId obrigatório"
      });
    }

    console.log("CONSULTANDO MP:", paymentId);

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_CHECKOUT}`
        }
      }
    );

    const data = await response.json();

    console.log("MP:", data);

    if (!response.ok || !data?.id) {
      return res.status(200).json({
        status: "pending"
      });
    }

    const aprovado =
      data.status === "approved" &&
      data.status_detail === "accredited";

    if (aprovado) {

      let pedidoRef = null;

      // tenta pelo external_reference
      if (data.external_reference) {
        const tentativa = db
          .collection("pedidos")
          .doc(String(data.external_reference));

        const snap = await tentativa.get();

        if (snap.exists) {
          pedidoRef = tentativa;
        }
      }

      // fallback → procura pelo paymentId salvo
      if (!pedidoRef) {
        const busca = await db
          .collection("pedidos")
          .where(
            "paymentId",
            "==",
            String(paymentId)
          )
          .limit(1)
          .get();

        if (!busca.empty) {
          pedidoRef = busca.docs[0].ref;
        }
      }

      if (pedidoRef) {

        const atual = await pedidoRef.get();

        if (
          atual.data()?.status !== "preparando"
        ) {

          await pedidoRef.update({
            status: "preparando",
            statusPagamento: "pago",
            paymentStatus: "approved",
            paymentId: String(data.id),
            pagoEm: Date.now()
          });

          console.log("PEDIDO ATUALIZADO");
        }
      } else {
        console.log(
          "NÃO ENCONTROU PEDIDO"
        );
      }
    }

    return res.status(200).json({
      id: data.id,
      status: data.status,
      approved: aprovado,
      externalReference:
        data.external_reference
    });

  } catch (e) {

    console.log(
      "ERRO:",
      e
    );

    return res.status(200).json({
      status: "pending"
    });
  }
}