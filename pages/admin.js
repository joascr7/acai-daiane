

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cropper from "react-easy-crop";
import Head from "next/head";

import { getApp } from "firebase/app";
import { dbAdmin as db, authAdmin as auth } from "../services/firebaseDual";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  where,
  query,
  setDoc
} from 'firebase/firestore';

import {
  onAuthStateChanged,
  signOut
} from 'firebase/auth';


import {
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Power,
  PowerOff,
  Package,
  Star,
  Layers3,
  ChevronUp,
  ChevronDown,
  ImagePlus,
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  ClipboardList,
  ShoppingBag,
  Tag,
  ArrowRight,
  Home,
  DollarSign,
  Store,
  Bell,
  Truck,
  CircleDollarSign
} from "lucide-react";




import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

import { motion } from "framer-motion";

import {
  DndContext, closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";



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


const badgePend = {
  background: "#fff7ed",
  color: "#ea580c",
  padding: "8px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800
};

const badgeOk = {
  background: "#ecfdf3",
  color: "#15803d",
  padding: "8px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800
};

const cardResumo = {
  background: "#fff",
  borderRadius: 14,
  padding: 14,
  display: "flex",
  flexDirection: "column",
  gap: 6,
  border: "1px solid #e5e7eb",
  color: "#111"
};

const cardBox = {
  background: "#fff",
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  border: "1px solid #e5e7eb"
};

const linha = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
  color: "#111"
};

const btnEdit = {
  background: "#e5e7eb",
  border: "none",
  borderRadius: 8,
  padding: "6px 10px",
  cursor: "pointer",
  fontWeight: 600
};

const btnDelete = {
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "6px 10px",
  cursor: "pointer",
  fontWeight: 600
};


const cardMini = {
  background: "#ffffff",
  padding: 16,
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const titleMini = {
  margin: 0,
  fontSize: 14,
  fontWeight: 700
};

const rowMini = {
  display: "flex",
  gap: 6,
  alignItems: "center"
};

const inputMini = {
  flex: 1,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  fontSize: 14
};

const btnMini = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "none",
  background: "#f3f4f6",
  color: "#111",
  fontSize: 12,
  cursor: "pointer"
};

const btnPrimaryMini = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "none",
  background: "#ea1d2c",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const btnSuccessMini = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "none",
  background: "#16a34a",
  color: "#fff",
  fontWeight: 700
};

const btnDangerMini = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "none",
  background: "#dc2626",
  color: "#fff",
  fontWeight: 700
};

const navBtn = {
  flex: 1,
  border: "none",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  height: 48,
  cursor: "pointer"
};

const badgeStyle = {
  position: "absolute",
  top: 2,
  right: "25%",
  background: "#ea1d2c",
  color: "#fff",
  borderRadius: 999,
  fontSize: 9,
  padding: "2px 5px",
  fontWeight: 800
};


const MotionCard = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    style={styles.card}
  >
    {children}
  </motion.div>
);

function SortableCard({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
    background: "linear-gradient(180deg,#eef2f7,#e2e8f0)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16
  },

  gridTop: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12
  },

  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },

  cta: {
    marginTop: 16,
    padding: 16,
    background: "#111827",
    color: "#fff",
    borderRadius: 16,
    textAlign: "center",
    cursor: "pointer"
  }
};

  const router = useRouter();

  const [produtoEditandoId, setProdutoEditandoId] = useState(null);
const [toast, setToast] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [novosPedidos, setNovosPedidos] = useState([]);
  const [primeiraCarga, setPrimeiraCarga] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [lojaAberta, setLojaAberta] = useState(null);
  const [loadingLoja, setLoadingLoja] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [desconto, setDesconto] = useState("");
  const [logoInput, setLogoInput] = useState("");
const [vendasManuais, setVendasManuais] = useState([]);
const [mostrarModalVenda, setMostrarModalVenda] = useState(false);
const [novaVendaDesc, setNovaVendaDesc] = useState("");
const [novaVendaValor, setNovaVendaValor] = useState("");
const [editandoVenda, setEditandoVenda] = useState(null);
const [editandoGasto, setEditandoGasto] = useState(null);

  const [fidelidade, setFidelidade] = useState(false);

  const [produtoOrigemExtras, setProdutoOrigemExtras] = useState("");


  const [gastos, setGastos] = useState([]);
const [mostrarModalGasto, setMostrarModalGasto] = useState(false);
const [gastoEditandoId, setGastoEditandoId] = useState(null);

const [novoGastoNome, setNovoGastoNome] = useState("");
const [novoGastoValor, setNovoGastoValor] = useState("");
const [novaCategoriaGasto, setNovaCategoriaGasto] = useState("insumos");
const [novaDataGasto, setNovaDataGasto] = useState("");
const [novaObservacaoGasto, setNovaObservacaoGasto] = useState("");
const [loadingGasto, setLoadingGasto] = useState(false);

const [abrirMaisMenu, setAbrirMaisMenu] = useState(false);


const [banners, setBanners] = useState([]);
const [bannerTitulo, setBannerTitulo] = useState("");
const [bannerSubtitulo, setBannerSubtitulo] = useState("");
const [bannerImagemFile, setBannerImagemFile] = useState(null);
const [bannerPreview, setBannerPreview] = useState("");
const [bannerLoading, setBannerLoading] = useState(false);
const [bannerEditandoId, setBannerEditandoId] = useState(null);

const [filtroAvaliacao, setFiltroAvaliacao] = useState("todas");
const [busca, setBusca] = useState("");


  const [notificacoesAdmin, setNotificacoesAdmin] = useState([]);
  const [fretes, setFretes] = useState([]);
const [bairroFrete, setBairroFrete] = useState("");
const [valorFrete, setValorFrete] = useState("");
const [freteEditandoId, setFreteEditandoId] = useState(null);
const [loadingFrete, setLoadingFrete] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [novaDescricaoTamanho, setNovaDescricaoTamanho] = useState("");

  const [promocaoAtiva, setPromocaoAtiva] = useState(false);
  const [novoPrecoPromocional, setNovoPrecoPromocional] = useState("");
  
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


  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  if (typeof window !== "undefined") {
    const check = () => setIsMobile(window.innerWidth <= 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }
}, []);

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
  const [produtoNotificacao, setProdutoNotificacao] = useState("");
 const [aberto, setAberto] = useState(null);
 // 🔥 AGRUPA POR CLIENTE
const pedidosCancelados = pedidos.filter(p => p.status === "cancelado");

const agrupados = pedidosCancelados.reduce((acc, p) => {
  const nome = p?.cliente?.nome || "Cliente";

  if (!acc[nome]) {
    acc[nome] = [];
  }

  acc[nome].push(p);

  return acc;
}, {});
  const [resgate, setResgate] = useState(false);


  const [mostrarAvaliacao, setMostrarAvaliacao] = useState(false);
const [novaAvaliacao, setNovaAvaliacao] = useState("");
const [novoTotalAvaliacoes, setNovoTotalAvaliacoes] = useState("");
const [avaliacoes, setAvaliacoes] = useState([]);
  
  
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

useEffect(() => {
  const liberarAudio = () => {
    const audio = new Audio("/notificacao.mp3");
    audio.volume = 0;
    audio.play().catch(() => {});
    window.removeEventListener("click", liberarAudio);
  };

  window.addEventListener("click", liberarAudio);

  return () => {
    window.removeEventListener("click", liberarAudio);
  };
}, []);


  // 🔍 BUSCA
  const [buscaCodigo, setBuscaCodigo] = useState("");

  // 🔔 SOM
function tocarSom() {
  try {
    const audio = new Audio("/notificacao.mp3");
    audio.volume = 1;
    audio.play().catch(() => {});
  } catch (e) {
    console.log("Erro ao tocar som");
  }
}



useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "banners"), (snapshot) => {
    const lista = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data()
    }));

    lista.sort((a, b) => Number(a?.ordem || 0) - Number(b?.ordem || 0));

    setBanners(lista);
  });

  return () => unsubscribe();
}, []);




function limparFormularioBanner() {
  setBannerTitulo("");
  setBannerSubtitulo("");
  setBannerImagemFile(null);
  setBannerPreview("");
  setBannerEditandoId(null);
}

function abrirEdicaoBanner(item) {
  setBannerEditandoId(item.id);
  setBannerTitulo(item?.titulo || "");
  setBannerSubtitulo(item?.subtitulo || "");
  setBannerPreview(item?.imagem || "");
  setBannerImagemFile(null);
}

async function salvarBanner() {
  const titulo = String(bannerTitulo || "").trim();
  const subtitulo = String(bannerSubtitulo || "").trim();

  if (!titulo) {
    setToast({
      tipo: "erro",
      texto: "Preencha o título do banner."
    });
    setTimeout(() => setToast(null), 2200);
    return;
  }

  if (!bannerPreview) {
    setToast({
      tipo: "erro",
      texto: "Selecione uma imagem para o banner."
    });
    setTimeout(() => setToast(null), 2200);
    return;
  }

  try {
    setBannerLoading(true);

    const payload = {
      titulo,
      subtitulo,
      imagem: bannerPreview,
      ativo: true,
      ordem: Date.now(),
      criadoEm: Date.now()
    };

    if (bannerEditandoId) {
      await updateDoc(doc(db, "banners", bannerEditandoId), {
        titulo,
        subtitulo,
        imagem: bannerPreview
      });

      setToast({
        tipo: "sucesso",
        texto: "Banner atualizado com sucesso."
      });
    } else {
      await addDoc(collection(db, "banners"), payload);

      setToast({
        tipo: "sucesso",
        texto: "Banner adicionado com sucesso."
      });
    }

    setTimeout(() => setToast(null), 2200);
    limparFormularioBanner();
  } catch (e) {
    console.log("ERRO AO SALVAR BANNER:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao salvar banner."
    });
    setTimeout(() => setToast(null), 2200);
  } finally {
    setBannerLoading(false);
  }
}


function GraficoVendas({ data }) {
  return (
    <div style={styles.card}>
      <h3>Vendas por dia</h3>

      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip formatter={(v) => formatarReal(v)} />
            <Line
              dataKey="valor"
              stroke="#ea1d2c"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

async function alternarStatusBanner(item) {
  try {
    await updateDoc(doc(db, "banners", item.id), {
      ativo: item?.ativo === false ? true : false
    });

    setToast({
      tipo: "sucesso",
      texto: item?.ativo === false
        ? "Banner ativado."
        : "Banner desativado."
    });
    setTimeout(() => setToast(null), 2200);
  } catch (e) {
    console.log("ERRO AO ATUALIZAR BANNER:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao atualizar banner."
    });
    setTimeout(() => setToast(null), 2200);
  }
}

async function excluirBanner(item) {
  try {
    if (item?.imagem && item.imagem.includes("firebasestorage")) {
      try {
        const caminho = decodeURIComponent(item.imagem.split("/o/")[1].split("?")[0]);
        const imagemRef = ref(storage, caminho);
        await deleteObject(imagemRef);
      } catch (e) {
        console.log("Não foi possível remover imagem do Storage:", e);
      }
    }

    await deleteDoc(doc(db, "banners", item.id));

    if (bannerEditandoId === item.id) {
      limparFormularioBanner();
    }

    setToast({
      tipo: "sucesso",
      texto: "Banner removido com sucesso."
    });
    setTimeout(() => setToast(null), 2200);
  } catch (e) {
    console.log("ERRO AO EXCLUIR BANNER:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao excluir banner."
    });
    setTimeout(() => setToast(null), 2200);
  }
}

async function moverBanner(item, direcao) {
  const index = banners.findIndex((b) => b.id === item.id);
  const novoIndex = index + direcao;

  if (novoIndex < 0 || novoIndex >= banners.length) return;

  const bannerDestino = banners[novoIndex];

  try {
    await updateDoc(doc(db, "banners", item.id), {
      ordem: bannerDestino.ordem
    });

    await updateDoc(doc(db, "banners", bannerDestino.id), {
      ordem: item.ordem
    });
  } catch (e) {
    console.log("ERRO AO MOVER BANNER:", e);
  }
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


function getVendasPorDia(pedidos = [], vendasManuais = []) {
  const map = {};

  pedidos
    .filter(p => p.status === "entregue")
    .forEach(p => {
      const d = new Date(Number(p.data || Date.now()))
        .toLocaleDateString("pt-BR");

      map[d] = (map[d] || 0) + Number(p.total || 0);
    });

  vendasManuais.forEach(v => {
    const d = new Date(Number(v.data || Date.now()))
      .toLocaleDateString("pt-BR");

    map[d] = (map[d] || 0) + Number(v.valor || 0);
  });

  return Object.keys(map).map(d => ({ dia: d, valor: map[d] }));
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

async function excluirVenda(id) {
  try {
    await deleteDoc(doc(db, "vendasManuais", id));

    setToast({
      tipo: "sucesso",
      texto: "Venda removida com sucesso"
    });

    setTimeout(() => setToast(null), 2000);

  } catch (e) {
    console.log("Erro ao excluir venda:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao excluir venda"
    });

    setTimeout(() => setToast(null), 2000);
  }
}

async function excluirGasto(id) {
  try {
    await deleteDoc(doc(db, "gastos", id));

    setToast({
      tipo: "sucesso",
      texto: "Gasto removido com sucesso"
    });

    setTimeout(() => setToast(null), 2000);

  } catch (e) {
    console.log("Erro ao excluir gasto:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao excluir gasto"
    });

    setTimeout(() => setToast(null), 2000);
  }
}

function abrirEditarVenda(v) {
  setEditandoVenda(v);
  setNovaVendaDesc(v.descricao);
  setNovaVendaValor(v.valor / 100);
  setMostrarModalVenda(true);
}

