# 🛍️ Proyecto Marketplace - Hito 1: Diseño y Prototipo

> **Desafío Latam - Full Stack JavaScript**
>
> Este repositorio contiene los avances del **Hito 1**, correspondiente al diseño y prototipo del proyecto grupal **Marketplace**, una aplicación web tipo tienda online.

---

## 📋 Descripción General

El proyecto **Marketplace** consiste en el desarrollo de una aplicación web de comercio electrónico con diseño libre.  
Este **primer hito** se enfoca en la **planificación y diseño inicial** del sistema, incluyendo interfaces, navegación, base de datos y contrato de API.

---

## 🎯 Objetivos del Hito 1

1. 🎨 Diseñar el **boceto de las vistas** principales del proyecto.
2. 🔗 Definir la **navegación entre vistas**, distinguiendo las públicas y privadas.
3. ⚙️ Elaborar el **listado de dependencias** a utilizar en el proyecto.
4. 🧩 Diseñar el **modelo de base de datos** y sus relaciones.
5. 📡 Diseñar el **contrato de datos de la API REST**.

---

## 🖼️ 1. Diseño de Interfaz Gráfica

> Cada vista debe reflejar la distribución de los componentes principales del sistema.  
> Se pueden usar herramientas como **Figma**, **Canva**, **Google Slides** o **Draw.io**.

**Vistas requeridas:**

- 🏠 Página principal
- 🧑‍💻 Registro de usuarios
- 🔑 Inicio de sesión
- 🙍 Mi perfil
- 📝 Formulario para crear publicación
- 🖼️ Galería de publicaciones
- 🔍 Detalle de una publicación

<img width="488" height="244" alt="image" src="https://github.com/user-attachments/assets/cc7c1303-ec39-4052-a7b9-6ab54de658be" />
<img width="488" height="241" alt="image" src="https://github.com/user-attachments/assets/7b4ef2c8-8c26-4d65-9595-dcc140f22b16" />
<img width="488" height="349" alt="image" src="https://github.com/user-attachments/assets/f3b0d510-2ba3-4b21-af43-13334a6e4344" />
<img width="431" height="259" alt="image" src="https://github.com/user-attachments/assets/7b04adec-2f9e-4428-aed2-ac51f5fac95f" />
<img width="488" height="219" alt="image" src="https://github.com/user-attachments/assets/f09050fa-880c-4ec6-be3a-2187f6a04012" />
<img width="488" height="418" alt="image" src="https://github.com/user-attachments/assets/61a7a277-1459-4135-a6b6-46dad6af6f4f" />
<img width="464" height="506" alt="image" src="https://github.com/user-attachments/assets/82e2db87-1f41-4ba7-93f8-2ffda536a619" />
<img width="417" height="560" alt="image" src="https://github.com/user-attachments/assets/8976b7bd-dc81-4dad-af50-04146bed85ee" />

---

## 🧭 2. Definición de Navegación

> Se deben distinguir las vistas **públicas** y **privadas** según los accesos.

**Públicas:**

- Página principal
- Registro
- Inicio de sesión
- Galeria
- Detalle publicación
- Carro de compras

**Privadas:**

- Mi perfil
- Crear publicación
- Mis publicaciones

