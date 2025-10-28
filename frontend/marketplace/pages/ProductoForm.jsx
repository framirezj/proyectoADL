import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../src/api/axiosConfig.js";

export default function ProductoForm() {
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    precio: '',
    descripcion: '',
    condicion: '',
    imagen: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prevState => ({
        ...prevState,
        [name]: file
      }));

      // Crear preview de la imagen
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage('');
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones básicas
    if (!formData.titulo.trim()) {
      setError('El título del producto es requerido');
      setLoading(false);
      return;
    }

    if (!formData.categoria) {
      setError('Debes seleccionar una categoría');
      setLoading(false);
      return;
    }

    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      setError('El precio debe ser mayor a 0');
      setLoading(false);
      return;
    }

    if (!formData.descripcion.trim()) {
      setError('La descripción del producto es requerida');
      setLoading(false);
      return;
    }

    if (!formData.condicion) {
      setError('Debes seleccionar la condición del producto');
      setLoading(false);
      return;
    }

    try {
      // Crear FormData para enviar archivos
      const submitData = new FormData();
      submitData.append('titulo', formData.titulo);
      submitData.append('categoria', formData.categoria);
      submitData.append('precio', parseFloat(formData.precio));
      submitData.append('descripcion', formData.descripcion);
      submitData.append('condicion', formData.condicion);
      
      if (formData.imagen) {
        submitData.append('imagen', formData.imagen);
      }


      /* 
      AUN NO LISTO EN EL BACKEND
      const response = await api.post('/productos', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Producto publicado exitosamente!');
        navigate('/mispublicaciones'); // o a donde quieras redirigir
      } */

      console.log(formData)
    } catch (error) {
      console.error('Error al publicar producto:', error);
      
      if (error.response) {
        setError(error.response.data.message || 'Error al publicar el producto');
      } else if (error.request) {
        setError('Error de conexión con el servidor');
      } else {
        setError('Error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-base-200 border-base-300 border p-10 max-w-6xl mx-auto">
      <h3 className="font-bold text-2xl">Publicar Producto</h3>
      <p className="text-xs text-gray-500 mt-3">Completa la información de tu producto</p>

      {error && (
        <div className="alert alert-error mt-4 w-full">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <fieldset className="fieldset mt-5 mb-5 w-full" disabled={loading}>
          {/* Título del Producto */}
          <label className="label font-bold">Título del Producto</label>
          <input 
            type="text" 
            name="titulo"
            className="input mb-3 w-full" 
            placeholder="Ej: iPhone 13 Pro Max 256GB" 
            value={formData.titulo}
            onChange={handleChange}
            required
          />

          {/* Categoría */}
          <label className="label font-bold">Categoría</label>
          <select 
            name="categoria"
            className="select mb-3 w-full" 
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="electronica">Electrónica</option>
            <option value="hogar">Hogar</option>
            <option value="ropa">Ropa</option>
            <option value="deportes">Deportes</option>
            <option value="libros">Libros</option>
            <option value="otros">Otros</option>
          </select>

          {/* Precio */}
          <label className="label font-bold">Precio</label>
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input 
              type="number" 
              name="precio"
              className="input pl-8 w-full" 
              placeholder="0.00" 
              step="0.01"
              min="0"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </div>

          {/* Descripción */}
          <label className="label font-bold">Descripción</label>
          <textarea 
            name="descripcion"
            className="textarea mb-3 w-full h-24" 
            placeholder="Describe tu producto en detalle..."
            value={formData.descripcion}
            onChange={handleChange}
            required
          ></textarea>

          {/* Imagen del Producto */}
          <label className="label font-bold">Imagen del Producto</label>
          <input 
            type="file" 
            name="imagen"
            className="file-input mb-3 w-full" 
            accept="image/*"
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 mb-3">Formatos: JPG, PNG, GIF (Máx. 5MB)</p>
          
          {/* Preview de la imagen */}
          {previewImage && (
            <div className="mb-3">
              <p className="label font-bold">Vista previa:</p>
              <img 
                src={previewImage} 
                alt="Preview" 
                className="mt-2 max-w-xs max-h-48 object-cover rounded-lg border"
              />
            </div>
          )}

          {/* Condición */}
          <label className="label font-bold">Condición</label>
          <div className="flex gap-4 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="condicion" 
                className="radio" 
                value="nuevo" 
                checked={formData.condicion === 'nuevo'}
                onChange={handleChange}
                required
              />
              <span>Nuevo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="condicion" 
                className="radio" 
                value="usado" 
                checked={formData.condicion === 'usado'}
                onChange={handleChange}
              />
              <span>Usado</span>
            </label>
          </div>

          {/* Botón Publicar Producto */}
          <button 
            type="submit" 
            className="btn btn-primary mt-4 w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Publicando...
              </>
            ) : (
              'Publicar Producto'
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
}