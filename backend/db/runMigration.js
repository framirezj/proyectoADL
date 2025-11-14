import fs from "fs";
import path from "path";
import pool from "../config/db.js";

if (process.env.NODE_ENV !== "production") {
  const dotenvPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(dotenvPath)) {
    await import("dotenv").then((mod) =>
      mod.default.config({ path: dotenvPath })
    );
  }
}

const sqlFile = path.resolve(process.cwd(), "db", "init.sql");
const sql = fs.readFileSync(sqlFile, "utf8");

async function run() {
  console.log("🔎 Migración iniciada (NODE_ENV=", process.env.NODE_ENV, ")");
  console.log("DB_HOST=", process.env.DB_HOST || "(via DATABASE_URL)");

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");
    console.log("✅ Migración ejecutada correctamente");
    process.exit(0);
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("❌ Error en migración:", err.message);
    process.exit(1);
  } finally {
    client.release();
  }
}

run();
