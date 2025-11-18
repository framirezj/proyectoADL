// controllers/productoController.js
import {
  crearProducto,
  borrarProducto as borrar,
  obtenerPublicaciones as obtener,
  obtenerPublicacion as obtenerById,
  obtenerPublicacionesRandom as obtenerRandom,
  actualizarProducto as servicioActualizar,
} from "../services/productoService.js";

export async function addProducto(req, res) {
  try {
    const { titulo, categoria, condicion, descripcion, precio } = req.body;
    const imagen = req.file ? req.file.path : null;
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
    await borrar(productoId, req.user);
    res.status(204).send();
  } catch (error) {
    console.error("Error al remover producto:", error.message);
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }
    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: error.message || "Error al remover producto" });
  }
}

export async function obtenerPublicaciones(req, res) {
  const { limit, order, page = 1, categoria } = req.query;
  // Utilizar una expresión regular para verificar si 'page' es un número válido
  const isPageValid = /^[1-9]\d*$/.test(page);

  // Validar el resultado de la expresión regular
  if (!isPageValid) {
    return res
      .status(400)
      .json({ message: "Número de Página inválido, page > 0" });
  }

  try {
    const response = await obtener({ limit, order, page, categoria });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener los registros:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Error al obtener los registros" });
  }
}

export async function obtenerPublicacion(req, res) {
  const { id: productoId } = req.params;
  res.status(200).json(await obtenerById(productoId));
}

export async function obtenerPublicacionesRandom(req, res) {
  try {
    res.status(200).json(await obtenerRandom());
  } catch (error) {
    console.error("Error al obtener los registros:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Error al obtener los registros" });
  }
}

export async function actualizarPublicacion(req, res) {
  try {
    const { id: productoId } = req.params;
    const { titulo, categoria, condicion, descripcion, precio } = req.body;
    const imagen = req.file ? req.file.path : undefined;

    const updated = await servicioActualizar(
      productoId,
      {
        titulo,
        categoria,
        condicion,
        descripcion,
        precio,
        imagen,
      },
      req.user
    );

    res
      .status(200)
      .json({ message: "Producto actualizado", producto: updated });
  } catch (error) {
    console.error("Error actualizarPublicacion:", error.message);
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: error.message || "Error al actualizar producto" });
  }
}
