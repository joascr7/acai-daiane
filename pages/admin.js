import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Cropper from "react-easy-crop";

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

  // 🔍 BUSCA
  const [buscaCodigo, setBuscaCodigo] = useState("");

  // 🔔 SOM
function tocarSom() {
  console.log("🔔 novo pedido");

  // 🔥 se quiser som real depois:
  // const audio = new Audio("/notificacao.mp3");
  // audio.play();
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
    await setDoc(doc(db, "config", "loja"), {
    extras
    }, { merge: true });

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
    setCategorias(snap.docs.map(doc => doc.data()));
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
  setNovoNome(p.nome || "");
  setNovoPreco((p.preco || 0) / 100);
  setNovoTamanho(p.tamanho || "");
  setNovaDescricao(p.descricao || "");
  setNovaImagem(p.imagem || "");
  setMaisVendido(p.maisVendido || false);

  // 🔥 CORREÇÃO AQUI (ESSENCIAL)
  setExtras(p.extras || []);

  setEditandoProduto(p);
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
  preco: converterParaCentavos(novoPreco),
  tamanho: novoTamanho,
  descricao: novaDescricao,
  imagem: novaImagem,
  ativo: true,
  maisVendido: maisVendido,
  categoria: categoria
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
  setExtras([]);
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

useEffect(() => {
  async function carregarExtras() {
    try {
      const snap = await getDoc(doc(db, "config", "loja"));

      if (snap.exists()) {
        setExtras(snap.data().extras || []);
      }
    } catch (err) {
      console.log("Erro ao carregar extras:", err);
    }
  }

  carregarExtras();
}, []);

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


<div style={{
  background: "#111",
  padding: 20,
  borderRadius: 16,
  marginTop: 20
}}>


  <select
  value={clienteSelecionado}
  onChange={(e) => setClienteSelecionado(e.target.value)}
  style={{
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  }}
>

  <option value="">Selecionar cliente</option>

  {clientes.map(c => (
    <option key={c.id} value={c.id}>
      {c.clienteNome || "Sem nome"} - {c.clienteTelefone || ""}
    </option>
  ))}

</select>

  <h3 style={{ marginBottom: 10 }}>🔔 Enviar notificação</h3>

  {/* INPUT */}
  <input
    placeholder="Digite a notificação..."
    value={textoNotificacao}
    onChange={(e) => setTextoNotificacao(e.target.value)}
    style={{
      width: "100%",
      padding: 10,
      borderRadius: 10,
      border: "none",
      marginBottom: 10
    }}
  />

  <input
  type="file"
  accept="image/*"
  onChange={(e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImagemTemp(reader.result); // 🔥 salva temporária
      setMostrarCrop(true);         // 🔥 abre modal
    };

    reader.readAsDataURL(file);
  }}
  style={{
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    background: "#222",
    color: "#fff"
  }}
/>


{/* 🔥 CORTE DE IMAGEM UPLOAD */}
{mostrarCrop && imagemTemp && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.9)",
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

    <div style={{ padding: 20, background: "#111" }}>

      <input
        type="range"
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(e) => setZoom(e.target.value)}
        style={{ width: "100%" }}
      />

      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>

        <button onClick={() => setMostrarCrop(false)}>
          ❌ Cancelar
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

            setImagemNotificacao(base64); // 🔥 salva FINAL
            setMostrarCrop(false);

          }}
        >
          💾 Salvar
        </button>

      </div>

    </div>

  </div>
)}

{/* 🔥 AQUI (PREVIEW) */}
{imagemNotificacao && (
  <img
    src={imagemNotificacao}
    style={{
      width: "100%",
      height: 130,
      objectFit: "cover",
      borderRadius: 12,
      marginBottom: 10,
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
    }}
  />
)}

