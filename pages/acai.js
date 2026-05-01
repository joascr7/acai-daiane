

// 🔥 REACT
import { useState, useEffect, useRef } from "react";


// 🔥 NEXT
import { useRouter } from "next/router";

// 🔥 LAYOUT
import Layout from "../components/layout";

// 🔥 FIREBASE (INSTÂNCIAS)
import { authCliente as auth, dbCliente as db } from "../services/firebaseDual";
import ListaProdutos from "../components/acai/components/ListaProdutos";
import useProdutos from "../components/acai/hooks/useProdutos";
import usePedidosUsuario from "../components/acai/hooks/usePedidosUsuario";
import useNotificacoes from "../components/acai/hooks/useNotificacoes";
import Sidebar from "../components/Sidebar";

import CardProduto from "../components/CardProduto";

import { updatePassword } from "firebase/auth";







// 🔥 FIRESTORE
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  query,
  where,
  arrayUnion,
  deleteDoc,
  runTransaction
} from "firebase/firestore";

// 🔥 AUTH
import {
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "firebase/auth";

// 🔥 ICONES (PADRÃO APP)
import {
  Home,
  FileText,
  ShoppingCart,
  User,
  Bell,
  ShoppingBag,
  Tag,
  MapPin,
  Heart,
  ClipboardList,
  LogOut,
  Sun,
  Moon,
  CreditCard,
  Menu,
  ChevronDown,
  Search,
  IceCream,
  CupSoda,
  Clock,
  Bike,
  ShieldCheck,
  ArrowLeft,
  X,
  QrCode,
  Wallet,
  ChevronRight,
  Star,
  Gem,
  Pencil,
  Trash2,
  Receipt,
  CircleDollarSign,
  Store,
  Gift,
  Phone,
  Mail,
  Ticket,
  TicketPercent,
  ArrowRight,
  Plus,
  Eye,
  Sparkles,
  CheckCircle
  
} from "lucide-react";







import { lightTheme, darkTheme } from "../styles/theme";

export default function Acai() {


const LOJA = {
  
  lat: -8.0208,
  lng: -34.8895
};

const NAVBAR = 60;
const SAFE_BOTTOM = "env(safe-area-inset-bottom)";
const BOTTOM_SPACE = `calc(${NAVBAR}px + ${SAFE_BOTTOM})`;

  const btnMais = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "none",
  background: "#ea1d2c",
  color: "#fff",
  cursor: "pointer"
};

const btnMenos = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer"
};


const btnCounterPrimary = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  background: "#ea1d2c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};

const btnCounterLight = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  border: "1px solid #ddd"
};

const line = {
  width: 10,
  height: 2,
  background: "#333"
};

const plusIcon = {
  width: 12,
  height: 2,
  background: "#fff",
  position: "relative"
};

plusIcon["::after"] = {
  content: '""',
  position: "absolute",
  width: 2,
  height: 10,
  background: "#fff",
  top: -4,
  left: 4
};





const badgeOferta = {
  background: "#ea1d2c",
  color: "#fff",
  fontSize: 9,
  padding: "4px 8px",
  borderRadius: 999,
  fontWeight: 800
};

const badgeMais = {
  background: "#ff7a00",
  color: "#fff",
  fontSize: 9,
  padding: "4px 8px",
  borderRadius: 999,
  fontWeight: 800
};

const precoAntigo = {
  fontSize: 16,
  color: "#aaa",
  textDecoration: "line-through"
};

const precoPromo = {
  fontSize: 18,
  color: "#ea1d2c",
  fontWeight: 900
};

const precoNormal = {
  fontSize: 18,
  color: "#111",
  fontWeight: 900
};




const tab = (active) => ({
  flex: 1,
  padding: 10,
  borderRadius: 12,
  border: "none",
  background: active ? "#ea1d2c" : "#f1f1f1",
  color: active ? "#fff" : "#333",
  fontSize: 13,
  fontWeight: "bold"
});

const input = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 12,
  border: "1px solid #ddd",
  outline: "none"
};

const btn = {
  marginTop: 14,
  width: "100%",
  padding: 12,
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  borderRadius: 14,
  fontWeight: "bold"
};

const btnLogout = {
  width: "100%",
  padding: 14,
  borderRadius: 20,
  border: "2px solid #ea1d2c",
  color: "#ea1d2c",
  background: "#fff",
  fontWeight: "bold"
};


const feedbacks = [
  "Entrega rápida",
  "Bem embalado",
  "Muito saboroso",
  "Veio errado",
  "Demorou",
  "Pouco recheio"
];



const label = {
  fontSize: 12,
  color: "#777",
  marginTop: 10
};

const btnPrimary = {
  marginTop: 12,
  width: "100%",
  padding: 10,
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer"
};

const btnDanger = {
  marginTop: 12,
  width: "100%",
  padding: 10,
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer"
};


const card = {
  background: "#fff",
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};


const layout = {
  container: {
    maxWidth: 420,
    margin: "0 auto",
    width: "100%",
    minHeight: "100vh",
    background: "#f7f7f7",
    display: "flex",
    flexDirection: "column"
  },

  content: {
    padding: 16,
    flex: 1
  },

  card: {
    background: "#fff",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12
  },

  button: {
    width: "100%",
    height: 48,
    borderRadius: 14,
    background: "#ea1d2c",
    color: "#fff",
    fontWeight: "bold",
    border: "none"
  },

  footer: {
    position: "sticky",
    bottom: 70,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    padding: 12,
    borderTop: "1px solid #eee",
    zIndex: 20
  }
};


const backBtn = {
  width: 40,
  height: 40,
  borderRadius: 14,
  border: "1px solid #f1f1f1",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};


const agora = new Date();
const dia = agora.getDay(); // 0 dom, 5 sex, 6 sab
const hora = agora.getHours();
const minuto = agora.getMinutes();

// 🔥 DIAS
const nomesDias = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado"
];

// 🔥 HORÁRIOS
function getHorario(dia) {
  if (dia === 5) return { abre: "18:30", fecha: "23:00" }; // sexta
  if (dia === 6 || dia === 0) return { abre: "16:00", fecha: "23:00" }; // sab/dom
  return null; // fechado nos outros dias
}

// 🔥 VERIFICA SE ESTÁ ABERTO
function estaAberto() {
  const h = getHorario(dia);
  if (!h) return false; // 🔥 ESSENCIAL

  const [hA, mA] = h.abre.split(":").map(Number);
  const [hF, mF] = h.fecha.split(":").map(Number);

  const agoraMin = hora * 60 + minuto;
  const abreMin = hA * 60 + mA;
  const fechaMin = hF * 60 + mF;

  return agoraMin >= abreMin && agoraMin < fechaMin;
}

// 🔥 PRÓXIMO DIA QUE ABRE
function proximoDiaAbertura() {
  for (let i = 0; i < 7; i++) {
    const d = (dia + i) % 7;
    const h = getHorario(d);
    if (h) {
      return {
        dia: nomesDias[d],
        hora: h.abre
      };
    }
  }
}

const aberto = estaAberto();
const proximo = proximoDiaAbertura();



const ORDEM_CATEGORIAS = [
  "promocoes",
  "acai",
  "combos",
  "bebidas"
];

const normalizar = (str) =>
  (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  

  const router = useRouter();


  // 🔥 TODOS OS STATES PRIMEIRO

 const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);




const [extrasSelecionados, setExtrasSelecionados] = useState({});
const [pedidoAberto,  setPedidoAberto] = useState(null);

const [modoCompra, setModoCompra] = useState("normal");

const [clienteLat, setClienteLat] = useState(null);
const [clienteLng, setClienteLng] = useState(null);
const notificacoesRef = useRef([]);


const [installPrompt, setInstallPrompt] = useState(null);
const [podeInstalar, setPodeInstalar] = useState(false);

  // 🔥 USER
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [logo, setLogo] = useState(null);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const larguraApp = isMobile ? 420 : 1200;
  const larguraNavbar = isMobile ? 420 : 700;

  const [clienteBairro, setClienteBairro] = useState("");
  const [fretes, setFretes] = useState([]);

  const [agoraPedidos, setAgoraPedidos] = useState(Date.now());
  const [mostrarCodigoPix, setMostrarCodigoPix] = useState(false);

 const [pontosFidelidade, setPontosFidelidade] = useState(0); 
 const PONTOS_PARA_PREMIO = 10;
 const progresso = Math.min(
  pontosFidelidade / PONTOS_PARA_PREMIO,
  1
);

const faltam = Math.max(
  0,
  PONTOS_PARA_PREMIO - pontosFidelidade
);


const temPremio = pontosFidelidade >= PONTOS_PARA_PREMIO;



const [etapaPagamento, setEtapaPagamento] = useState(1);

const [banners, setBanners] = useState([]);
const [bannerAtual, setBannerAtual] = useState(0);

const [observacaoPedido, setObservacaoPedido] = useState("");

  const [enviandoWhatsapp, setEnviandoWhatsapp] = useState(false);

  const [extrasGlobais, setExtrasGlobais] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [pedidoPixAberto,  setPedidoPixAberto] = useState(null);

  


 

const [loadingGeo, setLoadingGeo] = useState(false);
const [erroGeo, setErroGeo] = useState("");

const pegarLocalizacao = () => {
  if (!navigator.geolocation) {
    setErroGeo("Seu dispositivo não suporta localização");
    return;
  }

  setLoadingGeo(true);
  setErroGeo("");

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setClienteLat(lat);
      setClienteLng(lng);

      // 🔥 LIMPA O QUE TAVA ERRADO
      setClienteCep("");
      setClienteEndereco("");
      setClienteBairro("");

      // 🔥 BUSCA ENDEREÇO REAL
      await buscarEnderecoGoogle(lat, lng);

      mostrarToast(
      "Confira seu endereço e número da casa",
      "info"
    );

      setLoadingGeo(false);

      mostrarToast("Localização obtida com sucesso", "sucesso");
    },
    (err) => {
      setLoadingGeo(false);

      if (err.code === 1) {
        setErroGeo("Permissão negada. Ative a localização.");
      } else {
        setErroGeo("Não foi possível obter localização");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000
    }
  );
};
  

  const [categorias, setCategorias] = useState([]);

  const [bloqueado, setBloqueado] = useState(false);

  const [aba, setAba] = useState("home");
// 🔥 STATUS DO PEDIDO
  const ultimoStatus = useRef(null);

  // 🔥 CLIENTE (ANTES DE TUDO)
  const [clienteNome, setClienteNome] = useState("");
  const [clienteCpf, setClienteCpf] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteEndereco, setClienteEndereco] = useState("");
  const [clienteNumeroCasa, setClienteNumeroCasa] = useState("");
  const [clienteCep, setClienteCep] = useState("");
  const [abrirPagamento, setAbrirPagamento] = useState(false);
const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [tipoEntrega, setTipoEntrega] = useState("entrega");

  
  const [avaliacaoAberta, setAvaliacaoAberta] = useState(null);
const [notaSelecionada, setNotaSelecionada] = useState(5);
const [comentario, setComentario] = useState("");
  

    // 🔥 PERFIL
  const [abaPerfil, setAbaPerfil] = useState("dados");

  // ❌ REMOVIDO useEffect BUGADO

  // 🔥 UI
  const [toast, setToast] = useState(null);
  const carrinhoRef = useRef(null);

  // 🔥 THEME
  const [dark, setDark] = useState(false);


  



  // 🔥 CATEGORIA
  const [categoria, setCategoria] = useState("acai");
  const [busca, setBusca] = useState("");

  // 🔥 STEPS
  const [step, setStep] = useState(1);
  useEffect(() => {
  if (aba === "perfil" && step === 4) {
    setAbaPerfil(prev => prev || "dados");
  }
}, [aba, step]);

  const [lojaAberta, setLojaAberta] = useState(true);
  const { pedidos } = usePedidosUsuario(user);
  const [selectedId, setSelectedId] = useState(null);

const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
const [novoEndereco, setNovoEndereco] = useState({
  cep: "",
  rua: "",
  numero: "",
  complemento: ""
});
const [loadingCep, setLoadingCep] = useState(false);

const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  
  

  // 🔥 PRODUTO
  const [produto, setProduto] = useState(null);
  const { produtos } = useProdutos();
  const maisVendido = calcularMaisVendido(pedidos);
  const extrasDoProduto = Array.isArray(produto?.extras) && produto.extras.length
  ? produto.extras
  : Array.isArray(extrasGlobais)
    ? extrasGlobais
    : [];



  function irPara(abaDestino, stepDestino) {
  setAba(abaDestino);
  setStep(stepDestino);
}
  

    // 🔥 CARRINHO
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
  const { notificacoes } = useNotificacoes(user, authReady);
  const [temNotificacao, setTemNotificacao] = useState(false);
  const temNotificacaoAtiva =
  Array.isArray(notificacoes) &&
  notificacoes.some((n) => n?.lida !== true);
  const [editandoIndex, setEditandoIndex] = useState(null);
// 🔥 forma de pagamento
  const [formaPagamento, setFormaPagamento] = useState(null);
 
  const abertoFinal = lojaAberta || estaAberto();
  const horarioHoje = getHorario(dia);


const categoriaAtualObj = categorias.find(c => c.slug === categoriaSelecionada);
const nomeCategoriaAtual = categoriaAtualObj?.nome || categoriaSelecionada;


const [novaSenha, setNovaSenha] = useState("");
const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
const [loadingSenha, setLoadingSenha] = useState(false);

const produtoFidelidade = produtos.find(p => p.resgate === true);
  
  const [statusPagamento, setStatusPagamento] = useState("pendente");
  const [mostrarPagamento, setMostrarPagamento] = useState(false);
  const [loadingPedido, setLoadingPedido] = useState(false);
  const [pedidoPago, setPedidoPago] = useState(null);

   // 🔥 NOVOS STATES DO PIX
const [loadingPix, setLoadingPix] = useState(false);
const [qrBase64, setQrBase64] = useState(null);
const [qrCode, setQrCode] = useState(null);
const [paymentId, setPaymentId] = useState(null);
const [pedidoAtual, setPedidoAtual] = useState(null);

const [avaliacaoSucesso, setAvaliacaoSucesso] = useState(false);

const [mensagemPagamento, setMensagemPagamento] = useState("");
const [tipoMensagemPagamento, setTipoMensagemPagamento] = useState("info");

const [bannerIndex, setBannerIndex] = useState(0);
const bannerRef = useRef(null);


const [feedbackSelecionados, setFeedbackSelecionados] = useState([]);

const [toastLojaFechada, setToastLojaFechada] = useState(false);
const [historicoBusca, setHistoricoBusca] = useState([]);
const [filtroBusca, setFiltroBusca] = useState("todos");

 // 🔥 CUPOM
  const [cupomInput, setCupomInput] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [desconto, setDesconto] = useState(0);
  const [cupons, setCupons] = useState([]);
  const [animacao, setAnimacao] = useState("slide-enter");
  const [loadingCupons, setLoadingCupons] = useState(false);

  const [bloqueioMsg, setBloqueioMsg] = useState(null);

  const getProdutoFidelidade = () => {
  return produtos.find(p => p.resgate === true);
};

 const produtosCategoria =
  modoCompra === "fidelidade"
    ? produtos.filter(p => p.resgate === true)
    : produtos.filter(
        p => p.categoria === categoriaSelecionada && p.ativo !== false
      );


const mostrarMensagemPagamento = (texto, tipo = "info") => {
  setMensagemPagamento(texto);
  setTipoMensagemPagamento(tipo);

  setTimeout(() => {
    setMensagemPagamento("");
  }, 2500);
};

function adicionarPorCategoria(categoria) {

  const produto = modoCompra === "fidelidade"
    ? produtos.find(p => p.resgate === true)
    : produtos.find(
        p => p.categoria === categoria && p.ativo !== false
      );

  if (!produto) {
    alert("Nenhum produto disponível");
    return;
  }

  if (!validarLojaAberta()) return;

  if (categoriaTemExtras(categoria)) {
    setProduto(produto);
    setAba("home");
    setStep(2);
    return;
  }

  if (categoriaVaiDiretoCarrinho(categoria)) {
    const total = Number(produto.preco || 0);

    setCarrinho(prev => [
  ...prev,
  {
    produto,
    quantidade: 1,
    extras: [],
    total,

    // 🔥 ADICIONA ISSO
    tamanho: produto?.tamanho || "",
    descricaoTamanho: produto?.descricaoTamanho || ""
  }
]);

    setAba("carrinho");
    setStep(3);
    return;
  }
}
  

  // 🔥 BOTÃO PADRÃO
  const botaoStyle = {
    width: "90%",
    maxWidth: 380,
    padding: "10px",
    borderRadius: 14,
    background: dark
      ? "linear-gradient(90deg,#8a0f0f,#8a0f0f)"
      : "linear-gradient(90deg,#8a0f0f,#ff2aff)",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    fontSize: 13,
    boxShadow: dark
      ? "0 5px 20px rgba(234, 51, 51, 0.9)"
      : "0 5px 20px rgba(255, 0, 0, 0.33)",
    transition: "all 0.2s ease"
  };

  



  const Input = ({ label, value, onChange }) => (
  <div style={{ marginBottom: 12 }}>

    <small style={{ opacity: 0.6 }}>
      {label}
    </small>

    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.1)",
        marginTop: 4,
        outline: "none",
        fontSize: 14
      }}
    />

  </div>
);



// 🔥 parte do step 4
const focoInput = (e) => {
  e.target.style.border = "1px solid #ea1d2c";
};

const blurInput = (e) => {
  e.target.style.border = dark
    ? "1px solid #2a2a2a"
    : "1px solid #e5e5e5";
};

  const themeAtual = dark ? darkTheme : lightTheme;
  const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,

  border: dark
    ? "1px solid #2a2a2a"
    : "1px solid #e5e5e5",

  marginTop: 6,

  background: dark ? "#121212" : "#fafafa",
  color: dark ? "#fff" : "#111",

  fontSize: 14,
  transition: "all 0.2s ease",
  outline: "none",

  boxSizing: "border-box"
};




useEffect(() => {
  const handleBeforeInstallPrompt = (e) => {
    e.preventDefault();
    setInstallPrompt(e);
    setPodeInstalar(true);
  };

  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

  return () => {
    window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  };
}, []);


useEffect(() => {
  if (!notificacoes.length) return;

  const novas = notificacoes.filter(n =>
    !notificacoesRef.current.some(old => old.id === n.id)
  );

  if (novas.length > 0) {
    console.log("🔔 nova notificação");

    // 🔊 TOCAR SOM AQUI (se tiver)
    // playSound()

  }

  notificacoesRef.current = notificacoes;
}, [notificacoes]);



useEffect(() => {
  if (!Array.isArray(banners) || banners.length <= 1) return;
  if (!bannerRef.current) return;

  const interval = setInterval(() => {
    setBannerIndex((prev) => {
      const next = prev + 1 >= banners.length ? 0 : prev + 1;

      bannerRef.current?.scrollTo({
        left: bannerRef.current.clientWidth * next,
        behavior: "smooth"
      });

      return next;
    });
  }, 3500);

  return () => clearInterval(interval);
}, [banners]);



useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "banners"), (snapshot) => {
    const lista = snapshot.docs
      .map((docItem) => ({
        id: docItem.id,
        ...docItem.data()
      }))
      .filter((item) => item.ativo !== false)
      .sort((a, b) => Number(a?.ordem || 0) - Number(b?.ordem || 0));

    setBanners(lista);
  });

  return () => unsubscribe();
}, []);

const handleBannerScroll = () => {
  if (!bannerRef.current) return;

  const width = bannerRef.current.clientWidth;
  const index = Math.round(bannerRef.current.scrollLeft / width);

  if (index !== bannerIndex) {
    setBannerIndex(index);
  }
};


useEffect(() => {
  if (typeof window !== "undefined") {
    try {
      const salvo = localStorage.getItem("historicoBusca");
      if (salvo) {
        setHistoricoBusca(JSON.parse(salvo));
      }
    } catch (e) {
      console.log("Erro ao ler histórico", e);
    }
  }
}, []);




useEffect(() => {
  if (!pedidos || !pedidos.length) return;

  const processarFidelidade = async () => {
    for (const p of pedidos) {

      // 🔥 VERIFICA SE FOI PAGO
      const pago =
        p.formaPagamento === "dinheiro"
          ? true
          : p.formaPagamento === "pix"
          ? p.status !== "aguardando_pagamento"
          : p.formaPagamento === "cartao_online"
          ? p.paymentStatus === "approved"
          : false;

      if (
        p.status === "entregue" &&
        pago &&
        !p.fidelidadeContabilizada &&
        p.cliente?.uid
      ) {
        try {
          await adicionarPontoFidelidade(p);

          await updateDoc(doc(db, "pedidos", p.id), {
            fidelidadeContabilizada: true
          });

        } catch (e) {
          console.log("Erro fidelidade:", e);
        }
      }
    }
  };

  processarFidelidade();

}, [pedidos]);



// 🔥MAPA EM TEMPO REAL
useEffect(() => {
  const paymentId = localStorage.getItem("paymentId");

  if (!paymentId) {
    console.log("SEM PAYMENT ID");
    return;
  }

  console.log("BUSCANDO PEDIDO COM:", paymentId);

  const q = query(
    collection(db, "pedidos"),
    where("paymentId", "==", paymentId)
  );

  const unsub = onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      console.log("PEDIDO NÃO ENCONTRADO AINDA...");
      return;
    }

    const docSnap = snapshot.docs[0];
    const pedido = docSnap.data();

    console.log("PEDIDO ENCONTRADO:", pedido);

    // 🔥 PAGAMENTO
    if (pedido.statusPagamento === "pago") {
      console.log("PAGAMENTO CONFIRMADO");
    }

    // 🔥 LOCALIZAÇÃO
    if (pedido.entrega?.localizacao) {
      console.log("LOCAL:", pedido.entrega.localizacao);
    }

    // 🔥 STATUS
    if (pedido.status === "saiu") {
      alert("Seu pedido saiu para entrega");
    }

    if (pedido.status === "chegou") {
      alert("Entregador chegou");
    }

    if (pedido.status === "entregue") {
      alert("Pedido entregue");
    }
  });

  return () => unsub();
}, []);



useEffect(() => {
  if (!user?.uid) return;

  const ref = doc(db, "fidelidade", user.uid);

  const unsub = onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      setPontosFidelidade(Number(snap.data().pontos || 0));
    } else {
      setPontosFidelidade(0);
    }
  });

  return () => unsub();
}, [user]);


useEffect(() => {
  if (typeof window === "undefined") return;

  console.log("🔥 PUSH INICIOU");

  const ativarPush = async () => {
    try {
      // 🔔 pedir permissão
      const permission = await Notification.requestPermission();
      console.log("PERMISSAO:", permission);

      if (permission !== "granted") return;

      // 🔥 IMPORTA O FIREBASE PRIMEIRO
     

      console.log("✅ Firebase carregado");

      // 🔥 IMPORTA MESSAGING (OBRIGATORIO SER AQUI)
      const { getMessaging, getToken } = await import("firebase/messaging");

      const messaging = getMessaging(app);

      console.log("🔄 tentando gerar token...");

      // 🔑 GERAR TOKEN
      const token = await getToken(messaging, {
        vapidKey: "BLepi8PlvHdVnZ1Y83skyi1_WTc49JgGLKQZo-eyk_Ae8UJHLLewHG_VjQbuzxI4JWHhISwGdIfdGQNWDdNiREI"
      });

      if (token) {
        console.log("🔥 TOKEN:", token);
      } else {
        console.log("⚠️ Nenhum token gerado");
      }

    } catch (error) {
      console.log("💥 ERRO FINAL:", error);
    }
  };

  ativarPush();
}, []);

useEffect(() => {
  const unsub = onSnapshot(collection(db, "categorias"), (snap) => {

    const lista = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setCategorias(lista);
  });

  return () => unsub();
}, []);


// 🔥 INTEGRAÇÃO COM ENTREGADOR (SEPARADO)
useEffect(() => {
  const pedidoId = localStorage.getItem("pedidoId");

  if (!pedidoId) return;

  const unsubscribe = onSnapshot(
    doc(db, "pedidos", pedidoId),
    (docSnap) => {
      if (!docSnap.exists()) return;

      const pedido = docSnap.data();

      if (pedido.status === ultimoStatus.current) return;

      ultimoStatus.current = pedido.status;

      if (pedido.status === "saiu") {
        alert("🚀 Seu pedido saiu para entrega!");
      }

      if (pedido.status === "chegou") {
        alert("📍 O entregador chegou!");
      }

      if (pedido.status === "entregue") {
        alert("✅ Pedido entregue!");
      }
    }
  );

  return () => unsubscribe();
}, []);


useEffect(() => {
  setTimeout(() => {
    setLoadingProdutos(false);
  }, 800);
}, []);




function BannerSlideImage({ src, isMobile }) {
  return (
    <img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: isMobile ? "cover" : "contain",
        objectPosition: "center",
        display: "block",
        background: "#111"
      }}
    />
  );
}

 

function mostrarToast(texto, tipo = "erro") {
  setToast({ texto, tipo });

  setTimeout(() => {
    setToast(null);
  }, 3000);
}

// 🔥 HISTÓRICO DE BUSCA
function salvarBuscaHistorico(valor) {
  const termo = (valor || "").trim();
  if (!termo) return;

  setHistoricoBusca(prev => {
    const novo = [
      termo,
      ...prev.filter(item => item.toLowerCase() !== termo.toLowerCase())
    ].slice(0, 6);

    localStorage.setItem("historicoBusca", JSON.stringify(novo));

    return novo;
  });
}


// 🔥 VOLTAR DE TELA
function voltarPara(abaDestino, stepDestino) {
  setAba(abaDestino);
  setStep(stepDestino);
}


