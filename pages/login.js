import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { authCliente as auth } from "../services/firebaseDual";
import { db } from "../services/firebase";


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";


export default function Login() {

  const router = useRouter();

  const [modoCadastro, setModoCadastro] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [dark, setDark] = useState(false);

  // 🔥 CARREGAR TEMA
  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") setDark(true);
  }, []);

  // 🔥 TOGGLE TEMA
  function toggleTheme() {
    setDark(prev => {
      const novo = !prev;
      localStorage.setItem("tema", novo ? "dark" : "light");
      return novo;
    });
  }

  const formValido = email && senha && (!modoCadastro || (nome && cpf));

  function formatarCPF(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }


  function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  // ❌ bloqueia CPFs iguais (111, 222, etc)
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

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
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

  async function recuperarSenha() {

  if (!email) {
    alert("Digite seu email");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("📩 Email enviado! Verifique sua caixa de entrada.");

  } catch (error) {

    if (error.code === "auth/user-not-found") {
      alert("Usuário não encontrado");
    } else if (error.code === "auth/invalid-email") {
      alert("Email inválido");
    } else {
      alert("Erro ao enviar email");
    }

  }
}

 // 🔥 LOGIN / CADASTRO
  async function entrar() {

    if (!formValido) {
      alert("Preencha corretamente");
      return;
    }

    try {
      setLoading(true);

      if (modoCadastro) {

        if (!validarCPF(cpf)) {
          alert("CPF inválido!");
          return;
        }

        if (senha.length < 6) {
          alert("Senha muito curta");
          return;
        }

        if (senha !== confirmarSenha) {
          alert("Senhas não coincidem");
          return;
        }

        // 🔥 VERIFICAR CPF DUPLICADO
        const q = query(
          collection(db, "clientes"),
          where("cpf", "==", cpf)
        );

        const snapCpf = await getDocs(q);

        if (!snapCpf.empty) {
          alert("CPF já cadastrado!");
          return;
        }

        const res = await createUserWithEmailAndPassword(auth, email, senha);
        const user = res.user;

        // 🔥 SALVA
        await setDoc(doc(db, "clientes", user.uid), {
          nome,
          email,
          cpf
        });

        await setDoc(doc(db, "usuarios", user.uid), {
          clienteNome: nome,
          clienteEmail: email,
          clienteCpf: cpf,
          clienteTelefone: "",
          clienteEndereco: "",
          clienteNumeroCasa: "",
          clienteCep: ""
        });

      } else {

        // 🔥 LOGIN (ERA ISSO QUE FALTAVA)
        await signInWithEmailAndPassword(auth, email, senha);

      }

      // 🔥 REDIRECIONA
      router.push("/acai");

    } catch (e) {

      if (e.code === "auth/wrong-password") {
        alert("Senha incorreta");
      } else if (e.code === "auth/user-not-found") {
        alert("Usuário não encontrado");
      } else if (e.code === "auth/email-already-in-use") {
        alert("Email já cadastrado");
      } else {
        alert("Erro: " + e.message);
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
  className="container"
  style={{
    background: dark
      ? "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('/bg.png')"
      : "linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.9)), url('/bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  }}
>

  <div
    className="content"
    style={{
      backdropFilter: "blur(12px)",
      background: dark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.75)",
      padding: 25,
      borderRadius: 20,
      width: "100%",
      maxWidth: 420,
      color: dark ? "#fff" : "#111",
      boxShadow: "0 0 30px rgba(122,0,255,0.25)"
    }}
  >

    <h1 style={{ textAlign: "center" }}>🍧 Açaí da Daiane</h1>

    <button
      className="themeBtn"
      onClick={toggleTheme}
      style={{
        marginTop: 10,
        width: "100%",
        background: dark ? "#1a1a1a" : "#fff",
        color: dark ? "#fff" : "#111",
        border: "2px solid #8a00ff"
      }}
    >
      {dark ? "☀️ Modo Claro" : "🌙 Modo Dark"}
    </button>

    <div
      className="form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        marginTop: 20
      }}
    >

      {modoCadastro && (
  <>
    <input
      placeholder="Nome"
      value={nome}
      onChange={e => {
        const valor = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
        setNome(valor.charAt(0).toUpperCase() + valor.slice(1));
      }}
      style={{
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#111"
      }}
    />

    <input
      placeholder="CPF"
      value={cpf}
      onChange={e => setCpf(formatarCPF(e.target.value))}
      style={{
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#111"
      }}
    />
  </>
)}

<input
  placeholder="Email"
  value={email}
  onChange={e => setEmail(e.target.value.toLowerCase())}
  style={{
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: dark ? "#111" : "#fff",
    color: dark ? "#fff" : "#111"
  }}
/>

{/* 🔥 SENHA */}
<div style={{ width: "100%" }}>
  <div style={{
    display: "flex",
    alignItems: "center",
    background: dark ? "#111" : "#fff",
    borderRadius: 12,
    padding: "0 10px",
    height: "40%",
  }}>

    <input
      type={mostrarSenha ? "text" : "password"}
      placeholder="Senha"
      value={senha}
      onChange={e => setSenha(e.target.value)}
      style={{
        flex: 1,
        height: "40%",
        border: "none",
        outline: "none",
        background: "transparent",
        color: dark ? "#fff" : "#111",
        fontSize: 16
      }}
    />

    <button
      type="button"
      onClick={() => setMostrarSenha(!mostrarSenha)}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: 18
      }}
    >
      {mostrarSenha ? "🙈" : "👁️"}
    </button>

  </div>
