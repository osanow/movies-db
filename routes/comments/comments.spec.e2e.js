const { createServer } = require('../../utils/e2e-utils');

const BASE_URL = '/comments';

let server;

beforeAll(async () => {
    server = await createServer();
}, 30000);

describe(BASE_URL, () => {
    describe('POST /', () => {
        afterAll(async () => {
            await server.cleanup();
        });

        it('should create new comment', async () => {
            const { body, status } = await server.post(BASE_URL).send({
                author: 'One guy',
                content: 'test'
            });

            expect({ body, status }).toEqual({
                status: 200,
                body: {
                    success: true,
                    comment: expect.objectContaining({
                        author: 'One guy',
                        content: 'test'
                    })
                }
            });
        });
    });

    describe('GET /', () => {
        beforeAll(async () => {
            await server.createComment({ author: 'One guy', content: 'test 1' });
            await server.createComment({ author: 'Other guy', content: 'test 2' });
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
                    comments: expect.arrayContaining([
                        expect.objectContaining({
                            author: 'One guy',
                            content: 'test 1'
                        }),
                        expect.objectContaining({
                            author: 'Other guy',
                            content: 'test 2'
                        })
                    ])
                }
            });
        });
    });
});
