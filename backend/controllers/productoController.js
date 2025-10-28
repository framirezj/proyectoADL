// controllers/productoController.js
import { crearProducto } from "../services/productoService.js";

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

//esto llega:

/*
categoria:"electronica"
condicion:"usado"
descripcion:"poco uso"
imagen:File {name: 'telefono.png', lastModified: 1761676407085, lastModifiedDate: Tue Oct 28 2025 15:33:27 GMT-0300 (hora de verano de Chile), webkitRelativePath: '', size: 732654, …}
precio:"9.99"
titulo:"iphone 13"
*/
