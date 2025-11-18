--CREATE DATABASE marketplace;
DROP TABLE IF EXISTS publicaciones CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
-- =====================================
-- CREA LAS TABLAS
-- =====================================
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
    estado VARCHAR(10) NOT NULL,
    /* ESTE PUEDE SER 'nuevo' o 'usado' */
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES categorias (id) ON DELETE
    SET NULL
);
-- =====================================
-- INSERTS DE USUARIOS
-- =====================================
INSERT INTO usuarios (username, email, password, nombre, rol)
VALUES (
        'usuario1',
        'usuario1@example.com',
        '$2b$10$5znp7ZjYW/1pdUpa1K6xLO02kU.KkwmgFqATDX.2mFSVidW/cSCaO',
        'Usuario Prueba1',
        'user'
    ),
    (
        'usuario2',
        'usuario2@example.com',
        '$2b$10$5znp7ZjYW/1pdUpa1K6xLO02kU.KkwmgFqATDX.2mFSVidW/cSCaO',
        'Usuario Prueba2',
        'user'
    ),
    (
        'admin',
        'admin@example.com',
        '$2b$10$5znp7ZjYW/1pdUpa1K6xLO02kU.KkwmgFqATDX.2mFSVidW/cSCaO',
        'Administrador',
        'admin'
    );
-- =====================================
-- INSERTS DE CATEGORÍAS
-- =====================================
INSERT INTO categorias (nombre, descripcion)
VALUES (
        'Electrónica',
        'Productos electrónicos como teléfonos, tablets y accesorios.'
    ),
    ('Hogar', 'Artículos para el hogar y decoración.'),
    ('Moda', 'Ropa, calzado y accesorios.'),
    (
        'Deportes',
        'Equipamiento y accesorios deportivos.'
    ),
    ('Vehículos', 'Autos, motos y repuestos.'),
    ('Otros', 'otros');
-- =====================================
-- INSERTS DE PUBLICACIONES
-- =====================================
-- Publicaciones de Francisco Ramírez (usuario_id = 1)
INSERT INTO publicaciones (
        usuario_id,
        categoria_id,
        titulo,
        descripcion,
        precio,
        url_imagen,
        estado
    )
VALUES (
        1,
        1,
        'iPhone 12 Pro',
        'Teléfono en excelente estado, 128GB, color gris espacial.',
        550000,
        'https://example.com/img/iphone12.jpg',
        'usado'
    ),
    (
        1,
        2,
        'Lámpara de escritorio LED',
        'Lámpara moderna con brazo ajustable y luz cálida.',
        25000,
        'https://example.com/img/lampara.jpg',
        'nuevo'
    );
INSERT INTO publicaciones (
        usuario_id,
        categoria_id,
        titulo,
        descripcion,
        precio,
        url_imagen,
        estado
    )
VALUES (
        2,
        3,
        'Chaqueta de cuero',
        'Chaqueta de cuero genuino, talla M, poco uso.',
        80000,
        'https://example.com/img/chaqueta.jpg',
        'usado'
    ),
    (
        2,
        4,
        'Bicicleta de montaña',
        'Bicicleta con marco de aluminio, 21 velocidades.',
        180000,
        'https://example.com/img/bicicleta.jpg',
        'usado'
    );
-- select * from usuarios;
-- select * from publicaciones;
-- select * from categorias;