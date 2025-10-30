import { Link } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { House, List, LogIn, LogOut, ShoppingCart } from "lucide-react";

export default function Header() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar bg-base-100 flex justify-evenly shadow-sm">
      <div className="flex items-center">
        <img
          src="/pulgalogo.png"
          alt="Logo"
          className="h-25 w-auto ml-2" // margen a la izquierda
        />
        <a className="btn btn-ghost text-xl">Pulga Vibe</a>
      </div>
      <div className="navbar-end flex gap-4">
        <Link to="/" className="btn">
          <House />
          Inicio
        </Link>
        <Link to="/catalogo" className="btn">
          <List />
          Productos
        </Link>

        {!isAuthenticated ? (
          <Link to="/login" className="btn">
            <LogIn />
            Inicio Sesión
          </Link>
        ) : (
          <>
            <Link to="/miperfil" className="btn">
              Mi Perfil
            </Link>
            <button onClick={handleLogout} className="btn">
              <LogOut />
              Cerrar Sesión
            </button>
          </>
        )}

        <Link to="/carrito" className="btn">
          <ShoppingCart />
        </Link>
      </div>
    </header>
  );
}
