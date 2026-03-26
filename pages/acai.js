import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { db, auth } from '../services/firebase';

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,   // 🔥 ADICIONA
  getDoc    // 🔥 ADICIONA
} from 'firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth';

export default function Acai() {

  const router = useRouter();

  const [step, setStep] = useState(1);
  const [produto, setProduto] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [extras, setExtras] = useState([]);
  const [pagamento, setPagamento] = useState("");
  const [cliente, setCliente] = useState('');
  const [dark, setDark] = useState(false);
  const [cupom, setCupom] = useState("");
  const [descontoCupom, setDescontoCupom] = useState(0);
  const [cupomAtivo, setCupomAtivo] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [loadingPedido, setLoadingPedido] = useState(false);
  const [lojaAberta, setLojaAberta] = useState(null);
  const [mostrarPix, setMostrarPix] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [enderecoCliente, setEnderecoCliente] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [carregouCliente, setCarregouCliente] = useState(false);
  

  // dados do client

const [clienteNome, setClienteNome] = useState("");
const [clienteCpf, setClienteCpf] = useState("");
const [clienteTelefone, setClienteTelefone] = useState("");
const [clienteEmail, setClienteEmail] = useState("");
const [clienteEndereco, setClienteEndereco] = useState("");
const [clienteNumeroCasa, setClienteNumeroCasa] = useState("");

// 🔥 MÁSCARA CPF
function formatarCPF(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

// 🔥 MÁSCARA TELEFONE
function formatarTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

// 🔥 ESTILO INPUT
const inputStyle = {
  padding: 10,
  borderRadius: 10,
  border: "none",
  background: dark ? "#222" : "#f1f1f1",
  color: dark ? "#fff" : "#000"
};

// 🔥 1. CARREGAR DADOS (COLOCA AQUI)
useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    try {
      const snap = await getDoc(doc(db, "usuarios", user.uid));

      if (snap.exists()) {
        const dados = snap.data();

        setClienteNome(dados.clienteNome || "");
        setClienteCpf(dados.clienteCpf || "");
        setClienteTelefone(dados.clienteTelefone || "");
        setClienteEmail(dados.clienteEmail || "");
        setClienteEndereco(dados.clienteEndereco || "");
        setClienteNumeroCasa(dados.clienteNumeroCasa || "");
      }

      // 🔥 AGORA LIBERA SALVAR
      setCarregouCliente(true);

    } catch (e) {
      console.log("Erro ao carregar cliente", e);
    }

  });

  return () => unsubscribe();

}, []);

  
  useEffect(() => {

  const user = auth.currentUser;

  if (!user) return;

  const unsub = onSnapshot(collection(db, "pedidos"), (snapshot) => {

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 🔥 FILTRA SÓ OS PEDIDOS DO USUÁRIO
    const meusPedidos = lista.filter(p => p.userId === user.uid);

    // 🔥 ORDENA DO MAIS NOVO
    meusPedidos.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0));

    setPedidos(meusPedidos);

  });

  return () => unsub();

}, []);

   // 🔥 CARREGAR PEDIDOS)
 function carregarPedidos() {
  if (typeof window === "undefined") return;

  const dados = JSON.parse(localStorage.getItem("pedidos") || "[]");

  console.log("📦 PEDIDOS CARREGADOS:", dados);

  setPedidos(dados);
}

  // 🔥 SALVAR PEDIDO (LOCAL STORAGE)
function salvarPedido(carrinho, nomeCliente, enderecoCliente) {
  console.log("🔥 SALVANDO DIRETO AGORA");

  if (!carrinho || carrinho.length === 0) return;

  const itensCorrigidos = carrinho.map(item => {
    const preco = Number(item.produto?.preco || 0);

    const extras = (item.extras || []).reduce((acc, e) => {
      return acc + Number(e.preco || 0);
    }, 0);

    const qtd = Number(item.quantidade || 1);

    const totalCorreto = (preco + extras) * qtd;

    return {
      produto: item.produto,
      extras: item.extras,
      quantidade: qtd,
      total: totalCorreto
    };
  });

  const totalFinal = itensCorrigidos.reduce((acc, item) => acc + item.total, 0);

  const novoPedido = {
    id: Date.now(),
    codigo: "#" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    itens: itensCorrigidos,
    nome: nomeCliente,
    endereco: enderecoCliente,
    total: totalFinal,
    status: "preparando",
    data: new Date().toISOString()
  };

  let pedidos = [];

  try {
    pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  } catch {
    pedidos = [];
  }

  pedidos.push(novoPedido);

  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  console.log("✅ SALVO CORRIGIDO:", novoPedido);
}

