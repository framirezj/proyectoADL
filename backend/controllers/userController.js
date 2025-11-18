import { findById, publicacionesUser } from "../services/userService.js";

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

export async function getPublicacionesUser(req, res) {
  try {
    const { limit, page = 1, estado } = req.query;
    // Utilizar una expresión regular para verificar si 'page' es un número válido
    const isPageValid = /^[1-9]\d*$/.test(page);

    // Validar el resultado de la expresión regular
    if (!isPageValid) {
      return res
        .status(400)
        .json({ message: "Número de Página inválido, page > 0" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const data = await publicacionesUser(
      parseInt(req.user.userId),
      baseUrl,
      limit,
      page,
      estado
    );
    if (!data) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
}
