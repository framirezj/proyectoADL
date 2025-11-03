import { Router } from "express";
import auth from "../middlewares/auth.js";
import { getMe, getPublicacionesUser } from "../controllers/userController.js";

const router = Router();

router.get("/usuarios/me", auth, getMe);
router.get("/usuarios/publicaciones", auth, getPublicacionesUser);

export default router;
