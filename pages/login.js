import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { authCliente as auth, dbCliente as db } from "../services/firebaseDual";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const larguraApp = isMobile ? 420 : 1200;

  const inputPremium = {
    width: "100%",
    padding: "16px 18px",
    borderRadius: 18,
    border: "1px solid #ededed",
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 500,
    boxSizing: "border-box",
    outline: "none",
    background: "#f7f7f7",
    color: "#111",
    WebkitTextFillColor: "#111",
    transition: "all 0.2s ease"
  };

  const btnPrimary = {
    width: "100%",
    height: 54,
    borderRadius: 18,
    border: "none",
    background: "#ea1d2c",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    marginTop: 14,
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(234,29,44,0.28)",
    transition: "all 0.2s ease"
  };

  const btnSecondary = {
    width: "100%",
    height: 54,
    borderRadius: 18,
    border: "1px solid #e5e5e5",
    background: "#fff",
    color: "#111",
    fontWeight: 600,
    fontSize: 15,
    marginTop: 10,
    cursor: "pointer",
    transition: "all 0.2s ease"
  };

  const backBtn = {
    width: 42,
    height: 42,
    borderRadius: 14,
    border: "none",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    fontSize: 20,
    color: "#111"
  };

  const [modo, setModo] = useState("inicio");
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");


  

  useEffect(() => {
  if (!erro) return;

  const timer = setTimeout(() => {
    setErro("");
  }, 4000); // 4 segundos

  return () => clearTimeout(timer);
}, [erro]);

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

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
    setErro("");
    setLoading(true);

    await setPersistence(auth, browserLocalPersistence);

    if (modo === "cadastro") {

      if (!nome.trim()) {
        setErro("Digite seu nome.");
        return;
      }

      if (!cpf) {
        setErro("Informe seu CPF.");
        return;
      }

      if (senha !== confirmarSenha) {
        setErro("As senhas não coincidem.");
        return;
      }

      const q = query(
        collection(db, "clientes"),
        where("cpf", "==", cpf)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        setErro("Este CPF já está cadastrado.");
        return;
      }

      const res = await createUserWithEmailAndPassword(auth, email, senha);
      const user = res.user;

      await new Promise((resolve) => {
        const unsub = auth.onAuthStateChanged((u) => {
          if (u) {
            unsub();
            resolve();
          }
        });
      });

      await setDoc(doc(db, "clientes", user.uid), {
  uid: user.uid, // 🔥 ESSENCIAL
  nome,
  email,
  cpf
});

      await setDoc(doc(db, "usuarios", user.uid), {
  uid: user.uid, // 🔥 ESSENCIAL
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

    let mensagem = "Ocorreu um erro. Tente novamente.";

    if (e.code === "auth/email-already-in-use") {
      mensagem = "Este e-mail já está em uso.";
    }

    if (e.code === "auth/invalid-email") {
      mensagem = "E-mail inválido.";
    }

    if (e.code === "auth/weak-password") {
      mensagem = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (e.code === "auth/user-not-found") {
      mensagem = "Usuário não encontrado.";
    }

    if (e.code === "auth/wrong-password") {
      mensagem = "Senha incorreta.";
    }

    setErro(mensagem);

  } finally {
    setLoading(false);
  }
}


  return (
    <div style={{
      position: "relative",
      minHeight: "100dvh",
      overflow: "hidden",
      background: "#fff"
    }}>
      {/* IMAGEM DE FUNDO */}
      <img
        src="lg.jpg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      {/* OVERLAY CLARO */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.82), rgba(255,255,255,0.96))"
      }} />

      {/* WRAPPER GERAL */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: larguraApp,
        margin: "0 auto",
        minHeight: "100dvh",
        padding: isMobile ? 0 : "0 24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* TOPO */}
        <div style={{
          paddingTop: "calc(env(safe-area-inset-top) + 14px)",
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <button
              onClick={() => {
                if (modo === "inicio") {
                  router.push("/acai");
                  return;
                }
                setModo("inicio");
              }}
              style={backBtn}
            >
              ←
            </button>

            <div style={{ width: 42 }} />
          </div>
        </div>

        {/* CONTEÚDO CENTRAL */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "center",
          padding: `0 20px calc(24px + env(safe-area-inset-bottom))`,
          boxSizing: "border-box"
        }}>
          <div style={{
            width: "100%",
            maxWidth: isMobile ? 420 : 460,
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(10px)",
            borderRadius: 28,
            padding: isMobile ? 20 : 28,
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
            border: "1px solid rgba(255,255,255,0.7)"
          }}>
            {/* LOGO / TÍTULO */}
{erro && (
  <div style={{
    background: "#ffecec",
    color: "#d93025",
    padding: "12px 14px",
    borderRadius: 12,
    fontSize: 13,
    marginBottom: 12,
    fontWeight: 500,
    textAlign: "center",
    transition: "opacity 0.3s ease"
  }}>
    {erro}
  </div>
)}

<div style={{
  textAlign: "center",
  marginBottom: 18
}}>
  <img
    src="/logo.jpg"
    style={{
      width: 78,
      height: 78,
      objectFit: "contain",
      borderRadius: 20,
      background: "#fff",
      padding: 8,
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
    }}
  />

  <h1 style={{
    marginTop: 16,
    marginBottom: 6,
    fontSize: 24,
    fontWeight: 800,
    color: "#111",
    letterSpacing: "-0.3px"
  }}>
    Entrar ou criar conta
  </h1>

  <p style={{
    margin: 0,
    fontSize: 14,
    color: "#666",
    lineHeight: 1.4
  }}>
    Use seu e-mail para continuar no app
  </p>
</div>

{/* INÍCIO */}
{modo === "inicio" && (
  <div style={{ marginTop: 6 }}>
    <button
      style={{
        ...btnPrimary,
        marginTop: 0
      }}
      onClick={() => setModo("login")}
    >
      Já tenho uma conta
    </button>

    <button
      style={btnSecondary}
      onClick={() => setModo("cadastro")}
    >
      Criar nova conta
    </button>
  </div>
)}

{/* LOGIN */}
{modo === "login" && (
  <div style={{ marginTop: 2 }}>
    <div style={{ marginBottom: 14 }}>
      <h3 style={{
        margin: 0,
        fontSize: 20,
        fontWeight: 800,
        color: "#111",
        letterSpacing: "-0.3px"
      }}>
        Entrar
      </h3>

      <p style={{
        marginTop: 6,
        marginBottom: 0,
        fontSize: 13,
        color: "#666"
      }}>
        Digite seus dados para continuar
      </p>
    </div>

    <input
      placeholder="Email"
      value={email}
      onChange={e => {
        setErro("");
        setEmail(e.target.value);
      }}
      style={inputPremium}
    />

    <input
      type="password"
      placeholder="Senha"
      value={senha}
      onChange={e => {
        setErro("");
        setSenha(e.target.value);
      }}
      style={inputPremium}
    />

    <button onClick={entrar} style={btnPrimary}>
      {loading ? "Entrando..." : "Entrar"}
    </button>

    <div style={{
      marginTop: 16,
      textAlign: "center",
      fontSize: 13
    }}>
      <span style={{ color: "#777" }}>
        Não tem conta?{" "}
      </span>
      <span
        onClick={() => setModo("cadastro")}
        style={{
          color: "#ea1d2c",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Criar agora
      </span>
    </div>
  </div>
)}

{/* CADASTRO */}
{modo === "cadastro" && (
  <div style={{ marginTop: 2 }}>
    <div style={{ marginBottom: 14 }}>
      <h3 style={{
        margin: 0,
        fontSize: 20,
        fontWeight: 800,
        color: "#111",
        letterSpacing: "-0.3px"
      }}>
        Criar conta
      </h3>

      <p style={{
        marginTop: 6,
        marginBottom: 0,
        fontSize: 13,
        color: "#666"
      }}>
        Preencha os dados para criar sua conta
      </p>
    </div>

    <input
      placeholder="Nome"
      value={nome}
      onChange={e => {
        const valor = e.target.value.replace(/[0-9]/g, "");
        setErro("");
        setNome(valor);
      }}
      style={inputPremium}
    />

    <input
      placeholder="CPF"
      value={cpf}
      onChange={e => {
        setErro("");
        setCpf(formatarCPF(e.target.value));
      }}
      style={inputPremium}
    />

    <input
      placeholder="Email"
      value={email}
      onChange={e => {
        setErro("");
        setEmail(e.target.value);
      }}
      style={inputPremium}
    />

    <input
      type="password"
      placeholder="Senha"
      value={senha}
      onChange={e => {
        setErro("");
        setSenha(e.target.value);
      }}
      style={inputPremium}
    />

    <input
      type="password"
      placeholder="Confirmar senha"
      value={confirmarSenha}
      onChange={e => {
        setErro("");
        setConfirmarSenha(e.target.value);
      }}
      style={inputPremium}
    />

    <button onClick={entrar} style={btnPrimary}>
      {loading ? "Criando..." : "Criar conta"}
    </button>

    <div style={{
      marginTop: 16,
      textAlign: "center",
      fontSize: 13
    }}>
      <span style={{ color: "#777" }}>
        Já tem conta?{" "}
      </span>
      <span
        onClick={() => setModo("login")}
        style={{
          color: "#ea1d2c",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Entrar
      </span>
    </div>
  </div>
)}

{/* RODAPÉ */}
<div style={{
  marginTop: 20,
  textAlign: "center",
  fontSize: 12,
  color: "#888",
  lineHeight: 1.5
}}>
  Ao continuar, você concorda com nossos termos e política de privacidade.
 </div>

 <div
  style={{
    marginTop: 36,
    paddingTop: 14,
    borderTop: "1px solid rgba(0,0,0,0.05)",
    textAlign: "center"
  }}
>
  <div
    style={{
      fontSize: 11,
      color: "#9ca3af",
      fontWeight: 500,
      letterSpacing: 0.3
    }}
  >
    Desenvolvido por{" "}
    <span style={{ color: "#6b7280", fontWeight: 600 }}>
      Joás
    </span>
  </div>

  <div
    style={{
      marginTop: 4,
      fontSize: 10,
      color: "#c4c4c4",
      letterSpacing: 0.5
    }}
  >
    v1.0.0
  </div>
</div>
 </div>
</div>
</div>



      <style>{`
        input:focus {
          border: 1px solid #ea1d2c !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(234,29,44,0.08);
        }

        button:active {
          transform: scale(0.96);
        }
      `}</style>
    </div>
  );
}