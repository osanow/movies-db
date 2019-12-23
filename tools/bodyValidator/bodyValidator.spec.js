const bodyValidator = require('./bodyValidator');

describe('Joi JSON validation', () => {
    let middleware;
    let handler;

    beforeEach(() => {
        handler = jest.fn(err => {
            if (err) {
                return true;
            }
            return false;
        });
    });

    async function callWithBody(body) {
        await middleware({ body }, null, handler);
    }

    describe('fields are required by default', () => {
        beforeEach(() => {
            middleware = bodyValidator(Joi =>
                Joi.object({
                    someKeyA: Joi.string(),
                    someKeyB: Joi.string()
                })
            );
        });

        it('blocks when missing fields', async () => {
            await callWithBody({ someKeyA: '123' });

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveReturnedWith(true);
        });

        it('does not block when all fields provided and valid', async () => {
            await callWithBody({ someKeyA: '123', someKeyB: '456' });

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveReturnedWith(false);
        });

        it('should not include values in error message', async () => {
            await callWithBody({ someKeyA: '123' });

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveReturnedWith(true);
            expect(handler).toHaveBeenLastCalledWith(
                expect.objectContaining({ details: expect.not.stringContaining('123') })
            );
        });

        it('should not include values in error message for nested objects', async () => {
            await callWithBody({ someKeyA: '123', someKeyB: '456', parentKey: { nestedKey: 'nestedValue' } });

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveReturnedWith(true);
            expect(handler).not.toHaveBeenLastCalledWith(
                expect.objectContaining({ details: expect.stringContaining('123') })
            );
            expect(handler).not.toHaveBeenLastCalledWith(
                expect.objectContaining({ details: expect.stringContaining('456') })
            );
            expect(handler).not.toHaveBeenLastCalledWith(
                expect.objectContaining({ details: expect.stringContaining('nestedValue') })
            );
        });

        it('blocks requests with redundant fields', async () => {
            await callWithBody({ someKeyA: '123', someKeyB: '456', someKeyC: '789' });

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveReturnedWith(true);
        });

        it('blocks requests with fields of invalid type', async () => {
            await callWithBody({ someKeyA: '123', someKeyB: { $neq: 'nosql injection' } });

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveReturnedWith(true);
        });
    });
});
