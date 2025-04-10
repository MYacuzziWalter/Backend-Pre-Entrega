import { createHash, isValidPassword } from "../utils/util.js";
import userRepository from "../repositories/user.repository.js";

class UserService {
  async registerUser(userData) {
    const existeUsuario = await userRepository.getUserByEmail(userData.email);

    if (existeUsuario) throw new Error("El usuario ya existe");

    userData.password = createHash(userData.password);
    return await userRepository.createUser(userData);
  }

  async loginUser(email, password) {
    const user = await userRepository.getUserByEmail(email);
    
    if (!user) {
      throw new Error("El usuario no fue encontrado")
    }

    if (!isValidPassword(password, user)) {

      throw new Error("La contraseña es incorrecta");
    }
    
    return user
  }
   

}

export default new UserService();
