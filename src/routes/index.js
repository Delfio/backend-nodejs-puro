const UsersController = require('../controllers/Users/User.controller');
const CreateError = require('../AppError/CreateError');

const rotasGet = {
    "/users": UsersController.get
}

const rotasPost = {
    "/users": UsersController.create
}

const GetRoutes = async (req, res) => {
    try {
        const rotaExists = rotasGet[req.url];

        if(rotaExists) {
            const { statusCode, message } = await rotaExists(req);
            res.statusCode = statusCode || 200;
            res.write(message);
            res.end();
            return;
        }
    
        res.statusCode = 404;
        res.write('{"error": "page not found"}');
        res.end();
        return;
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

const PostRoutes = async (req, res) => {
    const rotaExists = rotasPost[req.url];

    if(rotaExists) {
        const { statusCode, message } = await rotaExists(req);
        res.statusCode = statusCode || 200;
        res.write(message);
        res.end();
        return;
    }

    res.statusCode = 404;
    const feedBackError = {
        error: `${req.url} not found`
    }
    res.write(JSON.stringify(feedBackError));
    res.end();
    return;
}


const routes = (req, res) => {
    switch (req.method) {
        case "GET":
            return GetRoutes(req, res);

        case "POST":
            return PostRoutes(req, res);

        default:
            break;
    }
}

module.exports = routes;