// 🔥 TIMELINE PEDIDO
function renderTimeline(status) {

  const etapas = [
  { key: "recebido", label: "Recebido" },
  { key: "preparando", label: "Em preparo" },
  { key: "saiu", label: "Saiu" },
  { key: "entregue", label: "Entregue" },
  { key: "cancelado", label: "Cancelado" }
];

  const ordem = ["recebido", "preparando", "saiu", "entregue"];

  const atualIndex = ordem.indexOf(
    status === "aguardando_pagamento" ? "recebido" : status
  );

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
      {etapas.map((e, i) => {
        const ativo = i <= atualIndex;

        return (
          <div key={e.key} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: ativo ? "#ea1d2c" : "#ddd",
              zIndex: 2
            }} />

            {i < etapas.length - 1 && (
              <div style={{
                height: 2,
                flex: 1,
                background: i < atualIndex ? "#ea1d2c" : "#ddd"
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}



// 🔥 EXTRAS GLOBAIS
useEffect(() => {

  const unsub = onSnapshot(doc(db, "config", "loja"), (snap) => {

    if (snap.exists()) {
      const data = snap.data();
      setExtrasGlobais(data.extras || []);
    }

  });

  return () => unsub();

}, []);


// 🔥 RESPONSIVO
useEffect(() => {

  if (typeof window !== "undefined") {

    const check = () => setIsMobile(window.innerWidth <= 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }

}, []);



useEffect(() => {
  if (typeof window === "undefined") return;

  let salvo = null;

  if (user?.uid) {
    salvo = localStorage.getItem(`carrinho_${user.uid}`);
  } else {
    salvo = localStorage.getItem("carrinho");
  }

  if (!salvo) {
    setCarrinho([]);
    return;
  }

  try {
    const carrinhoParseado = JSON.parse(salvo).map(item => ({
      ...item,
      extras: (item.extras || []).map(e => ({
        nome: e.nome,
        preco: e.preco,
        categoria: e.categoria || "Extras",
        qtd: Number(e.qtd || 1)
      }))
    }));

    // 🔥 AQUI QUE FALTAVA
    setCarrinho(carrinhoParseado);

  } catch (error) {
    console.log("Erro ao carregar carrinho:", error);
    setCarrinho([]);
  }
}, [user]);



useEffect(() => {
  if (typeof window === "undefined") return;
  if (!Array.isArray(carrinho)) return;

  try {
    // 🔐 usuário logado
    if (user?.uid) {
      localStorage.setItem(
        `carrinho_${user.uid}`,
        JSON.stringify(carrinho)
      );
    } 
    // 🔓 visitante
    else {
      localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
      );
    }
  } catch (error) {
    console.log("Erro ao salvar carrinho:", error);
  }
}, [carrinho, user]);


// 🔥 CUPONS
useEffect(() => {

  const unsub = onSnapshot(collection(db, "cupons"), (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setCupons(lista);
  });

  return () => unsub();

}, []);


// 🔥 PWA INSTALL
useEffect(() => {

  const handler = (e) => {
    e.preventDefault();
    setPromptInstall(e);
  };

  window.addEventListener("beforeinstallprompt", handler);

  return () => window.removeEventListener("beforeinstallprompt", handler);

}, []);

// 🔥 MUDA ABA
useEffect(() => {
  if (!busca) return;

  const encontrado = produtos.find(p =>
    p.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  if (encontrado) {
    setCategoria(encontrado.categoria);
  }
}, [busca]);

// 🔥 APP
useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("SW registrado"))
      .catch((err) => console.log("Erro SW:", err));
  }
}, []);
// 🔥 LOGO
useEffect(() => {

  const unsub = onSnapshot(doc(db, "config", "loja"), (docSnap) => {

    if (docSnap.exists()) {
      const data = docSnap.data();

      setLojaAberta(data.aberta);
      setLogo(data.logo); // 🔥 AQUI
    }

  });

  return () => unsub();

}, []);


// 🔥 LOGA ABERTA OU FECHADA
useEffect(() => {

  const ref = doc(db, "config", "loja");

  const unsub = onSnapshot(ref, (snap) => {

    if (snap.exists()) {
      setLojaAberta(snap.data().aberta);
    } else {
      setLojaAberta(true); // padrão aberto
    }

  });

  return () => unsub();

}, []);

  // 🔥 CLIENTE
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (u) => {

    console.log("🔥 AUTH USER:", u);

    setUser(u);
    setAuthReady(true);

    // 🔓 DESLOGADO
    if (!u) {
      console.log("❌ usuário não logado");

      setUser(null);

      // 🔥 carrinho guest
      const carrinhoSalvo = localStorage.getItem("carrinho");

      if (carrinhoSalvo) {
        try {
          setCarrinho(JSON.parse(carrinhoSalvo));
        } catch {
          setCarrinho([]);
        }
      } else {
        setCarrinho([]);
      }

      // 🔥 limpa dados do cliente
      setClienteNome("");
      setClienteTelefone("");
      setClienteCpf("");
      setClienteEmail("");
      setClienteEndereco("");
      setClienteNumeroCasa("");
      setClienteCep("");
      setClienteBairro("");

      return;
    }

    try {
      const ref = doc(db, "usuarios", u.uid);

      const snap = await getDoc(ref);

      // 🔥 cria usuário se não existir
      if (!snap.exists()) {
        await setDoc(ref, {
          uid: u.uid,
          clienteNome: u.displayName || "",
          clienteEmail: u.email || ""
        });
      }

      const snapAtualizado = await getDoc(ref);
      const dados = snapAtualizado.data();

      setClienteNome(dados.clienteNome || "");
      setClienteTelefone(dados.clienteTelefone || "");
      setClienteCpf(dados.clienteCpf || "");
      setClienteEmail(dados.clienteEmail || "");
      setClienteEndereco(dados.clienteEndereco || "");
      setClienteNumeroCasa(dados.clienteNumeroCasa || "");
      setClienteCep(dados.clienteCep || "");
      setClienteBairro(dados.clienteBairro || "");

      // 🔥 carrinho do usuário
      let carrinhoUser = [];

      const carrinhoSalvoUser = localStorage.getItem(`carrinho_${u.uid}`);

      if (carrinhoSalvoUser) {
        try {
          carrinhoUser = JSON.parse(carrinhoSalvoUser);
        } catch {
          carrinhoUser = [];
        }
      }

      // 🔥 carrinho guest
      let carrinhoGuest = [];

      const carrinhoGuestSalvo = localStorage.getItem("carrinho");

      if (carrinhoGuestSalvo) {
        try {
          carrinhoGuest = JSON.parse(carrinhoGuestSalvo);
        } catch {
          carrinhoGuest = [];
        }
      }

      // 🔥 JUNTA OS DOIS (sem perder nada)
      const carrinhoFinal = [...carrinhoGuest, ...carrinhoUser];

      setCarrinho(carrinhoFinal);

      // 🔥 salva já unificado no usuário
      localStorage.setItem(
        `carrinho_${u.uid}`,
        JSON.stringify(carrinhoFinal)
      );

      // 🔥 limpa guest
      localStorage.removeItem("carrinho");

    } catch (e) {
      console.log("🔥 ERRO FIRESTORE:", e);
    }

  });

  return () => unsubscribe();
}, []);



useEffect(() => {
  if (!user) return;

  localStorage.setItem(
    `carrinho_${user.uid}`,
    JSON.stringify(carrinho)
  );
}, [carrinho, user]);

useEffect(() => {
  if (!mostrarPagamento) return;
  if (formaPagamento !== "pix") return;
  if (loadingPix) return;
  if (paymentId || qrBase64) return;

  gerarPix();
}, [mostrarPagamento, formaPagamento]);

useEffect(() => {
  async function carregarCupons() {
    const snap = await getDocs(collection(db, "cupons"));
    const lista = [];

    snap.forEach(doc => {
      lista.push({ id: doc.id, ...doc.data() });
    });

    setCupons(lista);
  }

  carregarCupons();
}, []);



useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "fretes"), (snapshot) => {
    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setFretes(lista);
  });

  return () => unsubscribe();
}, []);


useEffect(() => {
  if (aba !== "pedidos" || step !== 5) return;

  const interval = setInterval(() => {
    setAgoraPedidos(Date.now());
  }, 1000);

  return () => clearInterval(interval);
}, [aba, step]);

// 🔥 CHAMA WHATSAPP AQUI

useEffect(() => {
  if (!pedidoAtual?.id) return;

  console.log("🔎 Monitorando pedido:", pedidoAtual.id);

  const ref = doc(db, "pedidos", pedidoAtual.id);

  const unsubscribe = onSnapshot(ref, (snap) => {
    if (!snap.exists()) return;

    const dados = snap.data();

    console.log("🔥 FIREBASE:", dados);

    // ✅ SOMENTE quando for PAGO REAL
    if (dados.statusPagamento === "pago") {

      console.log("✅ PAGAMENTO REAL CONFIRMADO");

      setPedidoPago({
        codigo: dados.codigo,
        total: dados.total,
        itens: dados.itens,
        clienteNome: dados.cliente?.nome,
        clienteTelefone: dados.cliente?.telefone
      });

    }
  });

  return () => unsubscribe();
}, [pedidoAtual]);
 
 if (!mounted) return null;




 async function pagarCheckout(pedidoId) {
  try {
    const res = await fetch("/api/checkoutpro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total: Number(totalFinalComFrete || 0) / 100,
        pedidoId,
        nome: clienteNome,
        email: clienteEmail
      })
    });

    const data = await res.json();

    if (!data.url) {
      mostrarToast("Erro ao abrir pagamento", "erro");
      return;
    }

    await updateDoc(doc(db, "pedidos", pedidoId), {
      checkoutUrl: data.url,
      checkoutId: data.id || null,
      status: "aguardando_pagamento_online"
    });

    window.location.href = data.url;

  } catch (e) {
    console.log(e);
    mostrarToast("Erro no pagamento online", "erro");
  }
}




function adicionarAcaiGratis() {
  const acaiBase = produtos.find(
    (p) => p.resgate === true
  );

  if (!acaiBase) {
    alert("Nenhum produto disponível para resgate");
    return;
  }

  const acaiGratis = {
    produto: {
      ...acaiBase,
      preco: 0
    },
    quantidade: 1,
    total: 0,
    extras: [],
    gratis: true
  };

  setCarrinho((prev) => {
    const jaExiste = prev.some((p) => p.gratis);
    if (jaExiste) return prev;

    return [...prev, acaiGratis];
  });
}

// criar tela sem o emoje
function TelaHome() {
  return <div>🏠 Tela Home</div>;
}

function TelaPedidos() {
  return <div>📄 Tela Pedidos</div>;
}

function TelaCarrinho() {
  return <div>🛒 Tela Carrinho</div>;
}

function TelaPerfil() {
  return <div>👤 Tela Perfil</div>;
}

// agrupar notificacoes

function agruparNotificacoes(lista) {
  const hoje = new Date().toDateString();

  const grupos = {
    hoje: [],
    antigas: []
  };

  lista.forEach(n => {
    const data = new Date(n.data).toDateString();

    if (data === hoje) {
      grupos.hoje.push(n);
    } else {
      grupos.antigas.push(n);
    }
  });

  return grupos;
}

const notificacoesOrdenadas = [...notificacoes].sort(
  (a, b) => new Date(b.data) - new Date(a.data)
);

const grupos = agruparNotificacoes(notificacoesOrdenadas);




// notificar marca lida
async function marcarUmaComoLida(n) {

  if (n.lida) return;

  await updateDoc(doc(db, "notificacoes", n.id), {
    lida: true
  });

}


const gerarNovoPixDoPedido = async (pedido) => {
  try {
    if (!pedido?.id) {
      mostrarMensagemPagamento("Pedido inválido para gerar novo Pix.", "erro");
      return;
    }

    const totalPedido = Number(pedido.total || 0);
    const valorPix = totalPedido > 100 ? totalPedido / 100 : totalPedido;

    if (!valorPix || valorPix <= 0) {
      mostrarMensagemPagamento("Valor inválido para gerar o novo Pix.", "erro");
      return;
    }

    setQrBase64(null);
    setQrCode(null);
    setPaymentId(null);
    setPedidoPago(null);

    const res = await fetch("/api/pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total: valorPix,
        pedidoId: pedido.id
      })
    });

    const data = await res.json();

    if (!data?.payment_id) {
      mostrarMensagemPagamento("Não foi possível gerar um novo Pix agora.", "erro");
      return;
    }

    setQrBase64(data.qr_code_base64 || null);
    setQrCode(data.qr_code || null);
    setPaymentId(String(data.payment_id));
    setFormaPagamento("pix");
    setMostrarPagamento(true);

    localStorage.setItem("paymentId", String(data.payment_id));
    localStorage.setItem("pedidoId", pedido.id);

    await updateDoc(doc(db, "pedidos", pedido.id), {
      paymentId: String(data.payment_id),
      qrCode: data.qr_code || "",
      qrBase64: data.qr_code_base64 || "",
      statusPagamento: "aguardando_pagamento",
      status: "aguardando_pagamento",
      data: Date.now()
    });

    mostrarMensagemPagamento(
      "Novo Pix gerado com sucesso. Faça o pagamento para continuar.",
      "sucesso"
    );

  } catch (e) {
    console.log("ERRO AO GERAR NOVO PIX:", e);
    mostrarMensagemPagamento("Erro ao gerar novo Pix. Tente novamente.", "erro");
  }
};



// PROMOCAO 
const produtoEmPromocao = (p) => {
  return (
    p?.promocao === true &&
    Number(p?.precoPromocional || 0) > 0 &&
    Number(p?.precoPromocional || 0) < Number(p?.preco || 0)
  );
};

const precoFinalProduto = (p) => {
  return produtoEmPromocao(p)
    ? Number(p.precoPromocional || 0)
    : Number(p.preco || 0);
};


function abrirProdutoDaNotificacao(notificacao) {
  if (!notificacao?.produtoId) return;

  const produtoEncontrado = produtos.find(
    (p) => String(p.id) === String(notificacao.produtoId)
  );

  if (!produtoEncontrado) {
    mostrarMensagemPagamento("Esse produto não está mais disponível.", "erro");
    return;
  }

  setProduto(produtoEncontrado);
  setAba("home");
  setStep(2);
}


// notificar
function NotificacaoItem({ n }) {
  async function marcarUmaComoLida() {
    if (n?.lida) return;

    try {
      await updateDoc(doc(db, "notificacoes", n.id), {
        lida: true
      });
    } catch (e) {
      console.log("Erro ao marcar notificação como lida:", e);
    }
  }

  const dataObj = n?.data ? new Date(n.data) : null;

  const ehHoje =
    dataObj &&
    dataObj.toDateString() === new Date().toDateString();

  const exibicaoTempo = dataObj
    ? ehHoje
      ? dataObj.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit"
        })
      : dataObj.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit"
        })
    : "";

  return (
    <div
      onClick={async () => {
        await marcarUmaComoLida();
        abrirProdutoDaNotificacao(n);
      }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14
      }}
    >
      {/* IMAGEM */}
      <img
        src={n?.imagem || "/icon-192.png"}
        alt={n?.produtoNome || "Notificação"}
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          objectFit: "cover",
          flexShrink: 0,
          background: "#eaeaea"
        }}
      />

      {/* CONTEÚDO */}
      <div
        style={{
          flex: 1,
          minWidth: 0
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "#111",
            lineHeight: 1.25,
            marginBottom: 6
          }}
        >
          {n?.titulo || n?.produtoNome || "Notificação"}
        </div>

        <div
          style={{
            fontSize: 14,
            color: "#222",
            lineHeight: 1.3,
            wordBreak: "break-word"
          }}
        >
          {n?.texto}
        </div>
      </div>

      {/* DIREITA (HORA + BOLINHA) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
          minWidth: 44
        }}
      >
        {/* HORA */}
        <div
          style={{
            fontSize: 12,
            color: "#333",
            fontWeight: 500
          }}
        >
          {exibicaoTempo}
        </div>

        {/* 🔴 BOLINHA */}
        {!n?.lida && (
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ea1d2c"
            }}
          />
        )}
      </div>
    </div>
  );
}





async function alterarSenha() {
  try {
    setLoadingSenha(true);

    if (!novaSenha || novaSenha.length < 6) {
      mostrarToast("A senha deve ter pelo menos 6 caracteres", "erro");
      return;
    }

    if (novaSenha !== confirmarNovaSenha) {
      mostrarToast("As senhas não coincidem", "erro");
      return;
    }

    const userAtual = auth.currentUser;

    if (!userAtual) {
      mostrarToast("Usuário não autenticado", "erro");
      return;
    }

    await updatePassword(userAtual, novaSenha);

    mostrarToast("Senha alterada com sucesso", "sucesso");

    setNovaSenha("");
    setConfirmarNovaSenha("");

  } catch (e) {
    console.log(e);

    if (e.code === "auth/requires-recent-login") {
      mostrarToast("Faça login novamente para alterar a senha", "erro");
    } else {
      mostrarToast("Erro ao alterar senha", "erro");
    }
  } finally {
    setLoadingSenha(false);
  }
}

async function marcarComoLida() {
  try {
    const pendentes = notificacoes.filter((n) => n?.lida !== true);

    await Promise.all(
      pendentes.map((n) =>
        updateDoc(doc(db, "notificacoes", n.id), {
          lida: true
        })
      )
    );

    setTemNotificacao(false);
  } catch (e) {
    console.log("Erro ao marcar notificações como lidas:", e);
  }
}




// gerar pix

const gerarPix = async () => {
  try {
    if (!validarLojaAberta()) return;

    if (!user) {
      localStorage.setItem("redirectAfterLogin", "finalizar");
      router.push("/login");
      return;
    }

    if (pedidoPixAberto) {
      console.log("Fluxo de pedido existente: gerarPix bloqueado");
      return;
    }

    if (!totalFinalComFrete || totalFinalComFrete <= 0) {
      mostrarMensagemPagamento("Sua sacola está vazia.", "erro");
      return;
    }

    if (!clienteNome || !clienteTelefone) {
      mostrarMensagemPagamento("Preencha seus dados antes de gerar o Pix.", "erro");
      return;
    }

    if (!clienteEndereco || !clienteNumeroCasa || !clienteBairro) {
      mostrarMensagemPagamento("Preencha endereço, número e bairro para continuar.", "erro");
      return;
    }

    const cupomValidoAgora = await validarCupomAntes();
    if (!cupomValidoAgora) return;

    const valorPix = Number(totalFinalComFrete) / 100;
    const pedidoId = Date.now().toString();

    setQrBase64(null);
    setQrCode(null);
    setPaymentId(null);
    setPedidoPago(null);

    const res = await fetch("/api/pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total: valorPix,
        pedidoId,
        nome: clienteNome || "Cliente",
        email: user?.email || "cliente@email.com"
      })
    });

    const data = await res.json();

    if (!data?.payment_id) {
      mostrarMensagemPagamento("Não foi possível gerar o Pix agora. Tente novamente.", "erro");
      return;
    }

    setQrBase64(data.qr_code_base64 || null);
    setQrCode(data.qr_code || null);
    setPaymentId(String(data.payment_id));
    setFormaPagamento("pix");
    setMostrarPagamento(true);

    localStorage.setItem("paymentId", String(data.payment_id));

    // 🔥 CONGELA O CARRINHO
    const carrinhoAtual = JSON.parse(JSON.stringify(carrinho));

    // 🔥 DEBUG GERAL
    console.log("=== DEBUG PEDIDO ===");
    console.log("pedidoId:", pedidoId);
    console.log("carrinhoAtual:", carrinhoAtual);

    carrinhoAtual.forEach((item, i) => {
      console.log(`ITEM ${i}:`, item);

      (item.extras || []).forEach((e, j) => {
        console.log(`EXTRA ORIGINAL ${i}-${j}:`, e);
      });
    });

    await setDoc(doc(db, "pedidos", pedidoId), {
      __origem: "PIX_DEBUG_FINAL",

      cliente: {
        nome: clienteNome || "Cliente",
        telefone: clienteTelefone || "",
        endereco: clienteEndereco || "",
        numero: clienteNumeroCasa || "",
        bairro: clienteBairro || "",
        uid: user.uid
      },

      itens: carrinhoAtual.map((item, i) => {
        console.log(`PROCESSANDO ITEM ${i}`);

        const extrasProcessados = (() => {
          const mapa = {};

          (item?.extras || []).forEach((e, j) => {
            const nome = e?.nome || "extra";

            if (!mapa[nome]) {
              mapa[nome] = {
                nome,
                preco: Number(e?.preco || 0),
                categoria: e?.categoria || "Extras",
                qtd: 0
              };
            }

            mapa[nome].qtd += 1;

            console.log(`CONTANDO EXTRA ${i}-${j}:`, mapa[nome]);
          });

          return Object.values(mapa);
        })();

        console.log(`EXTRAS FINAL ITEM ${i}:`, extrasProcessados);

        return {
          produtoId: item?.produto?.id || "",
          nome: item?.produto?.nome || item?.nome || "Produto",
          quantidade: Number(item?.quantidade || 1),
          total: Number(item?.total || 0),

          tamanho: item?.tamanho || item?.produto?.tamanho || "",
          descricaoTamanho:
            item?.descricaoTamanho ||
            item?.produto?.descricaoTamanho ||
            "",

          extras: extrasProcessados
        };
      }),

      bairro: clienteBairro || "",
      subtotal: Number(subtotalProdutos || 0),
      taxaEntrega: Number(taxaEntrega || 0),
      total: Number(totalFinalComFrete || 0),

      formaPagamento: "pix",
      observacao: String(observacaoPedido || "").trim(),

      statusPagamento: "aguardando_pagamento",
      status: "aguardando_pagamento",

      entrega: {
        aceito: false,
        status: "aguardando",
        entregadorId: null,
        localizacao: null,
        horaSaiu: null,
        horaChegou: null,
        horaEntregue: null
      },

      cupom: cupomAplicado
        ? {
            id: cupomAplicado.id,
            codigo: cupomAplicado.codigo || "",
            tipo: cupomAplicado.tipo || "",
            desconto: Number(descontoCalculado || 0)
          }
        : null,

      paymentId: String(data.payment_id),
      qrCode: data.qr_code || "",
      qrBase64: data.qr_code_base64 || "",
      data: Date.now()
    });

    console.log("🔥 PEDIDO SALVO COM SUCESSO");

    localStorage.setItem("pedidoId", pedidoId);

    setPedidoAtual({
      id: pedidoId,
      ativo: true
    });

    mostrarMensagemPagamento(
      "Pix gerado com sucesso. Faça o pagamento para liberar seu pedido.",
      "sucesso"
    );

  } catch (e) {
    console.log("ERRO GERAL PIX:", e);
    mostrarMensagemPagamento("Ocorreu um erro ao gerar o Pix. Tente novamente.", "erro");
  }
};




