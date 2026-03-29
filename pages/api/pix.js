export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {

    const { total } = req.body;

    // 🔥 expiração 30 minutos
    const expiration = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",

        // 🔥 evita conflito (ESSENCIAL)
        "X-Idempotency-Key": `${Date.now()}-${Math.random()}`
      },
      body: JSON.stringify({
        transaction_amount: Number(total),
        description: "Pedido Açaí",

        payment_method_id: "pix",

        date_of_expiration: expiration,

        payer: {
          email: "contatojoasvieira@gmail.com" // 🔥 coloca seu email real
        }
      }),
    });

    const data = await response.json();

    console.log("PIX GERADO:", data);

    if (!response.ok) {
      console.log("ERRO MP:", data);
      return res.status(500).json({ erro: data });
    }

    return res.status(200).json({
      qr_code: data.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
      payment_id: data.id,
    });

  } catch (e) {
    console.log("ERRO GERAL:", e);
    return res.status(500).json({ erro: "Erro ao gerar Pix" });
  }
}