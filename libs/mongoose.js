const mongoose = require('mongoose');

const { PORT, MONGO_CONNECT } = process.env;

const MONGO_OPTIONS = {
    connectTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 5,
    useNewUrlParser: true,
    useCreateIndex: true
    // useUnifiedTopology: true -> https://github.com/Automattic/mongoose/issues/8180
};

const connectWithRetry = app => {
    console.log('Connecting to the DB...');
    return mongoose.connect(MONGO_CONNECT, MONGO_OPTIONS, err => {
        if (err) {
            console.error('Retrying...');
            setTimeout(() => connectWithRetry(app), 5000);
        } else {
            app.listen(PORT, () => console.log(`---- App listening on port ${PORT}. ----`));
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

module.exports = { connectWithRetry };
