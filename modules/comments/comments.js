const Comment = require('../../models/comment');

const create = async commentData => {
    const createdComment = new Comment(commentData);

    return createdComment.save();
};

const show = async () => {
    return Comment.find({});
};

module.exports = {
    create,
    show
};
