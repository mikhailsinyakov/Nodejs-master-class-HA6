/*
 * This is primary file
 * 
 */

// Dependencies
const http = require('http');
const url = require('url');
const config = require('./config');
const cluster = require('cluster');
const os = require('os');

// Create a new HTTP server
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

// If this is a master cluster, for each cpu on the system, spawn a new worker process
if (cluster.isMaster) {
    const countCPU = os.cpus().length;
    for (let i = 0; i < countCPU; i++) {
        cluster.fork();
    }
}
// If this is a worker process, starts the server listening for connections
else {
    server.listen(config.port, () => console.log(`Server is listening on port ${config.port} now`));
}

// Handle incoming requests
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


// Redirect incoming requests to handlers
const router = {
    hello: handler.hello
};