const Movie = require('../../models/movie');
const { mapMovieDataToRequestParams } = require('../../utils/mapMovieDataToRequestParams');
const { getMovieProperties } = require('../../utils/getMovieProperties');
const { NotFoundError } = require('../../tools/errors');
const { omdbGet } = require('../../utils/omdbGet');
const config = require('../../config/movies');

const create = async movieData => {
    const requestParams = mapMovieDataToRequestParams(movieData);
    const { data } = await omdbGet(requestParams);

    if (!data.Response || data.Response === 'False') {
        throw new NotFoundError(config.notFoundMessage);
    }

    const movieProperties = getMovieProperties(data);
    const createdMovie = new Movie(movieProperties);

    return createdMovie.save();
};

module.exports = {
    create
};
