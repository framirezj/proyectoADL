import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
    const navigate = useNavigate();

    const handleDetails = (productId) => {
        navigate(`/detalle/${productId}`);
    }

    // Datos de prueba para productos destacados
    const featuredProducts = [
        {
            id: 1,
            name: "Zapatillas Deportivas Pro",
            price: 89.99,
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            description: "Zapatillas ideales para running y entrenamiento con máxima comodidad",
            category: "Deportes",
            rating: 4.5
        },
        {
            id: 2,
            name: "Smartphone Ultra X",
            price: 699.99,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
            description: "Teléfono inteligente con cámara de 108MP y batería de larga duración",
            category: "Electrónicos",
            rating: 4.8
        },
        {
            id: 3,
            name: "Auriculares Bluetooth",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
            description: "Sonido premium con cancelación de ruido activa",
            category: "Electrónicos",
            rating: 4.3
        },
        {
            id: 4,
            name: "Camiseta Premium",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
            description: "Camiseta de algodón orgánico, perfecta para el día a día",
            category: "Ropa",
            rating: 4.6
        },
        {
            id: 5,
            name: "Reloj Inteligente",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
            description: "Monitoriza tu salud y mantente conectado",
            category: "Electrónicos",
            rating: 4.4
        },
        {
            id: 6,
            name: "Mochila Urbana",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            description: "Diseño moderno con múltiples compartimentos",
            category: "Accesorios",
            rating: 4.7
        },
        {
            id: 7,
            name: "Cafetera Express",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
            description: "Prepara el café perfecto en segundos",
            category: "Hogar",
            rating: 4.9
        },
        {
            id: 8,
            name: "Libro Best Seller",
            price: 24.99,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            description: "La novela más vendida del año, edición especial",
            category: "Libros",
            rating: 4.8
        },
        {
            id: 9,
            name: "Gafas de Sol Elite",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
            description: "Protección UV400 con estilo contemporáneo",
            category: "Accesorios",
            rating: 4.5
        }
    ];

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
                    <div className="max-w-xl">
                        <h1 className="mb-5 text-5xl font-bold">Bienvenido a Pulga Vibe</h1>
                        <p className="mb-5 text-lg">
                            Descubre productos únicos y encuentra las mejores ofertas en nuestra comunidad
                        </p>
                        <button className="btn btn-primary btn-lg" onClick={() => navigate("/catalogo")}>Explorar Productos</button>
                    </div>
                </div>
            </div>

            {/* productos destacados */}
            <div className="py-12 bg-base-100">
                <div className="w-11/12 lg:w-4/5 mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold mb-4 text-primary">Productos Destacados</h3>
                        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                            Descubre nuestra selección de productos más populares y mejor valorados
                        </p>
                    </div>
                    
                    {/* contenedor de cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <div 
                                key={product.id} 
                                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                                onClick={() => handleDetails(product.id)}
                            >
                                <figure className="relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <div className="badge badge-primary badge-lg font-semibold">
                                            ${product.price}
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <div className="badge badge-secondary badge-outline">
                                            {product.category}
                                        </div>
                                    </div>
                                </figure>
                                <div className="card-body p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="card-title text-xl font-bold group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h2>
                                    </div>
                                    <p className="text-base-content/70 mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="card-actions justify-between items-center">
                                        <button 
                                            className="btn btn-ghost btn-sm text-primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDetails(product.id);
                                            }}
                                        >
                                            Ver detalles →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón para ver más productos */}
                    <div className="text-center mt-12">
                        <button className="btn btn-outline btn-primary btn-wide" onClick={() => navigate("/catalogo")}>
                            Ver Todos los Productos
                        </button>
                    </div>
                </div>
            </div>

            {/* sección de características/footer */}
            <Footer />
        </div>
    );
}