// 🔥 FORMATADOR GLOBAL (COLOCA NO TOPO DO ARQUIVO)
function formatarReal(valor) {
  return (Number(valor || 0) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// 🔥 TOTAL EXTRAS (produto atual)
const totalExtras = Object.values(extrasSelecionados)
  .flat()
  .reduce((acc, e) => acc + (Number(e.preco || 0) * (e.qtd || 1)), 0);

const podeContinuar = extrasDoProduto.every(grupo => {
  const selecionados = extrasSelecionados[grupo.categoria] || [];
  return selecionados.length >= grupo.min;
});

const precoBase = Math.round(Number(produto?.preco || 0));

const totalFinalItem =
  (precoBase + totalExtras) * quantidade;

// 🔥 TOTAL DO CARRINHO (CENTAVOS)
const total = carrinho.reduce((acc, item) => {
  return acc + Number(item.total || 0);
}, 0);

// 🔥 DESCONTO
let descontoCalculado = 0;

if (cupomAplicado) {
  const totalSeguro = Number(total || 0);

  if (cupomAplicado.tipo === "porcentagem") {
    descontoCalculado = Math.floor(
      totalSeguro * (Number(cupomAplicado.desconto || 0) / 100)
    );
  } else {
    descontoCalculado = Number(cupomAplicado.desconto || 0);
  }

  descontoCalculado = Math.min(descontoCalculado, totalSeguro);
}

// 🔥 TOTAL FINAL (SEM FRETE)
const totalFinal = Math.max(0, total - descontoCalculado);

// =============================
// 🚀 FRETE NÍVEL IFOOD
// =============================


function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

const LIMITE_FRETE_GRATIS = 3000; // R$30
const LIMITE_KM = 7;

// 🔥 SUBTOTAL
const subtotalProdutos = Array.isArray(carrinho)
  ? carrinho.reduce((acc, item) => acc + Number(item.total || 0), 0)
  : 0;

// 🔥 BAIRRO
const bairroClienteNormalizado = (clienteBairro || "")
  .trim()
  .toLowerCase();

// 🔥 FRETE ADMIN
const freteEncontrado = Array.isArray(fretes)
  ? fretes.find(
      (f) =>
        String(f?.bairro || "").trim().toLowerCase() ===
          bairroClienteNormalizado && f?.ativo !== false
    )
  : null;

// 🔥 LOCALIZAÇÃO CLIENTE
const lat = clienteLat ?? null;
const lng = clienteLng ?? null;

// 🔥 DISTÂNCIA
let distanciaCliente = null;

if (lat !== null && lng !== null) {
  distanciaCliente = calcularDistanciaKm(
    LOJA.lat,
    LOJA.lng,
    lat,
    lng
  );
}

console.log("LAT:", lat);
console.log("LNG:", lng);
console.log("DISTANCIA:", distanciaCliente);

// 🔥 CONTROLE
let taxaEntrega = Number(freteEncontrado?.valor || 0);
let freteGratis = false;
let foraDaArea = false;
let precisaLocalizacao = false;

// 🚫 RETIRADA
if (tipoEntrega === "retirada") {
  taxaEntrega = 0;
}

// 📍 ENTREGA
else {

  // ❗ SEM LOCALIZAÇÃO
  if (lat === null || lng === null) {
    precisaLocalizacao = true;
  }

  // 🚫 FORA DA ÁREA
  else if (distanciaCliente > LIMITE_KM) {
    foraDaArea = true;
  }

  // 🎁 FRETE GRÁTIS (SÓ AQUI)
  else if (subtotalProdutos >= LIMITE_FRETE_GRATIS) {
    taxaEntrega = 0;
    freteGratis = true;
  }

}

// 🔥 FALTA PARA FRETE GRÁTIS
const faltaFreteGratis = Math.max(
  0,
  LIMITE_FRETE_GRATIS - subtotalProdutos
);

// 🔥 TOTAL FINAL COM FRETE
const totalFinalComFrete = totalFinal + taxaEntrega;



// 🔥 MELHOR CUPOM AUTOMÁTICO
const melhorCupom = Array.isArray(cupons)
  ? cupons.reduce((melhor, atual) => {

      const totalSeguro = total;

      if (!melhor) return atual;

      const descontoAtual =
        atual.tipo === "porcentagem"
          ? Math.floor(totalSeguro * (Number(atual.desconto || 0) / 100))
          : Number(atual.desconto || 0);

      const descontoMelhor =
        melhor.tipo === "porcentagem"
          ? Math.floor(totalSeguro * (Number(melhor.desconto || 0) / 100))
          : Number(melhor.desconto || 0);

      return descontoAtual > descontoMelhor ? atual : melhor;

    }, null)
  : null;



// 🔥 calcular total

function calcularTotalItem(produto, quantidade, extras) {
  let total = Number(produto.preco || 0);

  (extras || []).forEach(e => {
    const preco = Number(e.preco || 0);
    const qtd = Number(e.qtd || 1);

    total += preco * qtd;
  });

  return Number(total * quantidade);
}


// 🔥 mais vendido
function calcularMaisVendido(pedidos) {
  const contador = {};

  pedidos.forEach(p => {
    p.itens?.forEach(item => {
      const nome = item.nome || item.produto?.nome;

      if (!nome) return;

      contador[nome] = (contador[nome] || 0) + item.quantidade;
    });
  });

  const ordenado = Object.entries(contador)
    .sort((a, b) => b[1] - a[1]);

  return ordenado[0]?.[0];
}


 // 🔥 instalar app
async function instalarApp() {
  if (!installPrompt) return;

  installPrompt.prompt();

  const escolha = await installPrompt.userChoice;
  console.log("Resultado da instalação:", escolha);

  setInstallPrompt(null);
  setPodeInstalar(false);
}

  // 🔥 FUNÇÕES
  function toggleExtra(categoria, item, max) {
  setExtrasSelecionados(prev => {

    const atual = prev[categoria] || [];

    const index = atual.findIndex(e => e.nome === item.nome);

    let novos;

    // 🔥 NÃO EXISTE → ADICIONA
    if (index === -1) {

      if (atual.length >= max) return prev;

      novos = [
        ...atual,
        {
          nome: item.nome,
          preco: Number(String(item.preco || 0).replace(",", ".")),
          categoria,
          qtd: 1
        }
      ];

    } else {

      // 🔥 CORREÇÃO AQUI (SEM MUTAÇÃO)
      novos = atual.map((e, i) =>
        i === index
          ? { ...e, qtd: Number(e.qtd || 1) + 1 }
          : e
      );
    }

    return {
      ...prev,
      [categoria]: novos
    };
  });
}

// SAIR
async function sair() {

  const confirmar = confirm("Deseja sair?");
  if (!confirmar) return;

  await signOut(auth);

  // só limpa estado (sem reload)
  setUser(null);
}

async function salvarDadosCliente() {
  if (!authReady) {
    setToast({
      tipo: "info",
      texto: "Carregando usuário..."
    });

    setTimeout(() => setToast(null), 2200);
    return;
  }

  if (!user) {
    setToast({
      tipo: "erro",
      texto: "Você precisa estar logado"
    });

    setTimeout(() => setToast(null), 2200);
    return;
  }

  try {
    await setDoc(
      doc(db, "usuarios", user.uid),
      {
        clienteNome,
        clienteTelefone,
        clienteEndereco,
        clienteNumeroCasa,
        clienteCep,
        clienteBairro
      },
      { merge: true }
    );

    setToast({
      tipo: "sucesso",
      texto: "Alteração Feita"
    });

    setTimeout(() => setToast(null), 2200);
  } catch (e) {
    console.log("ERRO REAL:", e);

    setToast({
      tipo: "erro",
      texto: "Erro ao salvar dados"
    });

    setTimeout(() => setToast(null), 2200);
  }
}


const API_KEY = "AIzaSyDcYjwISarAZtgTuDeDgwQIBmNpE3aG5ks";

const buscarEnderecoGoogle = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&language=pt-BR`
    );

    const data = await res.json();

    console.log("RESPOSTA GOOGLE:", data); // 🔥 DEBUG

    if (data.status !== "OK") {
      console.log("Erro API:", data.status);
      return;
    }

    const comp = data.results[0].address_components;

    const get = (type) =>
      comp.find(c => c.types.includes(type))?.long_name || "";

    const rua = get("route");
    const numero = get("street_number");
    const bairro = get("sublocality") || get("neighborhood");
    const cep = get("postal_code");

    setClienteEndereco(rua);
    setClienteNumeroCasa(numero || "");
    setClienteBairro(bairro);
    setClienteCep(cep);

  } catch (e) {
    console.log("Erro:", e);
  }
};

// 🔥 buscar cep
const buscarCEP = async (cep) => {
  try {
    // 🔥 PROTEÇÃO: evita crash deslogado
    if (!user?.uid) {
      setToast({
        tipo: "erro",
        texto: "Faça login para preencher o endereço"
      });

      setTimeout(() => setToast(null), 3000);
      return;
    }

    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);

    const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    // 🔥 PROTEÇÃO: evita erro de rede
    if (!res.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await res.json();

    // 🔥 PROTEÇÃO: valida retorno
    if (!data || data.erro) {
      setClienteEndereco("");
      setClienteBairro("");

      setToast({
        tipo: "erro",
        texto: "CEP não encontrado"
      });

      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 🔥 SETA DADOS COM SEGURANÇA
    setClienteCep(cepLimpo);
    setClienteEndereco(data.logradouro || "");
    setClienteBairro(data.bairro || "");

    setToast({
      tipo: "sucesso",
      texto: "Endereço preenchido automaticamente"
    });

    setTimeout(() => setToast(null), 3000);

  } catch (e) {
    console.log("ERRO CEP:", e);

    setClienteEndereco("");
    setClienteBairro("");

    setToast({
      tipo: "erro",
      texto: "Erro ao buscar CEP"
    });

    setTimeout(() => setToast(null), 3000);

  } finally {
    setLoadingCep(false);
  }
};


 // FORMATAR cep PREENCHE CORRETO
function formatarCEP(valor) {

  valor = valor.replace(/\D/g, "");
  valor = valor.slice(0, 8);

  if (valor.length > 5) {
    return valor.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
  }

  return valor;
}

  // FORMATAR CELULAR PREENCHE CORRETO
function formatarTelefone(valor) {

  // remove tudo que não é número
  valor = valor.replace(/\D/g, "");

  // limita a 11 números
  valor = valor.slice(0, 11);

  // aplica formatação
  if (valor.length > 10) {
    return valor.replace(
      /^(\d{2})(\d{5})(\d{4})$/,
      "($1) $2-$3"
    );
  } else if (valor.length > 6) {
    return valor.replace(
      /^(\d{2})(\d{4})(\d{0,4})$/,
      "($1) $2-$3"
    );
  } else if (valor.length > 2) {
    return valor.replace(
      /^(\d{2})(\d{0,5})$/,
      "($1) $2"
    );
  } else {
    return valor;
  }
}



   // 🔥 FUNÇÕES rempover item carrinho
function adicionarCarrinho() {
  if (!validarLojaAberta()) return;
  if (!produto) return;

  const nomeProduto = produto.nome;

  const precoBase = Math.round(Number(produto?.preco || 0));

  // 🔥 CALCULA EXTRAS
  const totalExtras = Object.values(extrasSelecionados)
    .flat()
    .reduce((acc, e) => {
      const preco = Number(String(e.preco || 0).replace(",", "."));
      const qtd = Number(e.qtd || 1);
      return acc + (preco * qtd);
    }, 0);

  const totalItem = Math.round((precoBase + totalExtras) * quantidade);

  // 🔥 EXTRAS AGRUPADOS (CORRETO)
  const extrasFinal = Object.entries(extrasSelecionados)
    .flatMap(([categoria, lista]) => {
      const agrupado = {};

      lista.forEach(e => {
        const chave = `${categoria}-${e.nome}`;

        if (!agrupado[chave]) {
          agrupado[chave] = {
            nome: e.nome,
            preco: Number(String(e.preco || 0).replace(",", ".")),
            categoria,
            qtd: 0
          };
        }

        agrupado[chave].qtd += Number(e.qtd || 1);
      });

      return Object.values(agrupado);
    });

  console.log("EXTRAS FINAL:", extrasFinal); // ✅ AGORA NO LUGAR CERTO

  // 🔥 ITEM BASE
  let novoItem = {
    produto,
    quantidade,
    extras: extrasFinal,
    total: totalItem,
    tamanho: produto?.tamanho || "",
    descricaoTamanho: produto?.descricaoTamanho || ""
  };

  console.log("NOVO ITEM:", novoItem);

  // 🔥 FIDELIDADE
  if (modoCompra === "fidelidade") {
    if (produto.resgate !== true) {
      setToast({
        tipo: "erro",
        texto: "Esse produto não faz parte do plano fidelidade"
      });
      return;
    }

    const jaTemGratis = carrinho.some(item => item.gratis);
    if (jaTemGratis) return;

    const totalExtrasFidelidade = extrasFinal.reduce((acc, e) => {
      const preco = Number(e.preco || 0);
      if (preco > 0) return acc + (preco * e.qtd);
      return acc;
    }, 0);

    novoItem = {
      produto: {
        ...produto,
        preco: 0
      },
      quantidade,
      extras: extrasFinal,
      total: Math.round(totalExtrasFidelidade * quantidade),
      gratis: true,
      tamanho: produto?.tamanho || "",
      descricaoTamanho: produto?.descricaoTamanho || ""
    };
  }

  // 🔥 ADICIONA / EDITA
  if (editandoIndex !== null) {
    setCarrinho(prev => {
      const novo = [...prev];
      novo[editandoIndex] = novoItem;
      return novo;
    });
    setEditandoIndex(null);
  } else {
    setCarrinho(prev => [...prev, novoItem]);
  }

  // 🔥 RESET
  setModoCompra("normal");
  setExtrasSelecionados({});
  setQuantidade(1);

  setAba("carrinho");
  setStep(3);

  setToast({
    nome: novoItem.gratis
      ? "Açaí grátis adicionado"
      : nomeProduto
  });

  setTimeout(() => setToast(null), 2500);
}



function resgatarAcai() {
  if (!validarLojaAberta()) return;

  const produtoResgate = produtos.find(p => p.resgate === true);

  if (!produtoResgate) {
    setToast({
      tipo: "erro",
      texto: "Nenhum produto disponível para resgate"
    });
    return;
  }

  const jaTemGratis = carrinho.some(item => item.gratis);
  if (jaTemGratis) return;

  const novoItem = {
    produto: {
      ...produtoResgate,
      preco: 0
    },
    quantidade: 1,
    extras: [],
    total: 0,
    gratis: true
  };

  setCarrinho(prev => [...prev, novoItem]);

  setAba("carrinho");
  setStep(3);

  setToast({
    nome: "Açaí grátis adicionado"
  });

  setTimeout(() => setToast(null), 2500);
}

function removerItem(index) {
  setCarrinho(prev => prev.filter((_, i) => i !== index));
}

// 🔥 EDITAR PEDIDO
function editarItem(index) {
  const item = carrinho[index];
  if (!item) return;

  if (!categoriaTemExtras(item.produto.categoria)) return;

  const produtoBase = item.produto;

  const gruposDoProduto =
    produtoBase?.extras?.length
      ? produtoBase.extras
      : extrasGlobais;

  const extrasOrganizados = {};

  (item.extras || []).forEach(extra => {
    const categoriaExtra = extra.categoria || "Extras";

    if (!extrasOrganizados[categoriaExtra]) {
      extrasOrganizados[categoriaExtra] = [];
    }

    extrasOrganizados[categoriaExtra].push({
      nome: extra.nome,
      preco: Number(extra.preco || 0),
      categoria: categoriaExtra,
      qtd: Number(extra.qtd || 1)
    });
  });

  setProduto(produtoBase);
  setQuantidade(Number(item.quantidade || 1));
  setExtrasSelecionados(extrasOrganizados);
  setEditandoIndex(index);

  setAba("home");
  setStep(2);
}
// 🍧 AÇAÍ → ADICIONAR OU TIRAR
function alterarQuantidade(index, tipo) {
  setCarrinho(prev => {
    return prev.map((item, i) => {
      if (i !== index) return item;

      let novaQuantidade =
        tipo === "mais"
          ? item.quantidade + 1
          : Math.max(1, item.quantidade - 1);

      const preco = item.produto.preco || 0;
      const extrasTotal = (item.extras || []).reduce(
  (acc, e) => acc + (Number(e.preco || 0) * Number(e.qtd || 1)),
    0
   );

      return {
        ...item,
        quantidade: novaQuantidade,
        total: (preco + extrasTotal) * novaQuantidade
      };
    });
  });
}


function mostrarLojaFechada() {
  setToastLojaFechada(true);

  setTimeout(() => {
    setToastLojaFechada(false);
  }, 2500);
}

function validarLojaAberta() {
  if (!lojaAberta) {
    mostrarLojaFechada();("Loja fechada no momento", "erro");
    return false;
  }

  return true;
}


// valir o cupom antes e depois gerar o pix
async function validarCupomAntes() {
  if (!cupomAplicado?.id) return true;

  const cpfLimpo = (clienteCpf || "").replace(/\D/g, "");

  if (!cpfLimpo || cpfLimpo.length !== 11) {
    alert("Informe um CPF válido");
    return false;
  }

  const ref = doc(db, "cupons", cupomAplicado.id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("Cupom inválido");
    return false;
  }

  const dados = snap.data();

  if (!dados.ativo) {
    alert("Cupom desativado");
    return false;
  }

  if (dados.validade && new Date(dados.validade) < new Date()) {
    alert("Cupom expirado");
    return false;
  }

  if (Number(total || 0) < Number(dados.minimo || 0)) {
    alert("Pedido mínimo para esse cupom não atingido");
    return false;
  }

  if (dados.usos && dados.usos[cpfLimpo]) {
    alert("Você já utilizou esse cupom ❌");
    return false;
  }

  return true;
}

async function aplicarCupom() {

  if (!cupomInput) return alert("Digite um cupom");

  const cupomDigitado = (cupomInput || "").trim().toLowerCase();

  if (cupomAplicado) {
    alert("Já existe um cupom aplicado");
    return;
  }

  // 🔥 AQUI ENTRA O CUPOMVALIDO
  const cupomValido = cupons.find(c =>
    c.codigo?.trim().toLowerCase() === cupomDigitado
  );

  if (!cupomValido) {
    alert("Cupom inválido");
    return;
  }

  if (!cupomValido.ativo) {
    alert("Cupom desativado");
    return;
  }

  if (Number(total || 0) < Number(cupomValido.minimo || 0)) {
    alert(`Pedido mínimo: ${formatarReal(cupomValido.minimo)}`);
    return;
  }

  const hoje = new Date();
  const validade = new Date(cupomValido.validade);

  if (hoje > validade) {
    alert("Cupom expirado");
    return;
  }

  const cpfLimpo = (clienteCpf || "").replace(/\D/g, "");

  if (cupomValido.usos?.[cpfLimpo]) {
    alert("Você já usou esse cupom");
    return;
  }

  // 🔥 CALCULO CORRETO (CENTAVOS)
  let valorDesconto = 0;
  const totalSeguro = Number(total || 0);

  if (cupomValido.tipo === "porcentagem") {
    valorDesconto = Math.floor(totalSeguro * (cupomValido.desconto / 100));
  } else {
    valorDesconto = Number(cupomValido.desconto || 0);
  }

  valorDesconto = Math.min(valorDesconto, totalSeguro);

  setDesconto(valorDesconto);
  setCupomAplicado(cupomValido);

  alert("Cupom aplicado!");
}


async function registrarUsoCupom() {
  if (!cupomAplicado?.id) return true;

  const cpfLimpo = (clienteCpf || "").replace(/\D/g, "");

  if (!cpfLimpo || cpfLimpo.length !== 11) {
    alert("Informe um CPF válido para usar cupom");
    return false;
  }

  try {
    await updateDoc(doc(db, "cupons", cupomAplicado.id), {
      [`usos.${cpfLimpo}`]: true
    });

    return true;
  } catch (e) {
    console.log("Erro ao registrar uso do cupom:", e);
    alert("Erro ao registrar uso do cupom");
    return false;
  }
}


async function aplicarMelhorCupom() {
  if (!carrinho.length) {
    setCupomAplicado(null);

    setToast({
      tipo: "info",
      texto: "Adicione um produto antes de aplicar cupom."
    });
    setTimeout(() => setToast(null), 2200);
    return;
  }

  if (!cupons || !cupons.length) {
    setCupomAplicado(null);

    setToast({
      tipo: "info",
      texto: "Nenhum cupom disponível."
    });
    setTimeout(() => setToast(null), 2200);
    return;
  }

  // 🔥 TOTAL REAL
  const totalPedido = carrinho.reduce((acc, item) => {
    const totalItem = item?.gratis ? 0 : Number(item?.total || 0);
    return acc + totalItem;
  }, 0);

  const cpfLimpo = String(clienteCpf || "").replace(/\D/g, "");
  const agora = Date.now();

  const validos = cupons.filter((c) => {
    if (!c) return false;

    // 🔥 ATIVO FLEXÍVEL
    const ativo =
      c.ativo === true ||
      c.ativo === "true" ||
      c.ativo === 1;

    if (!ativo) return false;

    // 🔥 VALIDADE SEGURA
    if (c.validade) {
      const validadeMs = new Date(c.validade).getTime();
      if (!isNaN(validadeMs) && validadeMs < agora) return false;
    }

    // 🔥 MINIMO FLEXÍVEL
    const minimo = parseFloat(
      String(c.minimo || "0").replace(",", ".")
    );

    if (!isNaN(minimo) && totalPedido < minimo) return false;

    // 🔥 CPF (SE QUISER USAR, DEIXA)
    if (cpfLimpo && c.usos && c.usos[cpfLimpo]) {
      return false;
    }

    return true;
  });

  // 🔥 DEBUG
  console.log("TOTAL:", totalPedido);
  console.log("VALIDOS:", validos);

  if (!validos.length) {
    setCupomAplicado(null);

    setToast({
      tipo: "info",
      texto: "Nenhum cupom disponível para este pedido."
    });
    setTimeout(() => setToast(null), 2200);
    return;
  }

  let melhor = null;
  let maiorDesconto = 0;

  validos.forEach((c) => {
    let descontoTemp = 0;

    const tipo = String(c.tipo || "")
      .toLowerCase()
      .trim();

    if (tipo.includes("porcent") || tipo.includes("%")) {
      descontoTemp = Math.floor(
        totalPedido * (Number(c.desconto || 0) / 100)
      );
    } else {
      descontoTemp = Number(c.desconto || 0);
    }

    if (descontoTemp > maiorDesconto) {
      maiorDesconto = descontoTemp;
      melhor = c;
    }
  });

  if (!melhor) {
    setCupomAplicado(null);
    return;
  }

  // 🔥 LIMITE
  maiorDesconto = Math.min(maiorDesconto, totalPedido);

  // 🔥 APLICA
  setCupomAplicado({
    ...melhor,
    valorCalculado: maiorDesconto
  });

  setToast({
    tipo: "sucesso",
    texto: `Cupom aplicado: ${
      melhor.codigo || melhor.nome || "desconto"
    }`
  });

  setTimeout(() => setToast(null), 2200);
}

// marcar notificao
async function marcarComoLida() {
  const updates = notificacoes
    .filter(n => !n.lida)
    .map(n =>
      updateDoc(doc(db, "notificacoes", n.id), { lida: true })
    );

  await Promise.all(updates);
}


function getNomeCategoria(slug) {
  const cat = categorias.find(c => c.slug === slug);
  return cat?.nome || slug;
}


function categoriaTemExtras(categoria) {
  return ["acai", "promocoes", "combos"].includes(categoria);
}

function categoriaVaiDiretoCarrinho(categoria) {
  return categoria === "bebidas";
}


const limparHistoricoBusca = () => {
  setHistoricoBusca([]);
  localStorage.removeItem("historicoBusca");
};


function alterarExtra(
  categoria,
  item,
  delta,
  max = Infinity,
  permitirRepetir = true
) {
  setExtrasSelecionados((prev) => {
    const listaAtual = prev[categoria] || [];

    const index = listaAtual.findIndex((e) => e.nome === item.nome);

    let novaLista = [...listaAtual];

    const totalAtual = listaAtual.reduce(
      (acc, e) => acc + Number(e.qtd || 0),
      0
    );

    // ➖ REMOVER
    if (delta < 0) {
      if (index >= 0) {
        const atual = novaLista[index];
        const novaQtd = Number(atual.qtd || 0) - 1;

        if (novaQtd <= 0) {
          novaLista.splice(index, 1);
        } else {
          novaLista[index] = {
            ...atual,
            qtd: novaQtd
          };
        }
      }

      return {
        ...prev,
        [categoria]: novaLista
      };
    }

    // ➕ ADICIONAR

 if (max && totalAtual >= Number(max) && delta > 0) {
  return prev;
}

    if (index >= 0) {
      const atual = novaLista[index];

      // 🔥 ESSA LINHA É A CHAVE
      novaLista[index] = {
        ...atual,
        qtd: Number(atual.qtd || 0) + 1
      };

      return {
        ...prev,
        [categoria]: novaLista
      };
    }

    // 🔥 GARANTE QUE NÃO DUPLICA
    return {
      ...prev,
      [categoria]: [
        ...novaLista,
        {
          ...item,
          categoria,
          qtd: 1
        }
      ]
    };
  });
}



async function adicionarPontoFidelidade(pedido) {
  try {
    if (!pedido?.cliente?.uid) return;

    const ref = doc(db, "fidelidade", pedido.cliente.uid);

    const snap = await getDoc(ref);

    let pontos = 0;

    if (snap.exists()) {
      pontos = Number(snap.data().pontos || 0);
    }

    // 🔥 +1 ponto por pedido entregue
    pontos += 1;

    await setDoc(ref, {
      uid: pedido.cliente.uid,
      pontos,
      atualizadoEm: Date.now()
    }, { merge: true });

  } catch (e) {
    console.log("Erro fidelidade:", e);
  }
}


function aplicarCupomDireto(cupom) {
  let valorDesconto = 0;

  if (cupom.tipo === "porcentagem") {
    valorDesconto = total * (cupom.desconto / 100);
  } else {
    valorDesconto = cupom.desconto;
  }

  setCupomAplicado(cupom);
  setDesconto(valorDesconto);
}

async function finalizarPedido() {
  if (!validarLojaAberta()) return;

  if (!Array.isArray(carrinho)) {
    mostrarMensagemPagamento("Erro no carrinho.", "erro");
    return;
  }

  const itensValidos = carrinho.filter(item =>
    item &&
    item.produto &&
    item.produto.id &&
    item.produto.nome &&
    Number(item.quantidade) > 0
  );

  if (itensValidos.length === 0) {
    mostrarMensagemPagamento("Adicione produtos ao carrinho.", "erro");
    return;
  }

  const subtotalCalc = itensValidos.reduce((acc, item) => {
    const totalItem = item.gratis ? 0 : Number(item.total || 0);
    return acc + totalItem;
  }, 0);

  if (subtotalCalc <= 0) {
    mostrarMensagemPagamento("Adicione produtos válidos.", "erro");
    return;
  }

  if (!user) {
    localStorage.setItem("redirectAfterLogin", "finalizar");
    router.push("/login");
    return;
  }

  if (loadingPedido) return;

  const cupomValidoAgora = await validarCupomAntes();
  if (!cupomValidoAgora) return;

  if (!clienteNome || !clienteTelefone) {
    mostrarMensagemPagamento("Preencha seus dados.", "erro");
    setAba("perfil");
    setStep(4);
    setAbaPerfil("dados");
    return;
  }

  if (
    tipoEntrega !== "retirada" &&
    (!clienteEndereco || !clienteNumeroCasa || !clienteBairro)
  ) {
    mostrarMensagemPagamento("Preencha o endereço.", "erro");
    setAba("perfil");
    setStep(4);
    setAbaPerfil("endereco");
    return;
  }

  if (!formaPagamento) {
    mostrarMensagemPagamento("Escolha o pagamento.", "erro");
    return;
  }

  if (tipoEntrega !== "retirada") {
    if (precisaLocalizacao) {
      mostrarMensagemPagamento(
        "Informe seu endereço para calcular o frete.",
        "erro"
      );
      return;
    }

    if (foraDaArea) {
      mostrarMensagemPagamento(
        "Endereço fora da área de entrega (máx 7km).",
        "erro"
      );
      return;
    }
  }

  try {
    setLoadingPedido(true);

    const pedidoId = Date.now().toString();
    const codigo = Math.floor(100000 + Math.random() * 900000);

    const taxaEntregaFinal =
      tipoEntrega === "retirada" ? 0 : Number(taxaEntrega || 0);

    const totalFinalCalc = totalFinal + taxaEntregaFinal;

    const pedidoBase = {
      codigo,
      tipoEntrega: tipoEntrega || "entrega",

      cliente: {
        nome: clienteNome || "Cliente",
        telefone: clienteTelefone || "",
        endereco: clienteEndereco || "",
        numero: clienteNumeroCasa || "",
        bairro: clienteBairro || "",
        uid: user?.uid || null
      },

      itens: itensValidos.map(item => ({
        produtoId: item.produto.id,
        nome: item.produto.nome,
        quantidade: Number(item.quantidade),
        total: item.gratis ? 0 : Number(item.total || 0),
        gratis: item.gratis === true,

        // 🔥 CORREÇÃO AQUI
        extras: (item.extras || []).map(e => ({
          nome: e.nome || "",
          preco: Number(e.preco || 0),
          categoria: e.categoria || "Extras",
          qtd: Number(e.qtd || 1)
        }))
      })),

      subtotal: subtotalCalc,
      taxaEntrega: taxaEntregaFinal,
      total: totalFinalCalc,
      formaPagamento,
      data: Date.now(),

      observacao: String(observacaoPedido || "").trim(),

      cupom: cupomAplicado
        ? {
            id: cupomAplicado.id,
            codigo: cupomAplicado.codigo || "",
            tipo: cupomAplicado.tipo || "",
            desconto: Number(descontoCalculado || 0)
          }
        : null
    };

    // 💳 CARTÃO ONLINE
    if (formaPagamento === "cartao_online") {
      const res = await fetch("/api/checkoutpro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          total: totalFinalCalc / 100,
          pedidoId,
          nome: clienteNome,
          email: clienteEmail
        })
      });

      const data = await res.json();

      if (!data.url) {
        mostrarMensagemPagamento("Erro no pagamento.", "erro");
        setLoadingPedido(false);
        return;
      }

      await setDoc(doc(db, "pedidos", pedidoId), {
        ...pedidoBase,
        status: "aguardando_pagamento_online",
        checkoutUrl: data.url,
        checkoutId: data.id
      });

      window.open(data.url, "_blank");
      return;
    }

    // 🟢 PIX
    if (formaPagamento === "pix") {
      await setDoc(doc(db, "pedidos", pedidoId), {
        ...pedidoBase,
        status: "aguardando_pagamento_pix"
      });

      mostrarMensagemPagamento("Pedido criado. Pague no Pix.", "sucesso");
      setPedidoPixAberto({ ...pedidoBase, id: pedidoId });
      setMostrarPagamento(true);
      return;
    }

    // 💵 DINHEIRO
    await setDoc(doc(db, "pedidos", pedidoId), {
      ...pedidoBase,
      status: "preparando"
    });

    mostrarMensagemPagamento("Pedido confirmado.", "sucesso");

    await enviarWhatsApp({
      ...pedidoBase,
      codigo,
      total: totalFinalCalc
    });

    setCarrinho([]);
    setFormaPagamento(null);
    setMostrarPagamento(false);
    setPedidoPixAberto(null);

  } catch (e) {
    console.log(e);
    mostrarMensagemPagamento("Erro ao finalizar.", "erro");
  } finally {
    setLoadingPedido(false);
  }
}


const enviarWhatsApp = async (pedido) => {
  if (!pedido) return false;

  const codigo = pedido?.codigo || Date.now();
  const itens = Array.isArray(pedido?.itens) ? pedido.itens : [];
  const total = Number(pedido?.total || 0);
  const subtotal = Number(pedido?.subtotal || 0);
  const taxaEntrega = Number(pedido?.taxaEntrega || 0);
  const descontoCupom = Number(pedido?.cupom?.desconto || 0);
  const forma = pedido?.formaPagamento || formaPagamento || "Não informado";

  const tipoEntregaFinal =
    pedido?.tipoEntrega || tipoEntrega || "entrega";

  const nomeCliente =
    pedido?.cliente?.nome || clienteNome || "Cliente";

  const telefoneCliente =
    pedido?.cliente?.telefone || clienteTelefone || "-";

  const enderecoCliente =
    pedido?.cliente?.endereco || clienteEndereco || "Não informado";

  const numeroCliente =
    pedido?.cliente?.numero || clienteNumeroCasa || "-";

  const bairroCliente =
    pedido?.cliente?.bairro || clienteBairro || "";

  const observacao =
    pedido?.observacao || observacaoPedido || "";

  const codigoCupom =
    pedido?.cupom?.codigo || pedido?.cupom?.nome || "";

  const temGratis = itens.some(i => i?.gratis === true);

  let mensagem = `*Pedido #${codigo}*\n\n`;

  if (temGratis) {
    mensagem += ` *PEDIDO COM AÇAÍ GRÁTIS (FIDELIDADE)*\n\n`;
  }

  // 🛒 ITENS
  itens.forEach((item, i) => {
    const nomeProduto =
      item?.produto?.nome ||
      item?.nome ||
      "Produto";

    const quantidade = Number(item?.quantidade || 1);
    const totalItem = Number(item?.total || 0);

    const isGratis = item?.gratis === true;

    mensagem += `*${i + 1}. ${nomeProduto}*\n`;
    mensagem += `Qtd: ${quantidade}\n`;

    if (isGratis) {
      mensagem += ` *AÇAÍ GRÁTIS (FIDELIDADE)*\n`;
    }

    // 🔥 EXTRAS COM QTD CORRIGIDO
    if (Array.isArray(item?.extras) && item.extras.length > 0) {
      const extrasPorCategoria = {};

      item.extras.forEach((e) => {
        const categoria = e?.categoria || "Extras";
        const nomeExtra = e?.nome || "Item";
        const qtd = Number(e?.qtd || 1);

        if (!extrasPorCategoria[categoria]) {
          extrasPorCategoria[categoria] = [];
        }

        extrasPorCategoria[categoria].push(
          qtd > 1 ? `${nomeExtra} x${qtd}` : nomeExtra
        );
      });

      Object.keys(extrasPorCategoria).forEach((categoria) => {
        mensagem += `\n• ${categoria}:\n`;

        extrasPorCategoria[categoria].forEach((texto) => {
          mensagem += `  + ${texto}\n`;
        });
      });
    }

    if (!isGratis) {
      mensagem += `\nValor: ${(totalItem / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })}\n`;
    }

    mensagem += `\n`;
  });

  mensagem += `━━━━━━━━━━━━━━━\n`;

  if (subtotal > 0) {
    mensagem += `*Subtotal:* ${(subtotal / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })}\n`;
  }

  if (descontoCupom > 0) {
    mensagem += `*Desconto${codigoCupom ? ` (${codigoCupom})` : ""}:* -${(descontoCupom / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })}\n`;
  }

  if (tipoEntregaFinal === "retirada") {
    mensagem += `*Retirada no local*\n`;
  } else {
    mensagem += `*Entrega:* ${(taxaEntrega / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })}\n`;
  }

  mensagem += `*Total:* ${(total / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })}\n`;

  if (forma === "pix") {
    mensagem += `*Pagamento:* Pix confirmado\n`;
  } else if (forma === "cartao") {
    mensagem += `*Pagamento:* Cartão na entrega\n`;
  } else if (forma === "dinheiro") {
    mensagem += `*Pagamento:* Dinheiro na entrega\n`;
  } else if (forma === "cartao_online") {
    mensagem += `*Pagamento:* Cartão online (já pago)\n`;
  } else {
    mensagem += `*Pagamento:* ${forma}\n`;
  }

  if (tipoEntregaFinal === "retirada") {
    mensagem += `\n*Retirada:*\nNo local da loja\n`;
  } else {
    mensagem += `\n*Endereço:*\n${enderecoCliente}, Nº ${numeroCliente}`;
    if (bairroCliente) {
      mensagem += `\nBairro: ${bairroCliente}`;
    }
  }

  mensagem += `\n\n*Cliente:*\n${nomeCliente}\n${telefoneCliente}`;

  if (observacao && observacao.trim()) {
    mensagem += `\n\n━━━━━━━━━━━━━━━\n`;
    mensagem += `*Observações:*\n${observacao.trim()}`;
  }

  const url = `https://wa.me/5581973258842?text=${encodeURIComponent(mensagem)}`;

  return new Promise((resolve) => {
    setTimeout(() => {
      const novaAba = window.open(url, "_blank");

      if (!novaAba) {
        window.location.href = url;
      }

      resolve(true);
    }, 180);
  });
};

{/*  CALCULO FRETE GRATIS */}
const LIMITE_FRETE = 3000; // 30 reais
const subtotalAtual = subtotalProdutos || 0;
const faltaFrete = LIMITE_FRETE - subtotalAtual;


const itensValidos = (carrinho || []).filter(item =>
  item &&
  item.produto &&
  item.produto.id &&
  Number(item.quantidade) > 0
);

const subtotalCalc = itensValidos.reduce(
  (acc, item) => acc + Number(item.total || 0),
  0
);

const podeFinalizar = itensValidos.length > 0 && subtotalCalc > 0;


const podeFreteGratis =
  tipoEntrega === "entrega" &&
  !foraDaArea &&
  !precisaLocalizacao &&
  subtotalProdutos >= LIMITE_FRETE_GRATIS;


  // 🔥 PRODUTOS EM PROMOÇÃO
const produtosPromocao = produtos.filter(p =>
  p.promocao === true &&
  Number(p.precoPromocional || 0) > 0 &&
  Number(p.precoPromocional || 0) < Number(p.preco || 0)
);

// 🔥 MAIS VENDIDO (simples)
const produtosOrdenados = [...produtos].sort((a, b) => {
  const aScore = a.maisVendido ? 1 : 0;
  const bScore = b.maisVendido ? 1 : 0;
  return bScore - aScore;
});

// 🔥 REMOVE DUPLICADOS
const idsPromo = produtosPromocao.map(p => p.id);

const outrosProdutos = produtosOrdenados.filter(
  p => !idsPromo.includes(p.id)
);

// 🔥 JUNTA TUDO
const sugestoes = [
  ...produtosPromocao,
  ...outrosProdutos
].slice(0, 6);

return (






// CONTAINER ///
<div style={{
  minHeight: "100dvh",
  background: "#fff",
  color: themeAtual.text,
  boxSizing: "border-box",
  paddingBottom: isMobile ? "env(safe-area-inset-bottom)" : 0
}}>
  <div style={{
    width: "100%",
    maxWidth: larguraApp,
    margin: "0 auto",
    padding: isMobile ? 0 : "0 20px",
    boxSizing: "border-box",
    background: "#fff"

  }}>


{/* ========================= */}
    {/* 🔥 MODAL DE AVALIACAO */}
    {/* ========================= */}

   {avaliacaoAberta && (
  <div
    onClick={() => setAvaliacaoAberta(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      zIndex: 9999
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: 420,
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        maxHeight: "85vh"
      }}
    >
      {/* CONTEÚDO */}
      <div
        style={{
          padding: 16,
          overflowY: "auto",
          flex: 1
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
            Avaliar pedido
          </h3>

          <button
  onClick={() => setAvaliacaoAberta(null)}
  style={{
    border: "none",
    background: "transparent",
    fontSize: 22,
    color: "#111",
    cursor: "pointer",
    fontWeight: 600
  }}
>
  ×
</button>
        </div>

        {/* ESTRELAS */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
            Sua nota
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setNotaSelecionada(n)}
                style={{
                  fontSize: 28,
                  cursor: "pointer",
                  color: n <= notaSelecionada ? "#f59e0b" : "#ddd"
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* FEEDBACK */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
            O que achou?
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {feedbacks.map((f) => {
              const ativo = feedbackSelecionados.includes(f);

              return (
                <div
                  key={f}
                  onClick={() => {
                    if (ativo) {
                      setFeedbackSelecionados(
                        feedbackSelecionados.filter((x) => x !== f)
                      );
                    } else {
                      setFeedbackSelecionados([...feedbackSelecionados, f]);
                    }
                  }}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    cursor: "pointer",
                    border: ativo
                      ? "1px solid #ea1d2c"
                      : "1px solid #eee",
                    background: ativo ? "#fee2e2" : "#fff",
                    color: ativo ? "#ea1d2c" : "#555",
                    fontWeight: 600
                  }}
                >
                  {f}
                </div>
              );
            })}
          </div>
        </div>

        {/* COMENTÁRIO */}
        <textarea
          placeholder="Conte mais detalhes (opcional)"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          style={{
            width: "100%",
            marginTop: 14,
            padding: 12,
            borderRadius: 12,
            border: "1px solid #eee",
            fontSize: 14,
            resize: "none",
            minHeight: 80,
            outline: "none"
          }}
        />
      </div>

      {/* BOTÕES FIXOS */}
      <div
        style={{
          padding: 16,
          borderTop: "1px solid #f2f2f2",
          background: "#fff",
          display: "flex",
          gap: 10,
          flexShrink: 0
        }}
      >
        <div
  style={{
    display: "flex",
    gap: 10,
    marginTop: 14
  }}
>
  <div
  style={{
    marginTop: 16,
    display: "flex",
    gap: 10,
    alignItems: "center"
  }}
>
  {/* CANCELAR */}
  <button
    onClick={() => setAvaliacaoAberta(null)}
    style={{
      height: 40,
      padding: "0 14px",
      borderRadius: 10,
      border: "none",
      background: "transparent",
      color: "#666",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer"
    }}
  >
    Cancelar
  </button>

  {/* ENVIAR */}
  <button
    disabled={!notaSelecionada}
    onClick={async () => {
      try {
        await addDoc(collection(db, "avaliacoes"), {
          produtoId: avaliacaoAberta.produtoId,
          pedidoId: avaliacaoAberta.pedidoId,
          nota: notaSelecionada,
          comentario,
          feedbacks: feedbackSelecionados,
          status: "pendente",
          criadoEm: Date.now()
        });

        await updateDoc(
          doc(db, "pedidos", avaliacaoAberta.pedidoId),
          {
            avaliacoesFeitas: arrayUnion(
              avaliacaoAberta.produtoId
            )
          }
        );

        setAvaliacaoSucesso(true);

        navigator.vibrate?.(40);

        setTimeout(() => {
        setAvaliacaoSucesso(false);
        }, 1800);

        setAvaliacaoAberta(null);
        setNotaSelecionada(0);
        setComentario("");
        setFeedbackSelecionados([]);

      } catch (e) {
        console.log(e);
      }
    }}
    style={{
      marginLeft: "auto",
      height: 40,
      padding: "0 20px",
      borderRadius: 12,
      border: "none",
      background: notaSelecionada ? "#ea1d2c" : "#f1f1f1",
      color: notaSelecionada ? "#fff" : "#aaa",
      fontWeight: 800,
      fontSize: 13,
      cursor: notaSelecionada ? "pointer" : "not-allowed",
      boxShadow: notaSelecionada
        ? "0 6px 16px rgba(234,29,44,0.3)"
        : "none",
      transition: "all 0.2s ease"
    }}
  >
    Enviar
  </button>
</div>
</div>
</div>
 </div>
  {/* ANIMAÇÃO */}
    <style>
      {`
        @keyframes sheetUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}
    </style>
  </div>
)}


{!isMobile && (
  <div
    style={{
      width: "100%",
      maxWidth: 1200,
      margin: "12px auto 20px",
      padding: "10px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
    }}
  >
    {/* ESQUERDA */}
    <div style={{ display: "flex", gap: 18 }}>

      <div
        onClick={() => { setAba("home"); setStep(1); }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          color: aba === "home" ? "#ea1d2c" : "#555",
          fontWeight: 700
        }}
      >
        <Home size={18} />
        Início
      </div>

      <div
        onClick={() => { setAba("busca"); setStep(10); }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          color: aba === "busca" ? "#ea1d2c" : "#555",
          fontWeight: 700
        }}
      >
        <Search size={18} />
        Buscar
      </div>

      <div
        onClick={() => { setAba("pedidos"); setStep(5); }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          color: aba === "pedidos" ? "#ea1d2c" : "#555",
          fontWeight: 700
        }}
      >
        <FileText size={18} />
        Pedidos
      </div>

    </div>

    {/* DIREITA */}
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>

      {/* CARRINHO */}
      <div
        onClick={() => { setAba("carrinho"); setStep(3); }}
        style={{
          position: "relative",
          cursor: "pointer",
          color: aba === "carrinho" ? "#ea1d2c" : "#555"
        }}
      >
        <ShoppingCart size={20} />

        {carrinho.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: -6,
              right: -8,
              background: "#ea1d2c",
              color: "#fff",
              borderRadius: "50%",
              fontSize: 10,
              width: 16,
              height: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700
            }}
          >
            {carrinho.length}
          </div>
        )}
      </div>

      {/* PERFIL */}
      <div
        onClick={() => { setAba("perfil"); setStep(4); }}
        style={{
          cursor: "pointer",
          color: aba === "perfil" ? "#ea1d2c" : "#555"
        }}
      >
        <User size={20} />
      </div>

    </div>
  </div>
)}




 {/* ========================= */}
    {/* 🔥 MODAL DE PAGAMENTO */}
    {/* ========================= */}

    
{mostrarPagamento && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.58)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "12px",
      boxSizing: "border-box"
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: 22,
        width: "100%",
        maxWidth: 380,
        maxHeight: "88dvh",
        overflowY: "auto",
        overflowX: "hidden",
        boxShadow: "0 18px 60px rgba(0,0,0,0.20)",
        padding: 14,
        position: "relative",
        boxSizing: "border-box",
        WebkitOverflowScrolling: "touch"
      }}
    >
      {/* FECHAR */}
      <button
        onClick={() => {
          setMostrarPagamento(false);
          setFormaPagamento(null);
          setQrBase64(null);
          setQrCode(null);
          setPaymentId(null);
          setPedidoPixAberto(null);
          setMensagemPagamento("");
          setMostrarCodigoPix(false);
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "none",
          background: "#f5f5f5",
          color: "#666",
          fontSize: 22,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <X size={18} />
      </button>

      <h2
        style={{
          margin: "2px 0 12px",
          fontSize: 20,
          color: "#111",
          textAlign: "left",
          fontWeight: 800
        }}
      >
        Forma de pagamento
      </h2>
    
      {/* MENSAGEM */}
      {mensagemPagamento && (
        <div
          style={{
            marginBottom: 12,
            padding: "11px 12px",
            borderRadius: 14,
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.35,
            background:
              tipoMensagemPagamento === "erro"
                ? "#fff1f2"
                : tipoMensagemPagamento === "sucesso"
                ? "#ecfdf3"
                : "#f8fafc",
            color:
              tipoMensagemPagamento === "erro"
                ? "#be123c"
                : tipoMensagemPagamento === "sucesso"
                ? "#15803d"
                : "#334155",
            border:
              tipoMensagemPagamento === "erro"
                ? "1px solid #fecdd3"
                : tipoMensagemPagamento === "sucesso"
                ? "1px solid #bbf7d0"
                : "1px solid #e2e8f0",
            boxSizing: "border-box"
          }}
        >
          {mensagemPagamento}
        </div>
      )}

      {/* RESUMO */}
      <div
        style={{
          background: "#fafafa",
          border: "1px solid #efefef",
          borderRadius: 16,
          padding: 12,
          marginBottom: 12,
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 15,
            color: "#444"
          }}
        >
          <span>Pedido</span>
          <strong style={{ color: "#111", fontWeight: 600 }}>
            {pedidoPixAberto
              ? formatarReal(pedidoPixAberto.total)
              : formatarReal(total)}
          </strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 15,
            color: "#444",
            marginTop: 8
          }}
        >
          <span>Entrega</span>
          <strong style={{ color: "#111", fontWeight: 600 }}>
            {formatarReal((totalFinalComFrete || 0) - (total || 0)) === "R$ 0,00"
              ? "Grátis"
              : formatarReal((totalFinalComFrete || 0) - (total || 0))}
          </strong>
        </div>

        <div style={{ height: 1, background: "#ececec", margin: "10px 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <strong style={{ fontSize: 16, color: "#111" }}>Total</strong>
          <strong style={{ fontSize: 16, color: "#ea1d2c" }}>
            {pedidoPixAberto
              ? formatarReal(pedidoPixAberto.total)
              : formatarReal(totalFinalComFrete)}
          </strong>
        </div>
      </div>

      

      {/* ÁREA PIX */}
      {formaPagamento === "pix" && (
        <div
          style={{
            marginTop: 14,
            textAlign: "center",
            width: "100%",
            overflow: "hidden",
            boxSizing: "border-box"
          }}
        >
          {!qrBase64 && (
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                color: "#666"
              }}
            >
              {pedidoPixAberto
                ? "Abrindo pagamento do pedido..."
                : "Gerando QR Code..."}
            </div>
          )}

          {qrBase64 && (
            <div
              style={{
                background: "#fafafa",
                border: "1px solid #efefef",
                borderRadius: 16,
                padding: "14px 12px",
                marginTop: 12,
                boxSizing: "border-box"
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  background: "#fff",
                  padding: 8,
                  borderRadius: 14,
                  border: "1px solid #ececec"
                }}
              >
                <img
                  src={`data:image/png;base64,${qrBase64}`}
                  style={{
                    width: 156,
                    height: 156,
                    objectFit: "contain",
                    display: "block"
                  }}
                />
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(qrCode);
                  mostrarMensagemPagamento("Código Pix copiado com sucesso.", "sucesso");
                }}
                style={{
                  marginTop: 12,
                  width: "100%",
                  maxWidth: "100%",
                  height: 46,
                  borderRadius: 12,
                  border: "none",
                  background: "#ea1d2c",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  boxSizing: "border-box"
                }}
              >
                Copiar código Pix
              </button>

              <button
                onClick={() => setMostrarCodigoPix(v => !v)}
                style={{
                  marginTop: 10,
                  background: "transparent",
                  border: "none",
                  color: "#666",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {mostrarCodigoPix ? "Ocultar código" : "Ver código Pix"}
              </button>

              {mostrarCodigoPix && (
                <textarea
                  value={qrCode}
                  readOnly
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 12,
                    fontSize: 11,
                    lineHeight: 1.35,
                    border: "1px solid #ddd",
                    minHeight: 68,
                    resize: "none",
                    boxSizing: "border-box",
                    overflowX: "hidden",
                    outline: "none"
                  }}
                />
              )}

              <p
                style={{
                  marginTop: 12,
                  marginBottom: 0,
                  fontSize: 13,
                  color: "#666",
                  lineHeight: 1.35
                }}
              >
                Após o pagamento, seu pedido será confirmado automaticamente.
              </p>
            </div>
          )}
        </div>
      )}

      {/* AÇÕES */}
      <div style={{ marginTop: 16 }}>
        <button
          style={{
            width: "100%",
            height: 48,
            borderRadius: 14,
            border: "none",
            background:
              formaPagamento === "pix"
                ? "linear-gradient(90deg,#00a63e,#11c95f)"
                : "#ea1d2c",
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            cursor: loadingPedido ? "not-allowed" : "pointer",
            opacity: loadingPedido ? 0.7 : 1,
            boxSizing: "border-box"
          }}
          disabled={loadingPedido}
          onClick={async () => {
  if (!tipoEntrega) {
    mostrarMensagemPagamento("Escolha entrega ou retirada.", "erro");
    return;
  }

  if (!formaPagamento) {
    mostrarMensagemPagamento("Escolha uma forma de pagamento para continuar.", "erro");
    return;
  }

  // 🔥 PIX continua igual
  if (formaPagamento === "pix") {
    if (!paymentId) {
      mostrarMensagemPagamento("Erro no Pix. Gere novamente para continuar.", "erro");
      return;
    }

    if (!qrBase64) {
      mostrarMensagemPagamento("Aguarde o QR Code terminar de carregar.", "info");
      return;
    }

    mostrarMensagemPagamento("Pagamento Pix aguardando confirmação automática.", "info");
    return;
  }

  try {
    setLoadingPedido(true);

    const pedidoFinal = await finalizarPedido();

    // 🔥 AQUI RESOLVE TUDO
    await enviarWhatsApp({
      ...pedidoFinal,
      tipoEntrega,
      formaPagamento
    });

  } catch (e) {
    console.log("ERRO FINALIZAR:", e);
  } finally {
    setLoadingPedido(false);
  }
}}
        >
          {loadingPedido
            ? "Processando..."
            : formaPagamento === "pix"
            ? "Aguardando pagamento"
            : "Confirmar pedido"}
        </button>

        <button
          onClick={() => {
            setMostrarPagamento(false);
            setFormaPagamento(null);
            setQrBase64(null);
            setQrCode(null);
            setPaymentId(null);
            setPedidoPixAberto(null);
            setMensagemPagamento("");
            setMostrarCodigoPix(false);
          }}
          style={{
            marginTop: 10,
            background: "transparent",
            border: "none",
            color: "#777",
            cursor: "pointer",
            width: "100%",
            fontSize: 15,
            fontWeight: 500,
            padding: 6
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

{/* 🔥 MODAL WHATSAPP (COLOCA AQUI) */}
{pedidoPago && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.62)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 16,
      boxSizing: "border-box"
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        background: "#fff",
        borderRadius: 24,
        padding: 22,
        boxSizing: "border-box",
        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* TOPO DECORATIVO */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "linear-gradient(90deg,#00b34a,#1ed760)"
        }}
      />

      {/* ÍCONE PREMIUM */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "linear-gradient(180deg,#e9fff1,#f6fff9)",
          border: "1px solid #d8f7e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "8px auto 14px",
          boxShadow: "0 10px 26px rgba(0,179,74,0.12)"
        }}
      >
        <CheckCircle size={42} color="#16c95b" strokeWidth={2.5} />
      </div>

      {/* TÍTULO */}
      <h2
        style={{
          margin: 0,
          fontSize: 22,
          lineHeight: 1.15,
          color: "#111",
          fontWeight: 800
        }}
      >
        Pagamento confirmado
      </h2>

      {/* SUBTÍTULO */}
      <p
        style={{
          marginTop: 8,
          marginBottom: 0,
          fontSize: 14,
          lineHeight: 1.45,
          color: "#666"
        }}
      >
        Seu pedido foi aprovado. Agora envie para o WhatsApp da loja para finalizar o atendimento.
      </p>

      {/* RESUMO */}
      <div
        style={{
          marginTop: 18,
          background: "#fafafa",
          border: "1px solid #efefef",
          borderRadius: 16,
          padding: 14,
          textAlign: "left"
        }}
      >
        {/* PEDIDO */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            color: "#444"
          }}
        >
          <span>Pedido</span>
          <strong style={{ color: "#111" }}>
            #{pedidoPago?.codigo || "—"}
          </strong>
        </div>

        {/* SUBTOTAL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            color: "#444",
            marginTop: 8
          }}
        >
          <span>Subtotal</span>
          <strong style={{ color: "#111" }}>
            {formatarReal(Number(pedidoPago?.subtotal || 0))}
          </strong>
        </div>

        {/* ENTREGA */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            color: "#444",
            marginTop: 8
          }}
        >
          <span>Entrega</span>
          <strong
            style={{
              color: Number(pedidoPago?.taxaEntrega || 0) === 0 ? "#16a34a" : "#111"
            }}
          >
            {Number(pedidoPago?.taxaEntrega || 0) === 0
              ? "Grátis"
              : formatarReal(Number(pedidoPago?.taxaEntrega || 0))}
          </strong>
        </div>

        {/* AVISO FRETE GRÁTIS */}
        {Number(pedidoPago?.subtotal || 0) < 3000 &&
          Number(pedidoPago?.taxaEntrega || 0) > 0 && (
            <div
              style={{
                marginTop: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                fontSize: 12,
                lineHeight: 1.4,
                color: "#9a3412",
                fontWeight: 600
              }}
            >
              Faltaram{" "}
              {formatarReal(3000 - Number(pedidoPago?.subtotal || 0))}{" "}
              para frete grátis.
            </div>
          )}

        {Number(pedidoPago?.subtotal || 0) >= 3000 && (
          <div
            style={{
              marginTop: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background: "#ecfdf3",
              border: "1px solid #bbf7d0",
              fontSize: 12,
              lineHeight: 1.4,
              color: "#15803d",
              fontWeight: 700
            }}
          >
            Pedido com frete grátis liberado.
          </div>
        )}

        {/* LINHA */}
        <div
          style={{
            height: 1,
            background: "#e5e5e5",
            margin: "12px 0"
          }}
        />

        {/* TOTAL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            fontWeight: 800,
            color: "#111"
          }}
        >
          <span>Total</span>
          <strong style={{ color: "#16a34a" }}>
            {formatarReal(Number(pedidoPago?.total || 0))}
          </strong>
        </div>

        {/* PAGAMENTO */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            color: "#444",
            marginTop: 10
          }}
        >
          <span>Pagamento</span>
          <strong style={{ color: "#111" }}>
            {pedidoPago?.formaPagamento === "pix"
              ? "Pix"
              : pedidoPago?.formaPagamento === "cartao"
              ? "Cartão na entrega"
              : pedidoPago?.formaPagamento === "dinheiro"
              ? "Dinheiro na entrega"
              : pedidoPago?.formaPagamento === "cartao_online"
              ? "Cartão online"
              : "Confirmado"}
          </strong>
        </div>
      </div>

      {/* BOTÃO PRINCIPAL */}
      <button
        disabled={enviandoWhatsapp}
        onClick={async () => {
          if (enviandoWhatsapp) return;

          const pedido = pedidoPago;
          if (!pedido) return;

          try {
            setEnviandoWhatsapp(true);

            await enviarWhatsApp(pedido);

            setTimeout(() => {
              setCarrinho([]);
              setFormaPagamento(null);
              setQrBase64(null);
              setQrCode(null);
              setPaymentId(null);
              setMostrarPagamento(false);
              setPedidoAtual(null);
              setPedidoPago(null);
              setEnviandoWhatsapp(false);
            }, 350);
          } catch (e) {
            console.log("ERRO AO ENVIAR WHATSAPP:", e);
            setEnviandoWhatsapp(false);
          }
        }}
        style={{
          marginTop: 18,
          width: "90%",
          height: 52,
          borderRadius: 16,
          border: "none",
          background: enviandoWhatsapp
            ? "#9adfb4"
            : "linear-gradient(90deg,#12b450,#1ed760)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 15,
          cursor: enviandoWhatsapp ? "not-allowed" : "pointer",
          boxShadow: enviandoWhatsapp
            ? "none"
            : "0 12px 28px rgba(18,180,80,0.26)",
          transition: "all 0.2s ease"
        }}
      >
        {enviandoWhatsapp ? "Abrindo WhatsApp..." : "Enviar pedido no WhatsApp"}
      </button>

      {/* BOTÃO SECUNDÁRIO */}
      <button
        disabled={enviandoWhatsapp}
        onClick={() => {
          if (enviandoWhatsapp) return;
          setPedidoPago(null);
        }}
        style={{
          marginTop: 10,
          width: "90%",
          height: 46,
          borderRadius: 14,
          border: "1px solid #e5e5e5",
          background: "#fff",
          color: "#555",
          fontWeight: 700,
          fontSize: 14,
          cursor: enviandoWhatsapp ? "not-allowed" : "pointer"
        }}
      >
        Fechar
      </button>
    </div>
  </div>
)}







{/* STEP 1 */}
{aba === "home" && step === 1 && (
  <>
    <div
      className="fade-slide"
      style={{
        maxWidth: larguraApp,
        margin: "0 auto",
        background: "#f5f5f5",
        minHeight: "100vh",
        boxSizing: "border-box",
        paddingBottom: carrinho.length > 0
        ? (isMobile ? 180 : 150)
        : 110
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "calc(env(safe-area-inset-top) + 14px) 16px 18px",
          background: "#f5f5f5"
        }}
      >
        {/* TOPO */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12
          }}
        >
          {/* ESQUERDA */}
          <div
            style={{
              flex: 1,
              minWidth: 0
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#7a7a7a",
                fontWeight: 500,
                marginBottom: 6
              }}
            >
              Olá, {clienteNome ? clienteNome.split(" ")[0] : "cliente"}
            </div>

            <div
              onClick={() => {
                setAba("carrinho");
                setStep(3);
                setAbaPerfil("endereco");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                cursor: "pointer",
                maxWidth: "100%"
              }}
            >
              <MapPin size={16} color="#8b8b8b" />

              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 220
                }}
              >
                {clienteEndereco
                  ? `${clienteEndereco.split(",")[0]}${clienteNumeroCasa ? ", " + clienteNumeroCasa : ""}`
                  : "Adicionar endereço"}
              </span>

              <ChevronDown size={16} color="#666" />
            </div>
          </div>

          

          {/* DIREITA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0
            }}
          >
            {podeInstalar && (
              <button
                onClick={instalarApp}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  border: "none",
                  background: "#efe5fb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                }}
              >
                <Gem size={22} color="#a24be0" />
              </button>
            )}

            <div
  onClick={() => {
    setAba("notificacao");
    setStep(7);
  }}
  style={{
    position: "relative",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  }}
>
  {/* 🔔 ÍCONE */}
  <Bell
    size={22}
    strokeWidth={2.2}
    color={temNotificacaoAtiva ? "#ea1d2c" : "#333"}
  />

  {/* 🔥 BADGE */}
  {temNotificacaoAtiva && (
  <div
    style={{
      position: "absolute",
      top: -2,
      right: -2,
      minWidth: 16,
      height: 16,
      borderRadius: 999,
      background: "#ea1d2c",
      color: "#fff",
      fontSize: 9,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 4px"
    }}
  >
    {notificacoes.filter(n => !n?.lida).length}
  </div>
)}
</div>
              
          </div>
        </div>

        
       {/* LOJA ABERTA/FECHADA */}
<div
  style={{
    margin: "12px 16px 0",
    padding: "12px 14px",
    borderRadius: 16,
    background: abertoFinal ? "#e6f4ea" : "#fde8e8",
    display: "flex",
    alignItems: "center",
    gap: 12
  }}
>
  {/* ÍCONE */}
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: abertoFinal ? "#dcfce7" : "#fecaca",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <Store size={18} color={abertoFinal ? "#16a34a" : "#dc2626"} />
  </div>

  {/* TEXTOS */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    
    {/* STATUS */}
    <div
      style={{
        fontSize: 15,
        fontWeight: 800,
        color: abertoFinal ? "#166534" : "#b91c1c"
      }}
    >
      {abertoFinal ? "Aberto agora" : "Fechado agora"}
    </div>

    {/* ABERTURA */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 14,
        fontWeight: 600,
        color: "#111"
      }}
    >
      <Clock size={14} color="#666" />
   {abertoFinal ? (
  horarioHoje ? (
    <>Até {horarioHoje.fecha}</>
  ) : (
    <>Aberto até 23:00</>
  )
) : (
  <>Abre {proximo?.dia} às {proximo?.hora}</>
)}
    </div>

    {/* HORÁRIOS */}
    <div
      style={{
        fontSize: 12,
        color: "#666",
        marginTop: 2
      }}
    >
      Sex: 18:30 às 23:00 • Sáb/Dom: 16:00 às 23:00
    </div>
  </div>
</div>

        

        {/* BANNER RESPONSIVO PROFISSIONAL */}
{Array.isArray(banners) && banners.length > 0 && (
  <div
    style={{
      marginTop: 16,
      borderRadius: 20,
      overflow: "hidden",
      position: "relative",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      width: "100%",
      height: isMobile ? 160 : 460,
      background: "#111"
    }}
  >
    <div
      ref={bannerRef}
      onScroll={handleBannerScroll}
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
        scrollbarWidth: "none"
      }}
    >
      {banners.map((b) => (
        <div
          key={b.id}
          onClick={() => {
            setCategoriaSelecionada(b.categoria || "promocoes");
            setAba("busca");
            setStep(10);
          }}
          style={{
            minWidth: "100%",
            height: "100%",
            flex: "0 0 100%",
            scrollSnapAlign: "start",
            position: "relative",
            cursor: "pointer"
          }}
        >
          {/* IMAGEM ÚNICA (RESPONSIVA) */}
          <img
            src={b.imagem}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "left center", // 🔥 NÃO CORTA TEXTO
              display: "block"
            }}
          />

          {/* OVERLAY LEVE (DEIXA PREMIUM SEM ATRAPALHAR) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 60%)"
            }}
          />
        </div>
      ))}
    </div>

    {/* INDICADORES */}
    {banners.length > 1 && (
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 6,
          zIndex: 2
        }}
      >
        {banners.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === bannerIndex ? 20 : 6,
              height: 6,
              borderRadius: 999,
              background:
                i === bannerIndex
                  ? "#fff"
                  : "rgba(255,255,255,0.5)",
              transition: "all .25s ease"
            }}
          />
        ))}
      </div>
    )}
  </div>
)}
                 
      </div>

      {/* CONTEÚDO BRANCO */}
      <div
        style={{
          background: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: "24px 12px 0",
          boxSizing: "border-box",
          minHeight: 300,
          marginTop: 8
        }}
      >
        {/* TÍTULO */}
<div
  style={{
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "0 6px"
  }}
>
  <strong
    style={{
      fontSize: 20,
      fontWeight: 900,
      color: "#111",
      letterSpacing: "-0.02em"
    }}
  >
    Personalize seu açaí
  </strong>
</div>

{/* SUBTÍTULO */}
<div
  style={{
    padding: "0 6px",
    fontSize: 13,
    color: "#666",
    lineHeight: 1.4,
    marginBottom: 8
  }}
>
  Feito pra quem entende de açaí.
</div>

{/* FRASE PREMIUM COM ÍCONE */}
<div
  style={{
    marginTop: 4,
    marginBottom: 16,
    padding: "6px 10px",
    marginLeft: 6,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#fcf1ff",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    color: "#7507dd"
  }}
>
  <Sparkles size={14} strokeWidth={2.5} />
  Escolha, personalize e aproveite
</div>

        {/* LISTA DE PRODUTOS HORIZONTAL */}
<ListaProdutos
  categorias={categorias}
  produtos={produtos}
  carrinho={carrinho}
  setCarrinho={setCarrinho}
  modoCompra={modoCompra}
  setBloqueioMsg={setBloqueioMsg}
  validarLojaAberta={validarLojaAberta}
  categoriaTemExtras={categoriaTemExtras}
  categoriaVaiDiretoCarrinho={categoriaVaiDiretoCarrinho}
  precoFinalProduto={precoFinalProduto}
  produtoEmPromocao={produtoEmPromocao}
  formatarReal={formatarReal}
  setProduto={setProduto}
  setAba={setAba}
  setStep={setStep}
  normalizar={normalizar}
  ORDEM_CATEGORIAS={ORDEM_CATEGORIAS}
/>
 

{/* BARRA FLUTUANTE DO CARRINHO */}
{carrinho.length > 0 && (
  <div
    style={{
      position: "fixed",
      bottom: `calc(${NAVBAR}px)`,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      zIndex: 30
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: isMobile ? larguraApp : 720,
        background: "#fff",
        borderTop: "1px solid #eee",
        borderRadius: isMobile ? 0 : 16,
        boxShadow: isMobile ? "none" : "0 8px 30px rgba(0,0,0,0.08)",
        padding: isMobile ? "10px 12px" : "12px 18px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14
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
            src={logo || "/bg.png"}
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0
            }}
          />

          <div style={{ minWidth: 0 }}>
            {/* STATUS FRETE */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: foraDaArea
                  ? "#dc2626"
                  : podeFreteGratis
                  ? "#16a34a"
                  : "#666",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {foraDaArea
                ? "Fora da área de entrega"
                : precisaLocalizacao
                ? "Informe seu endereço"
                : podeFreteGratis
                ? "Entrega grátis aplicada"
                : faltaFreteGratis > 0
                ? `Faltam ${formatarReal(faltaFreteGratis)} para entrega grátis`
                : ""}
            </div>

            {/* VALOR */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#111",
                marginTop: 2
              }}
            >
              {formatarReal(
                typeof subtotalProdutos !== "undefined"
                  ? subtotalProdutos
                  : carrinho.reduce(
                      (acc, item) => acc + Number(item.total || 0),
                      0
                    )
              )}{" "}
              <span style={{ fontWeight: 500, color: "#666" }}>
                /{" "}
                {carrinho.reduce(
                  (acc, item) => acc + Number(item.quantidade || 0),
                  0
                )}{" "}
                item
              </span>
            </div>
          </div>
        </div>

        {/* BOTÃO */}
        <button
          onClick={() => {
            setAba("carrinho");
            setStep(3);
          }}
          style={{
            height: 48,
            padding: "0 20px",
            borderRadius: 16,
            border: "none",
            background: "#ea1d2c",
            color: "#fff",
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(234,29,44,0.25)"
          }}
        >
          Ver sacola
        </button>
      </div>
    </div>
  </div>
)}

        {/* INFO BAR */}
        <div
          style={{
            marginTop: 18,
            background: "#fff",
            padding: isMobile ? "18px 12px" : "18px 24px",
            borderRadius: 26,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 8px 18px rgba(0,0,0,0.04)",
            border: "1px solid #f2f2f2"
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center"
            }}
          >
            <Clock size={20} color="#7c3aed" />
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                marginTop: 6,
                color: "#111"
              }}
            >
              25-35 min
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#888"
              }}
            >
              Tempo de entrega
            </div>
          </div>

          <div
            style={{
              width: 1,
              height: 42,
              background: "#ececec"
            }}
          />

          <div
            style={{
              flex: 1,
              textAlign: "center"
            }}
          >
            <Bike size={20} color="#7c3aed" />
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                marginTop: 6,
                color: "#111"
              }}
            >
              Entrega grátis
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#888"
              }}
            >
              Acima de R$30
            </div>
          </div>

          <div
            style={{
              width: 1,
              height: 42,
              background: "#ececec"
            }}
          />

          <div
            style={{
              flex: 1,
              textAlign: "center"
            }}
          >
            <ShieldCheck size={20} color="#7c3aed" />
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                marginTop: 6,
                color: "#111"
              }}
            >
              Compra segura
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#888"
              }}
            >
              Seus dados protegidos
            </div>
          </div>
        </div>
      </div>

      <div
  style={{
    marginTop: 36,
    paddingTop: 14,
    borderTop: "1px solid rgba(0,0,0,0.05)",
    textAlign: "center"
  }}
>
  <div
    style={{
      fontSize: 11,
      color: "#9ca3af",
      fontWeight: 500,
      letterSpacing: 0.3
    }}
  >
    Desenvolvido por{" "}
    <span style={{ color: "#6b7280", fontWeight: 600 }}>
      Joás
    </span>
  </div>

  <div
    style={{
      marginTop: 4,
      fontSize: 10,
      color: "#c4c4c4",
      letterSpacing: 0.5
    }}
  >
    v1.0.0
  </div>
</div>

      {/* BARRA FLUTUANTE DO CARRINHO */}
      {carrinho.length > 0 && (
  <div
    style={{
      position: "fixed",
      bottom: `calc(${NAVBAR}px)`,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center", // 🔥 CENTRALIZA NA WEB
      zIndex: 30
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: isMobile ? larguraApp : 720, // 🔥 AQUI MUDA TUDO
        background: "#fff",
        borderTop: "1px solid #eee",
        borderRadius: isMobile ? 0 : 16, // 🔥 borda só na web
        boxShadow: isMobile
          ? "none"
          : "0 8px 30px rgba(0,0,0,0.08)", // 🔥 sombra desktop
        padding: isMobile ? "10px 12px" : "12px 18px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14
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
            src={logo || "/bg.png"}
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0
            }}
          />

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                color: faltaFreteGratis > 0 ? "#666" : "#16a34a",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {faltaFreteGratis > 0
                ? `Faltam ${formatarReal(faltaFreteGratis)} para entrega grátis`
                : "Entrega grátis aplicada"}
            </div>

            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#111",
                marginTop: 2
              }}
            >
              {formatarReal(
                typeof subtotalProdutos !== "undefined"
                  ? subtotalProdutos
                  : carrinho.reduce((acc, item) => acc + Number(item.total || 0), 0)
              )}{" "}
              <span style={{ fontWeight: 500, color: "#666" }}>
                / {carrinho.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)} item
              </span>
            </div>
          </div>
        </div>

        {/* BOTÃO */}
        <button
          onClick={() => {
            setAba("carrinho");
            setStep(3);
          }}
          style={{
            height: 46,
            padding: "0 22px",
            borderRadius: 14,
            border: "none",
            background: "#ea1d2c",
            color: "#fff",
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
            flexShrink: 0
          }}
        >
          Ver sacola
        </button>

        </div>
      </div>
    </div>

)}
    </div>

    <style>
      {`
        .fade-slide {
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    </style>
  </>
)}


{aba === "home" && step === 2 && produto && categoriaTemExtras(produto.categoria) && (
  <div
    style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      minHeight: "100vh",
      background: "#f2f2f2",
      position: "relative",
      overflowX: "hidden",
      paddingBottom: `calc(${NAVBAR}px + 80px)`
    }}
  >
    {/* HERO */}
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 255,
        overflow: "hidden",
        background: "#111"
      }}
    >
      <img
        src={produto?.imagem || "/acai.png"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.45) 100%)"
        }}
      />

      {/* VOLTAR */}
     <button
  onClick={() => {
    setAba("home");
    setStep(1);
    setEditandoIndex(null);
    setExtrasSelecionados({});
    setQuantidade(1);
  }}
  style={{
    position: "absolute",
    top: "calc(env(safe-area-inset-top) + 16px)",
    left: 16,
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    transition: "all 0.2s ease",
    padding: 0
  }}
  onTouchStart={(e) => {
    e.currentTarget.style.transform = "scale(0.92)";
  }}
  onTouchEnd={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  <ArrowLeft size={22} strokeWidth={2.5} />
</button>
    </div>

    {/* SHEET PRINCIPAL */}
    <div
      style={{
        marginTop: -22,
        background: "#fff",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        minHeight: "calc(100vh - 180px)",
        position: "relative",
        zIndex: 2,
        boxShadow: "0 -8px 24px rgba(0,0,0,0.05)"
      }}
    >
      {/* CARD PRODUTO */}
      <div
        style={{
          padding: "20px 20px 10px"
        }}
      >
        

        <div
          style={{
            fontSize: 23,
            fontWeight: 800,
            color: "#111",
            lineHeight: 1.15
          }}
        >
          {produto?.nome}
        </div>

        {!!produto?.descricao && (
          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              color: "#666",
              lineHeight: 1.38
            }}
          >
            {produto.descricao}
          </div>
        )}

        <div
          style={{
            marginTop: 18,
            fontSize: 20,
            fontWeight: 800,
            color: "#111"
          }}
        >
          {formatarReal(Number(produto?.preco || 0))}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div
        style={{
          paddingBottom: 150
        }}
      >
        {extrasDoProduto.map((grupo) => {
          const selecionados = extrasSelecionados?.[grupo.categoria] || [];

          const totalSelecionado = selecionados.reduce(
            (acc, e) => acc + Number(e.qtd || 0),
            0
          );

          const opcaoUnica = Number(grupo.max || 0) === 1;

          return (
            <div key={grupo.categoria} style={{ marginTop: 10 }}>
             {/* HEADER DO GRUPO */}
<div
  style={{
    background: "#f7f7f7",
    padding: "12px 14px",
    borderTop: "1px solid #ececec",
    borderBottom: "1px solid #ececec",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  }}
>
  <div>
    <div
      style={{
        fontSize: 14,
        fontWeight: 700,
        color: "#555"
      }}
    >
      {grupo.categoria}
    </div>

    <div
      style={{
        marginTop: 4,
        fontSize: 12,
        color: "#888"
      }}
    >
      {opcaoUnica
        ? "Escolha 1 opção"
        : `Até ${grupo.max} opções`}
    </div>
  </div>

  {Number(grupo.min || 0) > 0 && (
    <div
      style={{
        background: "#111",
        color: "#fff",
        fontSize: 10,
        fontWeight: 800,
        padding: "6px 10px",
        borderRadius: 8
      }}
    >
      Obrigatório
    </div>
  )}
</div>

              {/* ITENS */}
              <div style={{ background: "#fff" }}>
                {grupo.itens.map((item, index) => {
                  const itemSelecionado = selecionados.find(
                    (e) => e.nome === item.nome
                  );
                  const qtd = Number(itemSelecionado?.qtd || 0);
                  const ativo = qtd > 0;
                  const podeAdicionar = qtd > 0 || totalSelecionado < grupo.max;

                  return (
                    <div
                      key={item.nome}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "12px 14px",
                        borderBottom:
                          index !== grupo.itens.length - 1
                            ? "1px solid #efefef"
                            : "none"
                      }}
                    >
                      {/* TEXTO */}
                      <div
                        style={{
                          flex: 1,
                          minWidth: 0
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#111",
                            lineHeight: 1.25
                          }}
                        >
                          {item.nome}
                        </div>

                        {!!item.descricao && (
                          <div
                            style={{
                              marginTop: 4,
                              fontSize: 12,
                              color: "#888",
                              lineHeight: 1.35
                            }}
                          >
                            {item.descricao}
                          </div>
                        )}

                        {Number(item.preco || 0) > 0 && (
                          <div
                            style={{
                              marginTop: 5,
                              fontSize: 12,
                              color: "#777"
                            }}
                          >
                            + {formatarReal(item.preco)}
                          </div>
                        )}
                      </div>

                      {/* IMAGEM */}
                      {item.imagem && (
                        <img
                          src={item.imagem}
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 10,
                            objectFit: "cover",
                            flexShrink: 0
                          }}
                        />
                      )}

                      {/* AÇÃO */}
                      {opcaoUnica ? (
<button
  onClick={() => {
    setExtrasSelecionados((prev) => ({
      ...prev,
      [grupo.categoria]: [{ ...item, qtd: 1 }]
    }));
  }}
  style={{
    width: 1,
    height: 1,
    borderRadius: 6,
    border: ativo ? "1px solid #ea1d2c" : "1px solid #ddd",
    background: ativo ? "#ea1d2c" : "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer"
  }}
>
  {ativo && (
    <span style={{ color: "#fff", fontSize: 14 }}>
      ✓
    </span>
  )}
</button>
                      ) : qtd > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            flexShrink: 0
                          }}
                        >
                          <button
                            onClick={() =>
                              alterarExtra(
                              grupo.categoria,
                              item,
                               -1,
                              grupo.max,
                              grupo.permitirRepetir !== false
                              )
                            }
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              border: "1px solid #e0e0e0",
                              background: "#fff",
                              color: "#b6b6b6",
                              fontSize: 18,
                              lineHeight: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              padding: 0
                            }}
                          >
                            −
                          </button>

                          <strong
                            style={{
                              minWidth: 14,
                              textAlign: "center",
                              fontSize: 17,
                              color: "#111"
                            }}
                          >
                            {qtd}
                          </strong>

                          <button
                            onClick={() => {
                              if (!podeAdicionar) return;
                               alterarExtra(
                            grupo.categoria,
                            item,
                             1,
                            grupo.max,
                            grupo.permitirRepetir !== false
                            );
                            }}
                            disabled={!podeAdicionar}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              border: "none",
                              background: "#fff",
                              color: "#ea1d2c",
                              fontSize: 18,
                              lineHeight: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: podeAdicionar ? "pointer" : "not-allowed",
                              padding: 0
                            }}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            if (!podeAdicionar) return;
                            alterarExtra(
                            grupo.categoria,
                            item,
                             1,
                            grupo.max,
                            grupo.permitirRepetir !== false
                            );
                          }}
                          disabled={!podeAdicionar}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            border: "none",
                            background: "#fff",
                            color: "#ea1d2c",
                            fontSize: 18,
                            lineHeight: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: podeAdicionar ? "pointer" : "not-allowed",
                            padding: 0,
                            flexShrink: 0
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* BARRA FIXA */}
    <div
  style={{
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: `calc(${NAVBAR}px)`,
    width: "100%",
    maxWidth: isMobile ? larguraApp : 700,
    background: "#fff",
    borderTop: "1px solid #eee",
    padding: isMobile ? "10px 12px" : "12px 18px",
    display: "flex",
    justifyContent: "center",
    zIndex: 50,
    boxSizing: "border-box"
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: isMobile ? "100%" : 920,
      display: "flex",
      gap: 12,
      alignItems: "center"
    }}
  >
    {/* QTD */}
    <div
      style={{
        width: isMobile ? 110 : 118,
        height: isMobile ? 48 : 54,
        borderRadius: 14,
        background: "#fff",
        border: "1px solid #e8e8e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        boxSizing: "border-box",
        flexShrink: 0
      }}
    >
      <button
        onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
        style={{
          border: "none",
          background: "transparent",
          color: "#d2d2d2",
          fontSize: 22,
          cursor: "pointer",
          padding: 0
        }}
      >
        −
      </button>

      <strong
        style={{
          fontSize: 16,
          color: "#111"
        }}
      >
        {quantidade}
      </strong>

      <button
        onClick={() => setQuantidade((q) => q + 1)}
        style={{
          border: "none",
          background: "transparent",
          color: "#ea1d2c",
          fontSize: 22,
          cursor: "pointer",
          padding: 0
        }}
      >
        +
      </button>
    </div>

    {/* BOTÃO */}
