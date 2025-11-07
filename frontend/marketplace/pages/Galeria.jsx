import React, { useEffect, useState } from "react";
import { useCart } from "../src/context/CartContext";
import { useCategories } from "../src/context/CategoriaContext";
import api from "../src/api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const ProductGallery = () => {
  const { categories, loading: loadingCategorias } = useCategories();
  const { addToCart, isInCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  /* paginas */
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  const handleDetails = (productId) => {
    navigate(`/detalle/${productId}`);
  };

  // Filtrar productos por categoría
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.categoria_id === selectedCategory);

  const renderProducts = () => {
    if (loading || loadingCategorias) {
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

    if (!Array.isArray(products) || products.length === 0) {
      return (
        <div className="text-center py-12 mx-auto">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-2xl font-semibold text-error">
            No hay productos
          </h3>
        </div>
      );
    }

    // ✅ Manejo seguro de categories (si aún no existen)
    const safeCategories = Array.isArray(categories) ? categories : [];

    return (
      <div className="lg:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <figure
                className="px-4 pt-4 cursor-pointer group"
                onClick={() => handleDetails(product.id)}
              >
                <img
                  src={product.imagen}
                  alt={product.titulo}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="card-title text-lg">{product.titulo}</h3>
                  <div className="badge badge-secondary">
                    {safeCategories.find(
                      (cat) => cat.id === product.categoria_id
                    )?.nombre || "Sin categoría"}
                  </div>
                </div>
                <p className="text-base-content/70 text-sm mb-4">
                  {product.description}
                </p>
                <div className="card-actions justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${product.precio}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product.id)}
                  >
                    {isInCart(product.id)
                      ? "En el carrito"
                      : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* paginas */}
        <div className="join">
          {[
            ...Array(totalPages)].map((_, index) => (
              <button
                className={`join-item btn ${
                  page === index + 1 ? "btn-active" : ""
                }`}
                key={index}
                onClick={() => setPage(page + 1)}
              >
                {index + 1}
              </button>
            ))
          }

          {/* <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button> */}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchPublicaciones = async (page = 1, limit = 9) => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await api.get(`/producto?limit=${limit}&page=${page}`);
        const data = response.data;
        setProducts(data.publicaciones || []);
        setTotalPages(Number(data.total_pages));
        setLimit(Number(data.limit));
        setPage(Number(data.page));
      } catch (err) {
        console.error(err);
        setError("Error al cargar las publicaciones");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones(page, limit);
  }, [page]);

  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Nuestra Galería de Productos
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de categorías */}
          <div className="lg:w-1/4">
            <div className="bg-base-100 rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4 text-secondary">
                Categorías
              </h2>

              {loadingCategorias ? (
                <Spinner />
              ) : safeCategories.length > 0 ? (
                <div className="space-y-2">
                  <button
                    className={`btn btn-block justify-start ${
                      selectedCategory === "all" ? "btn-primary" : "btn-ghost"
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    Todos
                  </button>

                  {safeCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`btn btn-block justify-start ${
                        selectedCategory === category.id
                          ? "btn-primary"
                          : "btn-ghost"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.nombre}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-base-content/60">
                  No hay categorías disponibles
                </p>
              )}

              {/* Información del filtro activo */}
              <div className="mt-6 p-4 bg-info text-info-content rounded-lg">
                <p className="font-semibold">Filtro activo:</p>
                <p className="text-lg">
                  {safeCategories.find((cat) => cat.id === selectedCategory)
                    ?.nombre || "Todos"}
                </p>
                <p className="text-sm mt-2">
                  {filteredProducts.length} producto
                  {filteredProducts.length !== 1 ? "s" : ""} encontrado
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Galería de productos */}
          {renderProducts()}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
