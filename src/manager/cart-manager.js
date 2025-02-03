import { promises as fs } from "fs";
import CartModel from "../models/cart.model.js"
import mongoose from "mongoose";
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
            const nuevoCarrito = await CartModel.create({ products: [] })
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear el carrito:", error);
            throw new Error(" no se puede crear el carrito");
        }
    }


    async cargarCarrito() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            //data viene como string y debo convertirlo en array de obj
            this.carts = JSON.parse(data)
            if (this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            await this.guardarCarritos();
        }
    }

    async guardarCarritos() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.log("Algo salio mal al cargar los datos del carrito");
            
        }
    }

    // Metodos que me pide en la consigna//

    

    async getCarritoById(cartId) {
        try { 
            if (!mongoose.isValidObjectId(cartId)) {
                console.log("El id proporcionado no es válido");
                return null
            }
            
            const carrito = await CartModel.findById(cartId);
    
            return carrito || null;

            
        } catch (error) {
            console.log("Error al obtener el carrito:" , error.message);
            throw new Error ("no se pudo recuperar el carrito. Verifique si el id del carrito es correcto")
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            // Buscar el carrito con el producto
            const carrito = await CartModel.findOne({ _id: cartId, "products.product": productId });
    
            if (carrito) {
                // Si el producto ya existe, solo actualizamos la cantidad
                const updatedCarrito = await CartModel.findOneAndUpdate(
                    { _id: cartId, "products.product": productId },
                    { $inc: { "products.$.quantity": quantity } },
                    { new: true }
                );
                return updatedCarrito;
            } else {
                // Si el carrito no tiene el producto, lo agregamos
                const nuevoCarro = await CartModel.findByIdAndUpdate(
                    cartId,
                    { $push: { products: { product: productId, quantity } } },
                    { new: true, upsert: false } // upsert: false ya que no queremos crear un nuevo carrito
                );
    
                if (!nuevoCarro) {
                    throw new Error("Carrito no encontrado.");
                }
    
                return nuevoCarro;
            }
    
        } catch (error) {
            console.log("Error al agregar el producto al carrito:", error.message);
            throw new Error("No se pudo agregar el producto al carrito. Verifique si el carrito existe.");
        }
    }


    async actualizarCantidadDeProductos(cartId, productId, quantity){
        try {
            const carritoActualizado = await CartModel.findByIdAndUpdate(
                {_id: cartId, "products.product": productId},
                {$set: {"products.$.quantity": quantity}},
                {new: true}
            );

            if(!carritoActualizado){
                throw new Error("carrito o producto no encontrado")
            }

            return carritoActualizado;
        } catch (error) {
            console.error("Hubo un error al actualizar la cantidad de producto");
            throw error;            
        }
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
            throw new Error ("no se pudo eliminar el producto del carrito. Verificar.")
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
            throw error
        }
    }
    
}


export default CartManager