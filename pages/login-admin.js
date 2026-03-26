import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginAdmin() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function entrar() {

    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(auth, email, senha);

      const uid = userCred.user.uid;

      // 🔒 VERIFICA SE É ADMIN
      const snap = await getDoc(doc(db, "admins", uid));

      if (!snap.exists()) {
        alert("Sem permissão de admin");
        return;
      }

      router.push('/admin');

    } catch (e) {
      alert("Erro no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">

      <div className="box">

        <h2>Admin Login</h2>

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

        <button onClick={entrar}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg,#0a0014,#000);
        }

        .box {
          width: 320px;
          background: #111;
          padding: 25px;
          border-radius: 20px;
          color: white;
          text-align: center;
          box-shadow: 0 0 20px rgba(122,0,255,0.3);
        }

        input {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border-radius: 10px;
          border: none;
          background: #1a1a1a;
          color: white;
        }

        button {
          width: 100%;
          margin-top: 15px;
          padding: 12px;
          border-radius: 12px;
          background: linear-gradient(90deg,#6a00ff,#7a00ff);
          color: white;
          border: none;
          font-weight: bold;
        }
      `}</style>

    </div>
  );
}