<button
  onClick={() => {
    // 🔥 PROTEÇÃO LOGIN
    if (!user?.uid) {
      setAba("perfil");
      setStep(4);

      setToast({
        tipo: "erro",
        texto: "Faça login para continuar"
      });

      return;
    }

    adicionarCarrinho();
  }}
  disabled={!podeContinuar}
  style={{
    flex: 1,
    height: isMobile ? 48 : 50,
    borderRadius: 12,
    background: podeContinuar ? "#ea1d2c" : "#e8e8e8",
    color: podeContinuar ? "#fff" : "#a8a8a8",
    border: "none",
    fontWeight: 800,
    fontSize: 14,
    cursor: podeContinuar ? "pointer" : "not-allowed",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isMobile ? "0 14px" : "0 16px",
    boxSizing: "border-box",
    maxWidth: isMobile ? "100%" : 790,
    transition: "all .2s ease"
  }}
>
  <span>Adicionar</span>

  <span style={{ fontWeight: 900 }}>
    {formatarReal((Number(produto?.preco || 0) + totalExtras) * quantidade)}
  </span>
</button>
  </div>
  </div>
</div>
)}

{aba === "carrinho" && step === 3 && (
  <div
    className="fade-slide"
    style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      minHeight: "100vh",
      background: "#ffffff",
      paddingBottom: 240,
      boxSizing: "border-box"
    }}
  >
    {/* TOPO ESCURO / FUNDO */}
    <div
      style={{
        height: 1,
        background: "#ffffff"
      }}
    />

    {/* SHEET PRINCIPAL */}
    <div
      style={{
        marginTop: 0,
        background: "#fff",
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        minHeight: "calc(100vh - 12px)",
        boxShadow: "0 -6px 18px rgba(0,0,0,0.08)",
        overflow: "hidden"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "18px 18px 16px",
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "#fff"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr auto",
            alignItems: "center",
            gap: 12
          }}
        >
          <button
            onClick={() => {
              setAba("home");
              setStep(1);
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              border: "none",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#030202",
              cursor: "pointer"
            }}
          >
            <ChevronDown size={20} />
          </button>

          <div
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-0.02em"
            }}
          >
            SACOLA
          </div>

          <button
            onClick={() => setCarrinho([])}
            style={{
              border: "none",
              background: "transparent",
              color: "#ea1d2c",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            Limpar
          </button>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div
        style={{
          padding: "6px 18px 24px"
        }}
      >
        

        {/* TÍTULO ITENS */}
        <div
          style={{
            fontSize: 19,
            fontWeight: 800,
            color: "#111",
            marginBottom: 16
          }}
        >
          Itens adicionados
        </div>

        {/* ITENS */}
        {carrinho.map((item, i) => {
  const nomeProduto = item?.produto?.nome || "Produto";
  const descricaoProduto = item?.produto?.descricao || "";
  const imagemProduto = item?.produto?.imagem || item?.imagem || "/acai.png";

  const totalExtrasUnitario = Array.isArray(item?.extras)
    ? item.extras.reduce(
        (acc, e) => acc + (Number(e?.preco || 0) * Number(e?.qtd || 1)),
        0
      )
    : 0;

  return (
    <div
      key={i}
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        marginBottom: 22
      }}
    >
      {/* IMAGEM */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 20,
          overflow: "hidden",
          background: "#f5f5f5",
          position: "relative",
          flexShrink: 0
        }}
      >
        <img
          src={imagemProduto}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />

        {item?.produto?.categoria === "acai" && (
          <button
            onClick={() => editarItem(i)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "none",
              background: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ea1d2c",
              cursor: "pointer"
            }}
          >
            <Pencil size={14} />
          </button>
        )}
      </div>

      {/* DADOS */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#111",
            lineHeight: 1.2
          }}
        >
          {nomeProduto}
        </div>

        {/* 🔥 TAMANHO (CARRINHO IGUAL PEDIDOS) */}
{(() => {
  const produtoBanco = produtos.find(prod =>
    prod.id === item?.produto?.id ||
    prod.nome === nomeProduto
  );

  const tamanhoFinal =
    item?.tamanho ||
    produtoBanco?.tamanho ||
    "";

  const descricaoFinal =
    item?.descricaoTamanho ||
    produtoBanco?.descricaoTamanho ||
    "";

  if (!tamanhoFinal && !descricaoFinal) return null;

  return (
    <div
      style={{
        marginTop: 4,
        fontSize: 12,
        color: "#6b21a8",
        fontWeight: 600
      }}
    >
      {tamanhoFinal}
      {descricaoFinal && ` • ${descricaoFinal}`}
    </div>
  );
})()}

      {!!descricaoProduto && (
  <div
    style={{
      marginTop: 6,
      fontSize: 13,
      color: "#666",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      lineHeight: 1.5,
      maxHeight: "4.5em" // 🔥 mais fluido que minHeight
    }}
  >
    {descricaoProduto}
  </div>
)}

      {Array.isArray(item?.extras) && item.extras.length > 0 && (
  <div
    style={{
      marginTop: 6,
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }}
  >
    {item.extras.map((e, i) => {
      // 🔥 CORREÇÃO: garante qtd mínima = 1
      const qtd = Number(e?.qtd ?? 1);

      // 🔥 só remove se for realmente inválido
      if (qtd < 1) return null;

      return (
        <div
          key={i}
          style={{
            background: "#f5f5f5",
            color: "#333",
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 8px",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            gap: 4
          }}
        >
          <span>{e.nome}</span>

          {qtd > 1 && (
            <span
              style={{
                background: "#111",
                color: "#fff",
                borderRadius: 999,
                padding: "0px 6px",
                fontSize: 10,
                fontWeight: 700
              }}
            >
              x{qtd}
            </span>
          )}
        </div>
      );
    })}
  </div>
)}

        <div
  style={{
    marginTop: 10,
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    flexWrap: "wrap"
  }}
>
  {produtoEmPromocao(item?.produto) ? (
    <>
      <strong
        style={{
          fontSize: 17,
          color: "#111",
          fontWeight: 900
        }}
      >
        {formatarReal(item?.total || 0)}
      </strong>

      <span
        style={{
          fontSize: 14,
          color: "#aaa",
          textDecoration: "line-through"
        }}
      >
        {formatarReal(
          ((Number(item?.produto?.preco || 0) +
            (Array.isArray(item?.extras)
              ? item.extras.reduce(
                  (acc, e) =>
                    acc + (Number(e?.preco || 0) * Number(e?.qtd || 1)),
                  0
                )
              : 0)) *
            Number(item?.quantidade || 1))
        )}
      </span>
    </>
  ) : (
    <strong
      style={{
        fontSize: 17,
        color: "#111",
        fontWeight: 900
      }}
    >
      {formatarReal(item?.total || 0)}
    </strong>
  )}
</div>
      </div>

      {/* CONTROLE */}
      <div
        style={{
          minWidth: 118,
          background: "#f7f7f7",
          borderRadius: 18,
          padding: "1px 1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          flexShrink: 0
        }}
      >
        <button
          onClick={() => removerItem(i)}
          style={{
            width: 24,
            height: 24,
            border: "none",
            background: "transparent",
            color: "#ea1d2c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <Trash2 size={17} />
        </button>

        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "#111",
            minWidth: 16,
            textAlign: "center"
          }}
        >
          {item.quantidade}
        </div>

        <button
          onClick={() => alterarQuantidade(i, "mais")}
          style={{
            width: 24,
            height: 24,
            border: "none",
            background: "transparent",
            color: "#ea1d2c",
            fontSize: 28,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          +
        </button>
      </div>
    </div>
  );
})}

        {/* ADICIONAR MAIS */}
        <div
          onClick={() => {
            setAba("home");
            setStep(1);
          }}
          style={{
            marginTop: 8,
            textAlign: "center",
            fontSize: 17,
            fontWeight: 800,
            color: "#ea1d2c",
            cursor: "pointer"
          }}
        >
          Adicionar mais itens
        </div>

        {/* CUPOM */}
        <div
          style={{
            marginTop: 26,
            background: "#fff",
            borderRadius: 20,
            padding: 18,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
            border: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
            cursor: carrinho.length ? "pointer" : "not-allowed",
            opacity: carrinho.length ? 1 : 0.65
          }}
          onClick={() => {
            if (!carrinho.length) return;
            aplicarMelhorCupom();
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 0
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "#fff4f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111",
                flexShrink: 0
              }}
            >
              <Tag size={18} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#111"
                }}
              >
                Cupom
              </div>

              <div
                style={{
                  fontSize: 14,
                  color: "#777",
                  marginTop: 2
                }}
              >
                Codigo aplica automaticamente.
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#ea1d2c",
              flexShrink: 0
            }}
          >
            Adicionar
          </div>
        </div>


        {/* FIDELIDADE */}
