import { Link } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { House, List, LogIn, LogOut, ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="navbar py-4">
          {/* Logo y marca */}
          <div className="navbar-start">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-12 h-12    ">
                <img
                  src="/pulgalogo.png"
                  alt="Pulga Vibe Logo"
                  className=""
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Pulga Vibe
                </span>
                <span className="text-xs text-base-content/60 -mt-1">Tu marketplace de confianza</span>
              </div>
            </Link>
          </div>

          {/* Navegación desktop */}
          <div className="navbar-center hidden lg:flex">
            <div className="flex items-center gap-1 bg-base-200 rounded-2xl p-1 shadow-inner">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 hover:bg-base-100 hover:shadow-sm"
              >
                <House size={20} />
                <span className="font-semibold">Inicio</span>
              </Link>
              <Link 
                to="/catalogo" 
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 hover:bg-base-100 hover:shadow-sm"
              >
                <List size={20} />
                <span className="font-semibold">Productos</span>
              </Link>
            </div>
          </div>

          {/* Acciones desktop */}
          <div className="navbar-end hidden lg:flex">
            <div className="flex items-center gap-3">
              {/* Carrito siempre visible */}
              <Link 
                to="/carrito" 
                className="btn btn-ghost btn-circle relative hover:bg-primary/10 transition-colors"
                aria-label="Carrito de compras"
              >
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              {/* Estado de autenticación */}
              {!isAuthenticated ? (
                <Link 
                  to="/login" 
                  className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <LogIn size={20} />
                  Iniciar Sesión
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Menú de usuario */}
                  <div className="dropdown dropdown-end">
                    <div 
                      tabIndex={0} 
                      role="button" 
                      className="btn btn-ghost gap-2 hover:bg-base-200 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <span className="font-semibold">Mi Cuenta</span>
                    </div>
                    <ul 
                      tabIndex={0} 
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-2xl border border-base-300 mt-4"
                    >
                      <li>
                        <Link to="/miperfil" className="flex items-center gap-3 py-3">
                          <User size={18} />
                          <span className="font-medium">Mi Perfil</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/mispublicaciones" className="flex items-center gap-3 py-3">
                          <List size={18} />
                          <span className="font-medium">Mis Publicaciones</span>
                        </Link>
                      </li>
                      <div className="divider my-1"></div>
                      <li>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 py-3 text-error hover:bg-error/10"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Cerrar Sesión</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Menú móvil */}
          <div className="navbar-end lg:hidden">
            <div className="flex items-center gap-2">
              {/* Carrito móvil */}
              <Link 
                to="/carrito" 
                className="btn btn-ghost btn-circle relative hover:bg-primary/10"
                aria-label="Carrito de compras"
              >
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              {/* Botón menú hamburguesa */}
              <button 
                className="btn btn-ghost btn-circle hover:bg-base-200"
                onClick={toggleMobileMenu}
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-base-100 border-t border-base-300 shadow-2xl animate-slide-down">
            <div className="py-4 space-y-2">
              <Link 
                to="/" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <House size={20} />
                <span className="font-semibold">Inicio</span>
              </Link>
              <Link 
                to="/catalogo" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <List size={20} />
                <span className="font-semibold">Productos</span>
              </Link>

              {!isAuthenticated ? (
                <Link 
                  to="/login" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-content hover:bg-primary-focus transition-colors mx-4 mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={20} />
                  <span className="font-semibold">Iniciar Sesión</span>
                </Link>
              ) : (
                <>
                  <Link 
                    to="/miperfil" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    <span className="font-semibold">Mi Perfil</span>
                  </Link>
                  <Link 
                    to="/mispublicaciones" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <List size={20} />
                    <span className="font-semibold">Mis Publicaciones</span>
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error/10 text-error w-full text-left transition-colors"
                  >
                    <LogOut size={20} />
                    <span className="font-semibold">Cerrar Sesión</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}