function abrirEditarGasto(g) {
  setEditandoGasto(g);
  setNovoNome(g.nome);
  setNovoValor(g.valor / 100);
  setMostrarModalGasto(true);
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



async function enviarNotificacao() {
  const texto = String(textoNotificacao || "").trim();

  if (!texto) {
    setToast({
      tipo: "erro",
      texto: "Digite a mensagem."
    });
    setTimeout(() => setToast(null), 2000);
    return;
  }

  try {
    const produtoSelecionadoObj = Array.isArray(produtos)
      ? produtos.find((p) => String(p.id) === String(produtoNotificacao || ""))
      : null;

    console.log("PRODUTO SELECIONADO:", produtoSelecionadoObj);

    const imagemFinal =
      imagemNotificacao ||
      produtoSelecionadoObj?.imagem ||
      "";

    // 🔥 CORREÇÃO DEFINITIVA
    let para = "todos";
    let uid = null;

    if (clienteSelecionado && clienteSelecionado.trim() !== "") {
      para = "usuario";
      uid = String(clienteSelecionado);
    }

    console.log("🔥 FINAL:", { para, uid });

    const payload = {
      texto,
      para,
      ...(uid && { uid }),
      data: Date.now(),
      ativo: true,
      lida: false,
      imagem: imagemFinal,
      produtoId: produtoSelecionadoObj
        ? String(produtoSelecionadoObj.id)
        : null,
      produtoNome: produtoSelecionadoObj?.nome || ""
    };

    console.log("PAYLOAD:", payload);

    await addDoc(collection(db, "notificacoes"), payload);

    setToast({
      tipo: "sucesso",
      texto:
        para === "usuario"
          ? "Notificação enviada para o cliente."
          : "Notificação enviada para todos."
    });

    setTimeout(() => setToast(null), 2000);

    // 🔥 limpar tudo
    setTextoNotificacao("");
    setImagemNotificacao("");
    setImagemTemp(null);
    setProdutoNotificacao("");
    setClienteSelecionado("");

  } catch (e) {
    console.log("ERRO AO ENVIAR:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao enviar notificação."
    });

    setTimeout(() => setToast(null), 2000);
  }
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




useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "gastos"), (snapshot) => {
    const lista = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data()
    }));

    lista.sort((a, b) => Number(b?.data || 0) - Number(a?.data || 0));

    setGastos(lista);
  });

  return () => unsubscribe();
}, []);



function limparFormularioGasto() {
  setGastoEditandoId(null);
  setNovoGastoNome("");
  setNovoGastoValor("");
  setNovaCategoriaGasto("insumos");
  setNovaDataGasto("");
  setNovaObservacaoGasto("");
}

function abrirEdicaoGasto(item) {
  setGastoEditandoId(item.id);
  setNovoGastoNome(item?.nome || "");
  setNovoGastoValor(
    Number(item?.valor || 0) > 0
      ? (Number(item.valor) / 100).toFixed(2).replace(".", ",")
      : ""
  );
  setNovaCategoriaGasto(item?.categoria || "insumos");
  setNovaDataGasto(item?.dataTexto || "");
  setNovaObservacaoGasto(item?.observacao || "");
  setMostrarModalGasto(true);
}

async function salvarGasto() {
  const nome = String(novoGastoNome || "").trim();
  const valor = converterParaCentavos(novoGastoValor || "0");
  const categoria = String(novaCategoriaGasto || "insumos").trim();
  const observacao = String(novaObservacaoGasto || "").trim();
  const dataTexto = String(novaDataGasto || "").trim();

  if (!nome) {
    setToast({ tipo: "erro", texto: "Preencha o nome do gasto." });
    setTimeout(() => setToast(null), 2200);
    return;
  }

  if (!valor || valor <= 0) {
    setToast({ tipo: "erro", texto: "Informe um valor válido." });
    setTimeout(() => setToast(null), 2200);
    return;
  }

  try {
    setLoadingGasto(true);

    const payload = {
      nome,
      valor,
      categoria,
      observacao,
      data: dataTexto ? new Date(`${dataTexto}T12:00:00`).getTime() : Date.now(),
      dataTexto: dataTexto || new Date().toISOString().slice(0, 10),
      criadoEm: Date.now()
    };

    if (gastoEditandoId) {
      await updateDoc(doc(db, "gastos", gastoEditandoId), payload);

      setToast({
        tipo: "sucesso",
        texto: "Gasto atualizado com sucesso."
      });
    } else {
      await addDoc(collection(db, "gastos"), payload);

      setToast({
        tipo: "sucesso",
        texto: "Gasto adicionado com sucesso."
      });
    }

    limparFormularioGasto();
    setMostrarModalGasto(false);
    setTimeout(() => setToast(null), 2200);
  } catch (e) {
    console.log("ERRO AO SALVAR GASTO:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao salvar gasto."
    });
    setTimeout(() => setToast(null), 2200);
  } finally {
    setLoadingGasto(false);
  }
}

async function excluirGasto(id) {
  try {
    await deleteDoc(doc(db, "gastos", id));

    if (gastoEditandoId === id) {
      limparFormularioGasto();
      setMostrarModalGasto(false);
    }

    setToast({
      tipo: "sucesso",
      texto: "Gasto removido com sucesso."
    });
    setTimeout(() => setToast(null), 2200);
  } catch (e) {
    console.log("ERRO AO EXCLUIR GASTO:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao excluir gasto."
    });
    setTimeout(() => setToast(null), 2200);
  }
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


useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "fretes"), (snapshot) => {
    const lista = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data()
    }));

    lista.sort((a, b) =>
      String(a?.bairro || "").localeCompare(String(b?.bairro || ""), "pt-BR")
    );

    setFretes(lista);
  });

  return () => unsubscribe();
}, []);



useEffect(() => {
  const unsub = onSnapshot(collection(db, "vendasManuais"), (snap) => {
    const lista = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setVendasManuais(lista);
  });

  return () => unsub();
}, []);







function limparFormularioFrete() {
  setFreteEditandoId(null);
  setBairroFrete("");
  setValorFrete("");
}

function abrirEdicaoFrete(item) {
  setFreteEditandoId(item.id);
  setBairroFrete(item?.bairro || "");
  setValorFrete(
    Number(item?.valor || 0) > 0
      ? (Number(item.valor) / 100).toFixed(2).replace(".", ",")
      : ""
  );
}

async function salvarFrete() {
  const bairro = String(bairroFrete || "").trim();
  const valorCentavos = converterParaCentavos(valorFrete || "0");

  if (!bairro) {
    setToast({
      tipo: "erro",
      texto: "Preencha o bairro."
    });
    setTimeout(() => setToast(null), 2000);
    return;
  }

  if (!valorCentavos || valorCentavos <= 0) {
    setToast({
      tipo: "erro",
      texto: "Informe um valor de frete válido."
    });
    setTimeout(() => setToast(null), 2000);
    return;
  }

  try {
    setLoadingFrete(true);

    if (freteEditandoId) {
      await updateDoc(doc(db, "fretes", freteEditandoId), {
        bairro,
        valor: valorCentavos
      });

      setToast({
        tipo: "sucesso",
        texto: "Frete atualizado com sucesso."
      });
    } else {
      await addDoc(collection(db, "fretes"), {
        bairro,
        valor: valorCentavos,
        ativo: true,
        criadoEm: Date.now()
      });

      setToast({
        tipo: "sucesso",
        texto: "Bairro adicionado com sucesso."
      });
    }

    limparFormularioFrete();
    setTimeout(() => setToast(null), 2000);
  } catch (e) {
    console.log("ERRO AO SALVAR FRETE:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao salvar frete."
    });

    setTimeout(() => setToast(null), 2000);
  } finally {
    setLoadingFrete(false);
  }
}

async function alternarStatusFrete(item) {
  try {
    await updateDoc(doc(db, "fretes", item.id), {
      ativo: item?.ativo === false ? true : false
    });

    setToast?.({
      tipo: "sucesso",
      texto: item?.ativo === false
        ? "Bairro ativado."
        : "Bairro desativado."
    });
  } catch (e) {
    console.log("ERRO AO ATIVAR/DESATIVAR FRETE:", e);
    setToast?.({
      tipo: "erro",
      texto: "Erro ao atualizar status."
    });
  }
}

async function excluirFrete(id) {
  try {
    await deleteDoc(doc(db, "fretes", id));

    if (freteEditandoId === id) {
      limparFormularioFrete();
    }

    setToast?.({
      tipo: "sucesso",
      texto: "Bairro removido com sucesso."
    });
  } catch (e) {
    console.log("ERRO AO EXCLUIR FRETE:", e);
    setToast?.({
      tipo: "erro",
      texto: "Erro ao remover bairro."
    });
  }
}


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
    if (!user) {
      setLoadingAuth(false);
      router.push("/login-admin");
      return;
    }

    const emailAdmin = "admin@acai.com";
    

    if ((user.email || "").toLowerCase() !== emailAdmin.toLowerCase()) {
      setLoadingAuth(false);
      router.push("/login-admin");
      return;
    }

    setLoadingAuth(false);
  });

  return () => unsubscribe();
}, [router]);



useEffect(() => {
  const q = query(collection(db, "avaliacoes"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setAvaliacoes(lista);
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
      id: doc.id,
      ...doc.data()
    }));

    setUsuarios(lista);

  });

  return () => unsub();

}, []);





useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "notificacoes"), (snapshot) => {
    const lista = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data()
    }));

    lista.sort((a, b) => Number(b?.data || 0) - Number(a?.data || 0));

    setNotificacoesAdmin(lista);
  });

  return () => unsubscribe();
}, []);



async function atualizarMediaProduto(produtoId) {
  const q = query(
    collection(db, "avaliacoes"),
    where("produtoId", "==", produtoId),
    where("status", "==", "aprovado")
  );

  const snap = await getDocs(q);

  const lista = snap.docs.map(d => d.data());

  const total = lista.length;

  if (total === 0) {
    await updateDoc(doc(db, "produtos", produtoId), {
      avaliacao: 0,
      totalAvaliacoes: 0
    });
    return;
  }

  const media =
    lista.reduce((acc, a) => acc + Number(a.nota || 0), 0) / total;

  await updateDoc(doc(db, "produtos", produtoId), {
    avaliacao: Number(media.toFixed(1)),
    totalAvaliacoes: total
  });
}



async function aprovarAvaliacao(a) {
  await updateDoc(doc(db, "avaliacoes", a.id), {
    status: "aprovado"
  });

  if (a.produtoId) {
    await atualizarMediaProduto(a.produtoId);
  }
}

async function recusarAvaliacao(a) {
  await updateDoc(doc(db, "avaliacoes", a.id), {
    status: "recusado"
  });

  if (a.produtoId) {
    await atualizarMediaProduto(a.produtoId);
  }
}




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

  setNovoPreco(
    (Number(p.preco || 0) / 100)
      .toFixed(2)
      .replace(".", ",")
  );

  setNovoTamanho(p.tamanho || "");
  setNovaDescricaoTamanho(p.descricaoTamanho || "");
  setNovaDescricao(p.descricao || "");
  setNovaImagem(p.imagem || "");
  setMaisVendido(p.maisVendido || false);
  setCategoria(p.categoria || "");

  // 🔥 FIDELIDADE
  setFidelidade(p.fidelidade || false);

  // 🔥 RESGATE (ESSA LINHA FALTAVA)
  setResgate(p.resgate || false);

  setExtras(p.extras || []);

  // 🔥 PROMOÇÃO
  setPromocaoAtiva(p.promocao || false);

  setNovoPrecoPromocional(
    p.precoPromocional
      ? (Number(p.precoPromocional) / 100)
          .toFixed(2)
          .replace(".", ",")
      : ""
  );

  // 🔥 AVALIAÇÃO
  setMostrarAvaliacao(!!p.avaliacao);
  setNovaAvaliacao(p.avaliacao ? String(p.avaliacao) : "");
  setNovoTotalAvaliacoes(
    p.totalAvaliacoes ? String(p.totalAvaliacoes) : ""
  );

  setMostrarModalProduto(true);
}


// 🔥 EDITAR PRODUTOS
async function salvarProduto() {
  if (!novoNome || !novoPreco) {
    return alert("Preencha os campos");
  }

  const extrasFormatados = (extras || []).map((grupo) => ({
    categoria: String(grupo.categoria || "").trim(),
    min: Number(grupo.min || 0),
    max: Number(grupo.max || 1),
    permitirRepetir: grupo.permitirRepetir === true,
    itens: (grupo.itens || [])
      .filter((item) => String(item.nome || "").trim() !== "")
      .map((item) => ({
        nome: String(item.nome || "").trim(),
        preco: Number(item.preco || 0)
      }))
  }));

  const avaliacaoNumero = mostrarAvaliacao
    ? Number(String(novaAvaliacao || "").replace(",", "."))
    : 0;

  const totalAvaliacoesNumero = mostrarAvaliacao
    ? Number(novoTotalAvaliacoes || 0)
    : 0;

  const dados = {
  nome: novoNome,
  preco: converterParaCentavos(novoPreco),

  promocao: promocaoAtiva,
  precoPromocional:
    promocaoAtiva && novoPrecoPromocional
      ? converterParaCentavos(novoPrecoPromocional)
      : null,

  tamanho: novoTamanho,
  descricaoTamanho: novaDescricaoTamanho, // 🔥 NOVO CAMPO
  descricao: novaDescricao,
  imagem: novaImagem,
  ativo: true,
  maisVendido,
  categoria,
  extras: extrasFormatados,

  // 🔥 FIDELIDADE
  fidelidade: fidelidade === true,

  // 🔥 RESGATE (ESSA LINHA RESOLVE TUDO)
  resgate: resgate === true,

  // 🔥 avaliação
  mostrarAvaliacao: mostrarAvaliacao === true,
  avaliacao:
    mostrarAvaliacao && avaliacaoNumero > 0
      ? Number(avaliacaoNumero.toFixed(1))
      : null,
  totalAvaliacoes:
    mostrarAvaliacao && totalAvaliacoesNumero > 0
      ? Number(totalAvaliacoesNumero)
      : 0,

  ordem: produtoEditandoId ? undefined : Date.now()
};

  try {
    if (produtoEditandoId) {
      const dadosAtualizados = { ...dados };
      delete dadosAtualizados.ordem;

      await updateDoc(
        doc(db, "produtos", produtoEditandoId),
        dadosAtualizados
      );

      alert("Produto atualizado!");
    } else {
      await addDoc(collection(db, "produtos"), dados);

      alert("Produto criado!");
    }

    // 🔥 RESET
    setProdutoEditandoId(null);
    setNovoNome("");
    setNovoPreco("");
    setNovoPrecoPromocional("");
    setPromocaoAtiva(false);
    setNovoTamanho("");
    setNovaDescricao("");
    setNovaImagem("");
    setMaisVendido(false);
    setCategoria("");
    setExtras([]);
    setNovaCategoria("");
    setProdutoOrigemExtras("");

    // 🔥 RESET FIDELIDADE
    setFidelidade(false);

    // 🔥 limpa avaliação
    setMostrarAvaliacao(false);
    setNovaAvaliacao("");
    setNovoTotalAvaliacoes("");

    setMostrarModalProduto(false);

  } catch (e) {
    console.log(e);
    alert("Erro ao salvar");
  }
}