// 🔥 GERAR MENSAGEM DO PEDIDO
function gerarMensagemPedido(carrinho) {
  if (!carrinho || carrinho.length === 0) return "";

  let mensagem = "*Novo Pedido de Açaí*\n\n";

  carrinho.forEach((item, i) => {
    mensagem += `${i + 1}. ${item.produto.nome}\n`;

    item.extras?.forEach(extra => {
      mensagem += `+ ${extra.nome}\n`;
    });

    mensagem += `Subtotal: R$ ${Number(item.total).toFixed(2)}\n\n`;
  });

  const totalFinal = carrinho.reduce(
    (acc, item) => acc + Number(item.total || 0),
    0
  );

  mensagem += ` Total: R$ ${totalFinal.toFixed(2)}\n\n`;

  // 🔥 DADOS VINDO DO STEP 4
  mensagem += ` Nome: ${clienteNome}\n`;
  mensagem += ` Telefone: ${clienteTelefone}\n`;
  mensagem += ` Endereço: ${clienteEndereco}, ${clienteNumeroCasa}\n`;

  return mensagem;
}
// salvar dados do client 
async function salvarDadosCliente() {

  const user = auth.currentUser;

  if (!user) {
    alert("Faça login novamente");
    return;
  }

  if (!clienteNome || !clienteEndereco) {
    alert("Preencha os dados obrigatórios");
    return;
  }

  try {
    await setDoc(doc(db, "usuarios", user.uid), {
      clienteNome,
      clienteCpf,
      clienteTelefone,
      clienteEmail,
      clienteEndereco,
      clienteNumeroCasa
    });

    alert("✅ Dados salvos com sucesso");

  } catch (e) {
    console.log(e);
    alert("Erro ao salvar");
  }
}

async function salvarPedidoFirebase(pedido) {
  try {
    await addDoc(collection(db, "pedidos"), {
      userId: auth.currentUser?.uid || null,

      // 🔥 DADOS DO CLIENTE (STEP 4)
      cliente: pedido.cliente || "Cliente",
      endereco: pedido.endereco || "",
      numeroCasa: pedido.numeroCasa || "",
      telefone: pedido.telefone || "",
      cpf: pedido.cpf || "",
      email: pedido.email || "",

      // 🔥 CÓDIGO
      codigo: "#" + Math.random().toString(36).substring(2, 8).toUpperCase(),

      // 🔥 ITENS
      itens: (pedido.carrinho || []).map(item => {

        const preco = Number(item.produto?.preco || 0);

        const extras = (item.extras || []).reduce((acc, e) => {
          return acc + Number(e.preco || 0);
        }, 0);

        const qtd = Number(item.quantidade || 1);

        const totalCorreto = (preco + extras) * qtd;

        return {
          produto: item.produto,
          extras: item.extras,
          quantidade: qtd,
          total: totalCorreto
        };
      }),

      // 🔥 TOTAL GERAL
      total: (pedido.carrinho || []).reduce((acc, item) => {

        const preco = Number(item.produto?.preco || 0);

        const extras = (item.extras || []).reduce((s, e) => {
          return s + Number(e.preco || 0);
        }, 0);

        const qtd = Number(item.quantidade || 1);

        return acc + (preco + extras) * qtd;

      }, 0),

      pagamento: pedido.pagamento || "",
      cupom: pedido.cupom || "",
      descontoCupom: Number(pedido.descontoCupom || 0),

      status: "preparando",
      data: new Date().toISOString()
    });

    console.log("🔥 FIREBASE 100% COMPLETO");

  } catch (error) {
    console.error("🔥 ERRO FIREBASE:", error);
    throw error;
  }
}

