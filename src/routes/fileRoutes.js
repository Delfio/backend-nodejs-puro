const formidable = require('formidable');
const fs = require('fs')

const AvatarController = require('../controllers/Avatar.controller');

const rotasDeUploads = {
    "user/": AvatarController.create
}

async function fileRoutes(req, res) {
    const [_, prefix, entity, id] = req.url.split('/');
    const rotaExists = rotasDeUploads[entity + '/'];
    if (!rotaExists) {
        res.statusCode = 404;
        res.write('{"error": "page not found"}');
        res.end();

        return;
    };

    req.user_id = id;

    rotaExists(req);
    

} 

module.exports = fileRoutes;