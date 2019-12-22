const { BadRequestError } = require('../errors');

const requireOneOfBodyParams = params => (req, res, next) => {
    const requiredParam = params.find(param => {
        const requiredParamIndex = Object.keys(req.body).findIndex(
            bodyParam => bodyParam.toLowerCase() === param.toLowerCase()
        );

        return requiredParamIndex !== -1;
    });

    if (!requiredParam && params.length !== 0) {
        throw new BadRequestError('One of the required body params missing.');
    } else {
        next();
    }
};

module.exports = requireOneOfBodyParams;
