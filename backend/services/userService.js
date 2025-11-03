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


export async function publicacionesUser(userId) {
  console.log("Ejecutando publicacionesUser con userId:", userId);
  return await selectPublicacionesUser(userId)
  
}
