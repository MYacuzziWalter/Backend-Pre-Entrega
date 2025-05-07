import cartDao from "../dao/cart.dao.js";

class CartRepository {



  async createCart() {
    return await cartDao.createCart();
  }

  async getCartById(cartId) {
    
      return await cartDao.getCartById(cartId);
    
  }

  async save(cart) {
    return await cartDao.save(cart);
  }

  async updateCart(cartId, data) {
    return await cartDao.updateCart(cartId, data);
  }

  async deleteProduct(cartId, productId){
    return await cartDao.deleteProduct(cartId, productId);
  }
}


export default new CartRepository();
