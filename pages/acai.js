// 🔥 REACT
import { useState, useEffect, useRef } from "react";

// 🔥 NEXT
import { useRouter } from "next/router";

// 🔥 LAYOUT
import Layout from "../components/layout";

// 🔥 FIREBASE (INSTÂNCIAS)
import { authCliente as auth, dbCliente as db } from "../services/firebaseDual";







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
  Star
  
} from "lucide-react";


import { app } from "../services/firebase-messaging";
import { getMessaging, getToken } from "firebase/messaging";




import { lightTheme, darkTheme } from "../styles/theme";

export default function Acai() {


  

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

  

  const router = useRouter();


  // 🔥 TODOS OS STATES PRIMEIRO

 const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);


const [pedidoAberto,  setPedidoAberto] = useState(null);

  // 🔥 USER
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [logo, setLogo] = useState(null);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const larguraApp = isMobile ? 420 : 1200;
  const larguraNavbar = isMobile ? 420 : 700;

  const [agoraPedidos, setAgoraPedidos] = useState(Date.now());
  
  const [extrasGlobais, setExtrasGlobais] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [pedidoPixAberto,  setPedidoPixAberto] = useState(null);

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
  const [pedidos, setPedidos] = useState([]);
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
  const [produtos, setProdutos] = useState([]);
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
  const [notificacoes, setNotificacoes] = useState([]);
  const [temNotificacao, setTemNotificacao] = useState(false);
  const [editandoIndex, setEditandoIndex] = useState(null);
// 🔥 forma de pagamento
  const [formaPagamento, setFormaPagamento] = useState(null);
 

const categoriaAtualObj = categorias.find(c => c.slug === categoriaSelecionada);
const nomeCategoriaAtual = categoriaAtualObj?.nome || categoriaSelecionada;

  
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


const [historicoBusca, setHistoricoBusca] = useState([]);
const [filtroBusca, setFiltroBusca] = useState("todos");

 // 🔥 CUPOM
  const [cupomInput, setCupomInput] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [desconto, setDesconto] = useState(0);
  const [cupons, setCupons] = useState([]);
  const [animacao, setAnimacao] = useState("slide-enter");
  const [loadingCupons, setLoadingCupons] = useState(false);

  const produtosCategoria = produtos.filter(
  p => p.categoria === categoriaSelecionada && p.ativo !== false
);


function adicionarPorCategoria(categoria) {
  const produto = produtos.find(
    p => p.categoria === categoria && p.ativo !== false
  );

  if (!produto) {
    alert("Nenhum produto disponível nessa categoria");
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
        total
      }
    ]);

    setAba("carrinho");
    setStep(3);
    return;
  }

  alert("Categoria sem regra definida");
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
    async function ativarPush() {
      try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: "BLepi8PlvHdVnZ1Y83skyi1_WTc49JgGLKQZo-eyk_Ae8UJHLLewHG_VjQbuzxI4JWHhISwGdIfdGQNWDdNiREI"
          });

          console.log("TOKEN PUSH:", token);

          if (user?.uid) {
            await setDoc(doc(db, "usuarios", user.uid), {
              pushToken: token
            }, { merge: true });
          }
        }
      } catch (e) {
        console.log("ERRO PUSH:", e);
      }
    }

    if (user) {
      ativarPush();
    }
  }, [user]);


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


  // 🔥 NOTIFICACAO
 useEffect(() => {

  const unsub = onSnapshot(collection(db, "notificacoes"), (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setNotificacoes(lista);

    const naoLidas = lista.filter(n => n.ativo && !n.lida);

    // 🔔 ATIVA SINO
    setTemNotificacao(naoLidas.length > 0);

    // 🔥 NOVA NOTIFICAÇÃO → SOM + VIBRAÇÃO
    if (naoLidas.length > 0) {

      // 🔊 SOM
      try {
        const audio = new Audio("/notify.mp3");
        audio.play();
      } catch (e) {}

      // 📳 VIBRAÇÃO (CELULAR)
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

    }

  });

  

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


// funct voltar para aba ex:  onClick={() => voltarPara("home", 1)}

function voltarPara(abaDestino, stepDestino) {
  setAba(abaDestino);
  setStep(stepDestino);
}


function renderTimeline(status) {
  const etapas = [
    { key: "recebido", label: "Recebido" },
    { key: "preparando", label: "Em preparo" },
    { key: "saiu", label: "Saiu" },
    { key: "entregue", label: "Entregue" }
  ];

  const ordem = ["recebido", "preparando", "saiu", "entregue"];

  const atualIndex = ordem.indexOf(
    status === "aguardando_pagamento" ? "recebido" : status
  );

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      marginTop: 10
    }}>
      {etapas.map((e, i) => {
        const ativo = i <= atualIndex;

        return (
          <div key={e.key} style={{
            display: "flex",
            alignItems: "center",
            flex: 1
          }}>
            {/* BOLINHA */}
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: ativo ? "#ea1d2c" : "#ddd",
              zIndex: 2
            }} />

            {/* LINHA */}
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

  return () => unsub();

}, []);

  // 🔥 EXTRAS
  const [extrasSelecionados, setExtrasSelecionados] = useState({});

 useEffect(() => {

  const unsub = onSnapshot(doc(db, "config", "loja"), (snap) => {

    if (snap.exists()) {

      const data = snap.data();

      console.log("🔥 extras globais:", data.extras);

      setExtrasGlobais(data.extras || []);

    }

  });

  return () => unsub();

}, []);


useEffect(() => {
  if (typeof window !== "undefined") {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }
}, []);


// 🔥 VARIOS CUPONS
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

// 🔥 APP instalar
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

  // 🔥 PRODUTOS FIREBASE
 useEffect(() => {
  const unsub = onSnapshot(collection(db, "produtos"), (snapshot) => {
    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const listaAtiva = lista
      .filter(p => p.ativo !== false)
      .sort((a, b) => {
        const ordemA = Number(a.ordem ?? 999999);
        const ordemB = Number(b.ordem ?? 999999);

        if (ordemA !== ordemB) return ordemA - ordemB;

        return (a.nome || "").localeCompare(b.nome || "");
      });

    setProdutos(listaAtiva);
  });

  return () => unsub();
}, []);


// 🔥 salvar pedido na aba pedidos
useEffect(() => {

  if (!user) return;

  const q = query(
    collection(db, "pedidos"),
    where("cliente.uid", "==", user.uid)
  );

  const unsub = onSnapshot(q, (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setPedidos(lista);

  });

  return () => unsub();

}, [user]);
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

    if (!u) {
      console.log("❌ usuário não logado");
      return;
    }

    try {

      const ref = doc(db, "usuarios", u.uid);

      console.log("📂 PATH:", ref.path);

      const snap = await getDoc(ref);

      console.log("📦 EXISTS:", snap.exists());
      console.log("📊 DADOS:", snap.data());

      if (snap.exists()) {
        const dados = snap.data();

        setClienteNome(dados.clienteNome || "");
        setClienteTelefone(dados.clienteTelefone || "");
        setClienteCpf(dados.clienteCpf || "");
        setClienteEmail(dados.clienteEmail || "");
        setClienteEndereco(dados.clienteEndereco || "");
        setClienteNumeroCasa(dados.clienteNumeroCasa || "");
        setClienteCep(dados.clienteCep || "");
      }

    } catch (e) {
      console.log("🔥 ERRO FIRESTORE:", e);
    }

  });

  return () => unsubscribe();
}, []);


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

// SALVAR SO NO CLIENTS

useEffect(() => {
  const saved = localStorage.getItem("carrinho");
  if (saved) {
    setCarrinho(JSON.parse(saved));
  }
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
      alert("Pedido inválido");
      return;
    }

    const totalPedido = Number(pedido.total || 0);
    const valorPix = totalPedido > 100 ? totalPedido / 100 : totalPedido;

    if (!valorPix || valorPix <= 0) {
      alert("Valor inválido para gerar Pix");
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
      alert("Erro ao gerar novo Pix");
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

  } catch (e) {
    console.log("ERRO AO GERAR NOVO PIX:", e);
    alert("Erro ao gerar novo Pix");
  }
};

// notificar

