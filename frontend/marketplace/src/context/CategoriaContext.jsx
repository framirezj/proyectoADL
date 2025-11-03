// context/CategoriesContext.js
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig.js";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intentar cargar desde cache primero para mostrar rápido
        const cached = localStorage.getItem("marketplace_categories");
        if (cached && cached !== "undefined") {
          setCategories(JSON.parse(cached));
        }

        // Luego actualizar desde API
        const response = await api.get('/categoria',
          {
            timeout: 10000, // 10 segundos timeout
          }
        );

        const newCategories = response.data.categorias;
        setCategories(newCategories);
        localStorage.setItem(
          "marketplace_categories",
          JSON.stringify(newCategories)
        );
      } catch (err) {
        setError(err.response?.data?.message || "Error cargando categorías");
        console.error("Categories API error:", err);

        // Si no hay cache y falló la API, mantener loading false
        const cached = localStorage.getItem("marketplace_categories");
        if (!cached) {
          setCategories([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Función para forzar recarga (útil cuando se agregan categorías)
  const refreshCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/categories");
      const newCategories = response.data;
      setCategories(newCategories);
      localStorage.setItem(
        "marketplace_categories",
        JSON.stringify(newCategories)
      );
      return newCategories;
    } catch (err) {
      setError(err.response?.data?.message || "Error actualizando categorías");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    categories,
    loading,
    error,
    refreshCategories,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoriesProvider");
  }
  return context;
};
