const { DEFAULT_ERROR_MESSAGE, DEFAULT_ERROR_STATUS, DEFAULT_ERROR_DETAILS } = require('../../config/errorHandler');
const errorHandler = require('./errorHandler');

describe('errorHandler', () => {
    let req;
    let res;
    let next;

    const initialConsole = global.console;
    const mockedConsole = {
        error: jest.fn()
    };

    beforeEach(() => {
        req = {};
        res = {
            statusCode: null,
            status(statusCode) {
                this.statusCode = statusCode;
            },
            json: jest.fn()
        };
        next = jest.fn();

        global.console = mockedConsole;
    });

    afterEach(() => {
        global.console = initialConsole;
    });

    it('should fallback to default response status', () => {
        jest.spyOn(res, 'status');
        const err = {};

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(DEFAULT_ERROR_STATUS);
    });

    it('should save given error response status', () => {
        jest.spyOn(res, 'status');
        const err = { status: 404 };

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should fallback to default details if not provided any', () => {
        const err = {};

        errorHandler(err, req, res, next);

        expect(mockedConsole.error).lastCalledWith(expect.stringContaining(DEFAULT_ERROR_DETAILS));
    });

    it('should fallback to default error message if not provided any', () => {
        const err = {};

        errorHandler(err, req, res, next);

        expect(mockedConsole.error).lastCalledWith(expect.stringContaining(DEFAULT_ERROR_MESSAGE));
    });

    it('should response with "success: false" and error message', () => {
        const err = { message: 'some error message' };

        errorHandler(err, req, res, next);

        expect(res.json).lastCalledWith({ success: false, message: err.message });
    });

    it('should not include error details & status & stack in response', () => {
        const err = { status: 404, message: 'some error message', details: 'details', stack: 'stack' };

        errorHandler(err, req, res, next);

        expect(res.json).not.lastCalledWith(expect.objectContaining({ details: err.details }));
        expect(res.json).not.lastCalledWith(expect.objectContaining({ error: err.status }));
        expect(res.json).not.lastCalledWith(expect.objectContaining({ stack: err.stack }));
    });

    describe('in development environment', () => {
        const initialNodeEnv = process.env.NODE_ENV;

        beforeEach(() => {
            process.env.NODE_ENV = 'development';
        });

        afterEach(() => {
            process.env.NODE_ENV = initialNodeEnv;
        });

        it('should include error details & status & stack in response', () => {
            const err = { status: 404, message: 'some error message', details: 'details', stack: 'stack' };

            errorHandler(err, req, res, next);

            expect(res.json).lastCalledWith(expect.objectContaining({ details: err.details }));
            expect(res.json).lastCalledWith(expect.objectContaining({ error: err.status }));
            expect(res.json).lastCalledWith(expect.objectContaining({ stack: err.stack }));
        });
    });

    [
        { name: 'error status code', value: '404' },
        { name: 'request method', value: 'get' },
        { name: 'request url', value: '/test-url' },
        { name: 'error message', value: 'some error message' },
        { name: 'error details', value: 'some error details' }
    ].forEach(data => {
        it(`should log "${data.name}" to console`, () => {
            const err = {
                status: 404,
                message: 'some error message',
                details: 'some error details'
            };

            req.method = 'get';
            req.url = '/test-url';
            res.statusCode = 404;

            errorHandler(err, req, res, next);

            expect(mockedConsole.error).lastCalledWith(expect.stringContaining(data.value));
        });
    });
});
