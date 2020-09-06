const Database = require('../database');
const CreateError = require('../AppError/CreateError');

class CreateUserAvatarService {
    async Executar({user_id, path}){

        const userExists = await Database('users')
            .select('id')
            .where('id', '=', user_id)
            .first()

        if(!userExists) {
            throw new CreateError({
                message: 'Usuário inválido',
                statusCode: 406
            });
        }

        const avatarUserExists = await Database('user_avatar')
            .select('path')
            .where('user_id', '=', user_id)
            .first();
        
        const Image = {
            path,
            user_id
        }

        if (avatarUserExists) {
            await Database('user_avatar')
                .update('path', path)
        } else {
            await Database('user_avatar')
                .insert(Image);

        }

        return Image;
    }
}

module.exports = new CreateUserAvatarService();