import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";


class UserController {
    async register (req, res) {
        const {first_name, last_name, email, age, password} = req.body;

        try {
            const newUser = await userService.registerUser({first_name, last_name, email, age, password});    

            const token = jwt.sign({
                usuario: `${newUser.first_name}`,
                email: newUser.email,
                rol: newUser.rol
            }, "coderhouse", {expiresIn: "2h"});

            res.cookie("coderCookieToken", token, {httpOnly: true, maxAge: 360000});
            res.redirect("/login");
        } catch (error) {
            res.status(500).send( "Error interno del servidor al crear el usuario")
        }
    }

    async login(req, res) {
        const {email, password} = req.body;

        const user = await userService.loginUser(email, password);

        const token = jwt.sign({
            usuario: `${user.first_name}`,
            email: user.email,
            rol: user.rol
        }, "coderhouse", {expiresIn: "2h"});

        res.cookie("coderCookieToken", token, {httpOnly: true, maxAge: 360000});
        res.redirect("/api/session/current");


        try {
            
        } catch (error) {
            
        }

    }

    async current(req, res) {

    }

    async logout(req, res) {

    }
}

export default UserController;