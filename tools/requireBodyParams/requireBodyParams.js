const { BadRequestError } = require('../errors');

const requireBodyParams = params => (req, res, next) => {
    params.forEach(param => {
        const requiredParamIndex = Object.keys(req.body).findIndex(
            bodyParam => bodyParam.toLowerCase() === param.toLowerCase()
        );

        const found = requiredParamIndex !== -1;

        if (!found) {
            throw new BadRequestError(`Missing parameter ${param} in request body.`);
        }
    });

    next();
};

module.exports = requireBodyParams;
