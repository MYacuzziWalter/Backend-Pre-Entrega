import { Router } from "express";
import ProductManager from "../manager/product-manager.js";
import CartManager from "../manager/cart-manager.js";




const router = Router();
const productmanager = new ProductManager();
const cartManager = new CartManager();




router.get("/products", async (req, res) => {
    try {
       const { page = 1, limit = 2 } = req.query;
       const productos = await productmanager.getProducts({
          page: parseInt(page),
          limit: parseInt(limit)
       });
 
       const nuevoArray = productos.docs.map(producto => {
          const { _id, ...rest } = producto.toObject();
          return rest;
       });
 
       res.render("products", {
          productos: nuevoArray,
          hasPrevPage: productos.hasPrevPage,
          hasNextPage: productos.hasNextPage,
          prevPage: productos.prevPage,
          nextPage: productos.nextPage,
          currentPage: productos.page,
          totalPages: productos.totalPages
       });
 
    } catch (error) {
       console.error("Error al obtener productos", error);
       res.status(500).json({
          status: 'error',
          error: "Error interno del servidor"
       });
    }
 });

router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await cartManager.getCarritoById(cartId);
        if(!carrito){
            console.log("No se encuentra el carrito con ese id");
            return res.status(404).json({error: "Carrito no encontrado"})
            
        }

        const productosEnCarrito = carrito.products.map(item => ({
            product: item.product.toObject(),
            quantity: item.quantity
        }));

        res.render("carts", {productos: productosEnCarrito})
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({error: "Error interno del servidor"})
        
    }
    
})


export default router;