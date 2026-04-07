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
  Star
  
} from "lucide-react";




import { lightTheme, darkTheme } from "../styles/theme";

export default function Acai() {



const NAVBAR = 60;

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

  // 🔥 USER
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [logo, setLogo] = useState(null);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pedidoAberto, setPedidoAberto] = useState(null);
  const [extrasGlobais, setExtrasGlobais] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);

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
  const [abaPerfil, setAbaPerfil] = useState("menu");

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
  setAbaPerfil("menu");
}, [step]);
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
  const extrasDoProduto =
  produto?.extras?.length
    ? produto.extras
    : extrasGlobais;
  

    // 🔥 CARRINHO
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);
  const [temNotificacao, setTemNotificacao] = useState(false);
  const [editandoIndex, setEditandoIndex] = useState(null);
// 🔥 forma de pagamento
  const [formaPagamento, setFormaPagamento] = useState(null);

  
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

 // 🔥 CUPOM
  const [cupomInput, setCupomInput] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [desconto, setDesconto] = useState(0);
  const [cupons, setCupons] = useState([]);
  const [animacao, setAnimacao] = useState("slide-enter");
  const [loadingCupons, setLoadingCupons] = useState(false);


  function adicionarPorCategoria(categoria) {

  const produto = produtos.find(p => p.categoria === categoria);

  if (!produto) {
    alert("Nenhum produto disponível");
    return;
  }

  // 🍧 AÇAÍ → abre montagem
  if (categoria === "acai") {
    setProduto(produto);
    setStep(2);
    setAba("home");
    return;
  }

  // 🛒 OUTROS → adiciona direto
  const total = produto.preco || 0;

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

  
// 🔥 ENTEGRACAO DO USER ENTREGADOR



// funct voltar para aba ex:  onClick={() => voltarPara("home", 1)}

function voltarPara(abaDestino, stepDestino) {
  setAba(abaDestino);
  setStep(stepDestino);
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

    // 🔥 ESSENCIAL
    lista.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

    setProdutos(lista);
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
    // 🔒 VALIDAÇÃO
    if (!totalFinal || totalFinal <= 0) {
      alert("Carrinho vazio!");
      return;
    }

    if (!clienteNome || !clienteTelefone) {
      alert("Preencha seus dados!");
      return;
    }

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
    setPaymentId(data.payment_id);

    // 🔥 SALVA paymentId
    localStorage.setItem("paymentId", String(data.payment_id));

    console.log("PIX GERADO");

    // 🔥 CRIA PEDIDO (BLOQUEADO)
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

      // 🔥 PIX BLOQUEADO
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

      paymentId: String(data.payment_id),
      data: new Date().toISOString()
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
  if (!produto) return;

  const nomeProduto = produto.nome;

  // 🔥 GARANTE CENTAVOS
  const precoBase = Math.round(Number(produto?.preco || 0));

  const totalExtras = Object.values(extrasSelecionados)
    .flat()
    .reduce((acc, e) => acc + Math.round(Number(e.preco || 0)), 0);

  const totalItem = Math.round((precoBase + totalExtras) * quantidade);

  const extrasFinal = Object.entries(extrasSelecionados)
    .flatMap(([categoria, lista]) =>
      lista.map(e => ({
        nome: e.nome,
        preco: Math.round(Number(e.preco || 0)),
        categoria
      }))
    );

  const novoItem = {
    produto,
    quantidade,
    extras: extrasFinal,
    total: totalItem // 🔥 CENTAVOS GARANTIDO
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

  // 🔥 SÓ AÇAÍ
  if (item.produto.categoria !== "acai") return;

  // 🔥 CLONA EXTRAS
  const extrasClonados = (item.extras || []).map(e => ({
    nome: e.nome,
    preco: Number(e.preco || 0)
  }));

  // 🔥 ORGANIZA POR CATEGORIA
  const extrasOrganizados = {};

  extrasClonados.forEach(extra => {
    extrasDoProduto.forEach(grupo => {
      const existe = (grupo.itens || []).find(i => i.nome === extra.nome);

      if (existe) {
        if (!extrasOrganizados[grupo.categoria]) {
          extrasOrganizados[grupo.categoria] = [];
        }

        extrasOrganizados[grupo.categoria].push(extra);
      }
    });
  });

  // 💥 ESSA PARTE FALTAVA

  setProduto(item.produto);
  setQuantidade(item.quantidade || 1);
  setExtrasSelecionados(extrasOrganizados);

  setEditandoIndex(index);

  // 🔥 ABRE TELA DE EXTRAS
  setAba("home");
  setStep(2);

  // 🔥 CARREGA DADOS
  setProduto(item.produto);
  setQuantidade(Number(item.quantidade || 1));
  setExtrasSelecionados(extrasOrganizados); // ✅ CORRETO

  setEditandoIndex(index);
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
        (acc, e) => acc + e.preco,
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

async function aplicarMelhorCupom() {

  // 🔥 1. BLOQUEIA SE CARRINHO VAZIO
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

    // 🔥 mínimo corrigido (centavos)
    if (totalPedido < Number(c.minimo || 0) * 100) return false;

    // 🔥 NÃO DEIXA USAR SE JÁ USOU
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

function alterarExtra(categoria, item, delta) {
  setExtrasSelecionados(prev => {

    const lista = prev[categoria] || [];

    const index = lista.findIndex(e => e.nome === item.nome);

    let novaLista = [...lista];

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

      novaLista.push({
        ...item,
        qtd: 1
      });

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

  if (!user) {
    localStorage.setItem("redirectAfterLogin", "finalizar");
    router.push("/login");
    return;
  }

  if (loadingPedido) return;

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





  if (formaPagamento === "pix") {
    setMostrarPagamento(true);
    return;
  }



  if (!user && authReady) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff"
    }}>
      <TelaLogin />
    </div>
  );
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
      total: Math.round(Number(totalFinal || 0)), // 🔥 CENTAVOS
      formaPagamento,
      status: "preparando",
      data: new Date().toISOString()
    };

    await setDoc(doc(db, "pedidos", pedidoId), pedido);

    localStorage.setItem("pedidoAtual", pedidoId);

    // 🔥 WHATSAPP PROFISSIONAL
    let mensagem = `🛒 *Pedido #${codigo}*\n\n`;

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

  mensagem += `\n💰 R$ ${(Number(item.total || 0) / 100).toFixed(2)}\n\n`;
});

    mensagem += `━━━━━━━━━━━━━━━\n`;

    // 🔥 CORREÇÃO AQUI
    mensagem += `💵 *Total: R$ ${(Number(totalFinal || 0) / 100).toFixed(2)}*\n\n`;

    mensagem += `💳 Pagamento: ${formaPagamento}\n\n`;

    mensagem += `📍 *Endereço:*\n`;
    mensagem += `${clienteEndereco}, Nº ${clienteNumeroCasa}\n\n`;

    mensagem += `👤 *Cliente:*\n`;
    mensagem += `${clienteNome}\n📞 ${clienteTelefone}`;

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




<div style={{
  minHeight: "100dvh",
  background: themeAtual.background,
  color: themeAtual.text
}}>

  <div style={{
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    paddingBottom: 0
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
    zIndex: 9999
  }}>
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 16,
      width: 350,
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
    }}>

      <h3 style={{ marginBottom: 10 }}> Forma de pagamento</h3>

      {/* PIX */}
      <button
        onClick={() => {
          if (loadingPix) return;

          setFormaPagamento("pix");

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
        onClick={() => setFormaPagamento("dinheiro")}
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
        onClick={() => setFormaPagamento("cartao")}
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
           Valor: {formatarReal(totalFinal)}
          </strong>
          </p>

          {!qrBase64 && (
            <p style={{ marginTop: 10 }}>Gerando QR Code...</p>
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

          // 🔥 PIX NÃO FINALIZA PEDIDO
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
            return; // 🔥 ESSENCIAL
          }

          try {
            setLoadingPedido(true);
            await finalizarPedido("pendente");
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
   position: "sticky",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  }}>
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 16,
      textAlign: "center"
    }}>

      <h2> Pagamento confirmado</h2>

      <button
  onClick={() => {

    enviarWhatsApp(pedidoPago);

    // 🔥 AGORA SIM LIMPA TUDO
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
        maxWidth: 420,
        margin: "0 auto",
        padding: "env(safe-area-inset-top) 16px 10px",
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      {/* TOPO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* ENDEREÇO */}
        <div
          onClick={() => {
            setAba("perfil");
            setStep(4);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer"
          }}
        >
          <MapPin size={16} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#999"
              }}
            >
              ENTREGAR EM
            </span>

            <strong style={{ fontSize: 13 }}>
              {clienteEndereco
                ? `${clienteEndereco}${clienteNumeroCasa ? ", " + clienteNumeroCasa : ""}`
                : "Adicionar endereço"}
            </strong>
          </div>
        </div>

        {/* NOTIFICAÇÃO */}
        <div
          onClick={() => {
            setAba("notificacao");
            setStep(7);
          }}
          style={{
            position: "relative",
            cursor: "pointer"
          }}
        >
          <Bell size={20} />

          {temNotificacao && (
            <div
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ea1d2c"
              }}
            />
          )}
        </div>
      </div>

      {/* TITULO */}
      <div style={{ marginTop: 16 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          Peça seu açaí
        </h1>

        <h1
          style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            color: "#ea1d2c"
          }}
        >
          favorito hoje
        </h1>

        <p
          style={{
            marginTop: 6,
            fontSize: 14,
            color: "#666"
          }}
        >
          Qualidade, sabor e entrega rápida pertinho de você.
        </p>
      </div>

      {/* BUSCA */}
      <div
        onClick={() => {
          setAba("busca");
          setStep(10);
        }}
        style={{
          marginTop: 14,
          background: "#f5f5f5",
          borderRadius: 14,
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer"
        }}
      >
        <Search size={18} color="#999" />
        <span style={{ color: "#999", fontSize: 14 }}>
          Buscar por produtos
        </span>
      </div>

      {/* CATEGORIAS */}
  <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)", // 🔥 ESSENCIAL
  gap: 10,
  marginTop: 14
}}>

  {[
    { nome: "Açaí", icone: <IceCream />, cor: "#6b21a8", categoria: "acai" },
    { nome: "Promoções", icone: <Tag />, cor: "#9333ea", categoria: "promocoes" },
    { nome: "Bebidas", icone: <CupSoda />, cor: "#7c3aed", categoria: "bebidas" },
    { nome: "Combos", icone: <Star />, cor: "#5b21b6", categoria: "combos" }
  ].map((c, i) => (
    
    <div
      key={i}
      onClick={() => {
      setCategoriaSelecionada(c.categoria);
      setStep(4);
      }}
      style={{
        background: "#f4f4f5",
        borderRadius: 16,
        padding: 10,
        textAlign: "center",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >

      <div style={{
        color: c.cor,
        marginBottom: 6
      }}>
        {c.icone}
      </div>

      <span style={{
        fontSize: 12,
        fontWeight: 500
      }}>
        {c.nome}
      </span>

    </div>

  ))}

</div>

      {/* BANNER */}
<div style={{
  marginTop: 16,
  borderRadius: 20,
  overflow: "hidden",
  position: "relative"
}}>

  <img
    src="/t1.jpg"
    style={{
      width: "100%",
      height: 150, // 🔥 IMPORTANTE
      objectFit: "cover"
    }}
  />

  {/* TEXTO SOBRE O BANNER */}
  <div style={{
    position: "absolute",
    left: 16,
    top: 20,
    color: "#fff"
  }}>
    <strong style={{ fontSize: 18 }}>
      Ofertas especiais
    </strong>

    <p style={{ fontSize: 12, marginTop: 4 }}>
      Descontos imperdíveis hoje
    </p>

    <button style={{
      marginTop: 8,
      padding: "6px 12px",
      borderRadius: 10,
      border: "none",
      background: "#c91508",
      fontSize: 12,
      cursor: "pointer"
    }}>
      Ver ofertas
    </button>
  </div>

</div>
</div>
    

    {/* LISTA */}
<div style={{
  maxWidth: 420,
  margin: "0 auto",
  
  paddingBottom: 0
}}>

  {/* HEADER */}
  <div style={{
    marginTop: 20,
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}>
    <strong style={{ fontSize: 16 }}>
      Mais pedidos
    </strong>

    <span style={{
      color: "#ea1d2c",
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer"
    }}>
      Ver todos
    </span>
  </div>


  {/* PRODUTOS */}
  <div style={{
    display: "flex",
    gap: 14,
    overflowX: "auto",
    paddingBottom: 10
  }}>

    {produtos.map((p, i) => {

      const preco =
        Number(p.preco) > 100
          ? Number(p.preco) / 100
          : Number(p.preco);

      return (
<div
  key={i}
  style={{
    minWidth: 155,
    flex: "0 0 auto",
    background: "#fff",
    borderRadius: 16,
    padding: 12,
    border: "1px solid #eee",
    position: "relative"
  }}
>

  {/* BADGE */}
  {p.maisVendido && (
    <div style={{
      position: "absolute",
      top: 8,
      left: 8,
      background: "#6b21a8",
      color: "#fff",
      fontSize: 10,
      padding: "3px 8px",
      borderRadius: 999
    }}>
      Mais pedido
    </div>
  )}

  {/* IMAGEM (CORRIGIDO) */}
  <div style={{
    display: "flex",
    justifyContent: "center",
    marginTop: 6
  }}>
    <img
      src={p.imagem}
      style={{
        width: 110,
        height: 110,
        objectFit: "contain"
      }}
    />
  </div>

  {/* NOME */}
  <div style={{
    marginTop: 8,
    fontSize: 13,
    fontWeight: 500
  }}>
    {p.nome}
  </div>

  {/* TAMANHO */}
  <div style={{
    fontSize: 11,
    color: "#777",
    marginTop: 2
  }}>
    {p.tamanho}
  </div>

  {/* PREÇO + BOTÃO */}
  <div style={{
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}>
    <strong style={{
      fontSize: 14,
      color: "#111"
    }}>
      R$ {preco.toFixed(2).replace(".", ",")}
    </strong>

    <div
      onClick={() => {
        setProduto(p);
        setStep(2);
      }}
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#ea1d2c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 18,
        cursor: "pointer"
      }}
      >
      +
       </div>
      </div>
    </div>
      );
   })}
   </div>

<div style={{
  marginTop: 16,
  background: "#f4f4f5",
  padding: "14px 10px",
  borderRadius: 20,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}}>

  {/* TEMPO */}
  <div style={{
    flex: 1,
    textAlign: "center"
  }}>
    <Clock size={20} color="#6b21a8" />

    <div style={{
      fontSize: 13,
      fontWeight: 500,
      marginTop: 4
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


  {/* DIVISOR */}
  <div style={{
    width: 1,
    height: 40,
    background: "#ddd"
  }} />


  {/* ENTREGA */}
  <div style={{
    flex: 1,
    textAlign: "center"
  }}>
    <Bike size={20} color="#6b21a8" />

    <div style={{
      fontSize: 13,
      fontWeight: 500,
      marginTop: 4
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


  {/* DIVISOR */}
  <div style={{
    width: 1,
    height: 40,
    background: "#ddd"
  }} />


  {/* SEGURANÇA */}
  <div style={{
    flex: 1,
    textAlign: "center"
  }}>
    <ShieldCheck size={20} color="#6b21a8" />

    <div style={{
      fontSize: 13,
      fontWeight: 500,
      marginTop: 4
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
  </>
)}



{aba === "home" && step === 2 && (
  <div style={{
    maxWidth: 420,
    margin: "0 auto",
    height: "100dvh",
    position: "relative",
    background: "#fff",
    overflow: "hidden"
  }}>

    {/* 🔥 IMAGEM FIXA */}
    <div style={{
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 420,
      height: 220,
      zIndex: 10
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
      <div
        onClick={() => setStep(1)}
        style={{
          position: "absolute",
          top: 20,
          left: 16,
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        ←
      </div>

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

    {/* 🔥 SCROLL (EXTRAS) */}
    <div style={{
      position: "absolute",
      top: 210,
      bottom: 120,
      left: 0,
      right: 0,
      overflowY: "auto",
      padding: 16
    }}>

      {/* QUANTIDADE */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20
      }}>
        <span>Quantidade</span>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>

          <button
            onClick={() => setQuantidade(q => Math.max(1, q - 1))}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "none",
              background: "#eee",
              fontSize: 18,
              cursor: "pointer"
            }}
          >
            −
          </button>

          <strong style={{ fontSize: 16 }}>
            {quantidade}
          </strong>

          <button
            onClick={() => setQuantidade(q => q + 1)}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "none",
              background: "#ea1d2c",
              color: "#fff",
              fontSize: 18,
              cursor: "pointer"
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
          <div key={grupo.categoria} style={{ marginBottom: 24 }}>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8
            }}>
              <strong>{grupo.categoria}</strong>

              <span style={{
                fontSize: 12,
                color: totalSelecionado >= grupo.max ? "#ea1d2c" : "#777"
              }}>
                {totalSelecionado}/{grupo.max}
              </span>
            </div>

            {grupo.itens.map(item => {

              const itemSelecionado = selecionados.find(e => e.nome === item.nome);
              const qtd = itemSelecionado?.qtd || 0;

              return (
                <div key={item.nome} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 14,
                  marginBottom: 6,
                  background: qtd > 0 ? "#fff5f5" : "#fff",
                  border: qtd > 0 ? "1px solid #ea1d2c" : "1px solid #eee"
                }}>

                  <div>
                    <strong>{item.nome}</strong>
                    <div style={{ fontSize: 12, color: "#777" }}>
                      + {formatarReal(item.preco)}
                    </div>
                  </div>

                  {/* 🔥 CONTADOR PREMIUM */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}>

                    <button
                      onClick={() => alterarExtra(grupo.categoria, item, -1)}
                      disabled={qtd === 0}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "none",
                        background: "#eee",
                        fontSize: 18,
                        opacity: qtd === 0 ? 0.4 : 1,
                        cursor: "pointer"
                      }}
                    >
                      −
                    </button>

                    <strong>{qtd}</strong>

                    <button
                      onClick={() => alterarExtra(grupo.categoria, item, 1)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "none",
                        background: "#ea1d2c",
                        color: "#fff",
                        fontSize: 18,
                        cursor: "pointer"
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

    {/* 🔥 BOTÃO FIXO CENTRALIZADO */}
    <div style={{
      position: "fixed",
      bottom: 70,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 420,
      padding: "0 16px",
      zIndex: 20
    }}>

      <button
        onClick={adicionarCarrinho}
        disabled={!podeContinuar}
        style={{
          width: "92%",
          padding: 17,
          borderRadius: 16,
          background: podeContinuar ? "#ea1d2c" : "#ccc",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        Adicionar • {formatarReal(
          (Number(produto?.preco || 0) + totalExtras) * quantidade
        )}
      </button>

    </div>

  </div>
)}

{aba === "carrinho" && step === 3 && (
  <div className="fade-slide" style={{
    maxWidth: 420,
    margin: "0 auto",
    paddingBottom: 160,
    background: "#f7f7f7"
  }}>

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

        {/* 🔥 BOTÃO VOLTAR CORRIGIDO */}
        <button
          onClick={() => {
            setAba("home");
            setStep(1);
          }}
          style={{
            border: "none",
            borderRadius: "50%",
            width: 28,
            height: 28,
            cursor: "pointer",
            background: "#eee",
            fontWeight: "bold"
          }}
        >
          ←
        </button>

        <h3 style={{ margin: 0 }}>Sacola</h3>
      </div>
    </div>

    <div style={{ padding: 16 }}>

      {/* 🛒 ITENS */}
      {carrinho.map((item, i) => (
        <div key={i} style={{
          background: "#fff",
          padding: 12,
          borderRadius: 16,
          marginBottom: 12,
          display: "flex",
          gap: 10,
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
        }}>

          <img
            src={item.produto?.imagem || item.imagem || "/acai.png"}
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              objectFit: "cover"
            }}
          />

          <div style={{ flex: 1 }}>

            <strong style={{ fontSize: 14 }}>
              {item.produto.nome}
            </strong>

            {/* EXTRAS */}
            {item.extras?.length > 0 && (
              <div style={{
                marginTop: 4,
                fontSize: 11,
                color: "#777"
              }}>
                {item.extras.map(e => `+ ${e.nome}`).join(", ")}
              </div>
            )}

            {/* AÇÕES */}
            <div style={{
              display: "flex",
              gap: 10,
              marginTop: 6,
              fontSize: 12
            }}>

              {item.produto.categoria === "acai" && (
                <span
                  onClick={() => editarItem(i)}
                  style={{ color: "#ea1d2c", cursor: "pointer" }}
                >
                  Editar
                </span>
              )}

              <span
                onClick={() => removerItem(i)}
                style={{ color: "#999", cursor: "pointer" }}
              >
                Remover
              </span>

            </div>

            {/* PREÇO */}
            <div style={{
              marginTop: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <strong style={{ fontSize: 14 }}>
                {formatarReal(item.total)}
              </strong>
            </div>

          </div>

          {/* QUANTIDADE */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4
          }}>
            <button
              onClick={() => alterarQuantidade(i, "mais")}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "none",
                background: "#ea1d2c",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              +
            </button>

            <strong>{item.quantidade}</strong>

            <button
              onClick={() => alterarQuantidade(i, "menos")}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "none",
                background: "#eee",
                cursor: "pointer"
              }}
            >
              −
            </button>
          </div>

        </div>
      ))}

      {/* CUPOM */}
      <div style={{
        background: "#fff",
        padding: 14,
        borderRadius: 16,
        marginTop: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <strong>Cupons</strong>

        <button
          onClick={aplicarMelhorCupom}
          disabled={!carrinho.length}
          style={{
            width: "93%",
            marginTop: 10,
            padding: 12,
            borderRadius: 12,
            background: carrinho.length ? "#ea1d2c" : "#ccc",
            color: "#fff",
            border: "none",
            fontWeight: "bold"
          }}
        >
          Aplicar melhor desconto
        </button>
      </div>

      {/* CUPOM ATIVO */}
      {cupomAplicado && (
        <div style={{
          marginTop: 10,
          padding: 12,
          borderRadius: 12,
          background: "#e8f5e9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <strong style={{ color: "#00c853" }}>
              {cupomAplicado.nome}
            </strong>

            <div style={{ fontSize: 12 }}>
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
              fontWeight: "bold"
            }}
          >
            Remover
          </button>
        </div>
      )}

    </div>

    {/* 🔥 RESUMO */}
    <div style={{
      position: "sticky",
      bottom: 0,
      background: "#fff",
      borderTop: "1px solid #eee",
      padding: "12px 16px",
      boxShadow: "0 -4px 12px rgba(0,0,0,0.08)"
    }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13
      }}>
        <span>Subtotal</span>
        <span>{formatarReal(total)}</span>
      </div>

      {descontoCalculado > 0 && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#00c853",
          fontSize: 13
        }}>
          <span>Desconto</span>
          <span>-{formatarReal(descontoCalculado)}</span>
        </div>
      )}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 6
      }}>
        <strong>Total</strong>
        <strong style={{ color: "#ea1d2c" }}>
          {formatarReal(totalFinal)}
        </strong>
      </div>

      <button
        onClick={() => {
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
          width: "93%",
          marginTop: 10,
          padding: 14,
          borderRadius: 16,
          background: "#ea1d2c",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          fontSize: 15,
          cursor: "pointer"
        }}
      >
        Continuar pedido
      </button>

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
  <div style={{ maxWidth: 420, margin: "0 auto", background: "#f7f7f7" }}>

    {/* HEADER */}
    <div style={{ padding: 16, background: "#fff" }}>
      <strong>Minha conta</strong>
    </div>

    <div style={{ padding: 16 }}>

      {/* ABAS */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        <button style={tab(abaPerfil==="dados")} onClick={()=>setAbaPerfil("dados")}>Dados</button>
        <button style={tab(abaPerfil==="endereco")} onClick={()=>setAbaPerfil("endereco")}>Endereço</button>
        <button style={tab(abaPerfil==="cupons")} onClick={()=>setAbaPerfil("cupons")}>Cupons</button>
        <button style={tab(abaPerfil==="seguranca")} onClick={()=>setAbaPerfil("seguranca")}>Segurança</button>
        <button style={tab(abaPerfil==="loja")} onClick={()=>setAbaPerfil("loja")}>Loja</button>
      </div>

      {/* 👤 DADOS */}
      {abaPerfil === "dados" && (
        <div style={card}>
          <strong>Dados do cliente</strong>

          <input style={input} value={clienteNome} onChange={e=>setClienteNome(e.target.value)} placeholder="Nome"/>
          <input style={input} value={clienteEmail} disabled placeholder="Email"/>
          <input style={input} value={clienteCpf} disabled placeholder="CPF"/>

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

          <button style={btn} onClick={salvarDadosCliente}>
            Salvar dados
          </button>
        </div>
      )}

      {/* 📍 ENDEREÇO ÚNICO */}
      {abaPerfil === "endereco" && (
        <div style={card}>
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

          {loadingCep && <div>Buscando CEP...</div>}

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

          <button style={btn} onClick={salvarDadosCliente}>
            Salvar endereço
          </button>
        </div>
      )}

      {/* 🎟 CUPONS */}
      {abaPerfil === "cupons" && (
        <div style={card}>
          <strong>Cupons</strong>

          {loadingCupons && <div>Carregando...</div>}

          {cupons.map((c,i)=>(
            <div key={i} style={{
              marginTop:10,
              padding:10,
              border:"1px dashed #ea1d2c",
              borderRadius:10
            }}>
              <strong>{c.codigo}</strong>
              <div>{c.valor}% desconto</div>

              <button
                style={btn}
                onClick={()=>{
                  navigator.clipboard.writeText(c.codigo);
                  alert("Copiado");
                }}
              >
                Copiar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔐 SEGURANÇA */}
      {abaPerfil === "seguranca" && (
        <div style={card}>
          <strong>Conta protegida</strong>
        </div>
      )}

      {/* 🏪 LOJA */}
      {abaPerfil === "loja" && (
        <div style={card}>
          <button style={btn} onClick={()=>{
            setAba("info");
            setStep(99);
          }}>
            Ver loja
          </button>
        </div>
      )}

      {/* LOGOUT */}
      <button
        onClick={async ()=>{
          await signOut(auth);
          router.push("/login");
        }}
        style={btnLogout}
      >
        Sair da conta
      </button>

    </div>
  </div>
)}


{aba === "pedidos" && step === 5 && (
  <div className={`fade-slide ${animacao}`} style={{
    maxWidth: 420,
    margin: "0 auto",
    paddingBottom: 140,
    background: "#f7f7f7"
  }}>

    {/* HEADER */}
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
            setAnimacao("slide-back");
            setTimeout(() => {
              setAba("home");
              setStep(1);
            }, 50);
          }}
          style={{
            border: "none",
            borderRadius: "50%",
            width: 25,
            height: 25,
            cursor: "pointer"
          }}
        >
          ←
        </button>

        <h3 style={{ margin: 0 }}>Pedidos</h3>
      </div>
    </div>

    <div style={{ padding: 16 }}>

      {/* VAZIO */}
      {pedidos.length === 0 && (
        <div style={{
          textAlign: "center",
          marginTop: 40,
          color: "#777"
        }}>
          <p style={{ fontSize: 14 }}>Você ainda não fez pedidos</p>
        </div>
      )}

      {[...pedidos].reverse().map((p, i) => {

        const primeiroItem = p.itens?.[0] || {};

        const nomePrincipal =
          primeiroItem?.produto?.nome ||
          primeiroItem?.nome ||
          "Pedido";

        const produtoReal = produtos.find(prod =>
          prod.id === primeiroItem?.produtoId ||
          prod.nome === nomePrincipal
        );

        // 🔥 STATUS CORRIGIDO
        const statusTexto =
          p.status === "aguardando_pagamento" ? "Aguardando pagamento" :
          p.status === "preparando" ? "Em preparo" :
          p.status === "saiu" ? "Saiu para entrega" :
          p.status === "entregue" ? "Entregue" :
          "Processando";

        // 🔥 COR CORRIGIDA
        const corStatus =
          p.status === "aguardando_pagamento" ? "#f97316" :
          p.status === "preparando" ? "#facc15" :
          p.status === "saiu" ? "#60a5fa" :
          p.status === "entregue" ? "#22c55e" :
          "#999";

        const nomePagamento =
          p.formaPagamento === "pix" ? "Pix" :
          p.formaPagamento === "dinheiro" ? "Dinheiro" :
          "Cartão";

        return (
          <div key={i} style={{ marginBottom: 14 }}>

            {/* DATA */}
            <div style={{
              fontSize: 12,
              color: "#777",
              marginBottom: 6
            }}>
              {new Date(p.data || Date.now()).toLocaleDateString("pt-BR")}
            </div>

            {/* CARD */}
            <div style={{
              background: "#fff",
              padding: 14,
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
            }}>

              {/* TOPO */}
              <div style={{
                display: "flex",
                gap: 10,
                alignItems: "center"
              }}>

                <img
                  src={produtoReal?.imagem || "/acai.png"}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    objectFit: "cover"
                  }}
                />

                <div style={{ flex: 1 }}>

                  <div style={{
                    fontSize: 11,
                    color: "#777"
                  }}>
                    Pedido #{p.codigo || "—"}
                  </div>

                  <strong style={{ fontSize: 14 }}>
                    {p.itens?.length === 1
                      ? nomePrincipal
                      : `${nomePrincipal} +${p.itens.length - 1}`}
                  </strong>

                  {/* STATUS */}
                  <div style={{
                    marginTop: 6,
                    display: "flex",
                    gap: 6,
                    alignItems: "center"
                  }}>

                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: corStatus
                    }} />

                    <span style={{
                      fontSize: 12,
                      color: "#555"
                    }}>
                      {statusTexto}
                    </span>

                    <span style={{
                      fontSize: 11,
                      color: "#999"
                    }}>
                      • {nomePagamento}
                    </span>

                  </div>

                </div>

              </div>

              {/* TOTAL */}
              <div style={{
                marginTop: 10,
                fontWeight: "bold",
                color: "#ea1d2c"
              }}>
                {formatarReal(p.total)}
              </div>

              {/* AÇÕES */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10
              }}>

                <button
                  onClick={() => setPedidoAberto(pedidoAberto === i ? null : i)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#666",
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                >
                  {pedidoAberto === i ? "Ocultar" : "Detalhes"}
                </button>

                <button
                  onClick={() => {

                    const novosItens = p.itens.map(item => {
                      const produtoBanco = produtos.find(prod =>
                        prod.id === item.produtoId ||
                        prod.nome === item.nome
                      );

                      return {
                        produto: {
                          id: produtoBanco?.id,
                          nome: item.produto?.nome || item.nome,
                          imagem: produtoBanco?.imagem || "",
                          preco: produtoBanco?.preco || 0
                        },
                        quantidade: item.quantidade || 1,
                        extras: item.extras || [],
                        total: item.total
                      };
                    });

                    setCarrinho(novosItens);
                    setAba("carrinho");

                    setAnimacao("slide-enter");

                    setTimeout(() => {
                      setStep(3);
                    }, 50);
                  }}
                  style={{
                    background: "#ea1d2c",
                    border: "none",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  Pedir novamente
                </button>

              </div>

              {/* DETALHES */}
              {pedidoAberto === i && (
                <div style={{
                  marginTop: 10,
                  borderTop: "1px solid #eee",
                  paddingTop: 10
                }}>

                  {p.itens.map((item, idx) => (
                    <div key={idx} style={{
                      fontSize: 13,
                      marginBottom: 6
                    }}>
                      {item.quantidade}x {item.produto?.nome || item.nome}

                      {(item.extras || []).map(e => (
                        <div key={e.nome} style={{
                          fontSize: 12,
                          color: "#777",
                          marginLeft: 8
                        }}>
                          • {e.nome}
                        </div>
                      ))}

                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>
        );
      })}

    </div>
  </div>
)}

{aba === "pagamentos" && step === 6 && (
  <>
    <div style={{
      maxWidth: 420,
      margin: "0 auto",
      height: "100dvh",
      display: "flex",
      flexDirection: "column",
      background: "#f5f5f5"
    }}>

      {/* HEADER */}
      <div style={{
        padding: 16,
        background: "#fff",
        borderBottom: "1px solid #eee"
      }}>
        <h3 style={{ margin: 0 }}>Pagamento</h3>
      </div>

      {/* CONTEÚDO */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        paddingBottom: 120
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
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              marginTop: 6
            }}>
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

                  // 🔥 NÃO abre modal aqui
                  if (p.id === "pix") {
                    gerarPix();
                  }
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
                  cursor: "pointer"
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
        bottom: 60,
        left: 0,
        right: 0,
        maxWidth: 420,
        margin: "0 auto",
        padding: "10px 16px",
        zIndex: 10
      }}>

        <button
          onClick={() => {
            if (!formaPagamento) {
              alert("Escolha a forma de pagamento");
              return;
            }

            if (formaPagamento === "pix") {
              setMostrarPagamento(true); // 🔥 único lugar que abre
              return;
            }

            finalizarPedido();
          }}
          style={{
            width: "95%",
            height: 34,
            borderRadius: 14,
            background: "#ea1d2c",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            fontSize: 15
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
            height: 28,
            borderRadius: 14,
            background: "#555555",
            color: "#fff",
            border: "none",
            marginTop: 8
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
    maxWidth: 420,
    margin: "0 auto",
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    background: "#f7f7f7"
  }}>

    {/* HEADER */}
    <div style={{
      padding: 16,
      background: "#fff",
      borderBottom: "1px solid #eee"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3 style={{ margin: 0 }}>Notificações</h3>

        <button
          onClick={marcarComoLida}
          style={{
            fontSize: 12,
            background: "none",
            border: "none",
            color: "#ea1d2c",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Marcar como lido
        </button>
      </div>
    </div>

    {/* CONTEÚDO SCROLL */}
    <div style={{
      flex: 1,
      overflowY: "auto",
      padding: 16,
      paddingBottom: 100 // 🔥 espaço pro botão + navbar
    }}>

      {/* HOJE */}
      {grupos.hoje.length > 0 && (
        <>
          <div style={{ fontSize: 12, color: "#777", marginBottom: 8 }}>
            Hoje
          </div>

          {grupos.hoje.map(n => (
            <div key={n.id} style={{
              marginBottom: 10,
              borderRadius: 16,
              background: n.lida ? "#fff" : "#fff5f5",
              padding: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              border: n.lida ? "1px solid #eee" : "1px solid #ea1d2c"
            }}>
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
            marginTop: 16,
            marginBottom: 8
          }}>
            Anteriores
          </div>

          {grupos.antigas.map(n => (
            <div key={n.id} style={{
              marginBottom: 10,
              borderRadius: 16,
              background: "#fff",
              padding: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              <NotificacaoItem n={n} />
            </div>
          ))}
        </>
      )}

      {/* VAZIO */}
      {grupos.hoje.length === 0 && grupos.antigas.length === 0 && (
        <div style={{
          textAlign: "center",
          marginTop: 60,
          color: "#777"
        }}>
          Nenhuma notificação ainda
        </div>
      )}
    </div>

    {/* BOTÃO FIXO (CORRIGIDO) */}
    <div style={{
      position: "fixed",
      bottom: 70, // 🔥 NÃO COLIDE COM NAVBAR
      left: 0,
      right: 0,
      maxWidth: 420,
      margin: "0 auto",
      padding: "0 16px",
      zIndex: 10
    }}>
      <button
        onClick={() => {
          setAba("home");
          setStep(1);
        }}
        style={{
          width: "95%",
          height: 28,
          borderRadius: 12,
          border: "none",
          background: "#ea1d2c",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 14
        }}
      >
        Voltar
      </button>
    </div>

  </div>
)}

{aba === "info" && step === 99 && (
  <div
    className={`fade-slide ${animacao}`}
    style={{
      maxWidth: 420,
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
            setAnimacao("slide-back");
            setTimeout(() => {
              setStep(1);
              setAba("home");
            }, 50);
          }}
          style={{
            background: "#f2f2f2",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32
          }}
        >
          ←
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
      <button
        onClick={() => {
          navigator.vibrate?.(10);

          setAnimacao("slide-back");

          setTimeout(() => {
            setStep(1);
            setAba("home");
          }, 50);
        }}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 16,
          border: "none",
          background: "#ea1d2c",
          color: "#fff",
          fontWeight: "bold"
        }}
      >
        Voltar
      </button>
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

{step === 4 && (
  <div style={{
    maxWidth: 420,
    margin: "0 auto",
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    background: "#f7f7f7"
  }}>

    {/* HEADER */}
    <div style={{
      padding: 16,
      background: "#fff",
      borderBottom: "1px solid #eee",
      display: "flex",
      alignItems: "center",
      gap: 10
    }}>
      <button
        onClick={() => setStep(1)}
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          border: "none",
          background: "#f4f4f5",
          cursor: "pointer"
        }}
      >
        ←
      </button>

      <h3 style={{ margin: 0, textTransform: "capitalize" }}>
        {categoriaSelecionada}
      </h3>
    </div>

    {/* LISTA */}
    <div style={{
      flex: 1,
      overflowY: "auto",
      padding: 16,
      paddingBottom: 100
    }}>

      {produtos
        .filter(p => p.categoria === categoriaSelecionada)
        .map(p => (

          <div
            key={p.id}
            onClick={() => {

              if (p.categoria === "acai") {
                setProduto(p);
                setStep(2);
                return;
              }

              setCarrinho(prev => [
                ...prev,
                {
                  produto: p,
                  quantidade: 1,
                  extras: [],
                  total: p.preco
                }
              ]);

              setStep(3);
            }}
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 12,
              marginBottom: 12,
              display: "flex",
              gap: 12,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              position: "relative"
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

            {/* IMAGEM */}
            <img
              src={p.imagem || "/acai.png"}
              style={{
                width: 80,
                height: 80,
                borderRadius: 14,
                objectFit: "cover"
              }}
            />

            {/* INFO */}
            <div style={{ flex: 1 }}>

              <strong style={{ fontSize: 15 }}>
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

              <div style={{
                marginTop: 6,
                fontWeight: "bold",
                color: "#ea1d2c"
              }}>
                {formatarReal(p.preco)}
              </div>

            </div>

          </div>

        ))}

    </div>

  </div>
)}


{/* 🔥 NAVBAR FIXA */}
<div style={{
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: 420,
  background: "#fff",
  borderTop: "1px solid #eee",
  padding: "8px 0",
  display: "flex",
  justifyContent: "space-around",
  boxShadow: "0 -5px 20px rgba(0,0,0,0.08)",
  zIndex: 999
}}>

  {/* INICIO */}
  <div
    onClick={() => {
      setAba("home");
      setStep(1);
    }}
    style={{ textAlign: "center", cursor: "pointer" }}
  >
    <Home size={22} color={aba === "home" ? "#ea1d2c" : "#999"} />
    <div style={{
      fontSize: 11,
      marginTop: 2,
      color: aba === "home" ? "#ea1d2c" : "#999"
    }}>
      Início
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

    {/* 🔥 BOLINHA QUANTIDADE */}
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
      margin-top: 10px;
      padding: 10px;
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