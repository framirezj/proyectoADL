// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// redirectIfAuth: adónde enviar si el usuario autenticado accede a una ruta solo para invitados
// redirectIfUnauth: adónde enviar si el usuario NO autenticado accede a una ruta protegida
const ProtectedRoute = ({
  children,
  requireAuth = true,
  redirectIfAuth = "/miperfil",
  redirectIfUnauth = "/login",
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate to={redirectIfUnauth} state={{ from: location }} replace />
    );
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectIfAuth} replace />;
  }

  // Si pasa todas las validaciones, renderizar los children
  return children;
};

export default ProtectedRoute;
