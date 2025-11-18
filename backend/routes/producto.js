import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addProducto,
  borrarProducto,
  obtenerPublicaciones,
  obtenerPublicacion,
  obtenerPublicacionesRandom,
  actualizarPublicacion,
  checkoutProductos,
} from "../controllers/productoController.js";
import upload from "../middlewares/upload.js";

const router = Router();

/* 
/api/producto
*/

router.post("/nuevo", auth, upload.single("imagen"), addProducto);
router.delete("/:id", auth, borrarProducto);
router.get("/", obtenerPublicaciones);
router.get("/random", obtenerPublicacionesRandom);
router.get("/:id", obtenerPublicacion);
router.put("/:id", auth, upload.single("imagen"), actualizarPublicacion);
router.post("/checkout", auth, checkoutProductos);

export default router;
