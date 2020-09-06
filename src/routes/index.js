const fileRoutes = require('./fileRoutes');
const crudRoutes = require('./crudRoutes');

const routes = (req, res) => {
    if(req.url.includes('/upload')) {
        fileRoutes(req, res);
    } else {
        crudRoutes(req, res);
    }
}

module.exports = routes;