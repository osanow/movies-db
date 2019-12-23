require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRequestBodySizeLimiter = require('./libs/apiRequestBodySizeLimiter');
const apiRequestRateLimiter = require('./libs/apiRequestRateLimiter');
const { errorHandler } = require('./middlewares/errorHandler');
const { allowContentType } = require('./tools/allowContentType');
const { NotFoundError } = require('./tools/errors');
const { createServer } = require('./libs/httpServer');
const mainConfig = require('./config/main');

const { PORT } = process.env;

const app = express();

app.set('trust proxy', 1);
app.set('port', PORT);
app.use(cors());
app.use(allowContentType('json'));
app.use(apiRequestBodySizeLimiter);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', apiRequestRateLimiter, require('./routes'));

app.use((req, res, next) => {
    next(new NotFoundError(null, mainConfig.runOutOfMiddlewaresDetails));
});

app.use(errorHandler);

module.exports = createServer(app);
