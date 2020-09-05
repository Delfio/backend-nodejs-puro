const http = require('http');
const routes = require('./routes');
require('./database');

const hostname = 'localhost';
const port = 3333;

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/json');
    routes(req, res)
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})