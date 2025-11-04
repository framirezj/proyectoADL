import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addProducto, borrarProducto } from "../controllers/productoController.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.post("/nuevo", auth, upload.single("imagen"), addProducto);
router.delete("/:id", auth, borrarProducto)

export default router;
