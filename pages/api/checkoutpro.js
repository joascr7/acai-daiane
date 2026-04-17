import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_CHECKOUT
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido"
    });
  }

  try {
    const { total, pedidoId, nome, email } = req.body;

    const valor = Number(total);

    if (!valor || valor <= 0) {
      return res.status(400).json({
        erro: "Valor inválido"
      });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: `Pedido Açaí da Daiane #${pedidoId}`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: valor
          }
        ],

        external_reference: String(pedidoId),

        payer: {
          email: email || "comprador@email.com",
          first_name: nome || "Cliente"
        },

        back_urls: {
          success: "https://acai-daiane.vercel.app",
          failure: "https://acai-daiane.vercel.app",
          pending: "https://acai-daiane.vercel.app"
        },

        auto_return: "approved",

        notification_url:
          "https://acai-daiane.vercel.app/api/webhook-checkout"
      }
    });

    return res.status(200).json({
      url: result.init_point,
      id: result.id
    });

  } catch (e) {
    console.log(e);

    return res.status(500).json({
      erro: "Erro ao gerar checkout"
    });
  }
}