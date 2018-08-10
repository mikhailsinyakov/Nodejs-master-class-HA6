const http = require('http');
const url = require('url');
const config = require('./config');

const server = http.createServer((req, res) => {
    const urlObject = url.parse(req.url);
    const path = urlObject.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const chosenHandler = typeof router[trimmedPath] == 'function' ? router[trimmedPath] : handler.notFound;

    chosenHandler((statusCode, body) => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(body);
    });

    
});

server.listen(config.port, () => console.log(`Server is listening on port ${config.port} now`));

const handler = {
    hello: callback => {
        const welcomeObj = {
            message: 'Hello World!'
        };
        callback(200, JSON.stringify(welcomeObj));
    },
    notFound: callback => {
        const notFoundObj = {
            message: 'This route was not found'
        };
        callback(404, JSON.stringify(notFoundObj));
    }
};

const router = {
    hello: handler.hello
};