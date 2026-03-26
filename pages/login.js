import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { auth, db } from '../services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function Login() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false);

  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo !== null) {
      setDark(temaSalvo === "dark");
    }
  }, []);

  function toggleTheme() {
    const novo = !dark;
    setDark(novo);
    localStorage.setItem("tema", novo ? "dark" : "light");
  }

  function formatarCPF(valor) {
    valor = valor.replace(/\D/g, '').slice(0, 11);
    return valor
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

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

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formValido = modoCadastro
    ? nome && emailValido.test(email) && validarCPF(cpf) && senha.length >= 6 && senha === confirmarSenha
    : emailValido.test(email) && senha;

  async function entrar() {

    if (!formValido) return alert("Preencha corretamente");

    try {
      setLoading(true);

      if (modoCadastro) {

        try {
          // 🆕 criar conta
          const res = await createUserWithEmailAndPassword(auth, email, senha);
          const user = res.user;

          await setDoc(doc(db, "clientes", user.uid), {
            nome,
            email,
            cpf
          });

          localStorage.setItem("cliente", nome);

        } catch (e) {

          // 🔥 email já existe → login automático
          if (e.code === "auth/email-already-in-use") {

            const res = await signInWithEmailAndPassword(auth, email, senha);
            const user = res.user;

            const snap = await getDoc(doc(db, "clientes", user.uid));

            if (snap.exists()) {
              localStorage.setItem("cliente", snap.data().nome);
            }

          } else {
            throw e;
          }
        }

      } else {
        // 🔑 login normal
        const res = await signInWithEmailAndPassword(auth, email, senha);
        const user = res.user;

        const snap = await getDoc(doc(db, "clientes", user.uid));

        if (snap.exists()) {
          localStorage.setItem("cliente", snap.data().nome);
        }
      }

      router.push('/acai');

    } catch (e) {

      if (e.code === "auth/wrong-password") {
        alert("Senha incorreta");
      } else if (e.code === "auth/user-not-found") {
        alert("Usuário não encontrado");
      } else {
        alert("Erro: " + e.message);
      }

    } finally {
      setLoading(false);
    }
  }

  async function recuperarSenha() {
    if (!email) return alert("Digite o email");

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email enviado!");
    } catch {
      alert("Erro ao enviar");
    }
  }

  return (
    <div className="container">
      <div className="content">

        <h1>🍧 Açaí da Daiane</h1>

        {/* BOTÃO TEMA */}
        <button className="themeBtn" onClick={toggleTheme}>
          {dark ? "☀️ Modo Claro" : "🌙 Modo Dark"}
        </button>

        <div className="form">

          {modoCadastro && (
            <>
              <input
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''))}
              />

              <input
                placeholder="CPF"
                value={cpf}
                onChange={e => setCpf(formatarCPF(e.target.value))}
              />
            </>
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />

          {modoCadastro && (
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
            />
          )}

          <button className="btn" onClick={entrar}>
            {loading ? "Carregando..." : modoCadastro ? "Cadastrar" : "Entrar"}
          </button>

          {!modoCadastro && (
            <button className="link" onClick={recuperarSenha}>
              Esqueci minha senha
            </button>
          )}

          <button
            className="link strong"
            onClick={() => setModoCadastro(!modoCadastro)}
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