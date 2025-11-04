import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addProducto, borrarProducto, obtenerPublicaciones, obtenerPublicacion } from "../controllers/productoController.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.post("/nuevo", auth, upload.single("imagen"), addProducto);
router.delete("/:id", auth, borrarProducto)
router.get("/", obtenerPublicaciones)
router.get("/:id", obtenerPublicacion)

export default router;
