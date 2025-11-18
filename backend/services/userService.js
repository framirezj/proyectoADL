import pool from "../config/db.js";
import { selectPublicacionesUser } from "../models/userModel.js";

export async function findById(id) {
  const { rows } = await pool.query(
    `SELECT id, username, email, nombre, rol, fecha_registro
     FROM usuarios
     WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function publicacionesUser(
  userId,
  baseUrl,
  limit = 3,
  page = 1,
  estado = ""
) {
  const data = await selectPublicacionesUser(userId, limit, page, estado);

  if (!data) {
    return {
      publicaciones: [],
      total_publicaciones: 0,
      total_pages: 0,
      page,
      limit,
    };
  }

  const publicaciones = data.publicaciones.map((producto) => ({
    ...producto,
    imagen: producto.imagen || null,
  }));

  return {
    usuario_id: data.usuario_id,
    username: data.username,
    nombre: data.nombre,
    total_publicaciones: data.total_publicaciones,
    total_pages: data.total_pages,
    page: data.page,
    limit: data.limit,
    publicaciones,
  };
}