function copiarExtrasDeProduto(produtoId) {
  if (!produtoId) return;

  const produtoBase = produtos.find((p) => String(p.id) === String(produtoId));

  if (!produtoBase) return;

  const extrasCopiados = JSON.parse(
    JSON.stringify(Array.isArray(produtoBase.extras) ? produtoBase.extras : [])
  );

  setExtras(extrasCopiados);
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


async function cancelarPedido(id) {
  const confirmar = confirm("Cancelar este pedido?");
  if (!confirmar) return;

  try {
    await updateDoc(doc(db, "pedidos", id), {
      status: "cancelado",
      canceladoEm: Date.now()
    });

    alert("Pedido cancelado");
  } catch (e) {
    console.log(e);
    alert("Erro ao cancelar");
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
const totalPedidos = pedidos
  .filter(p => p.status === "entregue")
  .reduce((acc, p) => acc + Number(p.total || 0), 0);

const totalVendasManuais = vendasManuais.reduce(
  (acc, v) => acc + Number(v.valor || 0),
  0
);

const totalFaturado = totalPedidos + totalVendasManuais;


const totalGastos = gastos.reduce(
  (acc, item) => acc + Number(item?.valor || 0),
  0
);

const lucroTotal = totalFaturado - totalGastos;

const statusAtivos = new Set([
  "aguardando_pagamento",
  "aguardando_pagamento_online",
  "preparando",
  "saiu"
]);

const pedidosEmAndamento = pedidos.filter(p =>
  statusAtivos.has(p.status)
).length;

const produtosAtivos = produtos.filter((p) => p.ativo).length;

const margemLucro =
  totalFaturado > 0
    ? ((lucroTotal / totalFaturado) * 100).toFixed(1)
    : "0.0";


// 📊 GRÁFICO CORRIGIDO (compatível com novo sistema)
const vendasPorDia = {};

// PEDIDOS
pedidos
  .filter(p => p.status === "entregue")
  .forEach(p => {
    const data = new Date(Number(p.data));
    if (isNaN(data)) return;

    const dia = data.toLocaleDateString("pt-BR");

    vendasPorDia[dia] =
      (vendasPorDia[dia] || 0) + Number(p.total || 0);
  });

// VENDAS MANUAIS
vendasManuais.forEach(v => {
  const data = new Date(Number(v.data || Date.now()));
  const dia = data.toLocaleDateString("pt-BR");

  vendasPorDia[dia] =
    (vendasPorDia[dia] || 0) + Number(v.valor || 0);
});

const valores = Object.values(vendasPorDia);

const maxVenda = valores.length > 0 ? Math.max(...valores) : 0;


// 🔥 LOADING
if (loadingAuth) {
  return <div style={{ color: 'white' }}>Carregando...</div>;
}




{toast && (
  <div
    style={{
      position: "fixed",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#111",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: 10,
      fontWeight: 600,
      zIndex: 9999
    }}
  >
    {toast.texto}
  </div>
)}

<Head>
  <link rel="manifest" href="/manifest-admin.json" />
  <meta name="theme-color" content="#ea1d2c" />
</Head>


  return (


  <div className="container"
  style={{
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f3f4f6 0%, #eef2f7 100%)",
    padding: isMobile ? "12px 12px 90px" : "22px"
  }}
>
  <div
    className="wrapper"
    style={{
      width: "100%",
      maxWidth: 1240,
      margin: "0 auto"
    }}
  >
    {/* HEADER PREMIUM */}
    <div
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%)",
        borderRadius: 28,
        padding: isMobile ? 18 : 24,
        marginBottom: 18,
        boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
        border: "1px solid #ececf2",
        display: "flex",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: 16,
        flexWrap: "wrap"
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 12,
            color: "#6b7280",
            marginBottom: 6,
            fontWeight: 700,
            letterSpacing: 0.3,
            textTransform: "uppercase"
          }}
        >
          Painel da loja
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: isMobile ? 32 : 40,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#111827",
            lineHeight: 1.02
          }}
        >
          Loja Admin
        </h1>

        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: lojaAberta ? "#ecfdf3" : "#fff1f2",
            color: lojaAberta ? "#15803d" : "#b91c1c",
            padding: "8px 14px",
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 13
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: lojaAberta ? "#16a34a" : "#dc2626"
            }}
          />
          {lojaAberta ? "Loja aberta" : "Loja fechada"}
        </div>
      </div>

      <button
        onClick={logout}
        style={{
          height: 48,
          padding: "0 18px",
          borderRadius: 16,
          border: "1px solid #e5e7eb",
          background: "#111827",
          color: "#fff",
          fontWeight: 800,
          fontSize: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 10px 24px rgba(17,24,39,0.14)"
        }}
      >
        Sair
      </button>
    </div>


    {/* MENU DESKTOP */}
    {!isMobile && (
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          marginBottom: 20,
          paddingBottom: 4
        }}
      >
        {[
          { id: "dashboard", nome: "Dashboard" },
          { id: "pedidos", nome: "Pedidos" },
          { id: "cancelados", nome: "Cancelados" },
          { id: "produtos", nome: "Produtos" },
          { id: "avaliacoes", nome: "Avaliações" },
          { id: "gastos", nome: "Gastos" },
          { id: "cupons", nome: "Cupons" },
          { id: "fretes", nome: "Fretes" },
          { id: "notificacoes", nome: "Notificações" },
          { id: "banners", nome: "Banner" },
          { id: "loja", nome: "Loja" }
        ].map((item) => {
          const ativo = abaAdmin === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setAbaAdmin(item.id)}
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 14,
                border: ativo ? "none" : "1px solid #e5e7eb",
                whiteSpace: "nowrap",
                background: ativo ? "#ea1d2c" : "#fff",
                color: ativo ? "#fff" : "#333",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: ativo
                  ? "0 10px 24px rgba(234,29,44,0.22)"
                  : "0 4px 12px rgba(0,0,0,0.04)"
              }}
            >
              {item.nome}
            </button>
          );
        })}
      </div>
    )}


  
    {/* DASHBOARD */}
    {abaAdmin === "dashboard" && (
      <div
        style={{
          marginTop: 16,
          padding: isMobile ? 14 : 22,
          background: "linear-gradient(180deg, #f5f6fa 0%, #eef1f6 100%)",
          borderRadius: 30
        }}
      >
        {/* TOPO DASHBOARD */}
        <div
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%)",
            borderRadius: 28,
            padding: isMobile ? 18 : 24,
            marginBottom: 18,
            boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
            border: "1px solid #ececf2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 12px",
                borderRadius: 999,
                background: "#fff1f2",
                color: "#ea1d2c",
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 12
              }}
            >
              Dashboard financeiro
            </div>

            <h2
              style={{
                margin: 0,
                color: "#111827",
                fontSize: isMobile ? 28 : 36,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.02
              }}
            >
              Controle total da operação
            </h2>

            <p
              style={{
                marginTop: 8,
                marginBottom: 0,
                fontSize: 14,
                color: "#6b7280",
                lineHeight: 1.5,
                maxWidth: 600
              }}
            >
              Acompanhe faturamento, gastos, lucro, pedidos e os principais
              indicadores da loja em tempo real.
            </p>
          </div>

          <button
            onClick={() => {
              limparFormularioGasto();
              setMostrarModalGasto(true);
            }}
            style={{
              height: 48,
              padding: "0 18px",
              borderRadius: 16,
              border: "none",
              background: "#111827",
              color: "#fff",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 12px 24px rgba(17,24,39,0.16)",
              width: isMobile ? "100%" : "auto"
            }}
          >
            <Plus size={18} />
            Novo gasto
          </button>
        </div>

        {/* CARDS PRINCIPAIS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr 1fr",
            gap: 16,
            marginBottom: 20
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fffb 100%)",
              borderRadius: 26,
              padding: 22,
              border: "1px solid #e8f4ec",
              boxShadow: "0 12px 30px rgba(15,23,42,0.08)"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 14
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>
                  Faturamento
                </div>
                <div style={{ marginTop: 4, fontSize: 12, color: "#9ca3af" }}>
                  Total vendido em pedidos
                </div>
              </div>

              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 16,
                  background: "#ecfdf3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TrendingUp size={22} color="#16a34a" />
              </div>
            </div>

            <div
              style={{
                fontSize: isMobile ? 34 : 42,
                fontWeight: 900,
                color: "#111827",
                letterSpacing: "-0.04em",
                lineHeight: 1
              }}
            >
              {formatarReal(totalFaturado)}
            </div>

            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#6b7280",
                lineHeight: 1.45
              }}
            >
              Volume consolidado de pedidos registrados no painel.
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fff8f8 100%)",
              borderRadius: 26,
              padding: 22,
              border: "1px solid #f8e2e5",
              boxShadow: "0 12px 30px rgba(15,23,42,0.08)"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 14
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>
                  Gastos
                </div>
                <div style={{ marginTop: 4, fontSize: 12, color: "#9ca3af" }}>
                  Custos operacionais
                </div>
              </div>

              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 16,
                  background: "#fff1f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TrendingDown size={22} color="#ea1d2c" />
              </div>
            </div>

            <div
              style={{
                fontSize: isMobile ? 32 : 38,
                fontWeight: 900,
                color: "#111827",
                letterSpacing: "-0.04em",
                lineHeight: 1
              }}
            >
              {formatarReal(totalGastos)}
            </div>

            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#6b7280",
                lineHeight: 1.45
              }}
            >
              Soma de todos os gastos cadastrados na operação.
            </div>
          </div>

          <div
            style={{
              background:
                lucroTotal >= 0
                  ? "linear-gradient(135deg, #ffffff 0%, #f6fff9 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #fff7f7 100%)",
              borderRadius: 26,
              padding: 22,
              border: lucroTotal >= 0 ? "1px solid #dcfce7" : "1px solid #fee2e2",
              boxShadow: "0 12px 30px rgba(15,23,42,0.08)"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 14
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>
                  Lucro estimado
                </div>
                <div style={{ marginTop: 4, fontSize: 12, color: "#9ca3af" }}>
                  Resultado da operação
                </div>
              </div>

              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 16,
                  background: lucroTotal >= 0 ? "#ecfdf3" : "#fff1f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Wallet size={22} color={lucroTotal >= 0 ? "#16a34a" : "#ea1d2c"} />
              </div>
            </div>

            <div
              style={{
                fontSize: isMobile ? 32 : 38,
                fontWeight: 900,
                color: lucroTotal >= 0 ? "#16a34a" : "#dc2626",
                letterSpacing: "-0.04em",
                lineHeight: 1
              }}
            >
              {formatarReal(lucroTotal)}
            </div>

            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#6b7280",
                lineHeight: 1.45
              }}
            >
              Margem estimada de <strong>{margemLucro}%</strong>.
            </div>
          </div>
        </div>
      

    {/* CARDS SECUNDÁRIOS */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 20
      }}
    >
      {[
        {
          titulo: "Pedidos em andamento",
          valor: pedidosEmAndamento,
          cor: "#111827",
          icon: <ClipboardList size={18} color="#6b7280" />
        },
        {
          titulo: "Produtos ativos",
          valor: produtosAtivos,
          cor: "#111827",
          icon: <ShoppingBag size={18} color="#6b7280" />
        },
        {
          titulo: "Cupons cadastrados",
          valor: cupons.length,
          cor: "#111827",
          icon: <Tag size={18} color="#d97706" />
        },
        {
          titulo: "Status da loja",
          valor: lojaAberta ? "Loja aberta" : "Loja fechada",
          cor: lojaAberta ? "#16a34a" : "#dc2626",
          icon: (
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: lojaAberta ? "#16a34a" : "#dc2626"
              }}
            />
          )
        }
      ].map((item, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            borderRadius: 22,
            padding: 18,
            boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            border: "1px solid #ececf2",
            minHeight: 118
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              marginBottom: 10
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#6b7280",
                fontWeight: 700
              }}
            >
              {item.titulo}
            </div>

            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              {item.icon}
            </div>
          </div>

          <div
            style={{
              fontSize: isMobile ? 24 : 28,
              fontWeight: 900,
              marginTop: 8,
              color: item.cor,
              letterSpacing: "-0.02em",
              lineHeight: 1.05
            }}
          >
            {item.valor}
          </div>
        </div>
      ))}
    </div>

    {/* AÇÕES + GRÁFICO */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "360px 1fr",
        gap: 16,
        marginBottom: 20
      }}
    >
      {/* AÇÕES */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          border: "1px solid #ececf2"
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 14,
            color: "#111827",
            fontSize: 20,
            fontWeight: 800
          }}
        >
          Ações rápidas
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10
          }}
        >
          <button
            onClick={() => toggleLoja(true)}
            style={{
              height: 48,
              borderRadius: 16,
              border: "none",
              background: "linear-gradient(90deg, #16a34a, #34d399)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(22,163,74,0.18)"
            }}
          >
            Abrir loja
          </button>

          <button
            onClick={() => toggleLoja(false)}
            style={{
              height: 48,
              borderRadius: 16,
              border: "none",
              background: "linear-gradient(90deg, #ef4444, #fb7185)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(239,68,68,0.18)"
            }}
          >
            Fechar loja
          </button>

          <button
            onClick={limparPedidos}
            style={{
              height: 48,
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              background: "#f8fafc",
              color: "#374151",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer"
            }}
          >
            Limpar pedidos
          </button>
        </div>
      </div>

      {/* GRÁFICO */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          border: "1px solid #ececf2"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
            flexWrap: "wrap"
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#111827",
              fontSize: 20,
              fontWeight: 800
            }}
          >
            Vendas por dia
          </h3>

          <div
            style={{
              display: "flex",
              gap: 6,
              background: "#f3f4f6",
              padding: 4,
              borderRadius: 12
            }}
          >
            {["Hoje", "7 dias", "30 dias"].map((filtro, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  background: i === 0 ? "#fff" : "transparent",
                  color: i === 0 ? "#111" : "#777",
                  boxShadow: i === 0 ? "0 2px 6px rgba(0,0,0,0.08)" : "none"
                }}
              >
                {filtro}
              </div>
            ))}
          </div>
        </div>

        {Object.keys(vendasPorDia).length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              padding: "34px 20px",
              background: "#fafafa",
              borderRadius: 18,
              border: "1px dashed #e5e7eb",
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Nenhuma venda registrada ainda
          </div>
        )}

        {Object.keys(vendasPorDia)
          .sort((a, b) => new Date(b) - new Date(a))
          .map((dia) => (
            <div key={dia} style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  marginBottom: 7,
                  color: "#111827",
                  gap: 10
                }}
              >
                <strong>{dia}</strong>
                <span style={{ color: "#6b7280", fontWeight: 700 }}>
                  {formatarReal(vendasPorDia[dia])}
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: 12,
                  borderRadius: 999,
                  background: "#eef0f3",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${maxVenda ? (vendasPorDia[dia] / maxVenda) * 100 : 0}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: "linear-gradient(90deg, #ea1d2c, #ff5a5f)"
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>

    {/* ÚLTIMOS GASTOS + ÚLTIMOS PEDIDOS */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 16
      }}
    >
      {/* GASTOS */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          border: "1px solid #ececf2"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
            gap: 10,
            flexWrap: "wrap"
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "#111827"
            }}
          >
            Últimos gastos
          </h3>

          <button
            onClick={() => setAbaAdmin("gastos")}
            style={{
              height: 34,
              padding: "0 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "#fff",
              color: "#111827",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer"
            }}
          >
            Ver todos
          </button>
        </div>

        {gastos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              padding: "28px 18px",
              background: "#fafafa",
              borderRadius: 18,
              border: "1px dashed #e5e7eb",
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Nenhum gasto cadastrado ainda
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {gastos.slice(0, 4).map((g) => (
              <div
                key={g.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1.6fr auto auto auto",
                  gap: 10,
                  alignItems: "center",
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: "#f9fafb",
                  border: "1px solid #eee"
                }}
              >
                <strong
                  style={{
                    fontSize: 14,
                    color: "#111"
                  }}
                >
                  {g.nome}
                </strong>

                <span
                  style={{
                    justifySelf: isMobile ? "flex-start" : "center",
                    fontSize: 12,
                    color: "#666",
                    background: "#eef2f7",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontWeight: 700,
                    width: "fit-content"
                  }}
                >
                  {g.categoria || "outros"}
                </span>

                <span
                  style={{
                    justifySelf: isMobile ? "flex-start" : "end",
                    fontSize: 14,
                    color: "#111",
                    fontWeight: 800
                  }}
                >
                  {formatarReal(g.valor)}
                </span>

                <button
                  onClick={() => abrirEdicaoGasto(g)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    color: "#111",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    justifySelf: isMobile ? "flex-start" : "end"
                  }}
                >
                  <Pencil size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PEDIDOS */}
<div
  style={{
    background: "#ffffff",
    borderRadius: 20,
    padding: 18,
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
    border: "1px solid #e5e7eb"
  }}
>
  {/* HEADER */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      gap: 10,
      flexWrap: "wrap"
    }}
  >
    <h3
      style={{
        margin: 0,
        fontSize: 18,
        fontWeight: 900,
        color: "#0f172a"
      }}
    >
      Últimos pedidos
    </h3>

    {/* FILTRO VISUAL */}
    <div
      style={{
        display: "flex",
        gap: 6,
        background: "#f1f5f9",
        padding: 4,
        borderRadius: 12
      }}
    >
      {["Hoje", "7 dias", "30 dias"].map((filtro, i) => (
        <div
          key={i}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            background: i === 0 ? "#020617" : "transparent",
            color: i === 0 ? "#fff" : "#475569"
          }}
        >
          {filtro}
        </div>
      ))}
    </div>
  </div>

  {/* LISTA */}
  {pedidos.length === 0 ? (
    <div
      style={{
        textAlign: "center",
        color: "#64748b",
        padding: "30px 20px",
        background: "#f8fafc",
        borderRadius: 16,
        border: "1px dashed #e2e8f0",
        fontSize: 14,
        fontWeight: 500
      }}
    >
      Nenhum pedido encontrado
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {pedidos.slice(0, 4).map((p, i) => {

        // 🔥 NORMALIZA STATUS
        const status = (p.status || "").toLowerCase();

        // 🔥 LABEL
        const statusLabel =
          status === "entregue"
            ? "Entregue"
            : status === "saiu"
            ? "Saiu para entrega"
            : status === "preparando"
            ? "Preparando"
            : status === "cancelado"
            ? "Cancelado"
            : "Confirmado";

        // 🔥 COR
        const statusBg =
          status === "entregue"
            ? "#dcfce7"
            : status === "saiu"
            ? "#fff7ed"
            : status === "preparando"
            ? "#eef2ff"
            : status === "cancelado"
            ? "#fee2e2"
            : "#fef3c7";

        const statusColor =
          status === "entregue"
            ? "#166534"
            : status === "saiu"
            ? "#9a3412"
            : status === "preparando"
            ? "#3730a3"
            : status === "cancelado"
            ? "#991b1b"
            : "#92400e";

        return (
          <div
            key={p.id || i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "14px 16px",
              borderRadius: 16,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
            }}
          >
            {/* ESQUERDA */}
            <div style={{ flex: 1 }}>
              
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                  flexWrap: "wrap"
                }}
              >
                <strong style={{ fontSize: 14, color: "#0f172a" }}>
                  #{p.codigo || p.id?.slice(0, 5) || i + 1}
                </strong>

                {/* STATUS */}
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 999,
                    fontWeight: 700,
                    background: statusBg,
                    color: statusColor
                  }}
                >
                  {statusLabel}
                </span>
              </div>

              {/* CLIENTE */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#111827"
                }}
              >
                {p.cliente?.nome || p.clienteNome || "Cliente"}
              </div>

              {/* HORA */}
              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  marginTop: 2
                }}
              >
                {p.data
                  ? new Date(Number(p.data)).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  : "--:--"}
              </div>
            </div>

            {/* DIREITA */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              
              {/* PREÇO */}
              <div
                style={{
                  background: "#020617",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 13
                }}
              >
                {formatarReal(p.total || 0)}
              </div>

              {/* BOTÃO */}
              <button
                onClick={() => setAbaAdmin("pedidos")}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )}


        <div
          style={{
            marginTop: 14,
            textAlign: "center"
          }}
        >
          <button
            onClick={() => setAbaAdmin("pedidos")}
            style={{
              padding: "10px 16px",
              borderRadius: 12,
              border: "none",
              background: "#f3f4f6",
              color: "#111",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Ver todos os pedidos
          </button>
        </div>
      </div>
    </div>
  </div>
)}



