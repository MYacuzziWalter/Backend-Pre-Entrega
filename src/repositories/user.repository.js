import UserDao from "../dao/user.dao.js"


class UserRepository {
    async createUser(userData) {
        return await UserDao.save(userData);
    }

    async getUserById(id) {
        return await UserDao.findById(id)
    }

    async GetUserByEmail(email) {
        return await UserDao.FindOne({email})
    }

    async 
}


export default new UserRepository();