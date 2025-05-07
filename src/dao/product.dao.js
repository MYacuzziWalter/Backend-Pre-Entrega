import ProductModel from "./models/product.model.js";

class ProductDao { 
    async create(productData) {
        return await ProductModel.create(productData);
    }

    async getById(id) {
        return await ProductModel.findById(id);
    }

    async getAll(queryOption, paginateOptions) {
        return await ProductModel.paginate(queryOption, paginateOptions);    
    }

    async updated(id, updateData) {
        return await ProductModel.findByIdAndUpdate(id, updateData, {new: true});
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }

    async findByCode(code) {
        return await ProductModel.findOne({ code });
    }
}


export default new ProductDao();