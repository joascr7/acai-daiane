import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    const { total } = req.body;

    const payment = new Payment(client);

    const response = await payment.create({
      body: {
        transaction_amount: Number(total),
        description: "Pedido Açaí",
        payment_method_id: "pix",
        payer: {
          email: "cliente@email.com",
        },
      },
    });

    const dados = response;

    return res.status(200).json({
      qr_code: dados.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        dados.point_of_interaction.transaction_data.qr_code_base64,
      payment_id: dados.id,
    });

  } catch (e) {
    console.log("ERRO PIX:", e);
    return res.status(500).json({ erro: "Erro ao gerar Pix" });
  }
}