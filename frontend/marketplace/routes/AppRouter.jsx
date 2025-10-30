//import { showSuccess, showError } from "../../util/toast";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/Home";
import LayoutMain from "../components/layout/LayoutMain";
import Register from "../pages/Register";
import MiPerfil from "../pages/MiPerfil";
import MisPublicaciones from "../pages/MisPublicaciones";
import ProductoForm from "../pages/ProductoForm";
import ShoppingCart from "../pages/Carrito";
import ProductDetail from "../pages/DetalleProducto";
import { useAuth } from "../src/context/AuthContext";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Componente de loading global
const GlobalLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-gray-600">Cargando aplicación...</p>
    </div>
  </div>
);

export default function AppRouter() {
  const { loading } = useAuth

    if (loading) {
    return <GlobalLoading />;
  }

   return (
    <Routes>
      <Route element={<LayoutMain />}>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detalle" element={<ProductDetail />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/miperfil" 
        element={
          <ProtectedRoute>
            <MiPerfil />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mispublicaciones" 
        element={
          <ProtectedRoute>
            <MisPublicaciones />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/nuevo" 
        element={
          <ProtectedRoute>
            <ProductoForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/carrito" 
        element={
          <ProtectedRoute>
            <ShoppingCart />
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-error mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-4">Página no encontrada</p>
            <a href="/" className="btn btn-primary">Volver al inicio</a>
          </div>
        </div>
      } />
      </Route>
    </Routes>
  );
}
