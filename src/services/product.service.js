import productRepository from "../repositories/product.repository.js";

class ProductService {
    async addProduct(productData) {
        const { code } = productData;
        const exists = await productRepository.findProductByCode(code);
        if (exists) throw new Error("El código del producto ya existe");

        return await productRepository.createProduct({...productData, status: true});
    }

    async getProductById(id) {
        const product = await productRepository.getProductById(id);
        if (!product) throw new Error("Producto no encontrado");
        return product;
    }

    async getProducts({ limit = 10, page = 1, sort, query}) {
        const queryOptions = query ? { category: query } : {};
        const sortOptions = sort === "asc" ? { price: 1 } : sort === "desc" ? {price: -1} : {};

        return await productRepository.getProducts(queryOptions, {
            limit,
            page, 
            sort: sortOptions,
        });
    }

    async updateProduct(id, data) {
        return await productRepository.updateProduct(id, data);
    }

    async deleteProduct(id) {
        return await productRepository.deleteProduct(id);
    }
}


export default new ProductService();