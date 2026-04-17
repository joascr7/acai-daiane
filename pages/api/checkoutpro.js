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
      cpf,
      telefone,
      rua,
      numero,
      cep
    } = req.body;

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
        external_reference: String(pedidoId),

        items: [
          {
            id: String(pedidoId),
            title: "Pedido Açaí da Daiane",
            description: "Pagamento online do pedido",
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(total)
          }
        ],

        payer: {
          email: email || "cliente@email.com",
          first_name: nome || "Cliente",

          identification: cpf
            ? {
                type: "CPF",
                number: String(cpf).replace(/\D/g, "")
              }
            : undefined,

          phone: telefone
            ? {
                area_code: String(telefone)
                  .replace(/\D/g, "")
                  .slice(0, 2),

                number: String(telefone)
                  .replace(/\D/g, "")
                  .slice(2)
              }
            : undefined,

          address: {
            zip_code: cep
              ? String(cep).replace(/\D/g, "")
              : "00000000",

            street_name: rua || "Rua não informada",
            street_number: numero || "0"
          }
        },

        payment_methods: {
          installments: 12,
          excluded_payment_types: [],
          excluded_payment_methods: []
        },

        back_urls: {
          success: "https://acai-daiane.vercel.app",
          pending: "https://acai-daiane.vercel.app",
          failure: "https://acai-daiane.vercel.app"
        },

        auto_return: "approved",

        notification_url:
          "https://acai-daiane.vercel.app/api/webhook-checkout",

        statement_descriptor: "ACAITERIA"
      }
    });

    if (!result?.init_point) {
      return res.status(500).json({
        erro: "Erro ao gerar checkout"
      });
    }

    return res.status(200).json({
      url: result.init_point,
      sandbox_url: result.sandbox_init_point,
      id: result.id
    });

  } catch (e) {
    console.log("ERRO CHECKOUT PRO:", e);

    return res.status(500).json({
      erro: "Erro ao gerar checkout",
      detalhe: e?.message || "Erro interno"
    });
  }
}