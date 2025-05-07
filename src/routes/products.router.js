import { Router } from "express";
import productController from "../controllers/product.controller.js";
// import productManager from "../manager/product-manager.js"




const productsRouter = Router();
// const manager = new productManager()

productsRouter.get("/", productController.getAll);
productsRouter.get("/:pid", productController.getById);
productsRouter.post("/", productController.create);
productsRouter.put("/:pid", productController.update);
productsRouter.delete("/:pid", productController.delete);






/*
// productsRouter.get("/", async (req, res) => {
//     try {
//         const { limit = 10, page = 1, sort, query } = req.query;

//         const productos = await manager.getProducts({
//             limit: parseInt(limit),
//             page: parseInt(page),
//             sort,
//             query,
//         });

//         res.json({
//             status: 'success',
//             payload: productos,
//             totalPages: productos.totalPages,
//             prevPage: productos.prevPage,
//             nextPage: productos.nextPage,
//             page: productos.page,
//             hasPrevPage: productos.hasPrevPage,
//             hasNextPage: productos.hasNextPage,
//             prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
//             nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
//         });

//     } catch (error) {
//         console.error("Error al obtener productos", error);
//         res.status(500).json({
//             status: 'error',
//             error: "Error interno del servidor"
//         });
//     }
// });


// // traer solo un producto

// productsRouter.get("/:pid", async (req, res) => {
//     const id = req.params.pid;
//     try {
//         const productoBuscado = await manager.getProductById(id);
//         if (!productoBuscado) {
//             res.status(404).json({ error: "Producto no encontrado" });
//         } 
//             res.json(productoBuscado);
        
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener el producto" });
//     }

// })

// // Agregar nuevo producto

// productsRouter.post("/", async (req, res) => {
//     const nuevoProducto = req.body;

//     try {
//         await manager.addProduct(nuevoProducto);
//         res.status(201).json({
//             message: "Producto agregado exitosamente"
//         });
//     } catch (error) {
//         console.error("Error al agregar producto", error);
//         res.status(500).json({
//             error: "Error interno del servidor"
//         });
//     }
// });



// // actualizar por su id
// productsRouter.put("/:pid", async (req, res) => {
//     const pid = req.params.pid;
//     const datosActulizados = req.body;

//     try {
//         const productoActualizado = await manager.actualizarProducto(pid, datosActulizados)
        
//         res.status(200).json({
//             message: "Producto actualizado correctamente",
//             producto: productoActualizado
//         });
//     } catch (error) {
//         res.status(400).json({error: "Algo salió mal"})
//     }
// })


// productsRouter.delete("/:pid", async (req, res) => {
//     const pid = req.params.pid;

//     try {
//         await manager.borrarProductoById(pid);
//         res.status(200).json({message: `Producto ${pid} eliminado correctamente`});
//     } catch (error) {
//         res.status(404).json({message: "Algo salio mal al intentar eliminar el producto"});
//     }
// }) */





export default productsRouter