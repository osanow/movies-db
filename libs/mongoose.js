const mongoose = require('mongoose');
const { createServer } = require('../libs/httpServer');

const { MONGO_CONNECT, MONGO_CONNECT_TEST } = process.env;

const MONGO_OPTIONS = {
    connectTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 5,
    useNewUrlParser: true,
    useCreateIndex: true
    // useUnifiedTopology: true -> https://github.com/Automattic/mongoose/issues/8180
};

const connectWithRetry = app => {
    const connectionString = process.env.NODE_ENV === 'test' ? MONGO_CONNECT_TEST : MONGO_CONNECT;

    console.log('Connecting to the DB...');
    return mongoose.connect(connectionString, MONGO_OPTIONS, err => {
        if (err) {
            console.error('Retrying...');
            setTimeout(connectWithRetry, 5000);
        } else {
            createServer(app);
        }
    });
};

mongoose.connection.on('open', () => {
    console.log('Connected to the DB.');
});

mongoose.connection.on('error', error => {
    console.error('Could not connect to DB.');
    console.error('--------------');
    console.error(error);
    console.error('--------------');
});

mongoose.connectWithRetry = connectWithRetry;

module.exports = mongoose;
