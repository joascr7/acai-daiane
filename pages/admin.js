

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import Cropper from "react-easy-crop";
import Head from "next/head";
import Header from "../components/Header";
import AvaliacoesOverview from "../components/Avaliacoes/AvaliacoesOverview";
import BannersOverview from "../components/Banners/BannersOverview";
import CuponsOverview from "../components/Cupons/CuponsOverview";
import DashboardOverview from "../components/Dashboard/DashboardOverview";

import FretesOverview from "../components/fretes/FretesOverview";
import GastosOverview from "../components/gastos/GastosOverview";
import LojaOverview from "../components/loja/LojaOverview";

import NotificacoesOverview from "../components/Notificacoes/NotificacoesOverview";
import PedidosOverview from "../components/Pedidos/PedidosOverview";
import CanceladosOverview from "../components/Pedidos/CanceladosOverview";

import ProdutosOverview from "../components/Produtos/ProdutosOverview";

import ModalVenda from "../components/Modals/ModalVenda";
import ModalGasto from "../components/Modals/ModalGasto";
import ModalProduto from "../components/Modals/ModalProduto";

import ProdutoBasico from "../components/Produto/ProdutoBasico";
import ProdutoPromocao from "../components/Produto/ProdutoPromocao";
import ProdutoExtras from "../components/Produto/ProdutoExtras";
import ProdutoImagem from "../components/Produto/ProdutoImagem";


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

  if (typeof window !== "undefined") {
  window.onerror = function (msg, url, line, col, error) {
    console.log("🔥 ERRO REAL:", msg, error);
    alert(msg);
  };
}

  

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

  const pedidosRef = useRef([]);
  const primeiroLoad = useRef(true);

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


useEffect(() => {
  if (!Array.isArray(pedidos)) return;

  if (primeiroLoad.current) {
    pedidosRef.current = pedidos;
    primeiroLoad.current = false;
    return;
  }

  const idsAntigos = new Set(pedidosRef.current.map(p => p.id));

  const novosPedidos = pedidos.filter(p =>
    !idsAntigos.has(p.id) &&
    String(p.status).toLowerCase() === "novo"
  );

  if (novosPedidos.length > 0) {
    console.log("NOVOS:", novosPedidos);
    tocarSomPedido();
  }

  pedidosRef.current = pedidos;

}, [pedidos]);


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

    setPedidos(lista); // 🔥 LIMPO (SEM SOM AQUI)

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

<div
  className="container"
  style={{
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: isMobile ? "12px 12px 90px" : "24px"
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
    {/* HEADER */}
    <Header lojaAberta={lojaAberta} />

    {/* MENU DESKTOP */}
    {!isMobile && (
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          marginBottom: 18,
          paddingBottom: 6
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
                height: 42,
                padding: "0 16px",
                borderRadius: 999,
                border: ativo ? "none" : "1px solid #e5e7eb",
                whiteSpace: "nowrap",
                background: ativo ? "#ea1d2c" : "#ffffff",
                color: ativo ? "#ffffff" : "#374151",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "0.2s",
                boxShadow: ativo
                  ? "0 8px 20px rgba(234,29,44,0.25)"
                  : "0 2px 6px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                if (!ativo)
                  e.currentTarget.style.background = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                if (!ativo)
                  e.currentTarget.style.background = "#ffffff";
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
          background: "#ffffff",
          borderRadius: 20,
          padding: isMobile ? 14 : 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          border: "1px solid #e5e7eb"
        }}
      >
        <DashboardOverview
          pedidos={pedidos}
          isMobile={isMobile}
          totalFaturado={totalFaturado}
          totalGastos={totalGastos}
          lucroTotal={lucroTotal}
          margemLucro={margemLucro}
          pedidosEmAndamento={pedidosEmAndamento}
          produtosAtivos={produtosAtivos}
          cupons={cupons}
          lojaAberta={lojaAberta}
          limparFormularioGasto={limparFormularioGasto}
          setMostrarModalGasto={setMostrarModalGasto}
          formatarReal={formatarReal}
        />
      </div>
    )}


{abaAdmin === "gastos" && (
  <GastosOverview
    pedidos={pedidos}
    vendasManuais={vendasManuais}
    gastos={gastos}
    formatarReal={formatarReal}
    isMobile={isMobile}
    excluirGasto={excluirGasto}
    excluirVenda={excluirVenda}
    abrirEditarVenda={abrirEditarVenda}
    setMostrarModalVenda={setMostrarModalVenda}
    setNovaVendaDesc={setNovaVendaDesc}
    setNovaVendaValor={setNovaVendaValor}
    setEditandoVenda={setEditandoVenda}
  />
)}