function NotificacaoItem({ n }) {

  async function marcarUmaComoLida() {
    if (n.lida) return;

    await updateDoc(doc(db, "notificacoes", n.id), {
      lida: true
    });
  }

  return (


    

    <div
      onClick={marcarUmaComoLida}
      style={{
        background: !n.lida
          ? (dark ? "rgba(147,51,234,0.15)" : "rgba(147,51,234,0.08)")
          : (dark ? "#1a1a1a" : "#fff"),
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
        position: "relative",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: !n.lida
          ? "1px solid #9333ea"
          : "1px solid transparent",
        animation: "slideUp 0.3s ease",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
      }}

      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.01)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >

      {/* 🔥 TIPO */}
      <div style={{
        fontSize: 12,
        marginBottom: 6,
        color: n.para === "todos" ? "#ea3f33" : "#fa846f3f",
        fontWeight: "bold"
      }}>
        {n.para === "todos" ? "📢 Aviso" : "📦 Pedido"}
      </div>

      {/* 🔥 IMAGEM (BANNER) */}
      {n.imagem && (
        <img
          src={n.imagem}
          onClick={(e) => {
          e.stopPropagation();

          if (n.produtoId && produtos) {

          const produtoEncontrado = produtos.find(
          p => p.id === n.produtoId
          );

          if (produtoEncontrado) {
          setProduto(produtoEncontrado);

           // 🔥 ESSAS LINHAS FALTAVAM
          setAba("home");
          setStep(2);
            }
          }
         }}

          style={{
            width: "100%",
            height: 130,
            objectFit: "cover",
            borderRadius: 12,
            marginBottom: 10,
            cursor: "pointer"
          }}
        />
      )}

      {/* 🔥 TEXTO */}
      <div style={{
        fontSize: 14,
        fontWeight: 500,
        lineHeight: "18px"
      }}>
        {n.texto}
      </div>

      {/* 🔥 DATA */}
      <div style={{
        fontSize: 11,
        opacity: 0.5,
        marginTop: 6
      }}>
        {n.data ? new Date(n.data).toLocaleString() : ""}
      </div>

      {/* 🔴 INDICADOR */}
      {!n.lida && (
        <span style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 8,
          height: 8,
          background: "#ea4833",
          borderRadius: "50%"
        }} />
      )}

    </div>
  );
}




// marca tudo como lido
async function marcarComoLida() {

  notificacoes.forEach(async (n) => {
    if (!n.lida) {
      await updateDoc(doc(db, "notificacoes", n.id), {
        lida: true
      });
    }
  });

  setTemNotificacao(false);
}




// gerar pix

const gerarPix = async () => {
  try {
    // 🔥 se veio do step 5, não deixa gerar outro pedido
    if (pedidoPixAberto) {
      console.log("Fluxo de pedido existente: gerarPix bloqueado");
      return;
    }

    // 🔒 VALIDAÇÃO
    if (!totalFinal || totalFinal <= 0) {
      alert("Carrinho vazio!");
      return;
    }

    if (!clienteNome || !clienteTelefone) {
      alert("Preencha seus dados!");
      return;
    }

    const cupomValidoAgora = await validarCupomAntes();
    if (!cupomValidoAgora) return;

    const valorPix = Number(totalFinal) / 100;

    // 🔥 ID ÚNICO
    const pedidoId = Date.now().toString();

    console.log("INICIANDO PEDIDO:", pedidoId);

    // 🔥 LIMPA ESTADOS
    setQrBase64(null);
    setQrCode(null);
    setPaymentId(null);
    setPedidoPago(null);

    // 🔥 CHAMA API PIX
    const res = await fetch("/api/pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total: valorPix,
        pedidoId
      })
    });

    const data = await res.json();

    if (!data?.payment_id) {
      alert("Erro ao gerar Pix");
      return;
    }

    // 🔥 QR CODE
    setQrBase64(data.qr_code_base64 || null);
    setQrCode(data.qr_code || null);
    setPaymentId(String(data.payment_id));
    setFormaPagamento("pix");
    setMostrarPagamento(true);

    // 🔥 SALVA paymentId
    localStorage.setItem("paymentId", String(data.payment_id));

    console.log("PIX GERADO");

    // 🔥 CRIA PEDIDO (BLOQUEADO ATÉ PAGAR)
    await setDoc(doc(db, "pedidos", pedidoId), {
      codigo: Math.floor(100000 + Math.random() * 900000),

      cliente: {
        nome: clienteNome || "Cliente",
        telefone: clienteTelefone || "",
        endereco: clienteEndereco || "",
        numero: clienteNumeroCasa || "",
        uid: user?.uid || null
      },

      itens: (carrinho || []).map(item => ({
        produtoId: item?.produto?.id || "",
        nome: item?.produto?.nome || "Produto",
        quantidade: item?.quantidade || 1,
        total: Number(item?.total || 0),

        extras: (item?.extras || []).map(e => ({
          nome: e?.nome || "",
          preco: Number(e?.preco || 0),
          categoria: e?.categoria || "Extras"
        }))
      })),

      total: Number(totalFinal || 0),

      formaPagamento: "pix",
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

      // 🔥 SALVA QR PRA REABRIR DEPOIS
      qrCode: data.qr_code || "",
      qrBase64: data.qr_code_base64 || "",

      // 🔥 SEMPRE EM CENTAVOS / DATA EM MS
      data: Date.now()
    });

    console.log("PEDIDO PIX SALVO (AGUARDANDO PAGAMENTO)");

    // 🔥 SALVA ID LOCAL
    localStorage.setItem("pedidoId", pedidoId);

    // 🔥 ATUALIZA UI
    setPedidoAtual({
      id: pedidoId,
      ativo: true
    });

    alert("PIX gerado! Pague para liberar o pedido.");

  } catch (e) {
    console.log("ERRO GERAL:", e);
    alert("Erro ao gerar Pix");
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

// 🔥 TOTAL DO CARRINHO (OFICIAL)
// 🔥 TOTAL DO CARRINHO (CENTAVOS)
const total = Array.isArray(carrinho)
  ? carrinho.reduce((acc, item) => {
      return acc + Number(item.total || 0);
    }, 0)
  : 0;

// 🔥 DESCONTO (CENTAVOS)

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

  // 🔥 NÃO DEIXA PASSAR DO TOTAL
  descontoCalculado = Math.min(descontoCalculado, totalSeguro);
}

// 🔥 TOTAL FINAL
const totalFinal = Math.max(0, total - descontoCalculado);

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
    total += Number(e.preco || 0);
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
  if (!promptInstall) return;

  promptInstall.prompt();
  await promptInstall.userChoice;

  setPromptInstall(null);
}

  // 🔥 FUNÇÕES
  function toggleExtra(categoria, item, max) {
  setExtrasSelecionados(prev => {

    const atual = prev[categoria] || [];

    const existe = atual.find(e => e.nome === item.nome);

    let novos;

    if (existe) {
      novos = atual.filter(e => e.nome !== item.nome);
    } else {

      if (atual.length >= max) return prev;

      novos = [
        ...atual,
        {
          nome: item.nome,
          preco: item.preco,
          categoria: categoria // 🔥 AQUI É A CORREÇÃO
        }
      ];
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
    alert("Aguarde... carregando usuário");
    return;
  }

  if (!user) {
    alert("Você não está logado");
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
        clienteCep
      },
      { merge: true }
    );

    alert("Dados salvos ✅");

  } catch (e) {
    console.log("ERRO REAL:", e);
    alert("Erro ao salvar ❌");
  }
}

// 🔥 buscar cep
const buscarCEP = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) return;

  try {
    setLoadingCep(true);

    const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await res.json();

    if (!data.erro) {
      setClienteEndereco(
        `${data.logradouro}, ${data.bairro}, ${data.localidade}`
      );
    }

  } catch {}

  setLoadingCep(false);
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

  const totalExtras = Object.values(extrasSelecionados)
  .flat()
  .reduce((acc, e) => {
    return acc + (Math.round(Number(e.preco || 0)) * Number(e.qtd || 1));
  }, 0);

  const totalItem = Math.round((precoBase + totalExtras) * quantidade);

  const extrasFinal = Object.entries(extrasSelecionados)
  .flatMap(([categoria, lista]) =>
    lista.map(e => ({
      nome: e.nome,
      preco: Math.round(Number(e.preco || 0)),
      categoria,
      qtd: Number(e.qtd || 1)
    }))
  );

  const novoItem = {
    produto,
    quantidade,
    extras: extrasFinal,
    total: totalItem
  };

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

  setExtrasSelecionados({});
  setQuantidade(1);

  setAba("carrinho");
  setStep(3);

  setToast({ nome: nomeProduto });
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

