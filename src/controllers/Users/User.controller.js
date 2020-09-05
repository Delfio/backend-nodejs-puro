const Database = require('../../database');

class UserController {
    constructor() {
        this.database = Database;
    }
    async get(req) {
        const allUser = await Database('users').select('*');
        const message = {
            users: allUser
        }
        return {
            statusCode: 200,
            message: JSON.stringify(message)
        }
    }

    async post(nome, idade, sexo) {
        const query = `INSERT INTO user(name, old, sex) values(
            '${nome}', ${idade}, '${sexo}'
        )`
        
        
        Database.select(query, (err, res) => {
            console.log(err, res)
        })
    }
}

module.exports = new UserController();