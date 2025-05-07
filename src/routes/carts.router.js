import { Router } from "express";
// import CartModel from "../dao/models/cart.model.js";
// import CartManager from "../manager/cart-manager.js";
import cartController from "../controllers/cart.controller.js";


// const manager = new CartManager()
const cartsRouter = Router();

cartsRouter.post("/", cartController.createCart);
cartsRouter.get("/:cid", cartController.getCartById);
cartsRouter.post("/:cid/product/:pid", cartController.addProductToCart);
cartsRouter.put("/:cid/product/:pid", cartController.actualizaCantidad);
cartsRouter.delete("/:cid/products/:pid", cartController.eliminarProductoDelCArrito);
cartsRouter.delete("/:cid", cartController.vaciarCarrito);



export default cartsRouter;






// // Crear un nuevo carrito

// cartsRouter.post("/", async (req , res) => {
//     try {
//         const nuevoCarrito = await manager.crearCarrito();
//         res.json(nuevoCarrito);
//     } catch (error) {
//         res.status(500).json({error: "Error al intentar crear un carrito nuevo"})
//     }
// })

// // mostrarmos todos los carritos


// // mostramos los productos del carrito buscado por su id
// cartsRouter.get("/:cid", async (req, res) => {
//     const cartId = req.params.cid;
    
//     try {
//         const carritoBuscado = await CartModel.findById(cartId);

//         if(!carritoBuscado) {
//             console.log("No existe el carrito con ese id");
//             return res.status(404).json({error: "Carrito no encontrado"})   
//         }

//         res.json(carritoBuscado.products)
//     } catch (error) {
//         console.error("Error al obtener el carrito", error);
//         res.status(500).json({error: "Error al tratar de cargar los productos del carrito"})
//     }
// })


// // Agregar productos a diferentes carritos

// cartsRouter.post("/:cid/product/:pid", async (req, res) => {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;
//     const quantity = req.body.quantity || 1;

//     try {
//         const actualizarCarrito = await manager.agregarProductoAlCarrito(cartId, productId, quantity);
//         res.json(actualizarCarrito.products);
//     } catch (error) {
//         console.error("Error al agregar producto al carrito", error);
//         console.log(error);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// });

// // eliminar un producto especifido del carrito por su id

// cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
//     try {
//         const cartId = req.params.cid
//         const productId = req.params.pid

//         const updatedCart = await manager.eliminarProductoDelCarrito(cartId, productId);
//         res.json({
//             status: "success",
//             message: "Producto eliminado correctamente",
//             updatedCart
//         });
//     } catch (error) {
//         console.error("Error al intentar eliminar el producto del carrito", error);
//         res.status(500).json({status: "error", error:"Error del servidor"})
//     }
// });

// // Actulizar las cantidades de productos en el carrito

// cartsRouter.put("/:cid/product/:pid", async (req, res) => {
//     try {
//         const cartId = req.params.cid;
//         const productId = req.params.pid;
//         const newQuantity = req.body.quantity;

//         const updatedCart = await manager.actualizarCantidadDeProductos(cartId, productId, newQuantity)
//         res.json({
//             status: "succes",
//             message: "La cantidad del producto se actualizó correctamente",
//             updatedCart});
            
        
        
//     } catch (error) {
//         console.error("Error al actualizar la cantidad del producto", error);
//         res.status(500).json({error: "Error del servidor"});
//     }
// });


// // Vaciar el carrito

// cartsRouter.delete("/:cid", async (req, res) => {
//     try {
//         const cartId = req.params.cid;
//         const updatedCart = await manager.vaciarCarrito(cartId);
//         res.status(200).json({
//             status: "success",
//             message: "Todos los productos del carrito fueron borrados",
//             updatedCart
//         });
        
//     } catch (error) {
//         console.error("Error al vaciar el carrito", error);
//         res.status(500).json({status: "error", error: "Error interno del servidor"})
        
//     }
// })

