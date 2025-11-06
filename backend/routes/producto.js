import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addProducto, borrarProducto, obtenerPublicaciones, obtenerPublicacion, obtenerPublicacionesRandom } from "../controllers/productoController.js";
import upload from "../middlewares/upload.js";

const router = Router();

/* 
/api/producto
*/

router.post("/nuevo", auth, upload.single("imagen"), addProducto);
router.delete("/:id", auth, borrarProducto)
router.get("/", obtenerPublicaciones)
router.get("/random", obtenerPublicacionesRandom)
router.get("/:id", obtenerPublicacion)

export default router;
