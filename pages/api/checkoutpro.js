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
    const {
      total,
      pedidoId,
      nome,
      email,
      cpf
    } = req.body;

    if (!total || Number(total) <= 0) {
      return res.status(400).json({
        erro: "Valor inválido"
      });
    }

    if (!pedidoId) {
      return res.status(400).json({
        erro: "Pedido obrigatório"
      });
    }

    if (!email) {
      return res.status(400).json({
        erro: "Email obrigatório"
      });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        external_reference: String(pedidoId),

        items: [
          {
            title: "Pedido Açaí da Daiane",
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(total)
          }
        ],

        payer: {
          email: email,
          first_name: nome || "Cliente",

          identification: cpf
            ? {
                type: "CPF",
                number: String(cpf).replace(/\D/g, "")
              }
            : undefined
        },

        payment_methods: {
          installments: 12
        },

        back_urls: {
          success: "https://acai-daiane.vercel.app",
          pending: "https://acai-daiane.vercel.app",
          failure: "https://acai-daiane.vercel.app"
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
      erro: "Erro checkout",
      detalhe: e.message
    });
  }
}