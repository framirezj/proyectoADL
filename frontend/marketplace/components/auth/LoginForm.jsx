import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    /* {
    "usernameOrEmail": "framirezj2",
    "password": "123456"
    } */

    /* 
    /api/auth/login
    */

    try {
      // Aquí va tu llamada a la API de login
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail: email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Usar el context para hacer login
        await login(data.user, data.token)
        // Redirigir al dashboard o página principal
        navigate('/')
      } else {
        alert(data.message || 'Error en el login')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center bg-base-200 border-base-300 border p-10">
      <h3 className="font-bold text-2xl">Iniciar Sesión</h3>
      <p className="text-xs text-gray-500 mt-3">
        Ingresa a tu cuenta del marketplace
      </p>
      <form onSubmit={handleSubmit}>
      <fieldset className="fieldset mt-5 mb-5 w-full">
        <label className="label font-bold ">Correo Electrónico</label>
        <input
          type="email"
          className="input mb-3"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="label font-bold">Contraseña</label>
        <input
          type="password"
          className="input mb-3"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="btn btn-primary mt-4"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </fieldset>
      </form>

      <p className="text-sm text-gray-500 mt-3">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-primary hover:underline ml-1">
          Registrate aqui
        </Link>
      </p>
    </div>
  );
}
