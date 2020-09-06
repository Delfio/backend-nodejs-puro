const CreateUserAvatarService = require('../services/CreateUserAvatarService');
const SaveAndProcessFileService = require('../services/SaveAndProcessFileService');
const Form = require('formidable');

class AvatarController {
    async create(req) {
        const form = new Form.IncomingForm()
        const {user_id} = req;
        await form.parse(req, async (err, fields, {file}) => {
            if (err) {
                throw new Error('Erro ao processar imagem');
            }
            const { name, path, type } = file;

            const newPath = await SaveAndProcessFileService.Executar({
                path,
                name
            });

            await CreateUserAvatarService.Executar({
                user_id,
                path: newPath
            });
        });

        return {
            message: '',
            statusCode: 204
        }

    }   
}

module.exports = new AvatarController();