const axios = require('axios');

const { ExternalServiceUnavailableError } = require('../../tools/errors');
const omdbGet = require('./omdbGet');

jest.mock('axios');

describe('omdbGet', () => {
    it('should throw ExternalServiceUnavailableError if api request failed', async () => {
        axios.get.mockRejectedValueOnce(new Error('some error message'));

        await expect(omdbGet()).rejects.toEqual(new ExternalServiceUnavailableError('', 'some error message'));
    });

    it('should return received response', async () => {
        axios.get.mockResolvedValueOnce({ response: 'true' });

        const response = await omdbGet();

        expect(response).toEqual({ response: 'true' });
    });
});
