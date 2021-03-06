const mongoose = require('../libs/mongoose');

const { Schema } = mongoose;

const schema = new Schema(
    {
        title: { type: String, index: true, unique: true },
        imdbid: { type: String, index: true, unique: true },
        year: { type: String },
        rated: { type: String },
        released: { type: String },
        runtime: { type: String },
        genre: { type: String },
        director: { type: String },
        writer: { type: String },
        actors: { type: String },
        plot: { type: String },
        language: { type: String },
        country: { type: String },
        awards: { type: String },
        metascore: { type: String },
        imdbrating: { type: String },
        imdbvotes: { type: String },
        type: { type: String },
        dvd: { type: String },
        boxoffice: { type: String },
        production: { type: String },
        website: { type: String },
        poster: { type: String },
        ratings: [
            {
                Source: { type: String },
                Value: { type: String }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.models.Movie || mongoose.model('Movie', schema);
