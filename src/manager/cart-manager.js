import { promises as fs } from "fs";

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultId = 0;

        //carto los carritos almacenados en el archivo
        this.cargarCarrito();
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

    async crearCarrito() {
        const nuevoCarrito = {
        id: ++this.ultId,
        products: []
        }
    
        this.carts.push(nuevoCarrito)

        // Guardamos el array en el archivo

        await this.guardarCarritos()
        return nuevoCarrito
    }

    async getCarritoById(cartId) {
        try {
            const carrito = this.carts.find(c => c.id === cartId);
    
            if(!carrito) {
                throw new Error("no existe un carrito con ese id")
            }

            return carrito;
            
        } catch (error) {
            throw new Error("Error al obtener el carrito");
        }
    }

    async agregarProductoAlCart(cartId, productId, quantity = 1){
        const carrito = await this.getCarritoById(cartId);
        
        //  Verifico si el producto ya existe en el carrito
        const existeProducto = carrito.products.find(p => p.product === productId)

        //si el PROD. ya esta agregado al carrito, le autmento la cantidad
        // si el prodcuto todavia no se agrego lo pushe
        if(existeProducto){
            existeProducto.quantity += quantity
        } else {
            carrito.products.push({product: productId, quantity});

        }

        await this.guardarCarritos();
        return carrito;

    }
    
}


export default CartManager