import request from "supertest";
import app from "../app.js";
import pool from "../config/db.js";

describe("API básica", () => {
  it("GET / debe responder 200 con mensaje Hola Mundo!", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Hola Mundo!");
  });

  it("GET /ruta-que-no-existe debe responder 404", async () => {
    const res = await request(app).get("/ruta-que-no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /api/usuarios/me sin token debe responder 401", async () => {
    const res = await request(app).get("/api/usuarios/me");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("POST /api/auth/login sin campos debe responder 400", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect([400, 422]).toContain(res.status); // el servicio arroja 400 para campos faltantes
    expect(res.body).toHaveProperty("error");
  });

  it("POST /api/auth/register sin campos debe responder 400", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect([400, 422]).toContain(res.status);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /api/usuarios/publicaciones sin token debe responder 401", async () => {
    const res = await request(app).get("/api/usuarios/publicaciones");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /api/usuarios/me con token inválido debe responder 401", async () => {
    const res = await request(app)
      .get("/api/usuarios/me")
      .set("Authorization", "Bearer invalid.token.here");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("POST /api/producto/nuevo sin token debe responder 401", async () => {
    const res = await request(app)
      .post("/api/producto/nuevo")
      .send({ titulo: "x" });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("DELETE /api/producto/:id sin token debe responder 401", async () => {
    const res = await request(app).delete("/api/producto/999");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /health debe responder 200 con db=true", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("db", true);
    expect(res.body).toHaveProperty("now");
  });

  it("GET /api/categoria/ debe responder 200 con estructura válida", async () => {
    const res = await request(app).get("/api/categoria/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Categorias");
    expect(Array.isArray(res.body.categorias)).toBe(true);
  });

  afterAll(async () => {
    // Cierra el pool de PG para que Jest termine el proceso
    await pool.end();
  });
});
