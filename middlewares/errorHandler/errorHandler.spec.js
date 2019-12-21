const { DEFAULT_ERROR_MESSAGE, DEFAULT_ERROR_STATUS, DEFAULT_ERROR_DETAILS } = require('../../config/errorHandler');
const errorHandler = require('./errorHandler');

describe('errorHandler', () => {
    let mockedReq;
    let mockedRes;
    let mockedNext;

    const initialConsole = global.console;
    const mockedConsole = {
        error: jest.fn()
    };

    beforeEach(() => {
        mockedReq = {};
        mockedRes = {
            statusCode: null,
            status(statusCode) {
                this.statusCode = statusCode;
            },
            json: jest.fn()
        };
        mockedNext = {};

        global.console = mockedConsole;
    });

    afterEach(() => {
        global.console = initialConsole;
    });

    it('should fallback to default response status', () => {
        jest.spyOn(mockedRes, 'status');
        const err = {};

        errorHandler(err, mockedReq, mockedRes, mockedNext);

        expect(mockedRes.status).toHaveBeenCalledWith(DEFAULT_ERROR_STATUS);
    });

    it('should save given error response status', () => {
        jest.spyOn(mockedRes, 'status');
        const err = { status: 404 };

        errorHandler(err, mockedReq, mockedRes, mockedNext);

        expect(mockedRes.status).toHaveBeenCalledWith(404);
    });

    it('should fallback to default details if not provided any', () => {
        const err = {};

        errorHandler(err, mockedReq, mockedRes, mockedNext);

        expect(mockedConsole.error).lastCalledWith(expect.stringContaining(DEFAULT_ERROR_DETAILS));
    });

    it('should fallback to default error message if not provided any', () => {
        const err = {};

        errorHandler(err, mockedReq, mockedRes, mockedNext);

        expect(mockedConsole.error).lastCalledWith(expect.stringContaining(DEFAULT_ERROR_MESSAGE));
    });

    it('should response with "success: false" and error message', () => {
        const err = { message: 'some error message' };

        errorHandler(err, mockedReq, mockedRes, mockedNext);

        expect(mockedRes.json).lastCalledWith({ success: false, message: err.message });
    });

    it('should not include error details & status & stack in response', () => {
        const err = { status: 404, message: 'some error message', details: 'details', stack: 'stack' };

        errorHandler(err, mockedReq, mockedRes, mockedNext);

        expect(mockedRes.json).not.lastCalledWith(expect.objectContaining({ details: err.details }));
        expect(mockedRes.json).not.lastCalledWith(expect.objectContaining({ error: err.status }));
        expect(mockedRes.json).not.lastCalledWith(expect.objectContaining({ stack: err.stack }));
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

            errorHandler(err, mockedReq, mockedRes, mockedNext);

            expect(mockedRes.json).lastCalledWith(expect.objectContaining({ details: err.details }));
            expect(mockedRes.json).lastCalledWith(expect.objectContaining({ error: err.status }));
            expect(mockedRes.json).lastCalledWith(expect.objectContaining({ stack: err.stack }));
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

            mockedReq.method = 'get';
            mockedReq.url = '/test-url';
            mockedRes.statusCode = 404;

            errorHandler(err, mockedReq, mockedRes, mockedNext);

            expect(mockedConsole.error).lastCalledWith(expect.stringContaining(data.value));
        });
    });
});
