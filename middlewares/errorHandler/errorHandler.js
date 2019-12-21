const { DEFAULT_ERROR_STATUS, DEFAULT_ERROR_DETAILS, DEFAULT_ERROR_MESSAGE } = require('../../config/errorHandler.js');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    if (!err.status) {
        res.status(DEFAULT_ERROR_STATUS);
    } else {
        res.status(err.status);
    }

    const errorDetails = err.details || DEFAULT_ERROR_DETAILS;
    const errorMessage = err.message || DEFAULT_ERROR_MESSAGE;

    console.error(
        `${res.statusCode} | ${req.method} | ${req.url} | API error occurred: ${errorMessage}, details: ${errorDetails}`
    );

    if (process.env.NODE_ENV === 'development') {
        res.json({
            success: false,
            message: err.message || err.name,
            details: errorDetails,
            error: err.status,
            stack: err.stack
        });
    } else {
        res.json({
            success: false,
            message: err.message || err.name
        });
    }
};

module.exports = errorHandler;
