import { Router } from "express";
import cartManager from "../manager/cart-manager.js";

const manager = new cartManager("./src/data/carts.json")
const cartsRouter = Router();




// Crear un nuevo carrito

cartsRouter.post("/", async (req , res) => {
    try {
        const nuevoCarrito = await manager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({error: "Error al intentar crear un carrito nuevo"})
    }
})

// mostramos los productos del carrito buscado por su id
cartsRouter.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    
    try {
        const carritoBuscado = await manager.getCarritoById(cartId);
        res.json(carritoBuscado.products)
    } catch (error) {
        res.status(500).json({error: "Error al tratar de cargar los productos del carrito"})
    }
})


// Agregar productos al carrito

cartsRouter.post("/:cid/product/:pid", async(req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;


    try {
        const actualizarCarrito = await manager.agregarProductoAlCart(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        res.status(500).json({error: "Error al intentar cargar"})
    }
})



export default cartsRouter;