<div
  style={{
    background: "#fff",
    borderRadius: 18,
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
    border: "1px solid #eee",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
  }}
>
  {/* HEADER */}
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}>
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8
    }}>
      <div style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Gift size={18} color="#111" />
      </div>

      <div style={{
        fontSize: 15,
        fontWeight: 700,
        color: "#111"
      }}>
        Cartão fidelidade
      </div>
    </div>

    {/* CONTADOR */}
    <div style={{
      fontSize: 12,
      fontWeight: 700,
      color: pontosFidelidade >= 10 ? "#16a34a" : "#666"
    }}>
      {user?.uid ? pontosFidelidade : 0}/10
    </div>
  </div>

  {/* DESCRIÇÃO */}
  <div style={{
    marginTop: 6,
    fontSize: 13,
    color: "#666"
  }}>
    Ganhe um açaí grátis a cada 10 pedidos
  </div>

  {/* BARRA */}
  <div
    style={{
      height: 8,
      background: "#eee",
      borderRadius: 999,
      marginTop: 10,
      overflow: "hidden"
    }}
  >
    <div
      style={{
        width: `${progresso * 100}%`,
        height: "100%",
        background:
          pontosFidelidade >= 10
            ? "linear-gradient(90deg, #16a34a, #22c55e)"
            : "#ea1d2c",
        borderRadius: 999,
        transition: "width 0.35s ease"
      }}
    />
  </div>

  {/* TEXTO */}
  <div style={{
    marginTop: 8,
    fontSize: 12,
    fontWeight: 500,
    color: pontosFidelidade >= 10 ? "#16a34a" : "#777"
  }}>
    {pontosFidelidade >= 10
      ? "Disponível para resgate"
      : `Faltam ${10 - pontosFidelidade} pedidos`}
  </div>
</div>


        {/* CUPOM ATIVO */}
        {cupomAplicado && (
          <div
            style={{
              marginTop: 12,
              borderRadius: 18,
              background: "#ffffff",
              border: "1px solid #e6f4ea",
              boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
              padding: 14
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap"
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  flex: 1,
                  minWidth: 0
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "#ecfdf3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #d1fae5",
                    flexShrink: 0
                  }}
                >
                  <Tag size={18} color="#16a34a" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#111",
                      lineHeight: 1.2
                    }}
                  >
                    Cupom aplicado
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: "#16a34a",
                      fontWeight: 600,
                      marginTop: 2
                    }}
                  >
                    {cupomAplicado.codigo || cupomAplicado.nome || "Desconto"}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#666",
                      marginTop: 4
                    }}
                  >
                    Economia de {formatarReal(descontoCalculado)}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setCupomAplicado(null);
                  setDesconto(0);
                }}
                style={{
                  height: 38,
                  padding: "0 14px",
                  borderRadius: 12,
                  border: "1px solid #e5e5e5",
                  background: "#fff",
                  color: "#ea1d2c",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <X size={14} />
                Remover
              </button>
            </div>
          </div>
        )}


         {/* 🔥 ENDEREÇO */}
<div
  style={{
    marginTop: 16,
    background: "#fff",
    borderRadius: 16,
    padding: 12,
    border: "1px solid #eee",
    boxShadow: "0 3px 10px rgba(0,0,0,0.04)"
  }}
>
  {/* HEADER */}
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 10
  }}>
    <MapPin size={16} color="#111" />
    <span style={{
      fontSize: 13,
      fontWeight: 700,
      color: "#111"
    }}>
      Entrega
    </span>
  </div>

  {/* 🔥 BOTÃO LOCALIZAÇÃO */}
  <div
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 12
  }}
>
   <button
    onClick={pegarLocalizacao}
    disabled={!user?.uid}
    style={{
      width: "100%",
      maxWidth: 420, // 🔥 limita no desktop
      height: 44,

      borderRadius: 12,
      border: "1px solid #e5e7eb",

      background: "#fff",
      color: "#111",

      fontWeight: 700,
      fontSize: 13,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,

      cursor: !user?.uid ? "not-allowed" : "pointer",

      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",

      transition: "all .2s ease",
      opacity: !user?.uid ? 0.6 : 1
    }}
    onMouseEnter={(e) => {
      if (user?.uid) e.currentTarget.style.background = "#f9fafb";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#fff";
    }}
  >
    {/* ÍCONE */}
    <MapPin size={16} color="#ea1d2c" />

    {/* TEXTO */}
    {loadingGeo ? "Obtendo localização..." : "Usar minha localização"}
  </button>
</div>
{clienteLat && (
  <div
    style={{
      fontSize: 12,
      color: "#b45309",
      background: "#fff7ed",
      padding: "8px 10px",
      borderRadius: 10,
      marginBottom: 10,
      border: "1px solid #fed7aa"
    }}
  >
    📍 Localização aproximada. Verifique se a rua, número e bairro estão corretos.
  </div>
)}
  {/* ERRO GEO */}
  {erroGeo && (
    <div style={{
      color: "#dc2626",
      fontSize: 12,
      marginBottom: 8
    }}>
      {erroGeo}
    </div>
  )}

  {/* 🔥 AVISO DESLOGADO */}
  {!user?.uid && (
    <div style={{
      fontSize: 12,
      color: "#777",
      marginBottom: 8
    }}>
      Faça login para preencher o endereço
    </div>
  )}

  {/* LINHA 1 */}
  <div style={{ display: "flex", gap: 6 }}>
    <div style={{ flex: 1, position: "relative" }}>
      <input
        value={clienteCep}
        disabled={!user?.uid}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "").slice(0, 8);
          setClienteCep(v);

          if (v.length === 8) {
            if (!user?.uid) {
              setAba("perfil");
              setStep(4);

              setToast({
                tipo: "erro",
                texto: "Faça login para preencher o endereço"
              });

              return;
            }

            buscarCEP(v);
          }
        }}
        placeholder="CEP"
        style={{
          width: "100%",
          height: 38,
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          padding: "0 34px 0 10px",
          fontSize: 13,
          outline: "none",
          background: !user?.uid ? "#f5f5f5" : "#fff"
        }}
      />

      <Search
        size={14}
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#aaa"
        }}
      />
    </div>

    <input
      value={clienteNumeroCasa}
      disabled={!user?.uid}
      onChange={(e) => setClienteNumeroCasa(e.target.value)}
      placeholder="Nº"
      style={{
        width: 60,
        height: 38,
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        padding: "0 8px",
        fontSize: 13,
        outline: "none",
        textAlign: "center",
        background: !user?.uid ? "#f5f5f5" : "#fff"
      }}
    />
  </div>

  {/* LINHA 2 */}
  <div style={{
    marginTop: 6,
    fontSize: 13,
    color: "#444",
    lineHeight: 1.4
  }}>
    {(clienteEndereco || clienteBairro) ? (
      <>
        <div style={{ fontWeight: 600 }}>
          {clienteEndereco || "Rua"}
        </div>
        <div style={{ fontSize: 12, color: "#777" }}>
          {clienteBairro || "Bairro"}
        </div>
      </>
    ) : (
      <div style={{ color: "#aaa" }}>
        Digite o CEP ou use sua localização
      </div>
    )}
  </div>