{imagemNotificacao && (
  <button
    onClick={() => setImagemNotificacao("")}
    style={{
      width: "100%",
      padding: 10,
      borderRadius: 10,
      border: "none",
      background: "#ff0033",
      color: "#fff",
      marginBottom: 10,
      cursor: "pointer"
    }}
  >
    ❌ Remover imagem
  </button>
)}

{/* 🔥 AQUI ENTRA O SELECT */}
<select
  value={produtoSelecionado}
  onChange={(e) => setProdutoSelecionado(e.target.value)}
  style={{
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  }}
>
  <option value="">Selecionar produto (opcional)</option>

  {produtos.map(p => (
    <option key={p.id} value={p.id}>
      {p.nome}
    </option>
  ))}

</select>

  {/* BOTÕES */}
  <div style={{ display: "flex", gap: 10 }}>

    <button
      onClick={() => enviarNotificacao("todos")}
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 10,
        border: "none",
        background: "#6a00ff",
        color: "#fff",
        fontWeight: "bold"
      }}
    >
      📢 Enviar para TODOS
    </button>

    <button
  onClick={() => enviarNotificacao("usuario")}
  style={{
    width: "100%",
    padding: 10,
    borderRadius: 10,
    background: "#00c853",
    color: "#fff",
    fontWeight: "bold"
  }}
>
  👤 Enviar para cliente
</button>

  </div>

</div>

<div style={{ marginTop: 20 }}>

  <h3>📩 Notificações enviadas</h3>

  {notificacoes.length === 0 && (
    <p>Nenhuma notificação</p>
  )}

  {notificacoes.map((n) => (

    <div key={n.id} style={{
      background: "#1a1a1a",
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10
    }}>

      <div style={{ flex: 1 }}>

        {/* TEXTO */}
        <div style={{ fontSize: 14 }}>
          {n.texto}
        </div>

        {/* DATA */}
        <div style={{
          fontSize: 11,
          opacity: 0.6
        }}>
          {n.data ? new Date(n.data).toLocaleString() : ""}
        </div>

      </div>

      {/* 🗑️ REMOVER */}
      <button
        onClick={() => removerNotificacao(n.id)}
        style={{
          background: "#ff0033",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "6px 10px",
          cursor: "pointer"
        }}
      >
        🗑️
      </button>

    </div>

  ))}

</div>

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
         {formatarReal(totalFaturado)}
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
          {formatarReal(vendasPorDia[dia])}
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
{/* 🔥 nova categoria */}
      <select
       value={categoria}
       onChange={(e) => setCategoria(e.target.value)}
       >
      {categorias.map(c => (
      <option key={c.slug} value={c.slug}>
      {c.nome}
      </option>
       ))}
      </select>

      {/* 🔥 nova categoria */}
      <input
  placeholder="Nova categoria (ex: Açaí)"
  value={novaCategoria}
  onChange={(e) => setNovaCategoria(e.target.value)}
/>

<button onClick={criarCategoria}>
  ➕ Criar Categoria
</button>

      {/* 🔥 PREÇO */}
      <input
        placeholder="Preço"
        value={novoPreco}
        onChange={(e) => setNovoPreco(e.target.value)}
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

   {extras.map((e, i) => (
  <div key={i}>
    {e.nome} - {formatarReal(e.preco)}

    <button onClick={() => {
      setExtras(prev => prev.filter((_, index) => index !== i));
    }}>
      ❌
    </button>
  </div>
))}

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

      <h4 style={{ marginTop: 10 }}>Extras</h4>

<input
  placeholder="Nome do extra"
  value={extraNome}
  onChange={(e) => setExtraNome(e.target.value)}
/>

<input
  placeholder="Preço (ex: 1,50)"
  value={extraPreco}
  onChange={(e) => setExtraPreco(e.target.value)}
/>

<button
  onClick={() => {
    if (!extraNome || !extraPreco) return;

    setExtras(prev => [
      ...prev,
      {
        nome: extraNome,
        preco: converterParaCentavos(extraPreco)
      }
    ]);

    setExtraNome("");
    setExtraPreco("");
  }}
