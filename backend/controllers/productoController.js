// controllers/productoController.js
import {
  crearProducto,
  borrarProducto as borrar,
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
    console.log(productoId);
    await borrar(productoId);
    res.status(204).send();
  } catch (error) {
    console.error("Error al remover producto:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Error al remover producto" });
  }
}
