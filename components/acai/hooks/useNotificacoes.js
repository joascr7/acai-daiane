import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { dbCliente } from "../../../services/firebaseDual";

export default function useNotificacoes(user, authReady) {
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    if (!authReady) return;
    if (!user?.uid) return;

    const ref = collection(dbCliente, "notificacoes");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filtradas = lista.filter(n => {
        if (!n?.ativo) return false;

        if (n?.para === "todos") return true;

        if (
          n?.para === "usuario" &&
          n?.uid &&
          String(n.uid) === String(user.uid)
        ) {
          return true;
        }

        return false;
      });

      setNotificacoes(filtradas);
    });

    return () => unsubscribe();
  }, [user?.uid, authReady]);

  return { notificacoes };
}