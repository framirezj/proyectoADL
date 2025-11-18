import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="flex flex-col items-center pt-12 gap-4">
      {location.state?.from && (
        <div className="alert alert-info max-w-lg">
          <span>
            {from === "/carrito"
              ? "Para pagar tu carrito, inicia sesión o regístrate."
              : "Debes iniciar sesión para continuar."}
          </span>
        </div>
      )}
      <LoginForm login={login} />
    </div>
  );
}
