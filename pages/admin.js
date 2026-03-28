import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { db } from '../services/firebase';
import { setDoc } from "firebase/firestore";
import { authAdmin as auth } from "../services/firebaseDual";


import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";




export default function Admin() {

  const router = useRouter();

  const [pedidos, setPedidos] = useState([]);
  const [novosPedidos, setNovosPedidos] = useState([]);
  const [primeiraCarga, setPrimeiraCarga] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [lojaAberta, setLojaAberta] = useState(null);
  const [loadingLoja, setLoadingLoja] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [desconto, setDesconto] = useState("");
  const [logoInput, setLogoInput] = useState("");
  
  // 🎟️ CUPONS
  const [valor, setValor] = useState("");
  const [validade, setValidade] = useState("");
  const [limite, setLimite] = useState("");
  const [cupons, setCupons] = useState([]);
  const [codigo, setCodigo] = useState("");
// 🎟️ editar produtos
  const [produtos, setProdutos] = useState([]);
  const [editandoProduto, setEditandoProduto] = useState(null);

  const [mostrarModalProduto, setMostrarModalProduto] = useState(false);

  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novoTamanho, setNovoTamanho] = useState("");
  const [novaImagem, setNovaImagem] = useState(""); // 🔥 corrigido
  const [maisVendido, setMaisVendido] = useState(false);
  

  // 🔍 BUSCA
  const [buscaCodigo, setBuscaCodigo] = useState("");

  // 🔔 SOM
function tocarSom() {
  console.log("🔔 novo pedido");

  // 🔥 se quiser som real depois:
  // const audio = new Audio("/notificacao.mp3");
  // audio.play();
}

async function salvarLogo() {
  await setDoc(doc(db, "config", "loja"), {
    logo: logoInput
  }, { merge: true });

  alert("Logo atualizada 🚀");
}

// 🔥 excluir produtos
async function excluirProduto(produto) {

  const confirmar = confirm(`Excluir ${produto.nome}?`);

  if (!confirmar) return;

  await deleteDoc(doc(db, "produtos", produto.id));
}

// 🔥 editar produtos
useEffect(() => {

  const unsub = onSnapshot(collection(db, "produtos"), (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 🔥 COLOCA AQUI (ORDENAÇÃO)
    lista.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

    setProdutos(lista);

  });

  return () => unsub();

}, []);



// 🔥 MOVER PRODUTOS
async function moverProduto(produto, direcao) {

  const index = produtos.findIndex(p => p.id === produto.id);

  const novoIndex = index + direcao;

  if (novoIndex < 0 || novoIndex >= produtos.length) return;

  const produtoDestino = produtos[novoIndex];

  // 🔥 TROCA ORDEM
  await updateDoc(doc(db, "produtos", produto.id), {
    ordem: produtoDestino.ordem
  });

  await updateDoc(doc(db, "produtos", produtoDestino.id), {
    ordem: produto.ordem
  });
}


// 🔥 salvarproduto
async function salvarProduto() {

  if (!novoNome || !novoPreco) {
    alert("Preencha nome e preço");
    return;
  }

  await addDoc(collection(db, "produtos"), {
    nome: novoNome,
    preco: Number(novoPreco),
    tamanho: novoTamanho,
    descricao: novaDescricao,
    imagem: novaImagem, // 🔥 base64 salva direto
    ativo: true,
    maisVendido: maisVendido, // 🔥 AQUI
    ordem: Date.now()
  });

  // limpar tudo
  setNovoNome("");
  setNovoPreco("");
  setNovoTamanho("");
  setNovaDescricao("");
  setNovaImagem("");

  setMostrarModalProduto(false);
}

