export default async function handler(req, res) {

  const { paymentId } = req.query;

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    return res.status(200).json({
      status: data.status
    });

  } catch (e) {
    return res.status(500).json({ erro: "Erro ao verificar pagamento" });
  }
}