const Joi = require('@hapi/joi');
const { BadRequestError } = require('../errors');

/**
 * Check if body is valid.
 * @param {object} body The object to test
 * @param {object} validator Compiled validator to use for validation
 */
async function validate(body, validator) {
    try {
        await validator.validateAsync(body, { presence: 'required' });
    } catch (err) {
        return err;
    }
}

/**
 * Compile a Joi schema from an object description.
 * @param {Joi => object} factoryFn A function that builds a schema with a Joi library.
 */
function compileValidator(factoryFn) {
    return factoryFn(Joi);
}

/**
 * Returns a middleware that validates request body before next-ing.
 * @param {Joi => object} objectFactoryFn A function that builds a schema with a Joi library.
 */
function bodyValidator(objectFactoryFn) {
    const validator = compileValidator(objectFactoryFn);

    return async (req, res, next) => {
        const error = await validate(req.body, validator);

        if (error) {
            const errorDetails = error && error.details && JSON.stringify(error.details.map(x => x.message));

            next(new BadRequestError('The request is malformed', errorDetails));
        } else {
            next();
        }
    };
}

module.exports = bodyValidator;
