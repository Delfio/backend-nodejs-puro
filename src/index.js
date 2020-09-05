require('./database');
const http = require('http');
const routes = require('./routes');

const hostname = 'localhost';
const port = 3333;

const server = http.createServer(async (req, res) => {
    await req.on('data', data => {
        req.body = JSON.parse(data);
    })
    res.setHeader('Content-Type', 'text/json');
    routes(req, res)
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})