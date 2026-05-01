import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { dbCliente } from "../../../services/firebaseDual";

export default function useProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(dbCliente, "produtos"), (snapshot) => {
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

  return { produtos };
}