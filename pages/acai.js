import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { db, auth } from '../services/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc
} from 'firebase/firestore';

export default function Acai() {

  const router = useRouter();

  const [step, setStep] = useState(1);
  const [produto, setProduto] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [extras, setExtras] = useState([]);
  const [pagamento, setPagamento] = useState("");
  const [cliente, setCliente] = useState('');
  const [historico, setHistorico] = useState([]);
  const [dark, setDark] = useState(false);
  const [cupom, setCupom] = useState("");
  const [descontoCupom, setDescontoCupom] = useState(0);
  const [cupomAtivo, setCupomAtivo] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [loadingPedido, setLoadingPedido] = useState(false);
  const [lojaAberta, setLojaAberta] = useState(null);

  useEffect(() => {
    const clienteLocal = localStorage.getItem("cliente") || "Cliente";
    const pedidosLocal = JSON.parse(localStorage.getItem("pedidos")) || [];

    setCliente(clienteLocal);
    setHistorico(pedidosLocal);

    if (auth.currentUser) {
      const q = query(
        collection(db, "pedidos"),
        where("userId", "==", auth.currentUser.uid)
      );

      const unsub = onSnapshot(q, (snapshot) => {
        const firebasePedidos = snapshot.docs.map(doc => doc.data());
        const combinado = [...firebasePedidos, ...pedidosLocal];
        setHistorico(combinado);
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

  async function salvarPedido(pedido) {
  try {
    await addDoc(collection(db, "pedidos"), {
      userId: auth.currentUser?.uid || null,
      cliente: pedido.cliente || "Cliente",

      // 🔥 CÓDIGO DO PEDIDO
      codigo: pedido.codigo || null,

      // 🔥 PRODUTO LIMPO
      produto: {
        nome: pedido.produto?.nome || "",
        preco: Number(pedido.produto?.preco || 0)
      },

      // 🔥 EXTRAS LIMPOS
      extras: (pedido.extras || []).map(e => ({
        nome: e.nome,
        preco: Number(e.preco)
      })),

      quantidade: Number(pedido.quantidade || 1),
      total: Number(pedido.total || 0),

      pagamento: pedido.pagamento || "",
      cupom: pedido.cupom || "",
      descontoCupom: Number(pedido.descontoCupom || 0),

      // 🔥 STATUS PADRÃO
      status: pedido.status || "preparando",

      // 🔥 DATA PADRÃO (ESSENCIAL PRO ADMIN)
      data: pedido.data || new Date().toISOString()
    });

  } catch (error) {
    console.error("🔥 ERRO FIREBASE:", error);
    throw error;
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

  // 🔥 BLOQUEIO LOJA
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
    const pedidos = carrinho.map(item => ({
      id: Date.now() + Math.random(),

      // 🔥 NOVO CÓDIGO DO PEDIDO
      codigo: gerarCodigoPedido(),

      cliente,
      produto: item.produto,
      extras: item.extras,
      quantidade: item.quantidade,
      total: item.total,
      pagamento,
      cupom,
      descontoCupom,
      status: "preparando",

      // 🔥 DATA PADRÃO
      data: new Date().toISOString()
    }));

    await Promise.all(pedidos.map(p => salvarPedido(p)));

    const novos = [...pedidos, ...historico];

    localStorage.setItem("pedidos", JSON.stringify(novos));
    setHistorico(novos);

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

{lojaAberta === false && (
  <div style={{
    background: '#2a0000',
    color: '#ff4d4d',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  }}>
    🚫 Loja fechada no momento
  </div>
)}

  // 🔥 CLONA EXTRAS CORRETAMENTE
  const extrasClonados = extras.map(e => ({
    nome: e.nome,
    preco: Number(e.preco)
  }));

  // 🔥 SOMA EXTRAS
  const totalExtras = extrasClonados.reduce((acc, e) => acc + e.preco, 0);

  // 🔥 CALCULO REAL DO ITEM
  let totalItem = ((produto.preco || 0) + totalExtras) * quantidade;

  // 🔥 DESCONTO
  totalItem -= descontoCupom;
  if (totalItem < 0) totalItem = 0;

  const item = {
    produto: { ...produto },
    extras: extrasClonados,
    quantidade,
    total: totalItem
  };

  setCarrinho(prev => [...prev, item]);

  // 🔥 RESET LIMPO
  setExtras([]);
  setQuantidade(1);
  setCupom("");
  setCupomAtivo(null);
  setDescontoCupom(0);

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

    {/* 🔥 MODAL CORRETO */}
    {pedidoConfirmado && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}>
        <div style={{
          background: "#fff",
          padding: 25,
          borderRadius: 16,
          width: 300,
          textAlign: "center"
        }}>
          <h2>✅ Pedido realizado!</h2>
          <p>Seu açaí já está sendo preparado 🍧</p>

          <button onClick={() => {
            setPedidoConfirmado(false);
            setStep(5);
          }}>
            📦 Acompanhar pedido
          </button>

          <button onClick={() => setPedidoConfirmado(false)}>
            Fechar
          </button>
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

      <p>Olá, {cliente}</p>

      <button onClick={sair}>Sair</button>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(5)}>Pedidos</button>
        <button onClick={() => setStep(99)}>Informações</button>
        <button onClick={() => setDark(!dark)}>Claro/Escuro</button>
      </div>

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
          <strong>
            {item.produto.nome} (x{item.quantidade})
          </strong>
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

        <p>
          Total: <strong>R$ {Number(item.total).toFixed(2)}</strong>
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => editarItem(item, i)}>✏️</button>
          <button onClick={() => removerItem(i)}>🗑️</button>
        </div>

      </div>
    ))}

    {/* 🔥 CUPOM */}
    <h4>Cupom</h4>

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

    {/* 🔥 MOSTRAR CUPOM ATIVO */}
    {cupomAtivo && (
      <p style={{ color: "#00ff88", marginTop: 10 }}>
        🎟️ Cupom aplicado: {cupomAtivo} (-R$ {descontoCupom})
      </p>
    )}

    {/* 🔥 TOTAL FINAL */}
    <h4>
      Total: R$ {Number(totalCarrinho - descontoCupom).toFixed(2)}
    </h4>

    {/* 💳 PAGAMENTO */}
    <h4>Pagamento</h4>

    {["Pix", "Cartão", "Dinheiro"].map(p => (
      <div
        key={p}
        onClick={() => setPagamento(p)}
        className={`extra ${pagamento === p ? 'selected' : ''}`}
      >
        {pagamento === p ? "✅ " : ""}{p}
      </div>
    ))}

    <button onClick={duplicarAtual}>
      🔁 Duplicar pedido
    </button>

    <button 
      onClick={finalizarPedido}
      disabled={!lojaAberta || loadingPedido}
      style={{
        opacity: !lojaAberta ? 0.5 : 1,
        cursor: !lojaAberta ? "not-allowed" : "pointer"
      }}
    >
      {!lojaAberta
        ? "🚫 Loja fechada"
        : loadingPedido
          ? "Processando..."
          : "Finalizar"}
    </button>

    <button onClick={() => setStep(2)}>← Voltar</button>
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

      {historico
        // 🔥 ORDENA MAIS NOVOS PRIMEIRO
        .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))

        .map((p, i) => (
          <div key={i} className="history">

            <p><strong>
              {p.produto?.nome} (x{p.quantidade || 1})
            </strong></p>

            {/* 🔥 CÓDIGO DO PEDIDO */}
            <p>
              Código: <strong>{p.codigo || "—"}</strong>
            </p>

            {/* 🔥 DATA */}
            <p style={{ fontSize: 12, opacity: 0.7 }}>
              {p.data ? new Date(p.data).toLocaleString("pt-BR") : ""}
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
                {p.status}
              </strong>
            </p>

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
`}</style>

      </div>
    </div>
  );
}