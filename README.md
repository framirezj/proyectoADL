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

🖇️ *Agrega aquí tus imágenes o enlaces a los bocetos.*

---

## 🧭 2. Definición de Navegación

> Se deben distinguir las vistas **públicas** y **privadas** según los accesos.

**Públicas:**
- Página principal  
- Registro  
- Inicio de sesión  

**Privadas:**
- Mi perfil  
- Crear publicación  
- Galería  
- Detalle de publicación  

📄 *Incluye un diagrama o tabla que represente la navegación.*

---

## 📦 3. Dependencias del Proyecto

> Lista de librerías, frameworks o herramientas que se utilizarán.

Frontend
```json
{
  "dependencies": [
    "vite",
    "react",
    "react-router-dom",
    "axios",
    "lucide-react",
    "react-hot-toast",
    "tailwindcss",
    "daisyui"
  ]
}
```

Backend
```json
{
  "produccion": [
    "bcryptjs",
    "cors",
    "dotenv",
    "express",
    "jsonwebtoken",
    "nanoid",
    "pg",
    "pg-format",
    "morgan",
    "jest"
  ],
  "desarrollo": [
    "nodemon"
  ]
}
```


---

## 🗃️ 4. Diseño de Base de Datos

> Se debe representar el modelo de datos y las relaciones entre las tablas.  
> Puedes usar **Draw.io**, **Lucidchart**, **DB Diagram** u otra herramienta similar.



**Ejemplo de tablas mínimas:**
- `usuarios`
- `publicaciones`
- `categorias`
- `comentarios`
- `favoritos`

🖇️ *Agrega aquí tu diagrama en formato `.png` o `.drawio`.*

---

## 🔐 5. Contrato de Datos de la API REST

> Documento que define los **endpoints**, **métodos HTTP**, **rutas**, **parámetros** y **estructuras de datos** esperadas.



**Ejemplo:**
```json
{
  "api": "Marketplace API (Versión 1.0)",
  "base_url": "/api",
  "auth": {
    "type": "JWT",
    "header": "Authorization: Bearer <token>"
  },
  "routes": [
    {
      "name": "Registro de usuario",
      "method": "POST",
      "path": "/auth/register",
      "protected": false,
      "description": "Registrar un nuevo usuario."
    },
    {
      "name": "Inicio de sesión",
      "method": "POST",
      "path": "/auth/login",
      "protected": false,
      "description": "Autenticar usuario y devolver token."
    }
  ]
}

