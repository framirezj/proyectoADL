import pool from "../config/db.js";

// Insertar registro
export async function insertCategoria({
 nombre, descripcion
}) {
  const query = `
    INSERT INTO categorias (nombre, descripcion)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [nombre,descripcion];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

// obtener todos los registros
export async function selectAllCategorias() {
    const query = `
    SELECT * FROM categorias;
  `;

  const { rows } = await pool.query(query)
  return rows
}