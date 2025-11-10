import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Spinner from "../components/Spinner";

export default function MisPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  /* page */
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const handleDelete = async (productoId) => {
    try {
      await api.delete(`/producto/${productoId}`);

      // actulizar la lista
      setPublicaciones((prevPublicaciones) =>
        prevPublicaciones.filter((item) => item.id !== productoId)
      );
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

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

  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="alert alert-error max-w-md mb-4">
            <span>{error}</span>
          </div>
        </div>
      );
    }

    // 🔹 Verificación más robusta
    if (
      !publicaciones ||
      !Array.isArray(publicaciones) ||
      publicaciones.length === 0
    ) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-2xl font-semibold text-error">
            No hay productos
          </h3>
        </div>
      );
    }

    // 🔹 Renderizado exitoso
    return (
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
                      <button
                        className="btn btn-outline btn-error btn-sm gap-2"
                        onClick={() => handleDelete(publicacion.id)}
                      >
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

        {/* paginas */}
        <div className="flex justify-center mt-8">
          <div className="join">
            <button
              className="join-item btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              «
            </button>

            <button className="join-item btn btn-ghost no-click">
              Página {page} / {totalPages}
            </button>

            <button
              className="join-item btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              »
            </button>
          </div>
        </div>
      </div>
    );
  };

  const fetchPublicaciones = async (page = 1, limit = 3) => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));
      // 🔹 Llamada a tu API
      const response = await api.get(
        `/usuarios/publicaciones?limit=${limit}&page=${page}`
      );

      const data = response.data
      // 🔹 Extraer solo el array de publicaciones
      setPublicaciones(data.publicaciones || []);
      setTotalRows(Number(data.total_publicaciones));
      setTotalPages(Number(data.total_pages));
      setLimit(Number(data.limit));
      setPage(Number(data.page));
    } catch (err) {
      console.error(err);
      setError("Error al cargar las publicaciones");
      setPublicaciones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicaciones(page, limit);
  }, [page]);

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
                  {totalRows}
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
        {renderContent()}

        {/* Paginación */}
      </div>
    </div>
  );
}