{abaAdmin === "fretes" && (
  <FretesOverview
    fretes={fretes}
    bairroFrete={bairroFrete}
    valorFrete={valorFrete}
    setBairroFrete={setBairroFrete}
    setValorFrete={setValorFrete}
    salvarFrete={salvarFrete}
    loadingFrete={loadingFrete}
    freteEditandoId={freteEditandoId}
    limparFormularioFrete={limparFormularioFrete}
    abrirEdicaoFrete={abrirEdicaoFrete}
    alternarStatusFrete={alternarStatusFrete}
    excluirFrete={excluirFrete}
    formatarReal={formatarReal}
    isMobile={isMobile}
  />
)}

      {/* LOJA */}
   {abaAdmin === "loja" && (
  <LojaOverview
    categorias={categorias}
    editandoCategoriaId={editandoCategoriaId}
    editandoCategoria={editandoCategoria}
    setEditandoCategoria={setEditandoCategoria}
    setEditandoCategoriaId={setEditandoCategoriaId}
    salvarEdicaoCategoria={salvarEdicaoCategoria}
    novaCategoria={novaCategoria}
    setNovaCategoria={setNovaCategoria}
    criarCategoria={criarCategoria}
    lojaAberta={lojaAberta}
    toggleLoja={toggleLoja}
    logoInput={logoInput}
    setLogoInput={setLogoInput}
    salvarLogo={salvarLogo}
    isMobile={isMobile}
  />
)}
     {/* NOTIFICAÇÕES */}
{abaAdmin === "notificacoes" && (
  <NotificacoesOverview
    usuarios={usuarios}
    produtos={produtos}
    clienteSelecionado={clienteSelecionado}
    setClienteSelecionado={setClienteSelecionado}
    produtoNotificacao={produtoNotificacao}
    setProdutoNotificacao={setProdutoNotificacao}
    textoNotificacao={textoNotificacao}
    setTextoNotificacao={setTextoNotificacao}
    imagemNotificacao={imagemNotificacao}
    setImagemNotificacao={setImagemNotificacao}
    notificacoesAdmin={notificacoesAdmin}
    removerNotificacao={removerNotificacao}
    input={input}
    btnPrimary={btnPrimary}
    btnSecondary={btnSecondary}
    isMobile={isMobile}
  />
)}
      {/* CUPONS */}
      {abaAdmin === "cupons" && (
  <CuponsOverview
    codigo={codigo}
    setCodigo={setCodigo}
    desconto={desconto}
    setDesconto={setDesconto}
    validade={validade}
    setValidade={setValidade}
    limite={limite}
    setLimite={setLimite}
    criarCupom={criarCupom}
    cupons={cupons}
    deletarCupom={deletarCupom}
    input={input}
    isMobile={isMobile}
  />
)}



      <ModalVenda
  aberto={mostrarModalVenda}
  onClose={() => {
    setMostrarModalVenda(false);
    setEditandoVenda(null);
  }}
  editandoVenda={editandoVenda}
  salvarVenda={async ({ descricao, valor, editandoVenda }) => {
    try {
      if (editandoVenda) {
        await updateDoc(
          doc(db, "vendasManuais", editandoVenda.id),
          { descricao, valor }
        );
      } else {
        await addDoc(collection(db, "vendasManuais"), {
          descricao,
          valor,
          data: Date.now()
        });
      }
    } catch (e) {
      console.log(e);
    }
  }}
/>


<ModalGasto
  aberto={mostrarModalGasto}
  onClose={() => {
    setMostrarModalGasto(false);
    limparFormularioGasto();
  }}
  gastoEditando={
    gastos.find((g) => g.id === gastoEditandoId) || null
  }
  salvarGasto={async ({
    nome,
    valor,
    categoria,
    data,
    obs,
    gastoEditando
  }) => {
    if (gastoEditando) {
      await updateDoc(doc(db, "gastos", gastoEditando.id), {
        nome,
        valor,
        categoria,
        data,
        obs
      });
    } else {
      await addDoc(collection(db, "gastos"), {
        nome,
        valor,
        categoria,
        data,
        obs,
        criadoEm: Date.now()
      });
    }
  }}
/>
     

      {/* MODAL PRODUTO */}
  <ModalProduto
  aberto={mostrarModalProduto}
  onClose={() => setMostrarModalProduto(false)}
  salvarProduto={salvarProduto}
