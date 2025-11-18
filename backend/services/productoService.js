import {
  deleteProducto,
  insertProducto,
  selectProductos,
  selectProducto,
  selectPublicacionesRandom as selectRandom,
  updateProducto as modelUpdateProducto,
} from "../models/productoModel.js";

export async function crearProducto(data) {
  const { userId, titulo, categoria, condicion, descripcion, precio, imagen } =
    data;

  // validación simple
  if (!titulo || !precio) {
    throw new Error("El título y el precio son obligatorios");
  }

  // Insertar en la BD usando el modelo
  const nuevoProducto = await insertProducto({
    userId,
    titulo,
    categoria,
    condicion,
    descripcion,
    precio,
    imagen,
  });

  return nuevoProducto;
}

export async function borrarProducto(productoId, user) {
  // Verificar existencia y permisos
  const producto = await selectProducto(productoId);
  if (!producto) {
    const err = new Error("Producto no encontrado");
    err.status = 404;
    throw err;
  }

  // Solo el dueño (usuario_id) o admin puede borrar
  if (producto.usuario_id !== user.userId && user.role !== "admin") {
    const err = new Error("No tienes permisos para borrar este producto");
    err.status = 403;
    throw err;
  }

  await deleteProducto(productoId);
  return true;
}

export async function actualizarProducto(productoId, data, user) {
  // Verificar existencia y permisos
  const producto = await selectProducto(productoId);
  if (!producto) throw new Error("Producto no encontrado");

  // Solo el dueño (usuario_id) o admin puede actualizar
  if (producto.usuario_id !== user.userId && user.role !== "admin") {
    const err = new Error("No tienes permisos para editar este producto");
    err.status = 403;
    throw err;
  }

  // Preparar datos para modelo
  const { titulo, categoria, condicion, descripcion, precio, imagen } = data;

  const updated = await modelUpdateProducto({
    productoId,
    titulo,
    categoria,
    condicion,
    descripcion,
    precio,
    imagen,
  });

  return updated;
}

export async function obtenerPublicaciones(
  /* baseUrl */
  { limit, order, page, categoria, estado },
  request
) {
  const result = await selectProductos({
    limit,
    order,
    page,
    categoria,
    estado,
  });

  const baseUrl = request ? `${new URL(request.url).origin}` : "";

  return {
    total_rows: result.total_rows,
    total_pages: result.total_pages,
    limit: result.limit,
    page: result.page,
    next:
      result.total_pages <= result.page
        ? null
        : `${baseUrl}/api/producto?limit=${result.limit}&page=${
            Number(result.page) + 1
          }${estado ? `&estado=${estado}` : ""}`,
    previous:
      result.page <= 1
        ? null
        : `${baseUrl}/api/producto?limit=${result.limit}&page=${
            Number(result.page) - 1
          }${estado ? `&estado=${estado}` : ""}`,
    publicaciones: result.publicaciones.map((producto) => ({
      ...producto,
      imagen: producto.url_imagen || null,
    })),
  };
}

export async function obtenerPublicacion(productoId) {
  const result = await selectProducto(productoId);
  const resolveImageUrl = (base, url) => {
    if (!url) return null;
    return /^https?:\/\//i.test(url) ? url : `${base}/uploads/${url}`;
  };
  return {
    ...result,
    imagen: result.url_imagen || null,
  };
}

export async function obtenerPublicacionesRandom() {
  const publicaciones = await selectRandom();
  const resolveImageUrl = (base, url) => {
    if (!url) return null;
    return /^https?:\/\//i.test(url) ? url : `${base}/uploads/${url}`;
  };
  return {
    publicaciones: publicaciones.map((producto) => ({
      ...producto,
      imagen: producto.url_imagen || null,
    })),
  };
}
