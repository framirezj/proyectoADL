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
      setLoading(true);
      setError(null);

      // 1. Cargar desde cache para un renderizado rápido
      try {
        const cached = localStorage.getItem("marketplace_categories");
        if (cached) {
          setCategories(JSON.parse(cached));
        }
      } catch (e) {
        console.error("Error parsing categories from localStorage", e);
      }

      // 2. Actualizar desde la API
      try {
        const response = await api.get("/categoria", {
          timeout: 10000, // 10 segundos timeout
        });

        const newCategories = response.data.categorias;

        // Solo actualizar si los datos son diferentes para evitar re-renders innecesarios
        if (JSON.stringify(newCategories) !== JSON.stringify(categories)) {
          setCategories(newCategories);
          localStorage.setItem(
            "marketplace_categories",
            JSON.stringify(newCategories)
          );
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Error cargando categorías";
        setError(errorMessage);
        console.error("Categories API error:", err);

        // Si la API falla y no hay nada en cache, limpiar las categorías
        if (categories.length === 0) {
          setCategories([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para forzar recarga
  const refreshCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/categoria"); // Corregido: usar api y endpoint correcto
      const newCategories = response.data.categorias; // Corregido: acceder a la propiedad correcta
      setCategories(newCategories);
      localStorage.setItem(
        "marketplace_categories",
        JSON.stringify(newCategories)
      );
      setError(null); // Limpiar errores previos
      return newCategories;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error actualizando categorías";
      setError(errorMessage);
      console.error("Error refreshing categories:", err);
      throw err; // Relanzar para que el llamador pueda manejarlo
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
