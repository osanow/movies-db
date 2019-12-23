const commentSchema = Type =>
    Type.object({
        author: Type.string().max(64),
        content: Type.string().max(2048)
    });

module.exports = {
    commentSchema
};