// 🔥 LIMPAR EFEITO DE PISCAR
useEffect(() => {
  if (novosPedidos.length > 0) {
    const timer = setTimeout(() => {
      setNovosPedidos([]);
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [novosPedidos]);

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


// 🔥 PEDIDOS + CUPONS (ÚNICO — CORRIGIDO)
useEffect(() => {

  if (loadingAuth) return;

  const unsub = onSnapshot(collection(db, "pedidos"), (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

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


// 🔓 LOGOUT
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
// 🔥 EABRIR EDITACAO
function abrirEdicao(p) {
  setNovoNome(p.nome || "");
  setNovoPreco(p.preco || "");
  setNovoTamanho(p.tamanho || "");
  setNovaDescricao(p.descricao || "");
  setNovaImagem(p.imagem || "");
  setMaisVendido(p.maisVendido || false);

  setEditandoProduto(p); // 🔥 ativa modo edição
  setMostrarModalProduto(true);
}

// 🔥 EDITAR PRODUTOS
async function salvarProduto() {

  if (!novoNome || !novoPreco) {
    alert("Preencha nome e preço");
    return;
  }

  const dados = {
    nome: novoNome,
    preco: Number(novoPreco),
    tamanho: novoTamanho,
    descricao: novaDescricao,
    imagem: novaImagem,
    ativo: true,
    maisVendido: maisVendido
  };

  if (editandoProduto) {
    // 🔥 ATUALIZA
    await updateDoc(doc(db, "produtos", editandoProduto.id), dados);
  } else {
    // 🔥 CRIA NOVO
    await addDoc(collection(db, "produtos"), {
      ...dados,
      ordem: Date.now()
    });
  }

  // 🔥 RESET
  setNovoNome("");
  setNovoPreco("");
  setNovoTamanho("");
  setNovaDescricao("");
  setNovaImagem("");
  setMaisVendido(false);
  setEditandoProduto(null);

  setMostrarModalProduto(false);
}

async function toggleProduto(produto) {
  await updateDoc(doc(db, "produtos", produto.id), {
    ativo: !produto.ativo
  });
}


// 🔥 STATUS LOJA
async function toggleLoja(status) {
  setLoadingLoja(true);

  try {
    await setDoc(doc(db, "config", "loja"), {
      aberta: status,
      atualizadoEm: new Date().toISOString()
    }, { merge: true });

  } catch (e) {
    console.error(e);
  }

  setLoadingLoja(false);
}
// 🔥 STATUS limpar pedidos
async function limparPedidos() {

  const confirmar = confirm("⚠️ Deseja apagar TODOS os pedidos?");

  if (!confirmar) return;

  try {
    const snapshot = await getDocs(collection(db, "pedidos"));

    const promises = snapshot.docs.map(docSnap =>
      deleteDoc(doc(db, "pedidos", docSnap.id))
    );

    await Promise.all(promises);

    alert("🗑️ Todos os pedidos apagados!");

  } catch (e) {
    console.error(e);
    alert("Erro ao apagar pedidos");
  }
}

 // 🎟️ CUPONS
async function carregarCupons() {

  try {

    const snap = await getDocs(collection(db, "cupons"));

    const lista = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setCupons(lista);

  } catch (e) {
    console.error(e);
  }
}

async function criarCupom() {

  try {

    await addDoc(collection(db, "cupons"), {
      codigo: codigo.toUpperCase(),
      desconto: Number(desconto), // 🔥 AGORA CORRETO
      tipo: "porcentagem", // pode evoluir depois
      limite: Number(limite) || null,
      usos: {},
      ativo: true,
      validade: validade
    });

    alert("Cupom criado ✅");

    // 🔥 limpar campos
    setCodigo("");
    setDesconto("");
    setLimite("");
    setValidade("");

  } catch (e) {
    console.log(e);
    alert("Erro ao criar cupom ❌");
  }
}


async function deletarCupom(id) {

  const confirmar = confirm("Excluir cupom?");
  if (!confirmar) return;

  await deleteDoc(doc(db, "cupons", id));

  alert("🗑️ Removido");
}


// 💰 FATURAMENTO
const totalFaturado = pedidos.reduce(
  (acc, p) => acc + (Number(p.total) || 0),
  0
);


// 📊 GRÁFICO CORRIGIDO (compatível com novo sistema)
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

  if (!vendasPorDia[dia]) {
    vendasPorDia[dia] = 0;
  }

  vendasPorDia[dia] += Number(p.total) || 0;

});

const valores = Object.values(vendasPorDia);

const maxVenda = valores.length > 0 ? Math.max(...valores) : 0;


// 🔥 LOADING
if (loadingAuth) {
  return <div style={{ color: 'white' }}>Carregando...</div>;
}


// 🔥 RENDER
return (
  <div className="container">
    <div className="wrapper">

      <div className="header">
        <h1>Painel Admin</h1>
        <button onClick={logout}>Sair</button>
      </div>

      <button 
  onClick={limparPedidos}
  style={{
    background: "red",
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  }}
>
  🗑️ Limpar pedidos
</button>

      {/* 🔥 STATUS LOJA */}
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

      {/* 💰 FATURAMENTO */}
      <div className="card">
        <h2>Total faturado</h2>

        <h1 style={{
          color: "#fff",
          fontSize: 32
        }}>
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
  placeholder="Desconto (%)"
  type="number"
  value={desconto}
  onChange={e => setDesconto(e.target.value)}
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

  {cupons.map((c) => (
  <div key={c.id} className="cupomItem">

    <div>
  <strong>{c.codigo}</strong>

  <p>{c.desconto}% OFF</p>

  {/* 🔥 USO CORRETO */}
  <p>
    Uso: {c.usos ? Object.keys(c.usos).length : 0}/{c.limite || "∞"}
  </p>

  {/* 🔥 EXTRA (AQUI 👇) */}
  {c.usos && (
    <div style={{ marginTop: 5 }}>
      {Object.keys(c.usos).map((cpf, i) => (
        <small key={i} style={{ display: "block", opacity: 0.7 }}>
          CPF: {cpf}
        </small>
      ))}
    </div>
  )}

  <small>Validade: {c.validade}</small>
</div>

    <div className="cupomBtns">
      <button onClick={() => deletarCupom(c.id)}>🗑️</button>
    </div>

  </div>
))}
</div>

{/* 💰 MODAL PRODUTO */}
{mostrarModalProduto && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  }}>
    <div style={{
      background: "#111",
      padding: 25,
      borderRadius: 20,
      width: 320,
      boxShadow: "0 0 25px rgba(122,0,255,0.4)"
    }}>

      <h3 style={{ marginBottom: 15 }}>🍧 Novo Produto</h3>

      {/* 🔥 NOME */}
      <input
        placeholder="Nome"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "none",
          marginBottom: 10,
          background: "#222",
          color: "#fff"
        }}
      />

      {/* 🔥 PREÇO */}
      <input
        placeholder="Preço"
        value={novoPreco}
        onChange={(e) => setNovoPreco(e.target.value.replace(/\D/g, ""))}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "none",
          marginBottom: 10,
          background: "#222",
          color: "#fff"
        }}
      />

      {/* 🔥 TAMANHO */}
      <input
        placeholder="Tamanho (ex: 500ml)"
        value={novoTamanho}
        onChange={(e) => setNovoTamanho(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "none",
          marginBottom: 10,
          background: "#222",
          color: "#fff"
        }}
      />

      {/* 🔥 DESCRIÇÃO */}
      <input
        placeholder="Descrição (ex: banana + granola + leite condensado)"
        value={novaDescricao}
        onChange={(e) => setNovaDescricao(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "none",
          marginBottom: 10,
          background: "#222",
          color: "#fff"
        }}
      />

      {/* 🔥 IMAGEM BASE64 */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];

          if (!file) return;

          if (file.size > 500000) {
            alert("Imagem muito grande (máx 500kb)");
            return;
          }

          const reader = new FileReader();

          reader.onloadend = () => {
            setNovaImagem(reader.result); // ✅ CORRETO
          };

          reader.readAsDataURL(file);
        }}
        style={{ marginBottom: 10 }}
      />

      {/* 🔥 MAIS VENDIDO */}