// 🔥 GERAR MENSAGEM DO PEDIDO (FINAL)
function enviarWhatsApp(carrinho) {
  const numero = "5581973119512";

  if (!clienteNome || !clienteEndereco) {
    alert("Preencha seus dados pessoais!");
    setStep(4); // 🔥 joga pro step de dados
    return;
  }

  const carrinhoSeguro = JSON.parse(JSON.stringify(carrinho));

  salvarPedidoFirebase({
    carrinho: carrinhoSeguro,
    cliente: clienteNome,
    endereco: clienteEndereco,
    numeroCasa: clienteNumeroCasa,
    telefone: clienteTelefone,
    cpf: clienteCpf,
    email: clienteEmail
  });

  const mensagem = gerarMensagemPedido(carrinhoSeguro);

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

  setCarrinho([]);
  setStep(1);
}

  useEffect(() => {
    const clienteLocal = localStorage.getItem("cliente") || "Cliente";
    const pedidosLocal = JSON.parse(localStorage.getItem("pedidos")) || [];

    setCliente(clienteLocal);
    setPedidos(pedidosLocal);

    if (auth.currentUser) {
      const q = query(
        collection(db, "pedidos"),
        where("userId", "==", auth.currentUser.uid)
      );

      const unsub = onSnapshot(q, (snapshot) => {
        const firebasePedidos = snapshot.docs.map(doc => doc.data());
        const combinado = [...firebasePedidos, ...pedidosLocal];
        setPedidos(combinado);
      });



      return () => unsub();
    }
    
  }, []);

  // 🔥 COLE ESSE AQUI LOGO ABAIXO
useEffect(() => {
  const ref = doc(db, "config", "loja");

  const unsub = onSnapshot(ref, (snap) => {
    console.log("🔥 SNAP EXISTS:", snap.exists());
    console.log("🔥 SNAP DATA:", snap.data());

    if (snap.exists()) {
      setLojaAberta(snap.data().aberta);
    } else {
      console.log("❌ DOCUMENTO NÃO EXISTE");
    }
  });

  return () => unsub();
}, []);

  function sair() {
    localStorage.removeItem("cliente");
    router.push('/login');
  }

  const produtos = [
  {
    id: 1,
    nome: "Açaí 300ml",
    preco: 10,
    img: "/acai1.png"
  },
  {
    id: 2,
    nome: "Açaí 500ml",
    preco: 15,
    img: "/acai2.png"
  },
  {
    id: 3,
    nome: "Açaí 700ml",
    preco: 20,
    img: "/acai3.png"
  }
];

  const adicionais = [
    { nome: "Granola", preco: 2 },
    { nome: "Banana", preco: 3 },
    { nome: "Morango", preco: 3 }
  ];

  function toggleExtra(item) {
    const existe = extras.find(e => e.nome === item.nome);
    if (existe) setExtras(extras.filter(e => e.nome !== item.nome));
    else setExtras([...extras, item]);
  }

const totalExtras = extras.reduce((acc, e) => acc + e.preco, 0);

// 🔥 AGORA MULTIPLICA CORRETAMENTE
let total = ((produto?.preco || 0) + totalExtras) * quantidade;
  total -= descontoCupom;
  if (total < 0) total = 0;

  function aplicarCupom() {

  if (!cupom) {
    alert("Digite um cupom");
    return;
  }

  const lista = JSON.parse(localStorage.getItem("cupons")) || [];

  const encontrado = lista.find(c =>
    c.codigo === cupom.toUpperCase()
  );

  if (!encontrado) {
    alert("❌ Cupom inválido");
    return;
  }

  // 🔥 VALIDADE
  if (new Date(encontrado.validade) < new Date()) {
    alert("❌ Cupom expirado");
    return;
  }

  // 🔥 LIMITE
  if (encontrado.usos >= encontrado.limite) {
    alert("❌ Cupom esgotado");
    return;
  }

  // 🔥 EVITA DUPLICAR
  if (cupomAtivo === encontrado.codigo) {
    alert("Cupom já aplicado");
    return;
  }

  setDescontoCupom(Number(encontrado.valor));
  setCupomAtivo(encontrado.codigo);

  alert("✅ Cupom aplicado");
}

 async function salvarPedidoFirebase(pedido) {
  try {
    await addDoc(collection(db, "pedidos"), {
      userId: auth.currentUser?.uid || null,

      cliente: pedido.cliente || "Cliente",

      codigo: "#" + Math.random().toString(36).substring(2, 8).toUpperCase(),

      // 🔥 AQUI É A CHAVE DO PROBLEMA (ARRAY DE ITENS)
      itens: pedido.carrinho.map(item => ({
        produto: item.produto,
        extras: item.extras,
        quantidade: item.quantidade,
        total: item.total
      })),

      total: pedido.carrinho.reduce(
        (acc, item) => acc + Number(item.total || 0),
        0
      ),

      pagamento: pedido.pagamento || "",
      cupom: pedido.cupom || "",
      descontoCupom: Number(pedido.descontoCupom || 0),

      status: "preparando",
      data: new Date().toISOString()
    });

    console.log("🔥 PEDIDO SALVO ÚNICO (SEM DUPLICAR)");

  } catch (error) {
    console.error("🔥 ERRO FIREBASE:", error);
  }
}

