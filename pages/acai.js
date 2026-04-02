import { useState, useEffect, useRef } from "react";

import { authCliente as auth } from "../services/firebaseDual";
import { dbCliente as db } from "../services/firebaseDual";
import { ChevronDown } from "lucide-react";
import Layout from "../components/layout";
import { useRouter } from "next/router";





// 🔥 FIREBASE
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

import {
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "firebase/auth";


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
  CreditCard
} from "lucide-react";




import { lightTheme, darkTheme } from "../styles/theme";

export default function Acai() {

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
  const [mostrarPix, setMostrarPix] = useState(false);

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
  const [extrasGlobais, setExtrasGlobais] = useState([]);

  // 🔥 PRODUTO
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const maisVendido = calcularMaisVendido(pedidos);

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


  // 🔥 FORMATACAO BRASIL CENTAVOS COM VIRGULA
  function formatarReal(valor) {
  return (valor / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

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
      console.log("🔥 extras atualizados:", snap.data().extras);

      setExtrasGlobais(snap.data().extras || []);
    }

  });

  return () => unsub();

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
  .reduce((acc, e) => acc + Number(e.preco || 0), 0);

  const podeContinuar = extrasGlobais.every(grupo => {
  const selecionados = extrasSelecionados[grupo.categoria] || [];
  return selecionados.length >= grupo.min;
  
});


const precoBase = Number(produto?.preco || 0);

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
const totalFinal = Math.max(0, total - desconto);

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



// 🔥 app atualiza pagamento


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

// 🔥 remover do carrinho
function removerItem(index) {
  const novoCarrinho = [...carrinho];
  novoCarrinho.splice(index, 1);
  setCarrinho(novoCarrinho);
}

 // 🔥 instalar app
