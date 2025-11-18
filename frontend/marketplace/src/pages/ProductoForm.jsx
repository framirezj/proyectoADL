import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../context/CategoriaContext.jsx";
import api from "../api/axiosConfig.js";
import Spinner from "../components/Spinner.jsx";
import { showSuccess } from "../util/toast.js";
import { formatPesos } from "../util/format.js";
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
  const params = useParams();
  const productoId = params.id;
  const isEdit = Boolean(productoId);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const safeCategories = Array.isArray(categories) ? categories : [];

  // Si estamos en modo edición, cargar datos del producto
  useEffect(() => {
    if (!isEdit) return;

    let mounted = true;

    const fetchProducto = async () => {
      try {
        setLoading(true);
        const resp = await api.get(`/producto/${productoId}`);
        const data = resp.data || {};

        if (!mounted) return;

        setFormData((prev) => ({
          ...prev,
          titulo: data.titulo || "",
          categoria: data.categoria_id || data.categoria || "",
          precio: data.precio !== undefined ? String(data.precio) : "",
          descripcion: data.descripcion || "",
          condicion: data.estado || data.condicion || "",
          imagen: null,
        }));

        if (data.imagen) setPreviewImage(data.imagen);
      } catch (err) {
        console.error("Error cargando producto:", err);
        setError("No se pudo cargar el producto para editar");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducto();

    return () => {
      mounted = false;
    };
  }, [isEdit, productoId]);

  // Manejar cambios de input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      // Validación de archivo (tipo y tamaño)
      if (file) {
        const isImage = file.type.startsWith("image/");
        const isUnder5MB = file.size <= 5 * 1024 * 1024;
        if (!isImage) {
          setError("El archivo debe ser una imagen válida (JPG, PNG, GIF)");
          setFormData((prevState) => ({ ...prevState, [name]: null }));
          setPreviewImage("");
          return;
        }
        if (!isUnder5MB) {
          setError("La imagen debe pesar menos de 5MB");
          setFormData((prevState) => ({ ...prevState, [name]: null }));
          setPreviewImage("");
          return;
        }
      }

      setFormData((prevState) => ({ ...prevState, [name]: file || null }));

      // Crear preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreviewImage("");
      }
    } else {
      if (name === "precio") {
        // Solo números enteros (CLP), sin puntos ni comas
        const sanitized = value.replace(/\D/g, "");
        setFormData((prevState) => ({ ...prevState, [name]: sanitized }));
      } else {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      }
    }

    if (error) setError("");
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validaciones básicas
    const tituloTrim = formData.titulo.trim();
    const descripcionTrim = formData.descripcion.trim();

    if (!tituloTrim) {
      setError("El título del producto es requerido");
      setLoading(false);
      return;
    }
    if (tituloTrim.length < 5) {
      setError("El título debe tener al menos 5 caracteres");
      setLoading(false);
      return;
    }
    if (tituloTrim.length > 40) {
      setError("El título no puede superar 40 caracteres");
      setLoading(false);
      return;
    }
    if (!formData.categoria) {
      setError("Debes seleccionar una categoría");
      setLoading(false);
      return;
    }
    if (!formData.precio || parseInt(formData.precio, 10) <= 0) {
      setError("El precio debe ser un número entero mayor a 0");
      setLoading(false);
      return;
    }
    if (!descripcionTrim) {
      setError("La descripción del producto es requerida");
      setLoading(false);
      return;
    }
    if (descripcionTrim.length < 10) {
      setError("La descripción debe tener al menos 10 caracteres");
      setLoading(false);
      return;
    }
    if (descripcionTrim.length > 1000) {
      setError("La descripción no puede superar 1000 caracteres");
      setLoading(false);
      return;
    }
    if (!formData.condicion) {
      setError("Debes seleccionar la condición del producto");
      setLoading(false);
      return;
    }

    // Imagen obligatoria solo al crear
    if (!isEdit && !formData.imagen) {
      setError("Debes adjuntar una imagen del producto");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("titulo", formData.titulo);
      submitData.append("categoria", formData.categoria);
      submitData.append("precio", parseInt(formData.precio, 10));
      submitData.append("descripcion", formData.descripcion);
      submitData.append("condicion", formData.condicion);
      if (formData.imagen) submitData.append("imagen", formData.imagen);

      if (isEdit) {
        const putResp = await api.put(`/producto/${productoId}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (putResp.status === 200) {
          showSuccess("Producto actualizado exitosamente!");
          navigate("/mispublicaciones");
        }
      } else {
        const response = await api.post("/producto/nuevo", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 201) {
          showSuccess("Producto publicado exitosamente!");
          navigate("/mispublicaciones");
        }
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

  // ==========================
  // Render
  // ==========================
  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-3">
            {isEdit ? "Editar Producto" : "Publicar Nuevo Producto"}
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
                  minLength={5}
                  maxLength={40}
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Mínimo 5 y máximo 40 caracteres
                  </span>
                </label>
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
                      type="text"
                      name="precio"
                      className="input input-bordered input-lg w-full pl-12 focus:input-primary"
                      placeholder="0"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="off"
                      value={formData.precio}
                      onChange={handleChange}
                      onPaste={(e) => {
                        const text = (
                          e.clipboardData || window.clipboardData
                        ).getData("text");
                        if (/[^\d]/.test(text)) {
                          e.preventDefault();
                          const onlyDigits = text.replace(/\D/g, "");
                          setFormData((prev) => ({
                            ...prev,
                            precio: onlyDigits,
                          }));
                        }
                      }}
                      onInvalid={(e) =>
                        e.currentTarget.setCustomValidity(
                          "Ingresa solo números, sin puntos ni comas"
                        )
                      }
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                      required
                    />
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Vista previa: ${formatPesos(formData.precio || 0)}
                    </span>
                  </label>
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
                  minLength={10}
                  maxLength={1000}
                  required
                ></textarea>
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Mínimo 10 y máximo 1000 caracteres
                  </span>
                </label>
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
                    required={!isEdit}
                  />
                  <p className="text-sm text-base-content/60">
                    Formatos: JPG, PNG, GIF • Máximo 5MB
                  </p>
                  {isEdit && !previewImage && (
                    <p className="text-xs text-base-content/50 mt-1">
                      Si no subes una nueva imagen, se mantendrá la actual.
                    </p>
                  )}

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
                  ) : isEdit ? (
                    "Guardar Cambios"
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
