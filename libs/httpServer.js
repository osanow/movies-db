const http = require('http');

const { PORT } = process.env;

const createServer = app => {
    const server = http.createServer(app);

    server.listen(PORT);

    server.on('error', onError);
    server.on('listening', onListening);

    function onError(error) {
        switch (error.code) {
            case 'EADDRINUSE':
                console.error(PORT + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening() {
        console.log('Listening on ' + server.address().port);
    }

    return app;
};

module.exports = { createServer };
