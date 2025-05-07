import productDao from "../dao/product.dao.js";

class ProductRepository {
    createProduct(data) {
        return productDao.create(data);
    }

    getProductById(id) {
        return productDao.getById(id);
    }

    getProducts(queryOptions, paginateOptions) {
        return productDao.getAll(queryOptions, paginateOptions);
    }

    updateProduct(id, updateData) {
        return productDao.updated(id, updateData);
    }

    deleteProduct(id) {
        return productDao.delete(id);
    }

    findProductByCode(code) {
        return productDao.findByCode(code);
    }
}


export default new ProductRepository();