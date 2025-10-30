import React, { useState } from "react";

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("negro");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Datos de ejemplo del producto
  const product = {
    id: 1,
    name: "Zapatos Deportivos Nike Air Max",
    price: 129.99,
    originalPrice: 159.99,
    description:
      "Zapatos deportivos de alta calidad con tecnología Air Max para máxima comodidad y estilo. Perfectos para entrenamiento y uso casual.",
    features: [
      "Tecnología Air Max para mayor amortiguación",
      "Material transpirable",
      "Suela de goma duradera",
      "Disponible en múltiples colores",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "negro", value: "#000000" },
      { name: "azul", value: "#2563eb" },
      { name: "rojo", value: "#dc2626" },
      { name: "blanco", value: "#ffffff" },
    ],
    images: [
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    ],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    sku: "NK-AM-2024",
    category: "Zapatos Deportivos",
    tags: ["deportivo", "running", "casual", "nike"],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Zapatos Nike Running",
      price: 99.99,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 3,
      name: "Zapatillas Adidas",
      price: 89.99,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 4,
      name: "Zapatos Puma Sport",
      price: 79.99,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
  ];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Galería de imágenes */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {product.name}
              </h1>
            </div>

            {/* Precio */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                ${product.price}
              </span>
            </div>

            {/* Descripción */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            

            

            

            

            {/* Botones de acción */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <button className="btn btn-primary btn-lg flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
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
                Añadir al carrito
              </button>
              
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">Envío gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">Devolución en 30 días</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">Pago seguro</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ProductDetail;