</div>

        {/* OBS */}
        <div
          style={{
            marginTop: 22,
            background: "#fff",
            borderRadius: 22,
            padding: 18,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
            border: "1px solid #f0f0f0"
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#111",
              marginBottom: 10
            }}
          >
            Observações do pedido
          </div>

          <textarea
            value={observacaoPedido}
            onChange={(e) => setObservacaoPedido(e.target.value)}
            placeholder="Ex.: sem granola, entregar na portaria, tocar interfone"
            maxLength={200}
            style={{
              width: "100%",
              minHeight: 96,
              resize: "none",
              borderRadius: 16,
              border: "1px solid #ececec",
              padding: 14,
              fontSize: 14,
              color: "#111",
              outline: "none",
              boxSizing: "border-box",
              background: "#fff"
            }}
          />

          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#777",
              textAlign: "right"
            }}
          >
            {observacaoPedido.length}/200
          </div>
        </div>


        {temPremio && !carrinho.some(i => i.gratis) && (
  <div style={{
    marginTop: 20,
    background: "#ecfdf3",
    border: "1px solid #bbf7d0",
    borderRadius: 16,
    padding: 14
  }}>
    <strong style={{ color: "#166534" }}>
       Você ganhou um Açaí Fidelidade Totalmente Grátis!
    </strong>

    <button
  onClick={() => {
    try {
      if (!temPremio) return;

      // 🔥 NÃO TEM PRODUTO → NÃO ENTRA
      if (!produtoFidelidade) {
        setToast({
          tipo: "erro",
          texto: "Nenhum produto disponível para resgate"
        });
        return;
      }

      // 🔥 NÃO DUPLICA
      if (carrinho.some(i => i.gratis)) return;

      // 🔥 FEEDBACK
      if (navigator.vibrate) navigator.vibrate(40);

      // 🔥 ATIVA FIDELIDADE
      setModoCompra("fidelidade");

      setTimeout(() => {
        setAba("home");
        setStep(1);
      }, 50);

    } catch (e) {
      console.log("Erro ao ativar fidelidade:", e);
    }
  }}

  disabled={!produtoFidelidade}

  style={{
    marginTop: 10,

    background: produtoFidelidade
      ? "#16a34a"
      : "#d1d5db",

    color: "#fff",
    border: "none",
    padding: "12px 14px",
    borderRadius: 12,

    fontWeight: 700,
    fontSize: 13,

    cursor: produtoFidelidade ? "pointer" : "not-allowed",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    boxShadow: produtoFidelidade
      ? "0 6px 18px rgba(34,197,94,0.35)"
      : "none",

    transition: "all .2s ease",
    opacity: produtoFidelidade ? 1 : 0.7
  }}

  onMouseDown={(e) => {
    if (!produtoFidelidade) return;
    e.currentTarget.style.transform = "scale(0.97)";
  }}

  onMouseUp={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  {/* ÍCONE */}
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" stroke="white" strokeWidth="2"/>
    <path d="M12 3v12" stroke="white" strokeWidth="2"/>
    <path d="M7 8l5-5 5 5" stroke="white" strokeWidth="2"/>
  </svg>

  {produtoFidelidade
    ? "Resgatar açaí grátis"
    : "Resgate indisponível"}
</button>
  </div>
)}

{modoCompra === "fidelidade" && (
  <div
    style={{
      margin: "12px 16px",
      padding: 12,
      background: "#fff",
      borderRadius: 16,
      border: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
    }}
  >
    {/* ESQUERDA */}
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      
      {/* SE TIVER PRODUTO */}
      {produtoFidelidade ? (
        <>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              overflow: "hidden",
              background: "#f4f4f5"
            }}
          >
            <img
              src={produtoFidelidade.imagem || "/acai.png"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
              {produtoFidelidade.nome}
            </div>

            <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>
              Disponível no seu plano fidelidade
            </div>
          </div>
        </>
      ) : (
        // 🔥 CASO NÃO TENHA PRODUTO
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
            Nenhum produto disponível
          </div>

          <div style={{ fontSize: 11, color: "#ef4444" }}>
            O resgate não está configurado
          </div>
        </div>
      )}
    </div>

    {/* BOTÃO SEMPRE EXISTE */}
    <button
      onClick={() => setModoCompra("normal")}
      style={{
        background: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer"
      }}
    >
      Cancelar
    </button>
  </div>
)}

        {/* RESUMO DE VALORES */}
        <div
          style={{
            marginTop: 24
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111",
              marginBottom: 14
            }}
          >
            Resumo de valores
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 15,
              color: "#666",
              marginBottom: 10
            }}
          >
            <span>Subtotal</span>
            <span>{formatarReal(subtotalProdutos)}</span>
          </div>

          {carrinho.length > 0 && (
          <div
          style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 15,
          color: "#666",
          marginBottom: 10
         }}
         >
        <span>Entrega</span>
       <span
        style={{
        color: taxaEntrega === 0 ? "#16a34a" : "#111",
        fontWeight: 700
        }}
        >
       {subtotalProdutos >= LIMITE_FRETE_GRATIS
        ? "Grátis"
        : formatarReal(taxaEntrega)}
        </span>
        </div>
        )}

          {descontoCalculado > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#16a34a",
                fontSize: 15,
                marginBottom: 10
              }}
            >
              <span>Desconto</span>
              <span>-{formatarReal(descontoCalculado)}</span>
            </div>
          )}
        </div>
      </div>
    </div>

    
    {/* BARRA FIXA FINAL */}
<div
  style={{
    position: "fixed",
    bottom: `calc(${NAVBAR}px)`,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: isMobile ? larguraApp : 720,
    background: "#fff",
    borderTop: "1px solid #eee",
    zIndex: 30,
    boxSizing: "border-box",
    padding: isMobile ? "8px 12px" : "8px 16px"
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 14
    }}
  >
    {/* INFO */}
<div style={{ minWidth: 0, flex: 1 }}>
  {carrinho.length > 0 && (
    <>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          marginBottom: 2,
          color: foraDaArea
            ? "#dc2626"
            : freteGratis
            ? "#16a34a"
            : "#666"
        }}
      >
        {foraDaArea
          ? "Fora da área de entrega grátis"
          : freteGratis
          ? "Entrega grátis aplicada"
          : faltaFreteGratis > 0
          ? `Faltam ${formatarReal(faltaFreteGratis)} para entrega grátis`
          : ""}
      </div>
    </>
  )}

  <div
    style={{
      fontSize: isMobile ? 16 : 15,
      fontWeight: 900,
      color: "#111"
    }}
  >
    {formatarReal(carrinho.length > 0 ? totalFinalComFrete : 0)}
  </div>
</div>

    {/* BOTÃO */}
    <button
      onClick={() => {
        if (!user) {
          localStorage.setItem("redirectAfterLogin", "carrinho");
          router.push("/login");
          return;
        }

        if (!clienteNome || !clienteTelefone) {
          mostrarMensagemPagamento("Preencha seus dados para continuar.", "erro");
          setAba("perfil");
          setStep(4);
          setAbaPerfil("dados");
          return;
        }

        if (!clienteEndereco || !clienteNumeroCasa || !clienteBairro) {
          mostrarMensagemPagamento("Preencha endereço, número e bairro para continuar.", "erro");
          setAba("perfil");
          setStep(4);
          setAbaPerfil("endereco");
          return;
        }

        setAba("pagamentos");
        setStep(6);
      }}
      style={{
        minWidth: isMobile ? 130 : 110,
        height: isMobile ? 46 : 40,
        borderRadius: 14,
        background: "#ea1d2c",
        color: "#fff",
        border: "none",
        fontWeight: 800,
        fontSize: isMobile ? 14 : 13,
        cursor: "pointer",
        boxShadow: "0 6px 14px rgba(234,29,44,0.18)",
        padding: "0 14px",
        flexShrink: 0
      }}
    >
      Continuar
    </button>
  </div>
