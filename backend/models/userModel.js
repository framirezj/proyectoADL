import pool from "../config/db.js";

export async function selectPublicacionesUser(
  userId,
  limit = 3,
  page = 1,
  estado = ""
) {
  try {
    const offset = (page - 1) * limit;

    // Conteo total (con filtro opcional de estado)
    const countConditions = ["usuario_id = $1"];
    const countParams = [userId];
    let paramIndex = 2;
    if (estado && ["nuevo", "usado", "vendido"].includes(estado)) {
      countConditions.push(`estado = $${paramIndex++}`);
      countParams.push(estado);
    }
    const totalQuery = `SELECT COUNT(*) FROM publicaciones WHERE ${countConditions.join(
      " AND "
    )};`;
    const { rows: totalResult } = await pool.query(totalQuery, countParams);

    const total_rows = parseInt(totalResult[0].count, 10);
    const total_pages = Math.ceil(total_rows / limit);

    // Obtener las publicaciones paginadas con JOIN
    // Query de publicaciones con filtro opcional
    const pubConditions = ["p.usuario_id = $1"];
    const pubParams = [userId];
    paramIndex = 2;
    if (estado && ["nuevo", "usado", "vendido"].includes(estado)) {
      pubConditions.push(`p.estado = $${paramIndex++}`);
      pubParams.push(estado);
    }
    pubParams.push(limit, offset); // para LIMIT y OFFSET

    const query = `
      SELECT 
        p.id,
        p.titulo,
        p.url_imagen AS imagen,
        p.precio,
        p.fecha_creacion,
        p.estado,
        c.nombre AS categoria
      FROM publicaciones p
      INNER JOIN categorias c ON p.categoria_id = c.id
      WHERE ${pubConditions.join(" AND ")}
      ORDER BY p.fecha_creacion DESC
      LIMIT $${pubParams.length - 1} OFFSET $${pubParams.length};
    `;
    const publicacionesResult = await pool.query(query, pubParams);
    const publicaciones = publicacionesResult.rows;

    // Información del usuario
    const userQuery = `
      SELECT id AS usuario_id, username, nombre
      FROM usuarios
      WHERE id = $1;
    `;
    const userResult = await pool.query(userQuery, [userId]);
    const usuario = userResult.rows[0];

    // Retornar estructura coherente con tu formato anterior
    return {
      ...usuario,
      total_publicaciones: total_rows,
      total_pages: total_pages,
      page,
      limit,
      publicaciones,
    };
  } catch (error) {
    console.error("❌ Error ejecutando selectPublicacionesUser:", error);
  }
}