// 🔥 GERAR CÓDIGO DO PEDIDO
function gerarCodigoPedido() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = "0123456789";

  let codigo = "#";

  for (let i = 0; i < 3; i++) {
    codigo += letras[Math.floor(Math.random() * letras.length)];
  }

  for (let i = 0; i < 3; i++) {
    codigo += numeros[Math.floor(Math.random() * numeros.length)];
  }

  return codigo;
}

async function finalizarPedido() {

  if (lojaAberta === false) {
    alert("🚫 Loja fechada no momento");
    return;
  }

  if (loadingPedido) return;

  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  if (!pagamento) {
    alert("Escolha pagamento");
    return;
  }

  setLoadingPedido(true);

  try {
  // 🔥 CRIA UM ÚNICO PEDIDO (CORRETO)
  const pedidoUnico = {
    cliente,
    carrinho,
    pagamento,
    cupom,
    descontoCupom
  };

  // 🔥 SALVA NO FIREBASE (1 DOCUMENTO)
  await salvarPedidoFirebase(pedidoUnico);

  // 🔥 SALVA NO LOCAL (OPCIONAL)
  const pedidosLocal = JSON.parse(localStorage.getItem("pedidos") || "[]");

  const novoLocal = {
    id: Date.now(),
    codigo: "#" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    itens: carrinho,
    total: carrinho.reduce((acc, item) => acc + Number(item.total || 0), 0),
    status: "preparando",
    data: new Date().toISOString()
  };

  const novos = [...pedidosLocal, novoLocal];

  localStorage.setItem("pedidos", JSON.stringify(novos));

  // 🔥 ATUALIZA TELA
  setPedidos(novos);

  setCarrinho([]);
  setPedidoConfirmado(true);

  resetar();

} catch (err) {
  console.error("ERRO FINALIZAR:", err);
  alert("Erro ao salvar pedido.");
  setPedidoConfirmado(false);
} finally {
  setLoadingPedido(false);
}
}

function resetar() {
  setStep(1);
  setProduto(null);
  setSelectedId(null);
  setExtras([]);
  setPagamento("");
  setCupom("");
  setCupomAtivo(null);
  setDescontoCupom(0);
  setQuantidade(1);
}

// 🔥 REMOVE DUPLICAÇÃO (deixa só UMA)
function removerExtraDoItem(indexItem, nomeExtra) {
  setCarrinho(prev =>
    prev.map((item, i) => {
      if (i !== indexItem) return item;

      const extraRemovido = item.extras.find(e => e.nome === nomeExtra);

      return {
        ...item,
        extras: item.extras.filter(e => e.nome !== nomeExtra),
        total: item.total - (extraRemovido?.preco || 0)
      };
    })
  );
}

function adicionarCarrinhoAtual() {
  if (!produto) return;

  if (lojaAberta === false) {
    alert("🚫 Loja fechada no momento");
    return;
  }

  const qtd = Number(quantidade || 1);

  const extrasClonados = Array.isArray(extras)
    ? extras.map(e => ({
        nome: e.nome,
        preco: Number(e.preco || 0)
      }))
    : [];

  const precoBase = Number(produto.preco || 0);

  const totalExtras = extrasClonados.reduce((acc, e) => acc + e.preco, 0);

  // 🔥 CRIA ITENS SEPARADOS
  const novosItens = [];

  for (let i = 0; i < qtd; i++) {
    novosItens.push({
      produto: { ...produto },
      extras: extrasClonados.map(e => ({ ...e })), // 🔥 clone profundo
      quantidade: 1,
      total: precoBase + totalExtras
    });
  }

  setCarrinho(prev => [...prev, ...novosItens]);

  setExtras([]);
  setQuantidade(1);

  alert("Item adicionado ao carrinho!");
}

function removerItem(index) {
  setCarrinho(prev => prev.filter((_, i) => i !== index));
}

