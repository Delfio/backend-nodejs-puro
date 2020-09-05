const Database = require('../database');
const createError = require('../AppError/CreateError');


class CreateUserService {
    async Executar({name, whatsapp, bio, email }) {
        const userExists = await Database('users')
            .select('id')
            .where('email', '=', email)
            .first()

        if (userExists) {
            const newError = new createError({
                message: 'E-mail já cadastrado',
                statusCode: 400,
            });

            throw newError;
        }

        const novoUsuario = {
            name,
            avatar,
            whatsapp,
            bio,
            email
        };

        const [id] = await Database('users').insert(novoUsuario);

        return id;
    }
}

module.exports = new CreateUserService();