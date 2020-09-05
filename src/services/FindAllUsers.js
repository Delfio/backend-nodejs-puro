const Database = require('../database');
const createError = require('../AppError/CreateError');

class FindAllUsersService {
    async Executar() {
        const allUsers = await Database('users').select('*');

        const ids = allUsers.map(elemento => elemento.id);
        
        if(ids.length > 0) {
            const allAvatar = await Database('user_avatar')
            .select('*')
            .whereIn(ids);

            const UserWithAvatar = allUsers.map(elemento => {
                const avatarOfUser = allAvatar.find(avatarFile => avatarFile.user_id === elemento.user_id);

                return {
                    ...elemento,
                    avatar: avatarOfUser
                }
            });

            return UserWithAvatar;

        }

        return {users:[]};
        
    }
}

module.exports = new FindAllUsersService();