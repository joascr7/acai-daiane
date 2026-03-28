import { useState, useEffect } from "react";

import { authCliente as auth } from "../services/firebaseDual";
import { dbCliente as db } from "../services/firebaseDual";
import { updateDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { runTransaction } from "firebase/firestore";



import {
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "firebase/auth";

import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  setDoc
} from "firebase/firestore";

import { lightTheme, darkTheme } from "../styles/theme";



export default function Acai() {

   const [user, setUser] = useState(null);
   const [authReady, setAuthReady] = useState(false);
   const [logo, setLogo] = useState(null);

   const [promptInstall, setPromptInstall] = useState(null);

// 🔥 CATEGORIA
   const [categoria, setCategoria] = useState("acai");
   const [busca, setBusca] = useState("");
   

  // 🔥 THEME
  const [dark, setDark] = useState(false);
  const themeAtual = dark ? darkTheme : lightTheme;
  // 🔥 cupom
  const [cupons, setCupons] = useState([]);
  const [cupomInput, setCupomInput] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);

  // 🔥 STEPS
  const [step, setStep] = useState(1);
  const [lojaAberta, setLojaAberta] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // 🔥 PRODUTO
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);

  // 🔥 EXTRAS
  const [extras, setExtras] = useState([]);
  const adicionais = [
    { nome: "Leite Condensado", preco: 2 },
    { nome: "Granola", preco: 2 },
    { nome: "Morango", preco: 2 },
    { nome: "Banana", preco: 2 },
    { nome: "Uva", preco: 2 },
    { nome: "Jujuba", preco: 2 },
    { nome: "Amedoim", preco: 2 }
  ];

  // 🔥 CARRINHO
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);

  // 🔥 CLIENTE
  const [clienteNome, setClienteNome] = useState("");


const [clienteCpf, setClienteCpf] = useState("");
const [clienteTelefone, setClienteTelefone] = useState("");
const [clienteEmail, setClienteEmail] = useState("");
const [clienteEndereco, setClienteEndereco] = useState("");
const [clienteNumeroCasa, setClienteNumeroCasa] = useState("");
const [clienteCep, setClienteCep] = useState("");


  // 🔥 CUPOM
  const [cupom, setCupom] = useState("");
  const [descontoCupom, setDescontoCupom] = useState(0);
  const [cupomAtivo, setCupomAtivo] = useState(null);

  // 🔥 TOTAL
  const totalExtras = (extras || []).reduce((acc, e) => acc + e.preco, 0);

  const totalCarrinho = carrinho.reduce(
  (acc, item) => acc + Number(item.total),
  0
);

let valorDesconto = 0;

if (cupomAplicado) {
  if (cupomAplicado.tipo === "porcentagem") {
    valorDesconto = (totalCarrinho * cupomAplicado.desconto) / 100;
  } else {
    valorDesconto = cupomAplicado.desconto;
  }
}

const totalFinal = Math.max(0, totalCarrinho - (valorDesconto || 0));
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
// 🔥 CUPOM
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
  function removerItem(index) {
  setCarrinho(prev => prev.filter((_, i) => i !== index));
}

  function adicionarCarrinho() {
    if (!produto) return;

    const total = (produto.preco + totalExtras) * quantidade;

    setCarrinho(prev => [
      ...prev,
      { produto, quantidade, extras, total }
    ]);

    setExtras([]);
    setQuantidade(1);
    setStep(3);
  }
// 🔥 EDITAR PEDIDO
  function editarItem(index) {

  const item = carrinho[index];

  // 🔥 carrega dados do item
  setProduto(item.produto);
  setQuantidade(item.quantidade);
  setExtras(item.extras || []);

  // 🔥 remove do carrinho (pra não duplicar)
  setCarrinho(prev => prev.filter((_, i) => i !== index));

  // 🔥 volta pra tela de edição
  setStep(2);
}

async function aplicarCupom() {
  const codigoDigitado = cupomInput.trim().toLowerCase();

  const cupom = cupons.find(
    c =>
      c.codigo?.toLowerCase() === codigoDigitado &&
      c.ativo === true
  );

  if (!cupom) {
    alert("Cupom inválido ❌");
    return;
  }

  const cpfLimpo = clienteCpf.replace(/\D/g, "");

  // 🔥 VALIDA DIRETO NO FIREBASE (ANTI-BUG)
  const snap = await getDoc(doc(db, "cupons", cupom.id));

  if (!snap.exists()) {
    alert("Cupom não encontrado ❌");
    return;
  }

  const dados = snap.data();

  if (dados.usos && dados.usos[cpfLimpo]) {
    alert("Você já usou esse cupom ❌");
    return;
  }

  setCupomAplicado({ id: cupom.id, ...dados });

  alert("Cupom aplicado ✅");
}

