// controllers/productoController.js
import {
  crearProducto,
  borrarProducto as borrar,
  obtenerPublicaciones as obtener,
  obtenerPublicacion as obtenerById
} from "../services/productoService.js";

export async function addProducto(req, res) {
  try {
    const { titulo, categoria, condicion, descripcion, precio } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const userId = req.user.userId;

    const producto = await crearProducto({
      userId,
      titulo,
      categoria,
      condicion,
      descripcion,
      precio,
      imagen,
    });

    res.status(201).json({
      message: "Producto creado correctamente",
      producto,
    });
  } catch (error) {
    console.error("Error en addProducto:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Error al crear el producto" });
  }
}

export async function borrarProducto(req, res) {
  try {
    const { id: productoId } = req.params;
    await borrar(productoId);
    res.status(204).send();
  } catch (error) {
    console.error("Error al remover producto:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Error al remover producto" });
  }
}

export async function obtenerPublicaciones(req, res) {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.status(200).json(await obtener(baseUrl));
  } catch (error) {
    console.error("Error al obtener los registros:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Error al obtener los registros" });
  }
}

export async function obtenerPublicacion(req, res) {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const { id: productoId } = req.params
  res.status(200).json(await obtenerById(productoId, baseUrl));
}