function validarLojaAberta() {
  if (!lojaAberta) {
    alert("🚫 Loja fechada no momento");
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
    alert("Adicione um produto antes de aplicar cupom");
    return;
  }

  if (!cupons || !cupons.length) {
    alert("Nenhum cupom disponível");
    return;
  }

  const totalPedido = Number(total || 0);
  const cpfLimpo = (clienteCpf || "").replace(/\D/g, "");
  const hoje = new Date();

  const validos = cupons.filter(c => {
    if (!c.ativo) return false;

    if (c.validade && new Date(c.validade) < hoje) return false;

    // 🔥 minimo no mesmo padrão do resto do app
    if (totalPedido < Number(c.minimo || 0)) return false;

    if (cpfLimpo && c.usos && c.usos[cpfLimpo]) return false;

    return true;
  });

  if (!validos.length) {
    alert("Nenhum cupom disponível para esse pedido");
    return;
  }

  let melhor = null;
  let maiorDesconto = 0;

  validos.forEach(c => {
    let descontoTemp = 0;

    if (c.tipo === "porcentagem") {
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

  maiorDesconto = Math.min(maiorDesconto, totalPedido);

  setCupomAplicado(melhor);
  setDesconto(maiorDesconto);

  alert(`Cupom aplicado: ${melhor.codigo || melhor.nome || "desconto"}`);
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


function alterarExtra(categoria, item, delta, max = Infinity) {
  setExtrasSelecionados(prev => {
    const lista = prev[categoria] || [];
    const index = lista.findIndex(e => e.nome === item.nome);

    let novaLista = [...lista];

    const totalAtualCategoria = lista.reduce(
      (acc, e) => acc + (e.qtd || 0),
      0
    );

    if (index >= 0) {
      const atual = novaLista[index];
      const novaQtd = (atual.qtd || 0) + delta;

      if (novaQtd <= 0) {
        novaLista.splice(index, 1);
      } else {
        novaLista[index] = {
          ...atual,
          qtd: novaQtd
        };
      }
    } else if (delta > 0) {
      if (totalAtualCategoria >= max) {
        return prev;
      }

      novaLista.push({
        ...item,
        categoria,
        qtd: 1
      });
    }

    const totalDepois = novaLista.reduce(
      (acc, e) => acc + (e.qtd || 0),
      0
    );

    if (totalDepois > max) {
      return prev;
    }

    return {
      ...prev,
      [categoria]: novaLista
    };
  });
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

  if (!user) {
    localStorage.setItem("redirectAfterLogin", "finalizar");
    router.push("/login");
    return;
  }

  if (loadingPedido) return;

  const cupomValidoAgora = await validarCupomAntes();
  if (!cupomValidoAgora) return;

  if (!carrinho.length) {
    alert("Carrinho vazio!");
    return;
  }

  if (!clienteNome || !clienteTelefone) {
    alert("Preencha seus dados!");
    setStep(4);
    return;
  }

  if (!formaPagamento) {
    alert("Escolha a forma de pagamento");
    return;
  }

 
  try {
    setLoadingPedido(true);

    const pedidoId = Date.now().toString();
    const codigo = Math.floor(100000 + Math.random() * 900000);

    const pedido = {
  codigo,
  cliente: {
    nome: clienteNome,
    telefone: clienteTelefone,
    endereco: clienteEndereco,
    numero: clienteNumeroCasa,
    uid: user?.uid || null
  },
  itens: carrinho,
  total: Math.round(Number(totalFinal || 0)),
  formaPagamento,
  status: "preparando",
  data: new Date().toISOString(),
  cupom: cupomAplicado
    ? {
        id: cupomAplicado.id,
        codigo: cupomAplicado.codigo || "",
        tipo: cupomAplicado.tipo || "",
        desconto: Number(descontoCalculado || 0)
      }
    : null
};

    await setDoc(doc(db, "pedidos", pedidoId), pedido);

    const usoRegistrado = await registrarUsoCupom();
if (!usoRegistrado) return;

    localStorage.setItem("pedidoAtual", pedidoId);

    let mensagem = ` *Pedido #${codigo}*\n\n`;

    carrinho.forEach((item, i) => {
      mensagem += `*${i + 1}. ${item.produto?.nome || item.nome || "Produto"}*\n`;
      mensagem += `Qtd: ${item.quantidade}\n`;

      if (item.extras?.length) {
        const extrasPorCategoria = {};

        (item.extras || []).forEach(e => {
          const cat = e.categoria || "Extras";

          if (!extrasPorCategoria[cat]) {
            extrasPorCategoria[cat] = [];
          }

          extrasPorCategoria[cat].push(e.nome);
        });

        Object.keys(extrasPorCategoria).forEach(cat => {
          mensagem += `\n• ${cat}:\n`;

          extrasPorCategoria[cat].forEach(nome => {
            mensagem += `  + ${nome}\n`;
          });
        });
      }

      mensagem += `\n R$ ${(Number(item.total || 0) / 100).toFixed(2)}\n\n`;
    });

    mensagem += `━━━━━━━━━━━━━━━\n`;
    mensagem += ` *Total: R$ ${(Number(totalFinal || 0) / 100).toFixed(2)}*\n\n`;
    mensagem += ` Pagamento: ${formaPagamento}\n\n`;
    mensagem += ` *Endereço:*\n`;
    mensagem += `${clienteEndereco}, Nº ${clienteNumeroCasa}\n\n`;
    mensagem += ` *Cliente:*\n`;
    mensagem += `${clienteNome}\n ${clienteTelefone}`;

    window.location.href =
      `https://wa.me/5581973119512?text=${encodeURIComponent(mensagem)}`;

    setCarrinho([]);
    setFormaPagamento(null);

    alert("Pedido enviado!");

  } catch (e) {
    console.log(e);
    alert("Erro ao finalizar pedido");
  }

  setLoadingPedido(false);
}


const enviarWhatsApp = (pedido) => {

  let mensagem = `🛒 *Pedido #${pedido.codigo}*\n\n`;

  pedido.itens.forEach((item, i) => {

    mensagem += `*${i + 1}. ${item.nome}*\n`;
    mensagem += `Qtd: ${item.quantidade}\n`;

    if (item.extras?.length) {

      const extrasPorCategoria = {};

      item.extras.forEach(e => {
        const cat = e.categoria || "Extras";

        if (!extrasPorCategoria[cat]) {
          extrasPorCategoria[cat] = [];
        }

        extrasPorCategoria[cat].push(e.nome);
      });

      Object.keys(extrasPorCategoria).forEach(cat => {
        mensagem += `\n• ${cat}:\n`;

        extrasPorCategoria[cat].forEach(nome => {
          mensagem += `  + ${nome}\n`;
        });
      });
    }

    // 🔥 CORREÇÃO AQUI
    mensagem += `\n💰 R$ ${(Number(item.total || 0) / 100).toFixed(2)}\n\n`;
  });

  mensagem += `━━━━━━━━━━━━━━━\n`;

  // 🔥 CORREÇÃO AQUI
  mensagem += `💵 *Total: R$ ${(Number(pedido.total || 0) / 100).toFixed(2)}*\n\n`;

  mensagem += `💳 Pagamento confirmado via Pix ✅\n\n`;

  mensagem += `📍 ${pedido.cliente?.endereco}, Nº ${pedido.cliente?.numero}\n\n`;

  mensagem += `👤 ${pedido.cliente?.nome}\n📞 ${pedido.cliente?.telefone}`;

  window.location.href =
    `https://wa.me/5581973119512?text=${encodeURIComponent(mensagem)}`;
};


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
    {/* 🔥 MODAL DE PAGAMENTO */}
    {/* ========================= */}
    
{mostrarPagamento && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
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
      borderRadius: 16,
      width: "100%",
      maxWidth: 350,
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      boxSizing: "border-box"
    }}>

      <h3 style={{ marginBottom: 10 }}>Forma de pagamento</h3>

      {/* PIX */}
      <button
        onClick={() => {
          if (loadingPix) return;

          setFormaPagamento("pix");

          // 🔥 se veio do step 5, NÃO gera outro pedido
          if (pedidoPixAberto) {
            return;
          }

          // 🔥 checkout normal
          setQrBase64(null);
          setQrCode(null);
          setPaymentId(null);
          gerarPix();
        }}
        style={{
          width: "93%",
          padding: 12,
          marginTop: 8,
          borderRadius: 10,
          border: "none",
          cursor: loadingPix ? "not-allowed" : "pointer",
          background: formaPagamento === "pix" ? "#ff0000" : "#eee",
          color: formaPagamento === "pix" ? "#fff" : "#000",
          fontWeight: "bold",
          opacity: loadingPix ? 0.7 : 1
        }}
      >
        {loadingPix ? "Gerando Pix..." : "⚡ Pix"}
      </button>

      {/* DINHEIRO */}
      <button
        onClick={() => {
          setFormaPagamento("dinheiro");
          setPedidoPixAberto(null);
        }}
        style={{
          width: "93%",
          padding: 12,
          marginTop: 8,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          background: formaPagamento === "dinheiro" ? "#ff0000" : "#eee",
          color: formaPagamento === "dinheiro" ? "#fff" : "#000",
          fontWeight: "bold"
        }}
      >
        Dinheiro na entrega
      </button>

      {/* CARTÃO */}
      <button
        onClick={() => {
          setFormaPagamento("cartao");
          setPedidoPixAberto(null);
        }}
        style={{
          width: "93%",
          padding: 12,
          marginTop: 8,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          background: formaPagamento === "cartao" ? "#ff0000" : "#eee",
          color: formaPagamento === "cartao" ? "#fff" : "#000",
          fontWeight: "bold"
        }}
      >
        Cartão na entrega
      </button>

      {/* PIX AREA */}
      {formaPagamento === "pix" && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <p>
            <strong>
              Valor: {pedidoPixAberto ? formatarReal(pedidoPixAberto.total) : formatarReal(totalFinal)}
            </strong>
          </p>

          {!qrBase64 && (
            <p style={{ marginTop: 10 }}>
              {pedidoPixAberto
                ? "Abrindo pagamento do pedido..."
                : "Gerando QR Code..."}
            </p>
          )}

          {qrBase64 && (
            <div style={{
              background: "#fff",
              padding: 6,
              borderRadius: 12,
              display: "inline-block",
              marginTop: 10
            }}>
              <img
                src={`data:image/png;base64,${qrBase64}`}
                style={{ width: 200 }}
              />
            </div>
          )}

          {qrCode && (
            <>
              <textarea
                value={qrCode}
                readOnly
                style={{
                  width: "80%",
                  marginTop: 12,
                  padding: 10,
                  borderRadius: 10,
                  fontSize: 12,
                  border: "1px solid #ddd"
                }}
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(qrCode);
                  alert("Pix copiado!");
                }}
                style={{
                  marginTop: 10,
                  width: "90%",
                  padding: 10,
                  borderRadius: 10,
                  border: "none",
                  background: "#ff0800",
                  color: "#fff",
                  fontWeight: "bold"
                }}
              >
                Copiar código Pix
              </button>
            </>
          )}

          <p style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
            Após o pagamento, seu pedido será confirmado automaticamente.
          </p>
        </div>
      )}

      {/* CONFIRMAR */}
      <button
        style={{
          marginTop: 20,
          width: "90%",
          padding: 12,
          borderRadius: 12,
          border: "none",
          background: "linear-gradient(90deg,#00c853,#00e676)",
          color: "#fff",
          fontWeight: "bold",
          cursor: loadingPedido ? "not-allowed" : "pointer",
          opacity: loadingPedido ? 0.7 : 1
        }}
        disabled={loadingPedido}
        onClick={async () => {
          if (!formaPagamento) {
            alert("Escolha uma forma de pagamento");
            return;
          }

          if (formaPagamento === "pix") {
            if (!paymentId) {
              alert("Erro no Pix. Gere novamente.");
              return;
            }

            if (!qrBase64) {
              alert("Aguarde o QR Code gerar");
              return;
            }

            alert("Aguardando pagamento do Pix...");
            return;
          }

          try {
            setLoadingPedido(true);
            await finalizarPedido();
          } finally {
            setLoadingPedido(false);
          }
        }}
      >
        {loadingPedido ? "Processando..." : "Confirmar Pedido"}
      </button>

      {/* CANCELAR */}
      <button
        onClick={() => {
          setMostrarPagamento(false);
          setFormaPagamento(null);
          setQrBase64(null);
          setQrCode(null);
          setPaymentId(null);
          setPedidoPixAberto(null);
        }}
        style={{
          marginTop: 10,
          background: "transparent",
          border: "none",
          color: "#999",
          cursor: "pointer",
          width: "100%"
        }}
      >
        Cancelar
      </button>

    </div>
  </div>
)}

