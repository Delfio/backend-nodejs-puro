const CreateUserAvatarService = require('../services/CreateUserAvatarService');

class AvatarController {
    async create(req) {
        console.log(req.user_id)
    }   
}

module.exports = new AvatarController();