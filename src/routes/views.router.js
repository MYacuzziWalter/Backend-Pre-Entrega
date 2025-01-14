import { Router } from "express";
const router = Router();

import productManager from "../manager/product-manager.js";
const manager = new productManager("./src/data/productos.json");



router.get("/products", async (req, res) => {
    // hacer un try catch
    const productos = await manager.getProduct();
    res.render("home", {productos});
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})


export default router;