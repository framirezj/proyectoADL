import React, { useEffect, useState } from "react";
import { useCart } from "../src/context/CartContext";
import { useCategories } from "../src/context/CategoriaContext";
import api from "../src/api/axiosConfig";
import { useNavigate } from "react-router-dom";

// Datos de prueba para los productos
/*  const productsData = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: 999,
    category: "Electrónica",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    description: "El último smartphone de Apple",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 799,
    category: "Electrónica",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    description: "Potente smartphone Android",
  },
  {
    id: 3,
    name: "Camiseta Básica",
    price: 25,
    category: "Moda",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    description: "Camiseta de algodón 100%",
  },
  {
    id: 4,
    name: "Zapatos Deportivos",
    price: 120,
    category: "Moda",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    description: "Zapatos para running",
  },
  {
    id: 5,
    name: "Sofá Moderno",
    price: 450,
    category: "Hogar",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    description: "Sofá cómodo para tu sala",
  },
  {
    id: 6,
    name: "Lámpara de Mesa",
    price: 35,
    category: "Hogar",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    description: "Iluminación moderna",
  },
  {
    id: 7,
    name: "Pelota de Fútbol",
    price: 30,
    category: "Deportes",
    image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400",
    description: "Pelota oficial tamaño 5",
  },
  {
    id: 8,
    name: "Raqueta de Tenis",
    price: 85,
    category: "Deportes",
    image: "https://images.unsplash.com/photo-1587280501635-68ba0e82c6e8?w=400",
    description: "Raqueta profesional",
  },
  {
    id: 9,
    name: "El Señor de los Anillos",
    price: 20,
    category: "Otros",
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400",
    description: "Clásico de la fantasía épica",
  },
];  */


const ProductGallery = () => {
  const { categories, loading: loadingCategorias } = useCategories();
  const { addToCart, isInCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const handleDetails = (productId) => {
        navigate(`/detalle/${productId}`);
    }

  //data
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        setLoading(true);
        // 🔹 Llamada a tu API
        const response = await api.get("/producto");

       // 🔹 Extraer solo el array de publicaciones
        setProducts(response.data.publicaciones);
      } catch (err) {
        console.error(err);
        //setError("Error al cargar las publicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  /* useEffect(()=>{
    console.log("producot",products)
  },[products]) */

  // Filtrar productos por categoría
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.categoria_id === selectedCategory);

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
              <div className="space-y-2">
                <button
                  className={`btn btn-block justify-start ${
                    selectedCategory === "all" ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  Todos
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`btn btn-block justify-start ${
                      selectedCategory === category.nombre
                        ? "btn-primary"
                        : "btn-ghost"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.nombre}
                  </button>
                ))}
              </div>

              {/* Información del filtro activo */}
              <div className="mt-6 p-4 bg-info text-info-content rounded-lg">
                <p className="font-semibold">Filtro activo:</p>
                <p className="text-lg">
                  {
                    categories.find((cat) => cat.id === selectedCategory)
                      ?.nombre
                  }
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
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-semibold text-error">
                  No hay productos
                </h3>
                <p className="text-base-content/70 mt-2">
                  No se encontraron productos en esta categoría.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                    
                  >
                    <figure className="px-4 pt-4 cursor-pointer group" onClick={() => handleDetails(product.id)}>
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
                          {
                            categories.find(
                              (cat) => cat.id === product.categoria_id
                            )?.nombre
                          }
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
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          {isInCart(product.id)
                            ? "En el carrito"
                            : "Agregar al carrito"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
