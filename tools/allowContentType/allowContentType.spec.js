const { InvalidContentTypeError } = require('../errors');
const allowContentType = require('./allowContentType');

describe('allowContentType', () => {
    it('should pass for GET requests', () => {
        const req = { method: 'GET' };
        const res = {};
        const next = jest.fn();

        allowContentType('json')(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next.lastArgs).toBe(undefined);
    });

    it('should call next with error as argument if content is not valid', () => {
        const req = {
            method: 'POST',
            contentType: 'text/plain',
            is(contentType) {
                return this.contentType.includes(contentType);
            },
            get() {
                return this.contentType;
            }
        };
        const res = {};
        const next = jest.fn();

        allowContentType('json')(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toHaveBeenLastCalledWith(new InvalidContentTypeError(`Invalid content-type: ${req.contentType}`));
    });

    it('should call next without errors if content is valid', () => {
        const req = {
            method: 'POST',
            contentType: 'application/json',
            is(contentType) {
                return this.contentType.includes(contentType);
            }
        };
        const res = {};
        const next = jest.fn();

        allowContentType('json')(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next.lastArgs).toBe(undefined);
    });
});
