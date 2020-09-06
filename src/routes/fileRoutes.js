const CreateError = require('../AppError/CreateError');

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

    try {
        const { message, statusCode } = await rotaExists(req);
        res.statusCode = statusCode || 201
        res.write(message);
        res.end();
    } catch(err) {
        if (err instanceof CreateError) {
            res.statusCode = err.statusCode;
            res.write(JSON.stringify(err.message));
            res.end()
        } else {
            const InterNalSeverError = {
                "error": "Internal Server error!"
            }
            res.statusCode = 500;
            res.write(JSON.stringify(InterNalSeverError))
            res.end()
            console.log(err)
        }
    }
    

} 

module.exports = fileRoutes;