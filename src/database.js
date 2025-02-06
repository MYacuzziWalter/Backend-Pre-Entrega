import mongoose from "mongoose";
// import ProductModel from "./models/product.model.js";

mongoose.connect("mongodb+srv://walteryacuzzi:coderhouse@cluster0.ch9ys.mongodb.net/EntregaFinal?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Conexión exitosa, estas conectado al servidor"))
.catch((error) => console.log("Error", error));