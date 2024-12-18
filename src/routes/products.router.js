import { Router } from "express";
import productManager from "../manager/product-manager.js"
import { error } from "console";
const productsRouter = Router();


const manager = new productManager("./src/data/productos.json")






productsRouter.get("/", async (req, res) => {

    let limit = req.query.limit;

    const productos = await manager.getProduct();

    if (limit) {
        res.send(productos.slice(0, limit));
    } else {
        res.send(productos);
        console.log("error al pedir el limite");
    }
})

productsRouter.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid);
    try {
        let productoBuscado = await manager.getProductById(id);
        if (!productoBuscado) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.json(productoBuscado);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }

})



productsRouter.post("/",async (req, res) => {
    try {
        const { title, description, price, img, code, stock } = req.body;
        if (!title || !description || !price || !img || !code || !stock) {
            res.status(404).json({error: "revisa bien, falta algun dato"})
        } else {

            await manager.addProduct({title, description, price, img, code, stock});
            
            res.status(201).json({message: "Producto agregado exitosamente"})
        }
        
    } catch (error) {
        res.status(500).json({error: "error al agregar producto"})
    }
})

productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const datosActulizados = req.body;

    try {
        const productoActualizado = await manager.actualizarProducto(parseInt(pid), datosActulizados )
        
        res.status(200).json({
            message: "Producto actualizado correctamente",
            producto: productoActualizado
        });
    } catch (error) {
        res.status(400).json({error: "Algo salió mal"})
    }
})


productsRouter.delete("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);

    try {
        await manager.borrarProductoById(pid);
        res.status(200).json({message: `Producto ${pid} eliminado correctamente`});
    } catch (error) {
        res.status(404).json({message: "Algo salio mal al intentar eliminar el producto"});
    }
})





export default productsRouter;