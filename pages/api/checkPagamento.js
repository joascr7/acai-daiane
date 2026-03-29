export default async function handler(req, res) {

  const { paymentId } = req.query;

  if (!paymentId) {
    return res.status(400).json({ erro: "Sem paymentId" });
  }

  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    console.log("MP STATUS:", data.status);
    console.log("MP ID:", data.id);

    // 🔥 segurança total
    if (!data.id || String(data.id) !== String(paymentId)) {
      return res.status(200).json({
        status: "pending",
        id: null
      });
    }

    return res.status(200).json({
      status: data.status || "pending",
      id: data.id
    });

  } catch (e) {
    console.log("ERRO CHECK:", e);
    return res.status(500).json({ erro: "Erro ao verificar pagamento" });
  }
}