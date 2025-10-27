import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import pool from "./config/db.js";
import usuariosRouter from "./routes/usuarios.js";
import authRouter from "./routes/auth.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// health que verifica conexión a la DB
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ db: true, now: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ db: false, error: err.message });
  }
});

//ruta test
app.get("/", (req, res) => {
  res.json({
    message: "Hola Mundo!",
  });
});

// Routers
app.use("/api/auth", authRouter);
app.use("/api", usuariosRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Error interno del servidor" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server On: http://localhost:${port}`);
});
