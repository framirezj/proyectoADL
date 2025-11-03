import { obtenerCategorias } from "../services/categoriaService.js"

export async function getCategorias(req, res) {
    try {

        const categorias = await obtenerCategorias()

        res.status(200).json({
            message: "Categorias",
            categorias
        })
    } catch (error) {
        
    }
}