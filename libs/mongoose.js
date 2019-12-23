const mongoose = require('mongoose');
const { MONGO_CONNECT, MONGO_CONNECT_TEST } = process.env;

const MONGO_OPTIONS = {
    connectTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 5,
    useNewUrlParser: true,
    useCreateIndex: true
    // useUnifiedTopology: true -> https://github.com/Automattic/mongoose/issues/8180
};

const connectWithRetry = () => {
    const connectionString = process.env.NODE_ENV === 'test' ? MONGO_CONNECT_TEST : MONGO_CONNECT;

    return mongoose.connect(connectionString, MONGO_OPTIONS, err => {
        if (err) {
            console.error('Retrying connection to the DB...');
            setTimeout(connectWithRetry, 5000);
        }
    });
};

mongoose.connection.on('error', error => {
    console.error('Could not connect to DB.');
    console.error('--------------');
    console.error(error);
    console.error('--------------');
});

connectWithRetry();
mongoose.connectWithRetry = connectWithRetry;

module.exports = mongoose;
