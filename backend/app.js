import express from "express";
import pool from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ruta test
app.get("/", (req, res) => {
  res.json({
    message: "Hola Mundo!",
  });
});

// health que verifica conexión a la DB
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ db: true, now: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ db: false, error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server On: http://localhost:${port}`);
});
