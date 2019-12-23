const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
    {
        author: { Type: String, trim: true, index: true, unique: true },
        content: { Type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.models.Comment || mongoose.model('Comment', schema);
