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
      "MP STATUS:",
      data.status
    );

    console.log(
      "MP PAYMENT:",
      data.id
    );

    if (
      !data?.id ||
      String(data.id) !==
        String(paymentId)
    ) {
      return res.status(200).json({
        status: "pending",
        id: null
      });
    }

    return res.status(200).json({

      id:
        data.id,

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

    return res.status(200).json({

      status:
        "pending",

      erro:
        true
    });
  }
}