![vistas](https://github.com/user-attachments/assets/51382e7a-ca1e-4041-8fbf-dfe9ad4e8f23)

---

## 📦 3. Dependencias del Proyecto

> Lista de librerías, frameworks o herramientas que se utilizarán.

### Frontend

```json
{
  "produccion": [
    "react",
    "react-dom",
    "react-router-dom",
    "axios",
    "lucide-react",
    "react-hot-toast",
    "tailwindcss",
    "@tailwindcss/vite"
  ],
  "desarrollo": [
    "vite",
    "@vitejs/plugin-react",
    "eslint",
    "@eslint/js",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react-refresh",
    "daisyui",
    "@types/react",
    "@types/react-dom",
    "globals"
  ]
}
```

### Backend

```json
{
  "produccion": [
    "bcryptjs",
    "cors",
    "dotenv",
    "express",
    "jsonwebtoken",
    "pg",
    "pg-format",
    "morgan",
    "cloudinary",
    "multer",
    "multer-storage-cloudinary"
  ],
  "desarrollo": ["nodemon", "jest", "supertest"]
}
```

---

## 🗃️ 4. Diseño de Base de Datos

> Se debe representar el modelo de datos y las relaciones entre las tablas.  
> Puedes usar **Draw.io**, **Lucidchart**, **DB Diagram** u otra herramienta similar.

### Tablas

#### usuarios

- `id` (SERIAL PRIMARY KEY)
- `username` (VARCHAR(50) UNIQUE NOT NULL)
- `email` (VARCHAR(100) UNIQUE NOT NULL)
- `password` (VARCHAR(100) NOT NULL)
- `nombre` (VARCHAR(100) NOT NULL)
- `fecha_registro` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
- `rol` (VARCHAR(10) DEFAULT 'user', CHECK: 'admin' o 'user')

#### categorias

- `id` (SERIAL PRIMARY KEY)
- `nombre` (VARCHAR(100) NOT NULL)
- `descripcion` (TEXT NOT NULL)

#### publicaciones

- `id` (SERIAL PRIMARY KEY)
- `usuario_id` (INT, FK → usuarios.id, ON DELETE CASCADE)
- `categoria_id` (INT, FK → categorias.id, ON DELETE SET NULL)
- `titulo` (VARCHAR(150) NOT NULL)
- `descripcion` (TEXT NOT NULL)
- `precio` (INT NOT NULL)
- `url_imagen` (TEXT NOT NULL)
- `fecha_creacion` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
- `estado` (VARCHAR(10) NOT NULL, valores: 'nuevo' o 'usado')

<img width="931" height="361" alt="bd drawio" src="https://github.com/user-attachments/assets/6febdd9d-a4de-423a-bbee-adc9b06df912" />

---

## 🔐 5. Contrato de Datos de la API REST

> Documento que define los **endpoints**, **métodos HTTP**, **rutas**, **parámetros** y **estructuras de datos** esperadas.

```json
{
  "name": "Marketplace API",
  "version": "1.0.0",
  "auth": {
    "type": "JWT",
    "header": "Authorization: Bearer <token>"
  },
  "endpoints": {
    "auth": {
      "POST /api/auth/register": {
        "desc": "Registrar nuevo usuario",
        "body": {
          "username": "string",
          "email": "string",
          "password": "string",
          "nombre": "string"
        },
        "response": {
          "message": "Usuario registrado con éxito",
          "usuario": {
            "id": 1,
            "username": "juan123",
            "nombre": "Juan Pérez",
            "email": "juan@example.com",
            "rol": "user",
            "fecha_registro": "2025-10-24T15:10:00Z"
          },
          "token": "<jwt_token>"
        }
      },
      "POST /api/auth/login": {
        "desc": "Iniciar sesión",
        "body": {
          "email": "string",
          "password": "string"
        },
        "response": {
          "message": "Login exitoso",
          "token": "<jwt_token>",
          "usuario": {
            "id": 1,
            "username": "juan123",
            "rol": "user"
          }
        }
      }
    },
    "usuarios": {
      "GET /api/usuarios/me": {
        "auth": true,
        "desc": "Obtener perfil del usuario autenticado",
        "response": {
          "id": 1,
          "username": "juan123",
          "email": "juan@example.com",
          "nombre": "Juan Pérez",
          "rol": "user",
          "fecha_registro": "2025-10-24T15:10:00Z"
        }
      },
      "GET /api/usuarios/publicaciones": {
        "auth": true,
        "desc": "Obtener publicaciones del usuario autenticado",
        "response": [
          {
            "id": 12,
            "titulo": "Bicicleta de montaña",
            "descripcion": "En excelente estado",
            "precio": 120000,
            "url_imagen": "https://img.com/bici.jpg",
            "categoria": "Deportes",
            "fecha_creacion": "2025-10-20T12:00:00Z",
            "estado": "usado"
          }
        ]
      }
    },
    "categorias": {
      "GET /api/categoria": {
        "desc": "Listar todas las categorías",
        "response": [
          {
            "id": 1,
            "nombre": "Electrónica",
            "descripcion": "Celulares, TV, etc."
          },
          {
            "id": 2,
            "nombre": "Hogar",
            "descripcion": "Muebles, decoración"
          }
        ]
      }
    },
    "productos": {
      "GET /api/producto": {
        "desc": "Listar todas las publicaciones (catálogo)",
        "query": {
          "categoria_id": "int (opcional)"
        },
        "response": [
          {
            "id": 5,
            "titulo": "Bicicleta de montaña",
            "descripcion": "En excelente estado",
            "precio": 120000,
            "url_imagen": "https://img.com/bici.jpg",
            "categoria": {
              "id": 2,
              "nombre": "Deportes"
            },
            "usuario": {
              "id": 1,
              "username": "juan123"
            },
            "fecha_creacion": "2025-10-20T12:00:00Z",
            "estado": "usado"
          }
        ]
      },
      "GET /api/producto/random": {
        "desc": "Obtener publicaciones aleatorias para la página principal",
        "response": [
          {
            "id": 5,
            "titulo": "Bicicleta de montaña",
            "descripcion": "En excelente estado",
            "precio": 120000,
            "url_imagen": "https://img.com/bici.jpg",
            "categoria": {
              "id": 2,
              "nombre": "Deportes"
            },
            "usuario": {
              "id": 1,
              "username": "juan123"
            },
            "fecha_creacion": "2025-10-20T12:00:00Z",
            "estado": "usado"
          }
        ]
      },
      "GET /api/producto/:id": {
        "desc": "Obtener detalles de una publicación",
        "response": {
          "id": 5,
          "titulo": "Bicicleta de montaña",
          "descripcion": "En excelente estado",
          "precio": 120000,
          "url_imagen": "https://img.com/bici.jpg",
          "categoria": {
            "id": 2,
            "nombre": "Deportes"
          },
          "usuario": {
            "id": 1,
            "username": "juan123"
          },
          "fecha_creacion": "2025-10-20T12:00:00Z",
          "estado": "usado"
        }
      },
      "POST /api/producto/nuevo": {
        "auth": true,
        "desc": "Crear nueva publicación (con imagen)",
        "contentType": "multipart/form-data",
        "body": {
          "titulo": "string",
          "descripcion": "string",
          "precio": "int",
          "imagen": "file (opcional)",
          "categoria_id": "int",
          "estado": "string ('nuevo' o 'usado')"
        },
        "response": {
          "id": 10,
          "message": "Publicación creada correctamente"
        }
      },
      "PUT /api/producto/:id": {
        "auth": true,
        "desc": "Actualizar publicación (solo dueño o admin, con imagen opcional)",
        "contentType": "multipart/form-data",
        "body": {
          "titulo": "string (opcional)",
          "descripcion": "string (opcional)",
          "precio": "int (opcional)",
          "imagen": "file (opcional)",
          "estado": "string (opcional, 'nuevo' o 'usado')"
        },
        "response": {
          "message": "Publicación actualizada correctamente"
        }
      },
      "DELETE /api/producto/:id": {
        "auth": true,
        "desc": "Eliminar publicación (solo dueño o admin)",
        "response": {
          "message": "Publicación eliminada correctamente"
        }
      },
      "POST /api/producto/checkout": {
        "auth": true,
        "desc": "Procesar compra de productos (carrito)",
        "body": {
          "productos": [
            {
              "id": 5,
              "cantidad": 1
            }
          ]
        },
        "response": {
          "message": "Compra procesada exitosamente"
        }
      }
    }
  },
  "errors": {
    "400": "Datos inválidos o faltantes",
    "401": "Token JWT inválido o ausente",
    "403": "Permisos insuficientes",
    "404": "Recurso no encontrado",
    "500": "Error interno del servidor"
  },
  "roles": {
    "user": [
      "ver publicaciones",
      "crear publicaciones",
      "editar propias publicaciones",
      "eliminar propias publicaciones"
    ],
    "admin": [
      "todo acceso",
      "editar cualquier publicación",
      "eliminar cualquier publicación"
    ]
  }
}
```

---

## 🚀 Instalación y Configuración

### Backend

1. Navegar a la carpeta backend:

```bash
cd backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` basado en `.env.example`:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=marketplace
DB_PASS=tu_password
DB_PORT=5432
DB_DEFAULT=postgres
PORT=3000
JWT_SECRET=tu_secret_key
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

4. Crear la base de datos:

```bash
npm run createdb
```

5. Ejecutar migraciones:

```bash
npm run migrate
```

6. Iniciar servidor de desarrollo:

```bash
npm run dev
```

### Frontend

1. Navegar a la carpeta frontend/marketplace:

```bash
cd frontend/marketplace
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar servidor de desarrollo:

```bash
npm run dev
```

---

## 🧪 Testing

### Backend

Ejecutar tests:

```bash
cd backend
npm test
```

---

## 📝 Notas Importantes

- El proyecto utiliza **Cloudinary** para el almacenamiento de imágenes
- Las imágenes se suben mediante **Multer** con soporte para Cloudinary
- El campo `estado` en publicaciones puede ser: `'nuevo'` o `'usado'`
- La autenticación se maneja mediante **JWT**
- Las rutas protegidas requieren el header: `Authorization: Bearer <token>`
