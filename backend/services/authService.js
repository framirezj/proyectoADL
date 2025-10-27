import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "jwtdeprueba";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1d";

export async function registerUser({ username, email, password, nombre }) {
  if (!username || !email || !password || !nombre)
    throw { status: 400, message: "Faltan campos" };

  // verificar existencia
  const { rows: exists } = await pool.query(
    "SELECT id FROM usuarios WHERE username = $1 OR email = $2",
    [username, email]
  );
  if (exists.length)
    throw { status: 409, message: "Usuario o email ya registrado" };

  const hashed = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO usuarios (username, email, password, nombre)
     VALUES ($1,$2,$3,$4) RETURNING id, username, email, nombre, fecha_registro, rol`,
    [username, email, hashed, nombre]
  );
  return rows[0];
}

export async function authenticateUser({ usernameOrEmail, password }) {
  if (!usernameOrEmail || !password)
    throw { status: 400, message: "Faltan campos" };

  const { rows } = await pool.query(
    "SELECT id, username, email, password, nombre, rol FROM usuarios WHERE username = $1 OR email = $1",
    [usernameOrEmail]
  );
  const user = rows[0];
  if (!user) throw { status: 401, message: "Credenciales inválidas" };

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw { status: 401, message: "Credenciales inválidas" };

  const token = jwt.sign(
    { userId: user.id, username: user.username, role: user.rol },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  return { user, token };
}
