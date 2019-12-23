class ExtendableError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
    }
}

function genericErrorFactory(defaultMessage, statusCode) {
    return class extends ExtendableError {
        constructor(message, details) {
            super(message || defaultMessage);
            this.status = statusCode;
            this.details = details;
        }
    };
}

const builtDefinitions = {
    ExtendableError
};

const errorTypes = [
    ['NotFoundError', 404, 'Not Found'],
    ['BadRequestError', 400, 'Bad Request'],
    ['InvalidContentTypeError', 415, 'Invalid Content Type'],
    ['ExternalServiceUnavailableError', 503, 'External Service Unavailable'],
    ['ExistentError', 409, 'Already Exists'],
    ['TooManyRequestsError', 429, 'Too Many Requests']
];

errorTypes.forEach(([typeName, code, name]) => {
    builtDefinitions[typeName] = genericErrorFactory(name, code);
});

module.exports = builtDefinitions;
