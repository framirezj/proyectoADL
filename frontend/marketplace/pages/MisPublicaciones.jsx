import { Link } from 'react-router-dom'

export default function MisPublicaciones() {
  return (
    <div className="flex flex-col bg-base-200 border-base-300 border p-8 max-w-6xl mx-auto">
      <h3 className="font-bold text-2xl mb-6">Mis Publicaciones</h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Encabezados de la tabla */}
          <thead>
            <tr className="bg-base-300">
              <th className="text-lg font-bold">Imagen</th>
              <th className="text-lg font-bold">Título</th>
              <th className="text-lg font-bold">Precio</th>
              <th className="text-lg font-bold">Estado</th>
              <th className="text-lg font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Producto 1 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      📱
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="font-bold">iPhone 13 Pro</div>
                  <div className="text-sm opacity-50">Telefonía · Nuevo</div>
                </div>
              </td>
              <td>
                <span className="font-bold text-lg">$899</span>
              </td>
              <td>
                <span className="badge badge-success badge-lg text-white">Activo</span>
              </td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-primary btn-sm">
                    Editar
                  </button>
                  <button className="btn btn-outline btn-error btn-sm">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>

            {/* Producto 2 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                      💻
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="font-bold">MacBook Air M2</div>
                  <div className="text-sm opacity-50">Computación · Como nuevo</div>
                </div>
              </td>
              <td>
                <span className="font-bold text-lg">$1,199</span>
              </td>
              <td>
                <span className="badge badge-warning badge-lg text-white">Pausado</span>
              </td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-primary btn-sm">
                    Editar
                  </button>
                  <button className="btn btn-outline btn-error btn-sm">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>

            {/* Producto 3 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                      🎧
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="font-bold">AirPods Pro</div>
                  <div className="text-sm opacity-50">Audio · Usado</div>
                </div>
              </td>
              <td>
                <span className="font-bold text-lg">$199</span>
              </td>
              <td>
                <span className="badge badge-success badge-lg text-white">Activo</span>
              </td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-primary btn-sm">
                    Editar
                  </button>
                  <button className="btn btn-outline btn-error btn-sm">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Botón para agregar más publicaciones */}
      <div className="flex justify-end mt-6">
        <button className="btn btn-primary gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <Link
              to="/nuevo"
              className="text-primary hover:underline ml-1"
            >
              Nueva Publicación
            </Link>
          
        </button>
      </div>
    </div>
  );
}