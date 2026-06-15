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

    const data = await response.json();

    console.log("STATUS:", data.status);
    console.log("EXTERNAL:", data.external_reference);

    if (!data.id) {
      return res.status(200).json({
        status: "pending"
      });
    }

    // 🔥 ATUALIZA FIREBASE AUTOMÁTICO
    if (
      data.status === "approved" &&
      data.external_reference
    ) {
      const ref = db
        .collection("pedidos")
        .doc(String(data.external_reference));

      const snap = await ref.get();

      if (snap.exists) {
        const pedido = snap.data();

        if (
          pedido.status !== "preparando" &&
          pedido.status !== "entregue"
        ) {
          await ref.update({
            status: "preparando",
            statuspagamento: "pago",
            paymentStatus: "approved",
            paymentId: String(data.id),
            pagoEm: Date.now()
          });

          console.log(
            "PEDIDO ATUALIZADO:",
            data.external_reference
          );
        }
      } else {
        console.log(
          "PEDIDO NÃO EXISTE:",
          data.external_reference
        );
      }
    }

    return res.status(200).json({
      id: data.id,
      status: data.status,
      paymentStatus: data.status,
      externalReference:
        data.external_reference,
      approved:
        data.status === "approved",
      paid:
        data.status === "approved"
    });

  } catch (e) {
    console.log(e);

    return res.status(200).json({
      status: "pending"
    });
  }
}