import productService from "../services/product.service.js";
import cartService from "../services/cart.service.js";

export const renderProductsViews = async (req, res) => {
    try {
        const { page = 1, limit = 4 } = req.query;
        const productos = await productService.getProducts({
            page: parseInt(page),
            limit: parseInt(limit)
        });

        const nuevoArray = productos.docs.map(producto => producto.toObject());

        res.render("products", {
            productos: nuevoArray,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            currentPage: productos.page,
            totalPages: productos.totalPages
        });

    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: "error",
            error: "Error interno del servidor"
        });
    }
};

export const renderProductDetailView = async (req, res) => {
    const productId = req.params.pid;

    try {
        const product = await productService.getProductById(productId);
        if(!product) {
            return res.status(400).render("Error", {message: "Producto no encontrado"});
        }

        const productoEncontrado = product.toObject ? product.toObject() : product;

        res.render("detailProducts", { product: productoEncontrado });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }  
};

export const renderCartView = async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await cartService.getCarritoById(cartId);

        if(!carrito) {
            return res.status(400).json({ message: "Carrito no encontrado" });
        }

        const productoEnCarrito = carrito.products.map(item => ({
            product: item.product.toObject(),
            quantity: item.quantity
        }));

        res.render("carts", { productos: productoEnCarrito });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const renderLoginView = (req, res) => {
    res.render("login");
};

export const renderRegisterView = (req, res) => {
    res.render("register");
};