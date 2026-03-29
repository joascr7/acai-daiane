import { useState, useEffect, useRef } from "react";

import { authCliente as auth } from "../services/firebaseDual";
import { dbCliente as db } from "../services/firebaseDual";

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

import { lightTheme, darkTheme } from "../styles/theme";

export default function Acai() {

  // 🔥 USER
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [logo, setLogo] = useState(null);
  const [promptInstall, setPromptInstall] = useState(null);

  // 🔥 CLIENTE (ANTES DE TUDO)
  const [clienteNome, setClienteNome] = useState("");
  const [clienteCpf, setClienteCpf] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteEndereco, setClienteEndereco] = useState("");
  const [clienteNumeroCasa, setClienteNumeroCasa] = useState("");
  const [clienteCep, setClienteCep] = useState("");

// 🔥 parte do step 4
const focoInput = (e) => {
  e.target.style.border = "1px solid #ea1d2c";
};

const blurInput = (e) => {
  e.target.style.border = dark
    ? "1px solid #2a2a2a"
    : "1px solid #e5e5e5";
};

  // 🔥 PERFIL
  const [abaPerfil, setAbaPerfil] = useState("menu");

  // ❌ REMOVIDO useEffect BUGADO

  // 🔥 UI
  const [toast, setToast] = useState(null);
  const carrinhoRef = useRef(null);

  // 🔥 THEME
  const [dark, setDark] = useState(false);
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

  // 🔥 PRODUTO
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const maisVendido = calcularMaisVendido(pedidos);

  // 🔥 EXTRAS
  const [extras, setExtras] = useState([]);
  const adicionais = [
    { nome: "Leite Condensado", preco: 2 },
    { nome: "Granola", preco: 2 },
    { nome: "Morango", preco: 2 },
    { nome: "Banana", preco: 2 },
    { nome: "Uva", preco: 2 },
    { nome: "Jujuba", preco: 2 },
    { nome: "Amendoim", preco: 2 }
  ];

  // 🔥 CARRINHO
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
// 🔥 forma de pagamento
  const [formaPagamento, setFormaPagamento] = useState(null);
  const [statusPagamento, setStatusPagamento] = useState("pendente");
  const [mostrarPagamento, setMostrarPagamento] = useState(false);
  const [loadingPedido, setLoadingPedido] = useState(false);

   // 🔥 NOVOS STATES DO PIX
const [loadingPix, setLoadingPix] = useState(false);
const [qrBase64, setQrBase64] = useState(null);
const [qrCode, setQrCode] = useState(null);
const [paymentId, setPaymentId] = useState(null);

const gerarPix = async () => {
  try {
    setQrBase64(null);
    setQrCode(null);

    const res = await fetch("/api/pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total: Number(totalFinal || 5) // 🔥 mínimo seguro
      })
    });

    const data = await res.json();

    setQrBase64(data.qr_code_base64);
    setQrCode(data.qr_code);
    setPaymentId(data.payment_id);

  } catch (e) {
    alert("Erro ao gerar Pix");
    console.log(e);
  }
};

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
      ? "linear-gradient(90deg,#9333ea,#c026d3)"
      : "linear-gradient(90deg,#6a00ff,#ff2aff)",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    fontSize: 13,
    boxShadow: dark
      ? "0 5px 20px rgba(147,51,234,0.4)"
      : "0 5px 20px rgba(122,0,255,0.3)",
    transition: "all 0.2s ease"
  };

  // 🔥 TOTAL EXTRAS (produto atual)
  const totalExtras = (extras || []).reduce((acc, e) => {
    return acc + Number(e.preco || 0);
  }, 0);

  // 🔥 TOTAL DO CARRINHO (OFICIAL)
  const total = Array.isArray(carrinho)
    ? carrinho.reduce((acc, item) => {
        return acc + Number(item.total || 0);
      }, 0)
    : 0;

  // 🔥 TOTAL FINAL (COM CUPOM)
  
const totalFinal = Math.max(
  0,
  Number(total || 0) - Number(desconto || 0)
);

const melhorCupom = Array.isArray(cupons)
  ? cupons.reduce((melhor, atual) => {

      const totalSeguro = Number(total || 0);

      if (!melhor) return atual;

      if (totalSeguro === 0) {
        return atual.desconto > melhor.desconto ? atual : melhor;
      }

      const descontoAtual =
        atual.tipo === "porcentagem"
          ? totalSeguro * (atual.desconto / 100)
          : atual.desconto;

      const descontoMelhor =
        melhor.tipo === "porcentagem"
          ? totalSeguro * (melhor.desconto / 100)
          : melhor.desconto;

      return descontoAtual > descontoMelhor ? atual : melhor;

    }, null)
  : null;


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
  const carregar = async () => {
    const snap = await getDocs(collection(db, "cupons"));
    const lista = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCupons(lista);
  };

  carregar();
}, []);