{abaAdmin === "gastos" && (
  <div
    style={{
      marginTop: 16,
      padding: isMobile ? 14 : 22,
      background: "#f5f6fa",
      borderRadius: 24,
      color: "#111"
    }}
  >
    {(() => {

      // 🔥 DATA HOJE
      const hoje = new Date().toDateString();

      // 🔥 FUNÇÃO PRA DATA (firebase + normal)
      const getData = (d) => {
        if (!d) return null;
        if (d?.toDate) return d.toDate();
        return new Date(d);
      };

      // =========================
      // 🔥 VENDAS SITE (TOTAL)
      // =========================
      const vendasSiteLista = pedidos.filter(p => p.status === "entregue");

      const vendasSite = vendasSiteLista.reduce(
        (acc, p) => acc + Number(p.total || 0),
        0
      );

      // 🔥 VENDAS SITE HOJE
      const vendasSiteHoje = vendasSiteLista.reduce((acc, p) => {
        const data = getData(p.data);
        if (!data) return acc;

        if (data.toDateString() === hoje) {
          return acc + Number(p.total || 0);
        }

        return acc;
      }, 0);

      // =========================
      // 🔥 VENDAS MANUAIS (TOTAL)
      // =========================
      const totalVendasManuais = vendasManuais.reduce(
        (acc, v) => acc + Number(v.valor || 0),
        0
      );

      // 🔥 VENDAS MANUAIS HOJE
      const vendasManuaisHoje = vendasManuais.reduce((acc, v) => {
        const data = getData(v.data);
        if (!data) return acc;

        if (data.toDateString() === hoje) {
          return acc + Number(v.valor || 0);
        }

        return acc;
      }, 0);

      // =========================
      // 🔥 TOTAL GERAL
      // =========================
      const totalVendas = vendasSite + totalVendasManuais;
      const totalHoje = vendasSiteHoje + vendasManuaisHoje;

      // =========================
      // 🔥 GASTOS
      // =========================
      const totalGastosCalc = gastos.reduce(
        (acc, g) => acc + Number(g.valor || 0),
        0
      );

      const lucro = totalVendas - totalGastosCalc;

      return (
        <>
          {/* TOPO */}
          <div style={cardBox}>
            <h2>Controle financeiro</h2>

            <button
              onClick={() => {
                setEditandoVenda(null);
                setNovaVendaDesc("");
                setNovaVendaValor("");
                setMostrarModalVenda(true);
              }}
              style={{
                width: "100%",
                height: 44,
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontWeight: 700
              }}
            >
              Nova venda
            </button>
          </div>

          {/* RESUMO */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr",
              gap: 10
            }}
          >
            <div style={cardResumo}>
              <span>Hoje</span>
              <strong style={{ color: "#16a34a" }}>
                {formatarReal(totalHoje)}
              </strong>
            </div>

            <div style={cardResumo}>
              <span>Total vendas</span>
              <strong style={{ color: "#16a34a" }}>
                {formatarReal(totalVendas)}
              </strong>
            </div>

            <div style={cardResumo}>
              <span>Gastos</span>
              <strong style={{ color: "#ea1d2c" }}>
                {formatarReal(totalGastosCalc)}
              </strong>
            </div>

            <div style={cardResumo}>
              <span>Lucro</span>
              <strong style={{ color: lucro >= 0 ? "#16a34a" : "#dc2626" }}>
                {formatarReal(lucro)}
              </strong>
            </div>
          </div>

          {/* GASTOS */}
          <div style={cardBox}>
            <h3>Gastos</h3>

            {gastos.length === 0 ? (
              <div>Nenhum gasto cadastrado</div>
            ) : (
              gastos.map(g => (
                <div key={g.id} style={linha}>
                  <span>{g.nome}</span>

                  <div style={{ display: "flex", gap: 8 }}>
                    <strong style={{ color: "#ea1d2c" }}>
                      {formatarReal(g.valor)}
                    </strong>

                    <button
                      onClick={() => excluirGasto(g.id)}
                      style={btnDelete}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* VENDAS */}
          <div style={cardBox}>
            <h3>Vendas manuais</h3>

            {vendasManuais.length === 0 ? (
              <div>Nenhuma venda manual</div>
            ) : (
              vendasManuais.map(v => (
                <div key={v.id} style={linha}>
                  <span>{v.descricao}</span>

                  <div style={{ display: "flex", gap: 8 }}>
                    <strong style={{ color: "#16a34a" }}>
                      {formatarReal(v.valor)}
                    </strong>

                    <button
                      onClick={() => abrirEditarVenda(v)}
                      style={btnEdit}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => excluirVenda(v.id)}
                      style={btnDelete}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      );
    })()}
  </div>
)}




{abaAdmin === "fretes" && (
  <div
    style={{
      background: "#fff",
      borderRadius: 20,
      padding: 18,
      boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
      border: "1px solid #f1f1f1"
    }}
  >
    <h2
      style={{
        marginTop: 0,
        marginBottom: 16,
        fontSize: 24,
        fontWeight: 800,
        color: "#111"
      }}
    >
      Frete por bairro
    </h2>

    {/* FORMULÁRIO */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr auto auto",
        gap: 10,
        alignItems: "center",
        marginBottom: 16
      }}
    >
      <input
        value={bairroFrete}
        onChange={(e) => setBairroFrete(e.target.value)}
        placeholder="Nome do bairro"
        style={{
          width: "100%",
          height: 46,
          borderRadius: 14,
          border: "1px solid #e5e5e5",
          padding: "0 14px",
          fontSize: 14,
          outline: "none",
          boxSizing: "border-box",
          background: "#fff",
          color: "#111"
        }}
      />

      <input
        value={valorFrete}
        onChange={(e) => setValorFrete(e.target.value)}
        placeholder="Valor do frete"
        style={{
          width: "100%",
          height: 46,
          borderRadius: 14,
          border: "1px solid #e5e5e5",
          padding: "0 14px",
          fontSize: 14,
          outline: "none",
          boxSizing: "border-box",
          background: "#fff",
          color: "#111"
        }}
      />

      <button
        onClick={salvarFrete}
        disabled={loadingFrete}
        style={{
          height: 46,
          minWidth: 150,
          padding: "0 18px",
          borderRadius: 14,
          border: "none",
          background: "#ea1d2c",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          cursor: loadingFrete ? "not-allowed" : "pointer",
          opacity: loadingFrete ? 0.7 : 1,
          boxShadow: "0 8px 20px rgba(234,29,44,0.18)"
        }}
      >
        {loadingFrete
          ? "Salvando..."
          : freteEditandoId
          ? "Salvar alteração"
          : "Adicionar bairro"}
      </button>

      {freteEditandoId && (
        <button
          onClick={limparFormularioFrete}
          style={{
            height: 46,
            minWidth: 110,
            padding: "0 16px",
            borderRadius: 14,
            border: "1px solid #e5e5e5",
            background: "#fff",
            color: "#111",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>
      )}
    </div>

    {/* LISTA */}
    <div style={{ marginTop: 10 }}>
      {fretes.length === 0 && (
        <div
          style={{
            fontSize: 14,
            color: "#777",
            padding: "12px 0"
          }}
        >
          Nenhum bairro cadastrado.
        </div>
      )}

      {fretes.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "12px 14px",
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f1f1f1",
            flexWrap: isMobile ? "wrap" : "nowrap"
          }}
        >
          {/* INFORMAÇÕES */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <strong
              style={{
                display: "block",
                fontSize: 15,
                color: "#111",
                fontWeight: 700
              }}
            >
              {item?.bairro || "Sem bairro"}
            </strong>

            <div
              style={{
                fontSize: 13,
                color: "#555",
                marginTop: 4
              }}
            >
              Frete: <strong>{formatarReal(Number(item?.valor || 0))}</strong>
            </div>

            <div
              style={{
                fontSize: 12,
                marginTop: 4,
                color: item?.ativo === false ? "#888" : "#15803d",
                fontWeight: 700
              }}
            >
              {item?.ativo === false ? "Desativado" : "Ativo"}
            </div>
          </div>

          {/* AÇÕES */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: isMobile ? "flex-start" : "flex-end"
            }}
          >
            <button
              onClick={() => abrirEdicaoFrete(item)}
              style={{
                height: 38,
                padding: "0 14px",
                borderRadius: 12,
                border: "1px solid #dcdcdc",
                background: "#fff",
                color: "#111",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              }}
            >
              Editar
            </button>

            <button
              onClick={() => alternarStatusFrete(item)}
              style={{
                height: 38,
                padding: "0 14px",
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                background: item?.ativo === false ? "#ecfdf3" : "#fff7ed",
                color: item?.ativo === false ? "#166534" : "#9a3412",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              }}
            >
              {item?.ativo === false ? "Ativar" : "Desativar"}
            </button>

            <button
              onClick={() => excluirFrete(item.id)}
              style={{
                height: 38,
                padding: "0 14px",
                borderRadius: 12,
                border: "none",
                background: "#ea1d2c",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              }}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      {/* LOJA */}
    {abaAdmin === "loja" && (
  <div
    style={{
      marginTop: 12,
      padding: isMobile ? 12 : 18,
      background: "#eef1f6",
      borderRadius: 20
    }}
  >

    {/* HEADER */}
    <div
      style={{
        background: "#ffffff",
        borderRadius: 18,
        padding: isMobile ? 14 : 18,
        marginBottom: 14,
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }}
    >
      <h2 style={{ margin: 0, fontSize: 20, color: "#111" }}>
        Loja
      </h2>

      <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
        Configurações gerais da loja
      </p>
    </div>

    {/* GRID */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 14
      }}
    >

      {/* CATEGORIAS */}
      <div
        style={{
          background: "#ffffff",
          padding: 16,
          borderRadius: 16,
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
        }}
      >
        <h3 style={{ marginBottom: 12, color: "#111" }}>
          Categorias
        </h3>

        {categorias.map(c => (
          <div
            key={c.id}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "8px 10px",
              borderRadius: 10,
              background: "#f9fafb",
              marginBottom: 6,
              border: "1px solid #f1f1f1"
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
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  border: "1px solid #ddd"
                }}
              />
            ) : (
              <span
                style={{
                  flex: 1,
                  fontWeight: 600,
                  color: "#111"
                }}
              >
                {c.nome}
              </span>
            )}

            <button
              onClick={() =>
                editandoCategoriaId === c.id
                  ? salvarEdicaoCategoria(c.id)
                  : (
                      setEditandoCategoriaId(c.id),
                      setEditandoCategoria(prev => ({
                        ...prev,
                        [c.id]: c.nome
                      }))
                    )
              }
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "none",
                background:
                  editandoCategoriaId === c.id ? "#16a34a" : "#111",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {editandoCategoriaId === c.id ? "Salvar" : "Editar"}
            </button>
          </div>
        ))}

        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          <input
            placeholder="Nova categoria"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: 10,
              border: "1px solid #ddd"
            }}
          />

          <button
            onClick={criarCategoria}
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              border: "none",
              background: "#ea1d2c",
              color: "#fff",
              fontWeight: 900,
              fontSize: 18,
              cursor: "pointer"
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* STATUS */}
      <div
        style={{
          background: "#ffffff",
          padding: 16,
          borderRadius: 16,
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
        }}
      >
        <h3 style={{ marginBottom: 12, color: "#111" }}>
          Status da loja
        </h3>

        <div
          style={{
            padding: 14,
            borderRadius: 12,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 14,
            background: lojaAberta ? "#dcfce7" : "#fee2e2",
            color: lojaAberta ? "#166534" : "#991b1b",
            marginBottom: 12
          }}
        >
          {lojaAberta ? "Loja aberta" : "Loja fechada"}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => toggleLoja(true)}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border: "none",
              background: "#16a34a",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Abrir
          </button>

          <button
            onClick={() => toggleLoja(false)}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border: "none",
              background: "#dc2626",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Fechar
          </button>
        </div>
      </div>

      {/* LOGO */}
      <div
        style={{
          background: "#ffffff",
          padding: 16,
          borderRadius: 16,
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
        }}
      >
        <h3 style={{ marginBottom: 12, color: "#111" }}>
          Logo da loja
        </h3>

        <input
          placeholder="URL da logo"
          value={logoInput}
          onChange={(e) => setLogoInput(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 10,
            border: "1px solid #ddd"
          }}
        />

        {logoInput && (
          <img
            src={logoInput}
            style={{
              width: 90,
              height: 90,
              borderRadius: 14,
              marginTop: 10,
              objectFit: "cover",
              border: "1px solid #eee"
            }}
          />
        )}

        <button
          onClick={salvarLogo}
          style={{
            marginTop: 10,
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "#ea1d2c",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Salvar
        </button>
      </div>

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
        Envie avisos para todos os clientes ou para um cliente específico.
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
      <h3 style={{
        marginTop: 0,
        marginBottom: 14,
        color: "#111"
      }}>
        Nova notificação
      </h3>

      <select
  value={clienteSelecionado || ""}
  onChange={(e) => {
    const valor = e.target.value;

    console.log("🔥 SELECT:", valor);

    setClienteSelecionado(valor);
  }}
  style={input}
>
  <option value="">Enviar para TODOS</option>

  {usuarios.map((u) => (
    <option key={u.uid} value={String(u.uid)}>
      {u.clienteNome || u.clienteEmail || "Sem nome"}
    </option>
  ))}
</select>

      <select
        value={produtoNotificacao}
        onChange={(e) => {
          const produtoId = e.target.value;
          setProdutoNotificacao(produtoId);

          const produtoEscolhido = produtos.find(
            (p) => String(p.id) === String(produtoId)
          );

          if (produtoEscolhido?.imagem) {
            setImagemNotificacao(produtoEscolhido.imagem);
          }
        }}
        style={input}
      >
        <option value="">Selecionar produto (opcional)</option>

        {produtos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>

      <input
        placeholder="Digite a mensagem..."
        value={textoNotificacao}
        onChange={(e) => setTextoNotificacao(e.target.value)}
        style={input}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
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

      {/* PREVIEW */}
      {imagemNotificacao && (
        <div style={{ marginTop: 14 }}>
          <div style={{
            fontSize: 13,
            color: "#666",
            marginBottom: 8
          }}>
            Prévia da imagem
          </div>

          <img
            src={imagemNotificacao}
            style={{
              width: "100%",
              maxWidth: 320,
              borderRadius: 16,
              objectFit: "cover",
              border: "1px solid #eee",
              display: "block"
            }}
          />
        </div>
      )}

      <div style={{
        display: "flex",
        gap: 10,
        marginTop: 16,
        flexWrap: "wrap"
      }}>
        <button
          onClick={enviarNotificacao}
          style={{
            ...btnPrimary,
            minWidth: 170
          }}
        >
          Enviar notificação
        </button>

        {(imagemNotificacao || produtoNotificacao || clienteSelecionado || textoNotificacao) && (
          <button
  onClick={() => {
    setTextoNotificacao("");
    setImagemNotificacao("");
    setImagemTemp(null);
    setProdutoNotificacao("");
    setClienteSelecionado("");
  }}
  style={{
    minWidth: 140,
    height: 46,
    padding: "0 16px",
    borderRadius: 14,
    border: "1px solid #dcdcdc",
    background: "#f8f8f8",
    color: "#111",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
  }}
>
  Limpar campos
</button>
        )}
      </div>

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
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{ width: "100%" }}
            />

            <div style={{
              display: "flex",
              gap: 10,
              marginTop: 10
            }}>
              <button
                onClick={() => {
                  setMostrarCrop(false);
                  setImagemTemp(null);
                }}
                style={btnSecondary}
              >
                Cancelar
              </button>

              <button
                onClick={async () => {
                  try {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    const img = new Image();
                    img.src = imagemTemp;

                    await new Promise((resolve) => {
                      img.onload = resolve;
                    });

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

                    const base64 = canvas.toDataURL("image/jpeg", 0.82);

                    setImagemNotificacao(base64);
                    setMostrarCrop(false);
                  } catch (e) {
                    console.log("ERRO AO CORTAR IMAGEM:", e);
                    setMostrarCrop(false);
                  }
                }}
                style={btnPrimary}
              >
                Salvar imagem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* HISTÓRICO */}
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
        Histórico de notificações
      </h3>

      {notificacoesAdmin.length === 0 && (
        <div style={{
          fontSize: 14,
          color: "#777"
        }}>
          Nenhuma notificação enviada ainda.
        </div>
      )}

      {notificacoesAdmin.map((n) => (
        <div
          key={n.id}
          style={{
            border: "1px solid #f1f1f1",
            borderRadius: 16,
            padding: 14,
            marginBottom: 12,
            background: "#fff"
          }}
        >
          <div style={{
            fontSize: 14,
            color: "#111",
            fontWeight: 700,
            lineHeight: 1.4
          }}>
            {n.texto || "Sem texto"}
          </div>

          {n.produtoNome && (
            <div style={{
              fontSize: 12,
              color: "#666",
              marginTop: 6
            }}>
              Produto vinculado: {n.produtoNome}
            </div>
          )}

          {n.imagem && (
            <img
              src={n.imagem}
              style={{
                width: "100%",
                maxWidth: 280,
                marginTop: 10,
                borderRadius: 14,
                objectFit: "cover",
                display: "block",
                border: "1px solid #eee"
              }}
            />
          )}

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 12
          }}>
            <div style={{
              fontSize: 12,
              color: "#666",
              lineHeight: 1.4
            }}>
              <div>
                Destino: {n.para === "todos" ? "Todos os clientes" : "Cliente específico"}
              </div>
              <div>
                Status: {n.ativo === false ? "Desativada" : "Ativa"}
              </div>
            </div>

            <button
              onClick={() => removerNotificacao(n.id)}
              style={{
                height: 38,
                padding: "0 14px",
                borderRadius: 12,
                border: "none",
                background: "#ea1d2c",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              }}
            >
              Excluir
            </button>
          </div>
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



      {mostrarModalVenda && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 12
    }}
  >
    <div
      style={{
        background: "#ffffff",
        padding: 20,
        borderRadius: 18,
        width: "100%",
        maxWidth: 380,
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        border: "1px solid #eee"
      }}
    >
      {/* TÍTULO */}
      <h3
        style={{
          marginTop: 0,
          marginBottom: 16,
          fontSize: 18,
          fontWeight: 800,
          color: "#111"
        }}
      >
        {editandoVenda ? "Editar venda" : "Nova venda"}
      </h3>

      {/* INPUT DESCRIÇÃO */}
      <input
        placeholder="Descrição (ex: venda balcão)"
        value={novaVendaDesc}
        onChange={(e) => setNovaVendaDesc(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          marginBottom: 10,
          borderRadius: 12,
          border: "1px solid #ddd",
          fontSize: 14,
          outline: "none"
        }}
      />

      {/* INPUT VALOR */}
      <input
        type="number"
        placeholder="Valor (ex: 25.90)"
        value={novaVendaValor}
        onChange={(e) => setNovaVendaValor(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          marginBottom: 16,
          borderRadius: 12,
          border: "1px solid #ddd",
          fontSize: 14,
          outline: "none"
        }}
      />

      {/* BOTÕES */}
      <div style={{ display: "flex", gap: 10 }}>
        {/* SALVAR */}
        <button
          onClick={async () => {
            if (!novaVendaDesc || !novaVendaValor) {
              alert("Preencha os campos");
              return;
            }

            try {
              const valorCentavos = Math.round(
                Number(novaVendaValor) * 100
              );

              if (editandoVenda) {
                // 🔥 EDITAR
                await updateDoc(
                  doc(db, "vendasManuais", editandoVenda.id),
                  {
                    descricao: novaVendaDesc,
                    valor: valorCentavos
                  }
                );
              } else {
                // 🔥 CRIAR
                await addDoc(collection(db, "vendasManuais"), {
                  descricao: novaVendaDesc,
                  valor: valorCentavos,
                  data: Date.now()
                });
              }

              // 🔥 LIMPA ESTADO
              setMostrarModalVenda(false);
              setEditandoVenda(null);
              setNovaVendaDesc("");
              setNovaVendaValor("");

            } catch (e) {
              console.log("Erro ao salvar:", e);
              alert("Erro ao salvar venda");
            }
          }}
          style={{
            flex: 1,
            background: "#16a34a",
            color: "#fff",
            padding: 12,
            border: "none",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(22,163,74,0.25)"
          }}
        >
          Salvar
        </button>

        {/* CANCELAR */}
        <button
          onClick={() => {
            setMostrarModalVenda(false);
            setEditandoVenda(null);
          }}
          style={{
            flex: 1,
            background: "#f3f4f6",
            color: "#111",
            padding: 12,
            border: "none",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}


{mostrarModalGasto && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
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
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      border: "1px solid #eee",
      boxSizing: "border-box"
    }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{
          color: "#111",
          margin: 0,
          fontSize: 22
        }}>
          {gastoEditandoId ? "Editar gasto" : "Novo gasto"}
        </h3>

        <p style={{
          marginTop: 6,
          marginBottom: 0,
          fontSize: 13,
          color: "#666"
        }}>
          Cadastre um gasto para acompanhar o lucro real da operação.
        </p>
      </div>

      <input
        placeholder="Nome do gasto"
        value={novoGastoNome}
        onChange={(e) => setNovoGastoNome(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Valor (ex: 25,90)"
        value={novoGastoValor}
        onChange={(e) => setNovoGastoValor(e.target.value)}
        style={inputStyle}
      />

      <select
        value={novaCategoriaGasto}
        onChange={(e) => setNovaCategoriaGasto(e.target.value)}
        style={inputStyle}
      >
        <option value="insumos">Insumos</option>
        <option value="embalagens">Embalagens</option>
        <option value="bebidas">Bebidas</option>
        <option value="energia">Energia</option>
        <option value="internet">Internet</option>
        <option value="transporte">Transporte</option>
        <option value="marketing">Marketing</option>
        <option value="outros">Outros</option>
      </select>

      <input
        type="date"
        value={novaDataGasto}
        onChange={(e) => setNovaDataGasto(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="Observação (opcional)"
        value={novaObservacaoGasto}
        onChange={(e) => setNovaObservacaoGasto(e.target.value)}
        style={{
          ...inputStyle,
          minHeight: 90,
          resize: "none"
        }}
      />

      <div style={{
        display: "flex",
        gap: 10,
        marginTop: 6
      }}>
        <button
          onClick={() => {
            limparFormularioGasto();
            setMostrarModalGasto(false);
          }}
          style={btnCancel}
        >
          Cancelar
        </button>

        <button
          onClick={salvarGasto}
          disabled={loadingGasto}
          style={{
            ...btnPrimary,
            flex: 1,
            opacity: loadingGasto ? 0.7 : 1
          }}
        >
          {loadingGasto ? "Salvando..." : gastoEditandoId ? "Salvar alteração" : "Salvar gasto"}
        </button>
      </div>
    </div>
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
      maxWidth: 380,           // 🔥 menor largura (mobile fica melhor)
      maxHeight: "82vh",
      overflowY: "auto",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      border: "1px solid #eee",
      boxSizing: "border-box"
    }}>


      {/* 🔥 FIDELIDADE */}
<div
  style={{
    marginTop: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f9fafb",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #eee"
  }}
>
  <div>
    <div
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: "#111"
      }}
    >
      Participa do fidelidade
    </div>

    <div
      style={{
        fontSize: 11,
        color: "#666",
        marginTop: 2
      }}
    >
      Produto conta pontos para o cliente
    </div>
  </div>

  <input
    type="checkbox"
    checked={fidelidade}
    onChange={(e) => setFidelidade(e.target.checked)}
    style={{
      width: 18,
      height: 18,
      cursor: "pointer"
    }}
  />
</div>

<div
  style={{
    marginTop: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f9fafb",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #eee"
  }}
>
  <div>
    <div
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: "#111"
      }}
    >
      Pode ser resgatado grátis
    </div>

    <div
      style={{
        fontSize: 11,
        color: "#666",
        marginTop: 2
      }}
    >
      Produto liberado no plano fidelidade
    </div>
  </div>

  <input
    type="checkbox"
    checked={resgate}
    onChange={(e) => setResgate(e.target.checked)}
    style={{
      width: 18,
      height: 18,
      cursor: "pointer"
    }}
  />
