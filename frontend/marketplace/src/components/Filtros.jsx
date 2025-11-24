import Spinner from "./Spinner";
import { useState } from "react";

const Filtros = ({
  safeCategories,
  selectedCategory,
  setSelectedCategory,
  estadoFilter,
  setEstadoFilter,
  totalRows,
  loadingCategorias,
  products,
}) => {
  // Estado para controlar si los filtros están abiertos en móvil
  const [isOpen, setIsOpen] = useState(false);

  // Tu función para cerrar dropdowns al seleccionar
  const handleSelection = (callback) => {
    callback();
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
    // Opcional: Si quieres que al filtrar en móvil se cierre el acordeón, descomenta esto:
    // setIsOpen(false);
  };

  return (
    <div className="lg:w-1/4">
      {/* Agregamos 'h-fit' y mantenemos sticky */}
      <div className="bg-base-100 rounded-lg shadow-lg sticky top-6 h-fit">
        {/* HEADER: Es clickeable solo en móvil */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center p-6 cursor-pointer lg:cursor-default"
        >
          <h2 className="text-xl font-semibold text-secondary">Filtros</h2>

          {/* Icono flecha solo visible en móvil (lg:hidden) */}
          <span
            className="material-icons lg:hidden transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
        </div>

        {/* CONTENIDO: Oculto en móvil a menos que isOpen=true, siempre visible en desktop (lg:block) */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:block p-6 pt-0 border-t lg:border-t-0 border-base-200`}
        >
          {loadingCategorias ? (
            <Spinner />
          ) : safeCategories.length > 0 ? (
            <div className="space-y-4 mt-2 lg:mt-0">
              {/* Dropdown Categorías */}
              <div className="divider mb-2">Categorías</div>

              <div className="dropdown w-full">
                <label
                  tabIndex={0}
                  className="btn w-full btn-outline justify-between"
                >
                  {safeCategories.find((c) => c.id === selectedCategory)
                    ?.nombre || "Todas"}
                  <span className="material-icons">▼</span>
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full z-50"
                >
                  <li>
                    <button
                      onClick={() =>
                        handleSelection(() => setSelectedCategory(0))
                      }
                    >
                      Todas
                    </button>
                  </li>

                  {safeCategories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() =>
                          handleSelection(() =>
                            setSelectedCategory(category.id)
                          )
                        }
                      >
                        {category.nombre}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dropdown Estado */}
              <div className="divider my-2">Estado</div>

              <div className="dropdown w-full">
                <label
                  tabIndex={0}
                  className="btn w-full btn-outline justify-between"
                >
                  {estadoFilter === "todos"
                    ? "Todos"
                    : estadoFilter.charAt(0).toUpperCase() +
                      estadoFilter.slice(1)}
                  <span className="material-icons">▼</span>
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full z-50"
                >
                  {[
                    { label: "Todos", value: "todos" },
                    { label: "Nuevo", value: "nuevo" },
                    { label: "Usado", value: "usado" },
                    { label: "Vendido", value: "vendido" },
                  ].map((opt) => (
                    <li key={opt.value}>
                      <button
                        onClick={() =>
                          handleSelection(() => setEstadoFilter(opt.value))
                        }
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-base-content/60">
              No hay categorías disponibles
            </p>
          )}

          {/* Resumen de filtros activos */}
          <div className="mt-6 p-4 bg-info text-info-content rounded-lg">
            <p className="font-semibold">Filtros activos:</p>
            <p className="text-lg">
              Categoría:{" "}
              {safeCategories.find((cat) => cat.id === selectedCategory)
                ?.nombre || "Todas"}
            </p>
            <p className="text-lg">
              Estado:{" "}
              {estadoFilter === "todos"
                ? "Todos"
                : estadoFilter.charAt(0).toUpperCase() + estadoFilter.slice(1)}
            </p>
            <p className="text-sm mt-2">
              {totalRows} producto{products.length !== 1 ? "s" : ""} encontrado
              {products.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtros;