function editarItem(item, index) {
  setProduto(item.produto);
  setExtras(item.extras);
  setQuantidade(item.quantidade);

  setCarrinho(prev => prev.filter((_, i) => i !== index));
  setStep(2);
}

async function duplicarAtual() {
  if (!produto) return;

  const item = {
    produto,
    extras: extras.map(e => ({ ...e })),
    quantidade,
    total
  };

  setCarrinho(prev => [...prev, item]);
  alert("Item duplicado!");
  setStep(3);
}

function comprarNovamente(p) {
  setProduto(p.produto);
  setSelectedId(p.produto.id);
  setExtras(p.extras || []);
  setQuantidade(p.quantidade || 1);
  setPagamento("");
  setCupom(p.cupom || "");
  setDescontoCupom(p.descontoCupom || 0);
  setStep(2);
}

const totalCarrinho = (carrinho || []).reduce(
  (acc, item) => acc + Number(item.total || 0),
  0
);

const bg = dark ? '#0a0014' : '#f2f2f2';
const text = dark ? '#fff' : '#000';

return (
  <div style={{ minHeight: '100vh', background: bg, display: 'flex', justifyContent: 'center' }}>

{pedidoConfirmado && (
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
      background: dark ? "#111" : "#fff",
      color: dark ? "#fff" : "#000", // 🔥 CORRIGE TEXTO
      padding: 25,
      borderRadius: 20,
      width: 320,
      textAlign: "center",
      boxShadow: "0 0 25px rgba(122,0,255,0.3)",
      animation: "fadeIn 0.3s ease"
    }}>

      {/* 🔥 ÍCONE */}
      <div style={{ fontSize: 40, marginBottom: 10 }}>
        ✅
      </div>

      {/* 🔥 TÍTULO */}
      <h2 style={{ marginBottom: 5 }}>
        Pedido realizado!
      </h2>

      {/* 🔥 TEXTO */}
      <p style={{
        opacity: 0.8,
        fontSize: 14
      }}>
        Seu açaí já está sendo preparado 🍧
      </p>

      {/* 🔥 BOTÕES */}
      <div style={{
        display: "flex",
        gap: 10,
        marginTop: 20
      }}>

        <button
          style={{ flex: 1 }}
          onClick={() => {
            setPedidoConfirmado(false);
            setStep(5);
          }}
        >
          📦 Acompanhar
        </button>

        <button
          style={{
            flex: 1,
            background: dark ? "#222" : "#ddd",
            color: dark ? "#fff" : "#000"
          }}
          onClick={() => setPedidoConfirmado(false)}
        >
          Fechar
        </button>

      </div>

    </div>
  </div>
)}

    <div style={{ width: 420, padding: 20, color: text }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>🍧 Açaí da Daiane</h2>

        <div onClick={() => setStep(3)} style={{ position: 'relative', cursor: 'pointer' }}>
          🛒
          {carrinho.length > 0 && (
            <span className="badge">{carrinho.length}</span>
          )}
        </div>
      </div>

      <h2>
  👋 Olá, <span style={{ color: "#a855f7" }}>
    {clienteNome || "Cliente"}
  </span>
</h2>

      <button onClick={sair}>Sair</button>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(1)}>🏠 Início</button>
        <button onClick={() => setStep(5)}>Pedidos</button>
        <button onClick={() => setStep(99)}>Informações</button>
        <button onClick={() => setDark(!dark)}>Claro/Escuro</button>
      </div>


<button
  onClick={() => setStep(4)}
  style={{
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
    color: "white",
    fontWeight: "bold",
    marginBottom: 15,
    cursor: "pointer"
  }}
>
  👤 Dados Pessoais
