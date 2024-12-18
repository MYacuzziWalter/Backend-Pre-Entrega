import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";


const app = express()
const PUERTO = 8080;


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//!  RUTAS
app.get("/", (req, res) => {
    res.send("Trabajo 1 - Pre Entrega - Yacuzzi Walter")
})


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter)


// Poner a escuchar el Server
app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto: ${PUERTO}`);
    
})