import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../src/context/CategoriaContext.jsx";
import api from '../src/api/axiosConfig.js'

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

  // categorias
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // Metodos
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));

      // Crear preview de la imagen
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage("");
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (error) setError("");
  };

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
      // Crear FormData para enviar archivos
      const submitData = new FormData();
      submitData.append("titulo", formData.titulo);
      submitData.append("categoria", formData.categoria);
      submitData.append("precio", parseFloat(formData.precio));
      submitData.append("descripcion", formData.descripcion);
      submitData.append("condicion", formData.condicion);

      if (formData.imagen) {
        submitData.append("imagen", formData.imagen);
      }

      const response = await api.post("/producto/nuevo", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Producto publicado exitosamente!");
        navigate("/mispublicaciones");
      }

    } catch (error) {
      console.error("Error al publicar producto:", error);

      if (error.response) {
        setError(
          error.response.data.message || "Error al publicar el producto"
        );
      } else if (error.request) {
        setError("Error de conexión con el servidor");
      } else {
        setError("Error inesperado");
      }
    } finally {
      setLoading(false);
    } 
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Mejorado */}
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
              {/* Título del Producto */}
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

              {/* Categoría y Precio en fila */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categoría */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Categoría
                    </span>
                    {categoriesLoading && (
                      <span className="loading loading-spinner loading-xs ml-2"></span>
                    )}
                  </label>
                  <select
                    name="categoria"
                    className="select select-bordered select-lg w-full focus:select-primary"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                    disabled={categoriesLoading}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                  {categoriesLoading && (
                    <label className="label">
                      <span className="label-text-alt text-primary">
                        Cargando categorías...
                      </span>
                    </label>
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
                  placeholder="Describe tu producto en detalle: características, estado, accesorios incluidos, etc."
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Imagen del Producto */}
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

                  {/* Preview de la imagen */}
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
                  <label
                    className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.condicion === "nuevo"
                        ? "border-primary bg-primary/10"
                        : "border-base-300 hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="condicion"
                      className="radio radio-primary mr-3"
                      value="nuevo"
                      checked={formData.condicion === "nuevo"}
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <span className="font-semibold text-lg">Nuevo</span>
                      <p className="text-sm text-base-content/60">
                        Producto sin uso, en empaque original
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.condicion === "usado"
                        ? "border-primary bg-primary/10"
                        : "border-base-300 hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="condicion"
                      className="radio radio-primary mr-3"
                      value="usado"
                      checked={formData.condicion === "usado"}
                      onChange={handleChange}
                    />
                    <div>
                      <span className="font-semibold text-lg">Usado</span>
                      <p className="text-sm text-base-content/60">
                        Producto en buen estado, con señales de uso
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-outline btn-lg flex-1 gap-2"
                  disabled={loading}
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg flex-1 gap-2 shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner text-primary"></span>
                    </>
                  ) : (
                    <>
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Publicar Producto
                    </>
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
