import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../src/context/CategoriaContext.jsx";
import api from "../src/api/axiosConfig.js";
import Spinner from "../components/Spinner.jsx";
import { showSuccess } from "../util/toast.js";

export default function ProductoForm() {
  // Estados
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    precio: "",
    descripcion: "",
    condicion: "",
    imagen: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const safeCategories = Array.isArray(categories) ? categories : [];

  // Manejar cambios de input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prevState) => ({ ...prevState, [name]: file }));

      // Crear preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreviewImage("");
      }
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    if (error) setError("");
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validaciones básicas
    if (!formData.titulo.trim()) {
      setError("El título del producto es requerido");
      setLoading(false);
      return;
    }
    if (!formData.categoria) {
      setError("Debes seleccionar una categoría");
      setLoading(false);
      return;
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      setLoading(false);
      return;
    }
    if (!formData.descripcion.trim()) {
      setError("La descripción del producto es requerida");
      setLoading(false);
      return;
    }
    if (!formData.condicion) {
      setError("Debes seleccionar la condición del producto");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("titulo", formData.titulo);
      submitData.append("categoria", formData.categoria);
      submitData.append("precio", parseFloat(formData.precio));
      submitData.append("descripcion", formData.descripcion);
      submitData.append("condicion", formData.condicion);
      if (formData.imagen) submitData.append("imagen", formData.imagen);

      const response = await api.post("/producto/nuevo", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        showSuccess("Producto publicado exitosamente!")
        navigate("/mispublicaciones");
      }

      
    } catch (error) {
      console.error("Error al publicar producto:", error);

      if (error.response) {
        setError(error.response.data.message || "Error al publicar el producto");
      } else if (error.request) {
        setError("Error de conexión con el servidor");
      } else {
        setError("Error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Render
  // ==========================
  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-3">
            Publicar Nuevo Producto
          </h1>
          <p className="text-lg text-base-content/70">
            Completa la información de tu producto para comenzar a vender
          </p>
        </div>

        {/* Card del Formulario */}
        <div className="bg-base-100 rounded-3xl shadow-xl p-8 border border-base-300">
          {error && (
            <div className="alert alert-error mb-6 animate-fade-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <fieldset className="space-y-6" disabled={loading}>
              {/* Título */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold">
                    Título del Producto
                  </span>
                </label>
                <input
                  type="text"
                  name="titulo"
                  className="input input-bordered input-lg w-full focus:input-primary"
                  placeholder="Ej: iPhone 13 Pro Max 256GB en perfecto estado"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Categoría y Precio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categoría */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Categoría
                    </span>
                  </label>
                  {categoriesLoading ? (
                    <Spinner />
                  ) : categoriesError ? (
                    <p className="text-sm text-error">
                      Error al cargar categorías
                    </p>
                  ) : safeCategories.length > 0 ? (
                    <select
                      name="categoria"
                      className="select select-bordered select-lg w-full focus:select-primary"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      {safeCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-base-content/60">
                      No hay categorías disponibles
                    </p>
                  )}
                </div>

                {/* Precio */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Precio
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-primary font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      name="precio"
                      className="input input-bordered input-lg w-full pl-12 focus:input-primary"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={formData.precio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold">
                    Descripción
                  </span>
                </label>
                <textarea
                  name="descripcion"
                  className="textarea textarea-bordered w-full h-32 textarea-lg focus:textarea-primary"
                  placeholder="Describe tu producto en detalle..."
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Imagen */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold">
                    Imagen del Producto
                  </span>
                </label>
                <div className="border-2 border-dashed border-base-300 rounded-2xl p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    name="imagen"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs mx-auto mb-4"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <p className="text-sm text-base-content/60">
                    Formatos: JPG, PNG, GIF • Máximo 5MB
                  </p>

                  {previewImage && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold mb-2">
                        Vista previa:
                      </p>
                      <div className="flex justify-center">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-w-48 max-h-48 object-cover rounded-xl shadow-lg border-2 border-primary"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Condición */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold">
                    Condición del Producto
                  </span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["nuevo", "usado"].map((cond) => (
                    <label
                      key={cond}
                      className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.condicion === cond
                          ? "border-primary bg-primary/10"
                          : "border-base-300 hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="condicion"
                        className="radio radio-primary mr-3"
                        value={cond}
                        checked={formData.condicion === cond}
                        onChange={handleChange}
                        required
                      />
                      <div>
                        <span className="font-semibold text-lg capitalize">
                          {cond}
                        </span>
                        <p className="text-sm text-base-content/60">
                          {cond === "nuevo"
                            ? "Producto sin uso, en empaque original"
                            : "Producto en buen estado, con señales de uso"}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-outline btn-lg flex-1 gap-2"
                  disabled={loading}
                >
                  ← Cancelar
                </button>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg flex-1 gap-2 shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner text-primary"></span>
                  ) : (
                    "Publicar Producto"
                  )}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