{/* 🔥 MODAL WHATSAPP (COLOCA AQUI) */}
{pedidoPago && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
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
      borderRadius: 16,
      textAlign: "center",
      width: "100%",
      maxWidth: 320
    }}>
      <h2>Pagamento confirmado</h2>

      <button
        onClick={() => {
          enviarWhatsApp(pedidoPago);

          setCarrinho([]);
          setFormaPagamento(null);
          setQrBase64(null);
          setQrCode(null);
          setPaymentId(null);
          setMostrarPagamento(false);
          setPedidoAtual(null);
          setPedidoPago(null);
        }}
        style={{
          marginTop: 10,
          padding: 12,
          borderRadius: 10,
          border: "none",
          background: "#00c853",
          color: "#fff",
          fontWeight: "bold"
        }}
      >
        Enviar pedido no WhatsApp
      </button>
    </div>
  </div>
)}







{/* STEP 1 */}
{aba === "home" && step === 1 && (
  <>
    {/* HEADER */}
    <div
      className="fade-slide"
      style={{
        maxWidth: larguraApp,
        margin: "0 auto",
        padding: "calc(env(safe-area-inset-top) + 10px) 16px 14px",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxShadow: "0 4px 18px rgba(0,0,0,0.05)"
      }}
    >
      {/* TOPO */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
      }}>
        {/* ENDEREÇO MENOR */}
        <div
          onClick={() => {
            setAba("perfil");
            setStep(4);
            setAbaPerfil("endereco");
          }}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            minWidth: 0
          }}
        >
          <MapPin size={14} color="#666" />

          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#111",
            maxWidth: 145,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {clienteEndereco
              ? `${clienteEndereco.split(",")[0]}${clienteNumeroCasa ? ", " + clienteNumeroCasa : ""}`
              : "Adicionar endereço"}
          </span>
        </div>

        {/* NOTIFICAÇÃO */}
        <div
          onClick={() => {
            setAba("notificacao");
            setStep(7);
          }}
          style={{
            position: "relative",
            cursor: "pointer",
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "#f7f7f7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          <Bell size={18} color="#111" />

          {temNotificacao && (
            <div
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ea1d2c",
                boxShadow: "0 0 0 2px #fff"
              }}
            />
          )}
        </div>
      </div>

      {/* TÍTULO */}
      <div style={{ marginTop: 14 }}>
        <h1 style={{
          margin: 0,
          fontSize: 16,
          fontWeight: 700,
          color: "#111",
          lineHeight: 1.2
        }}>
          Peça seu açaí
        </h1>

        <h1 style={{
          margin: 0,
          fontSize: 16,
          fontWeight: 800,
          color: "#ea1d2c",
          lineHeight: 1.2
        }}>
          favorito hoje
        </h1>

        <p style={{
          marginTop: 6,
          marginBottom: 0,
          fontSize: 13,
          color: "#666",
          lineHeight: 1.3
        }}>
          Qualidade, sabor e entrega rápida pertinho de você.
        </p>
      </div>

      {/* CATEGORIAS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(4, 140px)",
        justifyContent: isMobile ? "initial" : "center",
        gap: 10,
        marginTop: 16
      }}>
        {categorias
          .filter(c =>
            ["acai", "promocoes", "bebidas", "combos"].includes(c.slug)
          )
          .sort((a, b) => {
            const ordem = ["acai", "promocoes", "bebidas", "combos"];
            return ordem.indexOf(a.slug) - ordem.indexOf(b.slug);
          })
          .map((c) => {
            const config = {
              acai: { icone: <IceCream size={18} />, cor: "#7c3aed" },
              promocoes: { icone: <Tag size={18} />, cor: "#7c3aed" },
              bebidas: { icone: <CupSoda size={18} />, cor: "#7c3aed" },
              combos: { icone: <Star size={18} />, cor: "#7c3aed" }
            };

            const item = config[c.slug];
            if (!item) return null;

            return (
              <div
                key={c.id}
                onClick={() => {
                  setCategoriaSelecionada(c.slug);
                  setAba("home");
                  setStep(9);
                }}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "12px 6px",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #f1f1f1",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.04)"
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 10,
                  background: "#f4ecff",
                  color: item.cor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 6
                }}>
                  {item.icone}
                </div>

                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#222"
                }}>
                  {c.nome}
                </span>
              </div>
            );
          })}
      </div>

      {/* BANNER */}
      <div style={{
        marginTop: 16,
        borderRadius: 22,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 10px 24px rgba(0,0,0,0.08)"
      }}>
        <img
          src="/t1.jpg"
          style={{
            width: "100%",
            height: isMobile ? 155 : 220,
            objectFit: "cover"
          }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.14) 100%)"
        }} />

        <div style={{
          position: "absolute",
          left: 16,
          top: 18,
          color: "#fff",
          maxWidth: "56%"
        }}>
          <strong style={{ fontSize: 17 }}>
            Ofertas especiais
          </strong>

          <p style={{
            fontSize: 13,
            marginTop: 6,
            marginBottom: 0,
            lineHeight: 1.2
          }}>
            Descontos imperdíveis hoje
          </p>

          <button style={{
            marginTop: 12,
            padding: "8px 14px",
            borderRadius: 999,
            border: "none",
            background: "#ea1d2c",
            color: "#fff",
            fontSize: 13,
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 8px 22px rgba(234,29,44,0.45)"
          }}>
            Ver ofertas
          </button>
        </div>
      </div>
    </div>

    {/* CONTEÚDO */}
    <div style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      background: "#fff",
      padding: "16px 10px 0",
      boxSizing: "border-box"
    }}>
      {/* TÍTULO */}
      <div style={{
        marginBottom: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 6px"
      }}>
        <strong style={{
          fontSize: 17,
          fontWeight: 700,
          color: "#111"
        }}>
          Mais pedidos
        </strong>

        <span style={{
          color: "#ea1d2c",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer"
        }}>
          Ver todos
        </span>
      </div>

      {/* PRODUTOS */}
      <div style={{
        display: "flex",
        gap: isMobile ? 10 : 14,
        overflowX: "auto",
        paddingBottom: 10,
        paddingLeft: 6,
        scrollbarWidth: "none",
        scrollBehavior: "smooth"
      }}>
        {produtos
          .filter(p => p.ativo !== false)
          .map((p, i) => {
            const preco =
              Number(p.preco) > 100
                ? Number(p.preco) / 100
                : Number(p.preco);

            return (
              <div
                key={i}
                style={{
                  minWidth: isMobile ? 122 : 170,
                  maxWidth: isMobile ? 122 : 170,
                  flex: "0 0 auto",
                  background: "#fff",
                  borderRadius: 16,
                  padding: 7,
                  border: "1px solid #f0f0f0",
                  position: "relative",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.05)"
                }}
              >
                {p.maisVendido && (
                  <div style={{
                    position: "absolute",
                    top: 6,
                    left: 6,
                    background: "#ea1d2c",
                    color: "#fff",
                    fontSize: 8,
                    padding: "3px 8px",
                    borderRadius: 20,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                    zIndex: 2
                  }}>
                    Mais vendido
                  </div>
                )}

                <div style={{
                  width: "100%",
                  height: 76,
                  borderRadius: 12,
                  background: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}>
                  <img
                    src={p.imagem || "/acai.png"}
                    style={{
                      width: 72,
                      height: 72,
                      objectFit: "contain"
                    }}
                  />
                </div>

                <div style={{
                  marginTop: 7,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#111",
                  minHeight: 32,
                  lineHeight: 1.2,
                  overflow: "hidden"
                }}>
                  {p.nome}
                </div>

                <div style={{
                  marginTop: 2,
                  fontSize: 10,
                  color: "#777",
                  minHeight: 12
                }}>
                  {p.tamanho ? `• ${p.tamanho}` : ""}
                </div>

                <div style={{
                  marginTop: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <strong style={{
                    fontSize: 12,
                    color: "#111"
                  }}>
                    R$ {preco.toFixed(2).replace(".", ",")}
                  </strong>

                  <div
                    onClick={() => {
                      if (!validarLojaAberta()) return;

                      if (categoriaTemExtras(p.categoria)) {
                        setProduto(p);
                        setAba("home");
                        setStep(2);
                        return;
                      }

                      if (categoriaVaiDiretoCarrinho(p.categoria)) {
                        setCarrinho(prev => [
                          ...prev,
                          {
                            produto: p,
                            quantidade: 1,
                            extras: [],
                            total: Number(p.preco || 0)
                          }
                        ]);
                        setAba("carrinho");
                        setStep(3);
                      }
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "#ea1d2c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 17,
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 6px 14px rgba(234,29,44,0.3)"
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* INFO BAR */}
      <div style={{
        marginTop: 18,
        background: "#fff",
        padding: isMobile ? "16px 10px" : "18px 24px",
        borderRadius: 22,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.04)"
      }}>
        <div style={{
          flex: 1,
          textAlign: "center"
        }}>
          <Clock size={20} color="#7c3aed" />
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            marginTop: 4,
            color: "#111"
          }}>
            25-35 min
          </div>
          <div style={{
            fontSize: 11,
            color: "#888"
          }}>
            Tempo de entrega
          </div>
        </div>

        <div style={{
          width: 1,
          height: 40,
          background: "#ececec"
        }} />

        <div style={{
          flex: 1,
          textAlign: "center"
        }}>
          <Bike size={20} color="#7c3aed" />
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            marginTop: 4,
            color: "#111"
          }}>
            Entrega grátis
          </div>
          <div style={{
            fontSize: 11,
            color: "#888"
          }}>
            Acima de R$30
          </div>
        </div>

        <div style={{
          width: 1,
          height: 40,
          background: "#ececec"
        }} />

        <div style={{
          flex: 1,
          textAlign: "center"
        }}>
          <ShieldCheck size={20} color="#7c3aed" />
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            marginTop: 4,
            color: "#111"
          }}>
            Compra segura
          </div>
          <div style={{
            fontSize: 11,
            color: "#888"
          }}>
            Seus dados protegidos
          </div>
        </div>
      </div>
    </div>

    <div style={{
      height: `calc(${NAVBAR}px + env(safe-area-inset-bottom) + 48px)`,
      background: "#fff"
    }} />

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
  <div style={{
    maxWidth: larguraApp,
    margin: "0 auto",
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    overflow: "hidden"
  }}>

    {/* TOPO FIXO */}
    <div style={{
      position: "relative",
      width: "100%",
      height: 220,
      flexShrink: 0
    }}>
      <img
        src={produto?.imagem || "/acai.png"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)"
      }} />

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
          top: "calc(env(safe-area-inset-top) + 10px)",
          left: 16,
          width: 42,
          height: 42,
          borderRadius: 14,
          border: "none",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          fontSize: 20,
          fontWeight: "bold",
          color: "#111"
        }}
      >
        ←
      </button>

      {/* NOME */}
      <div style={{
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        color: "#fff"
      }}>
        <h2 style={{ margin: 0 }}>
          {produto?.nome}
        </h2>
      </div>
    </div>

    {/* CONTEÚDO COM SCROLL */}
    <div style={{
      flex: 1,
      overflowY: "auto",
      padding: 16,
      paddingBottom: 140,
      boxSizing: "border-box"
    }}>

      {/* QUANTIDADE */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <span style={{ fontSize: 15, color: "#111", fontWeight: 600 }}>
          Quantidade
        </span>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          <button
            onClick={() => setQuantidade(q => Math.max(1, q - 1))}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid #dcdcdc",
              background: "#fff",
              color: "#333",
              fontSize: 20,
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            }}
          >
            -
          </button>

          <strong style={{
            fontSize: 15,
            minWidth: 18,
            textAlign: "center",
            color: "#111"
          }}>
            {quantidade}
          </strong>

          <button
            onClick={() => setQuantidade(q => q + 1)}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "none",
              background: "#ea1d2c",
              color: "#fff",
              fontSize: 20,
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* EXTRAS */}
      {extrasDoProduto.map(grupo => {
        const selecionados = extrasSelecionados?.[grupo.categoria] || [];

        const totalSelecionado = selecionados.reduce(
          (acc, e) => acc + (e.qtd || 0),
          0
        );

        return (
          <div key={grupo.categoria} style={{ marginBottom: 20 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              alignItems: "center"
            }}>
              <strong style={{ color: "#111", fontSize: 15 }}>
                {grupo.categoria}
              </strong>

              <span style={{
                fontSize: 12,
                color: totalSelecionado >= grupo.max ? "#ea1d2c" : "#777",
                fontWeight: 600
              }}>
                {totalSelecionado}/{grupo.max}
              </span>
            </div>

            {grupo.itens.map(item => {
              const itemSelecionado = selecionados.find(e => e.nome === item.nome);
              const qtd = itemSelecionado?.qtd || 0;

              return (
                <div
                  key={item.nome}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    borderRadius: 14,
                    marginBottom: 8,
                    background: "#fff",
                    border: qtd > 0 ? "1px solid #f7c8cd" : "1px solid #eee",
                    boxShadow: qtd > 0 ? "0 4px 10px rgba(234,29,44,0.06)" : "none"
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{
                      color: "#111",
                      fontSize: 14,
                      display: "block",
                      lineHeight: 1.2
                    }}>
                      {item.nome}
                    </strong>

                    <div style={{
                      fontSize: 12,
                      color: "#777",
                      marginTop: 3
                    }}>
                      + {formatarReal(item.preco)}
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginLeft: 10
                  }}>
                    <button
                      onClick={() => alterarExtra(grupo.categoria, item, -1, grupo.max)}
                      disabled={qtd === 0}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "1px solid #dcdcdc",
                        background: "#fff",
                        color: "#333",
                        fontSize: 18,
                        lineHeight: 1,
                        opacity: qtd === 0 ? 0.45 : 1,
                        cursor: qtd === 0 ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0
                      }}
                    >
                      -
                    </button>

                    <strong style={{
                      minWidth: 16,
                      textAlign: "center",
                      fontSize: 14,
                      color: "#111"
                    }}>
                      {qtd}
                    </strong>

                    <button
                      onClick={() => alterarExtra(grupo.categoria, item, 1, grupo.max)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "none",
                        background: "#ea1d2c",
                        color: "#fff",
                        fontSize: 18,
                        lineHeight: 1,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        boxShadow: "0 4px 10px rgba(234,29,44,0.18)"
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>

    {/* BOTÃO FIXO */}
    <div style={{
      position: "fixed",
      bottom: `calc(${NAVBAR}px + ${SAFE_BOTTOM} + 8px)`,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: larguraApp,
      padding: "0 16px",
      zIndex: 20,
      boxSizing: "border-box"
    }}>
      <button
        onClick={adicionarCarrinho}
        disabled={!podeContinuar}
        style={{
          width: "92%",
          height: 52,
          borderRadius: 14,
          background: podeContinuar ? "#ea1d2c" : "#d6d6d6",
          color: "#fff",
          border: "none",
          fontWeight: 700,
          fontSize: 15,
          cursor: podeContinuar ? "pointer" : "not-allowed",
          boxShadow: podeContinuar ? "0 8px 20px rgba(234,29,44,0.22)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px"
        }}
      >
        <span>Adicionar</span>
        <span>
          {formatarReal((Number(produto?.preco || 0) + totalExtras) * quantidade)}
        </span>
      </button>
    </div>

  </div>
)}

{aba === "carrinho" && step === 3 && (
  <div
    className="fade-slide"
    style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      minHeight: "100dvh",
      background: "#f7f7f7",
      paddingBottom: `calc(${NAVBAR}px + env(safe-area-inset-bottom) + 190px)`,
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
      <div
        style={{
          display: "flex",
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
            width: 42,
            height: 42,
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

        <h3 style={{ margin: 0, color: "#111" }}>Sacola</h3>
      </div>
    </div>

    <div style={{ padding: 16 }}>
      {/* ITENS */}
      {carrinho.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            padding: 14,
            borderRadius: 18,
            marginBottom: 12,
            display: "flex",
            gap: 12,
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}
        >
          <img
            src={item.produto?.imagem || item.imagem || "/acai.png"}
            style={{
              width: 72,
              height: 72,
              borderRadius: 14,
              objectFit: "cover",
              flexShrink: 0
            }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <strong
              style={{
                fontSize: 14,
                color: "#111",
                display: "block",
                lineHeight: 1.25
              }}
            >
              {item.produto?.nome || "Produto"}
            </strong>

            {item.extras?.length > 0 && (
              <div
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: "#777",
                  lineHeight: 1.35
                }}
              >
                {item.extras.map(e => `+ ${e.nome}`).join(", ")}
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 8,
                fontSize: 12
              }}
            >
              {item.produto?.categoria === "acai" && (
                <span
                  onClick={() => editarItem(i)}
                  style={{
                    color: "#ea1d2c",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  Editar
                </span>
              )}

              <span
                onClick={() => removerItem(i)}
                style={{
                  color: "#999",
                  cursor: "pointer"
                }}
              >
                Remover
              </span>
            </div>

            <div
              style={{
                marginTop: 8,
                fontWeight: 700,
                fontSize: 15,
                color: "#111"
              }}
            >
              {formatarReal(item.total)}
            </div>
          </div>

          {/* QUANTIDADE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #e8e8e8",
              borderRadius: 999,
              overflow: "hidden",
              flexShrink: 0
            }}
          >
            <button
              onClick={() => alterarQuantidade(i, "menos")}
              style={{
                width: 38,
                height: 38,
                border: "none",
                background: "#fff",
                color: "#666",
                fontSize: 20,
                cursor: "pointer"
              }}
            >
              -
            </button>

            <div
              style={{
                minWidth: 32,
                textAlign: "center",
                fontSize: 15,
                fontWeight: 700,
                color: "#111"
              }}
            >
              {item.quantidade}
            </div>

            <button
              onClick={() => alterarQuantidade(i, "mais")}
              style={{
                width: 38,
                height: 38,
                border: "none",
                background: "#ea1d2c",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer"
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* CUPOM */}
      <div
        style={{
          background: "#fff",
          padding: 14,
          borderRadius: 16,
          marginTop: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: carrinho.length ? "pointer" : "not-allowed",
          opacity: carrinho.length ? 1 : 0.65
        }}
        onClick={() => {
          if (!carrinho.length) return;
          aplicarMelhorCupom();
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 10,
              background: "#fff5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ea1d2c",
              fontWeight: 700
            }}
          >
            %
          </div>

          <strong style={{ color: "#111" }}>Adicionar cupom</strong>
        </div>

        <span style={{ color: "#999", fontSize: 22, lineHeight: 1 }}>
          ›
        </span>
      </div>

      {/* CUPOM ATIVO */}
      {cupomAplicado && (
        <div
          style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 14,
            background: "#e8f5e9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <strong style={{ color: "#00a650" }}>
              {cupomAplicado.nome}
            </strong>

            <div style={{ fontSize: 12, marginTop: 3 }}>
              Economizou {formatarReal(desconto)}
            </div>
          </div>

          <button
            onClick={() => {
              setCupomAplicado(null);
              setDesconto(0);
            }}
            style={{
              background: "none",
              border: "none",
              color: "#ea1d2c",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Remover
          </button>
        </div>
      )}
    </div>

    {/* RESUMO FIXO */}
{/* RESUMO FIXO */}
<div
  style={{
    position: "fixed",
    bottom: `calc(${NAVBAR}px + env(safe-area-inset-bottom) + ${isMobile ? 18 : 10}px)`,

    left: "50%", // 🔥 centraliza
    transform: "translateX(-50%)",

    width: "100%",
    maxWidth: larguraApp,

    padding: "0 16px", // 🔥 espaço lateral correto
    boxSizing: "border-box",

    zIndex: 20
  }}
>
  <div
    style={{
      background: "#fff",
      borderRadius: 20,
      padding: 16,
      paddingBottom: `calc(16px + env(safe-area-inset-bottom))`,
      boxShadow: "0 -4px 18px rgba(0,0,0,0.08)",
      border: "1px solid #efefef"
    }}
  >

    <div style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      color: "#555"
    }}>
      <span>Subtotal</span>
      <span>{formatarReal(total)}</span>
    </div>

    {descontoCalculado > 0 && (
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        color: "#00a650",
        fontSize: 13,
        marginTop: 6
      }}>
        <span>Desconto</span>
        <span>-{formatarReal(descontoCalculado)}</span>
      </div>
    )}

    <div style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: 8,
      alignItems: "center"
    }}>
      <strong style={{ fontSize: 15, color: "#111" }}>Total</strong>
      <strong style={{ fontSize: 16, color: "#ea1d2c" }}>
        {formatarReal(totalFinal)}
      </strong>
    </div>

    <button
  onClick={() => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "carrinho");
      router.push("/login");
      return;
    }

    if (!clienteNome || !clienteEndereco || !clienteTelefone) {
      alert("Preencha seus dados");
      setAba("perfil");
      setStep(4);
      return;
    }

    setAba("pagamentos");
    setStep(6);
  }}
  style={{
    display: "block",
    width: "calc(100% - 0px)", // 🔥 CORREÇÃO
    boxSizing: "border-box",   // 🔥 IMPORTANTE

    marginTop: 12,
    height: 52,
    borderRadius: 16,
    background: "#ea1d2c",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(234,29,44,0.22)"
  }}
