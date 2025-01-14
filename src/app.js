import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productManager from "./manager/product-manager.js";


const app = express()
const PUERTO = 8080;
const manager = new productManager("./src/data/productos.json");

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"))


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");





//  RUTAS
app.get("/", (req, res) => {
    res.send("Trabajo 1 - Pre Entrega - Yacuzzi Walter")
})


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);



const serverHttp = app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto: ${PUERTO}`);
    
})


//socket
const io = new Server(serverHttp);


io.on("connection", async (socket) => {
    console.log("alguien se ah conectado");
    socket.emit("productos", await manager.getProduct());


    socket.on("agregarProducto", async (producto) => {
        await manager.addProduct(producto);
        io.sockets.emit("productos", await manager.getProduct());
    })

    socket.on("eliminarProducto", async (id) => {
        await manager.borrarProductoById(id);
        io.sockets.emit("productos", await manager.getProduct());          
    })


})