import express from "express";
import "./database.js";
import initializatePassport from "./config/passport.config.js";
import { engine } from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js"
import passport from "passport";
import cookieParser from "cookie-parser";



// import { Server } from "socket.io";
// import multer from "multer";


const app = express();
const PUERTO = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"))
app.use(cookieParser())
app.use(passport.initialize());
initializatePassport();


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//  RUTAS
app.get("/", (req, res) => {
    res.redirect("/products")
})


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/session", sessionRouter)
app.use("/", viewsRouter);



app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto: ${PUERTO}`);
  })


//socket
// const io = new Server(serverHttp);


// io.on("connection", async (socket) => {
//     console.log("alguien se ah conectado");
//     socket.emit("productos", await manager.getProduct());


//     socket.on("agregarProducto", async (producto) => {
//         await manager.addProduct(producto);
//         io.sockets.emit("productos", await manager.getProduct());
//     })

//     socket.on("eliminarProducto", async (id) => {
//         await manager.borrarProductoById(id);
//         io.sockets.emit("productos", await manager.getProduct());          
//     })
// })