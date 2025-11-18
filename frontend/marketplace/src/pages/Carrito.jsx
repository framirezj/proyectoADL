import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  showLoading,
  dismissToast,
  showSuccess,
  showError,
} from "../util/toast";
import { formatPesos } from "../util/format";
import api from "../api/axiosConfig";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const IVA_RATE = 0.19;
  const hasItems = cartItems.length > 0;
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio, 0); // Productos BRUTO (con IVA)
  const shipping = hasItems ? 0 : 0; //

  const productosNeto = hasItems ? subtotal / (1 + IVA_RATE) : 0;
  const ivaProductos = hasItems ? subtotal - productosNeto : 0;
  const ivaEnvio = hasItems ? shipping * IVA_RATE : 0;

  const neto = hasItems ? productosNeto + shipping : 0; // Neto total (productos netos + envío neto)
  const tax = hasItems ? ivaProductos + ivaEnvio : 0; // IVA total (productos + envío)
  const total = hasItems ? neto + tax : 0; // Debe coincidir con subtotal + envío + IVA envío

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Carrito de Compras
          </h1>
          <p className="text-gray-600 mt-2">
            Revisa tus productos antes de finalizar la compra
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Productos en el carrito ({cartItems.length})
                </h2>
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => clearCart()}
                  disabled={!hasItems}
                  title={!hasItems ? "No hay productos para vaciar" : undefined}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
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
                  Vaciar carrito
                </button>
              </div>

              <div className="space-y-4">
                {!hasItems && (
                  <div className="p-6 text-center text-base-content/70">
                    <div className="text-6xl mb-3">🛒</div>
                    <p className="mb-2 font-semibold">Tu carrito está vacío</p>
                    <p className="text-sm mb-4">
                      Agrega productos para ver envío, IVA y total.
                    </p>
                    <a href="/catalogo" className="btn btn-primary btn-sm">
                      Explorar productos
                    </a>
                  </div>
                )}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="card card-side bg-base-100 shadow-sm border"
                  >
                    <figure className="w-32 h-32 p-2">
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </figure>

                    <div className="card-body flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="card-title text-lg">{item.titulo}</h3>
                          <p className="text-lg font-bold text-primary mt-2">
                            ${formatPesos(item.precio, { decimals: 0 })}
                          </p>
                          <p className="text-xs text-base-content/60 mt-1">
                            Neto: $
                            {formatPesos(item.precio / (1 + IVA_RATE), {
                              decimals: 0,
                            })}{" "}
                            • IVA: $
                            {formatPesos(
                              item.precio - item.precio / (1 + IVA_RATE),
                              { decimals: 0 }
                            )}
                          </p>
                        </div>

                        <button
                          className="btn btn-ghost btn-sm btn-circle text-error"
                          onClick={() => removeFromCart(item.id)}
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha - Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} productos)</span>
                  <span>${formatPesos(subtotal, { decimals: 0 })}</span>
                </div>
                {hasItems ? (
                  <>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>${formatPesos(shipping, { decimals: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (19%)</span>
                      <span>${formatPesos(tax, { decimals: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Neto</span>
                      <span>${formatPesos(neto, { decimals: 0 })}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${formatPesos(total, { decimals: 0 })}
                      </span>
                    </div>
                    <p className="text-xs text-base-content/60">
                      El total incluye IVA (19%) por $
                      {formatPesos(tax, { decimals: 0 })} sobre productos y
                      envío.
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-base-content/60">
                    Agrega productos para calcular envío e IVA.
                  </p>
                )}
              </div>

              <button
                className="btn btn-primary btn-block btn-lg mb-4"
                disabled={!hasItems || processing}
                title={
                  !hasItems ? "Agrega productos para continuar" : undefined
                }
                onClick={async () => {
                  try {
                    setProcessing(true);
                    const toastId = showLoading("Procesando pago...");
                    // Simulación: marcar productos como vendidos en backend
                    for (const item of cartItems) {
                      try {
                        await api.put(`/producto/${item.id}`, {
                          condicion: "vendido",
                        });
                      } catch (e) {
                        console.error("Error marcando vendido:", e);
                      }
                    }
                    dismissToast(toastId);
                    showSuccess(
                      `Enviamos los datos de pago a ${
                        user?.email || "tu correo"
                      }`
                    );
                    clearCart();
                  } catch (e) {
                    console.error(e);
                    showError(
                      "No se pudo procesar el pago. Intenta nuevamente."
                    );
                  } finally {
                    setProcessing(false);
                  }
                }}
              >
                {processing ? "Procesando..." : "Proceder al pago"}
              </button>

              <button
                className="btn btn-outline btn-block"
                onClick={() => navigate("/catalogo")}
              >
                Continuar comprando
              </button>

              {/* Métodos de pago */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3">
                  Métodos de pago aceptados
                </h4>
                <div className="flex gap-2">
                  <div className="badge badge-outline p-3">Visa</div>
                  <div className="badge badge-outline p-3">MasterCard</div>
                  <div className="badge badge-outline p-3">PayPal</div>
                </div>
              </div>

              {/* Garantías */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-success"
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
                  <span>Envío rápido a todo Chile</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-success"
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
                  <span>Devoluciones hasta 30 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
