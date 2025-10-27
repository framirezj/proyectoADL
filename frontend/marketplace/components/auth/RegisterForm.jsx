import { Link } from 'react-router-dom';

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center bg-base-200 border-base-300 border p-10">
      <h3 className="font-bold text-2xl">Crear Cuenta</h3>
      <p className="text-xs text-gray-500 mt-3">Únete al marketplace y comienza a vender</p>

      <fieldset className="fieldset mt-5 mb-5 w-full">
        {/* Nombre Completo */}
        <label className="label font-bold">Nombre Completo</label>
        <input 
          type="text" 
          className="input mb-3" 
          placeholder="Tu nombre completo" 
        />

        {/* Correo Electrónico */}
        <label className="label font-bold">Correo Electrónico</label>
        <input 
          type="email" 
          className="input mb-3" 
          placeholder="tu@email.com" 
        />

        {/* Contraseña */}
        <label className="label font-bold">Contraseña</label>
        <input 
          type="password" 
          className="input mb-3" 
          placeholder="******" 
        />

        {/* Confirmar Contraseña */}
        <label className="label font-bold">Confirmar Contraseña</label>
        <input 
          type="password" 
          className="input mb-3" 
          placeholder="******" 
        />

        {/* Botón Crear Cuenta */}
        <button className="btn btn-primary mt-4 w-full">Crear Cuenta</button>
      </fieldset>
      
      <p className="text-sm text-gray-500 mt-3">
        ¿Ya tienes una cuenta? 
        <Link to="/login" className="text-primary hover:underline ml-1">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}