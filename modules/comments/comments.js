const Comment = require('../../models/comment');

const create = async commentData => {
    const createdComment = new Comment(commentData);

    return createdComment.save();
};

module.exports = {
    create
};
