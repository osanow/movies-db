const { InvalidContentTypeError } = require('../errors');

const allowContentType = type => (req, res, next) => {
    if (req.method === 'GET') {
        return next();
    }

    return req.is(type)
        ? next()
        : next(new InvalidContentTypeError(`Invalid content-type: ${req.get('content-type')}`));
};

module.exports = allowContentType;
