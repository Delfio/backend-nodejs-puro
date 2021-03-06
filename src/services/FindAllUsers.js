const Database = require('../database');
const createError = require('../AppError/CreateError');

class FindAllUsersService {
    async Executar() {
        const allUsers = await Database('users').select('*');

        const ids = allUsers.map(elemento => String(elemento.id));
        
        if(ids.length > 0) {
            const allAvatar = await Database('user_avatar')
            .select('*')
            .whereIn('user_avatar.user_id', ids);

            const UserWithAvatar = allUsers.map(elemento => {
                const avatarOfUser = allAvatar.find(avatarFile => {
                    return avatarFile.user_id === elemento.id
                });                

                return {
                    ...elemento,
                    avatar: avatarOfUser ? {
                        id: avatarOfUser.id,
                        path: avatarOfUser.path
                    }: null
                }
            });


            return UserWithAvatar;

        }

        return {users:[]};
        
    }
}

module.exports = new FindAllUsersService();