async function instalarApp() {
  if (!promptInstall) return;

  promptInstall.prompt();
  await promptInstall.userChoice;

  setPromptInstall(null);
}

  // 🔥 FUNÇÕES
  function toggleExtra(categoria, extra, max) {
  setExtrasSelecionados(prev => {

    const atual = prev[categoria] || [];

    const existe = atual.find(e => e.nome === extra.nome);

    if (existe) {
      return {
        ...prev,
        [categoria]: atual.filter(e => e.nome !== extra.nome)
      };
    }

    if (atual.length >= max) return prev;

    return {
      ...prev,
      [categoria]: [...atual, extra]
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
async function buscarCEP(cep) {

  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) return;

  try {

    const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await res.json();

    if (!data.erro) {
      setClienteEndereco(`${data.logradouro}, ${data.bairro}`);
    } else {
      alert("CEP não encontrado ❌");
    }

  } catch (e) {
    console.log(e);
    alert("Erro ao buscar CEP");
  }
}
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

// 🔥 preço do produto (centavos)
const precoProduto = Number(produto?.preco || 0);

// precobase do produto
const precoBase = Number(produto?.preco || 0);

const totalExtras = Object.values(extrasSelecionados)
  .flat()
  .reduce((acc, e) => acc + Number(e.preco || 0), 0);

const totalItem = (precoBase + totalExtras) * quantidade;


  // 🔥 total por unidade
  const totalUnitario = precoProduto + totalExtras;

  // 🔥 total final
  const total = totalUnitario * quantidade;

 // 🔥 PEGA EXTRAS DO NOVO SISTEMA (CORRETO)
 const extrasFinal = Object.entries(extrasSelecionados)
  .flatMap(([categoria, lista]) =>
    lista.map(e => ({
      nome: e.nome,
      preco: Number(e.preco || 0),
      categoria // 🔥 vem da chave do grupo
    }))
  );

  const novoItem = {
    produto,
    quantidade,
    extras: extrasFinal,
    total // 🔥 sempre centavos
  };

  if (editandoIndex !== null) {

    // 🔥 ATUALIZA ITEM
    setCarrinho(prev => {
      const novo = [...prev];
      novo[editandoIndex] = novoItem;
      return novo;
    });

    setEditandoIndex(null);

  } else {

    // 🔥 ADICIONA NOVO
    setCarrinho(prev => [...prev, novoItem]);

  }

  // 🔥 RESET
  setExtrasSelecionados({});
  setQuantidade(1);

  // 🔥 ESSA LINHA RESOLVE TUDO
  setAba("carrinho");
  setStep(3);


  // 🔥 FEEDBACK
  setToast({ nome: nomeProduto });
  setTimeout(() => setToast(null), 2500);

  setTimeout(() => {
    setStep(3);
  }, 200);
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
    extrasGlobais.forEach(grupo => {
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

  // 🔥 BLOQUEIO LOGIN (IFOOD STYLE)
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

  // 🔥 PIX ABRE MODAL (CORRETO)
  if (formaPagamento === "pix") {
    setMostrarPagamento(true);
    return;
  }

  try {

    setLoadingPedido(true);

    const pedidoId = Date.now().toString();
    const codigo = Math.floor(100000 + Math.random() * 900000);

    const pedido = {
      codigo,

      cliente: {
        nome: clienteNome || "Cliente",
        telefone: clienteTelefone || "",
        endereco: clienteEndereco || "",
        numero: clienteNumeroCasa || "",
        uid: user?.uid || null
      },

      itens: carrinho.map(item => ({
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

      formaPagamento,
      statusPagamento: "pendente",

      status: "preparando",

      entrega: {
        aceito: false,
        status: "aguardando",
        entregadorId: null,
        localizacao: null
      },

      paymentId: null,
      data: new Date().toISOString()
    };

    await setDoc(doc(db, "pedidos", pedidoId), pedido);

    // 🔥 SALVA ID LOCAL (IMPORTANTE)
    localStorage.setItem("pedidoAtual", pedidoId);

    // 🔥 WHATSAPP
    let mensagem = `Pedido #${codigo}\n\n`;

    carrinho.forEach((item, i) => {
      mensagem += `${i + 1}. ${item.produto.nome}\n`;
      mensagem += `Qtd: ${item.quantidade}\n`;

      if (item.extras?.length) {
        mensagem += `Adicionais:\n`;
        item.extras.forEach(e => {
          mensagem += `+ ${e.nome}\n`;
        });
      }

      mensagem += `R$ ${(item.total / 100).toFixed(2)}\n\n`;
    });

    mensagem += `Total: R$ ${(totalFinal / 100).toFixed(2)}\n\n`;
    mensagem += `Pagamento: ${formaPagamento}\n\n`;
    mensagem += `${clienteNome} - ${clienteTelefone}`;

    window.location.href =
      `https://wa.me/5581973119512?text=${encodeURIComponent(mensagem)}`;

    setCarrinho([]);
    setCupomAplicado(null);
    setFormaPagamento(null);
    setMostrarPagamento(false);

    alert("Pedido enviado!");

  } catch (e) {
    console.log(e);
    alert("Erro ao finalizar pedido");
  }

  setLoadingPedido(false);
}


const enviarWhatsApp = (pedido) => {

  let mensagem = ` *Pedido #${pedido.codigo}*\n\n`;

  pedido.itens.forEach((item, i) => {
    mensagem += `*${i + 1}. ${item.nome}*\n`;
    mensagem += `Qtd: ${item.quantidade}\n`;
    mensagem += `R$ ${Number(item.total).toFixed(2)}\n\n`;
  });

  mensagem += `Total: R$ ${pedido.total}\n\n`;
  mensagem += `Pagamento confirmado via Pix ✅\n\n`;
  mensagem += `${pedido.clienteNome}\n${pedido.clienteTelefone}\n`;

  const numero = "5581973119512";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  // 🔥 REDIRECIONA DIRETO (NÃO BLOQUEIA)
  window.location.href = url;
};
  // 🔥  2 grades
  function ripple(e) {
  const circle = document.createElement("span");
  circle.style.position = "absolute";
  circle.style.background = "rgba(255,255,255,0.4)";
  circle.style.borderRadius = "50%";
  circle.style.width = "100px";
  circle.style.height = "100px";
  circle.style.left = `${e.nativeEvent.offsetX - 50}px`;
  circle.style.top = `${e.nativeEvent.offsetY - 50}px`;
  circle.style.pointerEvents = "none";

  e.currentTarget.appendChild(circle);

  setTimeout(() => circle.remove(), 400);
}
 
return (
  


  // CONTAINER
<div style={{
  minHeight: "100vh",
  background: themeAtual.background,
  color: themeAtual.text,
  display: "flex",
  justifyContent: "center",
  overflowX: "hidden",

  paddingBottom: "env(safe-area-inset-bottom)",
  paddingLeft: "env(safe-area-inset-left)",
  paddingRight: "env(safe-area-inset-right)"
}}>

  <div style={{
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    padding: "0 16px",
  }}>

    {/* 🔥 HEADER FIXO CORRIGIDO */}
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,

      paddingTop: "calc(env(safe-area-inset-top) + 14px)",
      paddingBottom: 14,

      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      background: themeAtual.background,
      zIndex: 1000
    }}>

      {/* 🔥 ESQUERDA */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flex: 1,
        paddingLeft: 16 // 🔥 mantém alinhado com container
      }}>

        {/* LOGO */}
        <img
          src={logo || "/logo.png"}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />

        {/* ENDEREÇO */}
        <div
          onClick={() => {
            setAba("perfil");
            setAbaPerfil("dados");
            setStep(4);
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <span style={{
            fontSize: 11,
            color: "#999"
          }}>
            Entregar em
          </span>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 2
          }}>
            <strong style={{
              fontSize: 15,
              color: themeAtual.text,
              maxWidth: 180,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>
              {clienteEndereco || "Adicionar endereço"}
            </strong>

            <ChevronDown size={16} color="#999" />
          </div>
        </div>

      </div>

      {/* 🔥 DIREITA */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        paddingRight: 16 // 🔥 alinhamento correto
      }}>

        {/* 🔔 NOTIFICAÇÃO */}
        <div
          onClick={() => {
            setAba("notificacao");
            setStep(7);
            setTemNotificacao(false);
            marcarComoLida();
          }}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: themeAtual.card,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer"
          }}
        >
          <Bell size={20} />

          {temNotificacao && (
            <span style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              background: "#ea1d2c",
              borderRadius: "50%"
            }} />
          )}
        </div>

        {/* 🌙 DARK MODE */}
        <div
          onClick={() => setDark(!dark)}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: themeAtual.card,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          {dark
            ? <Moon size={18} color="#fff" />
            : <Sun size={18} color="#111" />
          }
        </div>

        {/* LOGIN / SAIR */}
        <div
          onClick={() => {
            if (user) {
              sair();
            } else {
              router.push("/login");
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 20,
            background: "#ea1d2c",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 13,
            boxShadow: "0 8px 25px rgba(234,29,44,0.35)"
          }}
        >
          <LogOut size={16} />
          {user ? "Sair" : "Entrar"}
        </div>

      </div>
    </div>

    {/* 🔥 CONTEÚDO (CORREÇÃO DO EMPURRÃO) */}
    <div style={{
      paddingTop: "calc(env(safe-area-inset-top) + 90px)" // 🔥 ESSENCIAL
    }}>

      {/* TODO O RESTO DA SUA TELA AQUI */}

</div>

 <div style={{
  position: "fixed",
  bottom: 0,
  paddingBottom: "env(safe-area-inset-bottom)",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: 560,
  background: themeAtual.card,
  borderRadius: 10,
  padding: 20,
  boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "space-around",
  zIndex: 999,
  position: "fixed", 
}}>

  <div onClick={() => {
  setAba("home");
  setStep(1);
}}>
    <Home size={22} color={aba === "home" ? "#ea1d2c" : "#999"} />
  </div>

  <div onClick={() => {
  setAba("pedidos");
  setStep(5);
}}>
    <FileText size={22} color={aba === "pedidos" ? "#ea1d2c" : "#999"} />
  </div>

  <div onClick={() => {
  setAba("carrinho");
  setStep(3);
}}>
    <ShoppingCart size={22} color={aba === "carrinho" ? "#ea1d2c" : "#999"} />
  </div>

  <div onClick={() => {
  setAba("perfil");
  setStep(4);
}}>
    <User size={22} color={aba === "perfil" ? "#ea1d2c" : "#999"} />
  </div>

</div>


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

      <h3 style={{ marginBottom: 10 }}>💳 Forma de pagamento</h3>

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
          width: "100%",
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
          width: "100%",
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
        💵 Dinheiro na entrega
      </button>

      {/* CARTÃO */}
      <button
        onClick={() => setFormaPagamento("cartao")}
        style={{
          width: "100%",
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
        💳 Cartão na entrega
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
              padding: 10,
              borderRadius: 12,
              display: "inline-block",
              marginTop: 10
            }}>
              <img
                src={`data:image/png;base64,${qrBase64}`}
                style={{ width: 220 }}
              />
            </div>
          )}

          {qrCode && (
            <>
              <textarea
                value={qrCode}
                readOnly
                style={{
                  width: "100%",
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
                  width: "100%",
                  padding: 10,
                  borderRadius: 10,
                  border: "none",
                  background: "#ff0800",
                  color: "#fff",
                  fontWeight: "bold"
                }}
              >
                📋 Copiar código Pix
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
          width: "100%",
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
      textAlign: "center"
    }}>

      <h2>✅ Pagamento confirmado</h2>

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
        📲 Enviar pedido no WhatsApp
      </button>

    </div>
  </div>
)}


      
{/* STEP 1 */}
{aba === "home" && step === 1 && (
  <div
  className="fade-slide"
  style={{
  
  }}
>

    <h3 style={{
      marginBottom: 15,
      fontSize: 18,
      fontWeight: "bold"
    }}>
      Escolha seu açaí
    </h3>

    {/* LOJA FECHADA */}
    {!lojaAberta && (
      <div style={{
        background: "linear-gradient(90deg,#ea1d2c,#ff4d4d)",
        padding: 12,
        borderRadius: 14,
        marginBottom: 12,
        textAlign: "center",
        fontWeight: "bold",
        color: "#fff"
      }}>
        Loja fechada no momento
      </div>
    )}

    {/* BUSCA */}
    <div style={{ marginBottom: 12 }}>
      <input
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: "92%",
          padding: 12,
          borderRadius: 14,
          border: "none",
          outline: "none",
          background: themeAtual.card,
          color: themeAtual.text,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}
      />
    </div>

    {/* TABS */}
    <div style={{
      display: "flex",
    /*  gap: 8,*/
    /*  overflowX: "auto", */
      marginBottom: 10
  }}>

  {[
    { id: "acai", nome: "Açaí" },
    { id: "bebidas", nome: "Bebidas" },
    { id: "teste", nome: "Teste" },
    { id: "teste2", nome: "Teste2" },
    { id: "teste3", nome: "Teste3" }
  ].map(cat => (

    <button
      key={cat.id}
      onClick={() => {
        setCategoria(cat.id); // 🔥 usa ID (sem acento)
        setProduto(null);
        setSelectedId(null);
        setExtrasSelecionados({});
        setQuantidade(1);
        setStep(1);
      }}

      style={{
        padding: "2px 20px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: categoria === cat.id ? "#ea1d2c" : "#eee",
        color: categoria === cat.id ? "#fff" : "#000",
        fontWeight: categoria === cat.id ? "bold" : "normal"
      }}
    >
      {cat.nome}
    </button>

  ))}

</div>

    {/* GRID */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }}>

      {produtos
        .filter(p => {
          const nome = p.nome?.toLowerCase() || "";
          const termo = busca.toLowerCase();

          const categoriaProduto = String(p.categoria || "").trim().toLowerCase();
          const categoriaAtual = String(categoria || "").trim().toLowerCase();

          if (busca) return nome.includes(termo);
          return categoriaProduto === categoriaAtual;
        })
        .map(p => {

          return (
            <div
            key={p.id}
            style={{
            position: "relative", // 🔥 MUITO IMPORTANTE
            background: themeAtual.card,
            borderRadius: 12,
            padding: 10
            }}
              onClick={() => {

                if (!lojaAberta) {
                  alert("Loja fechada");
                  return;
                }

                setProduto(p);
                setSelectedId(p.id);
                

                 setProduto(p);
  setSelectedId(p.id);

  // 🔥categoria  BEBIDAS VAI DIRETO PRO CARRINHO
  if (p.categoria === "bebidas") {

    const total = Number(p.preco || 0);

    setCarrinho(prev => [
      ...prev,
      {
        produto: p,
        quantidade: 1,
        extras: [],
        total
      }
    ]);

    setToast({ nome: p.nome });
    setTimeout(() => setToast(null), 2000);

    // 🔥 GARANTE QUE MOSTRA O CARRINHO
    setAba("carrinho");
    setStep(3);

    return;
  }
 // 🔥 categoria acai mostra extras

      if (p.categoria === "acai") {
     setExtrasSelecionados({});
     setQuantidade(1);
     setStep(2);
      } else {
      const total = Number(p.preco || 0);

    setCarrinho(prev => [
      ...prev,
       {
      produto: p,
      quantidade: 1,
      extras: [],
      total
       }
     ]);

      setStep(3);
        }
       }}
     >
      

{/* 🔥 MAIS VENDIDO (AGORA NO LUGAR CERTO) */}
    {p.maisVendido && (
  <div style={{
      position: "absolute",
      top: 4,
      left: 6,
      background: "linear-gradient(90deg,#ff0033,#ff5a5a)",
      color: "#fff",
      padding: "5px 6px",
      borderRadius: 999,
      fontSize: 9,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: 5,
      boxShadow: "0 4px 6px rgba(255,0,51,0.4)"
    }}>
    🔥 Mais vendido
  </div>
)}

              {/* IMAGEM */}
              <img
                src={p.imagem || "/acai.png"}
                style={{
                  width: "100%",
                  height: 140,
                  objectFit: "cover"
                }}
              />

              {/* INFO */}
              <div style={{ padding: 10 }}>

                <p style={{
                  fontWeight: "bold",
                  margin: 0,
                  fontSize: 14
                }}>
                  {p.nome}
                </p>

                <p style={{
                  fontSize: 12,
                  opacity: 0.6,
                  marginTop: 4
                }}>
                  {p.descricao || "Açaí com complementos"}
                </p>

                <strong style={{
                  color: "#ea1d2c",
                  fontSize: 14
                }}>
                  {formatarReal(p.preco)}
                </strong>

              </div>

            </div>
          );
        })}

    </div>

  </div>
)}
{aba === "home" && step === 2 && (
  <div className="fade-slide">

    {/* IMAGEM */}
    <div style={{
      width: "100%",
      height: 220,
      overflow: "hidden",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20
    }}>
      <img
        src={produto?.imagem || "/acai.png"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>

    {/* INFO */}
    <div style={{ padding: 15 }}>
      <h2 style={{ margin: 0 }}>{produto?.nome}</h2>

      <p style={{ opacity: 0.7, fontSize: 14 }}>
        {produto?.descricao || "Monte seu açaí com complementos"}
      </p>

      {/* QUANTIDADE */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 15
      }}>
        <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-</button>
        <strong>{quantidade}</strong>
        <button onClick={() => setQuantidade(q => q + 1)}>+</button>
      </div>
    </div>

    {/* EXTRAS */}
    <div style={{ padding: 15 }}>
      <h4>Escolha seus adicionais</h4>

      {extrasGlobais.map(grupo => {

        const selecionados = extrasSelecionados[grupo.categoria] || [];

        return (
          <div key={grupo.categoria} style={{ marginBottom: 20 }}>

            {/* TÍTULO */}
            <h4 style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              {grupo.categoria}

              <span style={{
                fontSize: 11,
                opacity: 0.6
              }}>
                {selecionados.length}/{grupo.max}
              </span>
            </h4>

            {/* GRID */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginTop: 8
            }}>

              {grupo.itens.map(item => {

                const selected = selecionados.some(e => e.nome === item.nome);

                return (
                  <div
                    key={item.nome}
                    onClick={() => toggleExtra(grupo.categoria, item, grupo.max)}
                    style={{
                      padding: 12,
                      borderRadius: 16,
                      cursor: "pointer",
                      border: selected
                        ? "2px solid #ea1d2c"
                        : "1px solid rgba(0,0,0,0.08)",
                      background: selected
                        ? "rgba(234,29,44,0.08)"
                        : themeAtual.card,
                      transform: selected ? "scale(0.98)" : "scale(1)",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <strong>{item.nome}</strong>

                    <div style={{
                      fontSize: 12,
                      opacity: 0.6,
                      marginTop: 4
                    }}>
                      {formatarReal(item.preco)}
                    </div>
                  </div>
                );
              })}

            </div>

          </div>
        );
      })}

    </div>

   {/* TOTAL */}
<div style={{
  padding: "12px 15px",
  borderTop: "1px solid rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "space-between"
}}>
  <span style={{ opacity: 0.6 }}>Total</span>

  <strong style={{
    fontSize: 18,
    color: "#ea1d2c"
  }}>
    {formatarReal(
      (Number(produto?.preco || 0) + totalExtras) * quantidade
    )}
  </strong>
</div>

    {/* AVISO */}
    {!podeContinuar && (
      <div style={{
        margin: "10px 15px",
        padding: 10,
        borderRadius: 12,
        background: "rgba(255,61,0,0.1)",
        textAlign: "center",
        fontSize: 12,
        color: "#ff3d00",
        fontWeight: "bold"
      }}>
        Selecione os adicionais obrigatórios
      </div>
    )}

    {/* BOTÃO */}
    <div style={{
      position: "fixed",
      bottom: 90,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center"
    }}>
      <button
        onClick={adicionarCarrinho}
        disabled={!podeContinuar}
        style={{
          width: "90%",
          maxWidth: 420,
          padding: 14,
          borderRadius: 18,
          background: podeContinuar
            ? "linear-gradient(90deg,#ea1d2c,#ff4d4d)"
            : "#ccc",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          fontSize: 15,
          boxShadow: "0 6px 20px rgba(234,29,44,0.3)"
        }}
      >
        {editandoIndex !== null
          ? `Adicionar ao carrinho ${formatarReal((precoBase + totalExtras )* quantidade)}`
          : `Adicionar ao carrinho ${formatarReal((precoBase + totalExtras )* quantidade)}`
        }
      </button>
    </div>

    <div style={{ height: 110 }} />

  </div>
)}
{aba === "carrinho" && step === 3 && (
  <div className="fade-slide" style={{ padding: 15 }}>

    <h3 style={{
      marginBottom: 15,
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>
      <ShoppingBag size={20} /> Sacola
    </h3>

    {carrinho.map((item, i) => (
      <div key={i} style={{
        background: themeAtual.card,
        padding: 15,
        borderRadius: 18,
        marginBottom: 12,
        display: "flex",
        gap: 12,
        alignItems: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
      }}>

        {/* IMAGEM */}
        <img
          src={item.produto?.imagem || item.imagem || "/acai.png"}
          style={{
            width: 70,
            height: 70,
            borderRadius: 14,
            objectFit: "cover"
          }}
        />

        {/* INFO */}
        <div style={{ flex: 1 }}>

          {/* TOPO */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <strong>{item.produto.nome}</strong>

            <button
              onClick={() => removerItem(i)}
              style={{
                background: "rgba(234,29,44,0.1)",
                color: "#ea1d2c",
                border: "none",
                borderRadius: 10,
                padding: "4px 8px",
                fontSize: 11,
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Remover
            </button>
          </div>

          {/* DESCRIÇÃO */}
          <p style={{ fontSize: 13, opacity: 0.7 }}>
            {item.produto.descricao}
          </p>

          {/* EXTRAS */}
          {item.extras?.length > 0 && (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 6
            }}>
              {item.extras.map(e => (
                <span key={e.nome} style={{
                  background: "rgba(255, 0, 0, 0.1)",
                  padding: "4px 8px",
                  borderRadius: 999,
                  fontSize: 11
                }}>
                  + {e.nome} ({formatarReal(e.preco)})
                </span>
              ))}
            </div>
          )}

          {/* EDITAR */}
          {item.produto.categoria === "acai" && (
            <button
              onClick={() => editarItem(i)}
              style={{
                marginTop: 6,
                background: "rgba(255, 0, 0, 0.08)",
                border: "none",
                borderRadius: 10,
                padding: "6px 10px",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: "bold",
                color: "#ff0000"
              }}
            >
              Editar adicionais
            </button>
          )}

          {/* TOTAL */}
          <div style={{
            marginTop: 8,
            display: "flex",
            justifyContent: "space-between"
          }}>
            <span style={{ fontSize: 12 }}>
              {item.quantidade}x
            </span>

            <strong>
              {formatarReal(item.total)}
            </strong>
          </div>

        </div>

        {/* QUANTIDADE */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(0,0,0,0.05)",
          padding: "4px 8px",
          borderRadius: 10
        }}>
          <button onClick={() => alterarQuantidade(i, "menos")}>-</button>
          <strong>{item.quantidade}</strong>
          <button onClick={() => alterarQuantidade(i, "mais")}>+</button>
        </div>

      </div>
    ))}

    {/* CUPOM */}
    <div style={{
      background: themeAtual.card,
      padding: 15,
      borderRadius: 16,
      marginTop: 10
    }}>
      <strong style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
        <Tag size={16} /> Cupom
      </strong>

    <button
    onClick={aplicarMelhorCupom}
    disabled={!carrinho.length}
    style={{
    width: "100%",
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    background: carrinho.length
      ? "linear-gradient(90deg,#ec5353,#ec5353)"
      : "#ccc",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    cursor: carrinho.length ? "pointer" : "not-allowed"
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
        background: "rgba(0,255,136,0.1)",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <div>
          <strong style={{ color: "#00c853" }}>
            {cupomAplicado.nome}
          </strong>

          <small>
            Economizou {formatarReal(desconto)}
          </small>
        </div>

        <button
          onClick={() => {
            setCupomAplicado(null);
            setDesconto(0);
          }}
          style={{
            background: "#ff0033",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 10px"
          }}
        >
          X
        </button>
      </div>
    )}

    {/* RESUMO */}
    <div style={{
      background: themeAtual.card,
      padding: 15,
      borderRadius: 16,
      marginTop: 10
    }}>
      <h4>Resumo</h4>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Subtotal</span>
        <span>{formatarReal(total)}</span>
      </div>

      {descontoCalculado > 0 && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#00c853"
        }}>
          <span>Desconto</span>
          <span>-{formatarReal(descontoCalculado)}</span>
        </div>
      )}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 8
      }}>
        <strong>Total </strong>
        <strong>{formatarReal(totalFinal)}</strong>
      </div>
    </div>

    <div style={{ height: 120 }} />

    {/* BOTÃO */}
    <div style={{
      position: "fixed",
      bottom: 90,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center"
    }}>
      <button
       onClick={() => {
       if (!clienteNome || !clienteEndereco || !clienteTelefone) {
        alert("Preencha seus dados");
        setAba("perfil");
        setStep(4);
        return;
         }

       // 🔥 ESSA LINHA QUE FALTAVA
        setAba("pagamentos");
        setStep(6);
        }}
        style={{
          width: "90%",
          maxWidth: 380,
          padding: 14,
          borderRadius: 20,
          background: "linear-gradient(90deg,#ea1d2c,#ff4d4d)",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          fontSize: 15,
          boxShadow: "0 8px 25px rgba(234,29,44,0.3)"
        }}
      >
        Continuar pedido
      </button>
    </div>

  </div>
)}
{aba === "perfil" && step === 4 && (
  <div className="fade-slide" style={{ padding: 15 }}>

    {/* 🔥 MENU PERFIL */}
    {abaPerfil === "menu" && (
      <>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 15
        }}>
          <div style={{
            width: 55,
            height: 55,
            borderRadius: "50%",
            background: "#fda4af",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <User size={24} color="#fff" />
          </div>

          <div>
            <strong>{clienteNome || "Cliente"}</strong>
            <div style={{ color: "#ea1d2c", fontSize: 13 }}>
              Bem-vindo 👋
            </div>
          </div>
        </div>

        <div style={{
          background: themeAtual.card,
          padding: 16,
          borderRadius: 20
        }}>
          {[
            { nome: "Perfil", icone: <User size={16} />, acao: () => setAbaPerfil("dados") },
            { nome: "Cupons", icone: <Tag size={16} />, acao: () => setAbaPerfil("cupons") },
            { nome: "Loja", icone: <MapPin size={16} />, acao: () => setAbaPerfil("info") },
          {/*  { nome: "Favoritos", icone: <Heart size={16} /> } */}
          ].map((item, i) => (
            <div
              key={i}
              onClick={item.acao}
              style={{
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                cursor: "pointer"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                {item.icone}
                <span>{item.nome}</span>
              </div>

              <span style={{ opacity: 0.3 }}>›</span>
            </div>
          ))}
        </div>
      </>
    )}

    {/* 🔥 DADOS */}
    {abaPerfil === "dados" && (
      <>
        <h3 style={{ marginBottom: 12 }}>👤 Seus dados</h3>

        <div style={{
          background: themeAtual.card,
          padding: 12,
          borderRadius: 30,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>

          {/* NOME */}
          <div style={{ marginBottom: 12 }}>
            <small style={{ opacity: 0.6 }}>Nome</small>
            <input
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.border = "1px solid #ea1d2c"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(0,0,0,0.1)"}
            />
          </div>

          {/* CPF */}
          <div style={{ marginBottom: 12 }}>
            <small style={{ opacity: 0.6 }}>CPF</small>
            <input
              value={clienteCpf}
              disabled
              style={{ ...inputStyle, opacity: 0.6 }}
            />
          </div>

          {/* TELEFONE */}
          <div style={{ marginBottom: 12 }}>
            <small style={{ opacity: 0.6 }}>Telefone</small>
            <input
              value={clienteTelefone}
              onChange={(e) => {
                const formatado = formatarTelefone(e.target.value);
                setClienteTelefone(formatado);
              }}
              style={inputStyle}
              onFocus={(e) => e.target.style.border = "1px solid #ea1d2c"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(0,0,0,0.1)"}
            />
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: 12 }}>
            <small style={{ opacity: 0.6 }}>Email</small>
            <input
              value={clienteEmail}
              disabled
              style={{ ...inputStyle, opacity: 0.6 }}
            />
          </div>

          {/* CEP */}
          <div style={{ marginBottom: 12 }}>
            <small style={{ opacity: 0.6 }}>CEP</small>
            <input
              value={clienteCep}
              onChange={(e) => {
                const formatado = formatarCEP(e.target.value);
                setClienteCep(formatado);

                const cepLimpo = formatado.replace(/\D/g, "");
                if (cepLimpo.length === 8) buscarCEP(cepLimpo);
              }}
              style={inputStyle}
              onFocus={(e) => e.target.style.border = "1px solid #ea1d2c"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(0,0,0,0.1)"}
            />
          </div>

          {/* ENDEREÇO */}
          <div style={{ marginBottom: 12 }}>
            <small style={{ opacity: 0.6 }}>Endereço</small>
            <input
              value={clienteEndereco}
              onChange={(e) => setClienteEndereco(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.border = "1px solid #ea1d2c"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(0,0,0,0.1)"}
            />
          </div>

          {/* NÚMERO */}
          <div style={{ marginBottom: 12 }}>
            <small style={{ opacity: 0.6 }}>Número</small>
            <input
              value={clienteNumeroCasa}
              onChange={(e) => setClienteNumeroCasa(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.border = "1px solid #ea1d2c"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(0,0,0,0.1)"}
            />
          </div>

        </div>

        {/* ESPAÇO */}
        <div style={{ height: 140 }} />

        {/* BOTÕES FIXOS */}
        <div style={{
          position: "fixed",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
          width: "100%",
          maxWidth: 420,
          padding: "0 16px"
          
          }}>

   {/* SALVAR  E VOLTAR PRO MENU*/}
   <button
    onClick={() => {

    if (!clienteNome || !clienteEndereco || !clienteTelefone) {
      alert("Preencha todos os dados");
      return;
    }

    salvarDadosCliente();

    // 🔥 CORREÇÃO
    setAba("perfil");      // FORMAS CORRETA DE VOLTAR PARA MENU
    setAbaPerfil("menu");
    setStep(4);

  }}
  style={{
    width: "100%",
    height: 52,
    borderRadius: 15,
    background: "#ea1d2c",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  }}
>
  Salvar e continuar
</button>

   {/* VOLTAR */}
 <button
  onClick={() => setAbaPerfil("menu")}
  style={{
    width: "100%",
    height: 46,
    marginTop: 10,
    borderRadius: 23,
    background: "#db2525",
    color: "#fff",
    border: "none",
    fontSize: 14
  }}
>
  ← Voltar
</button>

     </div>
    </div>
    </>
    )}

  </div>
)}

{abaPerfil === "cupons" && (
  <>
    <h3>🎟️ Cupons disponíveis</h3>

    {cupons.length === 0 && <p>Nenhum cupom disponível</p>}

    {cupons.map((c, i) => (
      <div key={i} style={{
  background: themeAtual.card,
  padding: 15,
  borderRadius: 16,
  marginBottom: 10
}}>

  <strong style={{ fontSize: 16 }}>
    {c.nome || c.codigo || "Cupom"}
  </strong>

  <p style={{ margin: "6px 0" }}>
    💸 Desconto: % {c.valor || c.desconto || 0}
  </p>

  <small style={{ opacity: 0.6 }}>
    {c.descricao || "Cupom válido"}
  </small>

</div>
    ))}

    <button onClick={() => setAbaPerfil("menu")}>
      ← Voltar
    </button>
  </>
)}

{abaPerfil === "info" && (
  <div style={{
    padding: 16,
    maxWidth: 420,
    margin: "0 auto"
  }}>

    {/* 🔥 HEADER COM STATUS DESTACADO */}
    <div style={{
      marginBottom: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>

      <div>
        <h2 style={{
          margin: 0,
          fontSize: 20,
          letterSpacing: -0.5
        }}>
          Informações
        </h2>

        <span style={{
          fontSize: 12,
          opacity: 0.6
        }}>
          Açaí premium • Entrega rápida
        </span>
      </div>

      {/* 🔥 STATUS FORTE */}
      <div style={{
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: "bold",
        background: lojaAberta
          ? "rgba(22,163,74,0.15)"
          : "rgba(220,38,38,0.15)",
        color: lojaAberta ? "#16a34a" : "#dc2626"
      }}>
        {lojaAberta ? "ABERTA" : "FECHADA"}
      </div>

    </div>



    

    {/* 🔥 CARD PRINCIPAL */}
    <div style={{
      background: themeAtual.card,
      borderRadius: 22,
      padding: 18,
      boxShadow: dark
        ? "0 10px 30px rgba(0,0,0,0.6)"
        : "0 10px 30px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>

      {/* 🔥 GRID DE INFORMAÇÕES */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }}>

        {[
          { label: "Funcionamento", value: "10:00 - 23:00" },
          { label: "Entrega", value: "30 - 50 min" },
          { label: "Taxa", value: "R$ 5,00" },
          { label: "Pagamento", value: "Pix / Cartão" }
        ].map((item, i) => (
          <div key={i} style={{
            background: dark ? "#111" : "#fafafa",
            borderRadius: 14,
            padding: 12
          }}>
            <div style={{
              fontSize: 11,
              opacity: 0.6,
              marginBottom: 4
            }}>
              {item.label}
            </div>

            <strong style={{
              fontSize: 13
            }}>
              {item.value}
            </strong>
          </div>
        ))}

      </div>

      {/* 🔥 ENDEREÇO */}
      <div style={{
        borderTop: "1px solid rgba(0,0,0,0.06)",
        paddingTop: 12
      }}>
        <div style={{
          fontSize: 11,
          opacity: 0.6
        }}>
          Endereço
        </div>

        <strong style={{
          fontSize: 14
        }}>
          Águas Compridas, Olinda - PE
        </strong>
      </div>

      {/* 🔥 MAPA */}
      <div style={{
        borderRadius: 16,
        overflow: "hidden"
      }}>
        <iframe
          src="https://www.google.com/maps?q=Águas+Compridas+Olinda&output=embed"
          width="100%"
          height="160"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

      {/* 🔥 BOTÃO */}
      <button
        onClick={() => window.open(
          "https://www.google.com/maps?q=Águas+Compridas+Olinda",
          "_blank"
        )}
        style={{
          padding: 14,
          borderRadius: 16,
          border: "none",
          background: lojaAberta ? "#111" : "#999",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
      >
        Ver localização
      </button>

    </div>

    {/* 🔥 AVISO SE FECHADA */}
    {!lojaAberta && (
      <div style={{
        marginTop: 14,
        padding: 14,
        borderRadius: 16,
        background: "rgba(220,38,38,0.1)",
        color: "#dc2626",
        textAlign: "center",
        fontWeight: "bold"
      }}>
        Loja fechada no momento
      </div>
    )}

    {/* 🔥 VOLTAR */}
    <button
      onClick={() => setAbaPerfil("menu")}
      style={{
        width: "100%",
        marginTop: 16,
        padding: 12,
        borderRadius: 14,
        border: "none",
        background: dark ? "#f00f0f" : "#f00d0d",
       
        fontWeight: "bold"
      }}
    >
      Voltar
    </button>

  </div>
)}

<div>

  {temNotificacao && (
    <span style={{
      position: "absolute",
      top: 6,
      right: 6,
      width: 8,
      height: 8,
      background: "#ff0033",
      borderRadius: "50%"
    }} />
  )}
</div>

    {/* 🔥 COLUNA (SAIR + DARK EMBAIXO) */}
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 6
    }}></div>



{aba === "pedidos" && step === 5 && (
  <div className="fade-slide" style={{ padding: 15 }}>

    <h3 style={{
      marginBottom: 15,
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>
      <ClipboardList size={20} /> Histórico
    </h3>

    {pedidos.length === 0 && (
      <p style={{ opacity: 0.6 }}>
        Nenhum pedido ainda
      </p>
    )}

    {[...pedidos].reverse().map((p, i) => {

      const primeiroItem = p.itens?.[0];

      const produtoReal = produtos.find(prod =>
        prod.id === primeiroItem?.produtoId ||
        prod.nome === primeiroItem?.nome
      );

      // 🔥 COR DO STATUS
      const corStatus =
        p.status === "preparando" ? "#facc15" :
        p.status === "saiu" ? "#60a5fa" :
        "#00c853";

      // 🔥 COR PAGAMENTO
      const corPagamento =
        p.formaPagamento === "pix" ? "#a855f7" :
        p.formaPagamento === "dinheiro" ? "#22c55e" :
        "#3b82f6";

      // 🔥 NOME BONITO PAGAMENTO
      const nomePagamento =
        p.formaPagamento === "pix" ? "Pix" :
        p.formaPagamento === "dinheiro" ? "Dinheiro na entrega" :
        "Cartão na entrega";

      return (
        <div key={i} style={{ marginBottom: 15 }}>

          {/* DATA */}
          <p style={{
            opacity: 0.5,
            fontSize: 12,
            marginBottom: 5
          }}>
            {new Date(p.data || Date.now()).toLocaleDateString("pt-BR")}
          </p>

          {/* CARD */}
          <div style={{
            background: themeAtual.card,
            padding: 15,
            borderRadius: 18,
            boxShadow: "0 6px 25px rgba(0,0,0,0.05)"
          }}>

            {/* TOPO */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>

              <img
                src={produtoReal?.imagem || "/acai.png"}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 12,
                  objectFit: "cover"
                }}
              />

              <div style={{ flex: 1 }}>

                <strong style={{ fontSize: 14 }}>
                  {p.itens?.length === 1
                    ? p.itens[0].nome
                    : `${p.itens?.[0]?.nome} +${p.itens.length - 1} itens`}
                </strong>

                {/* STATUS */}
                <div style={{
                  fontSize: 12,
                  marginTop: 4,
                  color: corStatus,
                  fontWeight: "bold"
                }}>
                  {p.status}
                </div>

                {/* 💳 PAGAMENTO (NOVO) */}
                <div style={{ marginTop: 4 }}>
                  <span style={{
                    background: corPagamento,
                    color: "#fff",
                    padding: "3px 8px",
                    borderRadius: 8,
                    fontSize: 11
                  }}>
                    {nomePagamento}
                  </span>
                </div>

              </div>

            </div>

            {/* ITENS */}
            <div style={{
              marginTop: 12,
              fontSize: 13,
              opacity: 0.85
            }}>
              {p.itens?.map((item, idx) => (
                <div key={idx} style={{ marginBottom: 6 }}>

                  <div>
                    {item.quantidade}x {item.nome}
                  </div>

                  {item.extras?.length > 0 && (
                    <div style={{
                      marginLeft: 10,
                      fontSize: 12,
                      opacity: 0.7
                    }}>
                      {item.extras.map(e => (
                        <div key={e.nome}>
                          • {e.nome}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div style={{
              marginTop: 12,
              fontWeight: "bold",
              fontSize: 15
            }}>
              Total: {formatarReal(p.total)}
            </div>

            {/* AÇÕES */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              paddingTop: 10
            }}>

              <button style={{
                background: "transparent",
                border: "none",
                color: "#ea1d2c",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                Ajuda
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
                        nome: item.nome,
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
                  setStep(3);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ea1d2c",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Pedir novamente
              </button>

            </div>

          </div>

        </div>
      );
    })}

    {/* VOLTAR */}
   <button
    onClick={() => {
    setAba("home");
    setStep(1);
    }}
    style={{
    width: "100%",
    marginTop: 20,
    padding: 12,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(90deg,#ec5353,#ec5353)",
    color: "#fff",
    fontWeight: "bold"
    }}
   >
    ← Voltar
 </button>

</div>
)}

{aba === "pagamentos" && step === 6 && (
  <div className="fade-slide">

    <h3 style={{
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>
      <CreditCard size={20} /> Pagamento
    </h3>

    {/* 🔥 RESUMO */}
    <div style={{
      background: themeAtual.card,
      padding: 15,
      borderRadius: 16,
      marginBottom: 10
    }}>

      <h4 style={{ marginBottom: 10 }}>Resumo do pedido</h4>

      {carrinho.map((item, i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          marginBottom: 4
        }}>
          <span>{item.quantidade}x {item.produto.nome}</span>
          <span>{formatarReal(item.total)}</span>
        </div>
      ))}

      <hr style={{ margin: "10px 0", opacity: 0.2 }} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Subtotal</span>
        <span>{formatarReal(total)}</span>
      </div>

      {desconto > 0 && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#00c853"
        }}>
          <span>Desconto</span>
          <span>-{formatarReal(desconto)}</span>
        </div>
      )}

      <hr style={{ margin: "10px 0", opacity: 0.2 }} />

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: 16
      }}>
        <span>Total</span>
        <span>{formatarReal(total - desconto)}</span>
      </div>

    </div>

    {/* 🔥 FORMA DE PAGAMENTO */}
    <div style={{
      background: themeAtual.card,
      padding: 15,
      borderRadius: 16,
      marginBottom: 10
    }}>
      <h4 style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
        <CreditCard size={16} /> Forma de pagamento
      </h4>

      <div style={{ marginTop: 10 }}>

        {/* FECHADO */}
        {!abrirPagamento && (
          <div
            style={{
              padding: 12,
              borderRadius: 14,
              background: dark ? "#111" : "#f5f5f5",
              textAlign: "center",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={async () => {

            const pode = await validarCupomAntes();

           if (!pode) return;

           setMostrarPagamento(true);

          }}
          >
            {formaPagamento
              ? formaPagamento.toUpperCase()
              : "Escolher pagamento"}
          </div>
        )}

    {/* RESTO DO SEU APP */}

        {/* ABERTO */}
        {abrirPagamento && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 8
          }}>

            <div
              onClick={() => {
                setFormaPagamento("pix");
                setAbrirPagamento(false);
              }}
              style={{
                padding: 12,
                borderRadius: 14,
                background: formaPagamento === "pix" ? "#ea1d2c" : "#eee",
                color: formaPagamento === "pix" ? "#fff" : "#000",
                textAlign: "center",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              PIX
            </div>

            <div
              onClick={() => {
                setFormaPagamento("cartao");
                setAbrirPagamento(false);
              }}
              style={{
                padding: 12,
                borderRadius: 14,
                background: formaPagamento === "cartao" ? "#ea1d2c" : "#eee",
                color: formaPagamento === "cartao" ? "#fff" : "#000",
                textAlign: "center",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Cartão
            </div>

            <div
              onClick={() => {
                setFormaPagamento("dinheiro");
                setAbrirPagamento(false);
              }}
              style={{
                padding: 12,
                borderRadius: 14,
                background: formaPagamento === "dinheiro" ? "#ea1d2c" : "#eee",
                color: formaPagamento === "dinheiro" ? "#fff" : "#000",
                textAlign: "center",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Dinheiro
            </div>

          </div>
        )}

      </div>
    </div>

    <div style={{ height: 120 }} />

    {/* 🔥 FINALIZAR */}
    <div style={{
      position: "fixed",
      bottom: 90,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      zIndex: 999
    }}>
      <button
        onClick={() => finalizarPedido()}
        style={{
          width: "90%",
          maxWidth: 380,
          padding: "14px",
          borderRadius: 18,
          background: "linear-gradient(90deg,#ec5353,#ec5353)",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          fontSize: 14,
          boxShadow: "0 8px 25px rgba(234,29,44,0.3)"
        }}
      >
        Finalizar pedido
      </button>
    </div>

    <button onClick={() => {
     setAba("carrinho");
    setStep(3);

     }}>
      ← Voltar ao carrinho
    </button>

  </div>
)}

{aba === "notificacao" && step === 7 && (
  <div style={{
    padding: 20,
    animation: "fadeIn 0.3s ease"
  }}>

    {/* HEADER */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }}>
      <h2 style={{ margin: 0 }}> Notificações</h2>

      <button
        onClick={marcarComoLida}
        style={{
          fontSize: 12,
          background: "transparent",
          border: "none",
          color: "#f72516",
          cursor: "pointer"
        }}
      >
        Marcar tudo como lido
      </button>
    </div>

    {/* HOJE */}
    {grupos.hoje.length > 0 && (
      <>
        <h4 style={{ opacity: 0.6 }}>Hoje</h4>

        {grupos.hoje.map(n => (
          <NotificacaoItem key={n.id} n={n} />
        ))}
      </>
    )}

    {/* ANTIGAS */}
    {grupos.antigas.length > 0 && (
      <>
        <h4 style={{ opacity: 0.6, marginTop: 15 }}>Anteriores</h4>

        {grupos.antigas.map(n => (
          <NotificacaoItem key={n.id} n={n} />
        ))}
      </>
    )}

{/* VOLTAR */}
<button
  onClick={() => {
    setAba("home"); // 🔥 ESSENCIAL
    setStep(1);
  }}
  style={{
    width: "100%",
    marginTop: 20,
    padding: 12,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(90deg,#ec5353,#ec5353)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  ← Voltar
  </button>

 </div>

)}

{aba === "info" && step === 99 && (
  <div className="fade-slide">

    <h3 style={{
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>
      <MapPin size={20} /> Informações da Loja
    </h3>

    {/* STATUS */}
    <div style={{
      background: lojaAberta
        ? (dark ? "#003300" : "#e6ffe6")
        : (dark ? "#330000" : "#ffe6e6"),
      padding: 12,
      borderRadius: 12,
      color: lojaAberta ? "#00ff88" : "#ff4d4d",
      marginBottom: 15,
      fontWeight: "bold"
    }}>
      {lojaAberta ? "🟢 Loja aberta agora" : "🔴 Loja fechada"}
    </div>

    {/* HORÁRIO */}
    <div style={{
      background: themeAtual.card,
      padding: 12,
      borderRadius: 16,
      marginBottom: 15
    }}>
      <h4 style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
        ⏰ Horário
      </h4>

      <p>Domingo: 18h às 23h20</p>
      <p>Segunda: Fechado</p>
      <p>Terça a Sábado: 18h15 às 23h20</p>
    </div>

    {/* PAGAMENTO */}
    <div style={{
      background: themeAtual.card,
      padding: 12,
      borderRadius: 16,
      marginBottom: 15
    }}>
      <h4 style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
        💳 Pagamento
      </h4>

      <p>💵 Dinheiro</p>
      <p>💳 Cartão</p>

      <div style={{ display: "flex", gap: 8 }}>
        {["VISA", "MASTERCARD", "ELO", "HIPERCARD"].map(b => (
          <span key={b} style={{
            background: dark ? "#222" : "#eee",
            padding: "4px 8px",
            borderRadius: 8,
            fontSize: 12
          }}>
            {b}
          </span>
        ))}
      </div>
    </div>

    {/* ENDEREÇO */}
    <div style={{
      background: themeAtual.card,
      padding: 12,
      borderRadius: 16,
      marginBottom: 10
    }}>
      <h4 style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
        <MapPin size={16} /> Endereço
      </h4>

      <p>Rua Seis de Janeiro, 209 - Olinda</p>
    </div>

    {/* MAPA */}
    <iframe
      src="https://www.google.com/maps?q=R.+Seis+de+Janeiro,+209+Olinda&output=embed"
      width="100%"
      height="200"
      style={{
        border: 0,
        borderRadius: 12,
        marginTop: 10,
        filter: dark ? "grayscale(1) invert(1)" : "none"
      }}
    />

    {/* VOLTAR */}
    <button
      style={{
        marginTop: 15,
        width: "100%",
        padding: 12,
        borderRadius: 12,
        border: "none",
        background: "linear-gradient(90deg,#ec5353,#ec5353)",
        color: "#fff",
        fontWeight: "bold"
      }}
      onClick={() => setStep(1)}
    >
      ← Voltar
    </button>

  </div>
)}


    {/* 🔥 BOTÃO INSTALAR */}
    {promptInstall && (
  <button onClick={instalarApp}>
    📲 Instalar App
  </button>
)}

{/* 🔥 ESPAÇO PRO MENU */}
<div style={{ height: 90 }} />


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


