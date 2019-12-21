const commentSchema = Type =>
    Type.object({
        author: Type.string().max(32),
        content: Type.string().max(512)
    });

module.exports = {
    commentSchema
};
