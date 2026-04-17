export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: true, mensagem: "Método não permitido" });
  }

  try {
    const token = process.env.MP_ACCESS_TOKEN_CHECKOUT;

    if (!token) {
      return res.status(500).json({
        erro: true,
        mensagem: "Token do Mercado Pago não encontrado"
      });
    }

    const total = Number(req.body?.total || 0);

    if (!total || total <= 0) {
      return res.status(400).json({
        erro: true,
        mensagem: "Total inválido"
      });
    }

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: [
            {
              title: "Pedido Açaí da Daiane",
              quantity: 1,
              unit_price: total
            }
          ],
          auto_return: "approved",
          back_urls: {
            success: "https://acai-daiane.vercel.app",
            failure: "https://acai-daiane.vercel.app",
            pending: "https://acai-daiane.vercel.app"
          }
        })
      }
    );

    const data = await response.json();

    console.log("MP RESPONSE:", data);

    if (!response.ok) {
      return res.status(500).json({
        erro: true,
        mensagem: data?.message || "Erro ao criar checkout",
        detalhe: data
      });
    }

    return res.status(200).json({
      url: data.init_point
    });
  } catch (error) {
    console.log("ERRO API CHECKOUTPRO:", error);
    return res.status(500).json({
      erro: true,
      mensagem: "Erro interno ao criar checkout"
    });
  }
}