// 🔥 app atualiza pagamento

useEffect(() => {
  if (!paymentId) return;

  const interval = setInterval(async () => {
    try {
      const res = await fetch(`/api/checkPagamento?paymentId=${paymentId}`);
      const data = await res.json();

      if (data.status === "approved") {
        clearInterval(interval);

        alert("Pagamento confirmado! ✅");

        // 🔥 ENVIA WHATSAPP AUTOMÁTICO
        if (pedidoAtual) {
          enviarWhatsApp(pedidoAtual);
        }

        // 🔥 LIMPA
        setPedidoAtual(null);
      }

    } catch (e) {
      console.log(e);
    }
  }, 3000);

  return () => clearInterval(interval);
}, [paymentId]);

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
  function toggleExtra(e) {
    setExtras(prev => {
      const existe = prev.find(x => x.nome === e.nome);
      return existe
        ? prev.filter(x => x.nome !== e.nome)
        : [...prev, e];
    });
  }
// SAIR
async function sair() {

  const confirmar = confirm("Deseja sair?");
  if (!confirmar) return;

  await signOut(auth);

  window.location.href = "/login";
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

  // 🔥 GUARDA O NOME ANTES DE QUALQUER COISA
  const nomeProduto = produto.nome;

  const total = ((produto.preco || 0) + totalExtras) * quantidade;

  setCarrinho(prev => [
    ...prev,
    { produto, quantidade, extras, total }
  ]);

  // 🔥 LIMPA DEPOIS
  setExtras([]);
  setQuantidade(1);

  // 🔥 TOAST (AGORA NÃO QUEBRA)
  setToast({
    nome: nomeProduto,
  });

  setTimeout(() => setToast(null), 2500);

  // 🔥 MUDA TELA POR ÚLTIMO
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

  // 🔥 remove do carrinho (pra editar)
  setCarrinho(prev => prev.filter((_, i) => i !== index));

  // 🔥 SE FOR BEBIDA → volta pro carrinho direto
  if (item.produto.categoria === "bebidas") {

    setCarrinho(prev => [
      ...prev,
      {
        produto: item.produto,
        quantidade: 1,
        extras: [],
        total: item.produto.preco || 0
      }
    ]);

    // 🔥 toast
    setToast({ nome: item.produto.nome });
    setTimeout(() => setToast(null), 2000);

    return;
  }

  // 🍧 AÇAÍ → abre edição normal
  setProduto(item.produto);
  setQuantidade(item.quantidade);
  setExtras(item.extras || []);

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


async function aplicarCupom() {

  if (!cupomInput) return alert("Digite um cupom");

  const cupomDigitado = (cupomInput || "").trim().toLowerCase();

  const snap = await getDocs(collection(db, "cupons"));

  if (cupomAplicado) {
  alert("Já existe um cupom aplicado");
  return;
}

  let cupomValido = null;

  snap.forEach(doc => {
    const c = doc.data();

    if (
      typeof c.codigo === "string" &&
      c.codigo.trim().toLowerCase() === cupomDigitado
    ) {
      cupomValido = { id: doc.id, ...c };
    }
  });

  if (!cupomValido) {
    alert("Cupom inválido");
    return;
  }

  if (!cupomValido.ativo) {
    alert("Cupom desativado");
    return;
  }

  if (Number(total || 0) < Number(cupomValido.minimo || 0)) {
    alert(`Pedido mínimo: R$ ${cupomValido.minimo}`);
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

  // 🔥 CALCULAR DESCONTO
  let valorDesconto = 0;
  const totalSeguro = Number(total || 0);

  if (cupomValido.tipo === "porcentagem") {
  valorDesconto = total * (cupomValido.desconto / 100);
  } else {
  valorDesconto = cupomValido.desconto;
}

  setDesconto(valorDesconto);
  setCupomAplicado(cupomValido);

  alert("Cupom aplicado!");
}

function aplicarMelhorCupom() {

  if (!cupons.length) {
    alert("Nenhum cupom disponível");
    return;
  }

  if (cupomAplicado) {
  alert("Já existe um cupom aplicado");
  return;
}

  const hoje = new Date();

  const validos = cupons.filter(c => {
    if (!c.ativo) return false;

    if (new Date(c.validade) < hoje) return false;

    if (Number(total || 0) < Number(c.minimo || 0)) return false;

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
      descontoTemp = total * (c.desconto / 100);
    } else {
      descontoTemp = c.desconto;
    }

    if (descontoTemp > maiorDesconto) {
      maiorDesconto = descontoTemp;
      melhor = c;
    }
  });

  setCupomAplicado(melhor);
  setDesconto(maiorDesconto);

  alert(`🔥 Melhor cupom aplicado: ${melhor.codigo}`);
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

async function finalizarPedido(statusFinalPagamento) {

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

    const codigo = Math.floor(100000 + Math.random() * 900000);
    const totalFinalPedido = Number(totalFinal.toFixed(2));

    const pedido = {
      codigo,

      cliente: {
        nome: clienteNome,
        telefone: clienteTelefone,
        endereco: clienteEndereco,
        numero: clienteNumeroCasa,
        uid: user.uid
      },

      itens: carrinho.map(item => ({
        nome: item.produto.nome,
        imagem: item.produto.imagem,
        quantidade: item.quantidade,
        total: item.total,
        extras: item.extras?.map(e => ({
          nome: e.nome,
          preco: e.preco
        }))
      })),

      total: totalFinalPedido,

      // 💳 PAGAMENTO
      formaPagamento,
      statusPagamento:
        formaPagamento === "pix"
          ? "aguardando_pagamento"
          : "pendente",

      paymentId: paymentId ? String(paymentId) : null,

      status: "preparando",
      data: new Date().toISOString()
    };

    // 🔒 CUPOM
    if (cupomAplicado?.id) {

      const cpfLimpo = clienteCpf.replace(/\D/g, "");

      await runTransaction(db, async (transaction) => {

        const ref = doc(db, "cupons", cupomAplicado.id);
        const snap = await transaction.get(ref);

        if (!snap.exists()) throw "Cupom inválido ❌";

        const dados = snap.data();

        if (dados.usos && dados.usos[cpfLimpo]) {
          throw "Cupom já utilizado ❌";
        }

        transaction.update(ref, {
          [`usos.${cpfLimpo}`]: true
        });
      });
    }

    // 💾 SALVA PEDIDO
    await addDoc(collection(db, "pedidos"), pedido);

    // 🔥 SALVA PEDIDO ATUAL (USADO NO WHATSAPP AUTOMÁTICO)
    setPedidoAtual({
      codigo,
      total: totalFinalPedido,
      clienteNome,
      clienteTelefone,
      clienteEndereco,
      clienteNumeroCasa,
      itens: carrinho
    });

    // 🔥 LIMPA UI (MAS NÃO WHATSAPP)
    setCarrinho([]);
    setCupomAplicado(null);
    setFormaPagamento(null);
    setMostrarPagamento(false);

    setQrBase64(null);
    setPaymentId(null);

    alert("Pedido criado! Aguardando pagamento... 💳");

  } catch (e) {
    alert(e);
    console.log("ERRO FINAL:", e);
  }
}


const enviarWhatsApp = (pedido) => {

  let mensagem = `🛒 *Pedido #${pedido.codigo}*\n\n`;

  pedido.itens.forEach((item, i) => {
    mensagem += `*${i + 1}. ${item.produto?.nome || item.nome}*\n`;
    mensagem += `Qtd: ${item.quantidade}\n`;

    if (item.extras?.length) {
      mensagem += "Extras:\n";
      item.extras.forEach(e => {
        mensagem += `+ ${e.nome}\n`;
      });
    }

    mensagem += `R$ ${Number(item.total).toFixed(2)}\n\n`;
  });

  mensagem += `Total: R$ ${pedido.total}\n\n`;
  mensagem += `Pagamento confirmado via Pix ✅\n\n`;

  mensagem += `${pedido.clienteNome}\n`;
  mensagem += `${pedido.clienteTelefone}\n`;

  if (pedido.clienteEndereco) {
    mensagem += `${pedido.clienteEndereco}, ${pedido.clienteNumeroCasa}\n`;
  }

  const numero = "5581973119512";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
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
  <div style={{
    minHeight: "100vh",
    background: themeAtual.background,
    color: themeAtual.text,
    display: "flex",
    justifyContent: "center",
    overflowX: "hidden" // 🔥 ESSA LINHA RESOLVE O CORTE
  }}>

    
    <div style={{
  width: "100%",
  maxWidth: 420,
  margin: "0 auto",
  padding: "0 16px"
}}>
     

      {/* 🔥 HEADER */}
<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 15
}}>

  {/* NOME LOJA */}
  <h2 style={{
    fontWeight: "bold",
    background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  }}>