</div>

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

      {/* BLOCO PROMOÇÃO */}
      <div
        style={{
          marginTop: 14,
          padding: 14,
          borderRadius: 16,
          background: "#fff",
          border: promocaoAtiva
            ? "1px solid #ea1d2c"
            : "1px solid #eee",
          boxShadow: promocaoAtiva
            ? "0 6px 16px rgba(234,29,44,0.15)"
            : "0 2px 8px rgba(0,0,0,0.04)",
          transition: "0.2s"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: promocaoAtiva ? "#ea1d2c" : "#333"
            }}
          >
            Promoção
          </span>

          <input
            type="checkbox"
            checked={promocaoAtiva}
            onChange={(e) => setPromocaoAtiva(e.target.checked)}
          />
        </div>

        {promocaoAtiva && (
          <input
            value={novoPrecoPromocional}
            onChange={(e) => setNovoPrecoPromocional(e.target.value)}
            placeholder="Preço promocional"
            style={{
              ...inputStyle,
              marginTop: 12,
              border: "1px solid #ddd",
              background: "#fafafa"
            }}
          />
        )}
      </div>

      {/* TAMANHO */}
      <input
        placeholder="Tamanho"
        value={novoTamanho}
        onChange={(e) => setNovoTamanho(e.target.value)}
        style={inputStyle}
      />
      {/* NOVO TAMANHO */}
     <input
     placeholder="Ex: Ideal para 1 pessoa"
     value={novaDescricaoTamanho}
     onChange={(e) => setNovaDescricaoTamanho(e.target.value)}
     style={inputStyle}
    />
      {/* DESCRIÇÃO */}
      <input
        placeholder="Descrição"
        value={novaDescricao}
        onChange={(e) => setNovaDescricao(e.target.value)}
        style={inputStyle}
      />



      {/* AVALIAÇÃO */}
