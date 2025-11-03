import { selectAllCategorias } from "../models/categoriaModel.js"

export async function obtenerCategorias() {
    return await selectAllCategorias()
}

export async function crearCategoria(data) {
    
}

