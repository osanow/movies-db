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

const errorTypes = [['NotFoundError', 404, 'Not Found']];

errorTypes.forEach(([typeName, code, name]) => {
    builtDefinitions[typeName] = genericErrorFactory(name, code);
});

module.exports = builtDefinitions;
