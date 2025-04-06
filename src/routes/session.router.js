import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/util.js";
import userModel from "../dao/models/users.model.js";
import CartManager from "../manager/cart-manager.js";
import UserControllers from "./controllers/user.controller.js"
const router = Router();
const manager = new CartManager()
const userController = new UserController();



router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", passport.authenticate("jwt",{session: false}), userController.current);
router.post("/logout", current.logout);



router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(401).send({error: "Usuario no encontrado"});
        }
        
        if(!isValidPassword(password, user)) {
            return res.status(401).send({error: "La contraseña es incorrecta"})
        }

        const token = jwt.sign({email: user.email, rol: user.rol }, "coderhouse", {expiresIn: "2h"});
        
        res.cookie("coderCookieToken", token, {httpOnly: true, maxAge: 4000});
        res.redirect("/api/session/current");


    } catch (error) {
        console.error("Error al registrar el usuario " + error);
        res.status(500).json({error: "Error interno del servidor"})
    }
})


router.post("/register", async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body

        const userExist = await userModel.findOne({email});
        if(userExist) {
            return res.status(400).send({error: "El email ya esta registrado"})
        }


        const nuevoCarrito = await manager.crearCarrito()
        
        

        const user = new userModel({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: nuevoCarrito._id
            
            
        })
        
        await user.save()
        res.redirect("/login");

    } catch (error) {
        console.error("Error al registrar el usuario " + error);
        res.status(500).json({error: "Error interno del servidor al crear el usuario"})
    }
})

router.get("/current", passport.authenticate("current", {session: false}) ,(req, res) => {
    if(req.user.email) {
        res.render("profile", {email: req.user.email})
    } else {
        res.send("Algo salio mal, no estas logueado")
    }
} )



router.post("/logout", (req, res) => {
    res.clearCookie("cooderCookieToken");
    res.redirect("/login");
})






export default router;