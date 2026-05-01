import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { dbCliente } from "../../../services/firebaseDual";

export default function usePedidosUsuario(user) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(dbCliente, "pedidos"),
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
  }, [user?.uid]);

  return { pedidos };
}