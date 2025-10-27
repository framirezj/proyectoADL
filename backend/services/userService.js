import pool from "../config/db.js";

export async function findById(id) {
  const { rows } = await pool.query(
    `SELECT id, username, email, nombre, rol, fecha_registro
     FROM usuarios
     WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}
