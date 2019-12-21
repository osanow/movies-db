require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { connectWithRetry } = require('./libs/mongoose/mongoose');
const { errorHandler } = require('./middlewares/errorHandler');
const { allowContentType } = require('./tools/allowContentType');
const { NotFoundError } = require('./tools/errors');

const app = express();

app.use(cors());
app.use(allowContentType('json'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes'));

app.use((req, res, next) => {
    next(new NotFoundError('', 'Express ran out of middlewares.'));
});

app.use(errorHandler);

connectWithRetry(app);
