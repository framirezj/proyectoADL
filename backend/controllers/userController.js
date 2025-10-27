import { findById } from "../services/userService.js";

export async function getMe(req, res) {
  try {
    const user = await findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
