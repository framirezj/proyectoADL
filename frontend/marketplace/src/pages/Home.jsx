import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";
import { useState, useEffect } from "react";
import { useCategories } from "../context/CategoriaContext";
import Spinner from "../components/Spinner";
import { formatPesos } from "../util/format";

export default function Home() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { categories } = useCategories();

  const handleDetails = (productId) => {
    navigate(`/detalle/${productId}`);
  };

  const fetchPublicaciones = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await api.get("/producto/random");

      // 🔹 Asegurar que siempre sea un array
      const publicacionesData = response.data.publicaciones || [];
      setPublicaciones(publicacionesData);
    } catch (err) {
      console.error(err);
      setError(
        "Error al cargar las publicaciones. Por favor, intenta nuevamente."
      );
      // 🔹 Asegurar que publicaciones sea array vacío en caso de error
      setPublicaciones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  // 🔹 Renderizado condicional mejorado
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
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicaciones.map((product) => (
            <div
              key={product.id}
              className={`card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                product.estado === "vendido" ? "opacity-80" : ""
              }`}
              onClick={() => handleDetails(product.id)}
            >
              <figure className="relative overflow-hidden">
                <img
                  src={product.imagen}
                  alt={product.titulo || "Producto sin título"}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.estado === "vendido" && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="badge badge-error text-white badge-lg">
                      Vendido
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className="badge badge-primary badge-lg font-semibold">
                    ${formatPesos(product.precio || 0)}
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="badge badge-secondary badge-outline">
                    {categories.find((cat) => cat.id === product.categoria_id)
                      ?.nombre || "Sin categoría"}
                  </div>
                  {product.estado && (
                    <span
                      className={`badge ${
                        product.estado === "nuevo"
                          ? "badge-success"
                          : "badge-warning"
                      } text-white font-semibold`}
                    >
                      {product.estado === "nuevo" ? "Nuevo" : "Usado"}
                    </span>
                  )}
                </div>
              </figure>
              <div className="card-body p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="card-title text-xl font-bold group-hover:text-primary transition-colors">
                    {product.titulo || "Producto sin título"}
                  </h2>
                </div>
                <p className="text-base-content/70 mb-4 line-clamp-2">
                  {product.descripcion || "Sin descripción disponible"}
                </p>
                <div className="card-actions justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDetails(product.id);
                      }}
                    >
                      Ver detalles →
                    </button>
                    {product.estado === "vendido" ? (
                      <span className="badge badge-error text-white">
                        Vendido
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="btn btn-outline btn-primary btn-wide"
            onClick={() => navigate("/catalogo")}
          >
            Ver Todos los Productos
          </button>
        </div>
      </>
    );
  };

  return (
    <div>
      {/* hero */}
      <div
        className="hero h-96"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="w-full max-w-3xl mx-4 glass p-6 md:p-8 text-base-content">
            <h1 className="mb-5 text-4xl md:text-5xl font-bold md:whitespace-nowrap">
              Bienvenido a Pulga Vibe
            </h1>
            <p className="mb-5 text-lg">
              Descubre productos únicos y encuentra las mejores ofertas en
              nuestra comunidad
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                className="btn btn-primary btn-lg shadow-2xl ring ring-offset-2 ring-primary/40"
                onClick={() => navigate("/catalogo")}
              >
                Explorar Productos
              </button>
              <button
                className="btn btn-outline btn-secondary btn-lg bg-base-100/80 hover:bg-secondary hover:text-secondary-content shadow-xl"
                onClick={() => navigate("/nuevo")}
              >
                Publicar Producto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* productos destacados */}
      <div className="py-12 bg-base-100">
        <div className="w-11/12 lg:w-4/5 mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-primary">
              Explora Nuestras Publicaciones
            </h3>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Una muestra de lo disponible en nuestro marketplace
            </p>
          </div>

          {renderContent()}
        </div>
      </div>

      <Footer />
    </div>
  );
}
