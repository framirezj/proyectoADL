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
  limit = 6,
  order = "ASC",
  page = 1,
  categoria = 0,
  estado = "",
}) {
  limit = Number(limit) || 6;
  page = Number(page) || 1;
  categoria = Number(categoria) || 0;

  const offset = (page - 1) * limit;

  // Construcción dinámica del WHERE para categoría y estado
  const conditions = [];
  const params = [];
  let paramIndex = 1;

  if (categoria !== 0) {
    conditions.push(`categoria_id = $${paramIndex++}`);
    params.push(categoria);
  }
  if (estado && ["nuevo", "usado", "vendido"].includes(estado)) {
    conditions.push(`estado = $${paramIndex++}`);
    params.push(estado);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  // 🔢 1. Contar total de registros (filtrados o no)
  const countQuery = `SELECT COUNT(*) FROM publicaciones ${whereClause}`;
  const { rows: countResult } = await pool.query(countQuery, params);
  const total_rows = parseInt(countResult[0].count, 10);
  const total_pages = Math.ceil(total_rows / limit);

  // 📦 2. Traer publicaciones según paginación
  // armamos los parámetros según si hay filtro o no
  const queryParams = [...params, limit, offset];

  const query = `
    SELECT *
    FROM publicaciones
    ${whereClause}
    ORDER BY id ${order}
    LIMIT $${params.length + 1}
    OFFSET $${params.length + 2};
  `;

  const { rows: publicaciones } = await pool.query(query, queryParams);

  return {
    publicaciones,
    total_pages,
    page,
    limit,
    total_rows,
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

export async function updateProducto({
  productoId,
  titulo,
  categoria,
  condicion,
  descripcion,
  precio,
  imagen,
}) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (categoria !== undefined) {
    fields.push(`categoria_id = $${idx++}`);
    values.push(categoria);
  }
  if (titulo !== undefined) {
    fields.push(`titulo = $${idx++}`);
    values.push(titulo);
  }
  if (descripcion !== undefined) {
    fields.push(`descripcion = $${idx++}`);
    values.push(descripcion);
  }
  if (precio !== undefined) {
    fields.push(`precio = $${idx++}`);
    values.push(precio);
  }
  if (imagen !== undefined) {
    fields.push(`url_imagen = $${idx++}`);
    values.push(imagen);
  }
  if (condicion !== undefined) {
    fields.push(`estado = $${idx++}`);
    values.push(condicion);
  }

  if (fields.length === 0) {
    const { rows } = await pool.query(
      `SELECT * FROM publicaciones WHERE id = $1`,
      [productoId]
    );
    return rows[0];
  }

  const query = `
    UPDATE publicaciones
    SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING *;
  `;

  values.push(productoId);

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function markProductosVendidos(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  const query = `
    UPDATE publicaciones
    SET estado = 'vendido'
    WHERE id = ANY($1::int[]) AND estado <> 'vendido'
    RETURNING id;
  `;
  const values = [ids.map((v) => Number(v)).filter((n) => Number.isInteger(n))];
  const { rows } = await pool.query(query, values);
  return rows.map((r) => r.id);
}
