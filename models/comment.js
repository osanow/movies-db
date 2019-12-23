const mongoose = require('../libs/mongoose');

const { Schema } = mongoose;

const schema = new Schema(
    {
        author: { type: String },
        content: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.models.Comment || mongoose.model('Comment', schema);
