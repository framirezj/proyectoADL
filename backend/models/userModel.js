import pool from '../config/db.js'

export async function selectPublicacionesUser(userId) {
  try {
    const query = ` SELECT 
      u.id AS usuario_id,
      u.username,
      u.nombre,
      COUNT(p.id) AS total_publicaciones,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', p.id,
          'titulo', p.titulo,
          'precio', p.precio,
          'categoria', c.nombre,
          'fecha_creacion', p.fecha_creacion
        )
      ) AS publicaciones
    FROM usuarios u
    INNER JOIN publicaciones p ON u.id = p.usuario_id
    INNER JOIN categorias c ON p.categoria_id = c.id
    WHERE u.id = $1
    GROUP BY u.id, u.username, u.nombre
    ORDER BY total_publicaciones DESC `;
    const values = [userId];
    const resp = await pool.query(query, values);
    return resp.rows;
  } catch (error) {
    console.error("❌ Error ejecutando selectPublicacionesUser:", error);
  }
}