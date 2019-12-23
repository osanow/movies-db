const Movie = require('../../models/movie');
const { mapMovieDataToRequestParams } = require('../../utils/mapMovieDataToRequestParams');
const { getMovieProperties } = require('../../utils/getMovieProperties');
const { findMovie } = require('../../utils/findMovie');
const { NotFoundError, ExistentError } = require('../../tools/errors');
const { omdbGet } = require('../../utils/omdbGet');
const config = require('../../config/movies');

const create = async movieData => {
    const requestParams = mapMovieDataToRequestParams(movieData);
    const { data } = await omdbGet(requestParams);

    if (!data.Response || data.Response === 'False') {
        throw new NotFoundError(config.notFoundMessage);
    }

    const movieProperties = getMovieProperties(data);
    const alreadyExists = !!(await findMovie(movieProperties));

    if (alreadyExists) {
        throw new ExistentError(config.existentMessage);
    }

    const createdMovie = new Movie(movieProperties);

    return createdMovie.save();
};

const show = async () => {
    return Movie.find({});
};

module.exports = {
    create,
    show
};