async function finalizarPedido() {

  if (!carrinho.length) {
    alert("Carrinho vazio!");
    return;
  }

  if (!clienteNome || !clienteTelefone) {
    alert("Preencha seus dados!");
    setStep(4);
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
      itens: carrinho,
      total: totalFinalPedido,
      status: "preparando",
      data: new Date().toISOString()
    };

    // 🔒 TRAVA CUPOM ANTES (ANTI-FRAUDE REAL)
    if (cupomAplicado?.id) {

      const cpfLimpo = clienteCpf.replace(/\D/g, "");

      await runTransaction(db, async (transaction) => {

        const ref = doc(db, "cupons", cupomAplicado.id);
        const snap = await transaction.get(ref);

        if (!snap.exists()) {
          throw "Cupom inválido ❌";
        }

        const dados = snap.data();

        // 🔥 BLOQUEIO REAL
        if (dados.usos && dados.usos[cpfLimpo]) {
          throw "Cupom já utilizado ❌";
        }

        // 🔥 MARCA COMO USADO
        transaction.update(ref, {
          [`usos.${cpfLimpo}`]: true
        });
      });
    }

    // 💾 AGORA SIM salva pedido
    await addDoc(collection(db, "pedidos"), pedido);

    // 📲 WHATSAPP (corrigido mobile)
    let mensagem = `🛒 *Pedido #${codigo}*\n\n`;

    carrinho.forEach((item, i) => {
      mensagem += `*${i + 1}. ${item.produto.nome}*\n`;
      mensagem += `Qtd: ${item.quantidade}\n`;

      if (item.extras?.length) {
        mensagem += "Extras:\n";
        item.extras.forEach(e => {
          mensagem += `+ ${e.nome}\n`;
        });
      }

      mensagem += `R$ ${Number(item.total).toFixed(2)}\n\n`;
    });

    mensagem += `💰 Total: R$ ${totalFinalPedido}\n\n`;
    mensagem += `👤 ${clienteNome}\n`;
    mensagem += `📞 ${clienteTelefone}\n`;

    if (clienteEndereco) {
      mensagem += `📍 ${clienteEndereco}, ${clienteNumeroCasa}\n`;
    }

    const numero = "5581973119512";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    if (/Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }

    // 🔥 limpa carrinho
    setCarrinho([]);
    setCupomAplicado(null);

    alert("Pedido realizado com sucesso! 🚀");

  } catch (e) {
    alert(e);
    console.log("ERRO FINAL:", e);
  }
}
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

  // 🔥 UI
return (
  <div style={{
    minHeight: "100vh",
    background: themeAtual.background,
    color: themeAtual.text,
    display: "flex",
    justifyContent: "center"
  }}>

    
    <div style={{ width: 420, padding: 20 }}>

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

<div style={{ display: "flex", alignItems: "center", gap: 10 }}></div>
    {logo && (
  <img
    src={logo}
    style={{
      width: 80,
      height: 80,
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: 10
    }}
  />
)}
    {/* TEXTO AQUI EM BAIXO*/}

  </h2>

  {/* 🔥 DIREITA */}
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

    {/* 🔥 CARRINHO */}
    <div
      onClick={() => setStep(3)}
      style={{
        position: "relative",
        cursor: "pointer",
        fontSize: 22
      }}
    >
      🛒
    </div>

    {/* 🔥 BOTÃO SAIR */}
    <button
      onClick={sair}
      style={{
        padding: "2px 8px",
        borderRadius: 10,
        border: "none",
        background: "#38094e",
        color: "#fff",
        cursor: "pointer",
        fontSize: 24
      }}
    >
      Sair
    </button>

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

      </div>

      {/* 🔥 SAUDAÇÃO */}
      <h3 style={{ marginBottom: 10 }}>
        👋 Olá, <span style={{ color: "#a855f7" }}>
          {clienteNome || "Cliente"}
        </span>
      </h3>

      {/* 🔥 MENU */}
      <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 15
      }}>

        <button onClick={() => {
        setStep(1);
        setCategoria("acai"); // 🔥 volta pra aba Açaí
        setBusca(""); // 🔥 limpa busca
        }}>
        Início
       </button>

        <button onClick={() => setStep(5)}>Pedidos</button>

        <button onClick={() => setStep(3)}>Carrinho</button>

        <button onClick={() => setStep(4)}>Dados</button>

        <button onClick={() => setStep(99)}>Informações</button>

        <button onClick={() => setDark(!dark)}>
          {dark ? "Escuro🌙" : "Claro☀️"}
        </button>

      </div>

      

      
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

