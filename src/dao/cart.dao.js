import CartModel from "./models/cart.model.js";

class CartDao {
    async createCart() {
        return await CartModel.create({products: []});
    }

    async getCartById(cartId) {
        return await CartModel.findById(cartId);
    }

    async save(cart) {
        return await cart.save();
    }

    async updateCart(cartId, updateData) {
        return await CartModel.findByIdAndUpdate(cartId,updateData, {new: true})
    }
    
    async deleteProduct(cartId, productId) {
        return await CartModel.findByIdAndUpdate(
            cartId,
            {$pull: {products: {product: productId}}},
            {new: true}
        );
    }

}



export default new CartDao();