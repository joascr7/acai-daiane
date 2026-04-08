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
  width: "98%",
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
  width: "98%",
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
    position: "relative",
    minHeight: "100dvh",
    overflow: "hidden",
    background: "#fff"
  }}>

    {/* IMAGEM DE FUNDO */}
    <img
      src="/logo.jpg"
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

    {/* CONTEÚDO */}
    <div style={{
      position: "relative",
      zIndex: 2,
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box"
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

        {/* LOGO / TÍTULO */}
        <div style={{
          marginTop: 18,
          textAlign: "center"
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
      </div>

      {/* CARD */}
      <div style={{
        flex: 1,
        padding: "0 20px calc(24px + env(safe-area-inset-bottom))",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
          borderRadius: 28,
          padding: 20,
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          border: "1px solid rgba(255,255,255,0.7)"
        }}>

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
                onChange={e => setEmail(e.target.value)}
                style={inputPremium}
              />

              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                style={inputPremium}
              />

              <button
                onClick={entrar}
                style={btnPrimary}
              >
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
                onChange={e => setNome(e.target.value)}
                style={inputPremium}
              />

              <input
                placeholder="CPF"
                value={cpf}
                onChange={e => setCpf(formatarCPF(e.target.value))}
                style={inputPremium}
              />

              <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputPremium}
              />

              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                style={inputPremium}
              />

              <input
                type="password"
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                style={inputPremium}
              />

              <button
                onClick={entrar}
                style={btnPrimary}
              >
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
        </div>

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



function Top({ voltar, titulo }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
      <button onClick={voltar} style={backBtn}>←</button>
      <h3 style={{ marginLeft: 10 }}>{titulo}</h3>
    </div>
  );
}



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
  transition: "0.2s"
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
  cursor: "pointer"
};


const inputPremium = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: 18,
  border: "1px solid #eee",
  background: "#f7f7f7",
  fontSize: 15,
  outline: "none",
  marginTop: 10,
  boxSizing: "border-box",
  transition: "0.2s"
};


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


const backBtn = {
  background: "#f2f2f2",
  border: "none",
  borderRadius: "50%",
  width: 40,
  height: 40,
  fontSize: 18
};

Login.noLayout = true;