{/* 🔥 buscar produtos */}
<div className="buscaBox">
  <input
    placeholder="🔍 Buscar produto..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
  />
</div>

{/* 🔥 abas dos produtos */}
   <div className="tabs">
     
  <button
  onClick={() => setCategoria("acai")}
  className={categoria === "acai" ? "activeTab" : ""}
>
   Açaí
</button>

<button
  onClick={() => setCategoria("bebidas")}
  className={categoria === "bebidas" ? "activeTab" : ""}
>
   Bebidas
</button>

<button
  onClick={() => setCategoria("teste")}
  className={categoria === "teste" ? "activeTab" : ""}
>
   Teste
</button>

<button
  onClick={() => setCategoria("teste2")}
  className={categoria === "teste2" ? "activeTab" : ""}
>
   Teste2
</button>

<button
  onClick={() => setCategoria("teste3")}
  className={categoria === "teste3" ? "activeTab" : ""}
>
   Teste3
</button>

</div>

    {produtos.length === 0 ? (

      /* 🔥 SKELETON SHIMMER */
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            height: 180,
            borderRadius: 20,
            background: "linear-gradient(90deg,#222,#333,#222)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite"
          }} />
        ))}
      </div>

    ) : (

      /* 🔥 GRID */
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }}>
      {/* 🔥 PRODUTOS MAP*/}
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

    // 🔍 BUSCA
    if (busca) {
      return nome.includes(termo);
    }

    // 📂 CATEGORIA
    return categoriaProduto === categoriaAtual;
  })
  .map(p => {
          const ativo = selectedId === p.id;

          return (
            <div
              key={p.id}
              onClick={(e) => {

                if (!lojaAberta) {
                  alert("🚫 Loja fechada");
                  return;
                }

                // 🔥 RIPPLE
                const rippleSpan = document.createElement("span");
                rippleSpan.style.position = "absolute";
                rippleSpan.style.background = "rgba(255,255,255,0.4)";
                rippleSpan.style.borderRadius = "50%";
                rippleSpan.style.transform = "scale(0)";
                rippleSpan.style.animation = "ripple 0.5s linear";
                rippleSpan.style.left = e.nativeEvent.offsetX + "px";
                rippleSpan.style.top = e.nativeEvent.offsetY + "px";
                rippleSpan.style.width = rippleSpan.style.height = "100px";

                e.currentTarget.appendChild(rippleSpan);
                setTimeout(() => rippleSpan.remove(), 500);

                setProduto(p);
                setSelectedId(p.id);

                setTimeout(() => setStep(2), 120);
              }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                cursor: lojaAberta ? "pointer" : "not-allowed",
                opacity: lojaAberta ? 1 : 0.5,
                transform: ativo ? "scale(0.96)" : "scale(1)",
                transition: "all 0.2s ease",
                boxShadow: ativo
                  ? "0 0 20px rgba(122,0,255,0.6)"
                  : "0 0 10px rgba(0,0,0,0.2)"
              }}
            >

              {/* 🔥 BADGE */}
              {p.maisVendido && (
                <div style={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  background: "linear-gradient(90deg,#ee737a,#ee737a)",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: 10,
                  fontSize: 10,
                  fontWeight: "bold",
                  zIndex: 2
                }}>
                  🔥 Mais vendido
                </div>
              )}

              {/* IMAGEM */}
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

              {/* OVERLAY */}
              <div style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 10,
                background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)"
              }}>

                {/* PREÇO */}
                <div style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  padding: "4px 8px",
                  borderRadius: 10,
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "#fff",
                  width: "fit-content",
                  marginBottom: 4
                }}>
                  R$ {Number(p.preco || 0).toFixed(2)}
                </div>

                {/* NOME */}
                <div style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "#fff"
                }}>
                  {p.nome} {p.tamanho || ""}
                </div>

                {/* DESCRIÇÃO */}
                <div style={{
                  fontSize: 11,
                  color: "#ddd",
                  opacity: 0.9,
                  marginTop: 2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {p.descricao || "Açaí tradicional com complementos"}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    )}

   
  </>
)}
        {step === 2 && (
  <>
    <h3>✨ Personalize seu açaí</h3>

    {/* QUANTIDADE */}
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 15
    }}>
      <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-</button>
      <strong>{quantidade}</strong>
      <button onClick={() => setQuantidade(q => q + 1)}>+</button>
    </div>

    {/* EXTRAS */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
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
                ? "2px solid #7a00ff"
                : "1px solid #ccc",
              background: selected
                ? "rgba(122,0,255,0.15)"
                : themeAtual.card,
              transition: "0.2s"
            }}
          >

            {/* NOME */}
            <div style={{
              fontWeight: "bold",
              marginBottom: 4
            }}>
              {e.nome}
            </div>

            {/* PREÇO */}
            <div style={{
              fontSize: 13,
              opacity: 0.8
            }}>
              + R$ {Number(e.preco).toFixed(2)}
            </div>

          </div>
        );
      })}

    </div>

    {/* TOTAL DINÂMICO */}
    <div style={{
      marginTop: 15,
      padding: 12,
      borderRadius: 12,
      background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center"
    }}>
      Total: R$ {((produto?.preco || 0) + totalExtras).toFixed(2)}
    </div>

    {/* BOTÕES */}
    <button style={{ marginTop: 10 }} onClick={adicionarCarrinho}>
      🛒 Adicionar ao carrinho
    </button>

    <button onClick={() => setStep(1)}>
      ← Voltar
    </button>
  </>
)}

        {step === 3 && (
  <>
    <h3>🛒 Seu Carrinho</h3>

    {carrinho.length === 0 && (
      <p>Seu carrinho está vazio</p>
    )}

    {carrinho.map((item, i) => (
      <div key={i} style={{
        background: themeAtual.card,
        padding: 15,
        borderRadius: 16,
        marginBottom: 10,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)"
      }}>

        {/* 🔥 PRODUTO */}
        <p style={{ fontWeight: "bold", fontSize: 16 }}>
          {item.produto.nome}
        </p>

        {/* 🔥 QUANTIDADE */}
        <p style={{ fontSize: 13, opacity: 0.8 }}>
          Quantidade: {item.quantidade}
        </p>

        {/* 🔥 EXTRAS */}
        {item.extras?.length > 0 && (
          <div style={{ marginTop: 5 }}>
            {item.extras.map(e => (
              <div key={e.nome} style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13
              }}>
                <span>+ {e.nome}</span>
                <span>R$ {Number(e.preco).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {/* 🔥 TOTAL ITEM */}
        <p style={{
          marginTop: 8,
          fontWeight: "bold",
          color: "#a855f7"
        }}>
          Total: R$ {Number(item.total).toFixed(2)}
        </p>
       {/* 🔥 EDITAR PEDIDO */}
        <button onClick={() => editarItem(i)}>
        ✏️ Editar
       </button>

        {/* 🔥 AÇÕES */}
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button onClick={() => removerItem(i)}>
            🗑️ Remover
          </button>
        </div>

      </div>
    ))}

    {/* 🔥 CUPOM */}
<div style={{
  marginTop: 15,
  padding: 12,
  borderRadius: 14,
  border: "2px solid #7a00ff",
  background: themeAtual.card
}}>

  <strong>🎟️ Cupom de desconto</strong>

  <p style={{
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4
  }}>
    Use um cupom para ganhar desconto (ex: DESCONTO10)
  </p>

  <div style={{
    display: "flex",
    gap: 8,
    marginTop: 10
  }}>

    <input
  placeholder="Cupom"
  value={cupomInput}
  disabled={!!cupomAplicado}
  onChange={(e) => setCupomInput(e.target.value.toUpperCase())}
/>

<button
  onClick={aplicarCupom}
  disabled={!!cupomAplicado}
>
  Aplicar cupom
</button>

{/* 🔥 PASSO 4 AQUI */}
{cupomAplicado && (
  <button
    onClick={() => {
      setCupomAplicado(null);
      setCupomInput("");
    }}
    style={{
      marginTop: 8,
      background: "#9a03ff",
      color: "#fff"
      
    }}
  >
    ❌ Remover cupom
  </button>
)}

  </div>

</div>

{/* 🔥 FEEDBACK DO CUPOM */}
{cupomAtivo && (
  <div style={{
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    background: "linear-gradient(90deg,#5a00ff,#8a00ff)",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between"
  }}>
    <span>✔ Cupom: {cupomAtivo}</span>
    <strong>- R$ {descontoCupom.toFixed(2)}</strong>
  </div>
)}

    {/* 🔥 TOTAL FINAL */}
    <div style={{
      marginTop: 15,
      padding: 14,
      borderRadius: 14,
      background: "linear-gradient(90deg,#6a00ff,#ff2aff)",
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold"
    }}>
      <p>Subtotal: R$ {Number(totalCarrinho || 0).toFixed(2)}</p>

    {cupomAplicado && (
    <p style={{ color: "#22c55e" }}>
    Desconto: -R$ {(Number(valorDesconto || 0)).toFixed(2)}
   </p>
)}

<p>
  <strong>Total: R$ {(Number(totalFinal || 0)).toFixed(2)}</strong>
</p>
    </div>
{/* 🔥 FINALIZAR PEDIDO */}
<button
  style={{
    padding: 12,
    borderRadius: 12,
    background: "#6a00ff",
    color: "#fff"
  }}
  onClick={finalizarPedido}
>
  📲 Finalizar Pedido
</button>

    <button onClick={() => setStep(2)}>
      ← Voltar
    </button>
  </>
)}
{/* STEP 4 */}
   {step === 4 && (
  <>
    <h3>👤 Dados do Cliente</h3>

    <div className="dadosGrid" style={{
     background: themeAtual.card,
     padding: 20,
     borderRadius: 16
     }}>

      {/* NOME */}
      <div>
        <small style={{ opacity: 0.6 }}>Nome</small>
        <input
          value={clienteNome}
          onChange={(e) => setClienteNome(e.target.value)}
        />
      </div>

      {/* CPF BLOQUEADO */}
      <div>
        <small style={{ opacity: 0.6 }}>CPF</small>
        <input
          value={clienteCpf}
          disabled
          style={{
            
            cursor: "not-allowed"
          }}
        />
      </div>

      {/* TELEFONE */}
<div>
  <small style={{ opacity: 0.6 }}>Telefone</small>
  <input
    value={clienteTelefone}
    onChange={(e) => {
      const formatado = formatarTelefone(e.target.value);
      setClienteTelefone(formatado);
    }}
    placeholder="(00) 00000-0000"
  />
</div>

      {/* EMAIL */}
      <div>
  <small style={{ opacity: 0.6 }}>Email</small>
  <input
    type="email"
    value={clienteEmail}
    disabled
    style={{
     cursor: "not-allowed"
    }}
  />
</div>

      {/* CEP */}
      <div>
  <small style={{ opacity: 0.6 }}>CEP</small>
  <input
    value={clienteCep}
    onChange={(e) => {
      const formatado = formatarCEP(e.target.value);
      setClienteCep(formatado);

      const cepLimpo = formatado.replace(/\D/g, "");

      if (cepLimpo.length === 8) {
        buscarCEP(cepLimpo);
      }
    }}
    placeholder="00000-000"
  />
</div>

      {/* ENDEREÇO */}
      <div>
        <small style={{ opacity: 0.6 }}>Endereço</small>
        <input
          value={clienteEndereco}
          onChange={(e) => setClienteEndereco(e.target.value)}
        />
      </div>

      {/* NÚMERO */}
      <div>
        <small style={{ opacity: 0.6 }}>Número</small>
        <input
          value={clienteNumeroCasa}
          onChange={(e) => setClienteNumeroCasa(e.target.value)}
        />
      </div>

    </div>

    {/* BOTÕES */}
    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
      <button
  onClick={salvarDadosCliente}
  disabled={!authReady}
>
  💾 Salvar dados
</button>

      <button onClick={() => setStep(1)}>
        ← Voltar
      </button>
    </div>
  </>
)}

{step === 5 && (
  <>
    <h3>📦 Seus pedidos</h3>

    {pedidos.length === 0 && (
      <p>Nenhum pedido ainda</p>
    )}

    {pedidos.map((p, i) => (
      <div key={i} style={{
        background: themeAtual.card,
        padding: 15,
        borderRadius: 14,
        marginBottom: 10
      }}>

        {/* 🔥 CÓDIGO */}
        <p><strong>Pedido #{p.codigo}</strong></p>

        {/* 🔥 CLIENTE (CORRIGIDO) */}
        <p>👤 {p.cliente?.nome}</p>
        <p>📞 {p.cliente?.telefone}</p>

        {p.cliente?.endereco && (
          <p>
            📍 {p.cliente.endereco}, {p.cliente.numero}
          </p>
        )}

        {/* 🔥 STATUS */}
        <p>Status: 
          <span style={{
            color:
              p.status === "preparando" ? "#facc15" :
              p.status === "saiu para entrega" ? "#60a5fa" :
              "#4ade80"
          }}>
            {" " + p.status}
          </span>
        </p>

        {/* 🔥 TOTAL */}
        <p>Total: R$ {Number(p.total).toFixed(2)}</p>

        {/* 🔥 DATA */}
        <small style={{ opacity: 0.6 }}>
          {new Date(p.data).toLocaleString()}
        </small>

      </div>
    ))}

    <button onClick={() => setStep(1)}>
      ← Voltar
    </button>
  </>
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
      <button
        onClick={instalarApp}
        className="btnInstall"
      >
        📲 Instalar App
      </button>
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

  `}</style>
    
    </div>
    </div>
  );
}


