const { mapMovieDataToRequestParams } = require('../../utils/mapMovieDataToRequestParams');
const { NotFoundError, ExistentError } = require('../../tools/errors');
const { omdbGet } = require('../../utils/omdbGet');
const { findMovie } = require('../../utils/findMovie');
const config = require('../../config/movies');
const { create } = require('./movies');

jest.mock(
    '../../models/movie',
    () =>
        function() {
            return {
                saved: false,
                save: jest.fn(() => {
                    this.saved = true;
                    return this;
                })
            };
        }
);

jest.mock('../../utils/findMovie', () => ({
    findMovie: jest.fn(async () => {})
}));

jest.mock('../../utils/mapMovieDataToRequestParams', () => ({
    mapMovieDataToRequestParams: jest.fn()
}));

jest.mock('../../utils/omdbGet', () => ({
    omdbGet: jest.fn(async () => {})
}));

jest.mock('../../utils/getMovieProperties', () => ({
    getMovieProperties: jest.fn()
}));

describe('modules -> movies -> create', () => {
    it('should fetch movie data by valid request params', async () => {
        const movieData = {
            title: 'movie'
        };

        mapMovieDataToRequestParams.mockImplementationOnce(() => 'title=movie');
        omdbGet.mockImplementationOnce(async () => ({ data: { Response: 'True' } }));

        await create(movieData);

        expect(omdbGet).toBeCalledWith('title=movie');
    });

    it('should throw NotFoundError if no found any movie by given data', async () => {
        const movieData = {
            title: 'movie'
        };

        mapMovieDataToRequestParams.mockImplementationOnce(() => 'title=movie');
        omdbGet.mockImplementationOnce(async () => ({ data: { Response: 'False' } }));

        await expect(create(movieData)).rejects.toEqual(new NotFoundError(config.notFoundMessage));
    });

    it('should throw ExistentError if movie with given data already exists', async () => {
        const movieData = {
            title: 'movie'
        };

        mapMovieDataToRequestParams.mockImplementationOnce(() => 'title=movie');
        omdbGet.mockImplementationOnce(async () => ({ data: { Response: 'True' } }));
        findMovie.mockImplementationOnce(() => ({ title: 'some movie' }));

        await expect(create(movieData)).rejects.toEqual(new ExistentError(config.existentMessage));
    });

    it('should return saved movie', async () => {
        const movieData = {
            title: 'movie'
        };

        mapMovieDataToRequestParams.mockImplementationOnce(() => 'title=movie');
        omdbGet.mockImplementationOnce(async () => ({ data: { Response: 'True' } }));

        const createdMovie = await create(movieData);

        expect(createdMovie.saved).toBe(true);
    });
});