<div
  style={{
    marginTop: 14,
    padding: 14,
    borderRadius: 16,
    background: "#fffdf7",
    border: mostrarAvaliacao ? "1px solid #f59e0b" : "1px solid #eee",
    boxShadow: mostrarAvaliacao
      ? "0 6px 16px rgba(245,158,11,0.12)"
      : "0 2px 8px rgba(0,0,0,0.04)",
    transition: "0.2s"
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12
    }}
  >
    <div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: "#111"
        }}
      >
        Avaliação do produto
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#666",
          marginTop: 4,
          lineHeight: 1.4
        }}
      >
        Exibe a nota e a quantidade de avaliações no card do cliente.
      </div>
    </div>

    <input
      type="checkbox"
      checked={mostrarAvaliacao}
      onChange={(e) => setMostrarAvaliacao(e.target.checked)}
    />
  </div>

  {mostrarAvaliacao && (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 10,
        marginTop: 12
      }}
    >
      <input
        value={novaAvaliacao}
        onChange={(e) => setNovaAvaliacao(e.target.value)}
        placeholder="Nota (ex: 4.8)"
        style={{
          ...inputStyle,
          marginBottom: 0,
          background: "#fff"
        }}
      />

      <input
        value={novoTotalAvaliacoes}
        onChange={(e) => setNovoTotalAvaliacoes(e.target.value)}
        placeholder="Total de avaliações (ex: 120)"
        style={{
          ...inputStyle,
          marginBottom: 0,
          background: "#fff"
        }}
      />
    </div>
  )}

  {mostrarAvaliacao && (
    <div
      style={{
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap"
      }}
    >
      <span
        style={{
          fontSize: 11,
          background: "#fff7ed",
          color: "#ea580c",
          padding: "4px 8px",
          borderRadius: 999,
          fontWeight: 800
        }}
      >
        ⭐ {novaAvaliacao || "0.0"}
      </span>

      <span
        style={{
          fontSize: 11,
          color: "#666",
          fontWeight: 600
        }}
      >
        {novoTotalAvaliacoes || "0"} avaliações
      </span>
    </div>
  )}
</div>


{/* COPIAR EXTRAS DE OUTRO PRODUTO */}
<div
  style={{
    marginTop: 16,
    marginBottom: 14,
    padding: 14,
    borderRadius: 16,
    background: "#f8f8f8",
    border: "1px solid #ececec"
  }}
>
  <div
    style={{
      fontSize: 14,
      fontWeight: 700,
      color: "#111",
      marginBottom: 10
    }}
  >
    Copiar extras de outro produto
  </div>

  <div
    style={{
      display: "flex",
      gap: 8,
      alignItems: "center",
      flexWrap: isMobile ? "wrap" : "nowrap"
    }}
  >
    <select
      value={produtoOrigemExtras}
      onChange={(e) => setProdutoOrigemExtras(e.target.value)}
      style={{
        ...inputStyle,
        flex: 1,
        marginBottom: 0
      }}
    >
      <option value="">Selecionar produto</option>

      {produtos
        .filter((p) => p.id !== produtoEditandoId)
        .map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
    </select>

    <button
      onClick={() => copiarExtrasDeProduto(produtoOrigemExtras)}
      style={{
        height: 40,
        padding: "0 11px",
        borderRadius: 6,
        border: "none",
        background: "#111",
        color: "#fff",
        fontWeight: 100,
        cursor: "pointer"
        
      }}
    >
      Copiar extras
    </button>
  </div>

  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#666",
      lineHeight: 1.4
    }}
  >
    Isso substitui os extras atuais do produto aberto pelos extras do produto selecionado.
  </div>
</div>



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

  {/* NOVA CATEGORIA */}
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
            categoria: novaCategoria.trim(),
            min: 0,
            max: 5,
            permitirRepetir: false,
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
        cursor: "pointer"
      }}
    >
      ➕
    </button>
  </div>



  {/* LISTA GRUPOS */}
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
      {/* TOPO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10
        }}
      >
        <strong style={{ color: "#111" }}>
          {grupo.categoria}
        </strong>

        <button
          onClick={() => {
            setExtras(prev =>
              prev.filter((_, index) => index !== i)
            );
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
          Remover
        </button>
      </div>

      {/* MIN / MAX */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          type="number"
          placeholder="Min"
          value={grupo.min}
          onChange={(e) => {
            const novo = [...extras];
            novo[i].min = Number(e.target.value);
            setExtras(novo);
          }}
          style={{ ...inputStyle, marginBottom: 0 }}
        />

        <input
          type="number"
          placeholder="Max"
          value={grupo.max}
          onChange={(e) => {
            const novo = [...extras];
            novo[i].max = Number(e.target.value);
            setExtras(novo);
          }}
          style={{ ...inputStyle, marginBottom: 0 }}
        />
      </div>

      {/* REPETIR */}
      <div style={{ marginBottom: 10 }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "#111",
            fontWeight: 600
          }}
        >
          <input
            type="checkbox"
            checked={grupo.permitirRepetir === true}
            onChange={(e) => {
              const novo = [...extras];
              novo[i].permitirRepetir = e.target.checked;
              setExtras(novo);
            }}
          />
          Permitir repetir item
        </label>
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
              novo[i].itens[j].preco =
                Math.round(Number(e.target.value) * 100);
              setExtras(novo);
            }}
            style={{ width: 80, ...inputStyle, marginBottom: 0 }}
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
            X
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
        Adicionar item
      </button>
    </div>
  ))}

  {/* IMAGEM */}
  <div style={{ marginTop: 14, marginBottom: 12 }}>
    <label style={{ fontSize: 13, color: "#666" }}>
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
      style={{ width: "100%" }}
    />
  </div>

  {/* PREVIEW */}
  {novaImagem && (
    <img
      src={novaImagem}
      style={{
        width: "100%",
        height: 180,
        objectFit: "cover",
        borderRadius: 16,
        border: "1px solid #eee",
        marginBottom: 14
      }}
    />
  )}

  {/* MAIS VENDIDO */}
  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "#111",
      marginBottom: 16,
      fontWeight: "bold"
    }}
  >
    <input
      type="checkbox"
      checked={maisVendido}
      onChange={(e) => setMaisVendido(e.target.checked)}
    />
    Mais vendido
  </label>

 {/* BOTÕES FIXOS DENTRO DO MODAL */}
<div
  style={{
    position: "sticky",
    bottom: -20, // 🔥 sobe um pouco (ajuste fino)
    marginTop: 20,
    paddingTop: 10,

    background: "#fff",
    display: "flex",
    gap: 10,
    borderTop: "1px solid #eee",

    // 🔥 sombra pra destacar
    boxShadow: "0 -50px 180px rgba(0,0,0,0.08)"
  }}
>
  <button
    onClick={salvarProduto}
    style={{
      flex: 1,
      height: 50,
      borderRadius: 16,
      border: "none",
      background: "linear-gradient(135deg,#16a34a,#22c55e)",
      color: "#fff",
      fontWeight: 800,
      fontSize: 15
    }}
  >
    Salvar
  </button>

  <button
    onClick={() => setMostrarModalProduto(false)}
    style={{
      flex: 1,
      height: 50,
      borderRadius: 16,
      border: "1px solid #e5e7eb",
      background: "#fff",
      color: "#111",
      fontWeight: 700,
      fontSize: 15
    }}
  >
    Cancelar
  </button>
</div>

</div>
    </div>
  </div>
)}


      {/* PRODUTOS */}
      {abaAdmin === "produtos" && (
  <div
    style={{
      marginTop: 15,
      padding: 18,
      background: "#f4f5f7",
      borderRadius: 20
    }}
  >
    {/* TOPO */}
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap"
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#111",
              fontSize: 24,
              fontWeight: 800
            }}
          >
            Produtos
          </h2>

          <p
            style={{
              marginTop: 6,
              marginBottom: 0,
              fontSize: 13,
              color: "#666"
            }}
          >
            Gerencie os produtos da loja, altere status, edite e reorganize a ordem.
          </p>
        </div>

        <button
  onClick={() => {
    setProdutoEditandoId(null);
    setNovoNome("");
    setNovoPreco("");
    setNovoPrecoPromocional("");
    setPromocaoAtiva(false);
    setNovoTamanho("");
    setNovaDescricaoTamanho(produto.descricaoTamanho || "");
    setNovaDescricao("");
    setNovaImagem("");
    setMaisVendido(false);
    setCategoria(categorias?.[0]?.slug || "");
    setExtras([]);
    setNovaCategoria("");
    setProdutoOrigemExtras("");
    setMostrarAvaliacao(false);
    setNovaAvaliacao("");
    setNovoTotalAvaliacoes("");
    setMostrarModalProduto(true);
  }}
  style={{
    height: 42,
    padding: "0 16px",
    borderRadius: 12,
    border: "none",
    background: "#ea1d2c",
    color: "#fff",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    whiteSpace: "nowrap"
  }}
>
  + Novo produto