{/* 🔥 ESQUERDA (LOGO + NOME) */}
<div style={{ display: "flex", alignItems: "center", gap: 10 }}>

  {logo && (
    <img
      src={logo}
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        objectFit: "cover"
      }}
    />
  )}

  <h2 style={{
    fontWeight: "bold",
    background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    margin: 0
  }}>
    Acai Daiane
  </h2>

</div>
    {/* TEXTO AQUI EM BAIXO*/}

  </h2>

  {/* 🔥 DIREITA */}
{/* 🔥 DIREITA */}
<div style={{
  display: "flex",
  alignItems: "flex-end",
  gap: 10
}}>

  {/* 🛒 CARRINHO */}
  <div
    onClick={() => setStep(3)}
    style={{
      position: "relative",
      cursor: "pointer",
      fontSize: 22
    }}
  >
    🛒

    {carrinho.length > 0 && (
      <span style={{
        position: "absolute",
        top: -8,
        right: -10,
        background: "#ff2aff",
        color: "#fff",
        borderRadius: "50%",
        padding: "2px 6px",
        fontSize: 10
      }}>
        {carrinho.length}
      </span>
    )}
  </div>

  {/* 🔥 COLUNA (SAIR + DARK) */}
  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 6
  }}>

    {/* 🔥 BOTÃO SAIR */}
    <button
      onClick={sair}
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        border: "none",
        background: "linear-gradient(90deg,#2500c7,#56007e)",
        color: "#fff",
        fontSize: 12,
        cursor: "pointer"
      }}
    >
      Sair
    </button>

    {/* 🌙 BOTÃO DARK MODE */}
    <button
      onClick={() => setDark(!dark)}
      style={{
        padding: "6px 10px",
        borderRadius: 10,
        border: "none",

        background: dark ? "#111" : "#eee",
        color: dark ? "#fff" : "#111",

        fontSize: 11,
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
    >
      {dark ? "🌙 Escuro" : "☀️ Claro"}
    </button>

  </div>

</div>

      </div>

      {/* 🔥 MENU INFERIOR */}
<div style={{
  position: "fixed",
  bottom: 10,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  zIndex: 9999
}}>

  <div style={{
    width: "90%",
    maxWidth: 420,
    height: 65,
    background: themeAtual.card,
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  }}>

    <div onClick={() => setStep(1)} style={{ cursor: "pointer" }}>🏠</div>

    <div onClick={() => setStep(5)} style={{ cursor: "pointer" }}>📄</div>

    <div onClick={() => setStep(3)} style={{ cursor: "pointer" }}>🛒</div>

    <div onClick={() => setStep(4)} style={{ cursor: "pointer" }}>👤</div>

  </div>

</div>

{toast && (
  <div
    onClick={() => setStep(3)}
    style={{
      position: "fixed",
      bottom: 90,
      left: "50%",
      transform: "translateX(-50%)",
      background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
      color: "#fff",
      padding: "14px 20px",
      borderRadius: 14,
      fontWeight: "bold",
      boxShadow: "0 0 25px rgba(122,0,255,0.6)",
      zIndex: 9999,
      cursor: "pointer"
    }}
  >
    🛒 {toast.nome} adicionado • Ver carrinho
  </div>
)}
      

      
{/* STEP 1 */}
{step === 1 && (
  <>
    <h3 style={{ marginBottom: 10 }}>🍧 Escolha seu açaí</h3>

    {/* 🔥 LOJA FECHADA */}
    {!lojaAberta && (
      <div style={{
        background: "linear-gradient(90deg,#ff0000,#ff4d4d)",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        textAlign: "center",
        fontWeight: "bold",
        color: "#fff"
      }}>
        🚫 Loja fechada no momento
      </div>
    )}

    {/* 🔍 BUSCA */}
    <div style={{ marginBottom: 10 }}>
      <input
        placeholder="🔍 Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: "none",
          outline: "none",
          background: themeAtual.card,
          color: themeAtual.text
        }}
      />
    </div>

    {/* 🔥 TABS */}
    <div style={{
      display: "flex",
      gap: 8,
      overflowX: "auto",
      marginBottom: 12
    }}>
      {["acai","bebidas","teste","teste2","teste3"].map(cat => (
        <button
          key={cat}
          onClick={() => {
            setCategoria(cat);
            setProduto(null);
            setSelectedId(null);
            setExtras([]);
            setQuantidade(1);
            setStep(1);
          }}
          style={{
            padding: "8px 14px",
            borderRadius: 20,
            border: "none",
            cursor: "pointer",
            background: categoria === cat
              ? "linear-gradient(90deg,#6a00ff,#ff2aff)"
              : themeAtual.card,
            color: categoria === cat ? "#fff" : themeAtual.text,
            whiteSpace: "nowrap"
          }}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>

    {/* 🔥 GRID */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }}>

      {produtos
        .filter(p => {

          const nome = p.nome?.toLowerCase() || "";
          const termo = busca.toLowerCase();

          const categoriaProduto = String(p.categoria || "")
            .trim()
            .toLowerCase();

          const categoriaAtual = String(categoria || "")
            .trim()
            .toLowerCase();

          if (busca) return nome.includes(termo);

          return categoriaProduto === categoriaAtual;
        })
        .map(p => {

  return (
    <div
      key={p.id}

      // 🔥 STYLE CORRETO (AQUI FORA)
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        background: themeAtual.card,
        transition: "all 0.2s ease",
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)"
      }}

      onClick={(e) => {

        if (!lojaAberta) {
          alert("🚫 Loja fechada");
          return;
        }

        setProduto(p);
        setSelectedId(p.id);

        if (p.categoria === "bebidas") {

          const total = p.preco || 0;

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

          return;
        }

        setStep(2);
      }}
    >

  {/* 🔥 MAIS VENDIDO (AGORA NO LUGAR CERTO) */}
    {p.maisVendido && (
  <div style={{
      position: "absolute",
      top: 4,
      left: 10,
      background: "linear-gradient(90deg,#ff0033,#ff5a5a)",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: 5,
      boxShadow: "0 4px 12px rgba(255,0,51,0.4)"
    }}>
    🔥 Mais vendido
  </div>
)}

      {/* 🔥 IMAGEM */}
      <img
        src={
          typeof p.imagem === "string" &&
          p.imagem.startsWith("data:image")
            ? p.imagem
            : "/acai.png"
        }
        onError={(e) => (e.target.src = "/acai.png")}
        style={{
          width: "100%",
          height: 140,
          objectFit: "cover"
        }}
      />

              {/* 🔥 INFO */}
              <div style={{ padding: 10 }}>

                <p style={{
                  fontWeight: "bold",
                  margin: 0
                }}>
                  {p.nome}
                </p>

                <p style={{
                  fontSize: 12,
                  opacity: 0.7,
                  marginTop: 4
                }}>
                  {p.descricao || "Açaí com complementos"}
                </p>

                <strong style={{
                  color: "#6a00ff"
                }}>
                  R$ {Number(p.preco || 0).toFixed(2)}
                </strong>

              </div>

            </div>
          );
        })}

    </div>
  </>
)}
        {step === 2 && (
  <>
    {/* 🔥 IMAGEM TOPO */}
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

    {/* 🔥 INFO PRODUTO */}
    <div style={{ padding: 15 }}>

      <h2 style={{ margin: 0 }}>
        {produto?.nome}
      </h2>

      <p style={{ opacity: 0.7, fontSize: 14 }}>
        {produto?.descricao || "Monte seu açaí com complementos"}
      </p>

      <h3 style={{ marginTop: 5 }}>
        R$ {Number(produto?.preco || 0).toFixed(2)}
      </h3>

      {/* 🔥 QUANTIDADE */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 15
      }}>
        <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>➖</button>
        <strong>{quantidade}</strong>
        <button onClick={() => setQuantidade(q => q + 1)}>➕</button>
      </div>

    </div>

    {/* 🔥 EXTRAS */}
    <div style={{ padding: 15 }}>

      <h4>Escolha seus adicionais</h4>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        marginTop: 10
      }}>

        {adicionais.map(e => {
          const selected = extras.find(x => x.nome === e.nome);

          return (
            <div
              key={e.nome}
              onClick={() => toggleExtra(e)}
              style={{
                padding: 12,
                borderRadius: 14,
                cursor: "pointer",
                border: selected
                  ? "2px solid #6a00ff"
                  : "1px solid #ddd",
                background: selected
                  ? "rgba(122,0,255,0.1)"
                  : themeAtual.card,
                transition: "0.2s"
              }}
            >

              <div style={{ fontWeight: "bold" }}>
                {e.nome}
              </div>

              <div style={{ fontSize: 13, opacity: 0.7 }}>
                + R$ {Number(e.preco).toFixed(2)}
              </div>

            </div>
          );
        })}

      </div>

    </div>

    {/* 🔥 BOTÃO FIXO (ESTILO IFOOD) */}
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
    onClick={adicionarCarrinho}
    style={{
      width: "90%",
      maxWidth: 420,

      padding: "12px 16px",
      borderRadius: 16,

      background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
      color: "#fff",

      border: "none",
      fontWeight: "bold",
      fontSize: 14,

      display: "block",
      boxSizing: "border-box",

      boxShadow: "0 5px 20px rgba(122,0,255,0.4)"
    }}
  >
    🛒 Adicionar • R$ {((produto?.preco || 0) + totalExtras).toFixed(2)}
  </button>

