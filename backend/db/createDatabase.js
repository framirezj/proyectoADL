import { Client } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// cargar .env
const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "backend", ".env"),
];
for (const p of envCandidates)
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
    break;
  }

const DB_NAME = process.env.DB_NAME || "marketplace";

// conectar a la BD por defecto (postgres)
const client = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASS || "postgres",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  database: process.env.DB_DEFAULT || "postgres",
});

async function run() {
  try {
    await client.connect();
    const { rows } = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [DB_NAME]
    );
    if (rows.length > 0) {
      console.log(`✅ La base "${DB_NAME}" ya existe`);
    } else {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`✅ Base de datos "${DB_NAME}" creada`);
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al crear la base:", err.message || err);
    process.exit(1);
  } finally {
    await client.end().catch(() => {});
  }
}

run();
