const { create } = require('./comments');

jest.mock(
    '../../models/comment',
    () =>
        function(commentData) {
            this.author = commentData.author;
            this.content = commentData.content;

            return {
                saved: false,
                save: jest.fn(() => {
                    this.saved = true;
                    return this;
                })
            };
        }
);

describe('modules -> comments -> create', () => {
    it('should create comment with given properties', async () => {
        const commentData = {
            author: 'unknown',
            content: 'bla blah'
        };

        const createdComment = await create(commentData);

        expect(createdComment).toHaveProperty('author', 'unknown');
        expect(createdComment).toHaveProperty('content', 'bla blah');
    });

    it('should save created comment', async () => {
        const commentData = {
            author: 'unknown',
            content: 'bla blah'
        };

        const createdComment = await create(commentData);

        expect(createdComment.saved).toBe(true);
    });
});
