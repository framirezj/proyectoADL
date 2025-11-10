import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../api/axiosConfig.js";


/* 
{
    "username": "framirezj2",
    "email": "framirez2j@admin.cl",
    "password": "123456",
    "nombre": "Francisco Ramírez 2"
}
*/

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      // Preparar datos para enviar (sin confirmPassword)
      const { confirmPassword, ...registerData } = formData;

      console.log(formData)

      const response = await api.post('/auth/register', registerData);

      if (response.status === 201) {
        // Registro exitoso
        alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      
      if (error.response) {
        // El servidor respondió con un error
        setError(error.response.data.message || 'Error en el registro');
      } else if (error.request) {
        // No se recibió respuesta
        setError('Error de conexión con el servidor');
      } else {
        // Error en la configuración
        setError('Error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-base-200 border-base-300 border p-10">
      <h3 className="font-bold text-2xl">Crear Cuenta</h3>
      <p className="text-xs text-gray-500 mt-3">Únete al marketplace y comienza a vender</p>

      {error && (
        <div className="alert alert-error mt-4 w-full">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <fieldset className="fieldset mt-5 mb-5 w-full" disabled={loading}>
          {/* Nombre Completo */}
          <label className="label font-bold">Nombre Completo</label>
          <input 
            type="text" 
            name="nombre"
            className="input mb-3 w-full" 
            placeholder="Tu nombre completo" 
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          {/* Correo Electrónico */}
          <label className="label font-bold">Correo Electrónico</label>
          <input 
            type="email" 
            name="email"
            className="input mb-3 w-full" 
            placeholder="tu@email.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Username */}
          <label className="label font-bold">Nombre de Usuario</label>
          <input 
            type="text" 
            name="username"
            className="input mb-3 w-full" 
            placeholder="tu_usuario" 
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* Contraseña */}
          <label className="label font-bold">Contraseña</label>
          <input 
            type="password" 
            name="password"
            className="input mb-3 w-full" 
            placeholder="******" 
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          {/* Confirmar Contraseña */}
          <label className="label font-bold">Confirmar Contraseña</label>
          <input 
            type="password" 
            name="confirmPassword"
            className="input mb-3 w-full" 
            placeholder="******" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Botón Crear Cuenta */}
          <button 
            type="submit" 
            className="btn btn-primary mt-4 w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Creando cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </fieldset>
      </form>
      
      <p className="text-sm text-gray-500 mt-3">
        ¿Ya tienes una cuenta? 
        <Link to="/login" className="text-primary hover:underline ml-1">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}