</button>


     {/* STEP 99 */}
{step === 99 && (
  <>
    <h3>📍 Informações</h3>

    {/* 🔥 STATUS LOJA (FIREBASE) */}
    <div style={{
  background: lojaAberta === true
    ? (dark ? '#002a00' : '#e6ffe6')
    : (dark ? '#2a0000' : '#ffe6e6'),
  padding: 10,
  borderRadius: 10,
  color: lojaAberta === true
    ? (dark ? '#00ff88' : '#008000')
    : (dark ? '#ff4d4d' : '#b30000'),
  marginBottom: 15,
  fontWeight: 'bold'
}}>

  {lojaAberta === null && "⏳ Carregando status..."}

  {lojaAberta === true && "🟢 Loja aberta agora"}

  {lojaAberta === false && "🔴 Loja fechada no momento"}

</div>

    {/* 🔥 HORÁRIOS */}
    <h4>Horário de atendimento</h4>

    <div style={{
      background: dark ? 'rgba(255,255,255,0.05)' : '#fff',
      padding: 10,
      borderRadius: 12,
      marginBottom: 15
    }}>
      <p>Domingo: 18h às 23h20</p>
      <p>Segunda: Fechado</p>
      <p>Terça: 18h15 às 23h20</p>
      <p>Quarta: 18h15 às 23h20</p>
      <p>Quinta: 18h15 às 23h20</p>
      <p>Sexta: 18h15 às 23h20</p>
      <p>Sábado: 18h15 às 23h20</p>
    </div>

    {/* 🔥 PAGAMENTO */}
    <h4>Formas de pagamento</h4>

    <div style={{
      background: dark ? 'rgba(255,255,255,0.05)' : '#fff',
      padding: 10,
      borderRadius: 12,
      marginBottom: 15
    }}>
      <p>💵 Dinheiro</p>
      <p>💳 Cartão de crédito</p>

      <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
        {["VISA", "MASTERCARD", "ELO", "HIPERCARD"].map(b => (
          <span key={b} style={{
            background: dark ? '#222' : '#eee',
            color: dark ? '#fff' : '#000',
            padding: '4px 8px',
            borderRadius: 8,
            fontSize: 12
          }}>
            {b}
          </span>
        ))}
      </div>
    </div>

    {/* 🔥 ENDEREÇO */}
    <h4>Endereço</h4>

    <div style={{
      background: dark ? 'rgba(255,255,255,0.05)' : '#fff',
      padding: 10,
      borderRadius: 12,
      marginBottom: 10
    }}>
      <p>Rua Seis de janeiro, 209 - Olinda</p>
    </div>

    {/* 🔥 MAPA */}
    <iframe
      src="https://www.google.com/maps?q=R.+Seis+de+Janeiro,+209+Olindafe&output=embed"
      width="100%"
      height="200"
      style={{
        border: 0,
        borderRadius: 12,
        marginTop: 10,
        filter: dark ? 'grayscale(1) invert(1)' : 'none' // 🔥 mapa dark
      }}
      loading="lazy"
    />

    <button onClick={() => setStep(1)}>
      ← Voltar
    </button>
  </>
)}

      {/* STEP 1 */}
      {step === 1 && (
        <>
          {produtos.map(p => {
            const ativo = selectedId === p.id;

            return (
              <div key={p.id}
                onClick={() => {
                  setProduto(p);
                  setSelectedId(p.id);
                }}
                className={`card ${ativo ? 'active' : ''}`}>

                <img src={p.img} />

                <div className="overlay">
                  <strong className="price">R$ {Number(p.preco).toFixed(2)}</strong>
                  <span className="nome">{p.nome}</span>
                </div>
              </div>
            );
          })}

          <button onClick={() => {
            if (!produto) return alert("Escolha um açaí!");
            setStep(2);
          }}>
            Próximo
          </button>
        </>
      )}

     {/* STEP 2 */}
{step === 2 && (
  <>
    <h3>Adicionais</h3>

    {/* 🔥 QUANTIDADE */}
    <div style={{ display: 'flex', gap: 10 }}>
      <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-</button>
      <strong>{quantidade}</strong>
      <button onClick={() => setQuantidade(q => q + 1)}>+</button>
    </div>

    {/* 🔥 EXTRAS CORRIGIDOS */}
    {adicionais.map(e => {
      const selected = extras.find(x => x.nome === e.nome);

      return (
        <div
          key={e.nome}
          onClick={() => toggleExtra({
            nome: e.nome,
            preco: Number(e.preco)
          })}
          className={`extra ${selected ? 'selected' : ''}`}
        >
          {selected ? " " : ""}
          {e.nome} (+R$ {Number(e.preco).toFixed(2)})
        </div>
      );
    })}

    {/* 🔥 BOTÕES */}
    <button onClick={adicionarCarrinhoAtual}>
      🛒 Adicionar
    </button>

    <button
      onClick={() => {
        if (carrinho.length === 0) {
          alert("Adicione pelo menos 1 item!");
          return;
        }
        setStep(3);
      }}
    >
      Carrinho
    </button>

    <button onClick={() => setStep(1)}>
      ← Voltar
    </button>
  </>
)}

