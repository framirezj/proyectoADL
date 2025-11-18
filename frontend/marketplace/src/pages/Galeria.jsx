import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useCategories } from "../context/CategoriaContext";
import api from "../api/axiosConfig";
import { formatPesos } from "../util/format";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

const ProductGallery = () => {
  const { categories, loading: loadingCategorias } = useCategories();
  const { addToCart, isInCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  /* paginas */
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const handleDetails = (productId) => {
    navigate(`/detalle/${productId}`);
  };

  /*   // Filtrar productos por categoría
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.categoria_id === selectedCategory); */

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
        {/* productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                product.estado === "vendido" ? "opacity-80" : ""
              }`}
            >
              <figure
                className="px-4 pt-4 cursor-pointer group relative"
                onClick={() => handleDetails(product.id)}
              >
                <img
                  src={product.imagen}
                  alt={product.titulo}
                  className="rounded-xl h-48 w-full object-cover"
                />
                {product.estado === "vendido" && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
                    <span className="badge badge-error text-white badge-lg">
                      Vendido
                    </span>
                  </div>
                )}
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="card-title text-lg">{product.titulo}</h3>
                  <div className="flex items-center gap-2">
                    <div className="badge badge-secondary">
                      {safeCategories.find(
                        (cat) => cat.id === product.categoria_id
                      )?.nombre || "Sin categoría"}
                    </div>
                    {product.estado && (
                      <span
                        className={`badge ${
                          product.estado === "nuevo"
                            ? "badge-success"
                            : "badge-warning"
                        } badge-outline text-white font-semibold`}
                      >
                        {product.estado === "nuevo" ? "Nuevo" : "Usado"}
                      </span>
                    )}
                  </div>
                </div>
                {(product.autor_username || product.autor_nombre) && (
                  <p className="text-xs text-base-content/60 -mt-1 mb-2">
                    Publicado por: {product.autor_username}
                    {product.autor_nombre ? ` (${product.autor_nombre})` : ""}
                  </p>
                )}
                <p className="text-base-content/70 text-sm mb-4">
                  {product.description}
                </p>
                <div className="card-actions justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${formatPesos(product.precio)}
                  </span>
                  {product.estado === "vendido" ? (
                    <span className="badge badge-error text-white">
                      Vendido
                    </span>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => addToCart(product)}
                      disabled={isInCart(product.id)}
                    >
                      {isInCart(product.id)
                        ? "En el carrito"
                        : "Agregar al carrito"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* paginas */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    );
  };

  const fetchPublicaciones = async (
    page = 1,
    limit = 6,
    categoria,
    estado = estadoFilter
  ) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.get(
        `/producto?limit=${limit}&page=${page}&categoria=${categoria}$${""}`.replace(
          "$",
          estado && estado !== "todos" ? `&estado=${estado}` : ""
        )
      );
      const data = response.data;
      setProducts(data.publicaciones || []);
      setTotalRows(Number(data.total_rows));
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

  useEffect(() => {
    fetchPublicaciones(page, limit, selectedCategory, estadoFilter);
  }, [page, limit, selectedCategory, estadoFilter]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);
  useEffect(() => {
    setPage(1);
  }, [estadoFilter]);

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
                Filtros
              </h2>

              {loadingCategorias ? (
                <Spinner />
              ) : safeCategories.length > 0 ? (
                <div className="space-y-4">
                  {/* Categorías */}
                  <div className="divider mb-2">Categorías</div>
                  <div className="space-y-2">
                    <button
                      className={`btn btn-block justify-start ${
                        selectedCategory === 0 ? "btn-primary" : "btn-ghost"
                      }`}
                      onClick={() => setSelectedCategory(0)}
                    >
                      Todas
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
                  {/* Divisor con texto */}
                  <div className="divider my-2">Estado</div>
                  {/* Estado */}
                  <div className="space-y-2">
                    {[
                      { label: "Todos", value: "todos" },
                      { label: "Nuevo", value: "nuevo" },
                      { label: "Usado", value: "usado" },
                      { label: "Vendido", value: "vendido" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        className={`btn btn-block justify-start ${
                          estadoFilter === opt.value
                            ? "btn-primary"
                            : "btn-ghost"
                        }`}
                        onClick={() => setEstadoFilter(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-base-content/60">
                  No hay categorías disponibles
                </p>
              )}

              {/* Información del filtro activo */}
              <div className="mt-6 p-4 bg-info text-info-content rounded-lg">
                <p className="font-semibold">Filtros activos:</p>
                <p className="text-lg">
                  Categoría:{" "}
                  {safeCategories.find((cat) => cat.id === selectedCategory)
                    ?.nombre || "Todas"}
                </p>
                <p className="text-lg">
                  Estado:{" "}
                  {estadoFilter === "todos"
                    ? "Todos"
                    : estadoFilter.charAt(0).toUpperCase() +
                      estadoFilter.slice(1)}
                </p>
                <p className="text-sm mt-2">
                  {totalRows} producto{products.length !== 1 ? "s" : ""}{" "}
                  encontrado{products.length !== 1 ? "s" : ""}
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
