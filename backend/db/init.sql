-- DROP TABLE IF EXISTS publicaciones CASCADE;
-- DROP TABLE IF EXISTS usuarios CASCADE;
-- DROP TABLE IF EXISTS categorias CASCADE;
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol VARCHAR(10) DEFAULT 'user' CHECK (rol IN ('admin', 'user'))
);
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS publicaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    categoria_id INT,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    precio INT NOT NULL,
    url_imagen TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES categorias (id) ON DELETE
    SET NULL
);