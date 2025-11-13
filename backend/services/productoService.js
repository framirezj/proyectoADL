import {
  deleteProducto,
  insertProducto,
  selectProductos,
  selectProducto,
  selectPublicacionesRandom as selectRandom,
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

export async function borrarProducto(productoId) {
  return await deleteProducto(productoId);
}

export async function obtenerPublicaciones(
  baseUrl,
  { limit, order, page, categoria }
) {
  const result = await selectProductos({ limit, order, page, categoria });
  const resolveImageUrl = (base, url) => {
    if (!url) return null;
    return /^https?:\/\//i.test(url) ? url : `${base}/uploads/${url}`;
  };
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
          }`,
    previous:
      result.page <= 1
        ? null
        : `${baseUrl}/api/producto?limit=${result.limit}&page=${
            Number(result.page) - 1
          }`,
    publicaciones: result.publicaciones.map((producto) => ({
      ...producto,
      imagen: resolveImageUrl(baseUrl, producto.url_imagen),
    })),
  };
}

export async function obtenerPublicacion(productoId, baseUrl) {
  const result = await selectProducto(productoId);
  const resolveImageUrl = (base, url) => {
    if (!url) return null;
    return /^https?:\/\//i.test(url) ? url : `${base}/uploads/${url}`;
  };
  return {
    ...result,
    imagen: resolveImageUrl(baseUrl, result.url_imagen),
  };
}

export async function obtenerPublicacionesRandom(baseUrl) {
  const publicaciones = await selectRandom();
  const resolveImageUrl = (base, url) => {
    if (!url) return null;
    return /^https?:\/\//i.test(url) ? url : `${base}/uploads/${url}`;
  };
  return {
    publicaciones: publicaciones.map((producto) => ({
      ...producto,
      imagen: resolveImageUrl(baseUrl, producto.url_imagen),
    })),
  };
}