</div>

    
    {/* ANIMAÇÃO */}
    <style>
      {`
        .fade-slide {
          animation: fadeUp 0.35s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    </style>
  </div>
)}

{aba === "perfil" && step === 4 && (
  <div
    style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      background: "#f7f7f7",
      minHeight: "100dvh",
      paddingBottom: `calc(${NAVBAR}px + env(safe-area-inset-bottom) + 16px)`
    }}
  >
    {/* HEADER */}
    <div
      style={{
        padding: "calc(env(safe-area-inset-top) + 14px) 16px 18px",
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 20
      }}
    >
      {/* TOPO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12
        }}
      >
        {/* ESQUERDA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0
          }}
        >
          <button
            onClick={() => {
              setAba("home");
              setStep(1);
            }}
            style={{
              width: 20,
              height: 20,
              borderRadius: 14,
              border: "1px solid #f1f1f1",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              flexShrink: 0
            }}
          >
            <ArrowLeft size={18} color="#111" />
          </button>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                color: "#888",
                fontWeight: 700,
                letterSpacing: 0.2,
                textTransform: "uppercase",
                marginBottom: 2
              }}
            >
              Perfil
            </div>

            <strong
              style={{
                fontSize: 18,
                color: "#111",
                lineHeight: 1.1
              }}
            >
              Minha conta
            </strong>
          </div>
        </div>

        {/* DIREITA */}
        <div style={{ flexShrink: 0 }}>
          {user ? (
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 999 }}>
  <button
    onClick={async (e) => {
      // 🔥 HAPTIC (vibração mobile)
      if (navigator.vibrate) navigator.vibrate(10);

      // 🔥 RIPPLE
      const button = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
      circle.classList.add("ripple");

      const ripple = button.getElementsByClassName("ripple")[0];
      if (ripple) ripple.remove();

      button.appendChild(circle);

      // 🔥 LOGOUT
      try {
        await signOut(auth);
        setUser(null);
        setCarrinho([]);
        // 🔥PEDIDOS E RESET FIDELIDADE
        setPedidos([]);
        setPontosFidelidade(0);
        localStorage.removeItem("carrinho");
        localStorage.removeItem("pedidoAtual");
        setAba("home");
        setStep(1);
      } catch (e) {
        console.log(e);
      }
    }}
    style={{
      height: 40,
      padding: "0 16px",
      borderRadius: 999,
      background: "#fff",
      color: "#ea1d2c",
      border: "1px solid #eee",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 13,
      display: "flex",
      alignItems: "center",
      gap: 6,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      position: "relative",
      overflow: "hidden"
    }}
  >
    <LogOut size={16} />
    Sair
  </button>
</div>
          ) : (
            <button
              onClick={() => {
                router.push("/login");
              }}
              style={{
                height: 40,
                padding: "0 14px",
                borderRadius: 999,
                background: "#ea1d2c",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 13,
                boxShadow: "0 6px 18px rgba(234,29,44,0.20)"
              }}
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </div>

    <div style={{ padding: 16 }}>
    { /* PERFIL */}
<div
  style={{
    background: "#fff",
    borderRadius: 16,
    padding: 14,
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 12
  }}
>
  {/* AVATAR */}
  <div
    style={{
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: "#ea1d2c",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: 700,
      flexShrink: 0
    }}
  >
    {(clienteNome || "U").trim().charAt(0).toUpperCase()}
  </div>

  {/* INFO */}
  <div style={{ minWidth: 0 }}>
    <div
      style={{
        fontSize: 14,
        fontWeight: 700,
        color: "#111"
      }}
    >
      {clienteNome || "Cliente"}
    </div>

    <div
      style={{
        fontSize: 12,
        color: "#777",
        marginTop: 2,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
      {clienteEmail || "Sem email cadastrado"}
    </div>
  </div>
</div>

{/* MENU */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 12
  }}
>
  {[
    {
      id: "dados",
      titulo: "Meus dados",
      desc: "Nome e telefone",
      icon: <User size={16} />
    },
    {
      id: "cupons",
      titulo: "Cupons",
      desc: "Descontos disponíveis",
      icon: <Ticket size={16} />
    },
    {
      id: "loja",
      titulo: "Informações da loja",
      desc: "Detalhes da loja",
      icon: <Store size={16} />
    }
  ].map(item => {
    const ativo = abaPerfil === item.id;

    return (
      <div
        key={item.id}
        onClick={() => setAbaPerfil(item.id)}
        style={{
          background: ativo ? "#fff5f5" : "#fff",
          borderRadius: 14,
          padding: "12px",
          boxShadow: ativo
            ? "0 4px 12px rgba(234,29,44,0.08)"
            : "0 2px 8px rgba(0,0,0,0.04)",
          border: ativo
            ? "1px solid #f3b1b7"
            : "1px solid #eee",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          transition: "all 0.2s ease"
        }}
      >
        {/* ESQUERDA */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: ativo ? "#fde2e4" : "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: ativo ? "#ea1d2c" : "#666"
          }}>
            {item.icon}
          </div>

          <div>
            <div style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#111"
            }}>
              {item.titulo}
            </div>

            <div style={{
              fontSize: 11,
              color: "#777",
              marginTop: 2
            }}>
              {item.desc}
            </div>
          </div>
        </div>

        {/* DIREITA */}
        <ChevronRight
          size={18}
          color={ativo ? "#ea1d2c" : "#bbb"}
        />
      </div>
    );
  })}
</div>

      {/* CONTEÚDO ATIVO */}
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
        }}
      >
        {abaPerfil === "dados" && (
  <>
    {/* HEADER */}
    <div style={{
      fontSize: 14,
      fontWeight: 700,
      color: "#111",
      marginBottom: 10
    }}>
      Meus dados
    </div>

    {/* NOME */}
    <div style={{ position: "relative" }}>
      <User
        size={16}
        style={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#999"
        }}
      />

      <input
        value={clienteNome}
        onChange={e => setClienteNome(e.target.value)}
        placeholder="Nome"
        style={{
          width: "100%",
          height: 38,
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          padding: "0 10px 0 34px",
          fontSize: 13,
          outline: "none"
        }}
      />
    </div>

    {/* TELEFONE */}
    <div style={{ position: "relative", marginTop: 6 }}>
      <Phone
        size={16}
        style={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#999"
        }}
      />

      <input
        value={clienteTelefone}
        onChange={(e) => {
          let v = e.target.value.replace(/\D/g, "").slice(0, 11);
          v = v.length <= 10
            ? v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
            : v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
          setClienteTelefone(v);
        }}
        placeholder="Telefone"
        style={{
          width: "100%",
          height: 38,
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          padding: "0 10px 0 34px",
          fontSize: 13,
          outline: "none"
        }}
      />
    </div>

    {/* EMAIL (DISPLAY COM ÍCONE) */}
    <div style={{
      marginTop: 6,
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px",
      borderRadius: 10,
      background: "#f9fafb",
      fontSize: 13,
      color: "#555"
    }}>
      <Mail size={16} color="#999" />
      <span>{clienteEmail || "Email"}</span>
    </div>

    {/* BOTÃO */}
    <div style={{
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 10
    }}>
      <button
        onClick={salvarDadosCliente}
        style={{
          height: 36,
          padding: "0 14px",
          borderRadius: 10,
          border: "none",
          background: "#111",
          color: "#fff",
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer"
        }}
      >
        Salvar
      </button>
    </div>
  </>
)}

      
        {abaPerfil === "cupons" && (
  <div
    style={{
      ...card,
      borderRadius: 16,
      padding: 14,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}
  >
    {/* HEADER */}
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }}>
      <TicketPercent size={16} />
      <strong style={{ fontSize: 14 }}>
        Cupons disponíveis
      </strong>
    </div>

    <div style={{
      fontSize: 12,
      color: "#777",
      marginBottom: 6
    }}>
      Uso único por cliente
    </div>

    {/* LISTA */}
    {cupons
      .filter(c => c.ativo !== false)
      .map((c, i) => (
        <div
          key={i}
          style={{
            marginTop: 8,
            padding: "12px",
            borderRadius: 14,
            background: "#fff",
            border: "1px dashed #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10
          }}
        >
          {/* ESQUERDA */}
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#111"
            }}>
              {c.codigo}
            </div>

            <div style={{
              fontSize: 11,
              color: "#777",
              marginTop: 2
            }}>
              Aplicável no pedido
            </div>
          </div>

          {/* DIREITA */}
          <div style={{
            background: "#fff1f2",
            color: "#ea1d2c",
            fontSize: 12,
            fontWeight: 700,
            padding: "6px 10px",
            borderRadius: 999,
            whiteSpace: "nowrap"
          }}>
            {c.tipo === "porcentagem"
              ? `${c.desconto}%`
              : formatarReal(c.desconto)}
          </div>
        </div>
      ))}

    {/* EMPTY */}
    {cupons.filter(c => c.ativo !== false).length === 0 && (
      <div style={{
        marginTop: 14,
        textAlign: "center",
        color: "#777",
        fontSize: 13
      }}>
        Nenhum cupom disponível
      </div>
    )}
  </div>
)}
      

        {abaPerfil === "loja" && (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      padding: 14,
      border: "1px solid #eee",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}
  >
    {/* HEADER */}
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8
    }}>
      <Store size={16} />
      <span style={{
        fontSize: 14,
        fontWeight: 700,
        color: "#111"
      }}>
        Informações da loja
      </span>
    </div>

    {/* DESCRIÇÃO */}
    <div style={{
      fontSize: 12,
      color: "#666",
      marginTop: 6
    }}>
      Horários, detalhes e apresentação da loja
    </div>

    {/* BOTÃO */}
    <div
      onClick={() => {
        setAba("info");
        setStep(99);
      }}
      style={{
        marginTop: 10,
        padding: "12px",
        borderRadius: 12,
        background: "#fff5f5",
        border: "1px solid #f3b1b7",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "all .2s ease"
      }}
    >
      <span style={{
        fontSize: 13,
        fontWeight: 600,
        color: "#ea1d2c"
      }}>
        Ver loja
      </span>

      <ChevronRight size={18} color="#ea1d2c" />
    </div>
  </div>
)}
</div>
   
{toast && (
  <div
    style={{
      position: "fixed",
      bottom: `calc(${NAVBAR}px + env(safe-area-inset-bottom) + 16px)`,
      left: "50%",
      transform: "translateX(-50%)",
      width: "calc(100% - 32px)",
      maxWidth: 420,
      zIndex: 9999
    }}
  >
    <div
      style={{
        background:
          toast.tipo === "sucesso"
            ? "#ecfdf3"
            : toast.tipo === "erro"
            ? "#fef2f2"
            : "#f8fafc",
        color:
          toast.tipo === "sucesso"
            ? "#166534"
            : toast.tipo === "erro"
            ? "#b91c1c"
            : "#334155",
        border:
          toast.tipo === "sucesso"
            ? "1px solid #bbf7d0"
            : toast.tipo === "erro"
            ? "1px solid #fecaca"
            : "1px solid #e2e8f0",
        borderRadius: 16,
        padding: "14px 16px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        fontSize: 14,
        fontWeight: 600
      }}
    >
      {toast.texto}
    </div>
  </div>
)}

    </div>
  </div>
)}



{aba === "pedidos" && step === 5 && (
  <div
    className={`fade-slide ${animacao}`}
    style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      minHeight: "100dvh",
      paddingBottom: 80,
      background: "#f7f7f7",
      paddingBottom: `calc(${NAVBAR}px + env(safe-area-inset-bottom) + 24px)`,
      boxSizing: "border-box"
    }}
  >
    {/* HEADER */}
    <div
      style={{
        padding: "calc(env(safe-area-inset-top) + 14px) 16px 16px",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={() => {
            setAba("home");
            setStep(1);
          }}
          style={{
            width: 22,
            height: 22,
            borderRadius: 14,
            border: "none",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            cursor: "pointer"
          }}
        >
          <ArrowLeft size={20} color="#111" />
        </button>

        <div>
          <h3 style={{ margin: 0, color: "#111" }}>Pedidos</h3>
          <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>
            Acompanhe seus pedidos
          </div>
        </div>
      </div>
    </div>

    <div style={{ padding: 16 }}>
   {/* VAZIO + SUGESTÕES */}
{pedidos.length === 0 && (() => {

  // 🔥 PROMOÇÕES PRIMEIRO
  const sugestoes = [
    ...produtos.filter(p => produtoEmPromocao(p)),
    ...produtos.filter(p => !produtoEmPromocao(p))
  ].slice(0, 6);

 

  return (
    <div
      style={{
        marginTop: 50,
        padding: "0 16px",
        maxWidth: 510,
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      {/* TEXTO */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>
          Nenhum pedido ainda
        </div>

        <div style={{ fontSize: 13, color: "#777", marginTop: 6 }}>
          Que tal pedir seu primeiro açaí?
        </div>
      </div>

      {/* CTA */}
      <div
        onClick={() => {
          setAba("home");
          setStep(1);
        }}
        style={{
          background: "linear-gradient(135deg,#ea1d2c,#ff2e2e)",
          borderRadius: 16,
          padding: 14,
          color: "#fff",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: 20,
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(234,29,44,0.25)"
        }}
      >
        Ver cardápio
      </div>

      {/* SUGESTÕES */}
      <div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            marginBottom: 10,
            color: "#111"
          }}
        >
          Sugestões pra você
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            paddingBottom: 10
          }}
        >
         {sugestoes.map((p) => {
  const emPromo =
    p.promocao === true &&
    Number(p.precoPromocional || 0) > 0 &&
    Number(p.precoPromocional || 0) < Number(p.preco || 0);

  const precoFinal = emPromo
    ? Number(p.precoPromocional)
    : Number(p.preco);

  const isMaisVendido =
    p.maisVendido === true || p.maisVendido === "true";

  return (
    <div
  key={p.id}
  style={{
    minWidth: 150,
    background: "#fff",
    borderRadius: 18,
    padding: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "0.2s",
    position: "relative",
    cursor: "default"
  }}
>
  {/* 🔥 TAG PROMO */}
  {emPromo && (
    <div
      style={{
        position: "absolute",
        top: 8,
        left: 8, // 🔥 esquerda
        background: "#ea1d2c",
        color: "#fff",
        fontSize: 12,
        fontWeight: 800,
        padding: "3px 10px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        boxShadow: "0 4px 10px rgba(234,29,44,0.35)"
      }}
    >
      Imperdível
    </div>
  )}

  {/* ⭐ MAIS VENDIDO */}
  {isMaisVendido && (
    <div
      style={{
        position: "absolute",
        top: emPromo ? 34 : 8, // 🔥 desce se tiver promo
        left: 8, // 🔥 esquerda
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)"
      }}
    >
      Mais pedido
    </div>
  )}
      {/* IMAGEM */}
      <img
        src={p.imagem || "/acai.png"}
        draggable={false}
        onError={(e) => (e.target.src = "/acai.png")}
        style={{
          width: "100%",
          height: 95,
          objectFit: "cover",
          borderRadius: 12,
          marginBottom: 8,
          pointerEvents: "none",
          userSelect: "none"
        }}
      />

      {/* NOME */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          marginBottom: 4,
          color: "#111"
        }}
      >
        {p.nome}
      </div>

      {/* PREÇO */}
      <div style={{ fontSize: 13, fontWeight: 800 }}>
        {emPromo && (
          <span
            style={{
              fontSize: 11,
              color: "#aaa",
              textDecoration: "line-through",
              marginRight: 6
            }}
          >
            {formatarReal(p.preco)}
          </span>
        )}

        <span style={{ color: emPromo ? "#ea1d2c" : "#111" }}>
          {formatarReal(precoFinal)}
        </span>
      </div>

      {/* BOTÃO */}
      <div
        onClick={(e) => {
          e.stopPropagation();

          if (!lojaAberta) {
            mostrarToast("Loja fechada no momento", "erro");
            return;
          }

          setProduto({
            ...p,
            preco: emPromo ? p.precoPromocional : p.preco,
            precoOriginal: p.preco,
            emPromocao: emPromo
          });

          setAba("home");
          setStep(2);
        }}
        style={{
          marginTop: 8,
          background: lojaAberta ? "#ea1d2c" : "#ccc",
          color: "#fff",
          borderRadius: 999,
          textAlign: "center",
          padding: "10px 0",
          fontSize: 13,
          fontWeight: 800,
          cursor: lojaAberta ? "pointer" : "not-allowed",
          boxShadow: lojaAberta
            ? "0 4px 12px rgba(234,29,44,0.25)"
            : "none",
          opacity: lojaAberta ? 1 : 0.7
        }}
      >
        {lojaAberta ? "Pedir" : "Loja fechada"}
      </div>
    </div>
  );
})}
 
        </div>
      </div>
    </div>
  );
})()}
         

      {/* AGRUPAMENTO */}
      {Object.entries(
        [...pedidos].reverse().reduce((acc, p) => {
          const dataBase = new Date(Number(p.data) || Date.now());

          const hoje = new Date();
          const ontem = new Date();
          ontem.setDate(ontem.getDate() - 1);

          let label;

          if (dataBase.toDateString() === hoje.toDateString()) {
            label = "Hoje";
          } else if (dataBase.toDateString() === ontem.toDateString()) {
            label = "Ontem";
          } else {
            label = dataBase.toLocaleDateString("pt-BR");
          }

          if (!acc[label]) acc[label] = [];
          acc[label].push(p);

          return acc;
        }, {})
      ).map(([grupo, lista]) => (
        <div key={grupo} style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#666",
              marginBottom: 10,
              paddingLeft: 2
            }}
          >
            {grupo}
          </div>

          {lista.map((p, iGrupo) => {
            const primeiroItem = p.itens?.[0] || {};
            const chaveAberta = `${grupo}-${iGrupo}`;

            const produtoReal = produtos.find(prod =>
              prod.id === primeiroItem?.produtoId ||
              prod.nome === primeiroItem?.produto?.nome ||
              prod.nome === primeiroItem?.nome
            );

            const nomePrincipal =
              primeiroItem?.produto?.nome ||
              primeiroItem?.nome ||
              "Pedido";

            const nomePagamento =
  p.formaPagamento === "pix"
    ? "Pix"
    : p.formaPagamento === "dinheiro"
    ? "Dinheiro"
    : p.formaPagamento === "cartao_online"
    ? "Cartão online"
    : "Cartão na Entrega";

const TEMPO_PIX_MS = 15 * 60 * 1000;
const criadoEmMs = Number(p.data || 0);

/* PIX */
const pixPendente =
  p.formaPagamento === "pix" &&
  p.status === "aguardando_pagamento";

/* CARTÃO ONLINE */
const cartaoOnlinePendente =
  p.formaPagamento === "cartao_online" &&
  (
    p.status === "aguardando_pagamento_online" ||
    p.paymentStatus === "pending" ||
    p.paymentStatus === "in_process"
  );

const pagamentoRecusado =
  p.status === "pagamento_recusado" ||
  p.paymentStatus === "rejected" ||
  p.paymentStatus === "cancelled" ||
  p.paymentStatus === "refunded" ||
  p.paymentStatus === "charged_back";

/* PIX EXPIRADO */
const pixExpirado =
  pixPendente &&
  criadoEmMs > 0 &&
  agoraPedidos - criadoEmMs >= TEMPO_PIX_MS;

const tempoRestanteMs = Math.max(
  0,
  TEMPO_PIX_MS - (agoraPedidos - criadoEmMs)
);

const min = Math.floor(tempoRestanteMs / 60000);
const seg = Math.floor((tempoRestanteMs % 60000) / 1000);

const tempoFormatado =
  `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;

/* TEXTO STATUS */
const statusTexto =
  pixExpirado
    ? "Pix expirado"
    : pagamentoRecusado
    ? "Pagamento recusado"
    : cartaoOnlinePendente
    ? "Aguardando confirmação do cartão"
    : p.status === "aguardando_pagamento"
    ? "Aguardando pagamento"
    : p.status === "preparando"
    ? "Em preparo"
    : p.status === "saiu"
    ? "Saiu para entrega"
    : p.status === "entregue"
    ? "Entregue"
    : "Processando";


/* COR STATUS */
const corStatus =
  pixExpirado
    ? "#ef4444"
    : pagamentoRecusado
    ? "#ef4444"
    : cartaoOnlinePendente
    ? "#f59e0b"
    : p.status === "aguardando_pagamento"
    ? "#f97316"
    : p.status === "preparando"
    ? "#facc15"
    : p.status === "saiu"
    ? "#60a5fa"
    : p.status === "entregue"
    ? "#22c55e"
    : "#999";

            const renderTimeline = (status) => {
              const etapas = ["recebido", "preparando", "saiu", "entregue"];
              const atual = etapas.indexOf(status);

              return (
                <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                  {etapas.map((etapa, idx) => {
                    const ativo = idx <= atual;

                    return (
                      <div
                        key={etapa}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: ativo ? "#ea1d2c" : "#ddd"
                          }}
                        />

                        {idx < etapas.length - 1 && (
                          <div
                            style={{
                              height: 2,
                              flex: 1,
                              background: idx < atual ? "#ea1d2c" : "#ddd"
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            };

            return (
              <div
                key={chaveAberta}
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  padding: 14,
                  marginBottom: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                }}
              >
                {/* TOPO */}
                <div style={{ display: "flex", gap: 12 }}>
                  <img
                    src={
                      produtoReal?.imagem ||
                      primeiroItem?.produto?.imagem ||
                      primeiroItem?.imagem ||
                      "/acai.png"
                    }
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 14,
                      objectFit: "cover",
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: "#777" }}>
                      Pedido #{p.codigo || "—"}
                    </div>

                    <strong
                      style={{
                        fontSize: 15,
                        color: "#111",
                        display: "block",
                        lineHeight: 1.25
                      }}
                    >
                      {p.itens?.length === 1
                        ? nomePrincipal
                        : `${nomePrincipal} +${p.itens.length - 1}`}
                    </strong>

                   {(() => {
  const produtoBanco = produtos.find(prod =>
    prod.id === primeiroItem?.produtoId ||
    prod.nome === primeiroItem?.nome ||
    prod.nome === primeiroItem?.produto?.nome
  );

  const tamanho =
    primeiroItem?.tamanho ||
    produtoBanco?.tamanho ||
    "";

  const descricao =
    primeiroItem?.descricaoTamanho ||
    produtoBanco?.descricaoTamanho ||
    "";

  if (!tamanho && !descricao) return null;

  return (
    <div
      style={{
        marginTop: 4,
        fontSize: 12,
        fontWeight: 700,
        color: "#6b21a8",
        background: "#f3e8ff",
        padding: "3px 8px",
        borderRadius: 999,
        display: "inline-block"
      }}
    >
      {tamanho}
      {descricao && ` • ${descricao}`}
    </div>
  );
})()}

                    <div
                      style={{
                        marginTop: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        flexWrap: "wrap"
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: corStatus
                        }}
                      />

                      <span style={{ fontSize: 12, color: "#555" }}>
                        {statusTexto}
                      </span>

                      <span style={{ fontSize: 11, color: "#999" }}>
                        • {nomePagamento}
                      </span>
                    </div>

                    {/* PIX PENDENTE / EXPIRADO */}
                    {pixPendente ? (
                      <div
                        style={{
                          marginTop: 10,
                          padding: "8px 10px",
                          borderRadius: 10,
                          background: pixExpirado ? "#fef2f2" : "#fff7ed",
                          border: pixExpirado
                            ? "1px solid #fecaca"
                            : "1px solid #fed7aa",
                          fontSize: 12,
                          color: pixExpirado ? "#991b1b" : "#9a3412",
                          lineHeight: 1.4
                        }}
                      >
                        {pixExpirado ? (
                          <>O tempo para pagamento deste Pix expirou. Gere um novo Pix para continuar.</>
                        ) : (
                          <>
                            Seu pedido está aguardando o pagamento via Pix para entrar em preparo.
                            <div style={{ marginTop: 4, fontWeight: 700 }}>
                              Expira em {tempoFormatado}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      renderTimeline(p.status)
                    )}
                  </div>
                </div>

  {p.status === "cancelado" && (
  <div
    style={{
      marginTop: 10,
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "8px 12px",
      borderRadius: 10,
      fontWeight: 800,
      textAlign: "center"
    }}
  >
    Pedido cancelado
  </div>
)}

               {/* TOTAL + AÇÕES */}
<div
  style={{
    marginTop: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  }}
>
  {/* PREÇO */}
  <strong
    style={{
      color: "#ea1d2c",
      fontSize: 17,
      fontWeight: 800
    }}
  >
    {formatarReal(p.total)}
  </strong>

  {/* AÇÕES */}
  {p.status === "entregue" && (
    <>
      {p.itens?.some(item =>
        !p.avaliacoesFeitas?.includes(item.produtoId)
      ) ? (
        <button
          onClick={() => {
            const itemNaoAvaliado = p.itens.find(item =>
              !p.avaliacoesFeitas?.includes(item.produtoId)
            );

            if (!itemNaoAvaliado) return;

            setAvaliacaoAberta({
              pedidoId: p.id,
              produtoId: itemNaoAvaliado.produtoId,
              nome:
                itemNaoAvaliado.produto?.nome ||
                itemNaoAvaliado.nome,
              imagem:
                itemNaoAvaliado.produto?.imagem ||
                itemNaoAvaliado.imagem ||
                "/acai.png"
            });

            setNotaSelecionada(5);
            setComentario("");
          }}
          style={{
            height: 34,
            padding: "0 14px",
            borderRadius: 10,
            border: "none",
            background: "#ea1d2c",
            color: "#fff",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(234,29,44,0.25)"
          }}
        >
          Avaliar
        </button>
      ) : (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#f0fdf4",
            color: "#16a34a",
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800
          }}
        >
          ✓ Avaliado
        </div>
      )}
    </>
  )}


  {/* BOTÕES DIREITA */}
<div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
  <button
    onClick={() =>
      setPedidoAberto(
        pedidoAberto === chaveAberta ? null : chaveAberta
      )
    }
    style={{
      background: "#fff",
      color: "#666",
      border: "1px solid #eee",
      padding: "8px 12px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer"
    }}
  >
    {pedidoAberto === chaveAberta ? "Ocultar" : "Detalhes"}
  </button>

  {/* PIX */}
  {pixPendente ? (
    <button
      onClick={() => {
        if (pixExpirado) {
          setPedidoPixAberto(p);
          gerarNovoPixDoPedido(p);
          return;
        }

        setFormaPagamento("pix");
        setPedidoPixAberto(p);
        setPaymentId(p.paymentId || null);
        setQrBase64(p.qrBase64 || null);
        setQrCode(p.qrCode || null);

        if (!p.qrBase64 || !p.qrCode) {
          gerarNovoPixDoPedido(p);
        }

        setMostrarPagamento(true);
      }}
      style={{
        background: "#ea1d2c",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 6px 14px rgba(234,29,44,0.18)"
      }}
    >
      {pixExpirado ? "Gerar novo Pix" : "Pagar agora"}
    </button>

  /* CARTÃO ONLINE PENDENTE */
  ) : cartaoOnlinePendente ? (
    <button
  onClick={async () => {
    try {
      if (p.checkoutUrl) {
        window.location.href = p.checkoutUrl;
        return;
      }

      const res = await fetch("/api/checkoutpro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          total: Number(p.total || 0) / 100,
          pedidoId: p.id,
          nome: p.cliente?.nome || "Cliente",
          email: clienteEmail || "cliente@email.com"
        })
      });

      const data = await res.json();

      if (!data.url) {
        mostrarToast("Não foi possível reabrir o pagamento", "erro");
        return;
      }

      await updateDoc(doc(db, "pedidos", p.id), {
        checkoutUrl: data.url,
        checkoutId: data.id || null,
        status: "aguardando_pagamento_online"
      });

      window.location.href = data.url;
    } catch (e) {
      console.log("ERRO CONTINUAR PAGAMENTO:", e);
      mostrarToast("Erro ao continuar pagamento", "erro");
    }
  }}
  style={{
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(37,99,235,0.20)"
  }}
>
  Continuar pagamento
</button>

  /* PAGAMENTO RECUSADO */
  ) : pagamentoRecusado ? (
    <button
      onClick={() => {
        if (p.checkoutUrl) {
          window.location.href = p.checkoutUrl;
        } else {
          mostrarToast(
            "Gere um novo pagamento",
            "erro"
          );
        }
      }}
      style={{
        background: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 6px 14px rgba(239,68,68,0.18)"
      }}
    >
      Tentar novamente
    </button>

  /* NORMAL */
  ) : (
    <button
      onClick={() => {
        const novosItens = (p.itens || []).map(item => {
          const produtoBanco = produtos.find(prod =>
            prod.id === item.produtoId ||
            prod.nome === item.produto?.nome ||
            prod.nome === item.nome
          );

          return {
  produto: {
    id:
      produtoBanco?.id ||
      item.produtoId ||
      item.produto?.id ||
      null,

    nome:
      produtoBanco?.nome ||
      item.produto?.nome ||
      item.nome ||
      "Produto",

    imagem:
      produtoBanco?.imagem ||
      item.produto?.imagem ||
      item.imagem ||
      "/acai.png",

    preco: Number(
      produtoBanco?.preco ??
      item.produto?.preco ??
      0
    ),

    categoria:
      produtoBanco?.categoria ||
      item.produto?.categoria ||
      item.categoria ||
      ""
  },

  quantidade: Number(item.quantidade || 1),
  extras: item.extras || [],
  total: Number(item.total || 0),

  // 🔥 CORREÇÃO FINAL (igual ao detalhe)
  tamanho:
    item.tamanho ||
    produtoBanco?.tamanho ||
    "",

  descricaoTamanho:
    item.descricaoTamanho ||
    produtoBanco?.descricaoTamanho ||
    ""
};
        });

        setCarrinho(novosItens);
        setAba("carrinho");
        setStep(3);
      }}
      style={{
        background: "#ea1d2c",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 6px 14px rgba(234,29,44,0.18)"
      }}
    >
      Repetir
    </button>
  )}
</div>
</div>
                  
              
              
                {/* DETALHES */}
{pedidoAberto === chaveAberta && (
  <div
    style={{
      marginTop: 12,
      borderTop: "1px solid #eee",
      paddingTop: 12
    }}
  >
    {p.itens?.map((item, idx) => {
      console.log("ITEM PEDIDO:", item);
      const jaAvaliadoNessePedido = Array.isArray(p.avaliacoesFeitas)
        ? p.avaliacoesFeitas.includes(item.produtoId)
        : false;

      return (
        <div
          key={idx}
          style={{
            marginBottom: 10,
            paddingBottom: 10,
            borderBottom:
              idx !== (p.itens?.length || 0) - 1
                ? "1px solid #f2f2f2"
                : "none"
          }}
        >
          <div
  style={{
    fontSize: 13,
    color: "#111",
    fontWeight: 700
  }}
>
  {item.quantidade}x {item.produto?.nome || item.nome}
</div>

{/* 🔥 TAMANHO AQUI */}
{/* 🔥 TAMANHO (FORÇADO DO FIREBASE) */}
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
        fontSize: 12,
        color: "#6b21a8",
        fontWeight: 600,
        marginTop: 2
      }}
    >
      {tamanhoFinal}
      {descricaoFinal && ` • ${descricaoFinal}`}
    </div>
  );
})()}

         {(item.extras || []).length > 0 && (
  <div style={{ marginTop: 6 }}>
    {(item.extras || []).map(e => (
      <div
        key={e.nome}
        style={{
          fontSize: 12,
          color: "#777",
          marginLeft: 6,
          lineHeight: 1.45
        }}
      >
        • {e.nome} {e.qtd > 1 ? `x${e.qtd}` : ""}
      </div>
    ))}
  </div>
)}

        </div>
      );
    })}
  </div>
)}
              </div>
            );
          })}
        </div>
      ))}
    </div>

    <style>
      {`
        .fade-slide {
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    </style>
  </div>
)}

{aba === "pagamentos" && step === 6 && (
  <>
    <div
      style={{
        maxWidth: larguraApp,
        margin: "0 auto",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
        paddingBottom: BOTTOM_SPACE,
        boxSizing: "border-box"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "calc(env(safe-area-inset-top) + 14px) 16px 14px",
          background: "#f5f5f5",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <button
            onClick={() => {
              setAba("carrinho");
              setStep(3);
            }}
            style={{
              width: 22,
              height: 22,
              borderRadius: 14,
              border: "none",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              cursor: "pointer"
            }}
          >
            <ArrowLeft size={20} color="#111" />
          </button>

          <div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#111",
                lineHeight: 1.1
              }}
            >
              Pagamento
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#777",
                marginTop: 4
              }}
            >
              Escolha como deseja pagar seu pedido
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 8,
          paddingBottom: 150,
          boxSizing: "border-box"
        }}
      >
        {/* RESUMO */}
        <div
          style={{
            background: "#fff",
            padding: 18,
            borderRadius: 22,
            marginBottom: 14,
            border: "1px solid #ececec",
            boxShadow: "0 8px 20px rgba(0,0,0,0.04)"
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111",
              marginBottom: 14
            }}
          >
            Resumo do pedido
          </div>

         {carrinho.map((item, i) => {
  const tamanho =
    item?.tamanho ||
    item?.produto?.tamanho ||
    "";

  const descricaoTamanho =
    item?.descricaoTamanho ||
    item?.produto?.descricaoTamanho ||
    "";

  return (
    <div
      key={i}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        fontSize: 14,
        color: "#444",
        marginTop: i === 0 ? 0 : 8
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12
        }}
      >
        <span>
          {item.quantidade}x {item.produto?.nome}
        </span>

        <span>{formatarReal(item.total)}</span>
      </div>

      {/* 🔥 TAMANHO */}
      {(tamanho || descricaoTamanho) && (
        <div
          style={{
            fontSize: 12,
            color: "#6b21a8",
            fontWeight: 600
          }}
        >
          {tamanho}
          {descricaoTamanho && ` • ${descricaoTamanho}`}
        </div>
      )}
    </div>
  );
})}

          <div
            style={{
              height: 1,
              background: "#efefef",
              margin: "14px 0"
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              color: "#555"
            }}
          >
            <span>Subtotal</span>
            <span>{formatarReal(subtotalProdutos)}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              color: "#555",
              marginTop: 10
            }}
          >
            <span>Entrega</span>
            <span
              style={{
                color: Number(taxaEntrega || 0) === 0 ? "#16a34a" : "#111",
                fontWeight: 700
              }}
            >
              {Number(taxaEntrega || 0) === 0
                ? "Grátis"
                : formatarReal(taxaEntrega)}
            </span>
          </div>

          {descontoCalculado > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                color: "#16a34a",
                marginTop: 10
              }}
            >
              <span>Desconto</span>
              <span>- {formatarReal(descontoCalculado)}</span>
            </div>
          )}

          <div
            style={{
              height: 1,
              background: "#efefef",
              margin: "14px 0"
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <strong
              style={{
                fontSize: 17,
                color: "#111"
              }}
            >
              Total
            </strong>

            <strong
              style={{
                fontSize: 20,
                color: "#ea1d2c",
                fontWeight: 900
              }}
            >
              {formatarReal(totalFinalComFrete)}
            </strong>
          </div>
        </div>

        {/* FORMA DE entrega */}
<div style={{ marginBottom: 20 }}>
  <h3 style={{ marginBottom: 10 }}>Como deseja receber?</h3>

  <div
    style={{
      display: "flex",
      gap: 8,
      background: "#f5f5f5",
      padding: 6,
      borderRadius: 14
    }}
  >
    {/* ENTREGA */}
    <button
      onClick={() => setTipoEntrega("entrega")}
      style={{
        flex: 1,
        height: 44,
        borderRadius: 10,
        border: "none",
        background:
          tipoEntrega === "entrega" ? "#fff" : "transparent",
        color:
          tipoEntrega === "entrega" ? "#ea1d2c" : "#666",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        boxShadow:
          tipoEntrega === "entrega"
            ? "0 2px 6px rgba(0,0,0,0.08)"
            : "none",
        transition: "all 0.15s ease"
      }}
    >
      <MapPin size={16} />
      Entrega
    </button>

    {/* RETIRADA */}
    <button
      onClick={() => setTipoEntrega("retirada")}
      style={{
        flex: 1,
        height: 44,
        borderRadius: 10,
        border: "none",
        background:
          tipoEntrega === "retirada" ? "#fff" : "transparent",
        color:
          tipoEntrega === "retirada" ? "#ea1d2c" : "#666",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        boxShadow:
          tipoEntrega === "retirada"
            ? "0 2px 6px rgba(0,0,0,0.08)"
            : "none",
        transition: "all 0.15s ease"
      }}
    >
      <Store size={16} />
      Retirada
    </button>
  </div>
</div>
        {/* FORMA DE PAGAMENTO */}
        <div
          style={{
            background: "#fff",
            padding: 18,
            borderRadius: 22,
            border: "1px solid #ececec",
            boxShadow: "0 8px 20px rgba(0,0,0,0.04)"
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111",
              marginBottom: 14
            }}
          >
            Forma de pagamento
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}
          >
            {[
              {
                id: "pix",
                nome: "Pix",
                descricao: "Aprovação rápida",
                icone: <QrCode size={20} color={formaPagamento === "pix" ? "#ea1d2c" : "#666"} />
              },


              {
                id: "cartao_online",
                nome: "Cartão Online",
                descricao: "Aprovação rápida",
                icone: <CreditCard size={20} color={formaPagamento === "cartao_online" ? "#ea1d2c" : "#666"} />
              },

             /* {
                id: "cartao",
                nome: "Cartão",
                descricao: "Pagar na entrega",
                icone: <CreditCard size={20} color={formaPagamento === "cartao" ? "#ea1d2c" : "#666"} /> 
              }, */
              {
                id: "dinheiro",
                nome: "Dinheiro",
                descricao: "Pagar na entrega",
                icone: <Wallet size={20} color={formaPagamento === "dinheiro" ? "#ea1d2c" : "#666"} />
              }
            ].map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setFormaPagamento(p.id);
                }}
                style={{
                  padding: "16px 16px",
                  borderRadius: 18,
                  border:
                    formaPagamento === p.id
                      ? "2px solid #ea1d2c"
                      : "1px solid #e7e7e7",
                  background:
                    formaPagamento === p.id
                      ? "#fff5f5"
                      : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minWidth: 0
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      background:
                        formaPagamento === p.id ? "#ffe9ec" : "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {p.icone}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#111"
                      }}
                    >
                      {p.nome}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: "#777",
                        marginTop: 4
                      }}
                    >
                      {p.descricao}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border:
                      formaPagamento === p.id
                        ? "6px solid #ea1d2c"
                        : "2px solid #d6d6d6",
                    background: "#fff",
                    boxSizing: "border-box",
                    flexShrink: 0
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ENTREGA */}
        <div
          style={{
            background: "#fff",
            padding: 18,
            borderRadius: 22,
            marginTop: 14,
            border: "1px solid #ececec",
            boxShadow: "0 8px 20px rgba(0,0,0,0.04)"
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111",
              marginBottom: 10
            }}
          >
            Entrega
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10
            }}
          >
            <MapPin size={18} color="#666" style={{ marginTop: 2, flexShrink: 0 }} />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  color: "#555",
                  lineHeight: 1.45
                }}
              >
                {clienteEndereco || "Endereço não informado"}
                {clienteNumeroCasa ? `, ${clienteNumeroCasa}` : ""}
                {clienteBairro ? ` • ${clienteBairro}` : ""}
              </div>

              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: "#666"
                  }}
                >
                  Taxa de entrega
                </span>

                <strong
                  style={{
                    fontSize: 15,
                    color: Number(taxaEntrega || 0) === 0 ? "#16a34a" : "#111"
                  }}
                >
                  {Number(taxaEntrega || 0) === 0
                    ? "Grátis"
                    : formatarReal(taxaEntrega)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

  
{/* BOTÃO FIXO FINAL */}
<div
  style={{
    position: "fixed",
    bottom: NAVBAR,
    left: 0,
    right: 0,
    zIndex: 30,
    pointerEvents: "none"
  }}
>
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: "8px 12px",
      boxSizing: "border-box"
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: isMobile ? larguraApp : 640,
        pointerEvents: "auto"
      }}
    >
      <button
        onClick={async () => {

          if (!podeFinalizar) {
            mostrarToast("Adicione itens ao carrinho", "erro");
            return;
          }

          if (!tipoEntrega) {
            mostrarToast("Escolha entrega ou retirada", "erro");
            return;
          }

          if (!formaPagamento) {
            mostrarToast("Escolha uma forma de pagamento", "erro");
            return;
          }

          // 🔥 BLOQUEIO REAL DE FRETE
          if (tipoEntrega === "entrega") {

            if (foraDaArea) {
              mostrarToast("Fora da área de entrega ", "erro");
              return;
            }

            if (precisaLocalizacao) {
              mostrarToast("Informe seu endereço", "erro");
              return;
            }
          }

          if (formaPagamento === "pix") {
            setQrBase64(null);
            setQrCode(null);
            setPaymentId(null);
            setMostrarPagamento(true);
            return;
          }

          if (formaPagamento === "cartao_online") {
            await finalizarPedido();
            return;
          }

          await finalizarPedido();
        }}

        disabled={!podeFinalizar}

        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: isMobile ? 54 : 48,
          borderRadius: 14,

          background: podeFinalizar ? "#ea1d2c" : "#e5e5e5",
          color: podeFinalizar ? "#fff" : "#999",

          border: "none",
          fontWeight: 700,
          fontSize: isMobile ? 14 : 13,

          cursor: podeFinalizar ? "pointer" : "not-allowed",
          boxShadow: podeFinalizar
            ? "0 4px 12px rgba(234,29,44,0.16)"
            : "none",

          boxSizing: "border-box",
          padding: "6px 10px",
          lineHeight: 1.2,
          transition: "all .2s ease",
          opacity: podeFinalizar ? 1 : 0.7
        }}
      >
        {/* TEXTO PRINCIPAL */}
        <span>
          {podeFinalizar
            ? `Finalizar pedido • ${formatarReal(totalFinalComFrete)}`
            : "Adicione itens ao carrinho"}
        </span>

        {/* STATUS FRETE CORRIGIDO */}
        {podeFinalizar && tipoEntrega === "entrega" && (
          <span
            style={{
              fontSize: 11,
              marginTop: 2,
              color: foraDaArea
                ? "#ffb3b3"
                : freteGratis
                ? "#bfffd0"
                : "#fff"
            }}
          >
            {foraDaArea
              ? "Fora da área de entrega grátis"
              : freteGratis
              ? "Frete grátis liberado"
              : faltaFreteGratis > 0
              ? `Faltam ${formatarReal(faltaFreteGratis)} para frete grátis`
              : ""}
          </span>
        )}
      </button>
      </div>
  </div>
</div>
  
    </div>
  </>
)}
{aba === "notificacao" && step === 7 && (
  <div
    style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      minHeight: "100vh",
      background: "#f7f7f7",
      display: "flex",
      flexDirection: "column"
    }}
  >
    {/* HEADER PREMIUM */}
    <div
      style={{
        background: "#fff",
        padding: "calc(env(safe-area-inset-top) + 14px) 16px 16px",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 20
      }}
    >  
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <button
          onClick={() => {
            setAba("home");
            setStep(1);
          }}
          style={{
          width: 22,
          height: 22,
          borderRadius: 14,
          border: "none",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          flexShrink: 0
          }}
        >
          <ArrowLeft size={20} color="#0f0e0e" strokeWidth={2.5} />
        </button>

        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#111"
          }}
        >
          Notificações
        </div>

        <div style={{ width: 40 }} />
      </div>
    </div>


    {/* LISTA */}
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: 110
      }}
    >
      {/* HOJE */}
      {grupos.hoje.length > 0 && (
        <>
          <div
            style={{
              padding: "14px 16px 6px",
              fontSize: 13,
              fontWeight: 700,
              color: "#999"
            }}
          >
            HOJE
          </div>

          {grupos.hoje.map((n) => (
            <div
              key={n.id}
              onClick={() => abrirProdutoDaNotificacao(n)}
              style={{
                margin: "8px 12px",
                borderRadius: 16,
                background: "#fff",
                padding: 14,
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                cursor: n?.produtoId ? "pointer" : "default",
                transition: "all 0.2s ease",
                border: !n?.lida
                  ? "1px solid #e11d48"
                  : "1px solid transparent"
              }}
            >
              <NotificacaoItem n={n} />
            </div>
          ))}
        </>
      )}


      {/* ANTIGAS */}
      {grupos.antigas.length > 0 && (
        <>
          <div
            style={{
              padding: "18px 16px 6px",
              fontSize: 13,
              fontWeight: 700,
              color: "#999"
            }}
          >
            ANTERIORES
          </div>

          {grupos.antigas.map((n) => (
            <div
              key={n.id}
              onClick={() => abrirProdutoDaNotificacao(n)}
              style={{
                margin: "8px 12px",
                borderRadius: 16,
                background: "#fff",
                padding: 14,
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                cursor: n?.produtoId ? "pointer" : "default"
              }}
            >
              <NotificacaoItem n={n} />
            </div>
          ))}
        </>
      )}

      {/* VAZIO PREMIUM */}
      {grupos.hoje.length === 0 && grupos.antigas.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "120px 24px",
            color: "#777"
          }}
        >
          <div
            style={{
              fontSize: 42,
              marginBottom: 14
            }}
          >
            🔔
          </div>

          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111"
            }}
          >
            Nenhuma notificação
          </div>

          <div
            style={{
              fontSize: 14,
              marginTop: 6,
              lineHeight: 1.4
            }}
          >
            Quando tiver novidades, elas aparecem aqui.
          </div>
        </div>
      )}
    </div>
  </div>
)}

{aba === "info" && step === 99 && (
  <div
    className={`fade-slide ${animacao}`}
    style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      paddingBottom: 80,
      background: "#f7f7f7"
    }}

    onTouchStart={(e) => {
      window.touchStartX = e.touches[0].clientX;
    }}

    onTouchEnd={(e) => {
      const touchEndX = e.changedTouches[0].clientX;

      if (touchEndX - window.touchStartX > 80) {
        setAnimacao("slide-back");
        setTimeout(() => {
          setStep(1);
          setAba("home");
        }, 50);
      }
    }}
  >

    {/* 🔝 HEADER */}
    <div style={{
      padding: 16,
      background: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 10,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10
      }}>
           <button
  onClick={() => {
    setAba("home");
    setStep(1);
  }}
  style={{
    width: 20,
    height: 20,
    borderRadius: 14,
    border: "none",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
  }}
>
  <ArrowLeft size={20} color="#111" />
</button>

        <h3 style={{ margin: 0 }}>Sobre a loja</h3>
      </div>
    </div>

    <div style={{ padding: 16 }}>

      {/* 🔥 STATUS PREMIUM */}
      <div style={{
        background: lojaAberta ? "#e8f5e9" : "#fdecea",
        padding: 14,
        borderRadius: 16,
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <strong style={{
          color: lojaAberta ? "#00c853" : "#ea1d2c"
        }}>
          {lojaAberta ? "🟢 Loja aberta" : "🔴 Loja fechada"}
        </strong>

        <span style={{
          fontSize: 12,
          color: "#777"
        }}>
          {lojaAberta ? "Recebendo pedidos" : "Fora do horário"}
        </span>
      </div>

      {/* ⏰ HORÁRIO */}
      <div style={{
        background: "#fff",
        padding: 14,
        borderRadius: 16,
        marginBottom: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }}>
        <strong>Horário de funcionamento</strong>

        <div style={{
          marginTop: 8,
          fontSize: 13,
          color: "#555",
          lineHeight: 1.6
        }}>
          <div>Sexta-feira: 18:30h às 23:00h</div>
          <div>Sábado e Domingo: 16:00h às 23:00h</div>
        </div>
      </div>

      {/* 💳 PAGAMENTO */}
      <div style={{
        background: "#fff",
        padding: 14,
        borderRadius: 16,
        marginBottom: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }}>
        <strong>Formas de pagamento</strong>

        <div style={{
          marginTop: 10,
          display: "flex",
          gap: 8,
          flexWrap: "wrap"
        }}>
          {[
            { nome: "Dinheiro", cor: "#22c55e" },
            { nome: "Cartão", cor: "#3b82f6" },
            { nome: "Pix", cor: "#a855f7" }
          ].map(p => (
            <span key={p.nome} style={{
              background: p.cor + "20",
              color: p.cor,
              padding: "6px 10px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: "bold"
            }}>
              {p.nome}
            </span>
          ))}
        </div>
      </div>

      {/* 📍 ENDEREÇO */}
      <div style={{
        background: "#fff",
        padding: 14,
        borderRadius: 16,
        marginBottom: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }}>
        <strong>Endereço</strong>

        <div style={{
          marginTop: 8,
          fontSize: 13,
          color: "#555"
        }}>
          Rua Seis de Janeiro, 209 - Olinda
        </div>
      </div>

      {/* 🗺️ MAPA */}
      <iframe
        src="https://www.google.com/maps?q=R.+Seis+de+Janeiro,+209+Olinda&output=embed"
        width="100%"
        height="180"
        style={{
          border: 0,
          borderRadius: 16,
          marginTop: 6,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          filter: dark ? "grayscale(1) invert(1)" : "none"
        }}
        loading="lazy"
      />

    </div>

    {/* 🔥 FOOTER FIXO */}
    <div style={{
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#fff",
      padding: 16,
      borderTop: "1px solid #eee",
      boxShadow: "0 -4px 12px rgba(0,0,0,0.08)"
    }}>
      
    </div>

    {/* 🔥 ANIMAÇÃO */}
    <style>
      {`
        .fade-slide {
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    </style>

  </div>
)}

