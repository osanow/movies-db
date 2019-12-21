require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { NotFoundError } = require('./tools/errors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res) => res.send('TEST'));

app.use((req, res, next) => {
    next(new NotFoundError('', 'Express ran out of middlewares.'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send(err.message || 'Unexpected error occurred, please try again later.');
});

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}.`));