</div>

{/* 🔥 CONFIRMAR SENHA */}
{modoCadastro && (
  <div style={{ width: "100%" }}>
    <div style={{
      display: "flex",
      alignItems: "center",
      background: dark ? "#111" : "#fff",
      borderRadius: 12,
      padding: "0 10px",
      height: 50,
      gap: 8
    }}>

      <input
        type={mostrarSenha ? "text" : "password"}
        placeholder="Confirmar senha" // 🔥 corrigido
        value={confirmarSenha}        // 🔥 corrigido
        onChange={e => setConfirmarSenha(e.target.value)} // 🔥 corrigido
        style={{
          flex: 1,
          height: "40%",
          border: "none",
          outline: "none",
          background: "transparent",
          color: dark ? "#fff" : "#111",
          fontSize: 16
        }}
      />


    </div>
  </div>
      )}

      <button
        className="btn"
        onClick={entrar}
        style={{
          background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
          color: "#fff",
          fontWeight: "bold"
        }}
      >
        {loading ? "Carregando..." : modoCadastro ? "Cadastrar" : "Entrar"}
      </button>

      {!modoCadastro && (
        <button
          className="link"
          onClick={recuperarSenha}
          style={{
            background: "transparent",
            color: dark ? "#bbb" : "#333"
          }}
        >
          🔑 Esqueci minha senha
        </button>
      )}

      <button
        className="link strong"
        onClick={() => setModoCadastro(!modoCadastro)}
        style={{
          background: "transparent",
          color: dark ? "#fff" : "#000"
        }}
      >
        {modoCadastro ? "Já tenho conta" : "Criar conta"}
      </button>

    </div>
      </div>
 
      <style jsx>{`
        .container {
  min-height: 100vh;

  background: ${dark
    ? `
      linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
      url('/bg.png')
    `
    : `
      linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.9)),
      url('/bg.png')
    `};

  background-size: cover;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;
}

        .content {
          width: 420px;
          padding: 25px;
          color: ${dark ? '#fff' : '#111'};
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }

        input {
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: ${dark ? '#111' : '#fff'};
          color: ${dark ? '#fff' : '#111'};
        }

        input:focus {
          box-shadow: 0 0 12px #8a00ff;
        }

        .btn {
          background: linear-gradient(270deg,#5a00ff,#8a00ff,#5a00ff);
          background-size: 400% 400%;
          animation: neon 4s ease infinite;
        }

        @keyframes neon {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }

        button {
          padding: 14px;
          border-radius: 14px;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }

        button:hover {
          box-shadow: 0 0 20px #8a00ff;
        }

        button:active {
          transform: scale(0.95);
        }

        .themeBtn {
          background: ${dark ? '#1a1a1a' : '#fff'};
          color: ${dark ? '#fff' : '#111'};
          border: 2px solid #8a00ff;
          margin-top: 10px;
        }

        .themeBtn:hover {
          box-shadow: 0 0 15px #8a00ff;
        }

        .link {
          background: transparent;
          color: ${dark ? '#bbb' : '#333'};
        }

        .strong {
          color: ${dark ? '#fff' : '#000'};
        }
      `}</style>

    </div>
  );
}