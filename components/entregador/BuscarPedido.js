import { useState } from "react";
import { db } from "@/services/firebase";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

export default function BuscarPedido({ setPedido }) {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);

  async function buscar() {
    if (!codigo) {
      alert("Digite o código do pedido");
      return;
    }

    try {
      setLoading(true);

      const q = query(
        collection(db, "pedidos"),
        where("codigo", "==", Number(codigo))
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        alert("❌ Pedido não encontrado");
        return;
      }

      const docData = snap.docs[0];

      setPedido({
        id: docData.id,
        ...docData.data()
      });

    } catch (e) {
      console.log(e);
      alert("Erro ao buscar pedido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🔎 Buscar Pedido</h2>

      <input
        placeholder="Código do pedido"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        style={{
          padding: 12,
          borderRadius: 10,
          border: "1px solid #ccc",
          width: "100%",
          marginBottom: 10
        }}
      />

      <button
        onClick={buscar}
        style={{
          padding: 12,
          borderRadius: 10,
          background: "#ff2a2a",
          color: "#fff",
          border: "none",
          width: "100%",
          fontWeight: "bold"
        }}
      >
        {loading ? "Buscando..." : "Buscar Pedido"}
      </button>
    </div>
  );
}