</button>
      </div>
    </div>

    {/* LISTA */}
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}
    >
      {produtos.length === 0 ? (
        <div
          style={{
            padding: "24px 10px",
            textAlign: "center",
            color: "#777",
            fontSize: 14
          }}
        >
          Nenhum produto cadastrado.
        </div>
      ) : (
        produtos.map((p) => (
  <div
    key={p.id}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
      padding: 12,
      borderRadius: 16,
      background: "#fff",
      marginBottom: 10,
      border: "1px solid #ececec",
      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      flexWrap: isMobile ? "wrap" : "nowrap"
    }}
  >
    {/* ESQUERDA */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flex: 1,
        minWidth: 0
      }}
    >
      <img
        src={p.imagem || "/acai.png"}
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          objectFit: "cover",
          border: "1px solid #eee",
          flexShrink: 0
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#111",
            lineHeight: 1.2
          }}
        >
          {p.nome}
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#555",
            marginTop: 4,
            lineHeight: 1.3
          }}
        >
          {p.promocao === true &&
          Number(p.precoPromocional || 0) > 0 &&
          Number(p.precoPromocional || 0) < Number(p.preco || 0) ? (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                  marginRight: 6
                }}
              >
                {formatarReal(Number(p.preco || 0))}
              </span>
              <strong style={{ color: "#ea1d2c" }}>
                {formatarReal(Number(p.precoPromocional || 0))}
              </strong>
            </>
          ) : (
            <strong>{formatarReal(Number(p.preco || 0))}</strong>
          )}

          <span style={{ color: "#bbb", margin: "0 6px" }}>•</span>
          <span>{p.tamanho || "Sem tamanho"}</span>
        </div>

        {!!p.descricao && (
          <div
            style={{
              fontSize: 12,
              color: "#777",
              marginTop: 4,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%"
            }}
          >
            {p.descricao}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginTop: 6
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              background: p.ativo ? "#e8f7ec" : "#fdecec",
              color: p.ativo ? "#15803d" : "#b91c1c"
            }}
          >
            {p.ativo ? "Ativo" : "Inativo"}
          </span>

          {p.maisVendido && (
            <span
              style={{
                padding: "4px 8px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                background: "#fff1f2",
                color: "#e11d48"
              }}
            >
              Mais vendido
            </span>
          )}

          {Array.isArray(p.extras) && p.extras.length > 0 && (
            <span
              style={{
                padding: "4px 8px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                background: "#f3f4f6",
                color: "#555"
              }}
            >
              {p.extras.length} extras
            </span>
          )}
        </div>
      </div>
    </div>

    {/* DIREITA */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: isMobile ? "wrap" : "nowrap",
        justifyContent: isMobile ? "flex-start" : "flex-end"
      }}
    >
      <button
        onClick={() => abrirEdicao(p)}
        title="Editar produto"
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          border: "1px solid #e5e5e5",
          background: "#fff",
          color: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        <Pencil size={17} />
      </button>

      <button
        onClick={() => toggleProduto(p)}
        title={p.ativo ? "Desativar produto" : "Ativar produto"}
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          border: "1px solid #e5e5e5",
          background: p.ativo ? "#fff7ed" : "#ecfdf3",
          color: p.ativo ? "#9a3412" : "#166534",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        {p.ativo ? <PowerOff size={17} /> : <Power size={17} />}
      </button>

      <button
        onClick={() => moverProduto(p, -1)}
        title="Mover para cima"
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          border: "1px solid #e5e5e5",
          background: "#fff",
          color: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        <ArrowUp size={17} />
      </button>

      <button
        onClick={() => moverProduto(p, 1)}
        title="Mover para baixo"
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          border: "1px solid #e5e5e5",
          background: "#fff",
          color: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        <ArrowDown size={17} />
      </button>

      <button
        onClick={() => excluirProduto(p)}
        title="Excluir produto"
        style={{
          height: 40,
          padding: "0 12px",
          borderRadius: 12,
          border: "none",
          background: "#ea1d2c",
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          cursor: "pointer"
        }}
      >
        <Trash2 size={15} />
        Excluir
      </button>
       </div>
       </div>
       ))
      )}
    </div>
  </div>
)}


{abaAdmin === "avaliacoes" && (
  <div
    style={{
      marginTop: 15,
      padding: 16,
      background: "#ffffff",
      borderRadius: 20
    }}
  >
    {/* HEADER */}
<div style={{ marginBottom: 14 }}>
  <h2
    style={{
      margin: 0,
      fontSize: 20,
      fontWeight: 800,
      color: "#111" // 👈 aqui
    }}
  >
    Avaliações
  </h2>
</div>

    {/* FILTROS */}
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        marginBottom: 14
      }}
    >
      {["todas", "pendente", "aprovado", "recusado"].map((f) => {
        const count =
          f === "todas"
            ? avaliacoes.length
            : avaliacoes.filter((a) => a.status === f).length;

        const ativo = filtroAvaliacao === f;

        return (
          <div
            key={f}
            onClick={() => setFiltroAvaliacao(f)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: ativo ? "#111" : "#fff",
              color: ativo ? "#fff" : "#666",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              border: "1px solid #eee",
              whiteSpace: "nowrap"
            }}
          >
            {f} ({count})
          </div>
        );
      })}
    </div>

    {/* BUSCA */}
    <input
      value={busca}
      onChange={(e) => setBusca(e.target.value)}
      placeholder="Buscar produto..."
      style={{
        width: "100%",
        padding: 10,
        borderRadius: 10,
        border: "1px solid #eee",
        marginBottom: 14,
        fontSize: 13
      }}
    />

    {/* LISTA */}
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #eee"
      }}
    >
      {avaliacoes
        .filter((a) => {
          const produto = produtos.find((p) => p.id === a.produtoId);

          const passaFiltro =
            filtroAvaliacao === "todas" ||
            a.status === filtroAvaliacao;

          const passaBusca =
            !busca ||
            produto?.nome?.toLowerCase().includes(busca.toLowerCase());

          return passaFiltro && passaBusca;
        })
        .sort((a, b) => Number(b.criadoEm) - Number(a.criadoEm))
        .map((a) => {
          const produto = produtos.find((p) => p.id === a.produtoId);

          const corStatus =
            a.status === "aprovado"
              ? "#16a34a"
              : a.status === "recusado"
              ? "#dc2626"
              : "#f59e0b";

          return (
            <div
              key={a.id}
              style={{
                padding: 12,
                borderBottom: "1px solid #f2f2f2"
              }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <img
                  src={produto?.imagem || "/acai.png"}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    objectFit: "cover"
                  }}
                />

                <div style={{ flex: 1 }}>
                  {/* NOME */}
                  <div style={{ fontWeight: 700, fontSize: 14 }}>
                    {produto?.nome || "Produto"}
                  </div>

                  {/* PEDIDO */}
                  <div
                    style={{
                      fontSize: 12,
                      color: "#666",
                      marginTop: 2
                    }}
                  >
                    Pedido #{a.pedidoId?.slice(0, 6)}
                  </div>

                  {/* NOTA + STATUS */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 4,
                      fontSize: 12
                    }}
                  >
                    <span
                      style={{
                        color: "#f59e0b",
                        fontWeight: 700
                      }}
                    >
                      ⭐ {a.nota.toFixed(1)}
                    </span>

                    <span style={{ color: "#999" }}>•</span>

                    <span style={{ color: corStatus }}>
                      {a.status}
                    </span>
                  </div>

                  {/* COMENTÁRIO */}
{!!a.comentario && (
  <div
    style={{
      marginTop: 8,
      fontSize: 12,
      color: "#555",
      background: "#fafafa",
      padding: 8,
      borderRadius: 8
    }}
  >
    {a.comentario}
  </div>
)}

{/* FEEDBACKS (🔥 ADICIONADO) */}
{Array.isArray(a.feedbacks) && a.feedbacks.length > 0 && (
  <div
    style={{
      marginTop: 6,
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }}
  >
    {a.feedbacks.map((f, i) => (
      <span
        key={i}
        style={{
          fontSize: 11,
          background: "#f1f5f9",
          padding: "4px 8px",
          borderRadius: 999,
          color: "#475569",
          fontWeight: 600
        }}
      >
        {f}
      </span>
    ))}
  </div>
)}

                  {/* AÇÕES */}
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 10
                    }}
                  >
                    <button
                      onClick={() => aprovarAvaliacao(a)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        border: "1px solid #e5e7eb",
                        background: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        color:
                          a.status === "aprovado"
                            ? "#16a34a"
                            : "#333"
                      }}
                    >
                      Aprovar
                    </button>

                    <button
                      onClick={() => recusarAvaliacao(a)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        border: "1px solid #fee2e2",
                        background: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        color: "#dc2626"
                      }}
                    >
                      Recusar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
      }}
    >
      <h3 style={{ margin: 0, color: "#111" }}>
        Em andamento
      </h3>

      <span
        style={{
          background: "#eef2ff",
          color: "#4338ca",
          padding: "6px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: "bold"
        }}
      >
        {
          pedidos
            .filter(p => {
              if (!buscaCodigo) return true;
              return (p.codigo || "")
                .toLowerCase()
                .includes(buscaCodigo.toLowerCase());
            })
            .filter(p =>
              p.status !== "entregue" &&
              p.status !== "cancelado"
            )
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
      .filter(p =>
        p.status !== "entregue" &&
        p.status !== "cancelado"
      )
      .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
      .slice(0, 10)
      .map((p) => {

        const status = p.status || "novo";

        const cores = {
          novo: "#888",
          preparando: "orange",
          saiu: "#00b0ff",
          entregue: "#00c853",
          cancelado: "#dc2626"
        };

        const temFidelidade =
          Array.isArray(p.itens) &&
          p.itens.some(item => item.gratis);

        return (
          <div
            key={p.id}
            style={{
              borderLeft: `5px solid ${
                temFidelidade ? "#16a34a" : cores[status]
              }`,
              marginBottom: 15,
              background: temFidelidade ? "#f0fdf4" : "#ffffff",
              borderRadius: 16,
              padding: 14,
              boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
              border: temFidelidade
                ? "1px solid #bbf7d0"
                : "1px solid #ececec",
              color: "#111"
            }}
          >

            {temFidelidade && (
              <div
                style={{
                  background: "#16a34a",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  display: "inline-block",
                  marginBottom: 8
                }}
              >
                Fidelidade
              </div>
            )}

            <div style={{ marginBottom: 8 }}>
              <strong>{p.cliente?.nome || "Cliente"}</strong><br />
              <small>{p.cliente?.telefone}</small><br />
              <small>
                {p.cliente?.endereco}, {p.cliente?.numero}
              </small>
            </div>

            <p style={{ margin: "8px 0" }}>
              Código: <strong>{p.codigo || "—"}</strong>
            </p>

            {Array.isArray(p.itens) &&
              p.itens.map((item, idx) => (
                <div key={idx} style={{ marginBottom: 6 }}>
                  <p style={{ margin: "4px 0" }}>
                    <strong>
                      {item.produto?.nome || item.nome || "Produto"} (x
                      {item.quantidade || 1})
                    </strong>

                    {item.gratis && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 11,
                          color: "#16a34a",
                          fontWeight: 700
                        }}
                      >
                        Grátis
                      </span>
                    )}
                  </p>
                  {/* 🔥 TAMANHO (NOVO) */}
{/* 🔥 TAMANHO (CORRIGIDO COM FALLBACK) */}
{(() => {
  const produtoBanco = produtos.find(prod =>
    prod.id === item.produtoId ||
    prod.nome === item.nome ||
    prod.nome === item.produto?.nome
  );

  const tamanhoFinal =
    item.tamanho ||
    produtoBanco?.tamanho ||
    "";

  const descricaoFinal =
    item.descricaoTamanho ||
    produtoBanco?.descricaoTamanho ||
    "";

  if (!tamanhoFinal && !descricaoFinal) return null;

  return (
    <div
      style={{
        display: "inline-block",
        background: "#f3e8ff",
        color: "#6b21a8",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: 999,
        marginTop: 2
      }}
    >
      {tamanhoFinal}
      {descricaoFinal && ` • ${descricaoFinal}`}
    </div>
  );
})()}

                  {Array.isArray(item.extras) &&
  item.extras.map((e, i) => {
    const qtd = Number(e?.qtd || 1);

    return (
      <p
        key={i}
        style={{
          fontSize: 12,
          opacity: 0.7,
          margin: "2px 0"
        }}
      >
        + {e.nome} {qtd > 1 ? `x${qtd}` : ""}
      </p>
    );
  })}
                </div>
              ))}

            <p style={{ margin: "8px 0" }}>
              Status:
              <strong
                style={{
                  marginLeft: 6,
                  color: cores[status]
                }}
              >
                {status}
              </strong>
            </p>

            <p style={{ margin: "8px 0" }}>
              Pagamento:
              <span
                style={{
                  background:
                    p.formaPagamento === "pix"
                      ? "#a855f7"
                      : p.formaPagamento === "dinheiro"
                      ? "#22c55e"
                      : "#3b82f6",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: 8,
                  fontSize: 12,
                  marginLeft: 6
                }}
              >
                {p.formaPagamento === "pix" && "Pix"}
                {p.formaPagamento === "dinheiro" && "Dinheiro"}
                {p.formaPagamento === "cartao_online" && "Cartão"}
                {p.formaPagamento === "cartao" && "Cartão"}
              </span>
            </p>

            <p style={{ margin: "8px 0" }}>
              Total: <strong>{formatarReal(p.total)}</strong>
            </p>

            <small style={{ color: "#666" }}>
              {p.data
                ? new Date(p.data).toLocaleString("pt-BR")
                : ""}
            </small>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 10
              }}
            >
              {status === "novo" && (
                <button
                  onClick={() =>
                    atualizarStatus(p.id, "preparando")
                  }
                >
                  Preparar
                </button>
              )}

              {status === "preparando" && (
                <button
                  onClick={() =>
                    atualizarStatus(p.id, "saiu")
                  }
                >
                  Saiu
                </button>
              )}

              {status === "saiu" && (
                <button
                  onClick={() =>
                    atualizarStatus(p.id, "entregue")
                  }
                >
                  Entregue
                </button>
              )}
            </div>

            <button
              onClick={() => cancelarPedido(p.id)}
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                background: "#dc2626",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Cancelar
            </button>
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
      .filter(p =>
        p.status !== "entregue" &&
        p.status !== "cancelado"
      )
      .length === 0 && (
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            color: "#666",
            textAlign: "center",
            border: "1px solid #ececec"
          }}
        >
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
          .map((p) => {

  // 🔥 DETECTA FIDELIDADE
  const temFidelidade = Array.isArray(p.itens)
    && p.itens.some(item => item.gratis);

  return (
    <div
      key={p.id}
      style={{
        opacity: 0.9,
        borderLeft: `5px solid ${temFidelidade ? "#16a34a" : "#00c853"}`,
        marginBottom: 15,
        background: temFidelidade ? "#f0fdf4" : "#ffffff",
        borderRadius: 16,
        padding: 14,
        boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
        border: temFidelidade
          ? "1px solid #bbf7d0"
          : "1px solid #ececec",
        color: "#111"
      }}
    >

      {/* 🔥 BADGE FIDELIDADE */}
      {temFidelidade && (
        <div style={{
          background: "#16a34a",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          display: "inline-block",
          marginBottom: 8
        }}>
          🎁 Fidelidade
        </div>
      )}

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

      {Array.isArray(p.itens) && p.itens.map((item, idx) => (
        <div key={idx} style={{ marginBottom: 6 }}>
          <p style={{ margin: "4px 0" }}>
            <strong>
              {item.produto?.nome || item.nome || "Açaí"} (x{item.quantidade || 1})
            </strong>

            {/* 🔥 ITEM GRÁTIS */}
            {item.gratis && (
              <span style={{
                marginLeft: 6,
                fontSize: 11,
                color: "#16a34a",
                fontWeight: 700
              }}>
                🎁 GRÁTIS
              </span>
            )}
          </p>

          {/* 🔥 TAMANHO (NOVO) */}
{/* 🔥 TAMANHO (CORRIGIDO COM FALLBACK) */}
{(() => {
  const produtoBanco = produtos.find(prod =>
    prod.id === item.produtoId ||
    prod.nome === item.nome ||
    prod.nome === item.produto?.nome
  );

  const tamanhoFinal =
    item.tamanho ||
    produtoBanco?.tamanho ||
    "";

  const descricaoFinal =
    item.descricaoTamanho ||
    produtoBanco?.descricaoTamanho ||
    "";

  if (!tamanhoFinal && !descricaoFinal) return null;

  return (
    <div
      style={{
        display: "inline-block",
        background: "#f3e8ff",
        color: "#6b21a8",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: 999,
        marginTop: 2
      }}
    >
      {tamanhoFinal}
      {descricaoFinal && ` • ${descricaoFinal}`}
    </div>
  );
})()}

          {Array.isArray(item.extras) &&
  item.extras.map((e, i) => {
    const qtd = Number(e?.qtd || 1);

    return (
      <p
        key={i}
        style={{
          fontSize: 12,
          opacity: 0.7,
          margin: "2px 0"
        }}
      >
        + {e.nome} {qtd > 1 ? `x${qtd}` : ""}
      </p>
    );
  })}
        </div>
      ))}

      <p style={{ margin: "8px 0" }}>
        Total: <strong>{formatarReal(p.total)}</strong>
      </p>

      <small style={{ color: "#666" }}>
        {p.data ? new Date(p.data).toLocaleString("pt-BR") : ""}
      </small>
    </div>
    
  );
})
}

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


