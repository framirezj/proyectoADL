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
  const values = [
    userId,
    categoria,
    titulo,
    descripcion,
    precio,
    imagen,
    condicion,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function deleteProducto(productoId) {
  const query = `
    DELETE FROM publicaciones WHERE id = $1;
  `;
  const values = [productoId];

  const result = await pool.query(query, values);
}

export async function selectProductos({
  limit = 9,
  order = "ASC",
  page = 1,
  categoria = 0,
}) {
  

  limit = Number(limit) || 9;
  page = Number(page) || 1;
  categoria = Number(categoria) || 0;

  const offset = (page - 1) * limit;

  // Base query y parámetros dinámicos
  let whereClause = "";
  const params = [];

  if (categoria !== 0) {
    whereClause = "WHERE categoria_id = $1";
    params.push(categoria);
  }

  // 🔢 1. Contar total de registros (filtrados o no)
  const countQuery = `SELECT COUNT(*) FROM publicaciones ${whereClause}`;
  const { rows: countResult } = await pool.query(countQuery, params);
  const total_rows = parseInt(countResult[0].count, 10);
  const total_pages = Math.ceil(total_rows / limit);

  // 📦 2. Traer publicaciones según paginación
  // armamos los parámetros según si hay filtro o no
  const queryParams =
    categoria !== 0 ? [...params, limit, offset] : [limit, offset];

  const query = `
    SELECT *
    FROM publicaciones
    ${whereClause}
    ORDER BY id ${order}
    LIMIT $${queryParams.length - 1}
    OFFSET $${queryParams.length};
  `;

  const { rows: publicaciones } = await pool.query(query, queryParams);

  return {
    publicaciones,
    total_pages,
    page,
    limit,
  };
}

export async function selectProducto(productoId) {
  const query = `
    SELECT * FROM publicaciones WHERE id = $1;
  `;
  const values = [productoId];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

export async function selectPublicacionesRandom() {
  const query = `
    SELECT * FROM publicaciones 
    ORDER BY RANDOM() 
    LIMIT 9;
  `;
  const { rows } = await pool.query(query);

  return rows;
}
