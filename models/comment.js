const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
    {
        author: { type: String, index: true, unique: true },
        content: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.models.Comment || mongoose.model('Comment', schema);
