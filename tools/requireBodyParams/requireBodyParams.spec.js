const { BadRequestError } = require('../errors');
const requireBodyParams = require('./requireBodyParams');

describe('requireBodyParams', () => {
    it('should call next if there is no required params', () => {
        const req = {};
        const res = {};
        const next = jest.fn();

        requireBodyParams([])(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toHaveBeenLastCalledWith();
    });

    it('should throw BadRequestError if there is no params in req body', () => {
        const req = { body: {} };
        const res = {};
        const next = jest.fn();

        expect(() => requireBodyParams(['someParam'])(req, res, next)).toThrow(
            new BadRequestError(`Missing parameter someParam in request body.`)
        );
    });

    it('should throw BadRequestError if request body does not contain required param', () => {
        const req = { body: { otherParam1: 'test1', otherParam2: 'test2' } };
        const res = {};
        const next = jest.fn();

        expect(() => requireBodyParams(['someParam'])(req, res, next)).toThrow(
            new BadRequestError(`Missing parameter someParam in request body.`)
        );
    });

    it('should call next if request body contains required params', () => {
        const req = { body: { param1: 'test1', param2: 'test2', otherParam: 'test3' } };
        const res = {};
        const next = jest.fn();

        requireBodyParams(['param1', 'param2'])(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toHaveBeenLastCalledWith();
    });
});