{/* STEP 3 */}
{step === 3 && (
  <>
    <h3>🛒 Carrinho</h3>

    {carrinho.map((item, i) => (
      <div key={i} className="history">

        <p>
          <strong>{item.produto.nome}</strong>
        </p>

        {/* 🔥 EXTRAS */}
        {Array.isArray(item.extras) && item.extras.length > 0 &&
          item.extras.map(e => (
            <div
              key={e.nome}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>
                + {e.nome} (R$ {Number(e.preco).toFixed(2)})
              </span>

              <button onClick={() => removerExtraDoItem(i, e.nome)}>
                ❌
              </button>
            </div>
          ))
        }

        {/* 🔥 TOTAL CORRETO */}
        <p>
          Total: <strong>
            R$ {
              (
                Number(item.produto?.preco || 0) +
                (item.extras || []).reduce((acc, e) => acc + Number(e.preco || 0), 0)
              ).toFixed(2)
            }
          </strong>
        </p>

        {/* 🔥 AÇÕES */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => editarItem(item, i)}>✏️</button>
          <button onClick={() => removerItem(i)}>🗑️</button>
        </div>

      </div>
    ))}

    {/* 🔥 FINALIZAR PEDIDO */}
<div style={{ marginTop: 20 }}>

  <h3>Finalizar Pedido</h3>

  <button
    disabled={!lojaAberta}
    onClick={() => {

      // 🔒 LOJA FECHADA
      if (!lojaAberta) {
        alert("🚫 Loja fechada no momento");
        return;
      }

      // 🔒 CARRINHO VAZIO
      if (!carrinho || carrinho.length === 0) {
        alert("🛒 Adicione um açaí primeiro");
        return;
      }


      enviarWhatsApp(carrinho);
    }}
    style={{
      padding: 14,
      borderRadius: 14,
      border: "none",
      background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
      color: "white",
      fontWeight: "bold",
      marginTop: 10,
      width: "100%",

      // 🔥 VISUAL BLOQUEADO
      opacity: lojaAberta ? 1 : 0.5,
      cursor: lojaAberta ? "pointer" : "not-allowed"
    }}
  >
    📲 Pedir pelo WhatsApp
  </button>

</div>

    {/* 🔥 CUPOM */}
    <h4 style={{ marginTop: 20 }}>Cupom</h4>

    <input
      placeholder="Digite seu cupom"
      value={cupom}
      onChange={e => setCupom(e.target.value)}
      style={{
        padding: 12,
        borderRadius: 14,
        border: "1px solid rgba(122,0,255,0.2)",
        width: "100%",
        marginBottom: 10,
        color: "var(---subtext)",
        outline: "none"
      }}
    />

    <div style={{ display: 'flex', gap: 10 }}>
      <button onClick={aplicarCupom}>
        🎟️ Aplicar cupom
      </button>

      {cupomAtivo && (
        <button onClick={() => {
          setDescontoCupom(0);
          setCupom("");
          setCupomAtivo(null);
        }}>
          ❌ Remover
        </button>
      )}
    </div>

    {cupomAtivo && (
      <p style={{ color: "#00ff88", marginTop: 10 }}>
        🎟️ Cupom aplicado: {cupomAtivo} (-R$ {descontoCupom})
      </p>
    )}

    {/* 🔥 TOTAL FINAL */}
    <h4>
      Total: R$ {Number(totalCarrinho - descontoCupom).toFixed(2)}
    </h4>

    <button onClick={duplicarAtual}>
      🔁 Duplicar pedido
    </button>

    <button onClick={() => setStep(2)}>
      ← Voltar
    </button>

  </>
)}

