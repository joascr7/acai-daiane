import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Cropper from "react-easy-crop";

import { db } from '../services/firebase';
import { setDoc } from "firebase/firestore";
import { authAdmin as auth } from "../services/firebaseDual";
import Head from "next/head";




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


const [abaAdmin, setAbaAdmin] = useState("dashboard");


  const btnCancel = {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    border: "none",
    background: "#333",
    color: "#fff",
    cursor: "pointer"
  };

  const btnAction = (bg) => ({
  background: bg,
  border: "none",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 12
});

const cardDash = {
  background: "#1a1a1a",
  padding: 16,
  borderRadius: 16,
  display: "flex",
  flexDirection: "column",
  gap: 6
};

const btnSecondary = {
  flex: 1,
  padding: 14,
  borderRadius: 14,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer"
};





const card = {
  background: "#ffffff",
  border: "1px solid #ececec",
  color: "#111",
  borderRadius: 20,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)"
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #e5e7eb",
  fontSize: 14,
  boxSizing: "border-box",
  background: "#fff",
  color: "#111",
  outline: "none"
};

const btnPrimary = {
  padding: 14,
  borderRadius: 14,
  border: "none",
  background: "#ea1d2c",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

const btnSuccess = {
  flex: 1,
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#16a34a",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

const btnDanger = {
  flex: 1,
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#dc2626",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

const btnDangerSmall = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "none",
  background: "#ef4444",
  color: "#fff",
  cursor: "pointer"
};

const inputStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  color: "#111",
  padding: "12px 14px",
  borderRadius: 12,
  outline: "none",
  marginBottom: 8
};

  const router = useRouter();

  const [produtoEditandoId, setProdutoEditandoId] = useState(null);

  const [pedidos, setPedidos] = useState([]);
  const [novosPedidos, setNovosPedidos] = useState([]);
  const [primeiraCarga, setPrimeiraCarga] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [lojaAberta, setLojaAberta] = useState(null);
  const [loadingLoja, setLoadingLoja] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [desconto, setDesconto] = useState("");
  const [logoInput, setLogoInput] = useState("");

  
  const [editandoCategoriaId, setEditandoCategoriaId] = useState(null);
  const [editandoCategoria, setEditandoCategoria] = useState({});

  const [novaCategoria, setNovaCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  
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
  const [notificacoes, setNotificacoes] = useState([]);
  const [textoNotificacao, setTextoNotificacao] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [imagemNotificacao, setImagemNotificacao] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [novoExtraNome, setNovoExtraNome] = useState("");
  const [novoExtraPreco, setNovoExtraPreco] = useState("");
  
  // 🔍 CORTA IMAGEM ESTILO INSTA
const [crop, setCrop] = useState({ x: 0, y: 0 });
const [zoom, setZoom] = useState(1);
const [imagemTemp, setImagemTemp] = useState(null);
const [mostrarCrop, setMostrarCrop] = useState(false);
const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

// entrax no painel 
const [extras, setExtras] = useState([]);
const [min, setMin] = useState(0);
const [max, setMax] = useState(1);
const [novoItem, setNovoItem] = useState({});
const [extraNome, setExtraNome] = useState("");
const [extraPreco, setExtraPreco] = useState("");

function formatarReal(valor) {
  return (Number(valor || 0) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


<Head>
  <link rel="manifest" href="/manifest-admin.json" />
  <meta name="theme-color" content="#ea1d2c" />
</Head>

  // 🔍 BUSCA
  const [buscaCodigo, setBuscaCodigo] = useState("");

  // 🔔 SOM
function tocarSom() {
  console.log("🔔 novo pedido");

  // 🔥 se quiser som real depois:
  // const audio = new Audio("/notificacao.mp3");
  // audio.play();
}



async function salvarEdicaoCategoria(id) {
  const nome = editandoCategoria[id];
  if (!nome) return;

  const categoriaAtual = categorias.find(c => c.id === id);
  if (!categoriaAtual) return;

  await updateDoc(doc(db, "categorias", id), {
    nome,
    slug: categoriaAtual.slug // 🔥 mantém a chave interna fixa
  });

  setEditandoCategoriaId(null);
}

// nova funcao add no painel

function adicionarCategoria() {
  if (!novaCategoria) return;

  setExtras(prev => [
    ...prev,
    {
      categoria: novaCategoria,
      min: Number(min),
      max: Number(max),
      itens: []
    }
  ]);

  setNovaCategoria("");
  setMin(0);
  setMax(1);
}

function adicionarItem(index) {
  const nome = novoItem[index]?.nome;
  const preco = Number(novoItem[index]?.preco || 0);

  if (!nome) return;

  setExtras(prev => {
    const novo = [...prev];

    // 🔥 GARANTE QUE É ARRAY
    if (!Array.isArray(novo[index].itens)) {
      novo[index].itens = [];
    }

    novo[index].itens.push({ nome, preco });

    return novo;
  });

  setNovoItem(prev => ({
    ...prev,
    [index]: { nome: "", preco: "" }
  }));
}

function removerItem(catIndex, itemIndex) {
  setExtras(prev => {
    const novo = [...prev];
    novo[catIndex].itens.splice(itemIndex, 1);
    return novo;
  });
}

function removerCategoria(index) {
  setExtras(prev => prev.filter((_, i) => i !== index));
}

// moverItem
function moverItem(catIndex, itemIndex, direcao) {
  setExtras(prev => {
    if (!Array.isArray(prev)) return prev;

    const novo = JSON.parse(JSON.stringify(prev)); // 🔥 FORÇA NOVO OBJETO

    const itens = novo[catIndex]?.itens || [];

    const novoIndex = itemIndex + direcao;

    if (novoIndex < 0 || novoIndex >= itens.length) return prev;

    const itemMovido = itens[itemIndex];

    itens.splice(itemIndex, 1);
    itens.splice(novoIndex, 0, itemMovido);

    return [...novo]; // 🔥 FORÇA RENDER
  });
}

 
// salvarExtras
async function salvarExtras() {
  try {
    

    alert("Extras salvos com sucesso 🚀");
  } catch (err) {
    console.log(err);
    alert("Erro ao salvar");
  }
}



async function enviarNotificacao(tipo) {

  if (!textoNotificacao) {
    alert("Digite a notificação");
    return;
  }

  await addDoc(collection(db, "notificacoes"), {

  texto: textoNotificacao,
  para: tipo,
  uid: tipo === "usuario" ? clienteSelecionado : null,
  ativo: true,

  // 🔥 DATA
  data: new Date().toISOString(),

  lida: false,

  // 🔥 IMAGEM (ADICIONA ISSO)
  imagem: imagemNotificacao || null,

  produtoId: produtoSelecionado || null

});

setTextoNotificacao("");
setClienteSelecionado("");
setImagemNotificacao(""); // 🔥 limpa imagem também

alert("Notificação enviada 🚀");
}


// valor em centavos
function converterParaCentavos(valor) {
  if (!valor) return 0;

  // aceita: 2 | 2.50 | 2,50
  const numero = Number(valor.toString().replace(",", "."));

  return Math.round(numero * 100);
}


async function removerNotificacao(id) {
  await deleteDoc(doc(db, "notificacoes", id));
}

async function salvarLogo() {
  await setDoc(doc(db, "config", "loja"), {
    logo: logoInput
  }, { merge: true });

  alert("Logo atualizada 🚀");
}

// editar item
function editarItem(catIndex, itemIndex, campo, valor) {
  setExtras(prev => {
    const novo = [...prev];

    // 🔥 garante estrutura
    if (!Array.isArray(novo[catIndex].itens)) {
      novo[catIndex].itens = [];
    }

    if (!novo[catIndex].itens[itemIndex]) return prev;

    novo[catIndex].itens[itemIndex] = {
      ...novo[catIndex].itens[itemIndex],
      [campo]: campo === "preco" ? Number(valor) : valor
    };

    return novo;
  });
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





// 🔥 criar categoria
async function criarCategoria() {
  if (!novaCategoria) return;

  const slug = novaCategoria.toLowerCase().trim();

  await addDoc(collection(db, "categorias"), {
    nome: novaCategoria,
    slug,
    ordem: Date.now()
  });

  setNovaCategoria("");
  alert("Categoria criada 🚀");
}

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

// 🔥 cadastro padrao primeiro
useEffect(() => {
  if (categorias.length > 0 && !categoria) {
    setCategoria(categorias[0].slug);
  }
}, [categorias]);
// 🔥 cadastro produto categoria
useEffect(() => {
  const unsub = onSnapshot(collection(db, "categorias"), (snap) => {
    setCategorias(
  snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
);
  });

  return () => unsub();
}, []);

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


// buscar usuario effect
useEffect(() => {

  const unsub = onSnapshot(collection(db, "usuarios"), (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id, // 🔥 UID
      ...doc.data()
    }));

    setClientes(lista);

  });

  return () => unsub();

}, []);

useEffect(() => {

  const unsub = onSnapshot(collection(db, "notificacoes"), (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setNotificacoes(lista);

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
  setProdutoEditandoId(p.id);
  setNovoNome(p.nome);
  setNovoPreco((p.preco / 100).toFixed(2));
  setNovoTamanho(p.tamanho || "");
  setNovaDescricao(p.descricao || "");
  setNovaImagem(p.imagem || "");
  setMaisVendido(p.maisVendido || false);
  setCategoria(p.categoria || "");

  setExtras(p.extras || []); // 🔥 ESSENCIAL

  setMostrarModalProduto(true);
}

// 🔥 EDITAR PRODUTOS
async function salvarProduto() {
  if (!novoNome || !novoPreco) {
    return alert("Preencha os campos");
  }

  const dados = {
    nome: novoNome,
    preco: converterParaCentavos(novoPreco),
    tamanho: novoTamanho,
    descricao: novaDescricao,
    imagem: novaImagem,
    ativo: true,
    maisVendido,
    categoria,
    extras,
    ordem: Date.now()
  };

  try {
    if (produtoEditandoId) {
      // 🔥 EDITAR
      await updateDoc(
        doc(db, "produtos", produtoEditandoId),
        dados
      );

      alert("Produto atualizado!");
    } else {
      // 🔥 NOVO
      await addDoc(collection(db, "produtos"), dados);

      alert("Produto criado!");
    }

    // 🔥 LIMPA
    setProdutoEditandoId(null);
    setNovoNome("");
    setNovoPreco("");
    setNovoTamanho("");
    setNovaDescricao("");
    setNovaImagem("");
    setMaisVendido(false);
    setCategoria("");
    setExtras([]);

    setMostrarModalProduto(false);

  } catch (e) {
    console.log(e);
    alert("Erro ao salvar");
  }
}



async function toggleProduto(p) {
  try {

    const ref = doc(db, "produtos", p.id);

    await updateDoc(ref, {
      ativo: !p.ativo
    });

    console.log("🔥 status atualizado:", !p.ativo);

  } catch (e) {
    console.log("❌ erro ao atualizar:", e);
  }
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

 const dataObj = new Date(Number(p.data));

const hoje = new Date();
const ontem = new Date();
ontem.setDate(ontem.getDate() - 1);

let label;

if (dataObj.toDateString() === hoje.toDateString()) {
  label = "Hoje";
} else if (dataObj.toDateString() === ontem.toDateString()) {
  label = "Ontem";
} else {
  label = dataObj.toLocaleDateString("pt-BR");
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

  return (
  <div className="container">
    <div className="wrapper">

      {/* HEADER */}
     <div style={{
  background: "#fff",
  borderRadius: 24,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap"
}}>
  <div>
    <div style={{
      fontSize: 12,
      color: "#777",
      marginBottom: 6,
      fontWeight: 600,
      letterSpacing: 0.3
    }}>
      PAINEL DA LOJA
    </div>

    <h1 style={{
      margin: 0,
      fontSize: 28,
      color: "#111"
    }}>
      Loja Admin
    </h1>

    <div style={{
      marginTop: 10,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: lojaAberta ? "#e8f7ec" : "#fdecec",
      color: lojaAberta ? "#15803d" : "#b91c1c",
      padding: "8px 12px",
      borderRadius: 999,
      fontWeight: "bold",
      fontSize: 13
    }}>
      <span style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: lojaAberta ? "#16a34a" : "#dc2626"
      }} />
      {lojaAberta ? "Loja aberta" : "Loja fechada"}
    </div>
  </div>

  <button onClick={logout} style={{
    padding: "12px 18px",
    borderRadius: 14,
    border: "none",
    background: "#111",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }}>
    Sair
  </button>
</div>

      {/* MENU */}
      <div style={{
  display: "flex",
  gap: 10,
  overflowX: "auto",
  marginBottom: 20,
  paddingBottom: 4
}}>
  {[
    { id: "dashboard", nome: "Dashboard" },
    { id: "pedidos", nome: "Pedidos" },
    { id: "produtos", nome: "Produtos" },
    { id: "cupons", nome: "Cupons" },
    { id: "notificacoes", nome: "Notificações" },
    { id: "loja", nome: "Loja" }
  ].map(item => (
    <button
      key={item.id}
      onClick={() => setAbaAdmin(item.id)}
      style={{
        padding: "12px 16px",
        borderRadius: 14,
        border: abaAdmin === item.id ? "none" : "1px solid #e5e7eb",
        whiteSpace: "nowrap",
        background: abaAdmin === item.id ? "#ea1d2c" : "#fff",
        color: abaAdmin === item.id ? "#fff" : "#333",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: abaAdmin === item.id
          ? "0 8px 20px rgba(234,29,44,0.25)"
          : "0 4px 12px rgba(0,0,0,0.04)"
      }}
    >
      {item.nome}
    </button>
  ))}
</div>
       
      {/* DASHBOARD */}
      {abaAdmin === "dashboard" && (
  <div style={{
    marginTop: 15,
    padding: 18,
    background: "#f4f5f7",
    borderRadius: 20
  }}>

    {/* TOPO */}
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      border: "1px solid #ececec"
    }}>
      <h2 style={{
        margin: 0,
        color: "#111",
        fontSize: 24
      }}>
        Dashboard
      </h2>

      <p style={{
        marginTop: 6,
        marginBottom: 0,
        fontSize: 13,
        color: "#666"
      }}>
        Visão geral da loja, pedidos, faturamento e operação
      </p>
    </div>

    {/* CARDS RESUMO */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 16,
      marginBottom: 20
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}>
        <div style={{ fontSize: 13, color: "#777" }}>Pedidos em andamento</div>
        <div style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 8,
          color: "#111"
        }}>
          {pedidos.filter(p => p.status !== "entregue").length}
        </div>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}>
        <div style={{ fontSize: 13, color: "#777" }}>Faturamento</div>
        <div style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 8,
          color: "#111"
        }}>
          {formatarReal(totalFaturado)}
        </div>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}>
        <div style={{ fontSize: 13, color: "#777" }}>Produtos ativos</div>
        <div style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 8,
          color: "#111"
        }}>
          {produtos.filter(p => p.ativo).length}
        </div>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}>
        <div style={{ fontSize: 13, color: "#777" }}>Cupons</div>
        <div style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 8,
          color: "#111"
        }}>
          {cupons.length}
        </div>
      </div>
    </div>

    {/* AÇÃO RÁPIDA */}
    <button
      onClick={limparPedidos}
      style={{
        background: "#ef4444",
        color: "#fff",
        padding: 12,
        borderRadius: 12,
        border: "none",
        width: "98%",
        marginBottom: 16,
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(239,68,68,0.18)"
      }}
    >
      Limpar pedidos
    </button>

    {/* STATUS + FATURAMENTO */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 16,
      marginBottom: 16
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: 14,
          color: "#111"
        }}>
          Status da loja
        </h3>

        <div style={{
          marginBottom: 14,
          padding: 14,
          borderRadius: 16,
          background: lojaAberta ? "#e6fff1" : "#ffecec",
          color: lojaAberta ? "#15803d" : "#b91c1c",
          fontWeight: "bold",
          textAlign: "center",
          border: lojaAberta ? "1px solid #bbf7d0" : "1px solid #fecaca"
        }}>
          {lojaAberta === null
            ? "Carregando..."
            : lojaAberta
              ? "Loja aberta"
              : "Loja fechada"}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => toggleLoja(true)} style={btnSuccess}>
            Abrir
          </button>

          <button onClick={() => toggleLoja(false)} style={btnDanger}>
            Fechar
          </button>
        </div>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: 14,
          color: "#111"
        }}>
          Total faturado
        </h3>

        <div style={{
          fontSize: 34,
          fontWeight: "bold",
          color: "#111",
          marginBottom: 10
        }}>
          {formatarReal(totalFaturado)}
        </div>

        <div style={{
          fontSize: 13,
          color: "#666"
        }}>
          Soma total dos pedidos registrados no painel
        </div>
      </div>
    </div>

    {/* GRÁFICO */}
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: 20,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      border: "1px solid #ececec"
    }}>
      <h3 style={{
        marginTop: 0,
        marginBottom: 14,
        color: "#111"
      }}>
        Vendas por dia
      </h3>

      {Object.keys(vendasPorDia).length === 0 && (
        <div style={{
          textAlign: "center",
          color: "#666",
          padding: 20,
          background: "#fafafa",
          borderRadius: 14,
          border: "1px solid #eee"
        }}>
          Nenhuma venda registrada ainda
        </div>
      )}

      {Object.keys(vendasPorDia)
        .sort((a, b) => new Date(b) - new Date(a))
        .map(dia => (
          <div key={dia} style={{ marginBottom: 14 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              marginBottom: 6,
              color: "#111"
            }}>
              <strong>{dia}</strong>
              <span style={{ color: "#666" }}>
                {formatarReal(vendasPorDia[dia])}
              </span>
            </div>

            <div style={{
              width: "100%",
              height: 12,
              borderRadius: 999,
              background: "#eee",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${maxVenda ? (vendasPorDia[dia] / maxVenda) * 100 : 0}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg,#ea1d2c,#ff4d4d)"
              }} />
            </div>
          </div>
        ))}
    </div>
  </div>
)}

      {/* LOJA */}
     {abaAdmin === "loja" && (
  <div style={{
    marginTop: 15,
    padding: 18,
    background: "#f4f5f7",
    borderRadius: 20
  }}>

    {/* TOPO */}
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      border: "1px solid #ececec"
    }}>
      <h2 style={{
        margin: 0,
        color: "#111",
        fontSize: 24
      }}>
        Loja
      </h2>

      <p style={{
        marginTop: 6,
        marginBottom: 0,
        fontSize: 13,
        color: "#666"
      }}>
        Gerencie categorias, status da loja e logo
      </p>
    </div>

    {/* CATEGORIAS */}
    <div style={{
      background: "#fff",
      border: "1px solid #ececec",
      color: "#111",
      padding: 20,
      borderRadius: 20,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      marginBottom: 16
    }}>
      <h3 style={{
        marginTop: 0,
        marginBottom: 14,
        color: "#111"
      }}>
        Categorias
      </h3>

      {categorias.map(c => (
        <div
          key={c.id}
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 10,
            alignItems: "center",
            padding: 10,
            borderRadius: 14,
            background: "#fafafa",
            border: "1px solid #eee"
          }}
        >
          {editandoCategoriaId === c.id ? (
            <input
              value={editandoCategoria[c.id] || ""}
              onChange={(e) =>
                setEditandoCategoria(prev => ({
                  ...prev,
                  [c.id]: e.target.value
                }))
              }
              style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
            />
          ) : (
            <span style={{
              flex: 1,
              color: "#111",
              fontWeight: 500
            }}>
              {c.nome}
            </span>
          )}

          {editandoCategoriaId === c.id ? (
            <button
              onClick={() => salvarEdicaoCategoria(c.id)}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: "#16a34a",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Salvar
            </button>
          ) : (
            <button
              onClick={() => {
                setEditandoCategoriaId(c.id);
                setEditandoCategoria(prev => ({
                  ...prev,
                  [c.id]: c.nome
                }));
              }}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: "#ea1d2c",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Editar
            </button>
          )}
        </div>
      ))}

      {/* NOVA CATEGORIA */}
      <div style={{
        marginTop: 14,
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }}>
        <input
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          style={{
            ...input,
            flex: 1,
            minWidth: 180
          }}
        />

        <button
          onClick={criarCategoria}
          style={btnPrimary}
        >
          Criar
        </button>
      </div>

      {/* SELECT */}
      <div style={{ marginTop: 14 }}>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={inputStyle}
        >
          {categorias.map(c => (
            <option key={c.slug} value={c.slug}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* STATUS DA LOJA */}
    <div style={{
      background: "#fff",
      border: "1px solid #ececec",
      color: "#111",
      padding: 20,
      borderRadius: 20,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      marginBottom: 16
    }}>
      <h3 style={{
        marginTop: 0,
        marginBottom: 14,
        color: "#111"
      }}>
        Status da loja
      </h3>

      <div style={{
        marginBottom: 14,
        padding: 14,
        borderRadius: 16,
        background: lojaAberta ? "#e6fff1" : "#ffecec",
        color: lojaAberta ? "#15803d" : "#b91c1c",
        fontWeight: "bold",
        textAlign: "center",
        border: lojaAberta ? "1px solid #bbf7d0" : "1px solid #fecaca"
      }}>
        {lojaAberta === null
          ? "Carregando..."
          : lojaAberta
            ? "Loja aberta"
            : "Loja fechada"}
      </div>

      <div style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }}>
        <button onClick={() => toggleLoja(true)} style={btnSuccess}>
          Abrir
        </button>

        <button onClick={() => toggleLoja(false)} style={btnDanger}>
          Fechar
        </button>
      </div>
    </div>

    {/* LOGO */}
    <div style={{
      background: "#fff",
      border: "1px solid #ececec",
      color: "#111",
      padding: 20,
      borderRadius: 20,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
    }}>
      <h3 style={{
        marginTop: 0,
        marginBottom: 14,
        color: "#111"
      }}>
        Logo da loja
      </h3>

      <input
        placeholder="URL da logo"
        value={logoInput}
        onChange={(e) => setLogoInput(e.target.value)}
        style={input}
      />

      {logoInput && (
        <div style={{ marginTop: 14, marginBottom: 14 }}>
          <img
            src={logoInput}
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 20,
              border: "1px solid #eee",
              background: "#fff"
            }}
          />
        </div>
      )}

      <button onClick={salvarLogo} style={btnPrimary}>
        Salvar Logo
      </button>
    </div>

  </div>
)}

      {/* NOTIFICAÇÕES */}
      {abaAdmin === "notificacoes" && (
  <div style={{
    marginTop: 15,
    padding: 18,
    background: "#f4f5f7",
    borderRadius: 20
  }}>

    {/* TOPO */}
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      border: "1px solid #ececec"
    }}>
      <h2 style={{
        margin: 0,
        color: "#111",
        fontSize: 24
      }}>
        Notificações
      </h2>

      <p style={{
        marginTop: 6,
        marginBottom: 0,
        fontSize: 13,
        color: "#666"
      }}>
        Envie avisos para todos os clientes ou para um cliente específico
      </p>
    </div>

    {/* FORMULÁRIO */}
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      border: "1px solid #ececec"
    }}>
      <select
        value={clienteSelecionado}
        onChange={(e) => setClienteSelecionado(e.target.value)}
        style={input}
      >
        <option value="">Selecionar cliente</option>

        {clientes.map(c => (
          <option key={c.id} value={c.id}>
            {c.clienteNome || "Sem nome"} - {c.clienteTelefone || ""}
          </option>
        ))}
      </select>

      <h3 style={{
        marginTop: 16,
        marginBottom: 10,
        color: "#111"
      }}>
        Enviar notificação
      </h3>

      <input
        placeholder="Digite a notificação..."
        value={textoNotificacao}
        onChange={(e) => setTextoNotificacao(e.target.value)}
        style={input}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;

          const reader = new FileReader();

          reader.onload = () => {
            setImagemTemp(reader.result);
            setMostrarCrop(true);
          };

          reader.readAsDataURL(file);
        }}
        style={{
          ...input,
          background: "#fff",
          color: "#111",
          boxShadow: "none",
          cursor: "pointer",
          border: "1px solid #ddd"
        }}
      />

      {/* MODAL CROP */}
      {mostrarCrop && imagemTemp && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Cropper
              image={imagemTemp}
              crop={crop}
              zoom={zoom}
              aspect={2 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedPixels) => {
                setCroppedAreaPixels(croppedPixels);
              }}
            />
          </div>

          <div style={{
            padding: 20,
            background: "#fff"
          }}>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              style={{ width: "100%" }}
            />

            <div style={{
              display: "flex",
              gap: 10,
              marginTop: 10
            }}>
              <button
                onClick={() => setMostrarCrop(false)}
                style={btnSecondary}
              >
                Cancelar
              </button>

              <button
                onClick={async () => {
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");

                  const img = new Image();
                  img.src = imagemTemp;

                  await new Promise(resolve => img.onload = resolve);

                  canvas.width = croppedAreaPixels.width;
                  canvas.height = croppedAreaPixels.height;

                  ctx.drawImage(
                    img,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height
                  );

                  const base64 = canvas.toDataURL("image/jpeg", 0.8);

                  setImagemNotificacao(base64);
                  setMostrarCrop(false);
                }}
                style={btnPrimary}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW IMAGEM */}
      {imagemNotificacao && (
        <div style={{
          position: "relative",
          marginTop: 14,
          marginBottom: 12
        }}>
          <img
            src={imagemNotificacao}
            style={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              borderRadius: 16,
              border: "1px solid #ececec"
            }}
          />

          <div
            onClick={() => setImagemNotificacao("")}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14
            }}
          >
            ✕
          </div>
        </div>
      )}

      <select
        value={produtoSelecionado}
        onChange={(e) => setProdutoSelecionado(e.target.value)}
        style={input}
      >
        <option value="">Selecionar produto (opcional)</option>

        {produtos.map(p => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>

      <div style={{
        display: "flex",
        gap: 10,
        marginTop: 10,
        flexWrap: "wrap"
      }}>
        <button
          onClick={() => enviarNotificacao("todos")}
          style={btnPrimary}
        >
          Enviar para todos
        </button>

        <button
          onClick={() => enviarNotificacao("usuario")}
          style={btnSuccess}
        >
          Enviar para cliente
        </button>
      </div>
    </div>

    {/* LISTA */}
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: 18,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      border: "1px solid #ececec"
    }}>
      <h3 style={{
        marginTop: 0,
        marginBottom: 14,
        color: "#111"
      }}>
        Notificações enviadas
      </h3>

      {notificacoes.length === 0 && (
        <div style={{
          color: "#666",
          textAlign: "center",
          padding: 18,
          background: "#fafafa",
          borderRadius: 14,
          border: "1px solid #eee"
        }}>
          Nenhuma notificação
        </div>
      )}

      {notificacoes.map((n) => (
        <div
          key={n.id}
          style={{
            background: "#fff",
            padding: 14,
            borderRadius: 16,
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            border: "1px solid #ececec"
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 14,
              color: "#111",
              marginBottom: 4
            }}>
              {n.texto}
            </div>

            <div style={{
              fontSize: 11,
              color: "#888"
            }}>
              {n.data ? new Date(n.data).toLocaleString() : ""}
            </div>
          </div>

          <button
            onClick={() => removerNotificacao(n.id)}
            style={btnDangerSmall}
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  </div>
)}

      {/* CUPONS */}
      {abaAdmin === "cupons" && (
        <div style={card}>
          <h2>Criar cupom</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              placeholder="Código"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              style={input}
            />

            <input
              placeholder="Desconto (%)"
              type="number"
              value={desconto}
              onChange={e => setDesconto(e.target.value)}
              style={input}
            />

            <input
              type="date"
              value={validade}
              onChange={e => setValidade(e.target.value)}
              style={input}
            />

            <input
              placeholder="Limite"
              type="number"
              value={limite}
              onChange={e => setLimite(e.target.value)}
              style={input}
            />

            <button onClick={criarCupom} style={btnPrimary}>
              Criar cupom
            </button>
          </div>

          <h3 style={{ marginTop: 20 }}>Cupons criados</h3>

          {cupons.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 14,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
              }}
            >
              <div>
                <strong>{c.codigo}</strong>

                <div style={{ fontSize: 13, color: "#666" }}>
                  {c.desconto}% OFF
                </div>

                <div style={{ fontSize: 12, color: "#999" }}>
                  Uso: {c.usos ? Object.keys(c.usos).length : 0}/{c.limite || "∞"}
                </div>

                <div style={{ fontSize: 11, color: "#aaa" }}>
                  Validade: {c.validade}
                </div>
              </div>

              <button onClick={() => deletarCupom(c.id)} style={btnDangerSmall}>
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL PRODUTO */}
      {mostrarModalProduto && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 16,
    boxSizing: "border-box"
  }}>
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 24,
      width: "100%",
      maxWidth: 420,
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      border: "1px solid #eee",
      boxSizing: "border-box"
    }}>

      {/* TOPO */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{
          color: "#111",
          margin: 0,
          fontSize: 22
        }}>
          Criar / Editar Produto
        </h3>

        <p style={{
          marginTop: 6,
          marginBottom: 0,
          fontSize: 13,
          color: "#666"
        }}>
          Preencha os dados do produto e configure os extras
        </p>
      </div>

      {/* NOME */}
      <input
        placeholder="Nome"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
        style={inputStyle}
      />

      {/* CATEGORIA */}
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        style={inputStyle}
      >
        {categorias.map(c => (
          <option key={c.slug} value={c.slug}>
            {c.nome}
          </option>
        ))}
      </select>

      {/* PREÇO */}
      <input
        placeholder="Preço (ex: 12.90)"
        value={novoPreco}
        onChange={(e) => setNovoPreco(e.target.value)}
        style={inputStyle}
      />

      {/* TAMANHO */}
      <input
        placeholder="Tamanho"
        value={novoTamanho}
        onChange={(e) => setNovoTamanho(e.target.value)}
        style={inputStyle}
      />

      {/* DESCRIÇÃO */}
      <input
        placeholder="Descrição"
        value={novaDescricao}
        onChange={(e) => setNovaDescricao(e.target.value)}
        style={inputStyle}
      />

      {/* EXTRAS */}
      <div style={{
        marginTop: 18,
        marginBottom: 10,
        padding: 14,
        borderRadius: 18,
        background: "#f8f8f8",
        border: "1px solid #ececec"
      }}>
        <h3 style={{
          margin: 0,
          marginBottom: 10,
          color: "#111",
          fontSize: 18
        }}>
          ⚙️ Extras
        </h3>

        {/* NOVA CATEGORIA DE EXTRA */}
        <div style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 10
        }}>
          <input
            placeholder="Categoria (ex: Complementos)"
            value={novaCategoria}
            onChange={e => setNovaCategoria(e.target.value)}
            style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
          />

          <button
            onClick={() => {
              if (!novaCategoria) return;

              setExtras(prev => [
                ...prev,
                {
                  categoria: novaCategoria,
                  min: 0,
                  max: 5,
                  itens: []
                }
              ]);

              setNovaCategoria("");
            }}
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              border: "none",
              background: "#ea1d2c",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              flexShrink: 0
            }}
          >
            ➕
          </button>
        </div>

        {/* LISTA DOS GRUPOS */}
        {extras.map((grupo, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 16,
              marginTop: 12,
              border: "1px solid #ececec",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
            }}
          >
            {/* TOPO DO GRUPO */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10
            }}>
              <strong style={{ color: "#111" }}>
                {grupo.categoria}
              </strong>

              <button
                onClick={() => {
                  setExtras(prev => prev.filter((_, index) => index !== i));
                }}
                style={{
                  border: "none",
                  background: "#fee2e2",
                  color: "#b91c1c",
                  borderRadius: 10,
                  padding: "6px 10px",
                  cursor: "pointer"
                }}
              >
                ❌
              </button>
            </div>

            {/* ITENS */}
            {(grupo.itens || []).map((item, j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  gap: 6,
                  marginTop: 8,
                  alignItems: "center"
                }}
              >
                <input
                  placeholder="Nome"
                  value={item.nome}
                  onChange={(e) => {
                    const novo = [...extras];
                    novo[i].itens[j].nome = e.target.value;
                    setExtras(novo);
                  }}
                  style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
                />

                <input
                  type="number"
                  placeholder="R$"
                  value={item.preco / 100}
                  onChange={(e) => {
                    const novo = [...extras];
                    novo[i].itens[j].preco = Math.round(Number(e.target.value) * 100);
                    setExtras(novo);
                  }}
                  style={{
                    width: 80,
                    ...inputStyle,
                    marginBottom: 0
                  }}
                />

                <button
                  onClick={() => {
                    const novo = [...extras];
                    novo[i].itens.splice(j, 1);
                    setExtras(novo);
                  }}
                  style={{
                    border: "none",
                    background: "#fee2e2",
                    color: "#b91c1c",
                    borderRadius: 10,
                    padding: "10px 12px",
                    cursor: "pointer"
                  }}
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                const novo = [...extras];
                novo[i].itens.push({ nome: "", preco: 0 });
                setExtras(novo);
              }}
              style={{
                marginTop: 10,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #ddd",
                background: "#fff",
                color: "#111",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ➕ Item
            </button>
          </div>
        ))}
      </div>

      {/* IMAGEM */}
      <div style={{
        marginTop: 14,
        marginBottom: 12
      }}>
        <label style={{
          display: "block",
          fontSize: 13,
          color: "#666",
          marginBottom: 6
        }}>
          Imagem do produto
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onloadend = () => setNovaImagem(reader.result);
            reader.readAsDataURL(file);
          }}
          style={{
            width: "100%"
          }}
        />
      </div>

      {/* PREVIEW IMAGEM */}
      {novaImagem && (
        <div style={{ marginBottom: 14 }}>
          <img
            src={novaImagem}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderRadius: 16,
              border: "1px solid #eee"
            }}
          />
        </div>
      )}

      {/* MAIS VENDIDO */}
      <label style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "#111",
        marginBottom: 16,
        fontWeight: "bold"
      }}>
        <input
          type="checkbox"
          checked={maisVendido}
          onChange={(e) => setMaisVendido(e.target.checked)}
        />
        🔥 Mais vendido
      </label>

      {/* BOTÕES */}
      <div style={{
        display: "flex",
        gap: 10,
        marginTop: 4
      }}>
        <button onClick={salvarProduto} style={btnPrimary}>
          💾 Salvar
        </button>

        <button
          onClick={() => setMostrarModalProduto(false)}
          style={btnCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

      {/* PRODUTOS */}
      {abaAdmin === "produtos" && (
        <div className="card">
          <h2>🍧 Produtos</h2>

          <button
            onClick={() => setMostrarModalProduto(true)}
            style={{
              marginBottom: 10,
              padding: 14,
              borderRadius: 14,
              background: "linear-gradient(90deg,#ea1d2c,#ff4d4d)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold",
              fontSize: 15,
              boxShadow: "0 6px 20px rgba(234,29,44,0.3)"
            }}
          >
            ➕ Novo Produto
          </button>

          {produtos.length === 0 ? (
            <p style={{ opacity: 0.6 }}>Nenhum produto cadastrado</p>
          ) : (
            produtos.map(p => (
              <div
  key={p.id}
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 18,
    background: "#fff",
    marginBottom: 12,
    border: "1px solid #ececec",
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
  }}
>
  <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}>
    <img
      src={p.imagem || "/acai.png"}
      style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        objectFit: "cover"
      }}
    />

    <div style={{ flex: 1 }}>
      <strong style={{ fontSize: 15, color: "#111" }}>{p.nome}</strong>

      <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
        {formatarReal(p.preco)} • {p.tamanho || "Sem tamanho"}
      </div>

      <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginTop: 6
      }}>
        <span style={{
          padding: "4px 8px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: "bold",
          background: p.ativo ? "#e8f7ec" : "#fdecec",
          color: p.ativo ? "#15803d" : "#b91c1c"
        }}>
          {p.ativo ? "Ativo" : "Inativo"}
        </span>

        {p.maisVendido && (
          <span style={{
            padding: "4px 8px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: "bold",
            background: "#fff1f2",
            color: "#e11d48"
          }}>
            Mais vendido
          </span>
        )}

        {p.extras?.length > 0 && (
          <span style={{
            padding: "4px 8px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: "bold",
            background: "#f3f4f6",
            color: "#555"
          }}>
            {p.extras.length} grupos de extras
          </span>
        )}
      </div>
    </div>
  </div>

  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 44px)",
    gap: 8
  }}>
    <button onClick={() => abrirEdicao(p)}>✏️</button>
    <button onClick={() => toggleProduto(p)}>{p.ativo ? "🚫" : "✅"}</button>
    <button onClick={() => moverProduto(p, -1)}>⬆️</button>
    <button onClick={() => moverProduto(p, 1)}>⬇️</button>
    <button onClick={() => excluirProduto(p)} style={{
      gridColumn: "1 / span 2",
      background: "#ef4444"
    }}>
      🗑️
    </button>
  </div>
