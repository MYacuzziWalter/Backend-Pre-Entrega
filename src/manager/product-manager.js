import ProductModel from "../models/product.model.js"
class productManager {
  // static ultId = 0 ;
  // constructor(path) {
  //     this.products = [];
  //     this.path = path;

  // }

  async addProduct({
    title,
    description,
    price,
    img,
    code,
    stock,
    category,
    thumbnails,
  }) {
    try {
        if (!title || !description || !price ||  !code || !stock || !category) {
          console.log("Todos los campos son obligatorios");
          return;
        }

        const existeProducto = await ProductModel.findOne({code: code})

        if(existeProducto) {
            console.log("El código debe ser único");
            return;
            
        }

        const nuevoProducto = new ProductModel({
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status: true,
            thumbnails: thumbnails || [],
        })

        await nuevoProducto.save();
        console.log("Producto agregado con exito");
        return nuevoProducto;
        

    } catch (error) {

        console.error("Error al cargar el producto", error.message);
        throw new Error(`Algo salió mal al cargar el producto: ${error.message}`)
        
    } 
  }
    
  

  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
        const skip = (page - 1) * limit;

        let queryOptions = {};

        if (query) {
            queryOptions = { category: query };
        }

        const sortOptions = {};
        if (sort) {
            if (sort === 'asc' || sort === 'desc') {
                sortOptions.price = sort === 'asc' ? 1 : -1;
            }
        }

        const productos = await ProductModel
            .find(queryOptions)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const totalProducts = await ProductModel.countDocuments(queryOptions);

        const totalPages = Math.ceil(totalProducts / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        return {
            docs: productos,
            totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
            nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
        };
    } catch (error) {
        console.log("Error al obtener los productos", error);
        throw error;
    }
}
  
        



  async getProductById(id){
    try {
      const producto = await ProductModel.findById(id)
      
      if (!producto) {
        console.log("Producto no encontrado");
        return null
      } 

      console.log("Producto encontrado");
      return producto;


    } catch (error) {
      console.error("Algo salio mal al traer un producto por su id");
      throw error;
    }
  
  }



  // async guardarArchivo(arrayProductos) {
  //   try {
  //     await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
  //   } catch (error) {
  //     console.log("Error al guardar el archivo");
  //   }
  // }

  async leerArchivo() {
    try {
      let respuesta = await fs.readFile(this.path, "utf-8");
      let arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("");
    }
  }

  async actualizarProducto(id, datosActulizados) {
    try {
      const actualizarProducto = await ProductModel.findByIdAndUpdate(id, datosActulizados);
  
      if (!actualizarProducto){
        console.log("No se encuentra el producto");
        return null
      }
  
      console.log("Producto actualizado con exito");
      return actualizarProducto;
      
    } catch (error) {
      console.error("Algo salio mal al actualizar el producto", error);
      
    }
  }

  async borrarProductoById(pid) {
    try {

      const productoBorrado = await ProductModel.findByIdAndDelete(pid);
      
      if(!productoBorrado){
        console.log("No se encuentra el producto que quiere eliminar");
        return null      
      }
  
      console.log("Producto eliminado correctamente");
      
    } catch (error) {
      console.error("Algo salio mal al intentar eliminar el producto");
      throw error;
    }
  }
}

export default productManager;
