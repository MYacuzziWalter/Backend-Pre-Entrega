import productService from "../services/product.service.js";

class ProductController {
    async getAll(req, res) {
        try {
            const { limit, page, sort, query } = req.query;
            const productos = await productService.getProducts({ limit, page, sort, query }); 
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async getById(req, res) {
        const id = req.params.id;
        try {
            const product = await productService.getProductById(id);
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const nuevo = await productService.addProduct(req.body);
            res.status(201).json({ message: "Producto agregado", producto: nuevo });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        const data = req.body;
        const pid = req.params.pid;
        try {
            const actualizado = await productService.updateProduct(pid, data);
            res.status(200).json({ message: "Producto actualizado", producto: actualizado });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const pid = req.params.pid;
        try {
            await productService.deleteProduct(pid);
            res.json({ message: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}


export default new ProductController();