</div>
            ))
          )}
        </div>
      )}

      {/* PEDIDOS */}
{abaAdmin === "pedidos" && (
  <div style={{
    marginTop: 15,
    padding: 18,
    background: "#f4f5f7",
    borderRadius: 20
  }}>

    {/* TOPO */}
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      border: "1px solid #ececec"
    }}>
      <h2 style={{
        margin: 0,
        color: "#111",
        fontSize: 24
      }}>
        Pedidos
      </h2>

      <p style={{
        marginTop: 6,
        marginBottom: 14,
        fontSize: 13,
        color: "#666"
      }}>
        Acompanhe pedidos em andamento e entregues em tempo real
      </p>

      <input
        placeholder="Buscar por código (#ABC123)"
        value={buscaCodigo}
        onChange={e => setBuscaCodigo(e.target.value)}
        style={{
          marginBottom: 0,
          padding: 12,
          width: "100%",
          borderRadius: 12,
          border: "1px solid #ddd",
          outline: "none",
          background: "#fff",
          color: "#111",
          boxSizing: "border-box"
        }}
      />
    </div>

    {/* GRID */}
    <div className="gridPedidos">

      {/* EM ANDAMENTO */}
      <div className="coluna">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14
        }}>
          <h3 style={{
            margin: 0,
            color: "#111"
          }}>
            ⚪ Em andamento
          </h3>

          <span style={{
            background: "#eef2ff",
            color: "#4338ca",
            padding: "6px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: "bold"
          }}>
            {
              pedidos
                .filter(p => {
                  if (!buscaCodigo) return true;
                  return (p.codigo || "")
                    .toLowerCase()
                    .includes(buscaCodigo.toLowerCase());
                })
                .filter(p => p.status !== "entregue")
                .length
            }
          </span>
        </div>

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
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: 14,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                  border: "1px solid #ececec",
                  color: "#111"
                }}
              >
                <div style={{ marginBottom: 8 }}>
                  <strong>{p.cliente?.nome || "Cliente"}</strong><br />
                  <small>📞 {p.cliente?.telefone}</small><br />
                  <small>
                    📍 {p.cliente?.endereco}, {p.cliente?.numero}
                  </small>
                </div>

                <p style={{ margin: "8px 0" }}>
                  Código: <strong>{p.codigo || "—"}</strong>
                </p>

                {Array.isArray(p.itens) && p.itens.length > 0 ? (
                  p.itens.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: 6 }}>
                      <p style={{ margin: "4px 0" }}>
                        <strong>
                          {item.produto?.nome || item.nome || "Açaí"} (x{item.quantidade || 1})
                        </strong>
                      </p>

                      {Array.isArray(item.extras) && item.extras.map((e, i) => (
                        <p key={i} style={{ fontSize: 12, opacity: 0.7, margin: "2px 0" }}>
                          + {e.nome}
                        </p>
                      ))}
                    </div>
                  ))
                ) : (
                  <p style={{ margin: "4px 0" }}>
                    <strong>
                      {p.produto?.nome || "Açaí"} (x{p.quantidade || 1})
                    </strong>
                  </p>
                )}

                <p style={{ margin: "8px 0" }}>
                  Status:
                  <strong style={{ marginLeft: 6, color: cores[status] }}>
                    {status}
                  </strong>
                </p>

                <p style={{ margin: "8px 0" }}>
                  Pagamento:
                  <span style={{
                    background:
                      p.formaPagamento === "pix" ? "#a855f7" :
                      p.formaPagamento === "dinheiro" ? "#22c55e" :
                      "#3b82f6",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: 8,
                    fontSize: 12,
                    marginLeft: 6
                  }}>
                    {p.formaPagamento === "pix" && "Pix"}
                    {p.formaPagamento === "dinheiro" && "Dinheiro"}
                    {p.formaPagamento === "cartao" && "Cartão"}
                  </span>
                </p>

                <p style={{ margin: "8px 0" }}>
                  Total: <strong>{formatarReal(p.total)}</strong>
                </p>

                <small style={{ color: "#666" }}>
                  {p.data ? new Date(p.data).toLocaleString("pt-BR") : ""}
                </small>

                <div style={{
                  display: "flex",
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

        {pedidos
          .filter(p => {
            if (!buscaCodigo) return true;
            return (p.codigo || "")
              .toLowerCase()
              .includes(buscaCodigo.toLowerCase());
          })
          .filter(p => p.status !== "entregue")
          .length === 0 && (
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              color: "#666",
              textAlign: "center",
              border: "1px solid #ececec"
            }}>
              Nenhum pedido em andamento
            </div>
          )}
      </div>

      {/* ENTREGUES */}
      <div className="coluna">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14
        }}>
          <h3 style={{
            margin: 0,
            color: "#111"
          }}>
            🟢 Entregues
          </h3>

          <span style={{
            background: "#ecfdf3",
            color: "#15803d",
            padding: "6px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: "bold"
          }}>
            {
              pedidos
                .filter(p => {
                  if (!buscaCodigo) return true;
                  return (p.codigo || "")
                    .toLowerCase()
                    .includes(buscaCodigo.toLowerCase());
                })
                .filter(p => p.status === "entregue")
                .length
            }
          </span>
        </div>

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
            <div
              key={p.id}
              style={{
                opacity: 0.9,
                borderLeft: "5px solid #00c853",
                marginBottom: 15,
                background: "#ffffff",
                borderRadius: 16,
                padding: 14,
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                border: "1px solid #ececec",
                color: "#111"
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <strong>{p.cliente?.nome || "Cliente"}</strong><br />
                <small>📞 {p.cliente?.telefone}</small><br />
                <small>
                  📍 {p.cliente?.endereco}, {p.cliente?.numero}
                </small>
              </div>

              <p style={{ margin: "8px 0" }}>
                Código: <strong>{p.codigo || "—"}</strong>
              </p>

              {p.itens?.map((item, idx) => (
                <p key={idx} style={{ margin: "4px 0" }}>
                  <strong>
                    {item.produto?.nome || item.nome || "Açaí"} (x{item.quantidade || 1})
                  </strong>
                </p>
              ))}

              <p style={{ margin: "8px 0" }}>
                Total: <strong>{formatarReal(p.total)}</strong>
              </p>

              <small style={{ color: "#666" }}>
                {p.data ? new Date(p.data).toLocaleString("pt-BR") : ""}
              </small>
            </div>
          ))}

        {pedidos
          .filter(p => {
            if (!buscaCodigo) return true;
            return (p.codigo || "")
              .toLowerCase()
              .includes(buscaCodigo.toLowerCase());
          })
          .filter(p => p.status === "entregue")
          .length === 0 && (
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              color: "#666",
              textAlign: "center",
              border: "1px solid #ececec"
            }}>
              Nenhum pedido entregue
            </div>
          )}
      </div>

    </div>
  </div>
)}

      <style jsx>{`
  .container {
    background: #f4f5f7;
    min-height: 100vh;
    padding: 20px;
    color: #111;
    display: flex;
    justify-content: center;
  }

  .wrapper {
    width: 100%;
    max-width: 1200px;
  }

  .content {
    width: 100%;
    max-width: 1200px;
  }

  .card {
    margin-top: 15px;
    padding: 18px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #ececec;
    box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  }

  .graficoItem {
    margin-bottom: 12px;
  }

  .barra {
    height: 10px;
    border-radius: 10px;
    background: linear-gradient(90deg,#ea1d2c,#ff4d4d);
    margin: 5px 0;
    transition: 0.3s;
  }

  .gridPedidos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .coluna {
  min-width: 0;
  background: #ffffff;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  border: 1px solid #ececec;
}

  button {
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background: linear-gradient(90deg,#ea1d2c,#ff4d4d);
    color: white;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .container {
      padding: 14px;
    }

    .gridPedidos {
      grid-template-columns: 1fr;
    }
  }
`}</style>

    </div>
  </div>
);
}