import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore';

export default function Pedido() {

  const [pedido, setPedido] = useState(null);

  useEffect(() => {

    // 🔥 fallback seguro (caso não tenha criadoEm)
    const q = query(
      collection(db, "pedidos"),
      orderBy("data", "desc"),
      limit(1)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs[0]?.data();
      setPedido(data || null);
    });

    return () => unsub();

  }, []);

  if (!pedido) {
    return <p style={{ padding: 20 }}>⏳ Carregando pedido...</p>;
  }

  const etapas = ["novo", "preparando", "saiu", "entregue"];

  const cores = {
    novo: "#888",
    preparando: "orange",
    saiu: "#00b0ff",
    entregue: "#00c853"
  };

  const indexAtual = etapas.indexOf(pedido.status);

  return (
    <div style={{
      padding: 20,
      color: "#fff"
    }}>

      <h1>📦 Acompanhar Pedido</h1>
      <p>
  Código do pedido: <strong>{pedido.codigo}</strong>
</p>

      {/* 🔥 BARRA DE PROGRESSO */}
      <div style={{
        height: 6,
        background: "#222",
        borderRadius: 10,
        margin: "15px 0"
      }}>
        <div style={{
          height: "100%",
          width: `${(indexAtual + 1) * 25}%`,
          background: "#6a00ff",
          borderRadius: 10,
          transition: "0.3s"
        }} />
      </div>

      {/* 🔥 ETAPAS */}
      {etapas.map((e, i) => {

        const ativo = i <= indexAtual;

        return (
          <div key={e} style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 12,
            background: ativo ? cores[e] : "#111",
            opacity: ativo ? 1 : 0.4,
            transition: "0.3s"
          }}>
            {ativo ? "✔️ " : "⏳ "}
            {e}
          </div>
        );
      })}

      {/* 🔥 TOTAL */}
      <h2 style={{ marginTop: 20 }}>
        Total: R$ {Number(pedido.total || 0).toFixed(2)}
      </h2>

    </div>
  );
}