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

export async function obtenerPublicaciones(baseUrl) {
  const publicaciones = await selectProductos();
  return {
    publicaciones: publicaciones.map((producto) => ({
      ...producto,
      imagen: producto.url_imagen
        ? `${baseUrl}/uploads/${producto.url_imagen}`
        : null,
    })),
  };
}

export async function obtenerPublicacion(productoId, baseUrl) {
  const result = await selectProducto(productoId);

  return {
    ...result,
    imagen: `${baseUrl}/uploads/${result.url_imagen}`,
  };
}

export async function obtenerPublicacionesRandom(baseUrl) {
  const publicaciones = await selectRandom();
  return {
    publicaciones: publicaciones.map((producto) => ({
      ...producto,
      imagen: producto.url_imagen
        ? `${baseUrl}/uploads/${producto.url_imagen}`
        : null,
    })),
  };
}
