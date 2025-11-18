import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";

export default function MiPerfil() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center bg-base-200 border-base-300 border p-10 max-w-md mx-auto mt-8">
      <h3 className="font-bold text-2xl">Mi Perfil</h3>
      <p className="text-xs text-gray-500 mt-3">
        Gestiona tu información personal
      </p>

      <div className="mt-8 flex flex-col items-center w-full">
        {/* Avatar de Usuario */}
        <div className="avatar mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center text-2xl font-bold">
            <User size={48} />
          </div>
        </div>

        {/* Información del Usuario */}
        <div className="w-full space-y-4">
          <div className="flex flex-col">
            <label className="label font-bold text-sm">Nombre de Usuario</label>
            <div className="p-3 bg-base-100 rounded-lg border border-base-300">
              <span className="text-base">{user.nombre}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="label font-bold text-sm">
              Correo Electrónico
            </label>
            <div className="p-3 bg-base-100 rounded-lg border border-base-300">
              <span className="text-base">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col gap-3 w-full mt-8">
          <Link to="/mispublicaciones" className="btn btn-primary w-full gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Mis Publicaciones</span>
          </Link>

          <Link
            to="/nuevo"
            className="btn btn-outline btn-primary w-full gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Crear Publicación</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
