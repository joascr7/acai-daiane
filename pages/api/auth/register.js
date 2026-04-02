import { dbAdmin } from "@/services/firebaseAdmin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método inválido" });
  }

  try {
    let { nome, cpf, telefone, email, senha } = req.body;

    // 🔥 NORMALIZAÇÃO (ESSENCIAL)
    if (!nome || !cpf || !email || !senha) {
      return res.status(400).json({ erro: "Dados incompletos" });
    }

    cpf = cpf.replace(/\D/g, ""); // 🔥 remove máscara
    email = email.trim().toLowerCase();

    const ref = dbAdmin.collection("entregadores");

    // 🔒 VERIFICA CPF
    const cpfSnap = await ref.where("cpf", "==", cpf).get();

    if (!cpfSnap.empty) {
      return res.status(400).json({ erro: "CPF já cadastrado" });
    }

    // 🔒 VERIFICA EMAIL
    const emailSnap = await ref.where("email", "==", email).get();

    if (!emailSnap.empty) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    // 🔐 CRIPTOGRAFIA
    const senhaHash = await bcrypt.hash(senha, 10);

    // 💾 SALVA
    await ref.add({
      nome,
      cpf, // 🔥 sempre limpo
      telefone: telefone || "",
      email,
      senha: senhaHash,
      ativo: true,
      criadoEm: new Date().toISOString()
    });

    return res.status(200).json({ ok: true });

  } catch (e) {
    console.log("ERRO REGISTER:", e);

    return res.status(500).json({
      erro: e.message || "Erro interno"
    });
  }
}