import { Router } from "express";
import auth from "../middlewares/auth.js";
import { getMe } from "../controllers/userController.js";

const router = Router();

router.get("/usuarios/me", auth, getMe);

export default router;
