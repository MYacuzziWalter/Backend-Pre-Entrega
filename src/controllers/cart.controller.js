import cartService from "../services/cart.service.js"


class CartController {

    async createCart (req, res) {
        try {
            const cart = await cartService.createCart();
            res.status(201).json(cart);
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            res.status(500).json({ error: "Error al crear el carrito" });     
        }
    }


   async getCartById (req, res) {
        const cartId = req.params.cid;
        try {
            const cart = await cartService.getCarritoById(cartId);
            if (!cart) {
                return res.status(404).json({ error: "Carrito no encontrado"})
            }
            res.status(200).json(cart);
        } catch (error) {
            console.error("Error al obtener el carrito:", error)
            res.status(500).json({ error: "Error al obtener el carrito" });            
        }
   }

   async addProductToCart (req,res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1;
        try {
            await cartService.agregarProductoAlCarrito(cartId, productId, quantity);
            const carritoId = (req.user.cart).toString();

            res.redirect(`/api/carts/${cartId}`)
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
            res.status(500).json({ error: "Error al agregar el producto al carrito" });
        }
   }


   async eliminarProductoDelCArrito (req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        try {
            const cart = await cartService.eliminarProductoDelCarrito(cartId, productId);
            res.json({
                status: "success",
                message: "Producto eliminado del carrito",
                cart                
            });
        } catch {
            res.status(500).send({ error: "Error al eliminar el producto del carrito" });
        }
   }


   async actualizaCantidad (req, res) {

    try {
        const {cid, pid } = req.params;
        const quantity = req.body.quantity || 1;
        const actualizado = cartService.actualizaCantidad(cid, pid, quantity);
        res.json({
            status: "success",
            message: "Cantidad actualizada",
            actualizado
        });
    } catch (error) {
        res.status(500).send({ error: "Error al actualizar la cantidad"});
    }
   }


   async vaciarCarrito (req, res) {
    try {
        const cartId = req.params.cid;
        const cart = await cartService.vaciarCarrito(cartId);
        res.json({
            status: "success",
            message: "Carrito vaciado",
            cart
        });
    } catch (error) {
        res.status(500).send({ error: "Error al vaciar el carrito" });
    }
   }
   
}   


export default new CartController();