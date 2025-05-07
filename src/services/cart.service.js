import cartRepository from "../repositories/cart.repository.js";

class CartService {
  async crearCarrito() {
    return await cartRepository.createCart();
  }

  async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
    const cart = await cartRepository.getCartById(cartId);

    const existeProducto = cart.products.find((product) =>
      product.product.equals(productId)
    );
    if (existeProducto) {
      existeProducto.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    cart.markModified("products");
    return await cartRepository.save(cart);
  }


  async actualizarCantidadDeProductos(cartId, productId, newQuantity) {
    const cart = await cartRepository.getCartById(cartId);
    const producto = cart.products.find((p) => p.product.equals(productId));

    if (!producto) throw new Error("Producto no encontrado en el carrito");

    producto.quantity = newQuantity;
    cart.markModified("products");

    return await cartRepository.save(cart);
  }



  async actualizarCarrito(cartId, nuevosProductos) {
    const cart = await cartRepository.getCartById(cartId);
    cart.products = nuevosProductos.map((product) => ({
      product: product.product,
      quantity: product.quantity,
    }));
    cart.markModified("products");
    return await cartRepository.save(cart);
  }



  async getCarritoById(cartId) {
    const cart = await cartRepository.getCartById(cartId);
    if (!cart) {
      throw new Error("El carrito no fu encontrado");
    }
    return cart;
  }


  async vaciarCarrito(cartId) {
    return await cartRepository.updateCart(cartId, {products: [] });
  }

  async eliminarProductoDelCarrito(cartId, productId) {
    return await cartRepository.deleteProduct(cartId, productId);
  }
}

export default new CartService();
