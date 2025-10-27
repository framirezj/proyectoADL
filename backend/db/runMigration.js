import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import pool from "../config/db.js";

// Carga .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const sqlFile = path.resolve(process.cwd(), "db", "init.sql");
const sql = fs.readFileSync(sqlFile, "utf8");

async function run() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");
    console.log("✅ Migración ejecutada correctamente");
    process.exit(0);
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("❌ Error en migración:", err.message || err);
    process.exit(1);
  } finally {
    client.release();
  }
}

run();