>
  <ProdutoBasico
    novoNome={novoNome}
    setNovoNome={setNovoNome}
    categoria={categoria}
    setCategoria={setCategoria}
    categorias={categorias}
    novoPreco={novoPreco}
    setNovoPreco={setNovoPreco}
  />

  <ProdutoPromocao
    promocaoAtiva={promocaoAtiva}
    setPromocaoAtiva={setPromocaoAtiva}
    novoPrecoPromocional={novoPrecoPromocional}
    setNovoPrecoPromocional={setNovoPrecoPromocional}
  />

  <ProdutoExtras
    extras={extras}
    setExtras={setExtras}
    novaCategoria={novaCategoria}
    setNovaCategoria={setNovaCategoria}
  />

  <ProdutoImagem
    novaImagem={novaImagem}
    setNovaImagem={setNovaImagem}
  />
</ModalProduto>


      {/* PRODUTOS */}
     {abaAdmin === "produtos" && (
  <ProdutosOverview
    produtos={produtos}
    abrirEdicao={abrirEdicao}
    toggleProduto={toggleProduto}
    moverProduto={moverProduto}
    excluirProduto={excluirProduto}
    formatarReal={formatarReal}
    isMobile={isMobile}
    setMostrarModalProduto={setMostrarModalProduto}
    setProdutoEditandoId={setProdutoEditandoId}
    setNovoNome={setNovoNome}
    setNovoPreco={setNovoPreco}
    setNovoPrecoPromocional={setNovoPrecoPromocional}
    setPromocaoAtiva={setPromocaoAtiva}
    setNovoTamanho={setNovoTamanho}
    setNovaDescricao={setNovaDescricao}
    setNovaImagem={setNovaImagem}
    setMaisVendido={setMaisVendido}
    setCategoria={setCategoria}
    categorias={categorias}
  />
)}


{abaAdmin === "avaliacoes" && (
  <AvaliacoesOverview
    avaliacoes={avaliacoes}
    produtos={produtos}
    filtroAvaliacao={filtroAvaliacao}
    setFiltroAvaliacao={setFiltroAvaliacao}
    busca={busca}
    setBusca={setBusca}
    aprovarAvaliacao={aprovarAvaliacao}
    recusarAvaliacao={recusarAvaliacao}
    isMobile={isMobile}
  />
)}



      {/* PEDIDOS */}
{abaAdmin === "pedidos" && (
  <PedidosOverview
    pedidos={pedidos}
    buscaCodigo={buscaCodigo}
    setBuscaCodigo={setBuscaCodigo}
    produtos={produtos}
    formatarReal={formatarReal}
    atualizarStatus={atualizarStatus}
    cancelarPedido={cancelarPedido}
    isMobile={isMobile}
  />
)}


{abaAdmin === "cancelados" && (
  <CanceladosOverview
    agrupados={agrupados}
    aberto={aberto}
    setAberto={setAberto}
    formatarReal={formatarReal}
    pedidosCancelados={pedidosCancelados}
  />
)}


{abaAdmin === "banners" && (
  <BannersOverview
    bannerTitulo={bannerTitulo}
    setBannerTitulo={setBannerTitulo}
    bannerSubtitulo={bannerSubtitulo}
    setBannerSubtitulo={setBannerSubtitulo}
    setBannerImagemFile={setBannerImagemFile}
    bannerPreview={bannerPreview}
    setBannerPreview={setBannerPreview}
    salvarBanner={salvarBanner}
    bannerLoading={bannerLoading}
    bannerEditandoId={bannerEditandoId}
    limparFormularioBanner={limparFormularioBanner}
    banners={banners}
    abrirEdicaoBanner={abrirEdicaoBanner}
    alternarStatusBanner={alternarStatusBanner}
    moverBanner={moverBanner}
    excluirBanner={excluirBanner}
    input={input}
    btnPrimary={btnPrimary}
    isMobile={isMobile}
  />
)}







 {isMobile && (
  <>
    {/* NAVBAR */}
    <BottomNav
      abaAdmin={abaAdmin || "dashboard"}
      setAbaAdmin={(v) => setAbaAdmin && setAbaAdmin(v)}
      pedidosEmAndamento={Number(pedidosEmAndamento) || 0}
      setAbrirMaisMenu={(v) => setAbrirMaisMenu && setAbrirMaisMenu(v)}
    />

    {/* OVERLAY */}
    {abrirMaisMenu === true && (
      <Overlay
        onClick={() =>
          setAbrirMaisMenu && setAbrirMaisMenu(false)
        }
      />
    )}

    {/* MENU */}
    {abrirMaisMenu === true && (
      <MaisMenu
        setAbaAdmin={(v) => setAbaAdmin && setAbaAdmin(v)}
        setAbrirMaisMenu={(v) =>
          setAbrirMaisMenu && setAbrirMaisMenu(v)
        }
        notificacoesAdmin={
          Array.isArray(notificacoesAdmin)
            ? notificacoesAdmin
            : []
        }
      />
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