</div>

    {/* 🔥 ESPAÇO PRA NÃO FICAR ESCONDIDO */}
    <div style={{ height: 100 }} />

  </>
)}

{step === 3 && (
  <>
    <h3 style={{ marginBottom: 10 }}>🛒 Sacola</h3>

    {/* 🔥 ITENS */}
    {carrinho.map((item, i) => (
      <div key={i} style={{
        background: themeAtual.card,
        padding: 15,
        borderRadius: 16,
        marginBottom: 12,
        display: "flex",
        gap: 10,
        alignItems: "center"
      }}>
        
        {/* IMAGEM */}
        <img
          src={item.produto.imagem || "/acai.png"}
          style={{
            width: 70,
            height: 70,
            borderRadius: 12,
            objectFit: "cover"
          }}
        />

        {/* INFO */}
        <div style={{ flex: 1 }}>

          {/* 🔥 TOPO COM REMOVER */}
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

          <p style={{ fontSize: 13, opacity: 0.7 }}>
            {item.produto.descricao}
          </p>

          {/* EXTRAS */}
          {item.extras?.map(e => (
            <div key={e.nome} style={{
              fontSize: 12,
              opacity: 0.7
            }}>
              • {e.nome}
            </div>
          ))}

          {/* TOTAL ITEM */}
          <p style={{ marginTop: 6 }}>
            R$ {Number(item.total).toFixed(2)}
          </p>

        </div>

        {/* QUANTIDADE */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6
        }}>
          <button onClick={() => alterarQuantidade(i, "mais")}>➕</button>
          <strong>{item.quantidade}</strong>
          <button onClick={() => alterarQuantidade(i, "menos")}>➖</button>
        </div>

      </div>
    ))}

    {/* 🔥 CUPOM */}
    <div style={{
      background: themeAtual.card,
      padding: 15,
      borderRadius: 16,
      marginTop: 10
    }}>
      <strong>🎟️ Cupom</strong>

      <button
        onClick={aplicarMelhorCupom}
        style={{
          width: "100%",
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
          color: "#fff",
          border: "none"
        }}
      >
        ⚡ Aplicar melhor desconto
      </button>
    </div>

    {/* 🔥 CUPOM APLICADO */}
    {cupomAplicado && (
      <div style={{
        marginTop: 10,
        padding: 12,
        borderRadius: 12,
        background: dark ? "rgba(0,255,136,0.08)" : "rgba(0,255,136,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <p style={{
            color: "#00c853",
            fontWeight: "bold",
            margin: 0
          }}>
            🎟️ {cupomAplicado.nome}
          </p>

          <small>
            💸 Economizou R$ {desconto.toFixed(2)}
          </small>
        </div>

        <button
          onClick={() => {
            setCupomAplicado(null);
            setDesconto(0);
            setCupomInput("");
          }}
          style={{
            background: "#ff0033",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          ❌ Remover
        </button>
      </div>
    )}

    {/* 🔥 RESUMO */}
    <div style={{
      background: themeAtual.card,
      padding: 15,
      borderRadius: 16,
      marginTop: 10
    }}>
      <h4>Resumo</h4>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Subtotal</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      {desconto > 0 && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#00c853"
        }}>
          <span>Desconto</span>
          <span>-R$ {desconto.toFixed(2)}</span>
        </div>
      )}

      <hr style={{ margin: "10px 0", opacity: 0.2 }} />

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold"
      }}>
        <span>Total</span>
        <span>R$ {(total - desconto).toFixed(2)}</span>
      </div>
    </div>

    {/* ESPAÇO */}
    <div style={{ height: 120 }} />

    {/* BOTÃO FIXO */}
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
            alert("⚠️ Preencha seus dados para continuar");
            setStep(4);
            return;
          }

          setStep(6);
        }}
        style={{
          width: "90%",
          maxWidth: 380,
          padding: "12px",
          borderRadius: 18,
          background: dark
            ? "linear-gradient(90deg,#9333ea,#c026d3)"
            : "linear-gradient(90deg,#ff0033,#ff4d4d)",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          fontSize: 14,
          boxShadow: dark
            ? "0 8px 25px rgba(147,51,234,0.4)"
            : "0 8px 25px rgba(255,0,51,0.3)",
          cursor: "pointer"
        }}
      >
        🚀 Continuar pedido
      </button>
    </div>
  </>
)}
{/* STEP 4 */}
{step === 4 && (
  <div style={{
    
    
  }}>

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
            🙂
          </div>

          <div>
            <strong>{clienteNome || "Cliente"}</strong>
            <div style={{ color: "#9333ea", fontSize: 13 }}>
              Deus a cima de tudo !
            </div>
          </div>
        </div>

        <div style={{
        background: themeAtual.card,
        padding: 16,
        borderRadius: 20,
        width: "100%",
        boxSizing: "border-box"
        }}>
          {[
            { nome: "Dados da conta", acao: () => setAbaPerfil("dados") },
            { nome: "Cupons" , acao: () => setAbaPerfil("cupons") },
            { nome: "Informações", acao: () => setAbaPerfil("info") },
            { nome: "Favoritos" }
          ].map((item, i) => (
            <div
              key={i}
              onClick={item.acao}
              style={{
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                cursor: "pointer"
              }}
            >
              <span>{item.nome}</span>
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

            {/* SALVAR */}
            <button
       onClick={() => {
      if (!clienteNome || !clienteEndereco || !clienteTelefone) {
      alert("⚠️ Preencha todos os dados");
      return;
    }

    salvarDadosCliente();
    setStep(6);
  }}
  style={{
    width: "100%",
    height: 52,
    borderRadius: 15,
    background: "#ea1d2c",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    fontSize: 16
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
    background: "#6d28d9",
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
    💸 Desconto: R$ {c.valor || c.desconto || 0}
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
          Açaí Daiane
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
        background: dark ? "#222" : "#8b8b8b",
        color: themeAtual.text,
        fontWeight: "bold"
      }}
    >
      Voltar
    </button>

  </div>
)}

{step === 5 && (
  <>
    <h3 style={{ marginBottom: 10 }}>📦 Histórico</h3>

    {pedidos.length === 0 && (
      <p>Nenhum pedido ainda</p>
    )}

    {pedidos.reverse().map((p, i) => (
      <div key={i} style={{ marginBottom: 15 }}>

        {/* DATA */}
        <p style={{ opacity: 0.6, fontSize: 13 }}>
          {new Date(p.data || Date.now()).toLocaleDateString("pt-BR")}
        </p>

        {/* CARD */}
        <div style={{
          background: themeAtual.card,
          padding: 15,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>

          {/* TOPO */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>

            <img
              src={p.itens?.[0]?.imagem || "/acai.png"}
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
               <strong>
               {p.itens?.length === 1
               ? p.itens[0].nome
                : `${p.itens?.[0]?.nome} +${p.itens.length - 1} itens`}
               </strong>
              </div>

              <div style={{
                fontSize: 12,
                color:
                  p.status === "preparando" ? "#facc15" :
                  p.status === "saiu para entrega" ? "#60a5fa" :
                  "#00c853"
              }}>
                {p.status}
              </div>
            </div>

          </div>

          {/* ITENS */}
          <div style={{
            marginTop: 10,
            fontSize: 13,
            opacity: 0.8
          }}>
            {p.itens?.map((item, idx) => (
  <div key={idx} style={{ marginBottom: 6 }}>

    {/* PRODUTO */}
    <div>
      {item.quantidade}x {item.nome}
    </div>

    {/* EXTRAS */}
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
           marginTop: 10,
           fontWeight: "bold",
           fontSize: 15
           }}>
           Total: R$ {Number(p.total).toFixed(2)}
          </div>

          {/* AÇÕES */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
            borderTop: "1px solid rgba(0,0,0,0.1)",
            paddingTop: 10
          }}>

            <button style={{
              background: "transparent",
              border: "none",
              color: "#ff0033",
              fontWeight: "bold"
            }}>
              Ajuda
            </button>

            <button
              onClick={() => {
                setCarrinho(JSON.parse(JSON.stringify(p.itens)));
                setStep(3);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#ff0033",
                fontWeight: "bold"
              }}
            >
              Pedir novamente
            </button>

          </div>

        </div>

      </div>
    ))}

    {/* VOLTAR */}
    <button onClick={() => setStep(1)}>
      ← Voltar
    </button>
  </>
)}

{step === 6 && (
  <>
    <h3 style={{ marginBottom: 10 }}>💰 Pagamento</h3>

    {/* 🔥 RESUMO DO PEDIDO */}
    <div style={{
      background: themeAtual.card,
      padding: 15,
      borderRadius: 16,
      marginBottom: 10
    }}>

      <h4>🧾 Resumo</h4>

      {/* ITENS */}
      {carrinho.map((item, i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          marginBottom: 4
        }}>
          <span>{item.quantidade}x {item.produto.nome}</span>
          <span>R$ {Number(item.total).toFixed(2)}</span>
        </div>
      ))}

      <hr style={{ margin: "10px 0", opacity: 0.2 }} />

      {/* SUBTOTAL */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Subtotal</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      {/* DESCONTO */}
      {desconto > 0 && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#00c853"
        }}>
          <span>Desconto</span>
          <span>-R$ {desconto.toFixed(2)}</span>
        </div>
      )}

      <hr style={{ margin: "10px 0", opacity: 0.2 }} />

      {/* TOTAL FINAL */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: 16
      }}>
        <span>Total</span>
        <span>R$ {(total - desconto).toFixed(2)}</span>
      </div>

    </div>

    {/* 🔥 FORMA DE PAGAMENTO */}
    <div style={{
      background: themeAtual.card,
      padding: 15,
      borderRadius: 16,
      marginBottom: 10
    }}>
      <h4>💳 Forma de pagamento</h4>

      <div style={{
        marginTop: 10,
        padding: 10,
        borderRadius: 12,
        background: dark ? "#111" : "#f5f5f5",
        textAlign: "center",
        fontWeight: "bold"
      }}>
        PIX 💰
      </div>
    </div>

    {/* 🔥 ESPAÇO */}
    <div style={{ height: 120 }} />

    {/* 🔥 BOTÃO FIXO CONFIRMAR */}
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
  onClick={() => setMostrarPagamento(true)}
  style={{
    width: "90%",
    maxWidth: 380,
    padding: "12px",
    borderRadius: 18,

    background: dark
      ? "linear-gradient(90deg,#9333ea,#c026d3)"
      : "linear-gradient(90deg,#00c853,#00e676)",

    color: "#fff",
    border: "none",
    fontWeight: "bold",
    fontSize: 14,

    boxShadow: dark
      ? "0 8px 25px rgba(147,51,234,0.4)"
      : "0 8px 25px rgba(0,200,83,0.3)",

    cursor: "pointer"
  }}
>
  💳 Escolher pagamento
</button>

    </div>

    {/* 🔥 VOLTAR */}
    <button onClick={() => setStep(3)}>
      ← Voltar ao carrinho
    </button>
  </>
)}

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
    if (loadingPix) return; // 🔥 evita clique duplo

    setFormaPagamento("pix");
  
    // 🔥 limpa estado anterior
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
    background: formaPagamento === "pix" ? "#6a00ff" : "#eee",
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
          
        }}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 8,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          background: formaPagamento === "dinheiro" ? "#6a00ff" : "#eee",
          color: formaPagamento === "dinheiro" ? "#fff" : "#000",
          fontWeight: "bold"
        }}
      >
        💵 Dinheiro na entrega
      </button>

      {/* CARTÃO */}
      <button
        onClick={() => {
          setFormaPagamento("cartao");
          
        }}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 8,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          background: formaPagamento === "cartao" ? "#6a00ff" : "#eee",
          color: formaPagamento === "cartao" ? "#fff" : "#000",
          fontWeight: "bold"
        }}
      >
        💳 Cartão na entrega
      </button>

      {/* PIX AREA */}
     {formaPagamento === "pix" && (
  <div style={{ marginTop: 20, textAlign: "center" }}>

    <p><strong>Valor: R$ {Number(totalFinal).toFixed(2)}</strong></p>

    {/* 🔥 LOADING */}
    {!qrBase64 && (
      <p style={{ marginTop: 10 }}>Gerando QR Code...</p>
    )}

    {/* 🔥 QR CODE */}
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

    {/* 🔥 COPIA E COLA */}
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
            background: "#6a00ff",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          📋 Copiar código Pix
        </button>
      </>
    )}

    {/* 🔥 TEXTO NOVO (AQUI) */}
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

    // 🔥 TRAVA REAL DO PIX
    if (formaPagamento === "pix") {

      if (!qrBase64) {
        alert("Aguarde o QR Code gerar");
        return;
      }

    }

    const statusFinal =
      formaPagamento === "pix"
        ? "aguardando_pagamento" // 🔥 CORRETO (não usar "pago")
        : "pendente";

    try {
      setLoadingPedido(true);
      await finalizarPedido(statusFinal);
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


{step === 99 && (
  <>
    <h3 style={{ marginBottom: 10 }}>📍 Informações da Loja</h3>

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
      <h4>⏰ Horário</h4>
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
      <h4>💳 Pagamento</h4>

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
      <h4>📍 Endereço</h4>
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
      style={{ marginTop: 15 }}
      onClick={() => setStep(1)}
    >
      ← Voltar
    </button>
  </>
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
        ? 'rgba(122,0,255,0.25)' 
        : 'rgba(122,0,255,0.15)'};
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
      background: ${dark ? '#111' : '#fff'};
    }

    .selected {
      background: #7a00ff;
      color: white;
      box-shadow: 0 0 8px rgba(122,0,255,0.4);
    }

    .history {
      margin-top: 10px;
      padding: 10px;
      background: ${dark ? '#111' : '#fff'};
      border-radius: 10px;
    }

    .cupomBox {
      margin-top: 15px;
      display: flex;
      gap: 10px;
      padding: 12px;
      border-radius: 14px;
      border: 2px solid #7a00ff;
    }

    .cupomAtivo {
      margin-top: 10px;
      padding: 12px;
      border-radius: 12px;
      background: linear-gradient(90deg,#5a00ff,#8a00ff);
      color: white;
      display: flex;
      justify-content: space-between;
    }

    .totalBox {
      margin-top: 10px;
      padding: 14px;
      border-radius: 14px;
      background: linear-gradient(90deg,#5a00ff,#8a00ff);
      color: white;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
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



  `}</style>
    
    </div>
    </div>
  );
}


