require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { errorHandler } = require('./middlewares/errorHandler');
const { NotFoundError } = require('./tools/errors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res) => res.send('TEST'));

app.use((req, res, next) => {
    next(new NotFoundError('', 'Express ran out of middlewares.'));
});

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}.`));
