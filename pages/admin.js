import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { db, auth } from '../services/firebase';
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Admin() {

  const router = useRouter();

  const [pedidos, setPedidos] = useState([]);
  const [novosPedidos, setNovosPedidos] = useState([]);
  const [primeiraCarga, setPrimeiraCarga] = useState(true);

  // 🔔 SOM
  function tocarSom() {
    console.log("🔔 novo pedido");
  }

  // 🔥 LIMPAR EFEITO DE PISCAR (TEM QUE FICAR FORA)
  useEffect(() => {
    if (novosPedidos.length > 0) {
      const timer = setTimeout(() => {
        setNovosPedidos([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [novosPedidos]);

  // 🔥 FIREBASE
  useEffect(() => {

    const unsub = onSnapshot(collection(db, "pedidos"), (snapshot) => {

      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPedidos(prev => {
        const idsAntigos = prev.map(p => p.id);

        const novos = lista.filter(p => !idsAntigos.includes(p.id));

        if (!primeiraCarga && novos.length > 0) {
          setNovosPedidos(novos.map(p => p.id));
          tocarSom();
        }

        return lista;
      });

      setPrimeiraCarga(false);
    });

    return () => unsub();

  }, []);
  const [cupons, setCupons] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [buscaCodigo, setBuscaCodigo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [valor, setValor] = useState("");
  const [validade, setValidade] = useState("");
  const [limite, setLimite] = useState("");

  // 🔥 NOVO: CONTROLE LOJA
  const [lojaAberta, setLojaAberta] = useState(null);
  const [loadingLoja, setLoadingLoja] = useState(false);
  

  // 🔒 AUTH
  useEffect(() => {

    if (typeof window === "undefined") return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) return router.push('/login-admin');

      try {
        const snap = await getDoc(doc(db, "admins", user.uid));

        if (!snap.exists()) return router.push('/login-admin');

        setLoadingAuth(false);

      } catch {
        router.push('/login-admin');
      }

    });

    return () => unsubscribe();

  }, []);

 
  // 🔥 PEDIDOS + CUPONS
  useEffect(() => {

  if (loadingAuth) return;

  const unsub = onSnapshot(collection(db, "pedidos"), (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 🔥 DETECTAR NOVOS PEDIDOS
    setPedidos(prev => {
      const idsAntigos = prev.map(p => p.id);

      const novos = lista.filter(p => !idsAntigos.includes(p.id));

      if (novos.length > 0) {
        setNovosPedidos(novos.map(p => p.id));

        tocarSom(); // 🔔 som
      }

      return lista;
    });

  });

  carregarCupons();

  return () => unsub();

}, [loadingAuth]);

  // 🔥 NOVO: LOJA REALTIME
  useEffect(() => {

    const ref = doc(db, "config", "loja");

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setLojaAberta(snap.data().aberta);
      } else {
        setLojaAberta(false);
      }
    });

    return () => unsub();

  }, []);

  function logout() {
    signOut(auth);
    router.push('/login-admin');
  }

  // 🔥 STATUS PEDIDO
  async function atualizarStatus(id, status) {
    try {
      await updateDoc(doc(db, "pedidos", id), { status });
    } catch (e) {
      console.error(e);
    }
  }

  // 🔥 NOVO: STATUS LOJA
  async function toggleLoja(status) {
    setLoadingLoja(true);

    try {
      await updateDoc(doc(db, "config", "loja"), {
        aberta: status,
        atualizadoEm: new Date().toISOString()
      });
    } catch (e) {
      console.error(e);
    }

    setLoadingLoja(false);
  }

  // 🎟️ CUPONS
  function carregarCupons() {
    const lista = JSON.parse(localStorage.getItem("cupons")) || [];
    setCupons(lista);
  }

  function salvarCupons(lista) {
    localStorage.setItem("cupons", JSON.stringify(lista));
    setCupons(lista);
  }

  function criarCupom() {

  if (!codigo || !valor || !validade || !limite) {
    alert("⚠️ Preencha todos os campos");
    return;
  }

  if (Number(valor) <= 0) {
    alert("⚠️ Valor inválido");
    return;
  }

  if (Number(limite) <= 0) {
    alert("⚠️ Limite inválido");
    return;
  }

  const codigoFormatado = codigo.toUpperCase();

  const existe = cupons.find(c => c.codigo === codigoFormatado);

  if (existe) {
    alert("❌ Cupom já existe");
    return;
  }

  const lista = [...cupons];

  lista.push({
    codigo: codigoFormatado,
    valor: Number(valor),
    validade,
    limite: Number(limite),
    usos: 0,
    criadoEm: new Date().toISOString()
  });

  salvarCupons(lista);

  alert("✅ Cupom criado");

  setCodigo("");
  setValor("");
  setValidade("");
  setLimite("");
}


function editarCupom(index) {

  const novoValor = prompt("Novo valor:");

  if (!novoValor) return;

  if (Number(novoValor) <= 0) {
    alert("Valor inválido");
    return;
  }

  const lista = [...cupons];

  lista[index].valor = Number(novoValor);

  salvarCupons(lista);

  alert("✏️ Atualizado");
}


function deletarCupom(index) {

  const confirmar = confirm("Excluir cupom?");

  if (!confirmar) return;

  const lista = [...cupons];

  lista.splice(index, 1);

  salvarCupons(lista);

  alert("🗑️ Removido");
}

  // 💰 FATURAMENTO
  const totalFaturado = pedidos.reduce((acc, p) => acc + (Number(p.total) || 0), 0);

  // 📊 GRÁFICO CORRIGIDO
const vendasPorDia = {};

pedidos.forEach(p => {

  if (!p.data) return;

  let dia = "";

  if (p.data.includes("T")) {
    dia = p.data.split("T")[0];
  } else if (p.data.includes("/")) {
    const partes = p.data.split(" ")[0];
    const [d, m, a] = partes.split("/");
    dia = `${a}-${m}-${d}`;
  }

  if (!dia) return;

  if (!vendasPorDia[dia]) vendasPorDia[dia] = 0;

  vendasPorDia[dia] += Number(p.total) || 0;
});

const maxVenda = Math.max(...Object.values(vendasPorDia));

  if (loadingAuth) {
    return <div style={{ color: 'white' }}>Carregando...</div>;
  }

  return (
    <div className="container">
    <div className="wrapper">
    
        <div className="header">
        <h1>Painel Admin</h1>
        <button onClick={logout}>Sair</button>
      </div>

      {/* 🔥 CONTROLE LOJA */}
      <div className="card">
        <h2>Status da Loja</h2>

        <div style={{
          marginBottom: 10,
          padding: 10,
          borderRadius: 10,
          background: lojaAberta ? "#002a00" : "#2a0000",
          color: lojaAberta ? "#00ff88" : "#ff4d4d",
          fontWeight: "bold",
          textAlign: "center"
        }}>
          {lojaAberta === null
            ? "⏳ Carregando..."
            : lojaAberta
              ? "🟢 Loja aberta"
              : "🔴 Loja fechada"}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => toggleLoja(true)} disabled={loadingLoja}>
            🟢 Abrir
          </button>

          <button onClick={() => toggleLoja(false)} disabled={loadingLoja}>
            🔴 Fechar
          </button>
        </div>
      </div>

      {/* FATURAMENTO */}
      <div className="card">
        <h2>Total faturado</h2>
        <h1 style={{ color: "#fff", fontSize: 32 }}>
  R$ {Number(totalFaturado).toFixed(2)}
</h1>
      </div>

      {/* GRÁFICO */}
<div className="card">
  <h2>Vendas por dia</h2>

  {Object.keys(vendasPorDia)
    .sort((a, b) => new Date(b) - new Date(a))
    .map(dia => (
      <div key={dia} className="graficoItem">

        <span style={{ fontWeight: 'bold' }}>
          {dia}
        </span>

        <div className="graficoBox">
          <div
            className="barra"
            style={{
              width: `${(vendasPorDia[dia] / maxVenda) * 100}%`
            }}
          />
        </div>

        <span style={{ opacity: 0.7 }}>
          R$ {Number(vendasPorDia[dia]).toFixed(2)}
        </span>

      </div>
    ))}
</div>

      {/* CUPONS */}
<div className="card">
  <h2>Criar Cupom</h2>

  <div className="cupomForm">
    <input
      placeholder="Código"
      value={codigo}
      onChange={e => setCodigo(e.target.value)}
    />

    <input
      placeholder="Valor"
      type="number"
      value={valor}
      onChange={e => setValor(e.target.value)}
    />

    <input
      type="date"
      value={validade}
      onChange={e => setValidade(e.target.value)}
    />

    <input
      placeholder="Limite"
      type="number"
      value={limite}
      onChange={e => setLimite(e.target.value)}
    />

    <button onClick={criarCupom}>
      🚀 Criar
    </button>
  </div>

  <h3 style={{ marginTop: 20 }}>Cupons criados</h3>

  {cupons.map((c, i) => (
    <div key={i} className="cupomItem">

      <div>
        <strong>{c.codigo}</strong>
        <p>R$ {c.valor}</p>
        <p>Uso: {c.usos}/{c.limite}</p>
        <small>Validade: {c.validade}</small>
      </div>

      <div className="cupomBtns">
        <button onClick={() => editarCupom(i)}>✏️</button>
        <button onClick={() => deletarCupom(i)}>🗑️</button>
      </div>

    </div>
  ))}
</div>

{/* PEDIDOS */}
<div className="card">
  <h2>Pedidos</h2>

  <input
    placeholder="Buscar por código (#ABC123)"
    value={buscaCodigo}
    onChange={e => setBuscaCodigo(e.target.value)}
    style={{
      marginBottom: 10,
      padding: 10,
      width: "100%",
      borderRadius: 10,
      border: "none"
    }}
  />

<div className="gridPedidos">

  {/* 🟢 COLUNA 1 */}
  <div className="coluna">

    <h3>🟢 Em andamento</h3>

    {pedidos
      .filter(p => {
        if (!buscaCodigo) return true;
        return (p.codigo || "").toLowerCase().includes(buscaCodigo.toLowerCase());
      })
      .filter(p => p.status !== "entregue")
      .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
      .slice(0, 10)
      .map((p) => {

        const status = p.status || "novo";

        const cores = {
          novo: "#888",
          preparando: "orange",
          saiu: "#00b0ff",
          entregue: "#00c853"
        };

        return (
          <div key={p.id} className="pedido" style={{
            borderLeft: `5px solid ${cores[status]}`,
            marginBottom: 15,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            padding: 12
          }}>

            <p><strong>{p.cliente}</strong></p>
            <p>Código: <strong>{p.codigo || "—"}</strong></p>
            <p>{p.produto?.nome || "Produto"}</p>

            <p>
              Status:
              <strong style={{ marginLeft: 6, color: cores[status] }}>
                {status}
              </strong>
            </p>

            <p>
              Total: <strong>R$ {Number(p.total || 0).toFixed(2)}</strong>
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: "wrap" }}>

              {status === "novo" && (
                <button onClick={() => atualizarStatus(p.id, "preparando")}>
                  🔥 Preparar
                </button>
              )}

              {status === "preparando" && (
                <button onClick={() => atualizarStatus(p.id, "saiu")}>
                  🚚 Saiu p/ entrega
                </button>
              )}

              {status === "saiu" && (
                <button onClick={() => atualizarStatus(p.id, "entregue")}>
                  ✅ Entregue
                </button>
              )}

            </div>

          </div>
        );
      })}

  </div>

  {/* ⚪ COLUNA 2 */}
  <div className="coluna">

    <h3>⚪ Entregues</h3>

    {pedidos
      .filter(p => {
        if (!buscaCodigo) return true;
        return (p.codigo || "").toLowerCase().includes(buscaCodigo.toLowerCase());
      })
      .filter(p => p.status === "entregue")
      .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
      .slice(0, 10)
      .map((p) => (

        <div key={p.id} className="pedido" style={{
          opacity: 0.6,
          borderLeft: "5px solid #00c853",
          marginBottom: 15,
          background: "rgba(255,255,255,0.02)",
          borderRadius: 12,
          padding: 12
        }}>

          <p><strong>{p.cliente}</strong></p>
          <p>Código: <strong>{p.codigo || "—"}</strong></p>
          <p>{p.produto?.nome || "Produto"}</p>

          <p>
            Total: <strong>R$ {Number(p.total || 0).toFixed(2)}</strong>
          </p>

        </div>
      ))}

  </div>



    {/* 🔥 FINALIZADOS */}
    <h3 style={{ marginTop: 20 }}>⚪ Finalizados</h3>

    {pedidos
      .filter(p => {
        if (!buscaCodigo) return true;
        return (p.codigo || "").toLowerCase().includes(buscaCodigo.toLowerCase());
      })
      .filter(p => p.status === "entregue")
      .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
      .slice(0, 10)
      .map((p) => (

        <div key={p.id} className="pedido" style={{
          opacity: 0.6,
          borderLeft: "5px solid #00c853",
          marginBottom: 15,
          background: "rgba(255,255,255,0.02)",
          borderRadius: 12,
          padding: 12
        }}>

          <p><strong>{p.cliente}</strong></p>
          <p>Código: <strong>{p.codigo || "—"}</strong></p>
          <p>{p.produto?.nome || "Produto"}</p>

          <p>
            Total: <strong>R$ {Number(p.total || 0).toFixed(2)}</strong>
          </p>

          <small>
            {p.data ? new Date(p.data).toLocaleString("pt-BR") : ""}
          </small>

        </div>
      ))}

  </div>
</div>

     <style jsx>{`
  .container {
    background: #0a0014;
    min-height: 100vh;
    padding: 20px;
    color: white;

    display: flex;
    justify-content: center;
  }

  /* 🔥 ÁREA CENTRAL */
  .content {
    width: 100%;
    max-width: 900px;
  }

  .card {
    margin-top: 15px;
    padding: 15px;
    background: #111;
    border-radius: 15px;
  }

  /* 🔥 GRÁFICO */
  .graficoItem {
    margin-bottom: 12px;
  }

  .barra {
    height: 10px;
    border-radius: 10px;
    background: linear-gradient(90deg,#6a00ff,#ff2aff);
    margin: 5px 0;
    transition: 0.3s;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background: linear-gradient(90deg,#5a00ff,#8a00ff);
    color: white;
    border: none;
    cursor: pointer;
  }
`}</style>

    </div>
    </div>

  
  );
}