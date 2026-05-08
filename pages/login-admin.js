import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ShieldCheck, Lock, Mail } from "lucide-react";

import { authAdmin as auth } from "../services/firebaseDual";

export default function LoginAdmin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function entrar() {
    try {
      setLoading(true);
      setErro("");

      const emailAdmin = "admin@acai.com";

      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      const user = userCred.user;

      if (
        (user?.email || "").toLowerCase() !==
        emailAdmin.toLowerCase()
      ) {
        setErro("Sem permissão de administrador");
        return;
      }

      router.push("/admin");
    } catch (e) {
      console.log(e);

      if (e.code === "auth/invalid-credential") {
        setErro("Email ou senha inválidos");
      } else {
        setErro("Erro ao entrar");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {/* CARD */}
      <div className="box">

        {/* TOPO */}
        <div className="top">
          <div className="logo">
            <ShieldCheck size={34} />
          </div>

          <h1>Painel Administrativo</h1>

          <p>
            Faça login para acessar o gerenciamento da loja
          </p>
        </div>

        {/* INPUT EMAIL */}
        <div className="inputBox">
          <Mail size={18} />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value.trim().toLowerCase()
              )
            }
          />
        </div>

        {/* INPUT SENHA */}
        <div className="inputBox">
          <Lock size={18} />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {/* ERRO */}
        {erro && (
          <div className="erro">
            {erro}
          </div>
        )}

        {/* BOTÃO */}
        <button
          onClick={entrar}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar no painel"}
        </button>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background:
            radial-gradient(
              circle at top,
              rgba(234, 29, 44, 0.18),
              transparent 35%
            ),
            linear-gradient(
              180deg,
              #0f1115 0%,
              #090909 100%
            );
        }

        .box {
          width: 100%;
          max-width: 380px;

          background: rgba(17, 17, 17, 0.92);

          border: 1px solid rgba(255,255,255,0.06);

          backdrop-filter: blur(18px);

          border-radius: 28px;

          padding: 28px;

          color: white;

          box-shadow:
            0 25px 70px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255,255,255,0.02);

          animation: fade .35s ease;
        }

        .top {
          text-align: center;
          margin-bottom: 24px;
        }

        .logo {
          width: 78px;
          height: 78px;

          border-radius: 24px;

          margin: 0 auto 18px;

          background:
            linear-gradient(
              135deg,
              #ea1d2c,
              #c1121f
            );

          display: flex;
          align-items: center;
          justify-content: center;

          box-shadow:
            0 18px 40px rgba(234,29,44,0.35);

          color: #fff;
        }

        h1 {
          margin: 0;
          font-size: 25px;
          font-weight: 800;
          letter-spacing: -0.4px;
        }

        p {
          margin-top: 8px;
          color: #9ca3af;
          font-size: 13px;
          line-height: 1.5;
        }

        .inputBox {
          height: 54px;

          display: flex;
          align-items: center;
          gap: 12px;

          padding: 0 16px;

          margin-bottom: 14px;

          border-radius: 16px;

          background: #15171b;

          border: 1px solid #24262b;

          transition: .2s ease;

          color: #9ca3af;
        }

        .inputBox:focus-within {
          border-color: rgba(234,29,44,0.55);

          box-shadow:
            0 0 0 4px rgba(234,29,44,0.10);
        }

        .inputBox input {
          flex: 1;
          height: 100%;

          border: none;
          background: transparent;

          color: white;

          outline: none;

          font-size: 14px;
        }

        .inputBox input::placeholder {
          color: #6b7280;
        }

        .erro {
          margin-bottom: 14px;

          background: rgba(220,38,38,0.12);

          border: 1px solid rgba(220,38,38,0.22);

          color: #fecaca;

          padding: 12px;

          border-radius: 14px;

          font-size: 13px;

          font-weight: 600;
        }

        button {
          width: 100%;
          height: 54px;

          border-radius: 16px;

          border: none;

          background:
            linear-gradient(
              135deg,
              #ea1d2c,
              #c1121f
            );

          color: white;

          font-size: 14px;
          font-weight: 800;

          cursor: pointer;

          transition: .2s ease;

          box-shadow:
            0 16px 35px rgba(234,29,44,0.28);
        }

        button:hover {
          transform: translateY(-2px);
        }

        button:active {
          transform: scale(.98);
        }

        button:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}