>
  Continuar pedido
</button>

  </div>
</div>

    {/* ANIMAÇÃO */}
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

{aba === "perfil" && step === 4 && (
  <div style={{
    maxWidth: larguraApp,
    margin: "0 auto",
    background: "#f7f7f7",
    minHeight: "100dvh",
    paddingBottom: `calc(${NAVBAR}px + env(safe-area-inset-bottom) + 16px)`
  }}>

    {/* HEADER */}
    <div style={{
      padding: "calc(env(safe-area-inset-top) + 16px) 16px 18px",
      background: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12
      }}>
        <button
          onClick={() => {
            setAba("home");
            setStep(1);
          }}
          style={{
            width: 42,
            height: 42,
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

        <strong style={{ fontSize: 17, color: "#111" }}>
          Minha conta
        </strong>
      </div>
    </div>

    <div style={{ padding: 16 }}>

      {/* PERFIL */}
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: 18,
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 14
      }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#ea1d2c",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          fontWeight: "bold",
          boxShadow: "0 6px 18px rgba(234,29,44,0.18)",
          flexShrink: 0
        }}>
          {(clienteNome || "U").trim().charAt(0).toUpperCase()}
        </div>

        <div style={{ minWidth: 0 }}>
          <strong style={{
            display: "block",
            fontSize: 16,
            color: "#111"
          }}>
            {clienteNome || "Cliente"}
          </strong>

          <span style={{
            display: "block",
            fontSize: 13,
            color: "#777",
            marginTop: 4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%"
          }}>
            {clienteEmail || "Sem email cadastrado"}
          </span>
        </div>
      </div>

      {/* MENU CARDS */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 16
      }}>
        {[
          { id: "dados", titulo: "Meus dados", desc: "Nome, telefone e dados da conta" },
          { id: "endereco", titulo: "Meu endereço", desc: "Rua, número e localização" },
          { id: "cupons", titulo: "Meus cupons", desc: "Descontos disponíveis" },
          { id: "seguranca", titulo: "Segurança", desc: "Proteção e informações da conta" },
          { id: "loja", titulo: "Informações da loja", desc: "Saiba mais sobre a loja" }
        ].map(item => (
          <div
            key={item.id}
            onClick={() => setAbaPerfil(item.id)}
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 14,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: abaPerfil === item.id ? "1px solid #ea1d2c" : "1px solid #eee",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12
            }}
          >
            <div>
              <strong style={{
                display: "block",
                fontSize: 14,
                color: "#111"
              }}>
                {item.titulo}
              </strong>

              <span style={{
                display: "block",
                fontSize: 12,
                color: "#777",
                marginTop: 4
              }}>
                {item.desc}
              </span>
            </div>

            <span style={{
              fontSize: 20,
              color: abaPerfil === item.id ? "#ea1d2c" : "#999",
              lineHeight: 1
            }}>
              ›
            </span>
          </div>
        ))}
      </div>

      {/* CONTEÚDO */}
      {abaPerfil === "dados" && (
        <div style={{
          ...card,
          borderRadius: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <strong>Dados do cliente</strong>

          <input
            style={input}
            value={clienteNome}
            onChange={e=>setClienteNome(e.target.value)}
            placeholder="Nome"
          />

          <input
            style={input}
            value={clienteEmail}
            disabled
            placeholder="Email"
          />

          <input
            style={input}
            value={clienteCpf}
            disabled
            placeholder="CPF"
          />

          <input
            style={input}
            value={clienteTelefone}
            onChange={(e)=>{
              let v = e.target.value.replace(/\D/g,"").slice(0,11);
              v = v.length<=10
                ? v.replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{4})(\d)/,"$1-$2")
                : v.replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{5})(\d)/,"$1-$2");
              setClienteTelefone(v);
            }}
            placeholder="Telefone"
          />

          <button
            onClick={salvarDadosCliente}
            style={{
              ...btn,
              padding: "10px 14px",
              fontSize: 13,
              borderRadius: 12,
              width: "fit-content",
              alignSelf: "flex-start"
            }}
          >
            Salvar dados
          </button>
        </div>
      )}

      {abaPerfil === "endereco" && (
        <div style={{
          ...card,
          borderRadius: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <strong>Endereço</strong>

          <input
            style={input}
            placeholder="CEP"
            onChange={(e)=>{
              if(e.target.value.replace(/\D/g,"").length===8){
                buscarCEP(e.target.value);
              }
            }}
          />

          {loadingCep && (
            <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
              Buscando CEP...
            </div>
          )}

          <input
            style={input}
            value={clienteEndereco}
            onChange={(e)=>setClienteEndereco(e.target.value)}
            placeholder="Rua"
          />

          <input
            style={input}
            value={clienteNumeroCasa}
            onChange={(e)=>setClienteNumeroCasa(e.target.value)}
            placeholder="Número"
          />

          <button
            onClick={salvarDadosCliente}
            style={{
              ...btn,
              padding: "10px 14px",
              fontSize: 13,
              borderRadius: 12,
              width: "fit-content",
              alignSelf: "flex-start"
            }}
          >
            Salvar endereço
          </button>
        </div>
      )}

      {abaPerfil === "cupons" && (
        <div style={{
          ...card,
          borderRadius: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <strong>Cupons</strong>

          {loadingCupons && <div style={{ marginTop: 8 }}>Carregando...</div>}

          {cupons.map((c,i)=>(
            <div key={i} style={{
              marginTop: 10,
              padding: 12,
              border: "1px dashed #ea1d2c",
              borderRadius: 12,
              background: "#fffafa"
            }}>
              <strong>{c.codigo}</strong>
              <div style={{ marginTop: 4, fontSize: 13 }}>{c.valor}% desconto</div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <button
                  onClick={()=>{
                    navigator.clipboard.writeText(c.codigo);
                    alert("Copiado");
                  }}
                  style={{
                    padding: "8px 14px",
                    fontSize: 12,
                    borderRadius: 10,
                    background: "#ea1d2c",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Copiar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {abaPerfil === "seguranca" && (
        <div style={{
          ...card,
          borderRadius: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <strong>Conta protegida</strong>

          <div style={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10
          }}>
            <div style={{
              padding: 12,
              borderRadius: 12,
              background: "#fff",
              border: "1px solid #eee"
            }}>
              <strong style={{ display: "block", fontSize: 14, color: "#111" }}>
                Email protegido
              </strong>
              <span style={{ fontSize: 12, color: "#666", display: "block", marginTop: 4 }}>
                Seu acesso está vinculado ao email cadastrado.
              </span>
            </div>

            <div style={{
              padding: 12,
              borderRadius: 12,
              background: "#fff",
              border: "1px solid #eee"
            }}>
              <strong style={{ display: "block", fontSize: 14, color: "#111" }}>
                CPF validado
              </strong>
              <span style={{ fontSize: 12, color: "#666", display: "block", marginTop: 4 }}>
                O CPF ajuda a proteger seus cupons e seus pedidos.
              </span>
            </div>

            <div style={{
              padding: 12,
              borderRadius: 12,
              background: "#fff8f8",
              border: "1px solid #ffd9d9"
            }}>
              <strong style={{ display: "block", fontSize: 14, color: "#111" }}>
                Dica de segurança
              </strong>
              <span style={{ fontSize: 12, color: "#666", display: "block", marginTop: 4, lineHeight: 1.45 }}>
                Não compartilhe sua conta com outras pessoas e sempre confira seus dados antes de finalizar um pedido.
              </span>
            </div>
          </div>
        </div>
      )}

      {abaPerfil === "loja" && (
        <div style={{
          ...card,
          borderRadius: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <strong>Informações da loja</strong>

          <div style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.5,
            marginTop: 10,
            marginBottom: 12
          }}>
            Veja detalhes, horários, informações e apresentação da loja.
          </div>

          <button
            onClick={()=>{
              setAba("info");
              setStep(99);
            }}
            style={{
              padding: "10px 16px",
              fontSize: 13,
              borderRadius: 12,
              background: "#ea1d2c",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              width: "fit-content"
            }}
          >
            Ver loja
          </button>
        </div>
      )}

      {/* LOGIN / LOGOUT */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        {user ? (
          <button
            onClick={async () => {
              await signOut(auth);
              setUser(null);
              setAba("home");
              setStep(1);
            }}
            style={{
              padding: "10px 16px",
              fontSize: 13,
              borderRadius: 12,
              background: "#ef4444",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              width: "fit-content"
            }}
          >
            Sair da conta
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/login");
            }}
            style={{
              padding: "10px 16px",
              fontSize: 13,
              borderRadius: 12,
              background: "#ea1d2c",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              width: "fit-content"
            }}
          >
            Entrar / Cadastre-se
          </button>
        )}
      </div>

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
            width: 42,
            height: 42,
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
      {/* VAZIO */}
      {pedidos.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: 70,
            color: "#777"
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>
            Nenhum pedido ainda
          </div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            Seus pedidos aparecerão aqui.
          </div>
        </div>
      )}

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
                : "Cartão";

            const TEMPO_PIX_MS = 15 * 60 * 1000;
            const criadoEmMs = Number(p.data || 0);
            const pixPendente = p.status === "aguardando_pagamento";
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
            const tempoFormatado = `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;

            const statusTexto =
              pixExpirado
                ? "Pix expirado"
                : p.status === "aguardando_pagamento"
                ? "Aguardando pagamento"
                : p.status === "preparando"
                ? "Em preparo"
                : p.status === "saiu"
                ? "Saiu para entrega"
                : p.status === "entregue"
                ? "Entregue"
                : "Processando";

            const corStatus =
              pixExpirado
                ? "#ef4444"
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

                {/* TOTAL + BOTÕES */}
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap"
                  }}
                >
                  <strong
                    style={{
                      color: "#ea1d2c",
                      fontSize: 16
                    }}
                  >
                    {formatarReal(p.total)}
                  </strong>

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

                         // 🔥 se não tiver QR salvo, gera novo automaticamente
                         if (!p.qrBase64 || !p.qrCode) {
                         gerarNovoPixDoPedido(p);
                         };
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
                                id: produtoBanco?.id || item.produtoId || item.produto?.id || null,
                                nome: produtoBanco?.nome || item.produto?.nome || item.nome || "Produto",
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
                              total: Number(item.total || 0)
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
                    {p.itens?.map((item, idx) => (
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
                                • {e.nome}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
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
    <div style={{
      maxWidth: larguraApp,
      margin: "0 auto",
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      background: "#f5f5f5",
      paddingBottom: BOTTOM_SPACE,
      boxSizing: "border-box"
    }}>

      {/* HEADER */}
      <div style={{
        padding: "calc(env(safe-area-inset-top) + 16px) 16px 16px",
        background: "#fff",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <h3 style={{ margin: 0 }}>Pagamento</h3>
      </div>

      {/* CONTEÚDO */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        paddingBottom: 140,
        boxSizing: "border-box"
      }}>

        {/* RESUMO */}
        <div style={{
          background: "#fff",
          padding: 14,
          borderRadius: 14,
          marginBottom: 12
        }}>
          <strong>Resumo do pedido</strong>

          {carrinho.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                marginTop: 6
              }}
            >
              <span>{item.quantidade}x {item.produto.nome}</span>
              <span>{formatarReal(item.total)}</span>
            </div>
          ))}

          <div style={{ margin: "10px 0", borderTop: "1px solid #eee" }} />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold"
          }}>
            <span>Total</span>
            <span style={{ color: "#ea1d2c" }}>
              {formatarReal(totalFinal)}
            </span>
          </div>
        </div>

        {/* PAGAMENTO */}
        <div style={{
          background: "#fff",
          padding: 14,
          borderRadius: 14
        }}>
          <strong>Forma de pagamento</strong>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 12
          }}>
            {[
              { id: "pix", nome: "Pix" },
              { id: "cartao", nome: "Cartão" },
              { id: "dinheiro", nome: "Dinheiro" }
            ].map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setFormaPagamento(p.id);
                }}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  border: formaPagamento === p.id
                    ? "2px solid #ea1d2c"
                    : "1px solid #eee",
                  background: formaPagamento === p.id
                    ? "#fff5f5"
                    : "#fff",
                  cursor: "pointer",
                  fontWeight: formaPagamento === p.id ? "bold" : "normal"
                }}
              >
                {p.nome}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTÕES */}
      <div style={{
        position: "fixed",
        bottom: `calc(${NAVBAR}px + ${SAFE_BOTTOM} + 6px)`,
        left: 0,
        right: 0,
        maxWidth: larguraApp,
        margin: "0 auto",
        padding: "10px 16px",
        zIndex: 10,
        boxSizing: "border-box"
      }}>
        <button
          onClick={() => {
         if (!formaPagamento) {
        alert("Escolha uma forma de pagamento");
        return;
         }

         if (formaPagamento === "pix") {
          setQrBase64(null);
          setQrCode(null);
          setPaymentId(null);
          setMostrarPagamento(true);
          return;
          }

         finalizarPedido();
         }}
          style={{
            width: "95%",
            height: 42,
            borderRadius: 14,
            background: "#ea1d2c",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            fontSize: 15,
            cursor: "pointer"
          }}
        >
          Finalizar pedido • {formatarReal(totalFinal)}
        </button>

        <button
          onClick={() => {
            setAba("carrinho");
            setStep(3);
          }}
          style={{
            width: "95%",
            height: 36,
            borderRadius: 14,
            background: "#555555",
            color: "#fff",
            border: "none",
            marginTop: 8,
            cursor: "pointer"
          }}
        >
          Voltar ao carrinho
        </button>
      </div>
    </div>
  </>
)}
{aba === "notificacao" && step === 7 && (
  <div style={{
    maxWidth: larguraApp,
    margin: "0 auto",
    height: `calc(100dvh - ${NAVBAR}px - env(safe-area-inset-bottom))`,
    display: "flex",
    flexDirection: "column",
    background: "#f7f7f7",
    overflow: "hidden"
  }}>

    {/* HEADER */}
    <div style={{
      padding: "calc(env(safe-area-inset-top) + 14px) 16px 14px",
      background: "#fff",
      borderBottom: "1px solid #eee",
      position: "sticky",
      top: 0,
      zIndex: 20,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      flexShrink: 0
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minWidth: 0
        }}>
          <button
            onClick={() => {
              setAba("home");
              setStep(1);
            }}
            style={{
              width: 42,
              height: 42,
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

          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, color: "#111" }}>Notificações</h3>
            <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>
              Atualizações da sua conta e pedidos
            </div>
          </div>
        </div>

        <button
          onClick={marcarComoLida}
          style={{
            fontSize: 12,
            background: "#fff5f5",
            border: "1px solid #ffd7db",
            color: "#ea1d2c",
            fontWeight: 700,
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: 10,
            whiteSpace: "nowrap",
            flexShrink: 0
          }}
        >
          Marcar lido
        </button>
      </div>
    </div>

    {/* CONTEÚDO */}
    <div style={{
      flex: 1,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      padding: 16,
      boxSizing: "border-box"
    }}>

      {/* HOJE */}
      {grupos.hoje.length > 0 && (
        <>
          <div style={{
            fontSize: 12,
            color: "#777",
            fontWeight: 700,
            marginBottom: 8,
            paddingLeft: 2
          }}>
            Hoje
          </div>

          {grupos.hoje.map(n => (
            <div
              key={n.id}
              style={{
                marginBottom: 10,
                borderRadius: 16,
                background: n.lida ? "#fff" : "#fffafa",
                padding: 12,
                boxShadow: n.lida
                  ? "0 2px 8px rgba(0,0,0,0.04)"
                  : "0 4px 12px rgba(234,29,44,0.08)",
                border: n.lida ? "1px solid #eee" : "1px solid #ffd4d8"
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
          <div style={{
            fontSize: 12,
            color: "#777",
            fontWeight: 700,
            marginTop: 16,
            marginBottom: 8,
            paddingLeft: 2
          }}>
            Anteriores
          </div>

          {grupos.antigas.map(n => (
            <div
              key={n.id}
              style={{
                marginBottom: 10,
                borderRadius: 16,
                background: "#fff",
                padding: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: "1px solid #eee"
              }}
            >
              <NotificacaoItem n={n} />
            </div>
          ))}
        </>
      )}

      {/* VAZIO */}
      {grupos.hoje.length === 0 && grupos.antigas.length === 0 && (
        <div style={{
          textAlign: "center",
          marginTop: 70,
          color: "#777"
        }}>
          <div style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#111"
          }}>
            Nenhuma notificação ainda
          </div>

          <div style={{
            fontSize: 13,
            marginTop: 6
          }}>
            Quando houver novidades, elas aparecerão aqui.
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
      paddingBottom: 140,
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
    width: 42,
    height: 42,
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
          <div>Domingo: 18h às 23h20</div>
          <div>Segunda: Fechado</div>
          <div>Terça a Sábado: 18h15 às 23h20</div>
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
          width: 42,
          height: 42,
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
        .filter(p => p.categoria === categoriaSelecionada && p.ativo !== false)
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
        .filter(p => p.categoria === categoriaSelecionada && p.ativo !== false)
        .map(p => (
          <div
  key={p.id}
  onClick={() => {
    if (!validarLojaAberta()) return;

    if (categoriaTemExtras(p.categoria)) {
      setProduto(p);
      setAba("home");
      setStep(2);
      return;
    }

    if (categoriaVaiDiretoCarrinho(p.categoria)) {
      setCarrinho(prev => [
        ...prev,
        {
          produto: p,
          quantidade: 1,
          extras: [],
          total: Number(p.preco || 0)
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

  {/* BADGE */}
  {p.maisVendido && (
    <div style={{
      position: "absolute",
      top: 8,
      left: 8,
      background: "#ea1d2c",
      color: "#fff",
      fontSize: 10,
      padding: "3px 6px",
      borderRadius: 6,
      fontWeight: "bold"
    }}>
      Mais vendido
    </div>
  )}

  {/* IMAGEM PADRONIZADA */}
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

    {/* PREÇO + BOTÃO */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8
    }}>
      <span style={{
        fontWeight: "bold",
        color: "#ea1d2c",
        fontSize: 14
      }}>
        {formatarReal(p.preco)}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();

          if (!validarLojaAberta()) return;

          if (categoriaTemExtras(p.categoria)) {
            setProduto(p);
            setAba("home");
            setStep(2);
            return;
          }

          if (categoriaVaiDiretoCarrinho(p.categoria)) {
            setCarrinho(prev => [
              ...prev,
              {
                produto: p,
                quantidade: 1,
                extras: [],
                total: Number(p.preco || 0)
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
          boxShadow: "0 4px 12px rgba(234,29,44,0.3)"
        }}
      >
        +
      </button>
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
    minHeight: "100dvh",
    background: "#f7f7f7"
  }}>

    {(() => {
      const termo = busca.trim().toLowerCase();

      const produtosBusca = produtos.filter(p => {
        if (p.ativo === false) return false;

        const nome = (p.nome || "").toLowerCase();
        const descricao = (p.descricao || "").toLowerCase();
        const categoria = (p.categoria || "").toLowerCase();

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
                  width: 42,
                  height: 42,
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
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: "none",
                      background: "#e5e5e5",
                      color: "#666",
                      cursor: "pointer",
                      fontSize: 14,
                      lineHeight: 1
                    }}
                  >
                    ×
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

            {/* CATEGORIAS RÁPIDAS */}
            {!busca && (
              <div style={{
                display: "flex",
                gap: 10,
                overflowX: "auto",
                marginBottom: 14,
                scrollbarWidth: "none"
              }}>
                {categorias
                  .filter(c => ["acai", "promocoes", "bebidas", "combos"].includes(c.slug))
                  .map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setCategoriaSelecionada(c.slug);
                        setAba("home");
                        setStep(9);
                      }}
                      style={{
                        minWidth: 120,
                        background: "#fff",
                        borderRadius: 16,
                        padding: "14px 12px",
                        border: "1px solid #eee",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                        textAlign: "center",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      {c.nome}
                    </div>
                  ))}
              </div>
            )}

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

                  if (categoriaTemExtras(p.categoria)) {
                    setProduto(p);
                    setAba("home");
                    setStep(2);
                    return;
                  }

                  if (categoriaVaiDiretoCarrinho(p.categoria)) {
                    setCarrinho(prev => [
                      ...prev,
                      {
                        produto: p,
                        quantidade: 1,
                        extras: [],
                        total: Number(p.preco || 0)
                      }
                    ]);
                    setAba("carrinho");
                    setStep(3);
                  }
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
                  cursor: "pointer"
                }}
              >
                <img
                  src={p.imagem || "/acai.png"}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 14,
                    objectFit: "cover",
                    flexShrink: 0
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{
                    fontSize: 14,
                    color: "#111",
                    display: "block",
                    lineHeight: 1.25
                  }}>
                    {p.nome}
                  </strong>

                  {!!p.tamanho && (
                    <div style={{
                      fontSize: 12,
                      color: "#777",
                      marginTop: 3
                    }}>
                      • {p.tamanho}
                    </div>
                  )}

                  <div style={{
                    fontSize: 12,
                    color: "#777",
                    marginTop: 4,
                    lineHeight: 1.35
                  }}>
                    {p.descricao}
                  </div>

                  <div style={{
                    marginTop: 6,
                    color: "#ea1d2c",
                    fontWeight: 800,
                    fontSize: 15
                  }}>
                    {formatarReal(p.preco)}
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
<div style={{
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: larguraNavbar,
  background: "#fff",
  borderTop: "1px solid #eee",
  padding: `8px 0 calc(env(safe-area-inset-bottom) + 6px)`,
  display: "flex",
  justifyContent: "space-around",
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