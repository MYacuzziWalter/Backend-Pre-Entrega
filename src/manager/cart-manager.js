// import { promises as fs } from "fs";
import CartModel from "../models/cart.model.js"
class CartManager {
    // constructor(path) {
    //     this.carts = [];
    //     this.path = path;
    //     this.ultId = 0;

    //     //carto los carritos almacenados en el archivo
    //     this.cargarCarrito();
    // }

    async crearCarrito() {
        try {
            const nuevoCarrito = await CartModel.create({ productos: [] })
            return nuevoCarrito;
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            throw new Error(" no se puede crear el carrito");
        }
    }


    // async cargarCarrito() {
    //     try {
    //         const data = await fs.readFile(this.path, "utf-8");
    //         //data viene como string y debo convertirlo en array de obj
    //         this.carts = JSON.parse(data)
    //         if (this.carts.length > 0) {
    //             this.ultId = Math.max(...this.carts.map(cart => cart.id));
    //         }
    //     } catch (error) {
    //         await this.guardarCarritos();
    //     }
    // }

    // async guardarCarritos() {
    //     try {
    //         await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    //     } catch (error) {
    //         console.log("Algo salio mal al cargar los datos del carrito");
            
    //     }
    // }

    // Metodos que me pide en la consigna//

    

    async getCarritoById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return null;
            }

            return carrito;
        } catch (error) {
            console.log("Error al traer el carrito, fijate bien lo que haces", error);
        }
    }


    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(cartId);
            const existeProducto = carrito.products.find(item => item.product.equals(productId));

            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productId, quantity });
            }

            //Vamos a marcar la propiedad "products" como modificada antes de guardar: 
            carrito.markModified("products");

            await carrito.save();
            return carrito;

        } catch (error) {
            console.log("error al agregar un producto", error);
        }
    }


    async actualizarCantidadDeProductos(cartId, productId, newQuantity){
        try {
            const cart = await CartModel.findById(cartId);

            if(!cart) {
                throw new Error("No se encontro el carrito");
            }

            const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);

            if(!productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity

                cart.markModified("products");
                await cart.save();
                console.log("Producto agregado correcatamente");
                
            } else {
                throw new Error("Producto no encontrado en el carrito");
            }
        } catch (error) {
            console.error("Error al intentar actualizar la cantidad de producto en el carrito");
            throw error;
                        
        }
    }


    async actualizarCarrito(cartId, updateProducts) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado")
            }

            cart.products = updateProducts;

            cart.markModified(`products`);

            await cart.save();

            return cart
        } catch (error) {
            console.error("Error al actualizar el carrito", error.message)
            throw new Error(`No se pudo actualizar el carrito: ${error.message}`)
        };
    }





    async eliminarProductoDelCarrito(cartId, productId){
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cartId,
                {$pull: {products: { product: productId }}}, // $pull para eliminar el producto directamente de la base de datos.
                {new: true} // devuelve la ultima actualizacion del carrito
            );
            if (!cart) {
                throw new Error("Carrito no encontrado")
            }
            return cart
        } catch (error) {
            console.error("Error al eliminar el producto del carrito", error.message);
            throw new Error (`No se pudo eliminar el producto ${error.message}`)
        }
    }


    async vaciarCarrito (cartId){
        try {
            const carrito = await CartModel.findByIdAndUpdate(
                cartId,
                {products: []},
                {new: true}
            );

            if(!carrito){
                throw new Error("Carrito no encontrado");
            }
            return {message: "carrito vaciado correctamente"};

        } catch (error) {
            console.log("Error al vaciar el carrito", error);
            throw new Error(`No se pudo vaciar el carrito ${error.message}`)
        }
    }
    
}


export default CartManager