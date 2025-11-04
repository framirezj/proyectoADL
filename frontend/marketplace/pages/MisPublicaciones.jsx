import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../src/api/axiosConfig";

export default function MisPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos de ejemplo para las publicaciones
  /* const publicaciones = [
    {
      id: 1,
      titulo: "iPhone 13 Pro",
      categoria: "Telefonía",
      condicion: "nuevo",
      precio: 899,
      imagen: "📱",
      colorGradiente: "from-blue-400 to-blue-600",
      vistas: 124,
      favoritos: 8,
      fecha: "2024-01-15",
    },
    {
      id: 2,
      titulo: "MacBook Air M2",
      categoria: "Computación",
      condicion: "usado",
      precio: 1199,
      imagen: "💻",
      colorGradiente: "from-green-400 to-green-600",
      vistas: 89,
      favoritos: 12,
      fecha: "2024-01-10",
    },
  ]; */

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        setLoading(true);
        // 🔹 Llamada a tu API
        const response = await api.get("/usuarios/publicaciones");

        // 🔹 Extraer solo el array de publicaciones
        setPublicaciones(response.data.publicaciones);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las publicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  const handleDelete = async (productoId) => {
    try {
      await api.delete(`/producto/${productoId}`);

      // actulizar la lista
      setPublicaciones((prevPublicaciones) => prevPublicaciones.filter((item) => item.id !== productoId))

    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  }

  const getEstadoBadge = (condicion) => {
    const config = {
      nuevo: { clase: "badge-success", texto: "Nuevo" },
      usado: { clase: "badge-warning", texto: "Usado" },
    };

    const { clase, texto } = config[condicion];
    return (
      <span className={`badge ${clase} badge-lg text-white font-semibold`}>
        {texto}
      </span>
    );
  };

  if (loading) return <p>Cargando publicaciones...</p>;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold text-base-content mb-2">
                Mis Publicaciones
              </h1>
              <p className="text-base-content/70 text-lg">
                Gestiona y revisa el rendimiento de tus productos publicados
              </p>
            </div>

            {/* Estadísticas rápidas */}
            <div className="">
              <div className="bg-primary/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {publicaciones.length}
                </div>
                <div className="text-sm text-base-content/70">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de nueva publicación */}
        <div className="flex justify-end mt-4 mb-8">
          <Link to="/nuevo" className="btn btn-primary btn-lg gap-3 px-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            Crear Nueva Publicación
          </Link>
        </div>

        {/* Lista de publicaciones */}
        <div className="space-y-4">
          {publicaciones.map((publicacion) => (
            <div
              key={publicacion.id}
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Imagen del producto */}
                  <div className="flex-shrink-0">
                    {publicacion.imagen ? (
                      <img
                        src={publicacion.imagen}
                        alt={publicacion.titulo}
                        className="w-24 h-24 object-cover rounded-2xl shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-base-300 flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  {/* Información principal */}
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-base-content mb-1">
                          {publicacion.titulo}
                        </h3>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-base-content/70 text-sm">
                            {publicacion.categoria}
                          </span>
                          {getEstadoBadge(publicacion.estado)}
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:text-right">
                        <div className="text-3xl font-bold text-primary mb-2">
                          ${publicacion.precio}
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-base-300">
                      <div className="flex flex-wrap gap-2">
                        <button className="btn btn-outline btn-error btn-sm gap-2" onClick={() => handleDelete(publicacion.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
      </div>
    </div>
  );
}
