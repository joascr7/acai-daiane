import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {

    const { total, pedidoId } = req.body;

    // 🔥 VALIDAÇÕES
    if (!total || total <= 0) {
      return res.status(400).json({
        erro: "Valor inválido"
      });
    }

    if (!pedidoId) {
      return res.status(400).json({
        erro: "PedidoId obrigatório"
      });
    }

    const payment = new Payment(client);

    const result = await payment.create({
      body: {
        transaction_amount: Number(total),
        description: "Pedido Açaí",
        payment_method_id: "pix",

        // 🔥 ESSENCIAL PARA WEBHOOK
        external_reference: String(pedidoId),

        payer: {
        email: user?.email,
        first_name: user?.nome || "Cliente"
        }
      }
    });

    // 🔥 GARANTE QUE O PIX FOI GERADO
    const qrData = result.point_of_interaction?.transaction_data;

    if (!qrData) {
      return res.status(500).json({
        erro: "Erro ao gerar QR Code"
      });
    }

    return res.status(200).json({
      payment_id: result.id,
      status: result.status,
      qr_code: qrData.qr_code,
      qr_code_base64: qrData.qr_code_base64
    });

  } catch (e) {

    console.log("ERRO PIX COMPLETO:", e);

    return res.status(500).json({
      erro: "Erro ao gerar Pix",
      detalhe: e.message
    });
  }
}