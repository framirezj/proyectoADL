// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
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
    // Redirigir al login guardando la ubicación actual para volver después
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si la ruta es para usuarios NO autenticados (como login) y el usuario SÍ está autenticado
  if (!requireAuth && isAuthenticated) {
    // Redirigir al dashboard o página principal
    return <Navigate to="/dashboard" replace />;
  }

  // Si pasa todas las validaciones, renderizar los children
  return children;
};

export default ProtectedRoute;