import { Link } from 'react-router-dom'


export default function LoginForm() {
  return (
    <div className="flex flex-col items-center bg-base-200 border-base-300 border p-10">
      <h3 className="font-bold text-2xl" >Iniciar Sesión</h3>
      <p className="text-xs text-gray-500 mt-3">Ingresa a tu cuenta del marketplace</p>

      <fieldset className="fieldset mt-5 mb-5 w-full">
        <label className="label font-bold ">Correo Electrónico</label>
        <input type="email" className="input mb-3" placeholder="tu@email.com" />

        <label className="label font-bold">Contraseña</label>
        <input type="password" className="input mb-3" placeholder="******" />

        <button className="btn btn-primary mt-4">Iniciar Sesión</button>
      </fieldset>
      
      <p className="text-sm text-gray-500 mt-3">¿No tienes una cuenta? <Link to="/register" className="text-primary hover:underline ml-1">
          Registrate aqui
        </Link></p>
    </div>
  );
}