>
  ➕ Adicionar Extra
</button>


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



  {/* 🔥 EXTRAS GLOBAIS */}
<div style={{
  marginTop: 30,
  background: "#1a1a1a",
  padding: 20,
  borderRadius: 16
}}>

<h3>🍧 Extras (Categorias)</h3>

{/* NOVA CATEGORIA */}
<div style={{ display: "flex", gap: 10 }}>
  <input
    placeholder="Categoria"
    value={novaCategoria}
    onChange={e => setNovaCategoria(e.target.value)}
  />

  <input
    placeholder="Min"
    type="number"
    value={min}
    onChange={e => setMin(e.target.value)}
  />

  <input
    placeholder="Max"
    type="number"
    value={max}
    onChange={e => setMax(e.target.value)}
  />

  <button onClick={adicionarCategoria}>+</button>
</div>

{/* LISTA */}
{extras.map((cat, i) => (
  <div key={i} style={{
    background: "#1a1a1a",
    padding: 15,
    borderRadius: 12,
    marginTop: 10
  }}>

    {/* 🔥 HEADER CORRETO */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>

      <strong style={{
        color: cat.min > 0 ? "#ff3d00" : "#fff"
      }}>
        {cat.categoria} {cat.min > 0 && "⚠️ obrigatório"}
      </strong>

      {/* ❌ BOTÃO REMOVER */}
      <button
        onClick={() => removerCategoria(i)}
        style={{
          background: "rgba(255,0,0,0.1)",
          border: "none",
          borderRadius: 8,
          padding: "4px 8px",
          cursor: "pointer",
          color: "#ff3d00",
          fontWeight: "bold"
        }}
      >
        ❌
      </button>

    </div>

    {/* 🔥 PREVIEW (AGORA NO LUGAR CERTO) */}
    <div style={{
      marginTop: 10,
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }}>
      {(cat.itens || []).map((item, j) => (
        <div key={j} style={{
          background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 11
        }}>
          {item.nome}
        </div>
      ))}
    </div>


{(cat.itens || []).map((item, j) => (
  <div key={j} style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8
  }}>

    {/* 🔥 NOME */}
    <input
      value={item.nome}
      onChange={e => editarItem(i, j, "nome", e.target.value)}
      style={{
        flex: 1,
        padding: 8,
        borderRadius: 8
      }}
    />

    {/* 💰 PREÇO */}
    <input
      type="number"
      value={item.preco || ""}
      onChange={e => editarItem(i, j, "preco", e.target.value)}
      style={{
        width: 90,
        padding: 8,
        borderRadius: 8
      }}
    />

    {/* 🔼 */}
    <button onClick={() => moverItem(i, j, -1)}>⬆️</button>

    {/* 🔽 */}
    <button onClick={() => moverItem(i, j, 1)}>⬇️</button>

    {/* ❌ */}
    <button onClick={() => removerItem(i, j)}>❌</button>

  </div>
))}

    <div style={{ display: "flex", gap: 10 }}>
      <input
        placeholder="Nome"
        value={novoItem[i]?.nome || ""}
        onChange={e =>
          setNovoItem(prev => ({
            ...prev,
            [i]: { ...prev[i], nome: e.target.value }
          }))
        }
      />

      <input
        placeholder="Preço (200)"
        value={novoItem[i]?.preco || ""}
        onChange={e =>
          setNovoItem(prev => ({
            ...prev,
            [i]: { ...prev[i], preco: e.target.value }
          }))
        }
      />

      <button onClick={() => adicionarItem(i)}>+</button>
    </div>

  </div>
))}

<button onClick={salvarExtras}>
  💾 Salvar Extras
</button>

</div>

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
            {formatarReal(p.preco)} • {p.tamanho || ""}
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
                Total: <strong> {formatarReal(p.total)}</strong>
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
              Total: <strong> {formatarReal(p.total)}</strong>
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