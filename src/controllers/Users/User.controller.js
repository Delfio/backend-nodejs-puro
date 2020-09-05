const Database = require('../../database');
const createUserService = require('../../services/CreateUserService');
const allUsersServide = require('../../services/FindAllUsers');

const AppError = require('../../AppError/CreateError');

class UserController {
    constructor() {
        this.database = Database;
    }
    async get(req) {
        const allUsers = await allUsersServide.Executar();
        return {
            statusCode: 200,
            message: JSON.stringify(allUsers)
        }
    }

    async create(req) {
        const {name, bio, email, whatsapp} = req.body;
        const id = await createUserService.Executar({
            name,
            bio,
            email,
            whatsapp
        });

        const user = {
            id,
            name,
            bio,
            email,
            whatsapp
        };

        console.log(user);


        return {
            statusCode: 200,
            message: JSON.stringify({ok: true})
        }
    }
}

module.exports = new UserController();