import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addProducto } from "../controllers/productoController.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.post("/nuevo", auth, upload.single("imagen"), addProducto);



export default router;
