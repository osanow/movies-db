const Movie = require('../../models/movie');
const config = require('../../config/movies');

async function findMovie(movieData) {
    let movie;

    if (movieData.title) {
        movie = await Movie.findOne({ title: { $eq: movieData.title } });
    } else if (movieData.imdbid) {
        movie = await Movie.findOne({ imdbid: { $eq: movieData.imdbid } });
    } else {
        throw new Error(config.invalidMovieDataMessage);
    }

    return movie;
}

module.exports = findMovie;
