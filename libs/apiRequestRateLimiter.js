const rateLimit = require('express-rate-limit');
const mainConfig = require('../config/main');
const { TooManyRequestsError } = require('../tools/errors');

const { API_LIMITER_MAX_REQUESTS, API_LIMITER_REQUESTS_PERIOD } = process.env;

const apiRequestRateLimiter = rateLimit({
    windowMs: API_LIMITER_REQUESTS_PERIOD,
    max: API_LIMITER_MAX_REQUESTS,
    message: {
        success: false,
        error: new TooManyRequestsError().status,
        message: mainConfig.tooManyRequestsMessage
    }
});

module.exports = apiRequestRateLimiter;
