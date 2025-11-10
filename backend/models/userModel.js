import pool from "../config/db.js";

export async function selectPublicacionesUser(userId, limit = 3, page = 1) {
  try {
    const offset = (page - 1) * limit;

    const totalQuery = `SELECT COUNT(*) FROM publicaciones WHERE usuario_id = $1;`;

    const {rows: totalResult} = await pool.query(totalQuery, [userId]);

    const total_rows = parseInt(totalResult[0].count, 10);
    const total_pages = Math.ceil(total_rows / limit);

    // Obtener las publicaciones paginadas con JOIN
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
      WHERE p.usuario_id = $1
      ORDER BY p.fecha_creacion DESC
      LIMIT $2 OFFSET $3;
    `;
    const publicacionesResult = await pool.query(query, [
      userId,
      limit,
      offset,
    ]);
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
