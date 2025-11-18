import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

// Crear el Context
const AuthContext = createContext();

// Hook personalizado para usar el Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Proveedor del Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario guardado al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verificar token con el backend y refrescar datos de usuario
          const { data } = await api.get("/usuarios/me");
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
          } else {
            // Si la respuesta no es válida, cerrar sesión
            logout();
          }
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función para login
  const login = async (userData, token) => {
    try {
      // Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Actualizar estado
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: error.message };
    }
  };

  // Función para logout
  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Actualizar estado
    setUser(null);
  };

  // Función para actualizar datos del usuario
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Valores que estarán disponibles en el Context
  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
