import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Datos de prueba mejorados
  const productsData = {
    1: {
      id: 1,
      name: "Zapatillas Deportivas Pro Runner",
      price: 89.99,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop",
      ],
      description:
        "Zapatillas ideales para running y entrenamiento con máxima comodidad",
      fullDescription:
        "Estas zapatillas de última generación están diseñadas con tecnología de amortiguación avanzada que absorbe el impacto y proporciona una pisada suave. Perfectas para corredores de todos los niveles, ofrecen soporte lateral excepcional y una durabilidad incomparable. Fabricadas con materiales transpirables que mantienen tus pies frescos durante los entrenamientos más intensos.",
      features: [
        "Material transpirable de alta calidad",
        "Suela de goma antideslizante",
        "Plantilla ergonómica extraíble",
        "Tecnología de amortiguación AirMax",
        "Peso ligero: 280g por zapato",
        "Disponible en 5 colores diferentes",
      ],
      category: "Calzado Deportivo",
      rating: 4.5,
      reviews: 128,
      stock: 15,
      brand: "SportPro",
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      colors: ["Negro", "Azul Marino", "Rojo", "Blanco", "Verde"],
    },
    2: {
      id: 2,
      name: "Smartphone Ultra X Pro",
      price: 699.99,
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
      ],
      description:
        "Teléfono inteligente con cámara de 108MP y batería de larga duración",
      fullDescription:
        "El Smartphone Ultra X Pro redefine la experiencia móvil con su pantalla AMOLED de 6.7 pulgadas y tasa de refresco de 120Hz. Equipado con el procesador más rápido del mercado, 8GB de RAM y 256GB de almacenamiento. La cámara cuádruple de 108MP captura fotos profesionales en cualquier condición de luz.",
      features: [
        "Pantalla AMOLED 6.7'' 120Hz",
        "Cámara principal 108MP + ultra gran angular",
        "Batería de 5000mAh con carga rápida 65W",
        "Procesador Snapdragon 8 Gen 2",
        "8GB RAM + 256GB almacenamiento",
        "Resistente al agua IP68",
      ],
      category: "Electrónicos",
      rating: 4.8,
      reviews: 256,
      stock: 8,
      brand: "TechMaster",
      colors: ["Negro Espacial", "Plateado", "Azul Cielo"],
    },
  };

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      setTimeout(() => {
        const productData = productsData[id];
        setProduct(productData);
        setLoading(false);
      }, 800);
    };

    fetchProduct();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    console.log("Producto agregado:", product);
    // Aquí podrías agregar una notificación
  };

  const handleBuyNow = () => {
    console.log("Comprar ahora:", product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
          <p className="text-lg text-base-content/70">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center p-8 bg-base-100 rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-error mb-4">
            Producto no encontrado
          </h2>
          <p className="text-base-content/70 mb-6">
            El producto que buscas no existe o ha sido removido.
          </p>
          <button onClick={handleGoBack} className="btn btn-primary btn-wide">
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb y botón de volver */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <button onClick={() => navigate("/")} className="text-primary">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/")} className="text-primary">
                  Productos
                </button>
              </li>
              <li>
                <span className="text-base-content/70">{product.category}</span>
              </li>
              <li>
                <span className="font-semibold">{product.name}</span>
              </li>
            </ul>
          </div>
          <button onClick={handleGoBack} className="btn btn-ghost btn-circle">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-6">
            {/* Imagen principal */}
            <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-base-content leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="badge badge-secondary badge-lg">
                      {product.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Precio */}
            <div className="bg-primary/10 rounded-2xl p-6">
              <p className="text-4xl font-bold text-primary">
                ${product.price}
              </p>
              <p className="text-sm text-base-content/70 mt-1">
                IVA incluido • Envío gratis
              </p>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-primary btn-lg flex-1 gap-2"
              >
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Agregar al Carrito
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="btn btn-secondary btn-lg flex-1"
              >
                Comprar Ahora
              </button>
            </div>

            {/* Características rápidas */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-2xl">🚚</span>
                <span>Envío gratis</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-2xl">↩️</span>
                <span>Devolución en 30 días</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-2xl">🔒</span>
                <span>Pago seguro</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-2xl">📞</span>
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción y características */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Descripción completa */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Descripción del Producto</h3>
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
              <p className="text-base-content/80 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
