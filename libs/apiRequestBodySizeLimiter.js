const bodyParser = require('body-parser');

const { API_REQUEST_BODY_SIZE_LIMITER_BODY_SIZE } = process.env;

const apiRequestBodySizeLimiter = bodyParser.json({ limit: API_REQUEST_BODY_SIZE_LIMITER_BODY_SIZE });

module.exports = apiRequestBodySizeLimiter;
