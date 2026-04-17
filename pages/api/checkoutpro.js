import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_CHECKOUT
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    const { total, pedidoId, nome, email } = req.body;

    if (!total || Number(total) <= 0) {
      return res.status(400).json({
        erro: "Valor inválido"
      });
    }

    if (!pedidoId) {
      return res.status(400).json({
        erro: "PedidoId obrigatório"
      });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: String(pedidoId),
            title: `Pedido Açaí da Daiane #${String(pedidoId).slice(-6)}`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(total)
          }
        ],
        external_reference: String(pedidoId),
        payer: {
          email: email || "cliente@email.com",
          name: nome || "Cliente"
        },
        back_urls: {
          success: "https://acai-daiane.vercel.app",
          failure: "https://acai-daiane.vercel.app",
          pending: "https://acai-daiane.vercel.app"
        },
        auto_return: "approved",
        notification_url: "https://acai-daiane.vercel.app/api/webhook-checkout",
        statement_descriptor: "ACAIDADAIANE"
      }
    });

    if (!result?.init_point) {
      return res.status(500).json({
        erro: "Erro ao gerar checkout"
      });
    }

    return res.status(200).json({
      url: result.init_point,
      id: result.id
    });
  } catch (e) {
    console.log("ERRO CHECKOUT PRO COMPLETO:", e);

    return res.status(500).json({
      erro: "Erro ao gerar checkout",
      detalhe: e?.message || "Erro interno"
    });
  }
}