const Database = require('../database');
const createError = require('../AppError/CreateError');

class CreateUserService {
    async Executar({name, whatsapp, bio, email }) {
        const userExists = await Database('users')
            .select('id')
            .where('email', '=', email)
            .first()

        if (userExists) {
            throw new createError({
                message: 'E-mail já cadastrado',
                statusCode: 400,
            });
        }

        const novoUsuario = {
            name,
            whatsapp,
            bio,
            email
        };

        const [id] = await Database('users').insert(novoUsuario);

        return id;

    }
}

module.exports = new CreateUserService();