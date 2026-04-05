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


  const inputPremium = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #eee",
  marginBottom: 10,
  fontSize: 14,

  boxSizing: "border-box", // 🔥 CORRIGE OVERFLOW

  outline: "none",
  background: "#fff", // 🔥 FUNDO BRANCO REAL
  color: "#111", // 🔥 TEXTO ESCURO

  WebkitTextFillColor: "#111" // 🔥 iOS BUG FIX
};

const placeholderStyle = {
  color: "#999"
};

const btnPrimary = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(90deg,#ea1d2c,#ff4d4d)",
  color: "#fff",
  fontWeight: "bold",
  marginTop: 10,
  cursor: "pointer",
  boxShadow: "0 6px 20px rgba(234,29,44,0.3)"
};

const btnSecondary = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  marginTop: 10,
  cursor: "pointer"
};

const backBtn = {
  background: "none",
  border: "none",
  fontSize: 20,
  cursor: "pointer"
};

  const router = useRouter();

  const [modo, setModo] = useState("inicio");
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

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
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background: "#000"
  }}>

    {/* 🔥 IMAGEM */}
    <img
      src="/bg.png"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />

    {/* 🔥 OVERLAY */}
    <div style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))"
    }} />

    {/* 🔥 HEADER */}
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "calc(env(safe-area-inset-top) + 12px)",
      paddingLeft: 16,
      paddingRight: 16,
      zIndex: 5
    }}>

      {/* VOLTAR */}
      <div
        onClick={() => setModo("inicio")}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 20,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        ←
      </div>

      <div style={{ width: 44 }} />

    </div>

    {/* 🔥 CARD (BOTTOM SHEET IFOOD) */}
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#fff",
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 20,
      paddingBottom: "calc(20px + env(safe-area-inset-bottom))",
      maxHeight: "78%",
      overflowY: "auto",
      boxShadow: "0 -10px 40px rgba(0,0,0,0.25)",
      animation: "slideUp 0.3s ease"
    }}>

      {/* 🔥 DRAG HANDLE */}
      <div style={{
        width: 40,
        height: 5,
        borderRadius: 10,
        background: "#ddd",
        margin: "0 auto 15px"
      }} />

      {/* 🔥 INICIO */}
      {modo === "inicio" && (
        <>
          <button style={btnPrimary} onClick={() => setModo("login")}>
            Já tenho uma conta
          </button>

          <button style={btnSecondary} onClick={() => setModo("cadastro")}>
            Criar nova conta
          </button>
        </>
      )}

      {/* 🔥 LOGIN */}
      {modo === "login" && (
        <>
          <Top voltar={() => setModo("inicio")} titulo="Entrar" />

          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputPremium} />
          
          <input
          style={inputPremium}
          placeholder="Email"
          />

          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} style={inputPremium} />

          <button onClick={entrar} style={btnPrimary}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </>
      )}

      {/* 🔥 CADASTRO */}
      {modo === "cadastro" && (
        <>
          <Top voltar={() => setModo("inicio")} titulo="Criar conta" />

          <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} style={inputPremium} />
          <input placeholder="CPF" value={cpf} onChange={e => setCpf(formatarCPF(e.target.value))} style={inputPremium} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputPremium} />
          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} style={inputPremium} />
          <input type="password" placeholder="Confirmar senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} style={inputPremium} />

          <button onClick={entrar} style={btnPrimary}>
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </>
      )}

    </div>
  </div>
);
}

function Top({ voltar, titulo }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
      <button onClick={voltar} style={backBtn}>←</button>
      <h3 style={{ marginLeft: 10 }}>{titulo}</h3>
    </div>
  );
}


const input = {
  width: "98%",
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

const backBtn = {
  background: "#f2f2f2",
  border: "none",
  borderRadius: "50%",
  width: 40,
  height: 40,
  fontSize: 18
};

Login.noLayout = true;