{abaAdmin === "cancelados" && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 10,
      background: "#f3f4f6", // 🔥 fundo geral
      padding: 10,
      borderRadius: 12
    }}
  >
    {Object.entries(agrupados).map(([cliente, lista]) => {
      const abertoCliente = aberto === cliente;

      return (
        <div
          key={cliente}
          style={{
            borderRadius: 14,
            background: "#ffffff", // 🔥 card branco limpo
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            overflow: "hidden"
          }}
        >
          {/* HEADER CLIENTE */}
          <div
            onClick={() =>
              setAberto(abertoCliente ? null : cliente)
            }
            style={{
              padding: "12px 14px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f9fafb" // 🔥 leve contraste
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: "#111" }}>
                {cliente}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                {lista.length} pedido(s) cancelado(s)
              </div>
            </div>

            <div
              style={{
                background: "#ef4444",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700
              }}
            >
              Cancelados
            </div>
          </div>

          {/* LISTA */}
          {abertoCliente && (
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                background: "#f3f4f6"
              }}
            >
              {lista.map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: "10px 14px",
                    borderBottom: "1px solid #e5e7eb"
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      color: "#111",
                      fontWeight: 600
                    }}
                  >
                    #{p.codigo} — {formatarReal(p.total)}
                  </div>

                  {/* ITENS */}
                  {Array.isArray(p.itens) &&
                    p.itens.map((item, i) => (
                      <div key={i} style={{ marginTop: 4 }}>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#374151"
                          }}
                        >
                          {item.nome} (x{item.quantidade})
                        </div>

                        {/* EXTRAS */}
                        {Array.isArray(item.extras) &&
                          item.extras.map((e, j) => {
                            const qtd = Number(e?.qtd || 1);

                            return (
                              <div
                                key={j}
                                style={{
                                  fontSize: 11,
                                  color: "#6b7280",
                                  marginLeft: 6
                                }}
                              >
                                + {e.nome}{" "}
                                {qtd > 1 ? `x${qtd}` : ""}
                              </div>
                            );
                          })}
                      </div>
                    ))}

                  {/* DATA */}
                  <div
                    style={{
                      fontSize: 11,
                      color: "#9ca3af",
                      marginTop: 4
                    }}
                  >
                    {p.data
                      ? new Date(p.data).toLocaleString("pt-BR")
                      : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    })}

    {pedidosCancelados.length === 0 && (
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 18,
          textAlign: "center",
          color: "#6b7280",
          border: "1px solid #e5e7eb"
        }}
      >
        Nenhum pedido cancelado
      </div>
    )}
  </div>
)}


{abaAdmin === "banners" && (
  <div
    style={{
      marginTop: 15,
      padding: 18,
      background: "#f4f5f7",
      borderRadius: 20
    }}
  >
    {/* TOPO */}
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#111",
          fontSize: 24,
          fontWeight: 800
        }}
      >
        Banners
      </h2>

      <p
        style={{
          marginTop: 6,
          marginBottom: 0,
          fontSize: 13,
          color: "#666"
        }}
      >
        Adicione banners promocionais com imagem direto do celular.
      </p>
    </div>

    {/* FORMULÁRIO */}
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 14,
          color: "#111",
          fontSize: 18,
          fontWeight: 800
        }}
      >
        {bannerEditandoId ? "Editar banner" : "Novo banner"}
      </h3>

      <input
        value={bannerTitulo}
        onChange={(e) => setBannerTitulo(e.target.value)}
        placeholder="Título do banner"
        style={input}
      />

      <input
        value={bannerSubtitulo}
        onChange={(e) => setBannerSubtitulo(e.target.value)}
        placeholder="Subtítulo do banner"
        style={input}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setBannerImagemFile(file);

          const reader = new FileReader();
          reader.onload = () => {
            setBannerPreview(reader.result);
          };
          reader.readAsDataURL(file);
        }}
        style={{
          ...input,
          background: "#fff",
          cursor: "pointer"
        }}
      />

      {bannerPreview && (
        <div style={{ marginTop: 14 }}>
          <img
            src={bannerPreview}
            style={{
              width: "100%",
              maxWidth: 420,
              height: 180,
              objectFit: "cover",
              borderRadius: 18,
              border: "1px solid #eee",
              display: "block"
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 16,
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={salvarBanner}
          disabled={bannerLoading}
          style={{
            ...btnPrimary,
            minWidth: 170,
            opacity: bannerLoading ? 0.7 : 1,
            cursor: bannerLoading ? "not-allowed" : "pointer"
          }}
        >
          {bannerLoading
            ? "Salvando..."
            : bannerEditandoId
            ? "Salvar alteração"
            : "Adicionar banner"}
        </button>

        {bannerEditandoId && (
          <button
            onClick={limparFormularioBanner}
            style={{
              height: 46,
              minWidth: 120,
              padding: "0 16px",
              borderRadius: 14,
              border: "1px solid #dcdcdc",
              background: "#f8f8f8",
              color: "#111",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>

    {/* LISTA */}
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        border: "1px solid #ececec"
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 14,
          color: "#111",
          fontSize: 18,
          fontWeight: 800
        }}
      >
        Banners cadastrados
      </h3>

      {banners.length === 0 && (
        <div
          style={{
            color: "#777",
            fontSize: 14
          }}
        >
          Nenhum banner cadastrado.
        </div>
      )}

      {banners.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 12,
            borderRadius: 16,
            border: "1px solid #eee",
            marginBottom: 12,
            background: "#fff",
            flexWrap: isMobile ? "wrap" : "nowrap"
          }}
        >
          {/* ESQUERDA */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flex: 1,
              minWidth: 0
            }}
          >
            <img
              src={item.imagem}
              style={{
                width: 110,
                height: 64,
                objectFit: "cover",
                borderRadius: 12,
                border: "1px solid #eee",
                flexShrink: 0
              }}
            />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111",
                  lineHeight: 1.2
                }}
              >
                {item.titulo}
              </div>

              {!!item.subtitulo && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#666",
                    marginTop: 4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {item.subtitulo}
                </div>
              )}

              <div
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  color: item.ativo === false ? "#888" : "#15803d",
                  fontWeight: 700
                }}
              >
                {item.ativo === false ? "Desativado" : "Ativo"}
              </div>
            </div>
          </div>

          {/* DIREITA */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: isMobile ? "flex-start" : "flex-end"
            }}
          >
            <button
              onClick={() => abrirEdicaoBanner(item)}
              title="Editar banner"
              style={{
                height: 40,
                padding: "0 12px",
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                background: "#fff",
                color: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 13
              }}
            >
              <ImagePlus size={15} />
              Editar
            </button>

            <button
              onClick={() => alternarStatusBanner(item)}
              title={item?.ativo === false ? "Ativar banner" : "Desativar banner"}
              style={{
                height: 40,
                padding: "0 12px",
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                background: item?.ativo === false ? "#ecfdf3" : "#fff7ed",
                color: item?.ativo === false ? "#166534" : "#9a3412",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 13
              }}
            >
              {item?.ativo === false ? <Power size={15} /> : <PowerOff size={15} />}
              {item?.ativo === false ? "Ativar" : "Desativar"}
            </button>

            <button
              onClick={() => moverBanner(item, -1)}
              title="Mover para cima"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                background: "#fff",
                color: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <ChevronUp size={16} />
            </button>

            <button
              onClick={() => moverBanner(item, 1)}
              title="Mover para baixo"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                background: "#fff",
                color: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <ChevronDown size={16} />
            </button>

            <button
              onClick={() => excluirBanner(item)}
              title="Excluir banner"
              style={{
                height: 40,
                padding: "0 12px",
                borderRadius: 12,
                border: "none",
                background: "#ea1d2c",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 13
              }}
            >
              <Trash2 size={15} />
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}







  {isMobile && (
  <>
    {/* NAVBAR */}
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        zIndex: 9999,
        paddingBottom: "env(safe-area-inset-bottom)"
      }}
    >
      {[
        { id: "dashboard", icon: Home },
        { id: "pedidos", icon: ClipboardList },
        { id: "produtos", icon: Package },
        { id: "gastos", icon: DollarSign }
      ].map((item) => {
        const Icon = item.icon;
        const ativo = abaAdmin === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setAbaAdmin(item.id)}
            style={{
              flex: 1,
              height: 52,
              border: "none",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer"
            }}
          >
            <Icon
              size={22}
              color={ativo ? "#ea1d2c" : "#6b7280"}
            />

            {/* BADGE PEDIDOS */}
            {item.id === "pedidos" && pedidosEmAndamento > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  right: "25%",
                  background: "#ea1d2c",
                  color: "#fff",
                  borderRadius: 999,
                  fontSize: 9,
                  padding: "2px 6px",
                  fontWeight: 800
                }}
              >
                {pedidosEmAndamento}
              </div>
            )}
          </button>
        );
      })}

      {/* BOTÃO MAIS */}
      <button
        onClick={() => setAbrirMaisMenu(true)}
        style={{
          flex: 1,
          height: 52,
          border: "none",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        <span style={{ fontSize: 22, color: "#6b7280" }}>⋯</span>
      </button>
    </div>

    {/* FUNDO ESCURO (FECHAR AO CLICAR FORA) */}
    {abrirMaisMenu && (
      <div
        onClick={() => setAbrirMaisMenu(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
          zIndex: 10000
        }}
      />
    )}

    {/* MENU MAIS */}
    {abrirMaisMenu && (
      <div
        style={{
          position: "fixed",
          bottom: 70,
          right: 12,
          background: "#ffffff",
          borderRadius: 16,
          padding: 10,
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
          zIndex: 10001,
          minWidth: 180
        }}
      >
        {[
          { id: "fretes", label: "Fretes", icon: Truck },
          { id: "notificacoes", label: "Notificações", icon: Bell },
          { id: "banners", label: "Banners", icon: ImagePlus },
          { id: "avaliacoes", label: "Avaliações", icon: Star },
          { id: "loja", label: "Loja", icon: Store }
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => {
                setAbaAdmin(item.id);
                setAbrirMaisMenu(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                cursor: "pointer",
                color: "#111",
                fontSize: 14,
                fontWeight: 600
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f1f5f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#fff")
              }
            >
              <Icon size={18} color="#111" />
              {item.label}

              {/* BADGE NOTIFICAÇÕES */}
              {item.id === "notificacoes" &&
                notificacoesAdmin.filter(n => !n.lida).length > 0 && (
                  <div
                    style={{
                      marginLeft: "auto",
                      background: "#ea1d2c",
                      color: "#fff",
                      borderRadius: 999,
                      fontSize: 10,
                      padding: "2px 6px",
                      fontWeight: 800
                    }}
                  >
                    {
                      notificacoesAdmin.filter(n => !n.lida).length
                    }
                  </div>
                )}
            </div>
          );
        })}

        {/* FECHAR */}
        <div
          onClick={() => setAbrirMaisMenu(false)}
          style={{
            marginTop: 6,
            padding: "10px 12px",
            color: "#ea1d2c",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Fechar
        </div>
      </div>
    )}
  </>
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