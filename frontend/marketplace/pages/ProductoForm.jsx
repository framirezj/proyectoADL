import { Link } from 'react-router-dom';

export default function ProductoForm() {
  return (
    <div className="flex flex-col items-center bg-base-200 border-base-300 border p-10 max-w-6xl mx-auto">
      <h3 className="font-bold text-2xl">Publicar Producto</h3>
      <p className="text-xs text-gray-500 mt-3">Completa la información de tu producto</p>

      <fieldset className="fieldset mt-5 mb-5 w-full">
        {/* Título del Producto */}
        <label className="label font-bold">Título del Producto</label>
        <input 
          type="text" 
          className="input mb-3" 
          placeholder="Ej: iPhone 13 Pro Max 256GB" 
        />

        {/* Categoría */}
        <label className="label font-bold">Categoría</label>
        <select className="select mb-3 w-full">
          <option disabled selected>Selecciona una categoría</option>
          <option>Electrónica</option>
          <option>Hogar</option>
          <option>Ropa</option>
          <option>Deportes</option>
          <option>Libros</option>
          <option>Otros</option>
        </select>

        {/* Precio */}
        <label className="label font-bold">Precio</label>
        <div className="relative mb-3">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input 
            type="number" 
            className="input pl-8 w-full" 
            placeholder="0.00" 
            step="0.01"
          />
        </div>

        {/* Descripción */}
        <label className="label font-bold">Descripción</label>
        <textarea 
          className="textarea mb-3 w-full h-24" 
          placeholder="Describe tu producto en detalle..."
        ></textarea>

        {/* Imagen del Producto */}
        <label className="label font-bold">Imagen del Producto</label>
        <input 
          type="file" 
          className="file-input mb-3 w-full" 
          accept="image/*"
        />
        <p className="text-xs text-gray-500 mb-3">Formatos: JPG, PNG, GIF (Máx. 5MB)</p>

        {/* Condición */}
        <label className="label font-bold">Condición</label>
        <div className="flex gap-4 mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="condition" className="radio" value="new" />
            <span>Nuevo</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="condition" className="radio" value="used" />
            <span>Usado</span>
          </label>
        </div>

        {/* Botón Publicar Producto */}
        <button className="btn btn-primary mt-4 w-full">Publicar Producto</button>
      </fieldset>
      
      
    </div>
  );
}