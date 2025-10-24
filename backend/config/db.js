import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

const { Pool } = pkg;

// Crear un pool de conexiones
const pool = new Pool({
  user: process.env.DB_USER || "postgres",  
  host: process.env.DB_HOST || "localhost",      
  database: process.env.DB_NAME || "marketplace",
  password: process.env.DB_PASS || "postgres", 
  port: process.env.DB_PORT || 5432, // puerto de PostgreSQL
});

// Probar la conexión al iniciar
pool.connect()
  .then(client => {
    console.log("✅ Conectado a PostgreSQL");
    client.release(); 
  })
  .catch(err => {
    console.error("❌ Error al conectar a PostgreSQL:", err.message);
  });

// Exportar pool para usar en queries
export default pool;



/*

-- ==============================================
-- CREACIÓN DE TABLAS - MODELO DE PUBLICACIONES
-- ==============================================

-- Eliminamos tablas si ya existen (para reiniciar la BD)
DROP TABLE IF EXISTS publicaciones CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;

-- ==============================================
-- TABLA: usuarios
-- ==============================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol VARCHAR(10) DEFAULT 'user' CHECK (rol IN ('admin', 'user'))
);

-- ==============================================
-- TABLA: categorias
-- ==============================================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL
);

-- ==============================================
-- TABLA: publicaciones
-- ==============================================
CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    precio INT NOT NULL,
    url_imagen TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE,

    -- Claves foráneas
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id)
        REFERENCES categorias (id)
        ON DELETE SET NULL
);

*/