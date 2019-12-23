const mongoose = require('mongoose');

const { MONGO_CONNECT } = process.env;

const MONGO_OPTIONS = {
    connectTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 5,
    useNewUrlParser: true,
    useCreateIndex: true
    // useUnifiedTopology: true -> https://github.com/Automattic/mongoose/issues/8180
};

const connectWithRetry = () => {
    console.log('Connecting to the DB...');
    return mongoose.connect(MONGO_CONNECT, MONGO_OPTIONS, err => {
        if (err) {
            console.error('Retrying...');
            setTimeout(connectWithRetry, 5000);
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

connectWithRetry();
mongoose.connectWithRetry = connectWithRetry;

module.exports = mongoose;
