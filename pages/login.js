import { useState } from "react";
import { useRouter } from "next/router";

import { authCliente as auth } from "../services/firebaseDual";
import { db } from "../services/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

export default function Login() {

  const router = useRouter();

  const [modo, setModo] = useState("inicio"); // inicio | login | cadastro
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // 🔥 CPF
  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
  }

  function formatarCPF(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  // 🔥 LOGIN / CADASTRO
  async function entrar() {
    try {
      setLoading(true);

      if (modo === "cadastro") {

        if (!validarCPF(cpf)) {
          alert("CPF inválido");
          return;
        }

        if (senha !== confirmarSenha) {
          alert("Senhas não coincidem");
          return;
        }

        const q = query(
          collection(db, "clientes"),
          where("cpf", "==", cpf)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          alert("CPF já cadastrado");
          return;
        }

        const res = await createUserWithEmailAndPassword(auth, email, senha);
        const user = res.user;

        await setDoc(doc(db, "clientes", user.uid), {
          nome,
          email,
          cpf
        });

        await setDoc(doc(db, "usuarios", user.uid), {
          clienteNome: nome,
          clienteEmail: email,
          clienteCpf: cpf
        });

      } else {

        await signInWithEmailAndPassword(auth, email, senha);

      }

      router.push("/acai");

    } catch (e) {
      console.log(e);
      alert("Erro: " + e.message);
    }

    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100dvh", // 🔥 iOS FIX
      background: "#000",
      display: "flex",
      flexDirection: "column",
      paddingTop: "env(safe-area-inset-top)",
      paddingBottom: "env(safe-area-inset-bottom)"
    }}>

      {/* 🔥 IMAGEM */}
      <div style={{
        flex: 1,
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />

      {/* 🔥 CARD */}
      <div style={{
        background: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        maxHeight: "60vh", // 🔥 teclado não quebra
        overflowY: "auto"
      }}>

        {/* 🔥 INICIO */}
        {modo === "inicio" && (
          <>
            <button onClick={() => setModo("login")} style={btnPrimary}>
              Já tenho uma conta
            </button>

            <button onClick={() => setModo("cadastro")} style={btnSecondary}>
              Criar nova conta
            </button>

            <button onClick={() => router.push("/loginTelefone")} style={btnDark}>
              Entrar com telefone
            </button>
          </>
        )}

        {/* 🔥 LOGIN */}
        {modo === "login" && (
          <>
            <Top voltar={() => setModo("inicio")} titulo="Entrar" />

            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={input}
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              style={input}
            />

            <button onClick={entrar} style={btnPrimary}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </>
        )}

        {/* 🔥 CADASTRO */}
        {modo === "cadastro" && (
          <>
            <Top voltar={() => setModo("inicio")} titulo="Criar conta" />

            <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} style={input} />

            <input placeholder="CPF" value={cpf} onChange={e => setCpf(formatarCPF(e.target.value))} style={input} />

            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={input} />

            <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} style={input} />

            <input type="password" placeholder="Confirmar senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} style={input} />

            <button onClick={entrar} style={btnPrimary}>
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}

/* 🔥 TOPO */
function Top({ voltar, titulo }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
      <button onClick={voltar} style={backBtn}>←</button>
      <h3 style={{ marginLeft: 10 }}>{titulo}</h3>
    </div>
  );
}

/* 🔥 ESTILOS */

const input = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "1px solid #eee",
  background: "#f5f5f5",
  marginBottom: 12,
  fontSize: 16,
  color: "#000"
};

const btnPrimary = {
  width: "100%",
  padding: 16,
  borderRadius: 14,
  border: "none",
  background: "#ea1d2c",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
  marginBottom: 12
};

const btnSecondary = {
  width: "100%",
  padding: 16,
  borderRadius: 14,
  border: "2px solid #ea1d2c",
  background: "#fff",
  color: "#ea1d2c",
  fontWeight: "bold",
  fontSize: 16,
  marginBottom: 12
};

const btnDark = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "none",
  background: "#111",
  color: "#fff"
};

const backBtn = {
  background: "#f2f2f2",
  border: "none",
  borderRadius: "50%",
  width: 40,
  height: 40,
  fontSize: 18
};