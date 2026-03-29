import { MercadoPagoConfig, Payment } from "mercadopago";
import { db } from "../../services/firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
export const config = {
  api: {
    bodyParser: true,
  },
};

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {

  try {

    const body = req.body;

    // 🔥 EVENTO DE PAGAMENTO
    if (body.type === "payment") {

      const paymentId = body.data.id;

      const payment = new Payment(client);
      const dados = await payment.get({ id: paymentId });

      // 🔥 SE FOI PAGO
      if (dados.status === "approved") {

        // 🔍 PROCURA PEDIDO NO FIREBASE
        const q = query(
          collection(db, "pedidos"),
          where("paymentId", "==", paymentId)
        );

        const snap = await getDocs(q);

        snap.forEach(async (docSnap) => {
          await updateDoc(docSnap.ref, {
            statusPagamento: "pago"
          });
        });

        console.log("Pagamento confirmado:", paymentId);
      }
    }

    res.status(200).send("OK");

  } catch (e) {
    console.log("ERRO WEBHOOK:", e);
    res.status(500).send("Erro");
  }
}