<label style={{
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginBottom: 12
}}>
  <input
    type="checkbox"
    checked={maisVendido}
    onChange={(e) => setMaisVendido(e.target.checked)}
  />
  🔥 Marcar como mais vendido
</label>

      {/* 🔥 BOTÕES */}
      <div style={{ display: "flex", gap: 10 }}>

        <button
          onClick={salvarProduto}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          💾 Salvar
        </button>

        <button
          onClick={() => setMostrarModalProduto(false)}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "#333",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          ❌ Cancelar
        </button>

      </div>

    </div>
  </div>
)}


{/* 🍧 CARD PRODUTOS */}
<div className="card">
  <h2>🍧 Produtos</h2>

  {/* 🔥 BOTÃO NOVO PRODUTO */}
  <button
    onClick={() => setMostrarModalProduto(true)}
    style={{
      marginBottom: 10,
      padding: 12,
      borderRadius: 12,
      background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      width: "100%"
    }}
  >
    ➕ Novo Produto
  </button>

  {/* 🔥 LISTA */}
{produtos.length === 0 ? (
  <p style={{ opacity: 0.6 }}>Nenhum produto cadastrado</p>
) : (
  produtos.map(p => (
    <div
      key={p.id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 14,
        background: "rgba(255,255,255,0.05)",
        marginBottom: 10,
        gap: 10,
        border: p.maisVendido ? "1px solid #ff2aff" : "1px solid transparent"
      }}
    >

      {/* 🔥 ESQUERDA */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

        {/* 🔥 ORDEM */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <button onClick={() => moverProduto(p, -1)}>⬆️</button>
          <button onClick={() => moverProduto(p, 1)}>⬇️</button>
        </div>

        {/* 🔥 IMAGEM */}
        {p.imagem ? (
          <img
            src={p.imagem}
            onError={(e) => (e.target.src = "/acai.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              objectFit: "cover"
            }}
          />
        ) : (
          <div style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            background: "#222",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            🍧
          </div>
        )}

        {/* 🔥 INFO */}
        <div>
          <strong>{p.nome}</strong>

          <p style={{ fontSize: 13 }}>
            R$ {Number(p.preco).toFixed(2)} • {p.tamanho || ""}
          </p>

          <small style={{ opacity: 0.7 }}>
            {p.ativo ? "🟢 Ativo" : "🔴 Inativo"}
          </small>

          {/* 🔥 BADGE */}
          {p.maisVendido && (
            <div style={{
              fontSize: 10,
              color: "#ff2aff",
              marginTop: 2
            }}>
              🔥 Mais vendido
            </div>
          )}
        </div>

      </div>

      {/* 🔥 DIREITA (AÇÕES) */}
      <div style={{ display: "flex", gap: 6 }}>

        {/* ✏️ EDITAR */}
        <button
          onClick={() => abrirEdicao(p)}
          style={{
            background: "#6a00ff",
            border: "none",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          ✏️
        </button>

        {/* ATIVAR/DESATIVAR */}
        <button
          onClick={() => toggleProduto(p)}
          style={{
            background: p.ativo ? "#444" : "#00c853",
            border: "none",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          {p.ativo ? "🚫" : "✅"}
        </button>

        {/* EXCLUIR */}
        <button
          onClick={() => excluirProduto(p)}
          style={{
            background: "#ff4444",
            border: "none",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          🗑️
        </button>

      </div>

    </div>
  ))
)}

</div>

<input
  placeholder="URL da logo"
  value={logoInput}
  onChange={(e) => setLogoInput(e.target.value)}
/>

<button onClick={salvarLogo}>
  Salvar Logo
</button>

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

    {/* 🟢 EM ANDAMENTO */}
    <div className="coluna">

      <h3>⚪ Em andamento</h3>

      {pedidos
        .filter(p => {
          if (!buscaCodigo) return true;
          return (p.codigo || "")
            .toLowerCase()
            .includes(buscaCodigo.toLowerCase());
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
            <div
              key={p.id}
              style={{
                borderLeft: `5px solid ${cores[status]}`,
                marginBottom: 15,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 12,
                padding: 12
              }}
            >

              {/* 🔥 CLIENTE CORRIGIDO */}
              <div style={{ marginBottom: 8 }}>
                <strong>{p.cliente?.nome || "Cliente"}</strong><br />
                <small>📞 {p.cliente?.telefone}</small><br />
                <small>
                  📍 {p.cliente?.endereco}, {p.cliente?.numero}
                </small>
              </div>

              <p>
                Código: <strong>{p.codigo || "—"}</strong>
              </p>

              {/* ITENS */}
              {Array.isArray(p.itens) && p.itens.length > 0 ? (
                p.itens.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: 6 }}>
                    <p>
                      <strong>
                        {item.produto?.nome || "Açaí"} (x{item.quantidade || 1})
                      </strong>
                    </p>

                    {Array.isArray(item.extras) && item.extras.map((e, i) => (
                      <p key={i} style={{ fontSize: 12, opacity: 0.7 }}>
                        + {e.nome}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <p>
                  <strong>
                    {p.produto?.nome || "Açaí"} (x{p.quantidade || 1})
                  </strong>
                </p>
              )}

              <p>
                Status:
                <strong style={{ marginLeft: 6, color: cores[status] }}>
                  {status}
                </strong>
              </p>

              <p>
                Total: <strong>R$ {Number(p.total || 0).toFixed(2)}</strong>
              </p>

              <small>
                {p.data ? new Date(p.data).toLocaleString("pt-BR") : ""}
              </small>

              <div style={{
                display: 'flex',
                gap: 10,
                flexWrap: "wrap",
                marginTop: 10
              }}>

                {status === "novo" && (
                  <button onClick={() => atualizarStatus(p.id, "preparando")}>
                    🔥 Preparar
                  </button>
                )}

                {status === "preparando" && (
                  <button onClick={() => atualizarStatus(p.id, "saiu")}>
                    🚚 Saiu
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

    {/* 🟢 ENTREGUES */}
    <div className="coluna">

      <h3>🟢 Entregues</h3>

      {pedidos
        .filter(p => {
          if (!buscaCodigo) return true;
          return (p.codigo || "")
            .toLowerCase()
            .includes(buscaCodigo.toLowerCase());
        })
        .filter(p => p.status === "entregue")
        .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
        .slice(0, 10)
        .map((p) => (

          <div key={p.id} style={{
            opacity: 0.6,
            borderLeft: "5px solid #00c853",
            marginBottom: 15,
            background: "rgba(255,255,255,0.02)",
            borderRadius: 12,
            padding: 12
          }}>

            {/* 🔥 CLIENTE CORRIGIDO */}
            <div style={{ marginBottom: 8 }}>
              <strong>{p.cliente?.nome || "Cliente"}</strong><br />
              <small>📞 {p.cliente?.telefone}</small><br />
              <small>
                📍 {p.cliente?.endereco}, {p.cliente?.numero}
              </small>
            </div>

            <p>
              Código: <strong>{p.codigo || "—"}</strong>
            </p>

            {p.itens?.map((item, idx) => (
              <p key={idx}>
                <strong>
                  {item.produto?.nome || "Açaí"} (x{item.quantidade || 1})
                </strong>
              </p>
            ))}

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