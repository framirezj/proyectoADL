import {
  deleteProducto,
  insertProducto,
  selectProductos,
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
      url_imagen: producto.url_imagen ? `${baseUrl}/uploads/${producto.url_imagen}` : null,
    })),
  };
}


