const wrap = require('./wrap');

describe('wrap', () => {
    it('should pass args to function and resolve', () => {
        const fn = jest.fn();
        const next = jest.fn();
        const wrapFn = wrap(fn);

        wrapFn('a', 'b', next);

        expect(fn).toHaveBeenCalledWith('a', 'b', next);
    });

    it('should catch error and call next as a callback', async () => {
        const fn = jest.fn().mockImplementationOnce(() => Promise.reject('any error'));
        const next = jest.fn();
        const wrapFn = wrap(fn);

        await wrapFn('a', 'b', next);

        expect(next).toHaveBeenCalledWith('any error');
    });
});