{aba === "home" && step === 9 && (
  <div style={{
    maxWidth: larguraApp,
    margin: "0 auto",
    height: "100dvh",
    paddingBottom: 80,
    display: "flex",
    flexDirection: "column",
    background: "#f7f7f7"
  }}>

    {/* HEADER FIXO */}
    <div style={{
      padding: "calc(env(safe-area-inset-top) + 12px) 16px 12px",
      background: "#fff",
      borderBottom: "1px solid #eee",
      display: "flex",
      alignItems: "center",
      gap: 10,
      position: "sticky",
      top: 0,
      zIndex: 20,
      flexWrap: "wrap"
    }}>
      <button
        onClick={() => {
          setAba("home");
          setStep(1);
        }}
        style={{
          width: 22,
          height: 22,
          borderRadius: 14,
          border: "none",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          flexShrink: 0
        }}
      >
        <ArrowLeft size={20} color="#111" />
      </button>

      <h3 style={{
        margin: 0,
        fontSize: 18,
        fontWeight: "bold",
        color: "#111"
      }}>
        {nomeCategoriaAtual}
      </h3>

      {/* ABAS FIXAS */}
      <div style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 8,
        marginTop: 10
      }}>
        {categorias
          .filter(c =>
            ["acai", "promocoes", "bebidas", "combos"].includes(c.slug)
          )
          .sort((a, b) => {
            const ordem = ["acai", "promocoes", "bebidas", "combos"];
            return ordem.indexOf(a.slug) - ordem.indexOf(b.slug);
          })
          .map(c => {
            const ativo = categoriaSelecionada === c.slug;

            return (
              <button
                key={c.id}
                onClick={() => setCategoriaSelecionada(c.slug)}
                style={{
                  padding: "10px 6px",
                  borderRadius: 12,
                  border: ativo ? "1px solid #ea1d2c" : "1px solid #eee",
                  background: ativo ? "#fff1f2" : "#fff",
                  color: ativo ? "#ea1d2c" : "#333",
                  fontSize: 12,
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: 0
                }}
              >
                {c.nome}
              </button>
            );
          })}
      </div>
    </div>

    {/* LISTA */}
    <div style={{
      flex: 1,
      overflowY: "auto",
      padding: 16,
      paddingBottom: 100
    }}>
      {produtos
        .filter(p => {
          if (p.ativo === false) return false;

          if (categoriaSelecionada === "promocoes") {
            return produtoEmPromocao(p);
          }

          return p.categoria === categoriaSelecionada;
        })
        .length === 0 && (
          <div style={{
            textAlign: "center",
            color: "#777",
            marginTop: 40,
            fontSize: 14
          }}>
            Nenhum produto disponível nessa categoria
          </div>
        )}

      {produtos
  .filter(p => {
    if (p.ativo === false) return false;

    if (categoriaSelecionada === "promocoes") {
      return produtoEmPromocao(p);
    }

    return p.categoria === categoriaSelecionada;
  })
  .map(p => (
    <div
      key={p.id}
      onClick={() => {
        if (!validarLojaAberta()) return;

        if (categoriaTemExtras(p.categoria)) {
          setProduto({
          ...p,
         preco: Number(p.preco || 0),
         precoPromocional: Number(p.precoPromocional || 0),
         promocao: p.promocao === true
         });
          setAba("home");
          setStep(2);
          return;
        }

        if (categoriaVaiDiretoCarrinho(p.categoria)) {
          setCarrinho(prev => [
            ...prev,
            {
              produto: {
               ...p,
              preco: Number(p.preco || 0),
              precoPromocional: Number(p.precoPromocional || 0),
              promocao: p.promocao === true
              },
              quantidade: 1,
              extras: [],
              total: Number(precoFinalProduto(p) || 0)
            }
          ]);

          setAba("carrinho");
          setStep(3);
          return;
        }
      }}
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 12,
        marginBottom: 12,
        display: "flex",
        gap: 12,
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
        position: "relative",
        alignItems: "center"
      }}
    >

     {/* BADGES */}
{(produtoEmPromocao(p) || p.maisVendido) && (
  <div
    style={{
      position: "absolute",
      top: 8,
      left: 8,
      display: "flex",
      flexDirection: "column", // 🔥 empilha vertical
      alignItems: "flex-start",
      gap: 4,
      zIndex: 2
    }}
  >
    {/* 🔥 OFERTA */}
    {produtoEmPromocao(p) && (
      <div
        style={{
          background: "#ea1d2c",
          color: "#fff",
          fontSize: 11,
          fontWeight: 800,
          padding: "3px 10px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 10px rgba(234,29,44,0.35)"
        }}
      >
        Imperdível
      </div>
    )}

    {/* ⭐ MAIS PEDIDO */}
    {p.maisVendido && (
      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)"
        }}
      >
        Mais pedido
      </div>
    )}
  </div>
)}
        
      {/* IMAGEM */}
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 14,
        overflow: "hidden",
        background: "#f4f4f5",
        flexShrink: 0
      }}>
        <img
          src={p.imagem || "/acai.png"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

      {/* INFO */}
      <div style={{ flex: 1 }}>
        <strong style={{
          fontSize: 15,
          color: "#111"
        }}>
          {p.nome}
        </strong>

        <div style={{
          fontSize: 12,
          color: "#666",
          marginTop: 4
        }}>
          {p.descricao}
        </div>

        {p.extras?.length > 0 && (
          <div style={{
            fontSize: 11,
            color: "#999",
            marginTop: 4
          }}>
            + {p.extras.length} adicionais
          </div>
        )}

        {/* PREÇO (SEM VERMELHO) */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 8,
          gap: 8
        }}>
          <div>
            {produtoEmPromocao(p) ? (
              <>
                <div style={{
                  fontSize: 11,
                  color: "#999",
                  textDecoration: "line-through",
                  marginBottom: 2
                }}>
                  {formatarReal(p.preco)}
                </div>

                <span style={{
                  fontWeight: "bold",
                  color: "#111", // 🔥 ALTERADO AQUI
                  fontSize: 14
                }}>
                  {formatarReal(precoFinalProduto(p))}
                </span>
              </>
            ) : (
              <span style={{
                fontWeight: "bold",
                color: "#111", // 🔥 ALTERADO AQUI
                fontSize: 14
              }}>
                {formatarReal(p.preco)}
              </span>
            )}
          </div>
   
                {/*<button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!validarLojaAberta()) return;

                    if (categoriaTemExtras(p.categoria)) {
                      setProduto({
                        ...p,
                        preco: precoFinalProduto(p)
                      });
                      setAba("home");
                      setStep(2);
                      return;
                    }

                    if (categoriaVaiDiretoCarrinho(p.categoria)) {
                      setCarrinho(prev => [
                        ...prev,
                        {
                          produto: {
                            ...p,
                            preco: precoFinalProduto(p)
                          },
                          quantidade: 1,
                          extras: [],
                          total: Number(precoFinalProduto(p) || 0)
                        }
                      ]);

                      setAba("carrinho");
                      setStep(3);
                    }
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    border: "none",
                    background: "#ea1d2c",
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(234,29,44,0.3)",
                    flexShrink: 0
                  }}
                >
                  +
                </button>*/}
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
)}


{aba === "busca" && step === 10 && (
  <div style={{
    maxWidth: larguraApp,
    margin: "0 auto",
    paddingBottom: 80,
    minHeight: "100dvh",
    background: "#f7f7f7"
  }}>

    {(() => {
      const normalizarCategoria = (categoria) => {
        return String(categoria || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .trim();
      };

      const termo = busca.trim().toLowerCase();

      const produtosBusca = produtos.filter(p => {
        if (p.ativo === false) return false;

        const nome = (p.nome || "").toLowerCase();
        const descricao = (p.descricao || "").toLowerCase();
        const categoria = normalizarCategoria(p.categoria);

        const bateBusca =
          !termo ||
          nome.includes(termo) ||
          descricao.includes(termo) ||
          categoria.includes(termo);

        const bateFiltro =
          filtroBusca === "todos" ? true : categoria === filtroBusca;

        return bateBusca && bateFiltro;
      });

      const sugestoes = produtos
        .filter(p => p.ativo !== false)
        .filter(p => {
          const nome = (p.nome || "").toLowerCase();
          return termo && nome.includes(termo);
        })
        .slice(0, 5);

      return (
        <>
          {/* HEADER */}
          <div style={{
            padding: "calc(env(safe-area-inset-top) + 14px) 16px 14px",
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              <button
                onClick={() => {
                  setAba("home");
                  setStep(1);
                }}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 14,
                  border: "none",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  cursor: "pointer"
                }}
              >
                <ArrowLeft size={20} color="#111" />
              </button>

              <div style={{ flex: 1, position: "relative" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 12,
                    transform: "translateY(-50%)",
                    color: "#999"
                  }}
                />

                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  onBlur={() => salvarBuscaHistorico(busca)}
                  placeholder="Buscar produto"
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 36px",
                    borderRadius: 999,
                    border: "none",
                    background: "#f2f2f2",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />

                {busca && (
                 <button
  onClick={() => setBusca("")}
  style={{
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    width: 26,
    height: 26,
    borderRadius: "50%",
    border: "none",
    background: "#111",
    color: "#000000",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#000";
    e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#111";
    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
  }}
>
  ✕
</button>
                )}
              </div>
            </div>

            {/* FILTROS */}
            <div style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              marginTop: 12,
              paddingBottom: 2,
              scrollbarWidth: "none"
            }}>
              {[
                { id: "todos", nome: "Todos" },
                { id: "acai", nome: "Açaí" },
                { id: "promocoes", nome: "Promoções" },
                { id: "bebidas", nome: "Bebidas" },
                { id: "combos", nome: "Combos" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFiltroBusca(item.id)}
                  style={{
                    padding: "9px 14px",
                    borderRadius: 999,
                    border: "none",
                    background: filtroBusca === item.id ? "#ea1d2c" : "#f2f2f2",
                    color: filtroBusca === item.id ? "#fff" : "#333",
                    fontSize: 13,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    cursor: "pointer"
                  }}
                >
                  {item.nome}
                </button>
              ))}
            </div>
          </div>

          {/* CONTEÚDO */}
          <div style={{ padding: "12px 16px 100px" }}>

            {/* HISTÓRICO */}
            {!busca && historicoBusca.length > 0 && (
              <div style={{
                background: "#fff",
                borderRadius: 18,
                padding: 14,
                marginBottom: 14,
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10
                }}>
                  <strong style={{ fontSize: 14, color: "#111" }}>
                    Buscas recentes
                  </strong>

                  <button
                    onClick={limparHistoricoBusca}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#ea1d2c",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Limpar
                  </button>
                </div>

                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8
                }}>
                  {historicoBusca.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setBusca(item)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        border: "1px solid #eee",
                        background: "#fff",
                        color: "#444",
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TINHA SEGUNDA CATEGORIA AQUI */}

            {/* SUGESTÕES */}
            {busca && sugestoes.length > 0 && (
              <div style={{
                background: "#fff",
                borderRadius: 18,
                padding: 10,
                marginBottom: 14,
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
              }}>
                {sugestoes.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setBusca(p.nome || "");
                      salvarBuscaHistorico(p.nome || "");
                    }}
                    style={{
                      padding: "10px 8px",
                      borderBottom: "1px solid #f2f2f2",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "#333"
                    }}
                  >
                    {p.nome}
                  </div>
                ))}
              </div>
            )}

            {/* RESULTADOS */}
            {produtosBusca.map(p => (
  <div
    key={p.id}
    onClick={() => {
      salvarBuscaHistorico(p.nome || "");

      if (!validarLojaAberta()) return;

      const categoriaNormalizada = normalizarCategoria(p.categoria);

      if (categoriaNormalizada === "acai") {
        setProduto({
          ...p,
          preco: precoFinalProduto(p)
        });
        setAba("home");
        setStep(2);
        return;
      }

      if (
        categoriaNormalizada === "bebidas" ||
        categoriaNormalizada === "combos" ||
        categoriaNormalizada === "promocoes"
      ) {
        setCarrinho(prev => [
          ...prev,
          {
            produto: {
            ...p,
            preco: Number(p.preco || 0),
            precoPromocional: Number(p.precoPromocional || 0),
            promocao: p.promocao === true
             },
            quantidade: 1,
            extras: [],
            total: Number(precoFinalProduto(p) || 0)
          }
        ]);
        setAba("carrinho");
        setStep(3);
        return;
      }

      console.log("Categoria não reconhecida:", p.categoria);
    }}
    style={{
      background: "#fff",
      borderRadius: 18,
      padding: 12,
      marginBottom: 12,
      display: "flex",
      gap: 12,
      alignItems: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      cursor: "pointer",
      position: "relative"
    }}
  >
    {/* IMAGEM */}
<div
  style={{
    width: 120,
    height: 120,
    minWidth: 70,
    minHeight: 70,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
    background: "#f4f4f5"
  }}
>

  <img
    src={p.imagem || "/acai.png"}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />

  {/* 🔥 BADGE FIXA REAL */}
  {(produtoEmPromocao(p) || p.maisVendido) && (
  <div
    style={{
      position: "absolute",
      top: 6,
      left: 6, // 🔥 esquerda
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start", // 🔥 alinhado à esquerda
      gap: 4,
      zIndex: 2
    }}
  >
    {/* 🔥 OFERTA */}
    {produtoEmPromocao(p) && (
      <div
        style={{
          background: "#ea1d2c",
          color: "#fff",
          fontSize: 12,
          fontWeight: 800,
          padding: "3px 10px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 10px rgba(234,29,44,0.35)"
        }}
      >
        Imperdível
      </div>
    )}

    {/* ⭐ MAIS PEDIDO */}
    {p.maisVendido && (
      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)"
        }}
      >
        Mais pedido
      </div>
    )}
  </div>
)}
    
    </div>

    {/* INFO */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <strong
        style={{
          fontSize: 14,
          color: "#111",
          display: "block",
          lineHeight: 1.25
        }}
      >
        {p.nome}
      </strong>

      {!!p.tamanho && (
        <div
          style={{
            fontSize: 12,
            color: "#777",
            marginTop: 3
          }}
        >
          • {p.tamanho}
        </div>
      )}

      <div
        style={{
          fontSize: 12,
          color: "#777",
          marginTop: 4,
          lineHeight: 1.35,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}
      >
        {p.descricao}
      </div>

      <div style={{ marginTop: 6 }}>
        {produtoEmPromocao(p) ? (
          <>
            <div
              style={{
                fontSize: 11,
                color: "#999",
                textDecoration: "line-through",
                lineHeight: 1.1,
                marginBottom: 2
              }}
            >
              {formatarReal(p.preco)}
            </div>

            <div
              style={{
                color: "#a30510",
                fontWeight: 800,
                fontSize: 15
              }}
            >
              {formatarReal(precoFinalProduto(p))}
            </div>
          </>
        ) : (
          <div
            style={{
              color: "#111",
              fontWeight: 800,
              fontSize: 15
            }}
          >
            {formatarReal(precoFinalProduto(p))}
          </div>
        )}
      </div>
    </div>
  </div>
))}
            {/* VAZIO */}
            {produtosBusca.length === 0 && (
              <div style={{
                marginTop: 40,
                textAlign: "center",
                color: "#777"
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>
                  Nenhum produto encontrado
                </div>
                <div style={{ fontSize: 13, marginTop: 6 }}>
                  Tente buscar por outro nome ou categoria.
                </div>
              </div>
            )}
          </div>
        </>
      );
    })()}
  </div>
)}


{/* 🔥 NAVBAR FIXA */}
{isMobile && (
<div style={{
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,

  width: "100%",
  maxWidth: larguraNavbar,
  margin: "0 auto",

  background: "#fff",
  borderTop: "1px solid #eee",

  height: 64, // 🔥 altura fixa estilo iFood

  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

  boxShadow: "0 -5px 20px rgba(0,0,0,0.08)",
  zIndex: 999,
  boxSizing: "border-box"
}}>


  {/* INICIO */}
  <div
    onClick={() => {
      setAba("home");
      setStep(1);
    }}
    style={{ textAlign: "center", cursor: "pointer" }}
  >
    <Home size={22} color={aba === "home" && step === 1 ? "#ea1d2c" : "#999"} />
    <div style={{
      fontSize: 11,
      marginTop: 2,
      color: aba === "home" && step === 1 ? "#ea1d2c" : "#999"
    }}>
      Início
    </div>
  </div>

  {/* BUSCA */}
  <div
    onClick={() => {
      setAba("busca");
      setStep(10);
    }}
    style={{ textAlign: "center", cursor: "pointer" }}
  >
    <Search size={22} color={aba === "busca" ? "#ea1d2c" : "#999"} />
    <div style={{
      fontSize: 11,
      marginTop: 2,
      color: aba === "busca" ? "#ea1d2c" : "#999"
    }}>
      Buscar
    </div>
  </div>

  {/* PEDIDOS */}
  <div
    onClick={() => {
      setAba("pedidos");
      setStep(5);
    }}
    style={{ textAlign: "center", cursor: "pointer" }}
  >
    <FileText size={22} color={aba === "pedidos" ? "#ea1d2c" : "#999"} />
    <div style={{
      fontSize: 11,
      marginTop: 2,
      color: aba === "pedidos" ? "#ea1d2c" : "#999"
    }}>
      Pedidos
    </div>
  </div>

  {/* CARRINHO */}
  <div
    onClick={() => {
      setAba("carrinho");
      setStep(3);
    }}
    style={{ textAlign: "center", cursor: "pointer", position: "relative" }}
  >
    <ShoppingCart size={22} color={aba === "carrinho" ? "#ea1d2c" : "#999"} />

    {carrinho.length > 0 && (
      <div style={{
        position: "absolute",
        top: -4,
        right: -10,
        background: "#ea1d2c",
        color: "#fff",
        borderRadius: "50%",
        fontSize: 10,
        width: 16,
        height: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {carrinho.length}
      </div>
    )}

    <div style={{
      fontSize: 11,
      marginTop: 2,
      color: aba === "carrinho" ? "#ea1d2c" : "#999"
    }}>
      Carrinho
    </div>
  </div>

  {/* PERFIL */}
  <div
    onClick={() => {
      setAba("perfil");
      setStep(4);
    }}
    style={{ textAlign: "center", cursor: "pointer" }}
  >
    <User size={22} color={aba === "perfil" ? "#ea1d2c" : "#999"} />
    <div style={{
      fontSize: 11,
      marginTop: 2,
      color: aba === "perfil" ? "#ea1d2c" : "#999"
    }}>
      Perfil
    </div>
  </div>

</div>
)}

 {/* LOGIN / CADASTRE-SE NO MEIO DA TELA */}

 {!user &&
  aba !== "perfil" &&
  router.pathname !== "/login" && (
    <div
      onClick={() => router.push("/login")}
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: `calc(${NAVBAR}px + env(safe-area-inset-bottom) + 14px)`,
        width: "calc(100% - 32px)",
        maxWidth: 388,
        zIndex: 999,
        background: "#fff",
        border: "1px solid #ededed",
        borderRadius: 18,
        boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // 🔥 centraliza o bloco
        gap: 12,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        boxSizing: "border-box",
        textAlign: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        {/* ÍCONE */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: "#fff0f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          <User size={20} color="#ea1d2c" />
        </div>

        {/* TEXTOS */}
        <div>
          <div
            style={{
              fontSize: 13,
              color: "#333",
              fontWeight: 500,
              lineHeight: 1.2
            }}
          >
            Explore mais com sua conta
          </div>

          <div
            style={{
              fontSize: 14,
              color: "#ea1d2c",
              fontWeight: 800,
              marginTop: 4,
              lineHeight: 1.2
            }}
          >
            Entrar ou cadastrar-se
          </div>
        </div>
      </div>

      <ChevronRight size={18} color="#b3b3b3" />

      {toast && (
  <div
    style={{
      position: "fixed",
      bottom: "calc(env(safe-area-inset-bottom) + 10px)",

      left: 0,
      right: 0,
      margin: "0 auto",

      width: "100%",
      maxWidth: 420,
      padding: "0 16px",

      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none"
    }}
  >
    <div
      style={{
        width: "100%",
        borderRadius: 16,
        padding: "14px 16px",

        background:
          toast.tipo === "sucesso"
            ? "#ecfdf3"
            : toast.tipo === "erro"
            ? "#fef2f2"
            : "#f8fafc",

        color:
          toast.tipo === "sucesso"
            ? "#166534"
            : toast.tipo === "erro"
            ? "#b91c1c"
            : "#334155",

        border:
          toast.tipo === "sucesso"
            ? "1px solid #bbf7d0"
            : toast.tipo === "erro"
            ? "1px solid #fecaca"
            : "1px solid #e2e8f0",

        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        fontSize: 14,
        fontWeight: 600,

        pointerEvents: "auto"
      }}
    >
      {toast.texto}
    </div>
  </div>
  )}

</div>
)}

{/* desce botao */}
  <div
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "env(safe-area-inset-bottom)",
    background: "#fff",
    zIndex: 998
  }}
/>



{/* 🔥 LOJA FECHADA*/}
{toastLojaFechada && (
  <div
    style={{
      position: "fixed",
      top: "calc(env(safe-area-inset-top) + 12px)",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      width: "90%",
      maxWidth: 420
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 16px",
        borderRadius: 14,
        background: "#fff1f2",
        border: "1px solid #fecdd3",
        color: "#b91c1c",
        fontWeight: 600,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#ea1d2c"
        }}
      />

      <span style={{ fontSize: 14 }}>
        Loja fechada no momento
      </span>
    </div>
  </div>
)}


{/* 🔥 BARRA SACOLA GLOBAL */}
{(() => {
  const mostrarBarraSacola =
    carrinho.length > 0 &&
    !(aba === "carrinho" && step === 3) &&
    !(aba === "home" && step === 2) &&
    !(aba === "perfil" && step === 4) &&
    !(aba === "pagamentos" && step === 6);

  if (!mostrarBarraSacola) return null;

  const totalSacola =
    typeof subtotalProdutos !== "undefined"
      ? subtotalProdutos
      : carrinho.reduce((acc, item) => acc + Number(item.total || 0), 0);

  const totalItens = carrinho.reduce(
    (acc, item) => acc + Number(item.quantidade || 0),
    0
  );

  const progresso =
    LIMITE_FRETE_GRATIS > 0
      ? Math.min((totalSacola / LIMITE_FRETE_GRATIS) * 100, 100)
      : 0;

  return (
    <div
      style={{
        position: "fixed",
        bottom: `calc(${NAVBAR}px)`,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 30
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? larguraApp : 720,
          background: "#fff",
          borderTop: "1px solid #eee",
          borderRadius: isMobile ? 0 : 16,
          boxShadow: isMobile ? "none" : "0 8px 30px rgba(0,0,0,0.08)",
          padding: isMobile ? "10px 12px" : "12px 18px",
          boxSizing: "border-box"
        }}
      >
       {/* PROGRESSO FRETE */}
<div style={{ marginBottom: 8 }}>
  <div
    style={{
      width: "100%",
      height: 6,
      background: "#eee",
      borderRadius: 999,
      overflow: "hidden",
      position: "relative"
    }}
  >
    <div
      style={{
        width: `${progresso}%`,
        height: "100%",
        borderRadius: 999,
        background: foraDaArea
          ? "#dc2626"
          : progresso >= 100 && freteGratis
          ? "#16a34a"
          : "linear-gradient(90deg,#ea1d2c,#ff4d4d)",
        transition: "width 0.4s ease"
      }}
    />

    {/* CAMINHÃO */}
    {!foraDaArea && progresso > 0 && progresso < 100 && (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `calc(${progresso}% - 10px)`,
          transform: "translateY(-50%)",
          fontSize: 12,
          transition: "left 0.4s ease"
        }}
      >
        🚚
      </div>
    )}
  </div>
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14
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
      src={logo || "/bg.png"}
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0
      }}
    />

    <div style={{ minWidth: 0, flex: 1 }}>
      {/* STATUS CORRIGIDO */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: foraDaArea
            ? "#dc2626"
            : freteGratis
            ? "#16a34a"
            : "#666",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {foraDaArea
          ? "Fora da área de entrega grátis"
          : freteGratis
          ? "Entrega grátis aplicada"
          : faltaFreteGratis > 0
          ? `Faltam ${formatarReal(faltaFreteGratis)} para entrega grátis`
          : ""}
      </div>

      {/* VALOR */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: "#111",
          marginTop: 2
        }}
      >
        {formatarReal(totalSacola)}{" "}
        <span style={{ fontWeight: 500, color: "#666" }}>
          / {totalItens} {totalItens === 1 ? "item" : "itens"}
        </span>
      </div>
    </div>
  </div>

  {/* BOTÃO */}
  <button
    onClick={() => {
      setAba("carrinho");
      setStep(3);
    }}
    style={{
      height: 46,
      padding: "0 22px",
      borderRadius: 14,
      border: "none",
      background: "#ea1d2c",
      color: "#fff",
      fontSize: 14,
      fontWeight: 800,
      cursor: "pointer",
      flexShrink: 0,
      boxShadow: "0 6px 16px rgba(234,29,44,0.18)"
    }}
  >
    Ver sacola
  </button>
</div>
      </div>
    </div>
  );
})()}


{bloqueioMsg && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 16
    }}
    onClick={() => setBloqueioMsg(null)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: 320,
        background: "#fff",
        borderRadius: 20,
        padding: "24px 18px 18px",
        textAlign: "center",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25)"
      }}
    >
      {/* ÍCONE CENTRAL */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px"
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2"/>
          <path d="M12 7v5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="1.2" fill="#dc2626"/>
        </svg>
      </div>

      {/* TEXTO */}
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#111",
          lineHeight: 1.4,
          marginBottom: 18
        }}
      >
        {bloqueioMsg}
      </div>

      {/* BOTÃO */}
      <button
        onClick={() => setBloqueioMsg(null)}
        style={{
          width: "100%",
          background: "#111",
          color: "#fff",
          border: "none",
          padding: "12px 0",
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer"
        }}
      >
        Entendi
      </button>
    </div>
  </div>
)}



{avaliacaoSucesso && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99999
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        animation: "fadeIn 0.2s ease"
      }}
    >
      {/* ICON */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#ecfdf5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          color: "#16a34a",
          fontWeight: 900
        }}
      >
        ✓
      </div>

      {/* TEXTO */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#111",
          textAlign: "center"
        }}
      >
        Avaliação enviada!
      </div>
    </div>
  </div>
)}


{/* 🔥 STYLES */}
  <style jsx>{`
    .overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 14px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      background: ${dark 
        ? 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.3), transparent)'
        : 'linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.4), transparent)'};
    }

    .price {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;

      padding: 6px 10px;
      border-radius: 10px;

      background: ${dark 
        ? 'rgba(122,0,255,0.15)' 
        : 'rgba(122,0,255,0.08)'};

      border: 1px solid rgb(255, 255, 255);

      width: fit-content;
      margin-bottom: 6px;

      backdrop-filter: blur(4px);
      transition: all 0.2s ease;
    }

    .card:hover .price {
      transform: scale(1.04);
      background: ${dark 
        ? 'rgba(255, 81, 0, 0.95)' 
        : 'rgba(255, 51, 0, 0.37)'};
    }

    .nome {
      font-size: 12px;
      font-weight: 500;
      opacity: 0.95;
      color: #ffffff;

      padding: 6px 10px;
      border-radius: 10px;
      border: 1px solid rgb(255, 255, 255);

      width: fit-content;
      margin-bottom: 6px;

      backdrop-filter: blur(30px);
      transition: all 0.2s ease;
    }

    .infoBox {
      background: rgba(255,255,255,0.05);
      padding: 10px;
      border-radius: 12px;
      margin-bottom: 15px;
    }

    .tag {
      background: #eee;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 12px;
    }

    .card {
      margin-top: 10px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .card:hover {
      transform: scale(1.02);
    }

    .card img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      display: block;
    }

    .active {
      border: 2px solid #7a00ff;
      box-shadow: 0 0 10px rgba(122,0,255,0.4);
    }

    .extra {
      margin-top: 10px;
      padding: 10px;
      border-radius: 10px;
      background: dark ? '#111' : '#fff',
    }

    .selected {
      background: #7a00ff;
      color: white;
      box-shadow: 0 0 8px rgba(122,0,255,0.4);
    }

    .history {
      margin-top: 10px;
      padding: 10px;
      background: dark ? '#111' : '#fff',
      border-radius: 10px;
    }

    .cupomBox {
      margin-top: 15px;
      display: flex;
      gap: 10px;
      padding: 12px;
      border-radius: 14px;
      border: 2px solid #ff0000;
    }

    .cupomAtivo {
      margin-top: 10px;
      padding: 12px;
      border-radius: 12px;
      background: linear-gradient(90deg,#ec5353,#ec5353);
      color: white;
      display: flex;
      justify-content: space-between;
    }

    .totalBox {
      margin-top: 10px;
      padding: 14px;
      border-radius: 14px;
      background: linear-gradient(90deg,#ec5353,#ec5353);
      color: white;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    button {
      margin-top: 15px;
      padding: 16px;
      border-radius: 10px;
      background: linear-gradient(90deg,#ec5353,#ec5353);
      color: white;
      border: none;
      cursor: pointer;
    }

    button:active {
      transform: scale(0.95);
    }

    {
  .dadosGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  @media (max-width: 600px) {
    .dadosGrid {
      grid-template-columns: 1fr;
    }
  }

  .dadosGrid div {
    display: flex;
    flex-direction: column;
  }

  .dadosGrid small {
    margin-bottom: 4px;
    font-size: 12px;
    opacity: 0.6;
  }

  .dadosGrid input {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid #2a2a2a;
    outline: none;
    font-size: 14px;

    background: #0f0f0f;
    color: #fff;

    transition: all 0.2s ease;
  }

  /* 🔥 FOCUS PREMIUM */
  .dadosGrid input:focus {
    border: 1px solid #7a00ff;
    box-shadow: 0 0 0 2px rgba(122,0,255,0.25);
  }

  /* 🔥 DESABILITADO BONITO */
  .dadosGrid input:disabled {
    opacity: 0.5;
    background: #1a1a1a;
    cursor: not-allowed;
  }

  @keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.fade-slide {
  animation: fadeSlide 0.3s ease;
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
  `}</style>
    
    </div>
    </div>
  );
}