{/* 🔥 MODAL PIX */}
{mostrarPix && (
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
      borderRadius: 20,
      textAlign: "center",
      width: 300
    }}>
      
      <h2>Pagamento via Pix</h2>

      <p>Valor:</p>
      <strong>
        R$ {carrinho.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
      </strong>

      <p style={{ marginTop: 10 }}>🔑 Chave Pix:</p>
      <strong>seuemail@pix.com</strong>

      <button
        style={{ marginTop: 10 }}
        onClick={() => {
          navigator.clipboard.writeText("seuemail@pix.com");
          alert("Chave Pix copiada!");
        }}
      >
        📋 Copiar chave
      </button>

      <br /><br />

      <button onClick={() => setMostrarPix(false)}>
        Fechar
      </button>

    </div>
  </div>
)}
{/* STEP 4 */}
{step === 4 && (
  <>
    <h3>👤 Dados do Cliente</h3>

    <div style={{
      background: dark ? "#111" : "#fff",
      color: dark ? "#fff" : "#000",
      padding: 20,
      borderRadius: 16
    }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }}>

        <input
          style={inputStyle}
          placeholder="Nome"
          value={clienteNome}
          onChange={(e) => setClienteNome(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="CPF"
          value={clienteCpf}
          disabled={clienteCpf.length >= 14}
          onChange={(e) => setClienteCpf(formatarCPF(e.target.value))}
        />

        <input
          style={inputStyle}
          placeholder="Telefone"
          value={clienteTelefone}
          onChange={(e) => setClienteTelefone(formatarTelefone(e.target.value))}
        />

        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={clienteEmail}
          onChange={(e) => setClienteEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Endereço"
          value={clienteEndereco}
          onChange={(e) =>
            setClienteEndereco(
              e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
            )
          }
        />

        <input
          style={inputStyle}
          placeholder="Número da casa"
          value={clienteNumeroCasa}
          onChange={(e) =>
            setClienteNumeroCasa(e.target.value.replace(/\D/g, ""))
          }
        />

      </div>

      <button
  onClick={salvarDadosCliente}
  style={{
    marginTop: 15,
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg,550094,#550092)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%"
  }}
>
  💾 Salvar dados
</button>

      <button
        style={{ marginTop: 15 }}
        onClick={() => setStep(1)}
      >
        ← Voltar
      </button>

    </div>
  </>
)}

{/* STEP 5 */}
{step === 5 && (
  <>
    <h3>📦 Seus pedidos</h3>

    <div style={{
      maxHeight: 400,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 10
    }}>

      {pedidos
  .sort((a, b) => {
    const dataA = new Date(a.data || 0).getTime();
    const dataB = new Date(b.data || 0).getTime();
    return dataB - dataA;
  })

  .map((p, i) => (
    <div key={i} className="history">

      {/* 🔥 ITENS */}
      {p.itens?.length > 0 ? (
        p.itens.map((item, idx) => (
          <p key={idx}>
            <strong>
              {item.produto?.nome || "Açaí"} (x{item.quantidade || 1})
            </strong>
          </p>
        ))
      ) : (
        <p><strong>Açaí (x1)</strong></p>
      )}

      {/* 🔥 CÓDIGO */}
      <p>
        Código: <strong>{p.codigo || "—"}</strong>
      </p>

      {/* 🔥 DATA CORRIGIDA */}
      <p style={{ fontSize: 12, opacity: 0.7 }}>
        {p.data
          ? new Date(p.data).toLocaleString("pt-BR")
          : ""}
      </p>

      {/* 🔥 STATUS */}
      <p>
        Status:
        <strong style={{
          marginLeft: 6,
          color:
            p.status === "preparando" ? "orange" :
            p.status === "saiu" ? "#00b0ff" :
            p.status === "entregue" ? "#00c853" :
            "#888"
        }}>
          {p.status || "preparando"}
        </strong>
      </p>

      {/* 🔥 TOTAL */}
      <p>
        Total: R$ {Number(p.total || 0).toFixed(2)}
      </p>

      <button onClick={() => comprarNovamente(p)}>
        🔁 Repetir pedido
      </button>

          </div>
        ))}

    </div>

    <button onClick={() => setStep(1)}>
      ← Voltar
    </button>
  </>
)}

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

  /* 💎 PREÇO PREMIUM CLEAN */
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

  /* 🔥 HOVER SUAVE */
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

    background: var(--card);
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
    background: var(--card);
  }

  .cupomBox input {
  flex: 1;
  background: var(--input);
  color: var(--text);
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

    box-shadow: 0 0 10px rgba(122,0,255,0.4);
  }

  button {
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;

    background: linear-gradient(90deg,#5a00ff,#8a00ff);
    color: white;

    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  button:hover {
    opacity: 0.9;
  }

  button:active {
    transform: scale(0.95);
  }

  boxShadow: nomeCliente
  ? "0 0 0 2px rgba(122,0,255,0.2)"
  : "none",
`}</style>

      </div>
    </div>
  );
}