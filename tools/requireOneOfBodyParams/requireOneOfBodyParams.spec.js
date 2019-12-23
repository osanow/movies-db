const { BadRequestError } = require('../errors');
const requireOneOfBodyParams = require('./requireOneOfBodyParams');

describe('requireOneOfBodyParams', () => {
    it('should call next if there is no required params', () => {
        const req = { body: {} };
        const res = {};
        const next = jest.fn();

        requireOneOfBodyParams([])(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toHaveBeenLastCalledWith();
    });

    it('should throw BadRequestError if no body params given', () => {
        const req = { body: {} };
        const res = {};
        const next = jest.fn();

        expect(() => requireOneOfBodyParams(['someParam', 'otherParam'])(req, res, next)).toThrow(
            new BadRequestError('One of the required body params missing.')
        );
    });

    it('should throw BadRequestError if request body does not contain required param', () => {
        const req = { body: { otherParam1: 'test1', otherParam2: 'test2' } };
        const res = {};
        const next = jest.fn();

        expect(() => requireOneOfBodyParams(['someParam'])(req, res, next)).toThrow(
            new BadRequestError('One of the required body params missing.')
        );
    });

    it('should call next if request body contains one of required params', () => {
        const req = { body: { param1: 'test1', otherParam: 'test3' } };
        const res = {};
        const next = jest.fn();

        requireOneOfBodyParams(['param1', 'param2'])(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toHaveBeenLastCalledWith();
    });

    it('should call next if request body contains both required params', () => {
        const req = { body: { param1: 'test1', param2: 'test2', otherParam: 'test3' } };
        const res = {};
        const next = jest.fn();

        requireOneOfBodyParams(['param1', 'param2'])(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toHaveBeenLastCalledWith();
    });
});
