import { promises as fs } from "fs";


class productManager {
    static ultId = 0 ;
    constructor(path) {
        this.products = [];
        this.path = path; 
        
    }

    async addProduct({title, description, price, img, code, stock}) {

        const arrayProductos = await this.leerArchivo();

        //validar que no se repita y que todos los campos sean obligatorio
        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        } 

        // validara que el code sea unico
        if(arrayProductos.some(product => product.code === code)) {
            console.log("El codigo deber ser unico");
            return
        }

        const nuevoProducto = {
            id: ++productManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }
        
        arrayProductos.push(nuevoProducto);

        await this.guardarArchivo(arrayProductos);
    }

    async getProduct() {
        let arrayProductos = await this.leerArchivo();
        return arrayProductos;
    }

    async getProductById(id) {
        let arrayProductos = await this.leerArchivo() 
        let producto = arrayProductos.find(item => item.id === id);

        if(!producto) {
            return "Not Found";
        } else {
            return producto;
            
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path,JSON.stringify(arrayProductos, null, 2))
        } catch (error) {
            console.log("Error al guardar el archivo");
            
        }
    }

    async leerArchivo() {
        try {
            let respuesta = await fs.readFile(this.path, "utf-8");
            let arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("Algo salió mal al intentar leer el archivo");
            
        }

    }

    async actualizarProducto(id, datosActulizados) {
        const arrayProductos = await this.leerArchivo();

        const index = arrayProductos.findIndex(product => product.id === id);

        if(index === -1) {
            throw new Error(`No se encontro un producto con el id ${id}`);
        }

        if(datosActulizados.id) {
            throw new Error("No esta permitido actualizar el id de un producto")
        }

        arrayProductos[index] = {
            ...arrayProductos[index],
            ...datosActulizados
        }

        await this.guardarArchivo(arrayProductos);

        return arrayProductos[index];
    }

    async borrarProductoById(pid) {
        const arrayProductos = await this.leerArchivo();
        const index = arrayProductos.findIndex(product => product.id === pid);

        if(index === -1) {
            throw new Error(`No se encontro un producto con el id ${pid}`);
        }

        arrayProductos.splice(index, 1);

        await this.guardarArchivo(arrayProductos);
        
        return `Producto ${pid} borrado correctamente`

    }
}

export default productManager;