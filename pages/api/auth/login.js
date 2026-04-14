import { dbCliente as dbAdmin } from "@/services/firebaseDual"; 
import bcrypt from "bcryptjs";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método inválido" });
  }

  try {
    const { email, senha } = req.body;

    const snap = await dbAdmin
      .collection("entregadores")
      .where("email", "==", email)
      .get();

    if (snap.empty) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const doc = snap.docs[0];
    const user = doc.data();

    // 🔐 COMPARA HASH
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(400).json({ erro: "Senha incorreta" });
    }

    return res.status(200).json({
      id: doc.id,
      nome: user.nome,
      email: user.email
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ erro: "Erro interno" });
  }
}