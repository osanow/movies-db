const { createServer } = require('../../utils/e2e-utils');

const BASE_URL = '/movies';

let server;

beforeAll(async () => {
    server = await createServer();
}, 30000);

describe(BASE_URL, () => {
    describe('POST /', () => {
        afterAll(async () => {
            await server.cleanup();
        });

        it('should create new movie', async () => {
            const { body, status } = await server.post(BASE_URL).send({
                title: 'Test',
                year: '2013'
            });

            expect({ body, status }).toEqual({
                status: 200,
                body: {
                    success: true,
                    movie: expect.objectContaining({
                        title: 'Test',
                        year: '2013'
                    })
                }
            });
        });
    });

    describe('GET /', () => {
        beforeAll(async () => {
            await server.createMovie({ title: 'Test', imdbid: '1' });
            await server.createMovie({ title: 'Sun', imdbid: '2' });
        });

        afterAll(async () => {
            await server.cleanup();
        });

        it('should fetch existent movies', async () => {
            const { body, status } = await server.get(BASE_URL).send();

            expect({ body, status }).toEqual({
                status: 200,
                body: {
                    success: true,
                    movies: expect.arrayContaining([
                        expect.objectContaining({
                            title: 'Test',
                            imdbid: '1'
                        }),
                        expect.objectContaining({
                            title: 'Sun',
                            imdbid: '2'
                        })
                    ])
                }
            });
        });
    });
});
