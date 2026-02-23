import { useEffect } from "react";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export const useFetch = (db, collectionName) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Cancela se o componente desmontar

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // const response = await fetch(url, { signal: controller.signal });
        const querySnapshot = await getDocs(collection(db, collectionName));
        const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // if (!response.ok) {
        //   throw new Error(`Erro HTTP: ${response.status}`);
        // }

        // const result = await response.json();
        setData(projectsData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Erro ao buscar dados");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [db, collectionName]); // Se a url mudar refaz o fetch
  return { data, loading, error };
};
