import pool from "../config/db.js";

export async function insertProducto({
  userId,
  titulo,
  categoria,
  condicion,
  descripcion,
  precio,
  imagen,
}) {
  const query = `
    INSERT INTO publicaciones (usuario_id, categoria_id, titulo, descripcion, precio, url_imagen,estado)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [userId, 1, titulo, descripcion, precio, imagen, condicion];

  const { rows } = await pool.query(query, values);
  return rows[0];
}
