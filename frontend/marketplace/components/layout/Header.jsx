import { Link } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
          Inicio
        </Link>
        <Link to="#" className="btn">
          Productos
        </Link>

        {!isAuthenticated ? (
          <Link to="/login" className="btn">
            Inicio Sesión
          </Link>
        ) : (
          <>
            <Link to="/mispublicaciones" className="btn">
              Mis Publicaciones
            </Link>
            <Link to="/miperfil" className="btn">
              Mi Perfil
            </Link>
            <button onClick={handleLogout} className="btn">
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
}
