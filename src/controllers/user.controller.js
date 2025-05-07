import cartService from "../services/cart.service.js";
import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";

class UserController {
  async register(req, res) {
    const { first_name, last_name, email, age, password } = req.body;

    try {

      const newCart = await cartService.crearCarrito();

      const newUser = await userService.registerUser({
        first_name,
        last_name,
        email,
        age,
        password,
        cart: newCart._id
      });

      const token = jwt.sign(
        {
          usuario: `${newUser.first_name}`,
          email: newUser.email,
          rol: newUser.rol,
        },
        "coderhouse",
        { expiresIn: "2h" }
      );

      res.cookie("coderCookieToken", token, { httpOnly: true, maxAge: 360000 });
      res.redirect("/login");
    } catch (error) {
      
      res.status(500).send("Error interno del servidor al crear el usuario");
      
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userService.loginUser(email, password);

      
      console.log(user + "Este es el log del user");

      const token = jwt.sign(
        {
          nombre: user.first_name,
          apellido: user.last_name,
          email: user.email,
          rol: user.rol,
        },
        "coderhouse",
        { expiresIn: "2h" }
      );
      // console.log("Este es un log del token +" + token);

      res.cookie("coderCookieToken", token, { httpOnly: true, maxAge: 360000 });
      res.redirect("/api/session/current");
    } catch (error) {
      
      res.status(401).send({ error: error.message });
        
    }
  }

  async current(req, res) {
    if (req.user) {
      const user = req.user;
      res.render("profile", { user });
    } else {
      res.send("No estas autorizado");
    }
  }

  async logout(req, res) {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
  }
}

export default UserController;
